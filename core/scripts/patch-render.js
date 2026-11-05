const fs = require('fs');
const p = 'core/scripts/render/index.js';
let code = fs.readFileSync(p, 'utf8');
const oldImport = 'import { routeSpec } from "../router/index.js";';
const newFunc = `function routeSpec(spec, engine) {
  return {
    success: true,
    selectedEngine: "REMOTION",
    reasons: ["Pure Bespoke V4 engine: Remotion"]
  };
}`;
if (code.includes(oldImport)) {
  code = code.replace(oldImport, newFunc);
  fs.writeFileSync(p, code, 'utf8');
  console.log('Successfully patched render/index.js');
} else {
  console.log('oldImport not found in file');
}
