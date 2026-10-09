import * as fs from "fs";
import * as path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { compose } from "../composer/index.js";
import { renderToMp4 } from "../renderer/index.js";

export function supports(spec) {
  // Rely on Router's pre-validation via capabilities.js
  return true; 
}

export function validate(spec) {
  return { valid: true, errors: [], warnings: [] };
}

export function transform(spec) {
  return spec;
}

export async function render(spec, options) {
  const renderId = crypto.randomUUID().slice(0, 8);
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const runtimeDir = path.join(engineRoot, ".runtime", renderId);
  const assetsDir = path.join(runtimeDir, "assets"); // Local asset resolve for index.html

  const projectRoot = options.projectRoot;
  // If outputPath isn't explicitly hyperframes.mp4, maybe rewrite it
  const outputPath = options.outputPath || path.join(projectRoot, "output", "hyperframes.mp4");

  try {
    fs.mkdirSync(assetsDir, { recursive: true });

    // Stage Assets
    const sourceAssets = path.join(projectRoot, "assets");
    if (fs.existsSync(sourceAssets)) {
      fs.cpSync(sourceAssets, assetsDir, { recursive: true });
    }
    
    // Create package.json so hyperframes CLI treats it as a project directory
    const packageJsonPath = path.join(runtimeDir, "package.json");
    fs.writeFileSync(packageJsonPath, JSON.stringify({ name: "hf-render-temp", version: "1.0.0" }));

    // Invoke Composer or use custom HTML
    const customHtml = path.join(projectRoot, "index.html");
    if (fs.existsSync(customHtml)) {
      console.log("[HyperFrames Adapter] Using custom index.html");
      fs.copyFileSync(customHtml, path.join(runtimeDir, "index.html"));
    } else {
      console.log("[HyperFrames Adapter] Composing HTML...");
      compose(spec, runtimeDir);
    }

    // Invoke Renderer
    console.log("[HyperFrames Adapter] Rendering MP4...");
    const renderResult = await renderToMp4(runtimeDir, outputPath);
    
    return renderResult;
  } catch (error) {
    console.error("[HyperFrames Adapter] Execution Failed:", error);
    return { success: false, error: error.message };
  } finally {
    // Cleanup
    if (fs.existsSync(runtimeDir)) {
      fs.rmSync(runtimeDir, { recursive: true, force: true });
    }
  }
}
// TEST E CACHE INVALIDATION
