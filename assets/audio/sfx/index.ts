/**
 * SFX Library & Sound Design Toolkit for AI Video Factory V3
 * Curated from video-shotcraft (149 studio-grade audio effects)
 */

export type SfxCategory =
  | "camera"
  | "counter"
  | "crowd"
  | "data"
  | "film"
  | "fluid"
  | "glass"
  | "impact"
  | "light"
  | "mech"
  | "paper"
  | "riser"
  | "scifi"
  | "text"
  | "transition"
  | "ui";

export interface SfxItem {
  category: SfxCategory;
  file: string;
  description: string;
}

export const SFX_PRESETS = {
  // Whooshes & Transitions
  whooshFast: "transition/whoosh-fast.mp3",
  whooshBig: "transition/whoosh-big.mp3",
  sweepFast: "transition/sweep-fast.mp3",
  transitionTechSlide: "transition/transition-tech-slide.mp3",
  airWooshQuick: "transition/air-woosh-quick.mp3",

  // Impacts & Slams
  impactDeep: "impact/impact-deep-whoosh.mp3",
  impactCineBig: "impact/impact-cine-big.mp3",
  impactMovieEpic: "impact/impact-movie-epic.mp3",
  bassHitFuturistic: "impact/bass-hit-futuristic.mp3",
  bassHitShort: "impact/bass-hit-short.mp3",

  // UI & Micro-interactions
  uiPop: "ui/pop.mp3",
  uiSelectModern: "ui/ui-select-modern.mp3",
  uiConfirmTone: "ui/ui-confirm-tone.mp3",
  uiClickTone: "ui/ui-click-tone.mp3",
  uiSuccessSoft: "ui/ui-success-soft.mp3",
  hitechTouch: "ui/hitech-touch-magnet.mp3",

  // Risers & Build-ups
  riserTechSweep: "riser/riser-tech-sweep.mp3",
  riserCineLong: "riser/riser-cine-long.mp3",

  // Data & Mechanical
  dataBeepCluster: "data/data-stream-digital.mp3",
  mechanicalClick: "mech/mech-switch-click.mp3",
  cameraShutter: "camera/camera-shutter-click.mp3",
};

/**
 * Returns the relative or static path to a sound effect file
 */
export const getSfxPath = (presetPath: string): string => {
  return `assets/audio/sfx/${presetPath}`;
};
