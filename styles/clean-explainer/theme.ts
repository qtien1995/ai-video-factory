import { StyleTheme } from "../types";

export interface ExplainerVariantColors {
  background: string;
  surface: string;
  surfaceGlass: string;
  border: string;
  borderActive: string;
  accentPrimary: string;
  accentSecondary: string;
}

/**
 * Clean Explainer hỗ trợ 2 Preset màu chuyên biệt:
 * 1. tech: GitHub Dark Slate (#0D1117) + Tech Blue (#58A6FF)
 * 2. insurance: Deep Emerald (#061A14) + Mint Green (#34D399)
 */
export const EXPLAINER_COLOR_PRESETS: Record<"tech" | "insurance", ExplainerVariantColors> = {
  tech: {
    background: "#0D1117",
    surface: "#161B22",
    surfaceGlass: "rgba(22, 27, 34, 0.9)",
    border: "rgba(88, 166, 255, 0.22)",
    borderActive: "#58A6FF",
    accentPrimary: "#58A6FF",
    accentSecondary: "#39D353",
  },
  insurance: {
    background: "#061A14",
    surface: "#0D3328",
    surfaceGlass: "rgba(13, 51, 40, 0.88)",
    border: "rgba(52, 211, 153, 0.22)",
    borderActive: "#34D399",
    accentPrimary: "#34D399",
    accentSecondary: "#FBBF24",
  },
};

export const CleanExplainerTheme: StyleTheme = {
  meta: {
    id: "clean-explainer",
    version: "2.0.0",
    name: "Clean Explainer 2D",
    purpose: "Giải thích kiến thức, cơ chế và sản phẩm qua hệ thống 6 cảnh chuẩn Cường IT và 6 bố cục thẻ Archetypes",
    category: "tech",
    bestFor: [
      "Giải thích công nghệ, phần mềm, cloud, AI tools",
      "Bảo hiểm sức khỏe (BHSK), BHYT & An sinh gia đình",
      "Kế hoạch tài chính, quản lý rủi ro & hợp đồng quyền lợi",
      "Quy trình từng bước (Step-by-step How-it-works)"
    ],
    notIdealFor: ["Clip hài ngắn", "MV ca nhạc"],
    tags: ["explainer", "cards", "cuongit", "tech", "insurance", "archetypes", "workflow"],
  },
  colors: {
    background: "#0D1117",
    backgroundGradient: "radial-gradient(circle at 50% 20%, #161B22 0%, #0D1117 90%)",
    surface: "#161B22",
    surfaceGlass: "rgba(22, 27, 34, 0.9)",
    border: "rgba(88, 166, 255, 0.22)",
    borderActive: "#58A6FF",
    textPrimary: "#F0F6FC",
    textSecondary: "#8B949E",
    textMuted: "#484F58",
    accentPrimary: "#58A6FF",
    accentSecondary: "#34D399",
    positive: "#3FB950",
    negative: "#F85149",
    warning: "#D29922",
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Be Vietnam Pro', system-ui, sans-serif",
    monoFontFamily: "'Fira Code', 'Roboto Mono', monospace",
    headline: {
      fontSize: 68,
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
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 80,
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
    positionY: 1520,
    activeWordColor: "#58A6FF",
    inactiveWordColor: "rgba(240, 246, 252, 0.75)",
    backgroundColor: "rgba(13, 17, 23, 0.94)",
    borderRadius: 16,
    padding: "14px 30px",
    fontSize: 34,
    fontWeight: 800,
    glow: "0 0 16px rgba(88, 166, 255, 0.4)",
  },
  springs: {
    snappy: { damping: 15, stiffness: 145, mass: 0.65 },
    gentle: { damping: 20, stiffness: 95, mass: 1 },
    bounce: { damping: 11, stiffness: 175, mass: 0.75 },
    slow: { damping: 25, stiffness: 55, mass: 1.2 },
  },
  motion: {
    pacingVelocity: "DYNAMIC EXPLAINER",
    avgCutIntervalSec: 3.4,
    targetWpm: 152,
    entranceMotion: "slide-down-reveal + card-pop",
    continuousMotion: "subtle-float",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 50,
  },
};
