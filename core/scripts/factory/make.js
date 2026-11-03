import minimist from "minimist";
import { spawnSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { ROOT, projectDir } from "./state.js";

const argv = minimist(process.argv.slice(2));
const project = argv.project || argv.p;

if (!project) {
  console.log(`
🎬 [AI Video Factory V4] Lệnh Sản Xuất Video (Make Pipeline)
============================================================
Cách sử dụng:
  npm run make -- --project <tên_folder_dự_án>

Ví dụ:
  npm run make -- --project CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3

Quy trình tự động gồm 4 bước:
  1. Kiểm tra Cổng Duyệt User (Gate 1 kịch bản + Gate 2 Art Direction Sheet)
  2. Tạo giọng đọc TTS Hải Đăng & đo nhịp mili-giây từng từ thật
  3. Render Final MP4 (1080x1920, EBU R128) + Trích xuất storyboard-check + Hard QC Gate
  4. Đóng gói thumbnails, metadata SEO và hoàn thiện output
`);
  process.exit(0);
}

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
        const test = spawnSync(candidate, ["-version"], { encoding: "utf8", timeout: 8000 });
        if (test.status === 0) return candidate;
      } catch {}
    }
  }
  return name;
}

try {
  const pDir = projectDir(project);
  console.log(`\n🚀 [MAKE PIPELINE V4] Bắt đầu sản xuất video bespoke cho: ${project}`);
  console.log(`📂 Thư mục: ${pDir}\n`);

  const factoryCli = path.join(ROOT, "core", "scripts", "factory", "index.js");

  // Bước 1: Kiểm tra Cổng duyệt (Gate 1 & Gate 2) - CẤM FAST-TRACK
  console.log(`▶️ [1/4] Kiểm tra Cổng Duyệt User (Gate 1 & Gate 2)...`);
  const nextRes = spawnSync(process.execPath, [factoryCli, "next", "--project", project], {
    cwd: ROOT,
    encoding: "utf8",
  });
  if (nextRes.status !== 0) {
    throw new Error(`Không thể kiểm tra trạng thái dự án: ${nextRes.stderr || nextRes.error?.message}`);
  }

  let nextStage = "";
  try {
    const nextJson = JSON.parse(nextRes.stdout.trim());
    nextStage = nextJson.next;
  } catch {
    nextStage = "";
  }

  const unapprovedStages = ["SCRIPT", "BEATS", "GATE1", "CREATIVE_DIRECTION", "GATE2"];
  if (unapprovedStages.includes(nextStage)) {
    console.error(`\n⛔ [GATE CHECK BLOCKED]: Dự án '${project}' đang ở giai đoạn '${nextStage}', CHƯA ĐƯỢC USER DUYỆT!`);
    console.error(`   Quy định V4 Bespoke: Cấm fast-track tự duyệt dưới mọi hình thức.`);
    console.error(`   👉 Trình kịch bản + Art Direction Sheet cho User.`);
    console.error(`   👉 Duyệt xong dùng lệnh: node core/scripts/factory/index.js approve --project ${project} --gate <GATE1|GATE2> --reviewer "User"`);
    process.exit(1);
  }
  console.log(`   ✅ Cổng duyệt hợp lệ (Giai đoạn tiếp theo: ${nextStage})`);

  // Bước 2: Tạo giọng đọc & nhịp timing (Hải Đăng)
  console.log(`\n▶️ [2/4] Tạo giọng thuyết minh & Đo nhịp từng từ (TTS Hải Đăng)...`);
  const step2 = spawnSync(process.execPath, [factoryCli, "tts", "--project", project], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (step2.status !== 0) {
    throw new Error("Lỗi tại Bước 2 (TTS & Timing)");
  }

  // Bước 3: Render Final MP4
  console.log(`\n▶️ [3/4] Dựng hình Remotion & Chuẩn hóa âm lượng EBU R128 (Render Final)...`);
  const step3 = spawnSync(
    process.execPath,
    [factoryCli, "render", "--kind", "final", "--project", project],
    {
      cwd: ROOT,
      stdio: "inherit",
    }
  );
  if (step3.status !== 0) {
    throw new Error("Lỗi tại Bước 3 (Render Final MP4)");
  }

  const finalVideo = path.join(pDir, "output", "final.mp4");
  if (!fs.existsSync(finalVideo)) {
    throw new Error(`File output/final.mp4 không tồn tại sau render!`);
  }

  // (a) Trích frame tĩnh tại 10/30/50/70/90% vào <project>/output/storyboard-check/
  const storyboardCheckDir = path.join(pDir, "output", "storyboard-check");
  fs.mkdirSync(storyboardCheckDir, { recursive: true });
  console.log(`\n📸 Đang trích xuất frame tĩnh (10%, 30%, 50%, 70%, 90%) vào storyboard-check/...`);

  const ffprobeBin = resolveBinary("ffprobe");
  const ffmpegBin = resolveBinary("ffmpeg");

  const probeDur = spawnSync(ffprobeBin, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    finalVideo,
  ], { encoding: "utf8" });
  const totalSec = parseFloat(probeDur.stdout.trim()) || 0;

  const percentages = [10, 30, 50, 70, 90];
  for (const pct of percentages) {
    const timeSec = (totalSec * pct) / 100;
    const frameOut = path.join(storyboardCheckDir, `frame_${pct}pct_${timeSec.toFixed(2)}s.png`);
    spawnSync(ffmpegBin, [
      "-y",
      "-ss", String(timeSec),
      "-i", finalVideo,
      "-vframes", "1",
      "-q:v", "2",
      frameOut,
    ]);
  }
  console.log(`   ✅ Đã trích 5 frame tĩnh tại 10%, 30%, 50%, 70%, 90%`);

  // (b) Chạy bộ kiểm định lên file final: tests/e2e/test_final_video.cjs
  console.log(`\n🔬 [HARD QC GATE] Chạy bộ kiểm định E2E chất lượng video final...`);
  const testSuite = path.join(ROOT, "tests", "e2e", "test_final_video.cjs");
  const qcRes = spawnSync(process.execPath, [testSuite, "--project", pDir], {
    cwd: ROOT,
    stdio: "inherit",
  });

  // (c) Fail BẤT KỲ mục nào -> đổi tên thành final.FAILED.mp4, in các mục fail, exit 1
  if (qcRes.status !== 0) {
    const failedVideo = path.join(pDir, "output", "final.FAILED.mp4");
    if (fs.existsSync(finalVideo)) {
      if (fs.existsSync(failedVideo)) fs.rmSync(failedVideo);
      fs.renameSync(finalVideo, failedVideo);
    }
    console.error(`\n❌ [HARD QC FAILED]: Video không đạt chuẩn kiểm định!`);
    console.error(`   Đã đổi tên: final.mp4 -> final.FAILED.mp4`);
    console.error(`   Chỉ pass toàn bộ tiêu chuẩn mới được giữ file final.mp4.`);
    process.exit(1);
  }
  console.log(`   ✅ HARD QC GATE: 100% TIÊU CHUẨN ĐẠT! Giữ nguyên final.mp4.`);

  // Bước 4: Đóng gói
  console.log(`\n▶️ [4/4] Đóng gói thành phẩm (Thumbnails, SEO Metadata)...`);
  const step4 = spawnSync(process.execPath, [factoryCli, "package", "--project", project], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (step4.status !== 0) {
    throw new Error("Lỗi tại Bước 4 (Package)");
  }

  const qcFile = path.join(pDir, "output", "final-qc.json");

  console.log(`\n============================================================`);
  console.log(`🎉 XUẤT XƯỞNG THÀNH CÔNG DỰ ÁN: ${project}`);
  console.log(`============================================================`);
  if (fs.existsSync(finalVideo)) {
    const stats = fs.statSync(finalVideo);
    console.log(`🎬 Video Final: ${finalVideo} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
  }
  if (fs.existsSync(qcFile)) {
    console.log(`📊 Báo cáo QC:  ${qcFile}`);
  }
  console.log(`============================================================\n`);
} catch (error) {
  console.error(`\n❌ [MAKE FAILED]: ${error.message}`);
  process.exit(1);
}
