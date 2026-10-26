import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrandDefault from "../../../../brand/user-brand.json";

export interface UserBrandConfig {
  creatorName?: string;
  brandName?: string;
  tagline?: string;
  cta?: string;
  handle?: string;
  disclaimer?: string;
}

export interface UserBrandOutroProps {
  brand?: UserBrandConfig;
  headline?: string;
  highlightText?: string;
  accentColor?: string;
  secondaryAccent?: string;
  backgroundColor?: string;
  cardBackground?: string;
  progress?: number;
}

/**
 * UserBrandOutro — AI Video Factory V3
 *
 * Implements Brand Isolation Mandate:
 * 1. 100% Brand Isolation: Never uses sample video channels or author watermarks.
 * 2. Injects User Brand Identity (brand/user-brand.json).
 * 3. Mobile Layout 1080x1920 with high-contrast typography, CTA & legal disclaimer.
 */
export const UserBrandOutro: React.FC<UserBrandOutroProps> = ({
  brand = userBrandDefault,
  headline = "THEO DÕI ĐỂ KHÔNG BỎ LỠ",
  highlightText,
  accentColor = "#D4AF37",
  secondaryAccent = "#38BDF8",
  backgroundColor = "transparent",
  cardBackground = "rgba(15, 23, 42, 0.94)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const creatorName = brand.creatorName || "Tiến Dương";
  const brandName = brand.brandName || "TÀI CHÍNH THỰC CHIẾN";
  const tagline = brand.tagline || "HOẠCH ĐỊNH TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG";
  const cta = brand.cta || "Bình luận ý kiến của bạn bên dưới 👇";
  const handle = brand.handle || "@tienduong";
  const disclaimer = brand.disclaimer || "Số liệu mang tính chất tham khảo · Không phải khuyến nghị đầu tư";

  // Initials for avatar monogram
  const initials = creatorName
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  const finalHighlight = highlightText || brandName;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 56px",
        backgroundColor,
        zIndex: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: cardBackground,
          border: `2px solid ${accentColor}40`,
          borderRadius: 36,
          padding: "54px 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: `0 25px 70px rgba(0,0,0,0.85), 0 0 40px ${accentColor}25`,
          backdropFilter: "blur(20px)",
          transform: `scale(${0.9 + entrance * 0.1})`,
          opacity: entrance,
        }}
      >
        {/* Creator Emblem Monogram */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accentColor}, ${secondaryAccent})`,
            padding: 4,
            boxShadow: `0 0 40px ${accentColor}60`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#06090F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54,
              fontWeight: 900,
              color: accentColor,
              fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            }}
          >
            {initials}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.2,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {headline}
          <br />
          <span style={{ color: accentColor }}>{finalHighlight}</span>
        </div>

        {/* Creator Identity */}
        <h2
          style={{
            fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            margin: "8px 0 0 0",
          }}
        >
          {creatorName}
        </h2>

        <div
          style={{
            fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            fontSize: 30,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          {brandName}
        </div>

        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: "#94A3B8",
            marginTop: 8,
            maxWidth: 720,
          }}
        >
          {tagline}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            marginTop: 32,
            backgroundColor: `${accentColor}20`,
            border: `2px solid ${accentColor}`,
            borderRadius: 999,
            padding: "16px 36px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: `0 0 25px ${accentColor}30`,
          }}
        >
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            {cta}
          </span>
        </div>

        {/* Handle */}
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: 700,
            color: "#64748B",
            letterSpacing: "1px",
          }}
        >
          {handle}
        </div>

        {/* Legal Disclaimer */}
        <div
          style={{
            marginTop: 20,
            fontSize: 16,
            fontWeight: 500,
            color: "#475569",
            maxWidth: 680,
            lineHeight: 1.4,
          }}
        >
          {disclaimer}
        </div>
      </div>
    </div>
  );
};
