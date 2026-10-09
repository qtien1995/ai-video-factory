import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import React from "react";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#0f172a", // Dim hospital color
      justifyContent: "center", 
      alignItems: "center",
      boxShadow: "inset 0 0 150px rgba(0,0,0,0.9)", // Vignette
      opacity
    }}>
      <h2 style={{
        fontSize: 50,
        color: "#94a3b8",
        marginBottom: 20
      }}>
        Nơi duy nhất xếp hàng quanh năm:
      </h2>
      <h1 style={{
        fontSize: 100,
        fontWeight: "bold",
        color: "#f1f5f9"
      }}>
        BỆNH VIỆN
      </h1>
    </AbsoluteFill>
  );
};
