import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const ROOT = process.env.FACTORY_ROOT
  ? path.resolve(process.env.FACTORY_ROOT)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
export const STAGES = [
  "SCRIPT", "BEATS", "GATE1", "CREATIVE_DIRECTION", "GATE2", "TTS",
  "STORYBOARD", "VIDEO_SPEC", "VALIDATION", "PRODUCTION", "PREVIEW",
  "PREVIEW_QA", "GATE3", "FINAL_RENDER", "FINAL_QA", "DONE"
];
export const GATES = new Set(["GATE1", "GATE2", "GATE3"]);
export const DEFAULT_ARTIFACTS = {
  SCRIPT: ["script.md"], BEATS: ["beats.json"],
  CREATIVE_DIRECTION: ["creative-direction.md"],
  TTS: ["assets/audio/narration.mp3", "assets/audio/timing.json"],
  STORYBOARD: ["storyboard.json"], VIDEO_SPEC: ["specs/video-spec.json"],
  PRODUCTION: ["specs/video-spec.json"],
  PREVIEW: ["output/preview.mp4", "output/preview-qc.json", "output/preview-contact-sheet.svg"],
  FINAL_RENDER: ["output/final.mp4", "output/final-qc.json", "output/final-contact-sheet.svg"]
};

export function projectDir(projectId) {
  if (!/^[a-zA-Z0-9_][a-zA-Z0-9_-]*$/.test(projectId || "")) throw new Error("Invalid project id");
  const categories = ["financial-insurance", "social-shorts", "vox-style", "auto-cuts", "explainers"];
  for (const cat of categories) {
    const candidate = path.join(ROOT, "projects", cat, projectId);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(ROOT, "projects", projectId);
}
export function artifactPath(projectId, relative) {
  if (!relative || path.isAbsolute(relative)) throw new Error("Artifact must be a project-relative path");
  const root = projectDir(projectId);
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(root + path.sep)) throw new Error("Artifact escapes project directory");
  return resolved;
}
export function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}
export function fileHash(file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile() || fs.statSync(file).size === 0) return null;
  return hash(fs.readFileSync(file));
}
export function hashTree(dir) {
  if (!fs.existsSync(dir)) return null;
  const entries = [];
  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile()) entries.push([path.relative(dir, full).replaceAll("\\", "/"), fileHash(full)]);
    }
  }
  visit(dir);
  return hash(JSON.stringify(entries));
}
export function newState(projectId) {
  return { schemaVersion: "0.2", projectId, stages: {}, needsReview: false };
}
export function readState(projectId) {
  const file = path.join(projectDir(projectId), "state.json");
  if (!fs.existsSync(file)) return newState(projectId);
  const original = JSON.parse(fs.readFileSync(file, "utf8"));
  if (original.schemaVersion === "0.2") return original;
  return { ...newState(projectId), needsReview: true, legacy: true };
}
export function saveState(projectId, state) {
  const dir = projectDir(projectId);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "state.json");
  if (fs.existsSync(file)) {
    const original = JSON.parse(fs.readFileSync(file, "utf8"));
    if (original.schemaVersion !== "0.2") {
      const backup = path.join(dir, `state.v${original.schemaVersion || "legacy"}.json`);
      if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
    }
  }
  delete state.legacy;
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(state, null, 2) + "\n");
  fs.renameSync(temp, file);
}
export function artifactHashes(projectId, artifacts) {
  return artifacts.map(relative => {
    const checksum = fileHash(artifactPath(projectId, relative));
    if (!checksum) throw new Error(`Missing or empty artifact: ${relative}`);
    return [relative, checksum];
  });
}
export function stageInput(projectId, stage, state, priorSignature = "", metadata = {}) {
  const base = { stage, priorSignature, metadata };
  if (stage === "TTS") base.source = narrationFromScript(projectId);
  if (stage === "PREVIEW" || stage === "FINAL_RENDER") {
    base.render = renderInput(projectId, metadata.engine || "REMOTION");
  }
  return hash(JSON.stringify(base));
}
export function narrationFromScript(projectId) {
  const file = artifactPath(projectId, "script.md");
  if (!fs.existsSync(file)) throw new Error("Missing script.md");
  const source = fs.readFileSync(file, "utf8");
  const lines = source.split(/\r?\n/);
  const heading = lines.findIndex(line => /^#{1,3}\s*Narration\s*$/i.test(line));
  if (heading < 0) throw new Error("script.md needs a # Narration section");
  const end = lines.findIndex((line, index) => index > heading && /^#{1,3}\s/.test(line));
  const narration = lines.slice(heading + 1, end < 0 ? undefined : end).join("\n").trim()
    .replace(/^['"“]|['"”]$/g, "");
  if (!narration) throw new Error("script.md needs a # Narration section");
  return narration;
}
export function renderInput(projectId, engine) {
  const project = projectDir(projectId);
  const specFile = artifactPath(projectId, "specs/video-spec.json");
  const audioFile = artifactPath(projectId, "assets/audio/narration.mp3");
  const spec = fileHash(specFile), audio = fileHash(audioFile);
  if (!spec || !audio) throw new Error("Render requires nonempty spec and narration.mp3");
  const engineDir = path.join(ROOT, "engines", engine.toLowerCase());
  const engineFiles = [path.join(engineDir, "adapter", "index.js"), path.join(engineDir, "package.json")];
  const sourceDir = engine === "REMOTION" ? path.join(engineDir, "src") : path.join(engineDir, "composer");
  return hash(JSON.stringify({ spec, audio, assets: hashTree(path.join(project, "assets")),
    customHtml: fileHash(path.join(project, "index.html")),
    engine, engineFiles: engineFiles.map(fileHash), source: hashTree(sourceDir),
    config: fileHash(path.join(ROOT, "factory-config.json")) }));
}
export function evaluate(projectId, state = readState(projectId)) {
  const report = {}, signatures = {};
  let prior = "";
  let blocked = false;
  for (const stage of STAGES) {
    const record = state.stages[stage];
    let status = !record ? "pending" : "complete";
    let reason = null;
    if (record) {
      if (blocked) { status = "dirty"; reason = "UPSTREAM_INCOMPLETE"; }
      else {
        try {
          const input = stageInput(projectId, stage, state, prior, record.metadata || {});
          const files = artifactHashes(projectId, record.artifacts || []);
          const signature = hash(JSON.stringify({ input, files }));
          if (input !== record.input || signature !== record.signature) {
            status = "dirty"; reason = "INPUT_OR_ARTIFACT_CHANGED";
          } else { signatures[stage] = signature; prior = signature; }
        } catch (error) { status = "dirty"; reason = error.message; }
      }
    }
    if (status !== "complete") blocked = true;
    report[stage] = { status, ...(reason && { reason }) };
  }
  const next = STAGES.find(stage => report[stage].status !== "complete") || null;
  return { projectId, schemaVersion: state.schemaVersion, needsReview: state.needsReview || false,
    stages: report, next, done: next === null, signatures };
}
export function recordStage(projectId, stage, artifacts, metadata = {}) {
  if (!STAGES.includes(stage) || GATES.has(stage)) throw new Error("Use approve for gates; record needs a valid stage");
  const state = readState(projectId);
  const current = evaluate(projectId, state);
  if (current.next !== stage) throw new Error(`Expected ${current.next || "no stage"} before ${stage}`);
  const alternate = (stage === "BEATS" && artifacts.includes("beats.md")) ||
    (stage === "STORYBOARD" && artifacts.includes("storyboard.md"));
  const required = alternate ? [] : (DEFAULT_ARTIFACTS[stage] || []);
  const paths = [...new Set([...required, ...artifacts])];
  if (["PREVIEW_QA", "FINAL_QA"].includes(stage) && !artifacts.length) throw new Error(`${stage} requires --artifact`);
  if (["PREVIEW_QA", "FINAL_QA"].includes(stage) && !metadata.reviewed) throw new Error(`${stage} requires --reviewed after visual review`);
  const previous = STAGES[STAGES.indexOf(stage) - 1];
  const prior = previous ? current.signatures[previous] : "";
  const input = stageInput(projectId, stage, state, prior, metadata);
  const files = artifactHashes(projectId, paths);
  state.stages[stage] = { input, signature: hash(JSON.stringify({ input, files })), artifacts: paths, metadata,
    recordedAt: new Date().toISOString() };
  state.needsReview = false;
  saveState(projectId, state);
  return evaluate(projectId, state);
}
export function invalidateFrom(projectId, stage) {
  const position = STAGES.indexOf(stage);
  if (position < 0) throw new Error("Unknown stage");
  const state = readState(projectId);
  for (const name of STAGES.slice(position)) delete state.stages[name];
  saveState(projectId, state);
  return evaluate(projectId, state);
}
export function approveGate(projectId, stage, evidence) {
  if (!GATES.has(stage)) throw new Error("Unknown gate");
  if (!evidence?.trim()) throw new Error("--evidence must quote or identify the user's approval");
  const state = readState(projectId);
  const current = evaluate(projectId, state);
  if (current.next !== stage) throw new Error(`Expected ${current.next || "no stage"} before ${stage}`);
  const previous = STAGES[STAGES.indexOf(stage) - 1];
  const metadata = { evidence: evidence.trim() };
  const input = stageInput(projectId, stage, state, current.signatures[previous], metadata);
  state.stages[stage] = { input, signature: hash(JSON.stringify({ input, files: [] })), artifacts: [],
    metadata, recordedAt: new Date().toISOString() };
  saveState(projectId, state);
  return evaluate(projectId, state);
}
