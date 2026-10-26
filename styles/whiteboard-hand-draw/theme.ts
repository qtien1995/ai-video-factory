import { StyleTheme } from "../types";

export const WhiteboardHandDrawTheme: StyleTheme = {
  meta: {
    id: "whiteboard-hand-draw",
    version: "2.0.0",
    name: "Whiteboard & Hand Draw",
    purpose: "Phong cách vẽ tay bảng trắng, minh họa nét mực tự vẽ trên giấy và bút dạ quang bám sát nhịp lời kể",
    category: "whiteboard",
    bestFor: [
      "Vẽ tay bảng trắng (Whiteboard Animation & Sketch)",
      "Minh họa AI kể chuyện trên nền giấy trắng và giấy nhàu (Paper Clean & Textured)",
      "Giải thích ẩn dụ trừu tượng, tư duy hình ảnh và triết lý cuộc sống",
      "So sánh trực quan hai vật thể/nhân vật với nét vẽ viết dần (Write-on stroke)"
    ],
    notIdealFor: ["Tin tức thời sự khẩn cấp", "Bản tin thị trường nến tài chính"],
    tags: ["whiteboard", "hand-draw", "paper-sketch", "write-on", "illustrated", "highlighter"],
  },
  colors: {
    background: "#FDFBF7",
    backgroundGradient: "radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F5EFEB 100%)",
    surface: "#FFFFFF",
    surfaceGlass: "rgba(255, 255, 255, 0.92)",
    border: "#E2D9CE",
    borderActive: "#1E293B",
    textPrimary: "#1E293B",
    textSecondary: "#475569",
    textMuted: "#94A3B8",
    accentPrimary: "#0F172A",
    accentSecondary: "#F59E0B",
    positive: "#10B981",
    negative: "#EF4444",
    warning: "#F59E0B",
  },
  typography: {
    fontFamily: '"Patrick Hand", "Caveat", cursive, sans-serif',
    monoFontFamily: '"JetBrains Mono", monospace',
    headline: {
      fontSize: 58,
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: "0.01em",
    },
    subheadline: {
      fontSize: 34,
      fontWeight: 600,
      lineHeight: 1.35,
    },
    cardTitle: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.3,
    },
    cardBody: {
      fontSize: 26,
      fontWeight: 500,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 72,
      fontWeight: 800,
      lineHeight: 1.1,
    },
    badgeText: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 22,
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  subtitles: {
    positionY: 1510,
    activeWordColor: "#1E293B",
    inactiveWordColor: "rgba(30, 41, 59, 0.45)",
    backgroundColor: "#FFE600E6", // Highlighter vàng dạ quang
    borderRadius: 14,
    padding: "12px 28px",
    fontSize: 34,
    fontWeight: 700,
    glow: "0 4px 15px rgba(255, 230, 0, 0.5)",
  },
  springs: {
    snappy: { damping: 18, stiffness: 130, mass: 0.75 },
    gentle: { damping: 22, stiffness: 85, mass: 1 },
    bounce: { damping: 13, stiffness: 160, mass: 0.8 },
    slow: { damping: 28, stiffness: 50, mass: 1.3 },
  },
  motion: {
    pacingVelocity: "DYNAMIC EXPLAINER",
    avgCutIntervalSec: 3.2,
    targetWpm: 145,
    entranceMotion: "stroke-dashoffset-draw + hand-follow",
    continuousMotion: "hand-pen-bobbing + paper-subtle-breathing",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 52,
  },
};
