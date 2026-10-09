import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, projectDir, artifactPath } from "./state.js";

function getFfmpeg() {
  const candidates = [
    path.join(ROOT, ".tools", "ffmpeg", "ffmpeg-9.0.2-full_build", "bin", "ffmpeg.exe"),
    path.join(ROOT, "engines", "remotion", "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe"),
    path.join(ROOT, "projects", "remotion-factory", "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe"),
    "ffmpeg"
  ];
  for (const candidate of candidates) {
    if (candidate === "ffmpeg" || fs.existsSync(candidate)) {
      const res = spawnSync(candidate, ["-version"], { encoding: "utf8", timeout: 5000 });
      if (res.status === 0) return candidate;
    }
  }
  throw new Error("FFmpeg not found");
}

function extractFrame(ffmpegBin, videoFile, timestampSec, outputFile) {
  const res = spawnSync(ffmpegBin, [
    "-y",
    "-ss", String(timestampSec),
    "-i", videoFile,
    "-vframes", "1",
    "-q:v", "2",
    outputFile
  ], { encoding: "utf8", timeout: 30000 });
  return res.status === 0 && fs.existsSync(outputFile);
}

export async function packageProject(projectId) {
  const pDir = projectDir(projectId);
  const finalVideo = path.join(pDir, "output", "final.mp4");
  if (!fs.existsSync(finalVideo)) {
    throw new Error(`Cannot package: missing output/final.mp4 in project ${projectId}. Run final render first.`);
  }

  const distDir = path.join(pDir, "output", "dist");
  const thumbDir = path.join(distDir, "thumbnails");
  fs.mkdirSync(thumbDir, { recursive: true });

  const ffmpegBin = getFfmpeg();

  // Read timing & duration if available
  let durationSec = 30;
  const timingFile = path.join(pDir, "assets", "audio", "timing.json");
  if (fs.existsSync(timingFile)) {
    try {
      const timing = JSON.parse(fs.readFileSync(timingFile, "utf8"));
      if (timing.durationSec) durationSec = timing.durationSec;
    } catch {}
  }

  // Extract 3 Thumbnails
  const hookTime = Math.min(1.5, Math.max(0.5, durationSec * 0.05));
  const climaxTime = durationSec * 0.45;
  const outroTime = Math.max(durationSec - 3, durationSec * 0.85);

  const thumbs = [
    { name: "thumb-hook.jpg", time: hookTime, desc: "Hook Frame (0-2s)" },
    { name: "thumb-climax.jpg", time: climaxTime, desc: "Climax / Solution Frame (~50%)" },
    { name: "thumb-outro.jpg", time: outroTime, desc: "Outro / Call to Action (~85%)" }
  ];

  for (const t of thumbs) {
    const outPath = path.join(thumbDir, t.name);
    extractFrame(ffmpegBin, finalVideo, t.time, outPath);
  }

  // Generate Metadata & Chapters
  let scriptContent = "";
  const scriptFile = path.join(pDir, "script.md");
  if (fs.existsSync(scriptFile)) scriptContent = fs.readFileSync(scriptFile, "utf8");

  let beatsData = [];
  const beatsFile = path.join(pDir, "beats.json");
  if (fs.existsSync(beatsFile)) {
    try { beatsData = JSON.parse(fs.readFileSync(beatsFile, "utf8")); } catch {}
  }

  const cleanTitle = projectId.replace(/^CNT-\d+-/, "").replace(/[-_]/g, " ").toUpperCase();

  const metadata = {
    projectId,
    generatedAt: new Date().toISOString(),
    titles: [
      `Sự Thật Về ${cleanTitle}: Điều Bạn Chưa Từng Được Kể`,
      `Tại Sao ${cleanTitle} Lại Quan Trọng Hơn Bạn Nghĩ?`,
      `Giải Mã ${cleanTitle} Trong 60 Giây (Bí Mật Chuyên Gia)`
    ],
    description: `Khám phá toàn bộ bản chất về ${cleanTitle}. Video giải thích trực quan, dễ hiểu và cô đọng nhất.`,
    hashtags: [
      `#${cleanTitle.replace(/\s+/g, "").toLowerCase()}`,
      "#kienthuc",
      "#hocmoingay",
      "#congnghe",
      "#cuongit",
      "#xuhuong",
      "#videongan"
    ],
    chapters: Array.isArray(beatsData) && beatsData.length > 0 ? beatsData.map((b, idx) => ({
      index: idx + 1,
      title: b.meaning || b.title || `Phần ${idx + 1}`,
      approxTimeSec: Math.round((idx / beatsData.length) * durationSec)
    })) : [
      { index: 1, title: "Hook & Đặt vấn đề", approxTimeSec: 0 },
      { index: 2, title: "Giải mã cốt lõi", approxTimeSec: Math.round(durationSec * 0.3) },
      { index: 3, title: "Tổng kết & Hành động", approxTimeSec: Math.round(durationSec * 0.8) }
    ]
  };

  fs.writeFileSync(path.join(distDir, "metadata.json"), JSON.stringify(metadata, null, 2) + "\n");

  const captionText = `${metadata.titles[0]}\n\n${metadata.description}\n\n${metadata.hashtags.join(" ")}\n`;
  fs.writeFileSync(path.join(distDir, "caption.txt"), captionText);

  console.log("==================================================");
  console.log(`   PACKAGING COMPLETE FOR PROJECT: ${projectId}`);
  console.log("==================================================");
  console.log(`📁 Distribution folder: ${distDir}`);
  console.log(`🖼️  Thumbnails generated in: output/dist/thumbnails/`);
  console.log(`📋 Metadata & SEO titles: output/dist/metadata.json`);
  console.log(`📝 Ready-to-paste caption: output/dist/caption.txt`);
  console.log("==================================================\n");

  return { distDir, metadata };
}
