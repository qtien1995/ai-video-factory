import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "factory-test-"));
process.env.FACTORY_ROOT = root;
const state = await import("../scripts/factory/state.js");
const { main } = await import("../scripts/factory/index.js");
const { muxAndNormalize } = await import("../scripts/factory/media.js");
const { routeSpec } = await import("../scripts/router/index.js");
after(() => fs.rmSync(root, { recursive: true, force: true }));

function put(id, relative, content = "x") {
  const file = state.artifactPath(id, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
function fixture(id) {
  put(id, "script.md", "# Narration\nXin chào.\n");
  put(id, "beats.json", '[{"meaning":"hi","visualAction":"reveal"}]');
  put(id, "creative-direction.md", "direction");
  put(id, "assets/audio/narration.mp3", "fake-audio");
  put(id, "assets/audio/timing.json", '{"durationMs":1000}');
  put(id, "storyboard.json", "{}");
  put(id, "specs/video-spec.json", JSON.stringify({ schemaVersion: "0.1",
    project: { id, title: "test", version: 1 },
    format: { aspectRatio: "9:16", width: 1080, height: 1920, targetDurationMs: 1000 },
    content: { coreMessage: "test", audience: "test", tone: "test", language: "vi" },
    script: { narration: "Xin chào.", scenes: [{ id: "s1", purpose: "test", narration: "Xin chào.",
      durationMs: 1000, visualIntent: { description: "test", layout: "centered" }, motionIntent: [], assets: [] }] } }));
  put(id, "output/preview.mp4", "preview");
  put(id, "output/preview-qc.json", '{"pass":true,"kind":"preview"}');
  put(id, "output/preview-contact-sheet.svg", "image");
  put(id, "output/final.mp4", "final");
  put(id, "output/final-qc.json", '{"pass":true,"kind":"final"}');
  put(id, "output/final-contact-sheet.svg", "image");
  put(id, "qc.md", "Reviewed");
}
function complete(id) {
  fixture(id);
  state.recordStage(id, "SCRIPT", []);
  state.recordStage(id, "BEATS", []);
  state.approveGate(id, "GATE1", "user approved script and beats");
  state.recordStage(id, "CREATIVE_DIRECTION", []);
  state.approveGate(id, "GATE2", "user selected direction");
  state.recordStage(id, "TTS", [], { voice: "vi-VN-HoaiMyNeural", rate: "+10%" });
  state.recordStage(id, "STORYBOARD", []);
  state.recordStage(id, "VIDEO_SPEC", []);
  state.recordStage(id, "VALIDATION", []);
  state.recordStage(id, "PRODUCTION", []);
  state.recordStage(id, "PREVIEW", [], { engine: "REMOTION" });
  state.recordStage(id, "PREVIEW_QA", ["qc.md"], { reviewed: true });
  state.approveGate(id, "GATE3", "user approved final render");
  state.recordStage(id, "FINAL_RENDER", [], { engine: "REMOTION" });
  state.recordStage(id, "FINAL_QA", ["qc.md"], { reviewed: true });
  state.recordStage(id, "DONE", []);
}

test("Gate 1 requires both script and beats; Gate 3 requires reviewed preview", () => {
  const id = "gates";
  fixture(id);
  assert.throws(() => state.approveGate(id, "GATE1", "yes"), /Expected SCRIPT/);
  state.recordStage(id, "SCRIPT", []);
  assert.throws(() => state.approveGate(id, "GATE1", "yes"), /Expected BEATS/);
  state.recordStage(id, "BEATS", []);
  state.approveGate(id, "GATE1", "user approved both");
  assert.equal(state.evaluate(id).next, "CREATIVE_DIRECTION");
  assert.throws(() => state.approveGate(id, "GATE3", "yes"), /Expected CREATIVE_DIRECTION/);
});
test("DONE becomes dirty when script, asset, or MP4 changes", () => {
  for (const [id, changed, firstDirty] of [
    ["script_change", "script.md", "SCRIPT"],
    ["asset_change", "assets/extra.png", "PREVIEW"],
    ["missing_mp4", "output/preview.mp4", "PREVIEW"]
  ]) {
    complete(id);
    assert.equal(state.evaluate(id).done, true);
    if (id === "missing_mp4") fs.rmSync(state.artifactPath(id, changed));
    else put(id, changed, "changed");
    const checked = state.evaluate(id);
    assert.equal(checked.done, false);
    assert.equal(checked.next, firstDirty);
    assert.equal(checked.stages.DONE.status, "dirty");
  }
});
test("legacy DONE is never trusted and is backed up on first write", () => {
  const id = "legacy";
  fixture(id);
  put(id, "state.json", '{"schemaVersion":"0.1","stages":{"DONE":{"status":"complete"}}}');
  assert.equal(state.evaluate(id).needsReview, true);
  assert.equal(state.evaluate(id).next, "SCRIPT");
  state.recordStage(id, "SCRIPT", []);
  assert.ok(fs.existsSync(state.artifactPath(id, "state.v0.1.json")));
  assert.equal(state.evaluate(id).next, "BEATS");
});
test("AUTO follows Remotion primary; invalid override fails", () => {
  const spec = { script: { scenes: [{ id: "s", visualIntent: { layout: "centered" }, motionIntent: [], assets: [] }] },
    engineRouting: { suggestedEngine: "HYPERFRAMES" } };
  assert.equal(routeSpec(spec).selectedEngine, "REMOTION");
  assert.equal(routeSpec(spec, "HYPERFRAMES").selectedEngine, "HYPERFRAMES");
  assert.equal(routeSpec(spec, "FOO").success, false);
});
test("missing render output fails, and final render is blocked before Gate 3", async () => {
  assert.throws(() => muxAndNormalize("missing.mp4", "missing.mp3", "out.mp4", 1), /no MP4/);
  fixture("no_gate3");
  await assert.rejects(main(["render", "--project", "no_gate3", "--kind", "final"]), /Expected SCRIPT/);
});
test("artifact paths cannot escape a project", () => {
  assert.throws(() => state.artifactPath("gates", "../outside"), /escapes/);
  assert.throws(() => state.projectDir("../outside"), /Invalid project id/);
});
test("TTS source keeps multiline narration and render cache notices custom HTML", () => {
  const id = "narration";
  fixture(id);
  put(id, "script.md", "# Narration\nDòng một.\nDòng hai.\n# Beats\nOther text\n");
  assert.equal(state.narrationFromScript(id), "Dòng một.\nDòng hai.");
  const before = state.renderInput(id, "HYPERFRAMES");
  put(id, "index.html", "new visual");
  assert.notEqual(state.renderInput(id, "HYPERFRAMES"), before);
});
test("completed preview is a cache hit without calling the renderer", async () => {
  const id = "cache_hit";
  complete(id);
  await main(["render", "--project", id, "--kind", "preview"]);
  assert.equal(state.evaluate(id).done, true);
});
