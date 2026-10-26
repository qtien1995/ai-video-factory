import { StyleTheme } from "../types";

export const EditorialNewsCanvasTheme: StyleTheme = {
  meta: {
    id: "editorial-news-canvas",
    version: "2.0.0",
    name: "Editorial News Canvas & Press Briefing",
    purpose: "Phong cách báo chí chính luận & tin tức biên tập: Chèn bài báo thực tế với highlight trích dẫn, bảng điểm thể thao, thông số xe cộ và bảng học thuật",
    category: "editorial",
    bestFor: [
      "Thời sự chính luận, dân sinh, giao thông & biến động xã hội (Modern News Canvas & Crimson Timeline)",
      "Chèn ảnh chụp bài báo thực tế (Press Clipping Mockup với vệt bút dạ quang trên VnExpress, Tuổi Trẻ, Bloomberg)",
      "Bản tin thể thao: Tỉ số trận đấu (Scoreboard), thống kê cầu thủ & điểm nhấn highlight",
      "Tin thị trường xe cộ: Spec cards so sánh mã lực, tăng tốc, dung lượng pin & đồng hồ đo tốc độ (Gauges)",
      "Giáo dục & Học thuật: Bảng bài giảng step-by-step (Math Lesson Dark/Light), tuyển sinh & deadline"
    ],
    notIdealFor: ["Clip hài parody", "Video nhảy TikTok ngắn"],
    tags: ["editorial", "news", "press-clipping", "newspaper", "sports", "auto", "education", "scoreboard"],
  },
  colors: {
    background: "#0B101D",
    backgroundGradient: "radial-gradient(circle at 50% 30%, #131E35 0%, #080C16 100%)",
    surface: "#121A2C",
    surfaceGlass: "rgba(18, 26, 44, 0.90)",
    border: "#202E4A",
    borderActive: "#E11D48", // Crimson tin nóng
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accentPrimary: "#E11D48", // Crimson đỏ son thời sự
    accentSecondary: "#38BDF8", // Cyan công nghệ & thể thao
    positive: "#10B981",
    negative: "#EF4444",
    warning: "#F59E0B",
  },
  typography: {
    fontFamily: '"Fraunces", "Plus Jakarta Sans", serif, sans-serif',
    monoFontFamily: '"JetBrains Mono", monospace',
    headline: {
      fontSize: 56,
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
      fontSize: 25,
      fontWeight: 500,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 70,
      fontWeight: 800,
      lineHeight: 1.05,
    },
    badgeText: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 22,
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  subtitles: {
    positionY: 1515,
    activeWordColor: "#FFFFFF",
    inactiveWordColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "#E11D48EE", // Đỏ son báo chí
    borderRadius: 14,
    padding: "13px 28px",
    fontSize: 34,
    fontWeight: 800,
    glow: "0 4px 20px rgba(225, 29, 72, 0.4)",
  },
  springs: {
    snappy: { damping: 16, stiffness: 140, mass: 0.7 },
    gentle: { damping: 21, stiffness: 90, mass: 1 },
    bounce: { damping: 12, stiffness: 165, mass: 0.75 },
    slow: { damping: 25, stiffness: 50, mass: 1.2 },
  },
  motion: {
    pacingVelocity: "DYNAMIC EXPLAINER",
    avgCutIntervalSec: 3.2,
    targetWpm: 152,
    entranceMotion: "slide-horizontal-unfold + press-highlight-sweep",
    continuousMotion: "breaking-ticker-pulse + subtle-zoom",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 52,
  },
};
