import { StyleTheme } from "../types";

export const MultiAssetTradingTheme: StyleTheme = {
  meta: {
    id: "multi-asset-trading",
    version: "2.0.0",
    name: "Multi-Asset Trading & Candlestick Replay",
    purpose: "Phong cách giao dịch tài chính chuyên sâu: Tái hiện nến Nhật theo tick, vùng thanh khoản Smart Money, dải ticker ribbon và sổ cái kinh tế",
    category: "finance",
    bestFor: [
      "Replay nến Nhật đa khung thời gian (Candlestick Replay cho Forex, Chứng khoán, Crypto)",
      "Phân tích cấu trúc thị trường: Order Block, Fair Value Gap (FVG), Liquidity Hunt & Volume Profile",
      "Digital Asset Forensics: Phân tích dòng tiền On-chain, Funding Rate, Liquidation Cascades",
      "Sổ cái tài chính (Financial Ledger Newspaper) & Báo cáo thu nhập doanh nghiệp (Earnings & Valuation)"
    ],
    notIdealFor: ["Clip giải trí đời sống", "Vlog du lịch ẩm thực"],
    tags: ["trading", "forex", "crypto", "candlestick", "order-block", "ticker", "liquidity", "stocks"],
  },
  colors: {
    background: "#070B19",
    backgroundGradient: "radial-gradient(circle at 50% 25%, #0F1D38 0%, #040710 100%)",
    surface: "#0D172A",
    surfaceGlass: "rgba(13, 23, 42, 0.90)",
    border: "#1E2E4A",
    borderActive: "#38BDF8",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accentPrimary: "#00E599", // Xanh tăng giá (Bullish Green)
    accentSecondary: "#FF4D6A", // Đỏ giảm giá (Bearish Red)
    positive: "#00E599",
    negative: "#FF4D6A",
    warning: "#F59E0B",
  },
  typography: {
    fontFamily: '"Barlow SemiCondensed", "Be Vietnam Pro", sans-serif',
    monoFontFamily: '"JetBrains Mono", monospace',
    headline: {
      fontSize: 58,
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: "0.01em",
    },
    subheadline: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.3,
    },
    cardTitle: {
      fontSize: 34,
      fontWeight: 700,
      lineHeight: 1.25,
    },
    cardBody: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 72,
      fontWeight: 800,
      lineHeight: 1.05,
    },
    badgeText: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "0.05em",
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
    activeWordColor: "#38BDF8",
    inactiveWordColor: "rgba(248, 250, 252, 0.65)",
    backgroundColor: "#070B19EE",
    borderRadius: 16,
    padding: "14px 30px",
    fontSize: 34,
    fontWeight: 800,
    glow: "0 0 16px rgba(56, 189, 248, 0.4)",
  },
  springs: {
    snappy: { damping: 14, stiffness: 155, mass: 0.65 },
    gentle: { damping: 19, stiffness: 95, mass: 0.95 },
    bounce: { damping: 10, stiffness: 180, mass: 0.7 },
    slow: { damping: 24, stiffness: 55, mass: 1.2 },
  },
  motion: {
    pacingVelocity: "FAST / HIGH ADRENALINE",
    avgCutIntervalSec: 2.8,
    targetWpm: 156,
    entranceMotion: "candlestick-grow + ticker-sweep",
    continuousMotion: "running-ticker-ribbon + price-pulse",
  },
  safeZone: {
    top: 240,
    bottom: 1540,
    paddingX: 50,
  },
};
