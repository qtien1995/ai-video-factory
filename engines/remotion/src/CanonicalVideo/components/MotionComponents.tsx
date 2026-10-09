import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ opacity, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</div>;
};

export const Flow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const translateY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });
  return <div style={{ transform: `translateY(${translateY}px)`, opacity: frame > 0 ? 1 : 0 }}>{children}</div>;
};

export const ProgressiveBuild: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ fps, frame, config: { damping: 12 } });
  return <div style={{ transform: `scale(${scale})` }}>{children}</div>;
};

export const Drain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Simulating drain by scaling down slightly and reducing opacity
  const scale = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 12 }, reverse: true });
  return <div style={{ transform: `scale(${frame < 30 ? 1 : scale})` }}>{children}</div>;
};

export const Interrupt: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  // Simulating an interrupt by a sharp shake
  const shake = interpolate(frame, [0, 5, 10, 15, 20], [0, -20, 20, -10, 0], { extrapolateRight: "clamp" });
  return <div style={{ transform: `translateX(${shake}px)` }}>{children}</div>;
};
