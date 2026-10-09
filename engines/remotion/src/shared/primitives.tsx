import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MOBILE_COLORS, MOBILE_TYPOGRAPHY } from "./design-system";

/**
 * MetricCounter: Counts up from `from` to `to` with prefix/suffix.
 */
export const MetricCounter: React.FC<{
  from?: number;
  to: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}> = ({
  from = 0,
  to,
  durationFrames = 30,
  prefix = "",
  suffix = "",
  decimals = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const current = from + (to - from) * progress;
  const formatted = current.toFixed(decimals);

  return (
    <span
      style={{
        fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
        fontSize: 48,
        fontWeight: 900,
        color: MOBILE_COLORS.gold,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/**
 * usePhysicsVibration: Generates sinusoidal vibration / wobble for tension & impact beats.
 */
export function usePhysicsVibration(
  startFrame: number = 0,
  intensity: number = 6,
  speed: number = 0.5
) {
  const frame = useCurrentFrame();
  if (frame < startFrame) return 0;
  return Math.sin((frame - startFrame) * speed) * intensity;
}

/**
 * useSpringScale: Smooth entrance scaling using Remotion spring physics.
 */
export function useSpringScale(delay: number = 0, damping: number = 12) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping },
  });
}

/**
 * HighlightBadge: Hero label / tag for categories, metrics, alerts.
 */
export const HighlightBadge: React.FC<{
  label: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}> = ({
  label,
  color = MOBILE_COLORS.gold,
  bgColor = "rgba(234, 179, 8, 0.15)",
  borderColor = MOBILE_COLORS.goldBorder,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 18px",
        borderRadius: 9999,
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        color,
        fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  );
};
