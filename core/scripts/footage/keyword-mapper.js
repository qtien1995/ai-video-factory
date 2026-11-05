/**
 * Keyword-to-Asset Mapper for Auto-Footage & Remotion.
 * Tự động phân tích transcript / word timestamps để tìm các từ khóa trọng tâm
 * (Thương hiệu, thuật ngữ, số liệu, cột mốc) và ánh xạ timecode để chèn Overlays/HandDrawn SVG.
 */

const fs = require("fs");
const path = require("path");

// Danh mục thực thể mặc định cho tài chính / bảo hiểm / ngân hàng / công nghệ
const DEFAULT_KEYWORD_RULES = [
  {
    regex: /(manulife|prudential|dai-ichi|aia|bảo việt|fwd)/i,
    type: "brand_logo",
    category: "insurance",
  },
  {
    regex: /(vietcombank|techcombank|mb bank|bidv|vietinbank|vpbank|acb)/i,
    type: "brand_logo",
    category: "banking",
  },
  {
    regex: /(lạm phát|lãi suất|tỷ giá|gdp|quỹ đầu tư|trái phiếu|cổ phiếu)/i,
    type: "stat_callout",
    category: "macro_finance",
  },
  {
    regex: /(\d+(\.\d+)?%|\d+\s*(tỷ|triệu|nghìn|đô|usd))/i,
    type: "big_number_highlight",
    category: "numbers",
  },
  {
    regex: /(chú ý|quan trọng|cảnh báo|lưu ý|bí mật|sự thật)/i,
    type: "handdrawn_circle",
    category: "attention",
  },
];

/**
 * Phân tích danh sách từ vựng có timestamp
 * @param {Array<{word: string, start: number, end: number}>} words
 * @param {Array} customRules
 */
function mapKeywordsToOverlays(words, customRules = []) {
  const rules = [...DEFAULT_KEYWORD_RULES, ...customRules];
  const overlays = [];

  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    const text = item.word.trim();

    for (const rule of rules) {
      if (rule.regex.test(text)) {
        overlays.push({
          matchedText: text,
          type: rule.type,
          category: rule.category,
          startSec: item.start,
          endSec: Math.max(item.end + 2.5, item.start + 3.0), // Giữ hiển thị ít nhất 2.5 - 3s
          frameStart: Math.round(item.start * 30),
          frameEnd: Math.round((item.start + 3.0) * 30),
        });
        break; // Tránh trùng 1 từ nhiều rule
      }
    }
  }

  return overlays;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("Usage: node keyword-mapper.js <words_json_file> <output_plan_file>");
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1];

  try {
    const rawData = fs.readFileSync(inputFile, "utf8");
    const words = JSON.parse(rawData);
    const plan = mapKeywordsToOverlays(words);

    fs.writeFileSync(outputFile, JSON.stringify(plan, null, 2), "utf8");
    console.log(`[✓] Đã tạo plan ánh xạ ${plan.length} điểm chạm thị giác -> ${outputFile}`);
  } catch (err) {
    console.error(`[!] Lỗi xử lý keyword mapping: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { mapKeywordsToOverlays };
