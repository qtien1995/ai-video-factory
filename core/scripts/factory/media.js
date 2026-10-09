import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT } from "./state.js";
import { calculateTimelineDuration } from "../../timing/index.js";

function binary(name) {
  const candidates = [
    path.join(ROOT, ".tools", "ffmpeg", "ffmpeg-9.0.2-full_build", "bin", `${name}.exe`),
    path.join(ROOT, "engines", "remotion", "node_modules", "@remotion", "compositor-win32-x64-msvc", `${name}.exe`),
    path.join(ROOT, "projects", "remotion-factory", "node_modules", "@remotion", "compositor-win32-x64-msvc", `${name}.exe`),
    name
  ];
  for (const candidate of candidates) {
    if (candidate === name || fs.existsSync(candidate)) {
      const test = spawnSync(candidate, ["-version"], { encoding: "utf8", timeout: 10000 });
      if (test.status === 0) return candidate;
    }
  }
  throw new Error(`${name} unavailable`);
}
function run(name, args) {
  const result = spawnSync(binary(name), args, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024, timeout: 300000 });
  if (result.status !== 0) throw new Error(`${name} failed: ${(result.stderr || result.error?.message || "").slice(-2500)}`);
  return result;
}
export function probe(file) {
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) throw new Error(`Missing or empty media: ${file}`);
  return JSON.parse(run("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file]).stdout);
}
export function duration(file) {
  const value = Number(probe(file).format?.duration);
  if (!Number.isFinite(value) || value <= 0) throw new Error(`Invalid duration: ${file}`);
  return value;
}
export function muxAndNormalize(raw, narration, output, targetSeconds) {
  if (!fs.existsSync(raw) || fs.statSync(raw).size === 0) throw new Error("Render returned no MP4");
  const audio = probe(narration).streams.find(stream => stream.codec_type === "audio");
  if (!audio) throw new Error("Narration has no audio stream");
  const temp = `${output}.tmp.mp4`;
  try {
    run("ffmpeg", ["-y", "-i", raw, "-i", narration, "-map", "0:v:0", "-map", "1:a:0",
      "-c:v", "copy", "-af", "acompressor=threshold=-25dB:ratio=3:attack=5:release=50:makeup=2dB,loudnorm=I=-12.5:LRA=7:TP=-1.5:linear=false,apad",
      "-c:a", "aac", "-b:a", "192k", "-t", String(targetSeconds), temp]);
    if (!fs.existsSync(temp) || fs.statSync(temp).size === 0) throw new Error("Mux produced no MP4");
    fs.renameSync(temp, output);
    fs.rmSync(raw);
  } catch (error) {
    if (fs.existsSync(temp)) fs.rmSync(temp);
    throw error;
  }
}
export function inspectMedia(output, narration, spec, contactSheet) {
  const info = probe(output);
  const video = info.streams.find(stream => stream.codec_type === "video");
  const audio = info.streams.find(stream => stream.codec_type === "audio");
  const videoSeconds = Number(info.format.duration);
  const voiceSeconds = duration(narration);
  const fpsParts = (video?.avg_frame_rate || "0/1").split("/").map(Number);
  const fps = fpsParts[0] / fpsParts[1];
  const expectedMs = calculateTimelineDuration(spec).actualDurationMs;
  const expectedSeconds = expectedMs / 1000;
  const failures = [];
  if (video?.codec_name !== "h264") failures.push("VIDEO_CODEC");
  if (audio?.codec_name !== "aac") failures.push("AUDIO_CODEC");
  if (video?.width !== spec.format.width || video?.height !== spec.format.height) failures.push("DIMENSIONS");
  if (Math.abs(fps - (spec.format.fpsPreference || 30)) > 0.02) failures.push("FPS");
  if (Math.abs(videoSeconds - expectedSeconds) > 0.15) failures.push("VIDEO_DURATION");
  if (voiceSeconds > videoSeconds + 0.1 || videoSeconds - voiceSeconds > 1.5) failures.push("VOICE_DURATION");
  const loudnessRun = run("ffmpeg", ["-i", output, "-filter:a",
    "loudnorm=I=-12.5:LRA=7:TP=-1.1:print_format=json", "-vn", "-f", "null", "-"]);
  const match = loudnessRun.stderr.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);
  if (!match) throw new Error("Could not measure EBU R128 loudness");
  const measurement = JSON.parse(match);
  const loudness = {
    integratedLufs: Number(measurement.input_i),
    rangeLu: Number(measurement.input_lra),
    truePeakDbfs: Number(measurement.input_tp)
  };
  if (!(loudness.integratedLufs >= -14 && loudness.integratedLufs <= -12)) failures.push("LOUDNESS_I");
  if (!(loudness.rangeLu < 8)) failures.push("LOUDNESS_LRA");
  if (!(loudness.truePeakDbfs < -1.0)) failures.push("TRUE_PEAK");
  const frames = [];
  try {
    for (let index = 0; index < 4; index++) {
      const still = `${contactSheet}.${index}.jpg`;
      const at = Math.max(0, videoSeconds * ((index + 0.5) / 4));
      run("ffmpeg", ["-y", "-ss", String(at), "-i", output, "-frames:v", "1",
        "-vf", "scale=270:480", "-q:v", "3", still]);
      frames.push(still);
    }
    const images = frames.map((frame, index) =>
      `<image x="${index * 270}" y="0" width="270" height="480" href="data:image/jpeg;base64,${fs.readFileSync(frame).toString("base64")}"/>`).join("");
    fs.writeFileSync(contactSheet, `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="480" viewBox="0 0 1080 480">${images}</svg>`);
  } finally {
    for (const frame of frames) if (fs.existsSync(frame)) fs.rmSync(frame);
  }
  if (!fs.existsSync(contactSheet) || fs.statSync(contactSheet).size === 0) failures.push("CONTACT_SHEET");
  return { pass: failures.length === 0, failures, video: { codec: video?.codec_name, width: video?.width,
    height: video?.height, fps, durationSeconds: videoSeconds }, audio: { codec: audio?.codec_name,
    narrationSeconds: voiceSeconds, ...loudness }, contactSheet };
}
