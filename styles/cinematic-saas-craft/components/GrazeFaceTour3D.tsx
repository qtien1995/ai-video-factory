import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export interface TourCardItem {
  id: string;
  category: string;
  title: string;
  metric: string;
  status: "ACTIVE" | "VERIFIED" | "OPTIMIZED";
  accentColor: string;
}

export interface GrazeFaceTour3DProps {
  headline?: string;
  tagline?: string;
  items?: TourCardItem[];
}

const DEFAULT_TOUR_ITEMS: TourCardItem[] = [
  {
    id: "tour-1",
    category: "NEURAL ENGINE",
    title: "Mô hình xử lý song song",
    metric: "99.8% Precision",
    status: "OPTIMIZED",
    accentColor: "#3b82f6",
  },
  {
    id: "tour-2",
    category: "ZERO-LATENCY",
    title: "Đồng bộ âm thanh EBU R128",
    metric: "-12.5 LUFS",
    status: "VERIFIED",
    accentColor: "#06b6d4",
  },
  {
    id: "tour-3",
    category: "DNA CLONER",
    title: "Bóc tách từng mili-giây nhịp cắt",
    metric: "0 Frame Loss",
    status: "ACTIVE",
    accentColor: "#10b981",
  },
];

export const GrazeFaceTour3D: React.FC<GrazeFaceTour3DProps> = ({
  headline = "QUÉT CẬN CẢNH HỆ THỐNG",
  tagline = "Cơ chế camera lướt nghiêng 2.5D chiều sâu thực tế",
  items = DEFAULT_TOUR_ITEMS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const intro = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 1 },
  });

  // Oblique 2.5D camera angles during exploration phase
  const rotateX = interpolate(frame, [0, 90, 140], [28, 22, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotateY = interpolate(frame, [0, 90, 140], [-12, -7, -5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 140], [30, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0.3, 1),
  });

  // 3D-to-2D Settle Transition:
  // Starts settling at frame 135, fully flat 2D by frame 175, holds steady until frame 232
  const settleProgress = interpolate(frame, [135, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0.2, 1),
  });

  const activeRotateX = interpolate(settleProgress, [0, 1], [rotateX, 0]);
  const activeRotateY = interpolate(settleProgress, [0, 1], [rotateY, 0]);
  const activeTranslateY = interpolate(settleProgress, [0, 1], [translateY, 0]);
  const activeScale = interpolate(settleProgress, [0, 1], [0.92, 0.96]);

  // Rim light laser sweep (runs across cards once between 35f and 105f)
  const sheenProgress = interpolate(frame, [35, 105], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090d16",
        perspective: 1600,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 75% 35%, rgba(6, 182, 212, 0.12) 0%, transparent 65%), radial-gradient(circle at 20% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Header Eyebrow (Mobile Safe Zone top: 260px) */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 56,
          right: 56,
          textAlign: "center",
          opacity: intro,
          transform: `translateY(${(1 - intro) * -20}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 22px",
            borderRadius: 999,
            background: "rgba(6, 182, 212, 0.15)",
            border: "1px solid rgba(6, 182, 212, 0.4)",
            color: "#22d3ee",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          GRAZE FACE TOUR 2.5D
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: 54,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-1px",
            lineHeight: 1.2,
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 26,
            fontWeight: 500,
            color: "#94a3b8",
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </p>
      </div>

      {/* 3D Oblique Surface Container -> Settles to Flat 2D */}
      <div
        style={{
          position: "relative",
          width: 800,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          transformStyle: "preserve-3d",
          transform: `scale(${activeScale}) rotateX(${activeRotateX}deg) rotateY(${activeRotateY}deg) translateY(${activeTranslateY}px)`,
        }}
      >
        {items.map((item, idx) => {
          // Floating and landing mechanics:
          const landStart = 15 + idx * 16;
          const landProgress = spring({
            frame: Math.max(0, frame - landStart),
            fps,
            config: { damping: 16, stiffness: 120, mass: 0.8 },
          });

          // In 3D: elevation. In Settle: 0 (completely flat)
          const baseElevation = interpolate(landProgress, [0, 1], [120, 0]);
          const currentElevation = interpolate(settleProgress, [0, 1], [baseElevation, 0]);
          const shadowBlur = interpolate(landProgress, [0, 1], [30, 10]);
          const shadowOpacity = interpolate(landProgress, [0, 1], [0.25, 0.65]);

          return (
            <div
              key={item.id}
              style={{
                position: "relative",
                borderRadius: 28,
                backgroundColor: "rgba(17, 24, 39, 0.94)",
                border: `2px solid ${item.accentColor}66`,
                padding: "36px 40px",
                transform: `translateZ(${currentElevation}px)`,
                transformStyle: "preserve-3d",
                boxShadow: `0 ${currentElevation * 0.4 + 14}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}), 0 0 25px ${item.accentColor}20`,
                backdropFilter: "blur(20px)",
                overflow: "hidden",
              }}
            >
              {/* Laser sheen bar passing by */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 120,
                  left: `${sheenProgress}%`,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
                  transform: "skewX(-25deg)",
                  pointerEvents: "none",
                }}
              />

              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    color: item.accentColor,
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    backgroundColor: `${item.accentColor}20`,
                    border: `1px solid ${item.accentColor}66`,
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: 700,
                    padding: "4px 14px",
                    borderRadius: 999,
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.status}
                </span>
              </div>

              {/* Title & Metric */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: item.accentColor,
                    fontSize: 34,
                    fontWeight: 900,
                    letterSpacing: "-1px",
                    flexShrink: 0,
                  }}
                >
                  {item.metric}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Navigation Badge (Mobile Safe Zone bottom: 1550px) */}
      <div
        style={{
          position: "absolute",
          bottom: 370,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 32px",
            borderRadius: 22,
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            backdropFilter: "blur(20px)",
            opacity: intro,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#22d3ee",
              boxShadow: "0 0 12px #22d3ee",
            }}
          />
          <span style={{ color: "#f8fafc", fontSize: 24, fontWeight: 700 }}>
            {settleProgress > 0.6
              ? "Bảo Chứng Dữ Liệu Thực (Khóa Phẳng 2D)"
              : "Inspect & Verify Complete"}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
