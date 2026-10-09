// Motion Intent Registry V0

export const MOTION_INTENTS = {
  // ENTRANCE
  "fade-in": { category: "ENTRANCE", fallback: null, complexity: "low" },
  "slide-in": { category: "ENTRANCE", fallback: "fade-in", complexity: "low" },
  "scale-in": { category: "ENTRANCE", fallback: "fade-in", complexity: "low" },
  "draw-in": { category: "ENTRANCE", fallback: "fade-in", complexity: "medium" },
  "stat-pop": { category: "ENTRANCE", fallback: "scale-in", complexity: "medium" },
  "opposed-slide-in": { category: "ENTRANCE", fallback: "slide-in", complexity: "medium" },
  "card-reveal": { category: "ENTRANCE", fallback: "fade-in", complexity: "medium" },
  "check-pop": { category: "ENTRANCE", fallback: "scale-in", complexity: "low" },

  // EXIT
  "fade-out": { category: "EXIT", fallback: null, complexity: "low" },
  "slide-out": { category: "EXIT", fallback: "fade-out", complexity: "low" },
  "scale-out": { category: "EXIT", fallback: "fade-out", complexity: "low" },

  // TRANSFORMATION
  "transform": { category: "TRANSFORMATION", fallback: null, complexity: "medium" },
  "morph": { category: "TRANSFORMATION", fallback: "transform", complexity: "high" },
  "drain": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "fill": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "collapse": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "expand": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "shield-expand": { category: "TRANSFORMATION", fallback: "expand", complexity: "medium" },
  "timeline-merge": { category: "TRANSFORMATION", fallback: "transform", complexity: "high" },
  "mask-transition": { category: "TRANSFORMATION", fallback: "fade-in", complexity: "high" },
  "interrupt": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },

  // DATA
  "count-up": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "count-down": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "counter": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "progressive-build": { category: "DATA", fallback: "fade-in", complexity: "medium" },
  "progress": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "compare-state": { category: "DATA", fallback: "fade-in", complexity: "medium" },
  "reverse-bar-grow": { category: "DATA", fallback: "progress", complexity: "medium" },
  "balance-drain": { category: "DATA", fallback: "drain", complexity: "medium" },

  // MOVEMENT
  "flow": { category: "MOVEMENT", fallback: "fade-in", complexity: "medium" },
  "path-follow": { category: "MOVEMENT", fallback: "transform", complexity: "high" },
  "orbit": { category: "MOVEMENT", fallback: "transform", complexity: "high" },
  "pan": { category: "MOVEMENT", fallback: null, complexity: "low" },
  "zoom": { category: "MOVEMENT", fallback: null, complexity: "low" },

  // SEQUENCE
  "stagger": { category: "SEQUENCE", fallback: "fade-in", complexity: "medium" },
  "reveal-sequence": { category: "SEQUENCE", fallback: "fade-in", complexity: "medium" },
  "timeline-progress": { category: "SEQUENCE", fallback: "fade-in", complexity: "high" },
  "marker-draw": { category: "SEQUENCE", fallback: "fade-in", complexity: "medium" }
};
