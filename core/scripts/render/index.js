import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import { validateSpec } from "../../schemas/zod.js";
import { routeSpec } from "../router/index.js";
import { calculateTimelineDuration } from "../../timing/index.js";
import { artifactPath, projectDir } from "../factory/state.js";
import { duration, inspectMedia, muxAndNormalize } from "../factory/media.js";
import * as remotionAdapter from "../../../engines/remotion/adapter/index.js";

export async function renderProject({ project, kind = "preview", engine = "AUTO" }) {
  if (!["preview", "final"].includes(kind)) throw new Error("--kind must be preview or final");
  if (kind === "final" && process.env.FACTORY_FINAL_APPROVED !== "1") throw new Error("Final render requires Gate 3 through factory CLI");
  const root = projectDir(project);
  const spec = JSON.parse(fs.readFileSync(artifactPath(project, "specs/video-spec.json"), "utf8"));
  const validation = validateSpec(spec);
  if (!validation.valid) throw new Error(`Invalid VideoSpec: ${JSON.stringify(validation.errors)}`);
  const routing = routeSpec(spec, engine);
  if (!routing.success) throw new Error(`Engine incompatible: ${routing.reasons.join("; ")}`);
  const selectedEngine = routing.selectedEngine;
  const narration = artifactPath(project, "assets/audio/narration.mp3");
  const expected = calculateTimelineDuration(spec).actualDurationMs / 1000;
  if (!expected) throw new Error("VideoSpec has no duration");
  const voiceDuration = duration(narration);
  if (voiceDuration > expected + 0.1 || expected - voiceDuration > 1.5) throw new Error(`Narration ${voiceDuration}s does not match video ${expected}s`);
  const outputDir = path.join(root, "output");
  fs.mkdirSync(outputDir, { recursive: true });
  const raw = path.join(outputDir, `${kind}.${process.pid}.raw.mp4`);
  const candidate = path.join(outputDir, `${kind}.${process.pid}.candidate.mp4`);
  const candidateSheet = path.join(outputDir, `${kind}.${process.pid}.contact-sheet.svg`);
  const final = path.join(outputDir, `${kind}.mp4`);
  const finalSheet = path.join(outputDir, `${kind}-contact-sheet.svg`);
  const qcFile = path.join(outputDir, `${kind}-qc.json`);
  const adapter = remotionAdapter;
  try {
    const rendered = await adapter.render(spec, { projectRoot: root, outputPath: raw });
    if (!rendered.success || !fs.existsSync(raw) || fs.statSync(raw).size === 0) {
      throw new Error(rendered.error || "Adapter returned success without MP4");
    }
    muxAndNormalize(raw, narration, candidate, expected);
    const qc = inspectMedia(candidate, narration, spec, candidateSheet);
    if (!qc.pass) throw new Error(`Technical QA failed: ${qc.failures.join(", ")}`);
    for (const [source, destination] of [[candidate, final], [candidateSheet, finalSheet]]) {
      if (fs.existsSync(destination)) fs.rmSync(destination);
      fs.renameSync(source, destination);
    }
    const report = { ...qc, kind, engine: selectedEngine, output: final, contactSheet: finalSheet,
      routingReasons: routing.reasons, checkedAt: new Date().toISOString(), visualReviewed: false };
    fs.writeFileSync(qcFile, JSON.stringify(report, null, 2) + "\n");
    return report;
  } finally {
    for (const file of [raw, candidate, candidateSheet]) if (fs.existsSync(file)) fs.rmSync(file);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = minimist(process.argv.slice(2));
  renderProject({ project: args.project, kind: args.kind || "preview", engine: args.engine || "AUTO" })
    .then(report => console.log(JSON.stringify(report)))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}
