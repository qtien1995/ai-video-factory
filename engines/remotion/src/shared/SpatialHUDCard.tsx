import React from "react";
import { interpolate } from "remotion";

export interface SpatialHUDCardProps {
  children: React.ReactNode;
  frame: number;
  springVal?: number;
  staggerIndex?: number;
  accentColor?: string;
  borderColor?: string;
  background?: string;
  style?: React.CSSProperties;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

/**
 * 2.5D Spatial HUD Card Component
 * Combines 3D perspective, dynamic spatial rotations, floating physics,
 * multi-layer glassmorphism, glowing corner brackets, and animated laser scanlines.
 */
export const SpatialHUDCard: React.FC<SpatialHUDCardProps> = ({
  children,
  frame,
  springVal = 1,
  staggerIndex = 0,
  accentColor = "#38BDF8",
  borderColor,
  background,
  style = {},
  enableScanline = true,
  enableBrackets = true,
}) => {
  // 3D Entry Spatial Transformations
  const rotX = interpolate(springVal, [0, 1], [16, 0]);
  const rotY = interpolate(
    springVal,
    [0, 1],
    [staggerIndex % 2 === 0 ? -12 : 12, 0]
  );
  const transZ = interpolate(springVal, [0, 1], [-80, 0]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Subtle continuous floating physics in 3D space
  const floatY = Math.sin((frame + staggerIndex * 14) * 0.08) * 5;
  const floatRotX = Math.sin((frame + staggerIndex * 18) * 0.06) * 1.2;
  const floatRotY = Math.cos((frame + staggerIndex * 16) * 0.05) * 1.0;

  // Scanline animation across card
  const scanX = -120 + ((frame * 3 + staggerIndex * 35) % 360);

  const finalBorder = borderColor || `1.5px solid ${accentColor}55`;
  const finalBg =
    background ||
    "linear-gradient(135deg, rgba(15, 23, 42, 0.82) 0%, rgba(6, 10, 20, 0.94) 100%)";

  return (
    <div
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          background: finalBg,
          border: finalBorder,
          borderRadius: 24,
          padding: "24px 28px",
          backdropFilter: "blur(16px)",
          boxShadow: `0 20px 45px rgba(0, 0, 0, 0.65), 0 0 25px ${accentColor}25, inset 0 0 18px ${accentColor}12`,
          opacity,
          transform: `perspective(1200px) translateZ(${transZ}px) translateY(${floatY}px) rotateX(${rotX + floatRotX}deg) rotateY(${rotY + floatRotY}deg)`,
          transformOrigin: "center center",
          overflow: "hidden",
          transition: "transform 0.05s ease-out",
          ...style,
        }}
      >
        {/* Sci-Fi Corner Brackets [ ] */}
        {enableBrackets && (
          <>
            {/* Top-Left Bracket */}
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 14,
                height: 14,
                borderTop: `2px solid ${accentColor}`,
                borderLeft: `2px solid ${accentColor}`,
                borderRadius: "4px 0 0 0",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            {/* Top-Right Bracket */}
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 14,
                height: 14,
                borderTop: `2px solid ${accentColor}`,
                borderRight: `2px solid ${accentColor}`,
                borderRadius: "0 4px 0 0",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            {/* Bottom-Left Bracket */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                width: 14,
                height: 14,
                borderBottom: `2px solid ${accentColor}`,
                borderLeft: `2px solid ${accentColor}`,
                borderRadius: "0 0 0 4px",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            {/* Bottom-Right Bracket */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 14,
                height: 14,
                borderBottom: `2px solid ${accentColor}`,
                borderRight: `2px solid ${accentColor}`,
                borderRadius: "0 0 4px 0",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
          </>
        )}

        {/* Laser Sweep Scanline */}
        {enableScanline && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "35%",
              background: `linear-gradient(90deg, transparent, ${accentColor}18, transparent)`,
              transform: `translateX(${scanX}%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Card Content */}
        {children}
      </div>
    </div>
  );
};
