import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrandDefault from "../../../../brand/user-brand.json";

export interface UserBrandConfig {
  creatorName?: string;
  title?: string;
  company?: string;
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
 * UserBrandOutro — AI Video Factory V4 (Redesigned)
 *
 * Tiêu chuẩn thiết kế:
 * 1. Chống lặp từ: Tên Tiến Dương xuất hiện đúng 1 LẦN DUY NHẤT, to và trang trọng.
 * 2. Phân cấp thị giác chuẩn xác: Logo -> Headline -> Tên -> Chức danh -> Nút CTA -> Handle -> Disclaimer.
 * 3. Thẩm mỹ cao cấp: Frosted glass, viền kim loại kép, micro-glow.
 */
export const UserBrandOutro: React.FC<UserBrandOutroProps> = ({
  brand = userBrandDefault,
  headline = "HOẠCH ĐỊNH LÁ CHẮN TÀI CHÍNH",
  highlightText,
  accentColor = "#00A758", // Manulife Emerald
  secondaryAccent = "#F59E0B", // Gold Accent
  backgroundColor = "transparent",
  cardBackground = "rgba(7, 16, 32, 0.94)",
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
  const professionalTitle = brand.title || "Chuyên Gia Hoạch Định Tài Chính";
  const companyName = brand.company || "Manulife Việt Nam";
  const tagline = brand.tagline || "BẢO VỆ TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG";
  const cta = brand.cta || "Nhắn 'KẾ HOẠCH' để nhận bản phân tích rủi ro 👇";
  const handle = brand.handle || "@tienduong";
  const disclaimer = brand.disclaimer || "Nội dung mang tính chất chia sẻ giải pháp · Liên hệ để được tư vấn theo nhu cầu thực tế";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        backgroundColor,
        zIndex: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: cardBackground,
          border: `2px solid ${accentColor}50`,
          borderRadius: 36,
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: `0 30px 80px rgba(0,0,0,0.88), 0 0 50px ${accentColor}25`,
          backdropFilter: "blur(24px)",
          transform: `scale(${0.92 + entrance * 0.08})`,
          opacity: entrance,
        }}
      >
        {/* Top Company Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 22px",
            borderRadius: 999,
            backgroundColor: `${accentColor}18`,
            border: `1px solid ${accentColor}60`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#E2E8F0",
              fontFamily: "'Be Vietnam Pro', sans-serif",
            }}
          >
            {companyName}
          </span>
        </div>

        {/* Message Headline */}
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 34,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.3,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            marginBottom: 16,
          }}
        >
          {headline}
          {highlightText && (
            <span style={{ color: secondaryAccent, marginLeft: 10 }}>
              {highlightText}
            </span>
          )}
        </div>

        {/* Divider Line */}
        <div
          style={{
            width: 120,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${secondaryAccent}, transparent)`,
            marginBottom: 20,
          }}
        />

        {/* Creator Name (Chỉ 1 lần duy nhất) */}
        <h2
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 56,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            margin: "0 0 8px 0",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          {creatorName}
        </h2>

        {/* Professional Title */}
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: accentColor,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {professionalTitle}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#94A3B8",
            letterSpacing: "0.06em",
          }}
        >
          {tagline}
        </div>

        {/* Call to Action Pill Button */}
        <div
          style={{
            marginTop: 32,
            backgroundColor: `${accentColor}25`,
            border: `2px solid ${accentColor}`,
            borderRadius: 999,
            padding: "16px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 30px ${accentColor}35`,
          }}
        >
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 24,
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
            marginTop: 18,
            fontSize: 20,
            fontWeight: 700,
            color: "#64748B",
            letterSpacing: "0.05em",
          }}
        >
          {handle}
        </div>

        {/* Legal Disclaimer */}
        <div
          style={{
            marginTop: 16,
            fontSize: 15,
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
