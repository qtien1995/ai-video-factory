import { TechTvTipsTheme } from "./tech-tv-tips/theme";
import { TestDnaZeroMediaTheme } from "./test-dna-zero-media/theme";
import { AiTechBriefingTheme } from "./ai-tech-briefing/theme";
import { StyleTheme } from "./types";
import { FinanceDataProTheme } from "./finance-data-pro/theme";
import { CleanExplainerTheme } from "./clean-explainer/theme";
import { KineticMinimalistTheme } from "./kinetic-minimalist/theme";
import { WhiteboardHandDrawTheme } from "./whiteboard-hand-draw/theme";
import { GeopoliticalMapProTheme } from "./geopolitical-map-pro/theme";
import { MultiAssetTradingTheme } from "./multi-asset-trading/theme";
import { EditorialNewsCanvasTheme } from "./editorial-news-canvas/theme";
import { ShowcaseAffiliateLuxuryTheme } from "./showcase-affiliate-luxury/theme";
import { MedicalBiometricsProTheme } from "./medical-biometrics-pro/theme";

export * from "./types";
export {
  TechTvTipsTheme,
  TestDnaZeroMediaTheme,
  AiTechBriefingTheme,
  FinanceDataProTheme,
  CleanExplainerTheme,
  KineticMinimalistTheme,
  WhiteboardHandDrawTheme,
  GeopoliticalMapProTheme,
  MultiAssetTradingTheme,
  EditorialNewsCanvasTheme,
  ShowcaseAffiliateLuxuryTheme,
  MedicalBiometricsProTheme,
};

export const STYLE_THEMES: Record<string, StyleTheme> = {
  "tech-tv-tips": TechTvTipsTheme,
  "test-dna-zero-media": TestDnaZeroMediaTheme,
  "medical-biometrics-pro": MedicalBiometricsProTheme,
  "medical-clinical": MedicalBiometricsProTheme,
  "y-te-suc-khoe": MedicalBiometricsProTheme,
  "ai-tech-briefing": AiTechBriefingTheme,
  "tech-news": AiTechBriefingTheme,
  "ai-news": AiTechBriefingTheme,
  "ai-briefing": AiTechBriefingTheme,
  "ban-tin-ai": AiTechBriefingTheme,
  "tin-cong-nghe": AiTechBriefingTheme,

  // 8 Master Styles Tinh Gọn & Độc Quyền
  "finance-data-pro": FinanceDataProTheme,
  "clean-explainer": CleanExplainerTheme,
  "kinetic-minimalist": KineticMinimalistTheme,
  "whiteboard-hand-draw": WhiteboardHandDrawTheme,
  "geopolitical-map-pro": GeopoliticalMapProTheme,
  "multi-asset-trading": MultiAssetTradingTheme,
  "editorial-news-canvas": EditorialNewsCanvasTheme,
  "showcase-affiliate-luxury": ShowcaseAffiliateLuxuryTheme,

  // Aliases Vẽ Tay & Motion Tự Vẽ (Whiteboard Suite)
  "whiteboard-hand": WhiteboardHandDrawTheme,
  "whiteboard-sketch": WhiteboardHandDrawTheme,
  "whiteboard-stream": WhiteboardHandDrawTheme,
  "paper-sketch": WhiteboardHandDrawTheme,
  "paper-hand": WhiteboardHandDrawTheme,
  "illustrated-paper-clean": WhiteboardHandDrawTheme,
  "illustrated-paper-textured": WhiteboardHandDrawTheme,
  "ve-tay-ke-chuyen": WhiteboardHandDrawTheme,

  // Aliases Bản Đồ & Địa Lý - Chính Trị (Geopolitical Suite)
  "geopolitical-map": GeopoliticalMapProTheme,
  "fullscreen-geopolitical-map": GeopoliticalMapProTheme,
  "dia-ly-chinh-tri": GeopoliticalMapProTheme,
  "bando-chientranh": GeopoliticalMapProTheme,

  // Aliases Tài Chính & Trading (Financial Deep-Dive)
  "candlestick-replay": MultiAssetTradingTheme,
  "multi-asset-chart": MultiAssetTradingTheme,
  "crypto-signal-lab": MultiAssetTradingTheme,
  "forex-story": MultiAssetTradingTheme,
  "stock-story": MultiAssetTradingTheme,
  "tai-chinh": MultiAssetTradingTheme,
  "financial-ledger": MultiAssetTradingTheme,
  "dark-finance-pro": FinanceDataProTheme,
  "investment-race-chart": FinanceDataProTheme,
  "macro-report-editorial": FinanceDataProTheme,

  // Aliases Báo Chí, Thời Sự, Giáo Dục & Thể Thao (Editorial Canvas)
  "modern-news-canvas": EditorialNewsCanvasTheme,
  "thoi-su": EditorialNewsCanvasTheme,
  "crimson-timeline": EditorialNewsCanvasTheme,
  "press-clipping": EditorialNewsCanvasTheme,
  "the-thao": EditorialNewsCanvasTheme,
  "sports-scoreboard": EditorialNewsCanvasTheme,
  "giao-duc": EditorialNewsCanvasTheme,
  "math-lesson": EditorialNewsCanvasTheme,
  "xe-co": EditorialNewsCanvasTheme,
  "auto-showroom": EditorialNewsCanvasTheme,

  // Aliases Trưng Bày Bán Hàng & Bất Động Sản Luxury (Showcase Suite)
  "ban-hang-affiliate": ShowcaseAffiliateLuxuryTheme,
  "bat-dong-san": ShowcaseAffiliateLuxuryTheme,
  "real-estate-atlas": ShowcaseAffiliateLuxuryTheme,
  "residential-atelier": ShowcaseAffiliateLuxuryTheme,
  "suc-khoe": ShowcaseAffiliateLuxuryTheme,
  "beauty-luxury-noir": ShowcaseAffiliateLuxuryTheme,
  "du-lich": ShowcaseAffiliateLuxuryTheme,
  "travel-postcard": ShowcaseAffiliateLuxuryTheme,

  // Aliases Thẻ 2D Giải Thích
  "cuongit-tech-explainer": CleanExplainerTheme,
  "insurance-life-editorial": CleanExplainerTheme,
};

/**
 * Lấy StyleTheme tương ứng với styleId.
 * Nếu không tìm thấy, mặc định trả về FinanceDataProTheme.
 */
export function getStyleTheme(styleId?: string | null): StyleTheme {
  if (!styleId) return FinanceDataProTheme;
  const normalized = styleId.toLowerCase().trim();
  return STYLE_THEMES[normalized] || FinanceDataProTheme;
}

/**
 * Trả về danh sách toàn bộ các Master Styles cốt lõi.
 */
export function listStyles(): StyleTheme[] {
  return [
    MedicalBiometricsProTheme,
    AiTechBriefingTheme,
    WhiteboardHandDrawTheme,
    GeopoliticalMapProTheme,
    MultiAssetTradingTheme,
    EditorialNewsCanvasTheme,
    ShowcaseAffiliateLuxuryTheme,
    FinanceDataProTheme,
    CleanExplainerTheme,
    KineticMinimalistTheme,
  ];
}
