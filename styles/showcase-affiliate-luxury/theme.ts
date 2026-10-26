import { StyleTheme } from "../types";

export const ShowcaseAffiliateLuxuryTheme: StyleTheme = {
  meta: {
    id: "showcase-affiliate-luxury",
    version: "2.0.0",
    name: "Showcase Affiliate & Luxury Editorial",
    purpose: "Phong cách trưng bày sản phẩm thương mại điện tử, danh mục bất động sản kiến trúc, mỹ phẩm cao cấp và cẩm nang du lịch",
    category: "showcase",
    bestFor: [
      "Bán hàng Affiliate & TikTok Shop: Lộ diện sản phẩm (Mẫu 01-08), đường line chỉ tính năng xung quanh packshot & CTA chốt đơn",
      "Bất động sản & Kiến trúc: Hồ sơ dự án (Real Estate Atlas, Residential Atelier), khung ảnh vòm và bố cục cắt lớp",
      "Mỹ phẩm & Làm đẹp: Phong cách Beauty Luxury Noir & Editorial Light (espresso-plum, champagne gold, silk curves, bảng thành phần an toàn)",
      "Du lịch & Khám phá: Bưu thiếp Postcard du lịch với tem địa danh, lộ trình route strip và checklist chi phí"
    ],
    notIdealFor: ["Bản tin chiến sự khẩn cấp", "Kể chuyện hoạt hình thiếu nhi"],
    tags: ["affiliate", "ecommerce", "luxury", "real-estate", "beauty", "travel", "packshot", "architecture"],
  },
  colors: {
    background: "#0F0E11",
    backgroundGradient: "radial-gradient(circle at 50% 35%, #1C1924 0%, #0A090D 100%)",
    surface: "#1A1722",
    surfaceGlass: "rgba(26, 23, 34, 0.88)",
    border: "#2E2A3A",
    borderActive: "#E2B774", // Champagne Gold
    textPrimary: "#FAF8F5",
    textSecondary: "#A8A29E",
    textMuted: "#78716C",
    accentPrimary: "#E2B774", // Champagne Gold hoàng kim
    accentSecondary: "#F472B6", // Rose thanh lịch
    positive: "#10B981",
    negative: "#EF4444",
    warning: "#E2B774",
  },
  typography: {
    fontFamily: '"Cormorant Garamond", "Plus Jakarta Sans", serif, sans-serif',
    monoFontFamily: '"JetBrains Mono", monospace',
    headline: {
      fontSize: 58,
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: "0.02em",
    },
    subheadline: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.3,
    },
    cardTitle: {
      fontSize: 34,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    cardBody: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 68,
      fontWeight: 700,
      lineHeight: 1.1,
    },
    badgeText: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  subtitles: {
    positionY: 1515,
    activeWordColor: "#E2B774",
    inactiveWordColor: "rgba(250, 248, 245, 0.6)",
    backgroundColor: "#0F0E11EE",
    borderRadius: 16,
    padding: "13px 28px",
    fontSize: 34,
    fontWeight: 700,
    glow: "0 0 18px rgba(226, 183, 116, 0.35)",
  },
  springs: {
    snappy: { damping: 17, stiffness: 125, mass: 0.75 },
    gentle: { damping: 22, stiffness: 85, mass: 1 },
    bounce: { damping: 12, stiffness: 150, mass: 0.8 },
    slow: { damping: 28, stiffness: 45, mass: 1.3 },
  },
  motion: {
    pacingVelocity: "CALM / DOCUMENTARY",
    avgCutIntervalSec: 3.4,
    targetWpm: 148,
    entranceMotion: "scale-unveil + feature-line-draw",
    continuousMotion: "product-slow-orbit + champagne-glow-pulse",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 52,
  },
};
