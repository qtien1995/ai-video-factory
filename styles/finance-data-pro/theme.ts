import { StyleTheme } from "../types";

export const FinanceDataProTheme: StyleTheme = {
  meta: {
    id: "finance-data-pro",
    version: "2.0.0",
    name: "Finance Data Pro",
    purpose: "Phong cách tài chính & dữ liệu đầu tư chuyên sâu: Tích hợp Bar Chart Race chuẩn HODL.VN, nến TradingView và báo cáo vĩ mô",
    category: "finance",
    bestFor: [
      "So sánh lãi suất kép & Đua tài sản qua các năm (Chuẩn DNA HODL)",
      "Phân tích cổ phiếu, VN-Index & Kỹ thuật nến TradingView",
      "Báo cáo vĩ mô, tháp tài sản, lạm phát & tiền tệ",
      "Crypto, vàng, bất động sản & bảng xếp hạng Leaderboard"
    ],
    notIdealFor: ["Vlog đời sống", "Kể chuyện thiếu nhi"],
    tags: ["finance", "hodl-dna", "race-chart", "tradingview", "macro", "leaderboard", "stocks"],
    sourceDna: "HODL-VN-INVESTMENT-RACE",
  },
  colors: {
    background: "#0B0E14", // Obsidian Dark chuẩn HODL
    backgroundGradient: "radial-gradient(ellipse at 50% 15%, #141B29 0%, #0B0E14 85%)",
    surface: "#121824",
    surfaceGlass: "rgba(18, 24, 36, 0.9)",
    border: "rgba(212, 175, 55, 0.2)",
    borderActive: "#D4AF37", // Gold kim chuẩn HODL
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accentPrimary: "#D4AF37", // Gold kim HODL
    accentSecondary: "#38BDF8", // Cyan neon TradingView
    positive: "#10B981", // Bullish green
    negative: "#EF4444", // Bearish red
    warning: "#F59E0B",
  },
  typography: {
    fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', system-ui, sans-serif",
    monoFontFamily: "'JetBrains Mono', 'Roboto Mono', monospace",
    headline: {
      fontSize: 70,
      fontWeight: 900,
      lineHeight: 1.12,
      letterSpacing: "-1px",
      textTransform: "uppercase",
    },
    subheadline: {
      fontSize: 38,
      fontWeight: 800,
      lineHeight: 1.25,
    },
    cardTitle: {
      fontSize: 40,
      fontWeight: 800,
      lineHeight: 1.25,
    },
    cardBody: {
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 84,
      fontWeight: 900,
      letterSpacing: "-1.5px",
    },
    badgeText: {
      fontSize: 24,
      fontWeight: 900,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 22,
      fontWeight: 500,
      lineHeight: 1.35,
    },
  },
  subtitles: {
    positionY: 1530,
    activeWordColor: "#D4AF37", // Highlight vàng kim chuẩn HODL
    inactiveWordColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(11, 14, 20, 0.95)",
    borderRadius: 18,
    padding: "14px 32px",
    fontSize: 34,
    fontWeight: 800,
    glow: "0 0 18px rgba(212, 175, 55, 0.5)",
  },
  springs: {
    snappy: { damping: 13, stiffness: 155, mass: 0.6 },
    gentle: { damping: 19, stiffness: 105, mass: 0.95 },
    bounce: { damping: 9, stiffness: 190, mass: 0.7 },
    slow: { damping: 23, stiffness: 65, mass: 1.15 },
  },
  motion: {
    pacingVelocity: "DYNAMIC EXPLAINER",
    avgCutIntervalSec: 3.0,
    targetWpm: 156,
    entranceMotion: "slide-horizontal-expand + pop-scale",
    continuousMotion: "smooth-bar-interpolation",
  },
  safeZone: {
    top: 240,
    bottom: 1540,
    paddingX: 48,
  },
};
