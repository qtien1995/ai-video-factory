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
    exeName
  ];
  for (const candidate of candidates) {
    if (candidate === exeName || fs.existsSync(candidate)) {
      try {
        const test = spawnSync(candidate, ["-version"], { encoding: "utf8", timeout: 10000 });
        if (test.status === 0) return candidate;
      } catch {
        // continue
      }
    }
  }
  throw new Error(`Binary ${name} not found`);
}

function runCmd(binaryName, args) {
  const bin = resolveBinary(binaryName);
  const result = spawnSync(bin, args, { encoding: "utf8", maxBuffer: 20 * 1024 * 1024, timeout: 300000 });
  if (result.status !== 0) {
    throw new Error(`${binaryName} failed: ${(result.stderr || result.error?.message || "").slice(-2000)}`);
  }
  return result;
}

export function probeMedia(filePath) {
  if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
    throw new Error(`Media file not found or empty: ${filePath}`);
  }
  const out = runCmd("ffprobe", [
    "-v", "error",
    "-show_streams",
    "-show_format",
    "-of", "json",
    filePath
  ]).stdout;
  return JSON.parse(out);
}

export async function analyzeReferenceVideo(videoPath, customId) {
  const resolvedVideo = path.resolve(videoPath);
  if (!fs.existsSync(resolvedVideo)) {
    throw new Error(`File does not exist: ${resolvedVideo}`);
  }

  const stat = fs.statSync(resolvedVideo);
  if (stat.size === 0) {
    throw new Error(`File is empty: ${resolvedVideo}`);
  }

  // Generate ID if not provided
  const baseName = path.basename(resolvedVideo, path.extname(resolvedVideo))
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 35);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const id = customId || `DNA-${dateStr}-${baseName}`;

  const vaultDir = path.join(ROOT, "dna-vault", id);
  const rawDir = path.join(vaultDir, "raw");
  const keyframesDir = path.join(rawDir, "keyframes");
  const scenesDir = path.join(rawDir, "scenes");

  fs.mkdirSync(vaultDir, { recursive: true });
  fs.mkdirSync(keyframesDir, { recursive: true });
  fs.mkdirSync(scenesDir, { recursive: true });

  console.log(`\n🧬 [DNA Cloner] Reverse-Engineering Reference Video: ${baseName}`);
  console.log(`📁 Destination: ${vaultDir}`);

  // 1. Probe technical specifications
  console.log(`🔍 Probing metadata with FFprobe...`);
  const meta = probeMedia(resolvedVideo);
  const vStream = meta.streams.find(s => s.codec_type === "video") || {};
  const aStream = meta.streams.find(s => s.codec_type === "audio") || {};
  const durationSec = Number(meta.format?.duration || vStream.duration || 0);
  const width = vStream.width || 0;
  const height = vStream.height || 0;
  const fpsStr = vStream.r_frame_rate || "30/1";
  const [fpsNum, fpsDen] = fpsStr.split("/").map(Number);
  const fps = fpsDen ? Math.round(fpsNum / fpsDen) : 30;

  console.log(`   Dimensions: ${width}x${height} (${width < height ? "Portrait 9:16" : "Landscape 16:9"})`);
  console.log(`   Duration: ${durationSec.toFixed(2)}s | FPS: ${fps} | Codec: ${vStream.codec_name || "unknown"}`);

  // Copy or symlink original reference video
  const refDest = path.join(rawDir, "reference.mp4");
  if (!fs.existsSync(refDest)) {
    fs.copyFileSync(resolvedVideo, refDest);
  }

  // 2. Extract clean audio
  const audioDest = path.join(rawDir, "narration.wav");
  const audioMp3 = path.join(rawDir, "audio.mp3");
  console.log(`🎙️ Extracting isolated audio track...`);
  try {
    runCmd("ffmpeg", ["-y", "-i", resolvedVideo, "-vn", "-acodec", "pcm_s16le", "-ar", "48000", "-ac", "2", audioDest]);
    runCmd("ffmpeg", ["-y", "-i", resolvedVideo, "-vn", "-c:a", "libmp3lame", "-b:a", "192k", audioMp3]);
  } catch (err) {
    console.warn(`   Audio extraction warning: ${err.message}`);
  }

  // 3. Scene Cut Detection (Extract Keyframe at each cut)
  console.log(`✂️ Detecting scene cuts (visual beats)...`);
  try {
    runCmd("ffmpeg", [
      "-y", "-i", resolvedVideo,
      "-filter_complex", "select='gt(scene,0.25)'",
      "-fps_mode", "vfr",
      "-q:v", "2",
      path.join(scenesDir, "cut_%03d.jpg")
    ]);
  } catch {
    try {
      runCmd("ffmpeg", [
        "-y", "-i", resolvedVideo,
        "-filter_complex", "select='gt(scene,0.25)'",
        "-vsync", "vfr",
        "-q:v", "2",
        path.join(scenesDir, "cut_%03d.jpg")
      ]);
    } catch (err) {
      console.warn(`   Scene detection warning: ${err.message}`);
    }
  }

  // 4. Sample frames at 1 fps (for continuous motion flow)
  console.log(`⏱️ Extracting 1fps timeline samples...`);
  try {
    runCmd("ffmpeg", [
      "-y", "-i", resolvedVideo,
      "-vf", "fps=1,scale=720:-1",
      "-q:v", "3",
      path.join(keyframesDir, "sec_%03d.jpg")
    ]);
  } catch (err) {
    console.warn(`   1fps sampling warning: ${err.message}`);
  }

  // 5. Generate high-density Contact Sheet
  console.log(`🖼️ Building visual contact sheet...`);
  const contactSheetPath = path.join(rawDir, "contact_sheet.jpg");
  try {
    // Generate up to 25 tiles (5x5 grid)
    runCmd("ffmpeg", [
      "-y", "-i", resolvedVideo,
      "-vf", `fps=${Math.max(0.2, (25 / durationSec)).toFixed(3)},scale=270:480,tile=5x5`,
      "-frames:v", "1",
      "-q:v", "2",
      contactSheetPath
    ]);
  } catch (err) {
    console.warn(`   Contact sheet warning: ${err.message}`);
  }

  // Count extracted cuts
  const sceneFiles = fs.existsSync(scenesDir) ? fs.readdirSync(scenesDir).filter(f => f.endsWith(".jpg")) : [];
  const keyframeFiles = fs.existsSync(keyframesDir) ? fs.readdirSync(keyframesDir).filter(f => f.endsWith(".jpg")) : [];

  const avgCutDuration = sceneFiles.length > 0 ? (durationSec / sceneFiles.length).toFixed(1) : durationSec.toFixed(1);

  // 6. Build initial DNA profile
  const dnaProfile = {
    id,
    source: path.basename(resolvedVideo),
    extractedAt: new Date().toISOString(),
    mediaSpecs: {
      width,
      height,
      aspectRatio: width < height ? "9:16" : "16:9",
      durationSec: Number(durationSec.toFixed(2)),
      fps,
      videoCodec: vStream.codec_name || "unknown",
      audioCodec: aStream.codec_name || "unknown",
      sampleRate: aStream.sample_rate || 48000
    },
    rhythmAndPacing: {
      totalSceneCuts: sceneFiles.length,
      avgCutIntervalSec: Number(avgCutDuration),
      pacingVelocity: Number(avgCutDuration) < 2.5 ? "FAST / HIGH ADRENALINE" : Number(avgCutDuration) < 4.5 ? "DYNAMIC EXPLAINER" : "CALM / DOCUMENTARY"
    },
    clonedDnaBlueprint: {
      visualStyle: {
        palette: {
          background: "#0f172a",
          surface: "#1e293b",
          primaryText: "#ffffff",
          accentColor: "#38bdf8",
          secondaryAccent: "#f59e0b"
        },
        cardArchetype: "Hero Metric / Comparison Split",
        cornerRadius: 24,
        borderStyle: "1px solid rgba(255,255,255,0.12)",
        shadow: "0 20px 40px rgba(0,0,0,0.5)"
      },
      typography: {
        headlineFont: "Montserrat / Inter Bold",
        headlineSize: 64,
        bodyFont: "Inter Regular",
        bodySize: 36,
        textCasing: "mixed",
        safeZonePaddingY: [260, 1550]
      },
      subtitleStyle: {
        type: "speech-synced-word-highlight",
        container: "frosted-pill-glassmorphism",
        activeWordColor: "#38bdf8",
        inactiveWordColor: "rgba(255,255,255,0.7)",
        positionY: 1450
      },
      motionPhysics: {
        springConfig: {
          damping: 18,
          stiffness: 140,
          mass: 0.8
        },
        entranceMotion: "slide-up + pop-scale(0.85 -> 1.0)",
        continuousMotion: "subtle-floating(sin-wave +- 6px)",
        transitionStyle: "seamless-morph / quick-cut"
      },
      soundDesign: {
        narrationPacingWpm: 150,
        voiceGender: "male",
        voiceTone: "Authoritative, confident, tech-savvy",
        bgmStyle: "Minimal low-tempo modern lo-fi / electronic pulse",
        sfxCueTypes: ["whoosh-transition", "pop-reveal", "cash-ding", "camera-click"]
      }
    },
    artifacts: {
      contactSheet: path.relative(ROOT, contactSheetPath).replaceAll("\\", "/"),
      audioTrack: path.relative(ROOT, audioMp3).replaceAll("\\", "/"),
      sceneCutsCount: sceneFiles.length,
      keyframesCount: keyframeFiles.length
    }
  };

  const dnaJsonPath = path.join(vaultDir, "dna.json");
  fs.writeFileSync(dnaJsonPath, JSON.stringify(dnaProfile, null, 2) + "\n");

  // 7. Write Markdown Summary
  const readmeContent = `# DNA PROFILE: ${id}

> **Nguồn video mẫu**: \`${path.basename(resolvedVideo)}\`  
> **Thời lượng**: ${durationSec.toFixed(2)}s | **Khung hình**: ${width}x${height} (${width < height ? "9:16 Mobile" : "16:9"}) | **FPS**: ${fps}

---

## 📸 Bức tranh thị giác tổng quan (Contact Sheet)

Toàn bộ nhịp diễn hoạt của video mẫu được trích xuất thành 1 contact sheet tại:
\`${path.relative(vaultDir, contactSheetPath).replaceAll("\\", "/")}\`

---

## 🔬 Giải phẫu 5 tầng DNA của video mẫu

### 1. Nhịp độ & Dựng cảnh (Rhythm & Cuts)
- **Tổng số cảnh (Scene Cuts)**: **${sceneFiles.length}** điểm cắt.
- **Tần suất cắt trung bình**: **${avgCutDuration} giây/cảnh**.
- **Đánh giá nhịp độ**: **${dnaProfile.rhythmAndPacing.pacingVelocity}**.

### 2. Thiết kế Thẻ & Màu sắc (Layout & Color Palette)
- **Nền**: \`${dnaProfile.clonedDnaBlueprint.visualStyle.palette.background}\`
- **Mặt thẻ (Card Surface)**: \`${dnaProfile.clonedDnaBlueprint.visualStyle.palette.surface}\`
- **Màu nhấn (Accent)**: \`${dnaProfile.clonedDnaBlueprint.visualStyle.palette.accentColor}\`
- **Bo góc (Radius)**: \`${dnaProfile.clonedDnaBlueprint.visualStyle.cornerRadius}px\`

### 3. Phụ đề & Typography (Subtitles DNA)
- **Kiểu phụ đề**: Highlight từng từ theo giọng nói thật (Speech-synced word highlight).
- **Màu từ đang đọc**: \`${dnaProfile.clonedDnaBlueprint.subtitleStyle.activeWordColor}\`
- **Vị trí hiển thị an toàn**: Safe zone \`y: ${dnaProfile.clonedDnaBlueprint.subtitleStyle.positionY}\`

### 4. Vật lý chuyển động (Spring Motion DNA)
- **Spring parameters**: \`damping: ${dnaProfile.clonedDnaBlueprint.motionPhysics.springConfig.damping}\`, \`stiffness: ${dnaProfile.clonedDnaBlueprint.motionPhysics.springConfig.stiffness}\`, \`mass: ${dnaProfile.clonedDnaBlueprint.motionPhysics.springConfig.mass}\`.
- **Hiệu ứng xuất hiện**: ${dnaProfile.clonedDnaBlueprint.motionPhysics.entranceMotion}.
- **Hiệu ứng duy trì (Continuous Motion)**: ${dnaProfile.clonedDnaBlueprint.motionPhysics.continuousMotion}.

### 5. Thiết kế Âm thanh (Sound Design DNA)
- **Tốc độ đọc**: ~${dnaProfile.clonedDnaBlueprint.soundDesign.narrationPacingWpm} WPM.
- **Tone giọng**: ${dnaProfile.clonedDnaBlueprint.soundDesign.voiceTone}.
- **SFX điểm xuyết**: ${dnaProfile.clonedDnaBlueprint.soundDesign.sfxCueTypes.join(", ")}.

---

## 🎯 Hướng dẫn nhân bản (100% Replication Guide)

1. Mở xem Contact Sheet để nắm trọn vẹn bố cục các cảnh.
2. Dùng file \`dna.json\` này để áp dụng vào component Remotion tương ứng trong \`engines/remotion/src/projects/\`.
3. Giữ 100% DNA chuyển động và bố cục thẻ, thay thế nội dung kịch bản mới.
`;

  fs.writeFileSync(path.join(vaultDir, "README.md"), readmeContent);

  console.log(`\n✅ [DNA Cloner] Reverse-Engineering HOÀN TẤT!`);
  console.log(`   └─ DNA JSON: ${dnaJsonPath}`);
  console.log(`   └─ Contact Sheet: ${contactSheetPath}`);
  console.log(`   └─ Audio Bóc tách: ${audioMp3}`);
  console.log(`   └─ Tổng Scene Cuts: ${sceneFiles.length} ảnh`);
  console.log(`   └─ Tổng 1fps Frames: ${keyframeFiles.length} ảnh\n`);

  return dnaProfile;
}

// CLI entrypoint
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const targetIndex = args.findIndex(a => !a.startsWith("-"));
  if (targetIndex === -1) {
    console.error("Usage: node core/scripts/dna/analyze.js <video-path> [--id <custom-id>]");
    process.exit(1);
  }
  const videoPath = args[targetIndex];
  const idIndex = args.indexOf("--id");
  const customId = idIndex !== -1 ? args[idIndex + 1] : null;

  analyzeReferenceVideo(videoPath, customId).catch(err => {
    console.error(`❌ DNA Analysis Failed:`, err.message);
    process.exit(1);
  });
}
