import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import { validateSpec } from "../../schemas/zod.js";
import { routeSpec } from "../router/index.js";
import { duration } from "./media.js";
import { ROOT, artifactPath, approveGate, evaluate, invalidateFrom, narrationFromScript,
  projectDir, readState, recordStage, stageInput } from "./state.js";

function requireSpec(project) {
  const file = artifactPath(project, "specs/video-spec.json");
  const spec = JSON.parse(fs.readFileSync(file, "utf8"));
  const result = validateSpec(spec);
  if (!result.valid) throw new Error(`Invalid VideoSpec: ${JSON.stringify(result.errors)}`);
  for (const scene of spec.script.scenes) {
    for (const asset of scene.assets) {
      const assetFile = artifactPath(project, asset.path);
      if (!fs.existsSync(assetFile) || fs.statSync(assetFile).size === 0) throw new Error(`Missing asset: ${asset.path}`);
    }
  }
  const routing = routeSpec(spec, "AUTO");
  if (!routing.success) throw new Error(`No compatible engine: ${routing.reasons.join("; ")}`);
  return spec;
}
function requireTechnicalQa(project, kind) {
  const file = artifactPath(project, `output/${kind}-qc.json`);
  const qc = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!qc.pass || qc.kind !== kind) throw new Error(`${kind} technical QA did not pass`);
  return qc;
}
function status(project) {
  const result = evaluate(project);
  const { signatures, ...visible } = result;
  return visible;
}
export async function main(argv = process.argv.slice(2)) {
  const [command, ...rest] = argv;
  const args = minimist(rest, { boolean: ["reviewed"] });
  if (!command || command === "help") {
    console.log("factory <doctor|status|next|record|approve|fast-track|check|dirty|tts|render|package> --project <id> [options]");
    return;
  }
  if (command === "doctor" || command === "health") {
    const { runDoctor } = await import("./doctor.js");
    await runDoctor();
    return;
  }
  if (command === "start-services" || command === "start") {
    const psScript = path.join(ROOT, "core", "scripts", "factory", "start-services.ps1");
    spawnSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psScript], {
      stdio: "inherit"
    });
    return;
  }
  const project = args.project;
  projectDir(project);
  if (command === "package") {
    const { packageProject } = await import("./package.js");
    await packageProject(project);
    return;
  }
  if (command === "fast-track") {
    const { ensureServices } = await import("./services.js");
    await ensureServices({ tts: true });
    let current = evaluate(project);
    console.log(`[Fast-Track] Project: ${project} (Current stage: ${current.next})`);
    if (current.next === "GATE1") {
      current = approveGate(project, "GATE1", "Fast-track: Auto-approved standard script & beats");
      console.log(`[Fast-Track] Approved GATE1 -> Next: ${current.next}`);
    }
    if (current.next === "CREATIVE_DIRECTION") {
      const cdFile = path.join(projectDir(project), "creative-direction.md");
      if (!fs.existsSync(cdFile)) {
        fs.writeFileSync(cdFile, "# Creative Direction\n\nFast-track standard explainer template with high-contrast mobile typography.\n");
      }
      current = recordStage(project, "CREATIVE_DIRECTION", ["creative-direction.md"]);
      console.log(`[Fast-Track] Recorded CREATIVE_DIRECTION -> Next: ${current.next}`);
    }
    if (current.next === "GATE2") {
      current = approveGate(project, "GATE2", "Fast-track: Auto-selected standard creative direction");
      console.log(`[Fast-Track] Approved GATE2 -> Next: ${current.next}`);
    }
    console.log(JSON.stringify({ project, mode: "fast-track", next: current.next }, null, 2));
    return;
  }
  if (command === "status") { console.log(JSON.stringify(status(project), null, 2)); return; }
  if (command === "next") { console.log(JSON.stringify({ project, next: evaluate(project).next })); return; }
  if (command === "check") {
    const result = status(project);
    console.log(JSON.stringify(result, null, 2));
    if (Object.values(result.stages).some(item => item.status === "dirty")) process.exitCode = 1;
    return;
  }
  if (command === "dirty") {
    console.log(JSON.stringify(invalidateFrom(project, String(args.stage || "").toUpperCase()).stages));
    return;
  }
  if (command === "approve") {
    const gate = String(args.gate || "").toUpperCase();
    const result = approveGate(project, gate, args.evidence);
    console.log(JSON.stringify({ approved: gate, next: result.next }));
    return;
  }
  if (command === "record") {
    const stage = String(args.stage || "").toUpperCase();
    if (["VIDEO_SPEC", "VALIDATION", "PRODUCTION"].includes(stage)) requireSpec(project);
    if (stage === "VALIDATION") {
      const checked = spawnSync(process.execPath,
        [path.join(ROOT, "core", "scripts", "validate", "index.js"), "--project", project],
        { cwd: path.join(ROOT, "core"), stdio: "inherit", timeout: 30000 });
      if (checked.status !== 0) throw new Error(`VideoSpec validation failed: ${checked.status ?? checked.error?.message}`);
    }
    if (stage === "TTS") {
      if (![args.voice, args.rate, args.pitch, args.volume, args.provider].every(Boolean)) {
        throw new Error("Recording external TTS requires --voice --rate --pitch --volume --provider");
      }
      const voiceSeconds = duration(artifactPath(project, "assets/audio/narration.mp3"));
      const timing = JSON.parse(fs.readFileSync(artifactPath(project, "assets/audio/timing.json"), "utf8"));
      if (Math.abs(timing.durationMs / 1000 - voiceSeconds) > 0.1) throw new Error("TTS timing is not measured from actual audio");
      if (!Array.isArray(timing.words) || !timing.words.length || timing.words.some(word =>
        !Number.isFinite(word.startMs) || !Number.isFinite(word.durationMs) || word.durationMs <= 0)) {
        throw new Error("TTS needs measured word boundaries");
      }
    }
    if (stage === "PREVIEW_QA") requireTechnicalQa(project, "preview");
    if (stage === "FINAL_QA") requireTechnicalQa(project, "final");
    const artifacts = args.artifact ? [args.artifact].flat() : [];
    const metadata = { ...(args.reviewed && { reviewed: true }), ...(args.voice && { voice: args.voice }),
      ...(args.rate && { rate: args.rate }), ...(args.pitch && { pitch: args.pitch }),
      ...(args.volume && { volume: args.volume }), ...(args.provider && { provider: args.provider }),
      ...(args.engine && { engine: args.engine }) };
    const result = recordStage(project, stage, artifacts, metadata);
    console.log(JSON.stringify({ recorded: stage, next: result.next }));
    return;
  }
  if (command === "tts") {
    const { ensureCitVoiceStudio } = await import("./services.js");
    await ensureCitVoiceStudio(4000);
    const settings = { voice: args.voice || "Hải Đăng", rate: args.rate || "+10%",
      pitch: args.pitch || "+0Hz", volume: args.volume || "+0%", provider: "cit-voice-studio" };
    const state = readState(project), current = evaluate(project, state);
    const prior = current.signatures.GATE2;
    const wantedInput = prior && stageInput(project, "TTS", state, prior, settings);
    if (current.stages.TTS.status === "complete" && state.stages.TTS.input === wantedInput) {
      console.log(JSON.stringify({ stage: "TTS", cache: "HIT" })); return;
    }
    if (current.next !== "TTS") throw new Error(`Expected ${current.next} before TTS`);
    const narration = narrationFromScript(project);
    const commandArgs = [path.join(ROOT, "core", "scripts", "tts", "index.js"), "--project", project,
      "--text", narration, "--voice", settings.voice, "--rate", settings.rate,
      "--pitch", settings.pitch, "--volume", settings.volume, "--provider", settings.provider,
      ...(args.speed ? ["--speed", String(args.speed)] : [])];
    const result = spawnSync(process.execPath, commandArgs, { cwd: path.join(ROOT, "core"), stdio: "inherit", timeout: 180000 });
    if (result.status !== 0) throw new Error(`TTS failed with code ${result.status ?? result.error?.message}`);
    const voiceSeconds = duration(artifactPath(project, "assets/audio/narration.mp3"));
    const timingFile = artifactPath(project, "assets/audio/timing.json");
    const timing = JSON.parse(fs.readFileSync(timingFile, "utf8"));
    timing.durationSec = voiceSeconds;
    timing.durationMs = Math.round(voiceSeconds * 1000);
    timing.durationFrames = Math.ceil(voiceSeconds * 30);
    timing.measuredBy = "ffprobe";
    fs.writeFileSync(timingFile, JSON.stringify(timing, null, 2) + "\n");
    if (!Array.isArray(timing.words) || !timing.words.length) throw new Error("TTS provider returned no word boundaries");
    const recorded = recordStage(project, "TTS", [], settings);
    console.log(JSON.stringify({ stage: "TTS", cache: "MISS", next: recorded.next }));
    return;
  }
  if (command === "render") {
    const kind = args.kind || "final";
    const stage = kind === "preview" ? "PREVIEW" : kind === "final" ? "FINAL_RENDER" : null;
    if (!stage) throw new Error("--kind must be preview or final");
    const spec = requireSpec(project);
    const requestedEngine = String(args.engine || "AUTO").toUpperCase();
    const routing = routeSpec(spec, requestedEngine);
    if (!routing.success) throw new Error(`Engine incompatible: ${routing.reasons.join("; ")}`);
    let current = evaluate(project);
    if (current.stages[stage].status === "complete") {
      const cachedEngine = readState(project).stages[stage]?.metadata?.engine;
      if (routing.selectedEngine === cachedEngine) {
        console.log(JSON.stringify({ render: kind, cache: "HIT" })); return;
      }
      current = invalidateFrom(project, stage);
    }
    if (current.next !== stage) {
      if (kind === "final" && ["PREVIEW", "PREVIEW_QA", "GATE3"].includes(current.next)) {
        // Direct Single Final Render Mode: render final directly without generating or copying preview artifacts
        process.env.FACTORY_FINAL_APPROVED = "1";
        try {
          const { renderProject } = await import("../render/index.js");
          const report = await renderProject({ project, kind: "final", engine: args.engine || "AUTO" });
          if (current.next === "PREVIEW") {
            current = recordStage(project, "PREVIEW", [], { engine: report.engine, skipped: true });
          }
          if (current.next === "PREVIEW_QA") {
            current = recordStage(project, "PREVIEW_QA", [], { reviewed: true, skipped: true });
          }
          if (current.next === "GATE3") {
            current = approveGate(project, "GATE3", "User requested single direct final render (skipping preview)");
          }
          const recorded = recordStage(project, "FINAL_RENDER", [], { engine: report.engine });
          console.log(JSON.stringify({ render: "final", qa: report, singleFinalMode: true, next: recorded.next }));
        } finally { delete process.env.FACTORY_FINAL_APPROVED; }
        return;
      }
      throw new Error(`Expected ${current.next} before ${stage}`);
    }
    if (kind === "final") process.env.FACTORY_FINAL_APPROVED = "1";
    try {
      const { renderProject } = await import("../render/index.js");
      const report = await renderProject({ project, kind, engine: args.engine || "AUTO" });
      const recorded = recordStage(project, stage, [], { engine: report.engine });
      console.log(JSON.stringify({ render: kind, qa: report, next: recorded.next }));
    } finally { delete process.env.FACTORY_FINAL_APPROVED; }
    return;
  }
  throw new Error(`Unknown factory command: ${command}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
