import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

export async function renderToMp4(runtimeDir, outputPath) {
  // We run npx hyperframes render inside the runtimeDir where index.html exists
  // The command syntax from the help output: hyperframes render -o out.mp4
  const cmd = `npx --yes hyperframes render -o "${outputPath}"`;
  
  console.log(`[HyperFrames Renderer] Running: ${cmd}`);
  
  try {
    execSync(cmd, { cwd: runtimeDir, stdio: "inherit" });
    return { success: true, outputPath };
  } catch (error) {
    console.error("[HyperFrames Renderer] Render Failed:", error.message);
    return { success: false, error: error.message };
  }
}
