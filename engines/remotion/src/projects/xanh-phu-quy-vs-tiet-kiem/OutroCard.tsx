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
  cta = "Bình luận phương án tích lũy của bạn bên dưới 👇",
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
        fontFamily: "'Be Vietnam Pro', sans-serif"
      }}
    >
      {/* Creator Avatar / Brand Emblem */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981, #d4af37, #38bdf8)",
          padding: 4,
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)",
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
            color: "#10b981"
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

      {/* Divider */}
      <div
        style={{
          width: 120,
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 2,
          margin: "40px 0"
        }}
      />

      {/* CTA Box */}
      <div
        style={{
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          border: "2px solid #10b981",
          borderRadius: 20,
          padding: "24px 36px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.25)"
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 32,
            fontWeight: 800,
            lineHeight: 1.3
          }}
        >
          {cta}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 60,
          right: 60,
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.35)",
          fontSize: 20,
          lineHeight: 1.4
        }}
      >
        {disclaimer}
      </div>
    </div>
  );
};
