import React from "react";

export const OutroCard: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
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
        padding: 60,
        zIndex: 60
      }}
    >
      {/* Infinity Icon Graphic */}
      <div style={{ marginBottom: 40, position: "relative" }}>
        <svg width="220" height="110" viewBox="0 0 200 100" fill="none">
          <path
            d="M 50,50 C 20,10 0,30 0,50 C 0,70 20,90 50,50 C 80,10 120,10 150,50 C 180,90 200,70 200,50 C 200,30 180,10 150,50 C 120,90 80,90 50,50 Z"
            stroke="url(#infinityGradient)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Title */}
      <h1
        style={{
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 900,
          margin: 0,
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }}
      >
        HODL.VN
      </h1>

      {/* Slogan */}
      <div
        style={{
          color: "#d4af37",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: 14
        }}
      >
        MUA ĐÚNG · GIỮ CHẶT
      </div>

      {/* Bottom Legal Disclaimer */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: 24,
          textAlign: "center"
        }}
      >
        Số liệu quá khứ, không phải khuyến nghị đầu tư
      </div>
    </div>
  );
};
