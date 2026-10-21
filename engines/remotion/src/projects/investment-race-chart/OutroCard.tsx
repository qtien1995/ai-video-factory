import React from "react";
import userBrand from "../../../../../brand/user-brand.json";

interface OutroProps {
  opacity?: number;
  brandName?: string;
  creatorName?: string;
  tagline?: string;
  cta?: string;
  disclaimer?: string;
}

export const OutroCard: React.FC<OutroProps> = ({
  opacity = 1,
  brandName = userBrand.brandName || "TÀI CHÍNH THỰC CHIẾN",
  creatorName = userBrand.creatorName || "Tiến Dương",
  tagline = userBrand.tagline || "HOẠCH ĐỊNH TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG",
  cta = userBrand.cta || "Bình luận danh mục của bạn bên dưới 👇",
  disclaimer = userBrand.disclaimer || "Số liệu mang tính chất tham khảo · Không phải khuyến nghị đầu tư"
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0b0e14",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 60px",
        zIndex: 60,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Creator Avatar / Brand Emblem */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d4af37, #f59e0b, #38bdf8)",
          padding: 4,
          boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)",
          marginBottom: 32
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#0b0e14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            fontWeight: 900,
            color: "#d4af37"
          }}
        >
          {creatorName ? creatorName.charAt(0) : "T"}
        </div>
      </div>

      {/* Brand / Channel Name */}
      <h1
        style={{
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 900,
          margin: 0,
          letterSpacing: "0.02em",
          textAlign: "center",
          lineHeight: 1.2
        }}
      >
        {brandName}
      </h1>

      {/* Creator Byline */}
      <div
        style={{
          color: "#94a3b8",
          fontSize: 32,
          fontWeight: 600,
          marginTop: 12
        }}
      >
        {creatorName}
      </div>

      {/* Tagline */}
      <div
        style={{
          color: "#d4af37",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginTop: 20,
          textAlign: "center"
        }}
      >
        {tagline}
      </div>

      {/* CTA Box */}
      <div
        style={{
          marginTop: 50,
          backgroundColor: "rgba(212, 175, 55, 0.12)",
          border: "1.5px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 40,
          padding: "18px 36px",
          color: "#ffffff",
          fontSize: 28,
          fontWeight: 700,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
        }}
      >
        {cta}
      </div>

      {/* Bottom Legal Disclaimer */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: 22,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.4
        }}
      >
        {disclaimer}
      </div>
    </div>
  );
};
