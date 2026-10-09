import { TextLayout, FadeIn, Flow, Interrupt, ProgressiveBuild, Drain } from "../components/index.js";

export function composeScene(scene) {
  const sceneId = scene.id;
  const startSec = (scene.startMs || 0) / 1000;
  const durationSec = (scene.durationMs || 2000) / 1000;
  
  let html = `<div id="${sceneId}" class="scene" data-start="${startSec}" data-duration="${durationSec}">\n`;
  
  // Render Text
  if (scene.text && scene.text.length > 0) {
    const layout = scene.visualIntent?.layout || "centered";
    html += TextLayout(scene.text, layout);
  }
  
  html += `</div>\n`;

  // Map motion intents
  let gsapScripts = [];
  const motionIntents = scene.motionIntent || [];
  
  motionIntents.forEach(intent => {
    // For Phase 4, we simply apply the intent to the inner text items or the scene itself
    // Ideally we'd map "subject" to specific DOM IDs. Here we use `.text-item` for text-based intents.
    const selector = `#${sceneId} .text-item`; 
    const sceneSelector = `#${sceneId}`;

    switch (intent.type) {
      case "fade-in":
        gsapScripts.push(FadeIn(sceneId, sceneSelector, 0.5, startSec).gsap);
        break;
      case "flow":
        gsapScripts.push(Flow(sceneId, selector, 1, startSec).gsap);
        break;
      case "interrupt":
        gsapScripts.push(Interrupt(sceneId, sceneSelector, 0.4, startSec + 0.5).gsap);
        break;
      case "progressive-build":
        gsapScripts.push(ProgressiveBuild(sceneId, selector, 0.8, startSec).gsap);
        break;
      case "drain":
        gsapScripts.push(Drain(sceneId, sceneSelector, durationSec, startSec).gsap);
        break;
    }
  });

  // Default scene visibility logic: make scene visible at start, hide at end (unless it's the last one)
  // GSAP will manage the visibility via autoAlpha or set()
  const visibilityJs = `tl.set("#${sceneId}", { autoAlpha: 1 }, ${startSec});\n` + 
                       `tl.set("#${sceneId}", { autoAlpha: 0 }, ${startSec + durationSec});`;

  return {
    html,
    gsapScripts: gsapScripts.join("\n"),
    visibilityJs
  };
}
