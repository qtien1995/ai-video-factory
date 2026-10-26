import { StyleTheme } from "../types";

export const AiTechBriefingTheme: StyleTheme = {
  meta: {
    id: "ai-tech-briefing",
    version: "1.0.0",
    name: "Ai Tech Briefing",
    purpose: "Phong cách bóc tách từ video tham chiếu video_2026-10-24_11-45-50.mp4",
    category: "custom",
    bestFor: [
      "Video phong cách bóc tách thực chiến",
      "CALM / DOCUMENTARY",
      "Shorts / TikTok / Reels 9:16"
    ],
    notIdealFor: ["Nội dung không hợp nhịp độ bóc tách"],
    tags: ["cloned", "dna", "ai-tech-briefing"],
    sourceDna: "ai-tech-briefing",
    previewImage: "contact_sheet.jpg",
  },
  colors: {
    background: "#0f172a",
    backgroundGradient: "radial-gradient(ellipse at 50% 20%, #1e293b 0%, #0f172a 80%)",
    surface: "#1e293b",
    surfaceGlass: "#1e293bEE",
    border: "#38bdf833",
    borderActive: "#38bdf8",
    textPrimary: "#ffffff",
    textSecondary: "#ffffffB3",
    textMuted: "#ffffff66",
    accentPrimary: "#38bdf8",
    accentSecondary: "#f59e0b",
    positive: "#10B981",
    negative: "#EF4444",
    warning: "#f59e0b",
  },
  typography: {
    fontFamily: "'Montserrat', system-ui, sans-serif",
    headline: {
      fontSize: 64,
      fontWeight: 900,
      lineHeight: 1.15,
      letterSpacing: "-1px",
    },
    subheadline: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.25,
    },
    cardTitle: {
      fontSize: 38,
      fontWeight: 800,
      lineHeight: 1.25,
    },
    cardBody: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 78,
      fontWeight: 900,
      letterSpacing: "-1px",
    },
    badgeText: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.35,
    },
  },
  subtitles: {
    positionY: 1450,
    activeWordColor: "#38bdf8",
    inactiveWordColor: "rgba(255,255,255,0.7)",
    backgroundColor: "#0f172aF0",
    borderRadius: 20,
    padding: "14px 30px",
    fontSize: 34,
    fontWeight: 800,
  },
  springs: {
    snappy: { damping: 18, stiffness: 140, mass: 0.8 },
    gentle: { damping: 20, stiffness: 95, mass: 1 },
    bounce: { damping: 11, stiffness: 175, mass: 0.75 },
    slow: { damping: 25, stiffness: 55, mass: 1.2 },
  },
  motion: {
    pacingVelocity: "CALM / DOCUMENTARY",
    avgCutIntervalSec: 18.4,
    targetWpm: 150,
    entranceMotion: "slide-up + pop-scale(0.85 -> 1.0)",
    continuousMotion: "subtle-floating(sin-wave +- 6px)",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 50,
  },
};
