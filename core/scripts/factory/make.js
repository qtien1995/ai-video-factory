import minimist from "minimist";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { ROOT, projectDir } from "./state.js";

const argv = minimist(process.argv.slice(2));
const project = argv.project || argv.p;

if (!project) {
  console.log(`
🎬 [AI Video Factory] Lệnh Chạy Nhanh 1 Bước (All-in-One Make)
============================================================
Cách sử dụng:
  npm run make -- --project <tên_folder_dự_án>

Ví dụ:
  npm run make -- --project CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3

Quy trình tự động gồm 4 bước:
  1. Fast-track duyệt kịch bản & hướng thị giác (Gate 1 -> Gate 2)
  2. Tạo giọng đọc TTS & đo nhịp mili-giây từng từ thật
  3. Render Final MP4 (1080x1920) + Chuẩn hóa âm thanh EBU R128 (-12.5 LUFS)
  4. Đóng gói 3 Thumbnails, metadata SEO và caption mạng xã hội
`);
  process.exit(0);
}

try {
  const pDir = projectDir(project);
  console.log(`\n🚀 [MAKE PIPELINE] Bắt đầu sản xuất video cho dự án: ${project}`);
  console.log(`📂 Thư mục: ${pDir}\n`);

  const factoryCli = path.join(ROOT, "core", "scripts", "factory", "index.js");

  // Bước 1: Fast-track phê duyệt
  console.log(`▶️ [1/4] Kiểm tra & Duyệt kịch bản (Fast-Track Gates)...`);
  const step1 = spawnSync(process.execPath, [factoryCli, "fast-track", "--project", project], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (step1.status !== 0) {
    throw new Error("Lỗi tại Bước 1 (Fast-Track)");
  }

  // Bước 2: Tạo giọng đọc & nhịp timing
  console.log(`\n▶️ [2/4] Tạo giọng thuyết minh & Đo nhịp từng từ (TTS & Timing)...`);
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

  // Bước 4: Đóng gói
  console.log(`\n▶️ [4/4] Đóng gói thành phẩm (Thumbnails, SEO Metadata)...`);
  const step4 = spawnSync(process.execPath, [factoryCli, "package", "--project", project], {
    cwd: ROOT,
    stdio: "inherit",
  });
  if (step4.status !== 0) {
    throw new Error("Lỗi tại Bước 4 (Package)");
  }

  const finalVideo = path.join(pDir, "output", "final.mp4");
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
