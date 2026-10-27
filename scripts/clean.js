import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

console.log(`\n🧹 [AI Video Factory] Bắt đầu dọn dẹp các tệp nháp tạm (.tmp, .raw.mp4)...`);

let deletedCount = 0;
let freedBytes = 0;

function cleanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const ent of entries) {
      const fullPath = path.join(dirPath, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === ".runtime") {
          try {
            const sz = getDirSize(fullPath);
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`  -> Xóa thư mục runtime: ${fullPath}`);
            deletedCount++;
            freedBytes += sz;
          } catch (e) {
            console.warn(`  ! Không thể xóa ${fullPath}: ${e.message}`);
          }
        } else if (!["node_modules", ".git"].includes(ent.name)) {
          cleanDir(fullPath);
        }
      } else {
        const name = ent.name.toLowerCase();
        if (
          name.endsWith(".tmp") ||
          name.endsWith(".tmp.mp4") ||
          name.endsWith(".raw.mp4") ||
          name.endsWith(".candidate.mp4") ||
          name.includes(".candidate.") ||
          name.endsWith(".tmp.svg")
        ) {
          try {
            const sz = fs.statSync(fullPath).size;
            fs.rmSync(fullPath, { force: true });
            console.log(`  -> Xóa file tạm: ${fullPath} (${(sz / 1024).toFixed(1)} KB)`);
            deletedCount++;
            freedBytes += sz;
          } catch (e) {
            console.warn(`  ! Không thể xóa file ${fullPath}: ${e.message}`);
          }
        }
      }
    }
  } catch (err) {
    // Ignore permission or inaccessible folders
  }
}

function getDirSize(p) {
  let total = 0;
  try {
    for (const file of fs.readdirSync(p, { recursive: true })) {
      const fp = path.join(p, file);
      if (fs.statSync(fp).isFile()) total += fs.statSync(fp).size;
    }
  } catch {}
  return total;
}

// Dọn dẹp trong projects/ và engines/
cleanDir(path.join(ROOT, "projects"));
cleanDir(path.join(ROOT, "engines", "remotion"));

console.log(`\n============================================================`);
console.log(`✅ HOÀN TẤT DỌN DẸP!`);
console.log(`   - Tổng số file/thư mục tạm đã dọn: ${deletedCount}`);
console.log(`   - Dung lượng giải phóng: ${(freedBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`============================================================\n`);
