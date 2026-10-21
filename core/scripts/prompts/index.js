import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../../..");
const LIB_DIR = path.join(ROOT, "prompts", "library");

function loadData() {
  const promptsPath = path.join(LIB_DIR, "prompts.json");
  const categoriesPath = path.join(LIB_DIR, "categories.json");
  if (!fs.existsSync(promptsPath)) {
    throw new Error(`Data file not found: ${promptsPath}. Run data setup first.`);
  }
  const prompts = JSON.parse(fs.readFileSync(promptsPath, "utf8"));
  let categories = {};
  if (fs.existsSync(categoriesPath)) {
    categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));
  }
  return { prompts, categories };
}

function searchPrompts(query, options = {}) {
  const { prompts, categories } = loadData();
  const q = (query || "").toLowerCase().trim();
  const categoryFilter = options.category;
  const limit = parseInt(options.limit || 10, 10);

  let candidateIds = null;
  if (categoryFilter && categories[categoryFilter]) {
    candidateIds = new Set(categories[categoryFilter].items.map(item => item.id));
  }

  const results = [];
  for (const item of prompts) {
    if (candidateIds && !candidateIds.has(item.id)) continue;
    const matchAct = item.act.toLowerCase().includes(q);
    const matchPrompt = item.prompt.toLowerCase().includes(q);
    if (!q || matchAct || matchPrompt) {
      // Score: exact act match > act contains > prompt contains
      let score = 0;
      if (item.act.toLowerCase() === q) score += 100;
      else if (matchAct) score += 50;
      if (matchPrompt) score += 20;
      results.push({ item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit).map(r => r.item);
}

function getPrompt(identifier) {
  const { prompts } = loadData();
  const idNum = parseInt(identifier, 10);
  if (!isNaN(idNum)) {
    return prompts.find(p => p.id === idNum);
  }
  const name = identifier.toLowerCase().trim();
  return prompts.find(p => p.act.toLowerCase() === name || p.act.toLowerCase().includes(name));
}

function listCategories() {
  const { categories } = loadData();
  return Object.entries(categories).map(([key, val]) => ({
    key,
    title: val.title,
    count: val.items ? val.items.length : 0,
    description: val.description
  }));
}

export function main(argv = process.argv.slice(2)) {
  const [command, target, ...rest] = argv;
  const args = minimist(argv.slice(1));

  if (!command || command === "help" || command === "--help") {
    console.log(`
PROMPTS.CHAT CLI TOOL — AI Video Factory
Sử dụng:
  node core/scripts/prompts/index.js search <keyword> [--category <name>] [--limit <number>]
  node core/scripts/prompts/index.js get <id|name>
  node core/scripts/prompts/index.js list-categories
  node core/scripts/prompts/index.js random [--category <name>]
  node core/scripts/prompts/index.js export-persona <id|name> [--output <file>]
    `);
    return;
  }

  try {
    if (command === "search") {
      const query = target || args._[1] || "";
      const results = searchPrompts(query, {
        category: args.category,
        limit: args.limit
      });
      console.log(`\n🔍 Tìm thấy ${results.length} kết quả phù hợp với "${query}":\n`);
      for (const res of results) {
        console.log(`[ID ${res.id}] 🎭 ${res.act}`);
        const snippet = res.prompt.replace(/\n+/g, " ").slice(0, 120);
        console.log(`    ↳ "${snippet}..."`);
        console.log("");
      }
      return;
    }

    if (command === "get") {
      const identifier = target || args._[1];
      if (!identifier) {
        console.error("Vui lòng cung cấp ID hoặc Tên Act cần xem.");
        process.exit(1);
      }
      const item = getPrompt(identifier);
      if (!item) {
        console.error(`Không tìm thấy prompt với định danh: ${identifier}`);
        process.exit(1);
      }
      console.log(`\n======================================================`);
      console.log(`🎭 ACT: ${item.act} (ID: ${item.id})`);
      console.log(`👤 Contributor: ${item.contributor || "N/A"} | Type: ${item.type}`);
      console.log(`======================================================\n`);
      console.log(item.prompt);
      console.log(`\n======================================================\n`);
      return;
    }

    if (command === "list-categories" || command === "categories") {
      const cats = listCategories();
      console.log("\n📂 DANH MỤC PROMPTS PHỤC VỤ SẢN XUẤT VIDEO:\n");
      for (const cat of cats) {
        console.log(`- ${cat.key} (${cat.count} prompts)`);
        console.log(`  Tiêu đề: ${cat.title}`);
        console.log(`  Mô tả:   ${cat.description}\n`);
      }
      return;
    }

    if (command === "random") {
      const { prompts } = loadData();
      let pool = prompts;
      if (args.category) {
        const { categories } = loadData();
        if (categories[args.category]) {
          const ids = new Set(categories[args.category].items.map(i => i.id));
          pool = prompts.filter(p => ids.has(p.id));
        }
      }
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      console.log(`\n🎲 PROMPT NGẪU NHIÊN: [ID ${randomItem.id}] 🎭 ${randomItem.act}\n`);
      console.log(randomItem.prompt);
      console.log("");
      return;
    }

    if (command === "export-persona") {
      const identifier = target || args._[1];
      const item = getPrompt(identifier);
      if (!item) {
        console.error(`Không tìm thấy prompt với định danh: ${identifier}`);
        process.exit(1);
      }
      const markdown = `<!-- PERSONA: ${item.act} -->
> [!TIP]
> **Active Persona**: ${item.act}
> **Core Instruction**:
> ${item.prompt}
`;
      if (args.output) {
        fs.writeFileSync(path.resolve(ROOT, args.output), markdown, "utf8");
        console.log(`Đã xuất persona ra file: ${args.output}`);
      } else {
        console.log(markdown);
      }
      return;
    }

    console.log(`Lệnh không hợp lệ: ${command}. Gõ "help" để xem hướng dẫn.`);
  } catch (err) {
    console.error("Lỗi:", err.message);
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
