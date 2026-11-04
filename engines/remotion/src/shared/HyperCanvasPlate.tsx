import React, { useRef, useEffect } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Video, staticFile } from "remotion";

export interface HyperCanvasDrawContext {
  ctx: CanvasRenderingContext2D;
  frame: number;
  progress: number; // 0..1 in current scene
  fps: number;
  width: number;
  height: number;
}

export interface HyperCanvasPlateProps {
  /**
   * Procedural render function executing every frame.
   * Mirrors HTML5 Canvas 2D graphics workflows.
   */
  draw: (context: HyperCanvasDrawContext) => void;
  /** Optional background color or transparent */
  backgroundColor?: string;
  style?: React.CSSProperties;
}

/**
 * HyperCanvasPlate
 * Bridges HTML5 / CSS Canvas 2D procedural rendering natively inside Remotion compositions.
 * Runs deterministic frame-by-frame with zero external render overhead.
 */
export const HyperCanvasPlate: React.FC<HyperCanvasPlateProps> = ({
  draw,
  backgroundColor = "transparent",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const progress = durationInFrames > 0 ? Math.min(1, Math.max(0, frame / durationInFrames)) : 0;

    ctx.save();
    if (backgroundColor && backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    try {
      draw({ ctx, frame, progress, fps, width, height });
    } catch (err) {
      console.error("[HyperCanvasPlate] Draw error at frame", frame, err);
    }
    ctx.restore();
  }, [draw, frame, fps, width, height, durationInFrames, backgroundColor]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", ...style }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </AbsoluteFill>
  );
};

export interface HyperPlateVideoProps {
  /** Path to the rendered HyperFrames plate (relative to public/ or project assets) */
  src: string;
  /** Opacity multiplier (0..1) */
  opacity?: number;
  style?: React.CSSProperties;
}

/**
 * HyperPlateVideo
 * Imports a rendered HyperFrames WebM (alpha transparent) or MP4 plate into Remotion as an overlay track.
 */
export const HyperPlateVideo: React.FC<HyperPlateVideoProps> = ({
  src,
  opacity = 1,
  style,
}) => {
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none", ...style }}>
      <Video
        src={src.startsWith("http") || src.startsWith("blob:") ? src : staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          // eslint-disable-next-line @remotion/no-object-fit-on-media-video
          objectFit: "cover",
        }}
        muted
      />
    </AbsoluteFill>
  );
};
