import { StyleTheme } from "../types";

export const MedicalBiometricsProTheme: StyleTheme = {
  id: "medical-biometrics-pro",
  name: "Medical Biometrics & Clinical Editorial",
  palette: {
    background: "#060A14",
    surface: "rgba(15, 23, 42, 0.85)",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    accentPrimary: "#38BDF8", // Electric Cyan
    accentSecondary: "#F59E0B", // Amber Warning
    positive: "#10B981", // Hope Emerald
    negative: "#EF4444", // Crimson Alert
    border: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    headline: "Montserrat, Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
    mono: "monospace",
    weights: {
      headline: 950,
      body: 600,
      bold: 800,
    },
    sizes: {
      hero: 105,
      headline: 54,
      subheadline: 28,
      body: 22,
      caption: 16,
    },
  },
  motion: {
    spring: {
      mass: 0.8,
      damping: 16,
      stiffness: 120,
    },
    cameraBreathing: {
      scaleRange: [1.0, 1.03],
      rotateRange: [-0.15, 0.15],
      frequency: 0.035,
    },
    durations: {
      cardStaggerFrames: 22,
      counterDurationFrames: 45,
    },
  },
  sound: {
    bgmVolume: 0.14,
    sfxVolume: 0.35,
    targetLufs: -12.5,
  },
};
