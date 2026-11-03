import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function resolveBinary(name) {
  const exeName = process.platform === "win32" ? `${name}.exe` : name;
  const candidates = [
    path.join(ROOT, ".tools", "ffmpeg", "ffmpeg-9.0.2-full_build", "bin", exeName),
    path.join(ROOT, "engines", "remotion", "node_modules", "@remotion", "compositor-win32-x64-msvc", exeName),
    exeName,
  ];

  for (const candidate of candidates) {
    if (candidate === exeName || fs.existsSync(candidate)) {
      try {
        const test = spawnSync(candidate, ["-version"], {
          encoding: "utf8",
          timeout: 10000,
        });
        if (test.status === 0) return candidate;
      } catch {
        // continue
      }
    }
  }
  throw new Error(`Binary ${name} unavailable in environment or tools path`);
}

function runCmd(binaryName, args) {
  const bin = resolveBinary(binaryName);
  const result = spawnSync(bin, args, {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    timeout: 300000,
  });
  return result;
}

export function measureReference(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // 1. Technical specs via ffprobe
  const probeRes = runCmd("ffprobe", [
    "-v", "error",
    "-show_streams",
    "-show_format",
    "-of", "json",
    filePath,
  ]);
  if (probeRes.status !== 0) {
    throw new Error(`ffprobe failed: ${probeRes.stderr || probeRes.error?.message}`);
  }
  const probeData = JSON.parse(probeRes.stdout);
  const videoStream = probeData.streams?.find((s) => s.codec_type === "video");
  const audioStream = probeData.streams?.find((s) => s.codec_type === "audio");

  const durationSec = Number(probeData.format?.duration || videoStream?.duration || 0);

  let fps = 30;
  if (videoStream?.r_frame_rate) {
    const [num, den] = videoStream.r_frame_rate.split("/").map(Number);
    if (den && num) fps = Math.round((num / den) * 100) / 100;
  }

  const resolution = {
    width: videoStream?.width || 0,
    height: videoStream?.height || 0,
    aspectRatio: videoStream ? `${videoStream.width}:${videoStream.height}` : "unknown",
  };

  // 2. EBU R128 Loudness + True Peak
  let audioMetrics = null;
  if (audioStream) {
    const ebuRes = runCmd("ffmpeg", [
      "-i", filePath,
      "-af", "ebur128=peak=true",
      "-f", "null",
      "-",
    ]);
    const stderr = ebuRes.stderr || "";

    const lufsMatches = [...stderr.matchAll(/I:\s+([-\d.]+)\s+LUFS/g)];
    const peakMatches = [...stderr.matchAll(/Peak:\s+([-\d.]+)\s+dBFS/g)];
    const lraMatches = [...stderr.matchAll(/LRA:\s+([-\d.]+)\s+LU/g)];

    const lastLufs = lufsMatches.length > 0 ? lufsMatches[lufsMatches.length - 1] : null;
    const lastPeak = peakMatches.length > 0 ? peakMatches[peakMatches.length - 1] : null;
    const lastLra = lraMatches.length > 0 ? lraMatches[lraMatches.length - 1] : null;

    audioMetrics = {
      integratedLufs: lastLufs ? parseFloat(lastLufs[1]) : null,
      truePeakDbfs: lastPeak ? parseFloat(lastPeak[1]) : null,
      lra: lastLra ? parseFloat(lastLra[1]) : null,
    };
  }

  // 3. Scene cuts detection
  const cutRes = runCmd("ffmpeg", [
    "-i", filePath,
    "-filter:v", "select='gt(scene,0.4)',showinfo",
    "-f", "null",
    "-",
  ]);
  const cutStderr = cutRes.stderr || "";
  const cutMatches = [...cutStderr.matchAll(/pts_time:\s*([\d.]+)/g)];
  const cutTimestampsSec = cutMatches.map((m) => parseFloat(m[1]));
  const cutTimestampsMs = cutTimestampsSec.map((t) => Math.round(t * 1000));

  // 4. Silence detection > 0.7s
  const silences = [];
  if (audioStream) {
    const silRes = runCmd("ffmpeg", [
      "-i", filePath,
      "-af", "silencedetect=noise=-30dB:d=0.7",
      "-f", "null",
      "-",
    ]);
    const silStderr = silRes.stderr || "";
    const startMatches = [...silStderr.matchAll(/silence_start:\s*([\d.]+)/g)];
    const endMatches = [...silStderr.matchAll(/silence_end:\s*([\d.]+)\s*\|\s*silence_duration:\s*([\d.]+)/g)];

    for (let i = 0; i < startMatches.length; i++) {
      const start = parseFloat(startMatches[i][1]);
      const end = endMatches[i] ? parseFloat(endMatches[i][1]) : durationSec;
      const dur = endMatches[i] ? parseFloat(endMatches[i][2]) : end - start;
      silences.push({
        startSec: start,
        endSec: end,
        durationSec: Math.round(dur * 1000) / 1000,
      });
    }
  }

  return {
    filePath: path.resolve(filePath),
    duration: {
      seconds: durationSec,
      formatted: `${Math.floor(durationSec / 60)}m ${Math.round(durationSec % 60)}s`,
    },
    resolution,
    fps,
    codec: {
      video: videoStream?.codec_name || "unknown",
      audio: audioStream?.codec_name || "none",
    },
    audioEbuR128: audioMetrics,
    sceneCuts: {
      totalCuts: cutTimestampsMs.length,
      cutTimestampsMs,
      cutTimestampsSec,
      avgCutIntervalSec:
        cutTimestampsSec.length > 0
          ? Math.round((durationSec / (cutTimestampsSec.length + 1)) * 100) / 100
          : durationSec,
    },
    silences: {
      count: silences.length,
      thresholdSec: 0.7,
      segments: silences,
    },
  };
}

// CLI usage
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const target = process.argv[2];
  if (!target) {
    console.error("Usage: node core/scripts/validate/reference.js <path-to-video.mp4>");
    process.exit(1);
  }

  try {
    const result = measureReference(target);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}
