import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import net from "node:net";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { calculateTimelineDuration } from "../../../core/timing/index.js";

export function supports(spec) {
  // Ideally checks capabilities again, but Router already did this.
  return true;
}

export function validate(spec) {
  return { valid: true, errors: [], warnings: [] };
}

export function transform(spec, fps = 30) {
  const transformed = JSON.parse(JSON.stringify(spec));
  
  // Transform ms to frames
  const msToFrames = (ms) => Math.ceil((ms / 1000) * fps);

  let cursor = 0;
  transformed.script.scenes.forEach(scene => {
    scene.durationFrames = msToFrames(scene.durationMs);
    scene.startFrame = scene.startMs == null ? cursor : msToFrames(scene.startMs);
    cursor = scene.startFrame + scene.durationFrames;
  });

  const timing = calculateTimelineDuration(spec);
  if (Math.abs(timing.deltaMs) > 1000) {
    console.warn(`[WARNING] DURATION_TARGET_MISMATCH: target=${timing.targetDurationMs}ms, actual=${timing.actualDurationMs}ms, delta=${timing.deltaMs}ms`);
  }
  
  transformed.format.fps = fps;
  transformed.format.totalDurationFrames = msToFrames(timing.actualDurationMs);
  
  return transformed;
}

function findRenderPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "::", () => {
      const port = server.address().port;
      server.close(error => error ? reject(error) : resolve(port));
    });
  });
}

export async function render(spec, options) {
  const renderId = crypto.randomUUID().slice(0, 8);
  const engineRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const runtimeDir = path.join(engineRoot, ".runtime", renderId);
  const publicDir = path.join(runtimeDir, "public");
  const assetsDir = path.join(publicDir, "assets");

  const projectRoot = options.projectRoot;
  const outputPath = options.outputPath || path.join(projectRoot, "output", "video.mp4");

  // Asset Staging
  try {
    fs.mkdirSync(assetsDir, { recursive: true });
    
    // Write transformed spec as input props
    const transformedSpec = transform(spec, 30);
    const inputPropsPath = path.join(runtimeDir, "inputProps.json");
    fs.writeFileSync(inputPropsPath, JSON.stringify({ spec: transformedSpec }, null, 2));

    // Stage base public assets
    const enginePublic = path.join(engineRoot, "public");
    if (fs.existsSync(enginePublic)) {
      fs.cpSync(enginePublic, publicDir, { recursive: true });
    }

    // Copy assets from project/assets to staging
    const sourceAssets = path.join(projectRoot, "assets");
    if (fs.existsSync(sourceAssets)) {
      fs.cpSync(sourceAssets, assetsDir, { recursive: true });
    }

    // Determine composition (custom project composition or CanonicalVideo)
    const compositionId = options.composition || spec.composition || spec.project?.composition || "CanonicalVideo";

    // Render using CLI
    const port = await findRenderPort();
    const remotionCmd = `npx remotion render src/index.ts ${compositionId} "${outputPath}" --props="${inputPropsPath}" --public-dir="${publicDir}" --port=${port} --log=info --muted`;
    
    console.log(`[Remotion Adapter] Running: ${remotionCmd}`);
    execSync(remotionCmd, { cwd: engineRoot, stdio: "inherit" });

    return { success: true, outputPath };
  } catch (error) {
    console.error("[Remotion Adapter] Render Failed:", error);
    return { success: false, error: error.message };
  } finally {
    // Cleanup
    if (fs.existsSync(runtimeDir)) {
      fs.rmSync(runtimeDir, { recursive: true, force: true });
    }
  }
}
