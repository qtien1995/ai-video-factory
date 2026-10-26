import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const STYLES_DIR = path.join(ROOT, "styles");
const REGISTRY_PATH = path.join(STYLES_DIR, "registry.json");

function getRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    return { version: "1.0.0", styles: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
  } catch (err) {
    console.error("Lỗi đọc registry.json:", err.message);
    return { version: "1.0.0", styles: [] };
  }
}

export async function main(argv = process.argv.slice(2)) {
  const args = minimist(argv);
  const command = args._[0];

  if (!command || command === "help") {
    console.log(`
🎨 [AI Video Factory] Quản Lý Thư Viện Style Tập Trung

Cách sử dụng:
  npm run style -- list
      Hiển thị toàn bộ danh sách các Style đang có trong xưởng và thể loại phù hợp.

  npm run style -- show <style-id>
      Xem chi tiết thông số Style: Bảng màu, typography, spring physics, vị trí phụ đề.

  npm run style -- create <style-id> [--name <tên>] [--category <chủ-đề>]
      Khởi tạo nhanh khung một Style mới trong styles/<style-id>/ và đăng ký vào hệ thống.

Ví dụ:
  npm run style -- list
  npm run style -- show dark-finance-pro
  npm run style -- create neon-cyberpunk --name "Neon Cyberpunk" --category tech
`);
    return;
  }

  if (command === "list") {
    const reg = getRegistry();
    console.log(`\n========================================================================`);
    console.log(`🎨 DANH MỤC CÁC STYLE VIDEO CÓ SẴN TRONG XƯỞNG (${reg.styles.length} STYLES)`);
    console.log(`========================================================================\n`);

    for (const s of reg.styles) {
      console.log(`🔹 [${s.id}] — ${s.name} (${s.category.toUpperCase()})`);
      console.log(`   ├─ Mục đích: ${s.purpose}`);
      console.log(`   ├─ Phù hợp nhất: ${s.bestFor ? s.bestFor.join(", ") : "N/A"}`);
      console.log(`   ├─ Nhịp độ: ${s.targetWpm || 150} WPM | Cắt cảnh: ~${s.avgCutIntervalSec || 3.0}s/cut`);
      console.log(`   └─ Thư mục: ${s.path}/\n`);
    }

    console.log(`💡 Mẹo: Khi tạo video mới, bạn chỉ cần chọn ID của style mong muốn.`);
    console.log(`   Ví dụ: "Làm video theo style dark-finance-pro"\n`);
    return;
  }

  if (command === "show") {
    const styleId = args._[1] || args.id;
    if (!styleId) {
      console.error("❌ Vui lòng cung cấp style-id. Ví dụ: npm run style -- show dark-finance-pro");
      process.exit(1);
    }

    const reg = getRegistry();
    const styleMeta = reg.styles.find(s => s.id.toLowerCase() === styleId.toLowerCase());
    const styleDir = path.join(STYLES_DIR, styleId);
    const styleJsonPath = path.join(styleDir, "style.json");

    if (!fs.existsSync(styleJsonPath)) {
      console.error(`❌ Không tìm thấy style '${styleId}' tại ${styleDir}`);
      process.exit(1);
    }

    const styleJson = JSON.parse(fs.readFileSync(styleJsonPath, "utf8"));

    console.log(`\n========================================================================`);
    console.log(`🎨 THÔNG TIN CHI TIẾT STYLE: ${styleJson.name || styleId} [${styleId}]`);
    console.log(`========================================================================\n`);
    console.log(`📌 Mục đích: ${styleJson.purpose}`);
    console.log(`🎬 Phù hợp: ${styleJson.bestFor?.join("; ")}`);
    console.log(`\n🎨 BẢNG MÀU (COLOR PALETTE):`);
    console.log(`   ├─ Background:        ${styleJson.visual?.palette?.background}`);
    console.log(`   ├─ Surface (Thẻ):     ${styleJson.visual?.palette?.surface}`);
    console.log(`   ├─ Accent chính:      ${styleJson.visual?.palette?.accentPrimary}`);
    console.log(`   ├─ Accent phụ:        ${styleJson.visual?.palette?.accentSecondary}`);
    console.log(`   ├─ Tăng trưởng (+):   ${styleJson.visual?.palette?.positive}`);
    console.log(`   └─ Rủi ro/Giảm (-):   ${styleJson.visual?.palette?.negative}`);

    console.log(`\n✍️ TYPOGRAPHY & PHỤ ĐỀ:`);
    console.log(`   ├─ Font tiêu đề:      ${styleJson.typography?.headlineFont}`);
    console.log(`   ├─ Font nội dung:     ${styleJson.typography?.bodyFont}`);
    console.log(`   └─ Safe Zone Y:       [${styleJson.typography?.safeZoneY?.join(", ")}]`);

    console.log(`\n⚡ CHUYỂN ĐỘNG & ÂM THANH:`);
    console.log(`   ├─ Tốc độ đọc (WPM):  ~${styleJson.motion?.targetWpm || 150} từ/phút`);
    console.log(`   ├─ Nhịp cắt cảnh:     ${styleJson.beatSeconds?.min}s – ${styleJson.beatSeconds?.max}s/cảnh`);
    console.log(`   └─ Tone giọng đọc:    ${styleJson.audio?.tone}\n`);
    return;
  }

  if (command === "create") {
    const rawId = args._[1] || args.id;
    if (!rawId) {
      console.error("❌ Vui lòng cung cấp style-id. Ví dụ: npm run style -- create neon-minimal");
      process.exit(1);
    }

    const { exportDnaToStylePack } = await import("./exporter.js");
    const dummyDna = {
      id: rawId,
      source: "Manual Template Creation",
      rhythmAndPacing: {
        avgCutIntervalSec: 3.2,
        pacingVelocity: "DYNAMIC EXPLAINER"
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
          cardArchetype: "Standard Explainer Card",
          cornerRadius: 20
        },
        typography: {
          headlineFont: "Plus Jakarta Sans Bold",
          headlineSize: 64,
          bodyFont: "Be Vietnam Pro Regular",
          bodySize: 28,
          safeZonePaddingY: [260, 1550]
        },
        subtitleStyle: {
          activeWordColor: "#38bdf8",
          inactiveWordColor: "rgba(255,255,255,0.7)",
          positionY: 1520
        },
        motionPhysics: {
          springConfig: { damping: 16, stiffness: 140, mass: 0.8 },
          entranceMotion: "slide-up + pop-scale"
        },
        soundDesign: {
          narrationPacingWpm: 150,
          voiceGender: "male",
          voiceTone: "Hải Đăng studio, rõ chữ, truyền cảm",
          bgmStyle: "Modern lo-fi / dynamic ambient"
        }
      }
    };

    const res = exportDnaToStylePack(dummyDna, args.name || rawId, ROOT);
    console.log(`✅ Khởi tạo thành công style mới tại ${res.styleFolder}`);
    return;
  }

  console.log(`Lệnh không hợp lệ: ${command}. Gõ 'npm run style -- help' để xem hướng dẫn.`);
}

// CLI entrypoint
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error("❌ Lỗi CLI Style:", err.message);
    process.exit(1);
  });
}
