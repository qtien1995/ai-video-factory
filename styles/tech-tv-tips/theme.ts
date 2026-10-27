import { StyleTheme } from "../types";

export const TechTvTipsTheme: StyleTheme = {
  meta: {
    id: "tech-tv-tips",
    version: "1.0.0",
    name: "TECH TV TIPS",
    purpose: "Phong cách hướng dẫn kỹ thuật & tối ưu hệ thống bóc tách từ video tham chiếu",
    category: "custom",
    bestFor: [
      "Video hướng dẫn thủ thuật công nghệ",
      "Mẹo tối ưu Android / iOS / Tivi / Máy tính",
      "Shorts / TikTok / Reels 9:16 giữ chân cao"
    ],
    notIdealFor: ["Nội dung không hợp nhịp độ bóc tách", "Phim tài liệu chậm rãi"],
    tags: ["cloned", "dna", "tech-tv-tips", "android-tv", "system-optimization"],
    sourceDna: "TECH-TV-TIPS",
    previewImage: "contact_sheet.jpg",
  },
  colors: {
    background: "#0a121e",
    backgroundGradient: "radial-gradient(ellipse at 50% 20%, #111d2e 0%, #0a121e 80%)",
    surface: "#111d2e",
    surfaceGlass: "rgba(17, 29, 46, 0.88)",
    border: "rgba(34, 211, 238, 0.22)",
    borderActive: "#22d3ee",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    accentPrimary: "#22d3ee",
    accentSecondary: "#f59e0b",
    positive: "#10B981",
    negative: "#EF4444",
    warning: "#f59e0b",
  },
  typography: {
    fontFamily: "'Montserrat Black', 'Inter', system-ui, sans-serif",
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
      fontSize: 34,
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
    activeWordColor: "#22d3ee",
    inactiveWordColor: "rgba(255, 255, 255, 0.75)",
    backgroundColor: "rgba(10, 18, 30, 0.92)",
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
    avgCutIntervalSec: 8.03,
    targetWpm: 155,
    entranceMotion: "slide-up + pop-scale(0.88 -> 1.0)",
    continuousMotion: "subtle-floating(sin-wave +- 6px)",
  },
  safeZone: {
    top: 260,
    bottom: 1550,
    paddingX: 50,
  },
};
