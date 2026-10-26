import { StyleTheme } from "../types";

export const KineticMinimalistTheme: StyleTheme = {
  meta: {
    id: "kinetic-minimalist",
    version: "1.0.0",
    name: "Kinetic Minimalist",
    purpose: "Typography động tương phản mạnh mẽ, chữ lớn choán khung hình cho hook viral và thông điệp đanh thép",
    category: "kinetic",
    bestFor: [
      "Hook video viral 15–30s",
      "Bóc mẽ định kiến / Myth vs Fact",
      "Tuyên ngôn thương hiệu & Thông điệp lãnh đạo",
      "Phóng sự doanh nghiệp nhịp nhanh"
    ],
    notIdealFor: ["Hướng dẫn chi tiết nhiều số liệu", "Bảng biểu phức tạp"],
    tags: ["kinetic", "minimalist", "bold", "monochrome", "viral", "punchy"],
  },
  colors: {
    background: "#000000",
    backgroundGradient: "none",
    surface: "#111111",
    surfaceGlass: "rgba(17, 17, 17, 0.95)",
    border: "rgba(255, 255, 255, 0.2)",
    borderActive: "#FF0033",
    textPrimary: "#FFFFFF",
    textSecondary: "#A3A3A3",
    textMuted: "#525252",
    accentPrimary: "#FF0033", // Power Red
    accentSecondary: "#FBBF24", // Yellow Flash
    positive: "#22C55E",
    negative: "#FF0033",
    warning: "#F59E0B",
  },
  typography: {
    fontFamily: "'Anton', 'Montserrat', 'Barlow Condensed', sans-serif",
    headline: {
      fontSize: 88,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: "-2px",
      textTransform: "uppercase",
    },
    subheadline: {
      fontSize: 44,
      fontWeight: 900,
      lineHeight: 1.15,
      textTransform: "uppercase",
    },
    cardTitle: {
      fontSize: 42,
      fontWeight: 900,
      lineHeight: 1.2,
      textTransform: "uppercase",
    },
    cardBody: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.35,
    },
    metricNumber: {
      fontSize: 110,
      fontWeight: 900,
      letterSpacing: "-3px",
    },
    badgeText: {
      fontSize: 26,
      fontWeight: 900,
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.3,
    },
  },
  subtitles: {
    positionY: 1480,
    activeWordColor: "#FF0033",
    inactiveWordColor: "#FFFFFF",
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: "8px 16px",
    fontSize: 44,
    fontWeight: 900,
    glow: "none",
  },
  springs: {
    snappy: { damping: 10, stiffness: 220, mass: 0.4 },
    gentle: { damping: 16, stiffness: 130, mass: 0.8 },
    bounce: { damping: 8, stiffness: 250, mass: 0.5 },
    slow: { damping: 20, stiffness: 80, mass: 1 },
  },
  motion: {
    pacingVelocity: "FAST / HIGH ADRENALINE",
    avgCutIntervalSec: 1.8,
    targetWpm: 168,
    entranceMotion: "slam-zoom-in(1.3 -> 1.0) + shake",
    continuousMotion: "pulse-beat",
  },
  safeZone: {
    top: 220,
    bottom: 1560,
    paddingX: 44,
  },
};
