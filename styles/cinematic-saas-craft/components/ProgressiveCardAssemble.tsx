import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export interface ProgressiveCardProps {
  eyebrow?: string;
  badge?: string;
  title?: string;
  originalValue?: string;
  newValue?: string;
  valueSubtext?: string;
  features?: string[];
  ctaText?: string;
}

export const ProgressiveCardAssemble: React.FC<ProgressiveCardProps> = ({
  eyebrow = "GIẢI PHÁP ĐỘT PHÁ",
  badge = "ENTERPRISE READY",
  title = "AI Video Factory V3",
  originalValue = "40 Giờ / Video",
  newValue = "3 Phút Tự Động",
  valueSubtext = "Tiết kiệm 95% thời gian sản xuất",
  features = [
    "Voiceover AI tiếng Việt 48kHz chuẩn studio",
    "Bóc tách DNA & clone phong cách chính xác",
    "Đồng bộ phụ đề highlight theo mili-giây",
  ],
  ctaText = "BẮT ĐẦU SẢN XUẤT NGAY",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Card Shell Base Pop (0 - 15f)
  const shellSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });

  // Phase 2: Title & Badge Reveal (15 - 32f)
  const titleSpring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.8 },
  });

  // Phase 3: Metric Strikethrough & Transformation (36 - 65f)
  const metricIntro = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.85 },
  });

  // Strikethrough line draws across original value (48f - 56f)
  const strikeProgress = interpolate(frame, [46, 56], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // New value pops out aggressively (54f+)
  const newValueSpring = spring({
    frame: Math.max(0, frame - 52),
    fps,
    config: { damping: 12, stiffness: 170, mass: 0.75 },
  });

  // Phase 4: Feature checklist sweep (70 - 110f)
  // Phase 5: CTA Fill (112 - 135f)
  const ctaFill = interpolate(frame, [110, 132], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Subtle continuous push-in zoom throughout the shot
  const slowZoom = interpolate(frame, [0, 160], [0.96, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090d16",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          transform: "translateY(-80px)",
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow Label (Mobile Safe Zone top: 260px) */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 56,
          right: 56,
          textAlign: "center",
          opacity: shellSpring,
          transform: `translateY(${(1 - shellSpring) * -15}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 22px",
            borderRadius: 999,
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60a5fa",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* Main Assembled Hero Card (Centered, 9:16 layout) */}
      <div
        style={{
          position: "relative",
          width: 820,
          borderRadius: 36,
          backgroundColor: "rgba(17, 24, 39, 0.94)",
          border: "2px solid rgba(59, 130, 246, 0.35)",
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(59,130,246,0.2)",
          backdropFilter: "blur(24px)",
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          transform: `scale(${slowZoom * shellSpring})`,
          opacity: shellSpring,
        }}
      >
        {/* Card Header: Title + Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: titleSpring,
            transform: `translateY(${(1 - titleSpring) * 15}px)`,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 44,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            {title}
          </h3>
          <span
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              color: "#34d399",
              fontSize: 18,
              fontWeight: 800,
              padding: "6px 16px",
              borderRadius: 999,
              letterSpacing: "1px",
            }}
          >
            {badge}
          </span>
        </div>

        {/* Metric Transformation Block */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 24,
            padding: "28px 32px",
            opacity: metricIntro,
            transform: `translateY(${(1 - metricIntro) * 20}px)`,
          }}
        >
          {/* Original Struck-Through Value */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <span
                style={{
                  color: "#64748b",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "-0.5px",
                }}
              >
                {originalValue}
              </span>
              {/* Red strike line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "55%",
                  width: `${strikeProgress}%`,
                  height: 3,
                  backgroundColor: "#ef4444",
                  boxShadow: "0 0 8px #ef4444",
                }}
              />
            </div>
            {strikeProgress >= 100 && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: 18,
                  fontWeight: 800,
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  padding: "2px 10px",
                  borderRadius: 6,
                }}
              >
                CŨ
              </span>
            )}
          </div>

          {/* New Kinetic Value */}
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              transform: `scale(${newValueSpring})`,
              transformOrigin: "left center",
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: "#38bdf8",
                letterSpacing: "-2px",
                lineHeight: 1.1,
              }}
            >
              {newValue}
            </div>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 500, marginTop: 8 }}>
            {valueSubtext}
          </div>
        </div>

        {/* Feature Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {features.map((feat, index) => {
            const featSpring = spring({
              frame: Math.max(0, frame - 68 - index * 10),
              fps,
              config: { damping: 16, stiffness: 130, mass: 0.8 },
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: featSpring,
                  transform: `translateX(${(1 - featSpring) * -20}px)`,
                }}
              >
                {/* Glowing Checkmark */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    border: "2px solid #3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#60a5fa",
                    fontSize: 18,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    color: "#e2e8f0",
                    fontSize: 26,
                    fontWeight: 600,
                    lineHeight: 1.35,
                  }}
                >
                  {feat}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Fill Button */}
        <div
          style={{
            position: "relative",
            height: 76,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(59, 130, 246, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {/* Left-to-right fill */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${ctaFill}%`,
              background: "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>{ctaText}</span>
            <span>➔</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
