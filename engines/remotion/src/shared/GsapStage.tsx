import React, { useRef, useLayoutEffect } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { gsap } from "gsap";

export interface GsapContextPayload {
  /** The paused GSAP timeline synced deterministically to Remotion's frame clock */
  tl: gsap.core.Timeline;
  /** Scoped container DOM reference */
  container: HTMLDivElement;
  /** Video frames per second */
  fps: number;
  /** Total duration of current sequence or composition in frames */
  durationInFrames: number;
  /** Total duration in seconds (durationInFrames / fps) */
  durationInSeconds: number;
}

export interface UseGsapTimelineOptions {
  /**
   * If true, timeline progress is normalized from 0 to 1 across sequence duration.
   * If false (default), timeline is driven by exact seconds (frame / fps).
   */
  useProgress?: boolean;
}

/**
 * useGsapTimeline
 * Bridges GSAP Timelines with Remotion's frame clock with 100% determinism.
 * Uses gsap.context() to automatically scope all selectors to containerRef
 * and prevents memory leaks / duplicate tweens during Remotion renders.
 */
export function useGsapTimeline(
  buildTimeline: (payload: GsapContextPayload) => void,
  deps: React.DependencyList = [],
  options: UseGsapTimelineOptions = {}
): React.RefObject<HTMLDivElement | null> {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize GSAP Context and build Timeline
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Create paused timeline so GSAP internal ticker does not advance it
      const tl = gsap.timeline({
        paused: true,
        autoRemoveChildren: false,
      });
      timelineRef.current = tl;

      buildTimeline({
        tl,
        container: el,
        fps,
        durationInFrames,
        durationInSeconds: durationInFrames / Math.max(1, fps),
      });

      // Initial seek to current frame
      const initialTime = options.useProgress
        ? (frame / Math.max(1, durationInFrames - 1)) * (tl.duration() || 1)
        : frame / fps;
      tl.seek(initialTime, false);
    }, el);

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fps, durationInFrames, options.useProgress, ...deps]);

  // Synchronously seek timeline to current frame before browser paint
  useLayoutEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    const targetTime = options.useProgress
      ? (frame / Math.max(1, durationInFrames - 1)) * (tl.duration() || 1)
      : frame / fps;

    tl.seek(targetTime, false);
  }, [frame, fps, durationInFrames, options.useProgress]);

  return containerRef;
}

export interface GsapStageProps {
  /** Function to construct the GSAP timeline using scoped element selectors */
  buildTimeline: (payload: GsapContextPayload) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  useProgress?: boolean;
}

/**
 * GsapStage
 * High-performance stage component combining Remotion's frame control
 * with GSAP's choreographic power (timelines, staggers, morphs).
 */
export const GsapStage: React.FC<GsapStageProps> = ({
  buildTimeline,
  children,
  style,
  className,
  useProgress = false,
}) => {
  const containerRef = useGsapTimeline(buildTimeline, [buildTimeline], { useProgress });

  return (
    <AbsoluteFill
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export interface KineticTextProps {
  text: string;
  splitBy?: "words" | "chars";
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  style?: React.CSSProperties;
  wordStyle?: React.CSSProperties;
  charStyle?: React.CSSProperties;
}

/**
 * KineticText
 * Clean text splitting primitive optimized for Vietnamese typography.
 * Generates span tokens with targetable class names for GSAP stagger animations.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  splitBy = "words",
  className = "",
  wordClassName = "gsap-word",
  charClassName = "gsap-char",
  style = {},
  wordStyle = {},
  charStyle = {},
}) => {
  if (splitBy === "chars") {
    const words = text.split(" ");
    return (
      <span className={className} style={{ display: "inline-block", ...style }}>
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            className={`${wordClassName} inline-block`}
            style={{ display: "inline-block", whiteSpace: "nowrap", ...wordStyle }}
          >
            {Array.from(word).map((char, cIdx) => (
              <span
                key={cIdx}
                className={`${charClassName} inline-block`}
                style={{ display: "inline-block", ...charStyle }}
              >
                {char}
              </span>
            ))}
            {wIdx < words.length - 1 && <span style={{ display: "inline-block" }}>&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  }

  // Split by words
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`${wordClassName} inline-block`}
          style={{ display: "inline-block", ...wordStyle }}
        >
          {word}
          {idx < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  );
};
