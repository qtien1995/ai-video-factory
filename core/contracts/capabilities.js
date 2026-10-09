export const EngineCapabilities = {
  HYPERFRAMES: {
    status: "implemented",
    maxComplexity: "medium",
    supportedAssetTypes: ["image", "audio", "vector", "font"],
    supportedVisualIntents: ["centered", "split", "overlay"],
    supportedMotionIntents: [
      // Only these are truly implemented in Phase 4 for parity
      "fade-in", "flow", "interrupt", "progressive-build", "drain",
      
      // Downgraded to planned (not actually implemented in code yet)
      // "slide-in", "scale-in", "draw-in", "stat-pop", "opposed-slide-in", "card-reveal", "check-pop",
      // "fade-out", "slide-out", "scale-out",
      // "transform", "fill", "collapse", "expand", "shield-expand",
      // "count-up", "count-down", "counter", "progress", "reverse-bar-grow", "balance-drain",
      // "pan", "zoom", "marker-draw"
    ]
  },
  REMOTION: {
    status: "implemented",
    maxComplexity: "high",
    supportedAssetTypes: ["image", "audio", "video", "font", "vector"],
    supportedVisualIntents: ["split", "centered", "overlay", "grid"],
    supportedMotionIntents: [
      // Only these are truly implemented in Phase 3
      "fade-in", "flow", "interrupt", "progressive-build", "drain",

      // Downgraded to planned for strict parity matching
      // "slide-in", "scale-in", "card-reveal",
      // "fade-out", "slide-out", "scale-out",
      // "transform", "morph", "timeline-merge", "mask-transition",
      // "compare-state",
      // "path-follow", "orbit", "pan", "zoom",
      // "stagger", "reveal-sequence", "timeline-progress"
    ]
  }
};
