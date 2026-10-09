// Compatibility entrypoint. Mutating state belongs to the factory CLI so gates cannot be bypassed.
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const [command, ...args] = process.argv.slice(2);
if (command === "check-cache") {
  console.log(JSON.stringify({ cache: "MISS", reason: "LEGACY_CACHE_UNSAFE", instruction: "Use factory status/tts/render" }));
  process.exit(0);
}
if (!["status", "dirty"].includes(command)) {
  console.error("Legacy state update is disabled. Use core/scripts/factory/index.js record or approve.");
  process.exit(1);
}
const cli = path.resolve(__dirname, "../factory/index.js");
const result = spawnSync(process.execPath, [cli, command, ...args], { stdio: "inherit" });
process.exit(result.status ?? 1);
