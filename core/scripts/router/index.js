import { EngineCapabilities } from "../../contracts/capabilities.js";
import { MOTION_INTENTS } from "../../schemas/registry.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../factory-config.json");

export function evaluateEngineCompatibility(spec, engineId) {
  const cap = EngineCapabilities[engineId];
  if (!cap || cap.status !== "implemented") return { supported: false, reasons: [`Engine ${engineId} is not implemented.`] };
  
  let supported = true;
  const reasons = [];

  for (const scene of spec.script.scenes) {
    if (scene.visualIntent && scene.visualIntent.layout) {
      if (!cap.supportedVisualIntents.includes(scene.visualIntent.layout)) {
        supported = false;
        reasons.push(`Scene ${scene.id} uses layout '${scene.visualIntent.layout}' unsupported by ${engineId}.`);
      }
    }
    if (scene.motionIntent) {
      for (const intent of scene.motionIntent) {
        if (!cap.supportedMotionIntents.includes(intent.type)) {
          // Check if registry defines a fallback
          const reg = MOTION_INTENTS[intent.type];
          if (reg && reg.fallback && cap.supportedMotionIntents.includes(reg.fallback)) {
             reasons.push(`WARNING: motion "${intent.type}" -> fallback "${reg.fallback}" (engine: ${engineId}, reason: unsupported capability)`);
          } else {
             supported = false;
             reasons.push(`Scene ${scene.id} uses motion '${intent.type}' unsupported by ${engineId} (No fallback available).`);
          }
        }
      }
    }
    if (scene.assets) {
       for (const asset of scene.assets) {
          if (!cap.supportedAssetTypes.includes(asset.type)) {
             supported = false;
             reasons.push(`Scene ${scene.id} uses asset type '${asset.type}' unsupported by ${engineId}.`);
          }
       }
    }
  }
  return { supported, reasons };
}

export function routeSpec(spec, userOverrideMode = "AUTO") {
  const aiSuggestion = spec.engineRouting?.suggestedEngine;
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const primary = String(config.primary_engine || "remotion").toUpperCase();
  
  const hyperframesCompat = evaluateEngineCompatibility(spec, "HYPERFRAMES");
  const remotionCompat = evaluateEngineCompatibility(spec, "REMOTION");

  if (userOverrideMode && userOverrideMode.toUpperCase() !== "AUTO") {
    const overrideEngine = userOverrideMode.toUpperCase();
    if (!["REMOTION", "HYPERFRAMES"].includes(overrideEngine)) {
      return { success: false, error: "UNKNOWN_ENGINE", reasons: [`Unknown engine: ${overrideEngine}`] };
    }
    const compat = overrideEngine === "HYPERFRAMES" ? hyperframesCompat : remotionCompat;
    if (!compat.supported) {
      return { 
        success: false, 
        error: "ENGINE_INCOMPATIBLE", 
        reasons: compat.reasons 
      };
    }
    return { 
      success: true, 
      selectedEngine: overrideEngine, 
      reasons: [`User override enforced ${overrideEngine}.`, ...compat.reasons] 
    };
  }

  // AUTO routing follows workspace policy. A spec suggestion is only a hint.
  if (hyperframesCompat.supported && !remotionCompat.supported) {
     return { success: true, selectedEngine: "HYPERFRAMES", reasons: ["Only HyperFrames supports all requested intents.", ...hyperframesCompat.reasons] };
  }
  if (remotionCompat.supported && !hyperframesCompat.supported) {
     return { success: true, selectedEngine: "REMOTION", reasons: ["Only Remotion supports all requested intents.", ...remotionCompat.reasons] };
  }
  
  if (remotionCompat.supported && hyperframesCompat.supported) {
     const selectedEngine = primary === "HYPERFRAMES" ? "HYPERFRAMES" : "REMOTION";
     return {
       success: true,
       selectedEngine,
       reasons: [
         `${selectedEngine} selected as primary engine.`,
         "All requested intents supported by both engines.",
         ...(aiSuggestion && aiSuggestion !== "AUTO" && aiSuggestion !== selectedEngine ? [`Spec suggested ${aiSuggestion}; workspace primary takes precedence.`] : []),
         ...remotionCompat.reasons
       ]
     };
  }

  return {
    success: false,
    error: "NO_ENGINE_SUPPORTED",
    reasons: [...hyperframesCompat.reasons, ...remotionCompat.reasons]
  };
}
