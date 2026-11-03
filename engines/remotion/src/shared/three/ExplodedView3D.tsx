import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export interface ExplodedLayer {
  id: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  zOffset: number;
}

export interface ExplodedView3DProps {
  headline?: string;
  subheadline?: string;
  layers?: ExplodedLayer[];
  durationInFrames?: number;
}

const DEFAULT_LAYERS: ExplodedLayer[] = [
  {
    id: "layer-01",
    title: "Open Banking Sync",
    description: "Bảo mật tài khoản 256-bit AES chuẩn ngân hàng",
    badge: "TẦNG 01",
    color: "#3b82f6",
    zOffset: 60,
  },
  {
    id: "layer-02",
    title: "Lưới Lọc Chi Tiêu Rác",
    description: "AI phát hiện và cắt bỏ 100% chi phí thừa thãi",
    badge: "TẦNG 02",
    color: "#06b6d4",
    zOffset: 120,
  },
  {
    id: "layer-03",
    title: "Quỹ Dự Phòng 6 Tháng",
    description: "Lãi suất thanh khoản cao tự sinh lời mỗi ngày",
    badge: "TẦNG 03",
    color: "#10b981",
    zOffset: 180,
  },
  {
    id: "layer-04",
    title: "Danh Mục Đầu Tư Thụ Động",
    description: "Tự động tái cân bằng đa tài sản theo mục tiêu",
    badge: "TẦNG 04",
    color: "#f59e0b",
    zOffset: 240,
  },
];

export const ExplodedView3D: React.FC<ExplodedView3DProps> = ({
  headline = "HỆ SINH THÁI FINCOPILOT",
  subheadline = "Bóc tách 4 tầng xử lý dòng tiền thông minh",
  layers = DEFAULT_LAYERS,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Intro spring (0 - 20f)
  const introProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.9 },
  });

  // Mild 3D tilt during initial exploration
  const rotateX = interpolate(frame, [0, 80, 160], [16, 22, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotateY = interpolate(frame, [0, 80, 160], [-5, 4, -2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3D-to-2D Settle Transition:
  // Starts settling at frame 155, fully flat 2D by frame 200, then locks in as a pristine flat poster
  const settleProgress = interpolate(frame, [155, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0.2, 1),
  });

  const activeRotateX = interpolate(settleProgress, [0, 1], [rotateX, 0]);
  const activeRotateY = interpolate(settleProgress, [0, 1], [rotateY, 0]);
  const activeScale = interpolate(settleProgress, [0, 1], [0.96 * introProgress, 0.98 * introProgress]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090d16",
        perspective: 1600,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(16,185,129,0.08) 45%, transparent 70%)",
          transform: "translateY(-60px)",
          pointerEvents: "none",
        }}
      />

      {/* Header Eyebrow (Mobile Safe Zone top: 250px) */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 56,
          right: 56,
          textAlign: "center",
          opacity: introProgress,
          transform: `translateY(${(1 - introProgress) * -20}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60a5fa",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          3D SPATIAL ANATOMY
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: 52,
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
          {subheadline}
        </p>
      </div>

      {/* 3D Multiplane Card Stack (Each card is distinct and NEVER overlaps) */}
      <div
        style={{
          position: "relative",
          width: 880,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          transformStyle: "preserve-3d",
          transform: `scale(${activeScale}) rotateX(${activeRotateX}deg) rotateY(${activeRotateY}deg) translateY(40px)`,
          zIndex: 10,
        }}
      >
        {/* Background Grounding Board (Deep Blueprint Plate) */}
        <div
          style={{
            position: "absolute",
            inset: -36,
            borderRadius: 36,
            backgroundColor: "rgba(11, 17, 29, 0.75)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            boxShadow:
              "0 35px 70px -15px rgba(0,0,0,0.85), inset 0 0 30px rgba(59,130,246,0.1)",
            transform: `translateZ(${interpolate(settleProgress, [0, 1], [-40, 0])}px)`,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            pointerEvents: "none",
          }}
        />

        {layers.map((layer, index) => {
          // Staggered lift animation
          const layerDelay = index * 4;
          const layerSpring = spring({
            frame: Math.max(0, frame - 18 - layerDelay),
            fps,
            config: { damping: 16, stiffness: 120, mass: 0.8 },
          });

          // In 3D phase: Lift in Z and alternate shiftX. In Settle phase: return to 0 (flat 2D)
          const targetZ = 35 + index * 25;
          const currentZ = interpolate(
            settleProgress,
            [0, 1],
            [interpolate(layerSpring, [0, 1], [0, targetZ]), 0]
          );
          const targetShiftX = index % 2 === 0 ? -10 : 10;
          const shiftX = interpolate(
            settleProgress,
            [0, 1],
            [interpolate(layerSpring, [0, 1], [0, targetShiftX]), 0]
          );

          // Active focus glow based on timecode progression (before settle)
          const activeIndex = Math.min(
            layers.length - 1,
            Math.floor(
              interpolate(frame, [25, 155], [0, layers.length - 0.01], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            )
          );
          // When fully settled to 2D, all layers have a balanced, crisp look
          const isFocused = settleProgress < 0.8 ? index === activeIndex : true;

          return (
            <div
              key={layer.id}
              style={{
                position: "relative",
                width: "100%",
                borderRadius: 26,
                backgroundColor: isFocused
                  ? "rgba(17, 24, 39, 0.96)"
                  : "rgba(15, 23, 42, 0.90)",
                border: isFocused
                  ? `2px solid ${layer.color}`
                  : `1.5px solid ${layer.color}55`,
                boxShadow: isFocused
                  ? `0 25px 45px -10px rgba(0,0,0,0.7), 0 0 30px ${layer.color}44`
                  : `0 15px 30px -8px rgba(0,0,0,0.5)`,
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                padding: "26px 32px",
                gap: 22,
                transform: `translateZ(${currentZ}px) translateX(${shiftX}px)`,
                transformStyle: "preserve-3d",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Layer Number & Indicator Icon */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  backgroundColor: `${layer.color}25`,
                  border: `2px solid ${layer.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: layer.color,
                  fontSize: 24,
                  fontWeight: 900,
                  flexShrink: 0,
                  boxShadow: isFocused ? `0 0 16px ${layer.color}` : "none",
                }}
              >
                0{index + 1}
              </div>

              {/* Layer Text Content (All text 100% visible and readable) */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: 30,
                      fontWeight: 800,
                      letterSpacing: "-0.5px",
                      lineHeight: 1.25,
                    }}
                  >
                    {layer.title}
                  </div>
                  <span
                    style={{
                      backgroundColor: `${layer.color}25`,
                      border: `1px solid ${layer.color}66`,
                      color: layer.color,
                      fontSize: 16,
                      fontWeight: 800,
                      padding: "4px 12px",
                      borderRadius: 8,
                      letterSpacing: "1px",
                      flexShrink: 0,
                    }}
                  >
                    {layer.badge}
                  </span>
                </div>

                <div
                  style={{
                    color: isFocused ? "#cbd5e1" : "#94a3b8",
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.35,
                  }}
                >
                  {layer.description}
                </div>
              </div>

              {/* Pulse Indicator */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: layer.color,
                  boxShadow: `0 0 14px ${layer.color}`,
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Status Badge (Mobile Safe Zone bottom: 1540px) */}
      <div
        style={{
          position: "absolute",
          bottom: 270,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 32px",
            borderRadius: 22,
            background: "rgba(17, 24, 39, 0.92)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            backdropFilter: "blur(20px)",
            opacity: introProgress,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 12px #10b981",
            }}
          />
          <span style={{ color: "#e2e8f0", fontSize: 24, fontWeight: 700 }}>
            {settleProgress > 0.6
              ? "Tổng Quan 4 Tầng Quản Lý (Khóa Phẳng 2D)"
              : "3D Spatial Decomposition Active"}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
