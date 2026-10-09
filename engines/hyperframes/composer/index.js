import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { composeScene } from "./scene.js";
import { calculateTimelineDuration } from "../../../core/timing/index.js";

export function compose(spec, runtimeDir) {
  const templatePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "runtime", "base-template.html");
  let template = fs.readFileSync(templatePath, "utf8");

  const format = spec.format || {};
  const width = format.width || 1080;
  const height = format.height || 1920;
  
  const timing = calculateTimelineDuration(spec);
  const durationSec = timing.actualDurationMs / 1000;

  if (Math.abs(timing.deltaMs) > 1000) {
    console.warn(`[WARNING] DURATION_TARGET_MISMATCH: target=${timing.targetDurationMs}ms, actual=${timing.actualDurationMs}ms, delta=${timing.deltaMs}ms`);
  }

  let scenesHtml = "";
  let visibilityJs = "";
  let gsapScript = "";

  if (spec.script && spec.script.scenes) {
    spec.script.scenes.forEach(scene => {
      const compiled = composeScene(scene);
      scenesHtml += compiled.html;
      visibilityJs += compiled.visibilityJs + "\n";
      gsapScript += compiled.gsapScripts + "\n";
    });
  }

  template = template.replace(/{{WIDTH}}/g, width)
                     .replace(/{{HEIGHT}}/g, height)
                     .replace(/{{DURATION_SECONDS}}/g, durationSec)
                     .replace("{{SCENES_HTML}}", scenesHtml)
                     .replace("{{SCENES_VISIBILITY_JS}}", visibilityJs)
                     .replace("{{GSAP_SCRIPT}}", gsapScript);

  const outHtmlPath = path.join(runtimeDir, "index.html");
  fs.writeFileSync(outHtmlPath, template, "utf8");
  
  return outHtmlPath;
}
