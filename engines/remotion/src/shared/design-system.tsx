import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

/**
 * AI VIDEO FACTORY V4 — MOBILE DESIGN TOKENS (1080 × 1920)
 * 
 * Lưu ý theo AGENTS.md V4 (Bespoke):
 * File này chỉ cung cấp các anchor layout và typography tham khảo an toàn trên thiết bị di động (9:16).
 * MỌI màu sắc, chất liệu, bố cục hình ảnh và chuyển động phải được may đo độc bản (Bespoke)
 * từ Art Direction Sheet của từng video, CẤM rập khuôn thẻ hoặc ép bảng màu cố định.
 */

// ============================================================================
// 1. TYPOGRAPHY SCALE (Mobile Safe Standards)
// ============================================================================
export const MOBILE_TYPOGRAPHY = {
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  
  // Headers (Prominent & Punchy)
  headerTitle: {
    fontSize: 72,
    fontWeight: 900 as const,
    lineHeight: 1.15,
    letterSpacing: "-1px",
    textTransform: "uppercase" as const,
  },
  headerSubtitle: {
    fontSize: 38,
    fontWeight: 800 as const,
    lineHeight: 1.25,
  },
  
  // Editorial Elements
  sectionTitle: {
    fontSize: 40,
    fontWeight: 900 as const,
    lineHeight: 1.25,
  },
  bodyText: {
    fontSize: 30,
    fontWeight: 700 as const,
    lineHeight: 1.45,
  },
  badgeText: {
    fontSize: 24,
    fontWeight: 800 as const,
    letterSpacing: "1px",
  },

  // Bottom Subtitle Caption Bar
  subtitleBar: {
    fontSize: 36,
    fontWeight: 800 as const,
    lineHeight: 1.38,
  },
} as const;

// ============================================================================
// 2. VERTICAL ANCHORS & SAFE ZONES (1080 × 1920)
// ============================================================================
export const MOBILE_LAYOUT = {
  width: 1080,
  height: 1920,
  
  // Safe margins
  safeMarginHorizontal: 40,
  
  // Upper Navigation & Title Zone
  headerTop: 120,
  headerHeight: 250,
  
  // Center Hero Visual Anchor (Center point for visual metaphors)
  centerAnchorY: 760,
  
  // Lower Zone
  lowerZoneTop: 1300,
  
  // Bottom Subtitle & Platform UI Safe Zone
  subtitleBarBottom: 150,
} as const;

// ============================================================================
// 3. COLOR PALETTE PRESETS (Tham khảo - Nên ghi đè theo từng Art Direction)
// ============================================================================
export const MOBILE_COLORS = {
  bgDark: "#030712",
  textLight: "#f8fafc",
  textMuted: "#94a3b8",
  
  gold: "#facc15",
  goldLight: "#fef08a",
  goldBorder: "#eab308",
  
  cyan: "#0284c7",
  cyanLight: "#38bdf8",
  cyanBorder: "#0369a1",
  
  emerald: "#059669",
  emeraldLight: "#34d399",
  
  red: "#dc2626",
  redLight: "#f87171",
  
  surfaceDark: "rgba(15, 23, 42, 0.95)",
} as const;

// ============================================================================
// 4. REUSABLE PRIMITIVES
// ============================================================================

/**
 * Standard Full-Bleed Editorial Header
 */
export const StandardHeader: React.FC<{
  title: string;
  subtitle?: string;
  subColor?: string;
  accentColor?: string;
}> = ({ title, subtitle, subColor = MOBILE_COLORS.gold, accentColor }) => {
  const frame = useCurrentFrame();
  const enterY = interpolate(frame, [0, 15], [-25, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const finalSubColor = accentColor || subColor;

  return (
    <div
      style={{
        position: "absolute",
        left: MOBILE_LAYOUT.safeMarginHorizontal,
        right: MOBILE_LAYOUT.safeMarginHorizontal,
        top: MOBILE_LAYOUT.headerTop,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 60,
        opacity,
        transform: `translateY(${enterY}px)`,
      }}
    >
      <h1
        style={{
          fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
          ...MOBILE_TYPOGRAPHY.headerTitle,
          color: "#ffffff",
          textShadow: "0 5px 25px rgba(0,0,0,0.85)",
          marginBottom: 10,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
            ...MOBILE_TYPOGRAPHY.headerSubtitle,
            color: finalSubColor,
            textShadow: "0 3px 18px rgba(0,0,0,0.9)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Standard High-Contrast Subtitle Bar (Positioned above platform bottom nav)
 */
export const StandardSubtitleBar: React.FC<{
  text: string;
}> = ({ text }) => {
  if (!text || !text.trim()) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: MOBILE_LAYOUT.safeMarginHorizontal,
        right: MOBILE_LAYOUT.safeMarginHorizontal,
        bottom: MOBILE_LAYOUT.subtitleBarBottom,
        display: "flex",
        justifyContent: "center",
        zIndex: 75,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(3, 7, 18, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.25)",
          borderRadius: 24,
          padding: "18px 34px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.85)",
          maxWidth: 1000,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
            ...MOBILE_TYPOGRAPHY.subtitleBar,
            color: "#ffffff",
            textShadow: "0 3px 12px rgba(0,0,0,0.9)",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
