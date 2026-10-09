import * as fs from "fs";
import * as path from "path";
import minimist from "minimist";
import { validateSpec } from "../../schemas/zod.js";
import { routeSpec } from "../router/index.js";

async function run() {
  const argv = minimist(process.argv.slice(2));
  let specPath = argv.file;
  
  if (argv.project) {
    const { projectDir } = await import("../factory/state.js");
    specPath = path.join(projectDir(argv.project), "specs", "video-spec.json");
  }

  if (!specPath || !fs.existsSync(specPath)) {
    console.error(`Error: Spec file not found at ${specPath || "undefined"}`);
    process.exit(1);
  }

  const specRaw = JSON.parse(fs.readFileSync(specPath, "utf-8"));
  
  // Validation
  const validationResult = validateSpec(specRaw);
  if (!validationResult.valid) {
    console.error("VALIDATION FAIL");
    validationResult.errors.forEach(err => {
      console.error(`- field: ${err.path}`);
      console.error(`  message: ${err.message}`);
      console.error(`  code: ${err.code}`);
    });
    process.exit(1);
  }
  
  console.log(`VALID VideoSpec schemaVersion ${specRaw.schemaVersion}`);
  
  // Routing
  console.log("\n--- ROUTER OUTPUT ---");
  const userOverride = argv.engine || "AUTO";
  const routingResult = routeSpec(specRaw, userOverride);
  if (routingResult.success) {
    console.log(`selectedEngine: "${routingResult.selectedEngine}"`);
    console.log("reason:");
    routingResult.reasons.forEach(r => console.log(` * ${r}`));
  } else {
    console.log(`ENGINE_INCOMPATIBLE`);
    console.log("error:", routingResult.error);
    routingResult.reasons.forEach(r => console.log(` * ${r}`));
    process.exit(1);
  }
}

run();
