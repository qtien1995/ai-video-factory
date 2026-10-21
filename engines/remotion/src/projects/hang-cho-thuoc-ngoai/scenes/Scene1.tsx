import { AbsoluteFill, useCurrentFrame } from "remotion";
import React from "react";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  // Fast cuts between 3 states
  // State 1: 0 - 100
  // State 2: 100 - 200
  // State 3: 200 - 300
  
  const step = Math.floor(frame / 100);
  const texts = [
    "Xếp hàng mua vàng",
    "Xếp hàng iPhone",
    "(Chỉ được vài ngày)"
  ];
  const bgColors = ["#b45309", "#0284c7", "#475569"];

  return (
    <AbsoluteFill style={{ 
      backgroundColor: bgColors[step] || "#000",
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <h1 style={{
        fontSize: 80,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#fff",
        textShadow: "0px 4px 20px rgba(0,0,0,0.5)"
      }}>
        {texts[step]}
      </h1>
    </AbsoluteFill>
  );
};
