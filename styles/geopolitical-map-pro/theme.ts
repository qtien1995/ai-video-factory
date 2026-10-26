import { StyleTheme } from "../types";

export const GeopoliticalMapProTheme: StyleTheme = {
  meta: {
    id: "geopolitical-map-pro",
    version: "2.0.0",
    name: "Geopolitical Map Pro",
    purpose: "Phong cách bản đồ địa chính trị, chiến lược quân sự, tuyến thương mại hàng hải và diễn biến lịch sử toàn cầu",
    category: "map",
    bestFor: [
      "Bản đồ địa lý - chính trị thế giới & khu vực (Geopolitical & Fullscreen Map)",
      "Xung đột quân sự, chiến lược phòng thủ, tuyến vận tải hàng hải & eo biển",
      "Tranh chấp tài nguyên, liên minh quốc tế (NATO, BRICS, ASEAN) & biến động biên giới",
      "Phim tài liệu lịch sử, diễn biến chiến dịch và phân tích quan hệ quốc tế"
    ],
    notIdealFor: ["Bán hàng mỹ phẩm", "Vlog ẩm thực đời sống"],
    tags: ["geopolitics", "map", "military", "strategy", "routes", "territory", "tactical-hud"],
  },
  colors: {
    background: "#080C14",
    backgroundGradient: "radial-gradient(circle at 50% 40%, #0E1726 0%, #05080F 100%)",
    surface: "#101826",
    surfaceGlass: "rgba(16, 24, 38, 0.88)",
    border: "#1E2D42",
    borderActive: "#00F0FF",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accentPrimary: "#00F0FF", // Cyan chiến lược
    accentSecondary: "#FF334B", // Crimson cảnh báo xung đột
    positive: "#10B981",
    negative: "#FF334B",
    warning: "#FBBF24",
  },
  typography: {
    fontFamily: '"Space Grotesk", "Be Vietnam Pro", sans-serif',
    monoFontFamily: '"JetBrains Mono", monospace',
    headline: {
      fontSize: 54,
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    subheadline: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.35,
    },
    cardTitle: {
      fontSize: 34,
      fontWeight: 700,
      lineHeight: 1.3,
    },
    cardBody: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 68,
      fontWeight: 800,
      lineHeight: 1.1,
    },
    badgeText: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  subtitles: {
    positionY: 1520,
    activeWordColor: "#00F0FF",
    inactiveWordColor: "rgba(248, 250, 252, 0.6)",
    backgroundColor: "#080C14EE",
    borderRadius: 16,
    padding: "14px 28px",
    fontSize: 34,
    fontWeight: 800,
    glow: "0 0 16px rgba(0, 240, 255, 0.4)",
  },
  springs: {
    snappy: { damping: 15, stiffness: 140, mass: 0.7 },
    gentle: { damping: 20, stiffness: 90, mass: 1 },
    bounce: { damping: 12, stiffness: 165, mass: 0.75 },
    slow: { damping: 26, stiffness: 50, mass: 1.25 },
  },
  motion: {
    pacingVelocity: "CALM / DOCUMENTARY",
    avgCutIntervalSec: 3.6,
    targetWpm: 150,
    entranceMotion: "camera-zoom-coordinate + territory-glow-fill",
    continuousMotion: "animated-dashed-routes + tactical-radar-sweep",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 52,
  },
};
