import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import { analyzeReferenceVideo } from "./analyze.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const VAULT_DIR = path.join(ROOT, "dna-vault");

export async function main(argv = process.argv.slice(2)) {
  const args = minimist(argv);
  const command = args._[0];

  if (!command || command === "help") {
    console.log(`
🧬 [AI Video Factory] DNA Reverse-Engineering & Cloning Engine

Cách sử dụng:
  npm run dna -- analyze <file-video-mẫu> [--id <ten-id>]
      Bóc tách toàn diện video mẫu: FFprobe specs, isolated audio, 1fps frames, contact sheet, và dna.json.

  npm run dna -- list
      Liệt kê toàn bộ các phong cách video (DNA Profiles) đã bóc tách trong dna-vault/.

  npm run dna -- show <dna-id>
      Xem chi tiết thông số DNA, bảng màu, typography và animation physics.

Ví dụ:
  npm run dna -- analyze "D:\\videos\\mau-tech-review.mp4" --id TECH-EXPLAINER-PRO
`);
    return;
  }

  if (command === "analyze") {
    const videoPath = args._[1] || args.path || args.video;
    if (!videoPath) {
      console.error("❌ Lỗi: Vui lòng cung cấp đường dẫn video mẫu. Ví dụ: npm run dna -- analyze sample.mp4");
      process.exit(1);
    }
    await analyzeReferenceVideo(videoPath, args.id);
    return;
  }

  if (command === "list") {
    if (!fs.existsSync(VAULT_DIR)) {
      console.log("dna-vault/ trống. Chưa có mẫu DNA nào.");
      return;
    }
    const entries = fs.readdirSync(VAULT_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory() && fs.existsSync(path.join(VAULT_DIR, d.name, "dna.json")));

    console.log(`\n🧬 Danh mục DNA Profiles trong dna-vault (${entries.length} phong cách):\n`);
    for (const ent of entries) {
      try {
        const dna = JSON.parse(fs.readFileSync(path.join(VAULT_DIR, ent.name, "dna.json"), "utf8"));
        console.log(`• [${dna.id}]`);
        console.log(`  └─ Thời lượng: ${dna.mediaSpecs.durationSec}s | Khung hình: ${dna.mediaSpecs.width}x${dna.mediaSpecs.height} (${dna.mediaSpecs.aspectRatio})`);
        console.log(`  └─ Nhịp độ: ${dna.rhythmAndPacing.pacingVelocity} (Cắt mỗi ${dna.rhythmAndPacing.avgCutIntervalSec}s)`);
        console.log(`  └─ Thư mục: dna-vault/${ent.name}/\n`);
      } catch {
        console.log(`• ${ent.name} (Chưa hoàn tất dna.json)`);
      }
    }
    return;
  }

  if (command === "show") {
    const id = args._[1] || args.id;
    if (!id) {
      console.error("Vui lòng cung cấp id DNA.");
      process.exit(1);
    }
    const file = path.join(VAULT_DIR, id, "dna.json");
    if (!fs.existsSync(file)) {
      console.error(`Không tìm thấy profile DNA: ${id}`);
      process.exit(1);
    }
    console.log(fs.readFileSync(file, "utf8"));
    return;
  }

  console.error(`Lệnh không hợp lệ: ${command}. Gõ 'npm run dna' để xem trợ giúp.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
