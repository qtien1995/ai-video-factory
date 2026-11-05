import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HandDrawnProps {
  delay?: number;
  durationFrames?: number;
  color?: string;
  strokeWidth?: number;
  boil?: boolean;
  style?: React.CSSProperties;
}

/**
 * Organic jitter/boil generator based on frame
 */
function useHandDrawnJitter(frame: number, active: boolean, amp: number = 1.2) {
  if (!active) return { x: 0, y: 0, rot: 0 };
  const step = Math.floor(frame / 3);
  const x = Math.sin(step * 3.7 + 1.2) * amp;
  const y = Math.cos(step * 2.9 + 2.4) * amp;
  const rot = Math.sin(step * 1.5) * (amp * 0.4);
  return { x, y, rot };
}

/**
 * HandDrawnCircle: Organic hand-drawn circle/oval enclosing a word, number, or area.
 */
export const HandDrawnCircle: React.FC<
  HandDrawnProps & {
    width?: number;
    height?: number;
    children?: React.ReactNode;
  }
> = ({
  delay = 0,
  durationFrames = 22,
  color = "#EAB308", // Golden yellow
  strokeWidth = 4,
  boil = true,
  width = 240,
  height = 90,
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 14, stiffness: 120 },
  });

  const jitter = useHandDrawnJitter(frame, boil, 1.2);

  // SVG path approximation of a double-overlap hand drawn oval
  const d = `M 20,${height / 2 + 5} 
             C 18,${height * 0.15} ${width * 0.35},10 ${width * 0.7},12 
             C ${width * 0.95},14 ${width - 5},${height * 0.25} ${width - 8},${height / 2} 
             C ${width - 12},${height * 0.85} ${width * 0.75},${height - 6} ${width / 2},${height - 8} 
             C ${width * 0.2},${height - 10} 10,${height * 0.8} 14,${height / 2 - 6} 
             C 16,${height * 0.3} ${width * 0.4},14 ${width * 0.65},16`;

  const totalLength = (width + height) * 2.2;
  const strokeDashoffset = interpolate(progress, [0, 1], [totalLength, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${jitter.x}px, ${jitter.y}px) rotate(${jitter.rot}deg)`,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
};

/**
 * HandDrawnUnderline: Organic wavy underline stroke under text.
 */
export const HandDrawnUnderline: React.FC<
  HandDrawnProps & {
    width?: number;
  }
> = ({
  delay = 0,
  durationFrames = 18,
  color = "#EAB308",
  strokeWidth = 5,
  boil = true,
  width = 280,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 12, stiffness: 140 },
  });

  const jitter = useHandDrawnJitter(frame, boil, 0.8);

  // Wavy stroke
  const h = 24;
  const d = `M 4,${h * 0.4} 
             Q ${width * 0.25},${h * 0.85} ${width * 0.5},${h * 0.35} 
             T ${width - 6},${h * 0.5}`;

  const totalLength = width * 1.2;
  const strokeDashoffset = interpolate(progress, [0, 1], [totalLength, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height: h,
        ...style,
      }}
    >
      <svg
        width={width}
        height={h}
        viewBox={`0 0 ${width} ${h}`}
        style={{
          transform: `translate(${jitter.x}px, ${jitter.y}px)`,
          overflow: "visible",
        }}
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
};

/**
 * HandDrawnHighlight: Semitransparent marker highlighter sweep behind keywords.
 */
export const HandDrawnHighlight: React.FC<
  HandDrawnProps & {
    children?: React.ReactNode;
    color?: string;
  }
> = ({
  delay = 0,
  durationFrames = 16,
  color = "rgba(234, 179, 8, 0.35)", // Highlight yellow
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 15, stiffness: 150 },
  });

  const widthScale = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        padding: "0 6px",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          width: "100%",
          height: "75%",
          backgroundColor: color,
          borderRadius: 4,
          transformOrigin: "left center",
          transform: `scaleX(${widthScale}) skewX(-4deg)`,
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
};

/**
 * HandDrawnArrow: Expressive curved arrow pointing towards a metric or callout.
 */
export const HandDrawnArrow: React.FC<
  HandDrawnProps & {
    width?: number;
    height?: number;
    direction?: "down-left" | "down-right" | "up-right";
  }
> = ({
  delay = 0,
  color = "#EAB308",
  strokeWidth = 4,
  boil = true,
  width = 120,
  height = 90,
  direction = "down-left",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 14, stiffness: 120 },
  });

  const jitter = useHandDrawnJitter(frame, boil, 1.0);

  // Curve and head
  const isRight = direction === "down-right";
  const path = isRight
    ? `M 15,15 Q ${width * 0.65},10 ${width - 20},${height - 25} M ${width - 38},${height - 35} L ${width - 20},${height - 25} L ${width - 30},${height - 50}`
    : `M ${width - 15},15 Q ${width * 0.35},10 20,${height - 25} M 38,${height - 35} L 20,${height - 25} L 30,${height - 50}`;

  const totalLength = width * 1.5;
  const strokeDashoffset = interpolate(progress, [0, 1], [totalLength, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          transform: `translate(${jitter.x}px, ${jitter.y}px)`,
          overflow: "visible",
        }}
      >
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
};
