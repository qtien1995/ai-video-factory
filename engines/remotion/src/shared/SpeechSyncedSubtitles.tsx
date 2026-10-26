import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

export interface SubtitleWord {
  word: string;
  startMs: number;
  durationMs?: number;
  endMs?: number;
}

export interface SpeechSyncedSubtitlesProps {
  words: SubtitleWord[];
  fps?: number;
  positionY?: number;
  chunkSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  glow?: boolean;
}

/**
 * SpeechSyncedSubtitles — AI Video Factory V3
 *
 * Implements Hard Constraint 4:
 * 1. Speech-Synced: Highlights only the currently spoken word in active color.
 * 2. Zero Layout Shifts: Never changes scale(1.15) or font weight/size to avoid jumpy lines.
 * 3. Zero Speech = Zero Sub: Returns null when silence (activeIndex === -1).
 * 4. Mobile Safe Zone: Default position Y: 1530 (within mobile vertical safe zone).
 */
export const SpeechSyncedSubtitles: React.FC<SpeechSyncedSubtitlesProps> = ({
  words = [],
  fps = 30,
  positionY = 1530,
  chunkSize = 6,
  activeColor = "#D4AF37",
  inactiveColor = "rgba(255, 255, 255, 0.85)",
  backgroundColor = "rgba(11, 14, 20, 0.95)",
  borderColor = "rgba(212, 175, 55, 0.4)",
  fontFamily = "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
  fontSize = 34,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const currentMs = (frame / fps) * 1000;

  // Normalized words with calculated endMs
  const normalizedWords = useMemo(() => {
    return (words || []).map((w) => ({
      ...w,
      endMs: w.endMs ?? (w.startMs + (w.durationMs || 300)),
    }));
  }, [words]);

  // Find active word index directly from currentMs
  const activeIndex = normalizedWords.findIndex(
    (w) => currentMs >= w.startMs && currentMs < (w.endMs ?? (w.startMs + 300))
  );

  // Zero speech = zero sub (Hard constraint)
  if (activeIndex === -1 || normalizedWords.length === 0) return null;

  const chunkIndex = Math.floor(activeIndex / chunkSize);
  const chunkStartIdx = chunkIndex * chunkSize;
  const chunkEndIdx = Math.min(chunkStartIdx + chunkSize, normalizedWords.length);
  const chunkWords = normalizedWords.slice(chunkStartIdx, chunkEndIdx);

  return (
    <div
      style={{
        position: "absolute",
        top: positionY,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 90,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: 20,
          padding: "14px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
          boxShadow: `0 10px 30px rgba(0,0,0,0.85)${
            glow ? `, 0 0 25px ${borderColor}` : ""
          }`,
          maxWidth: 960,
          backdropFilter: "blur(12px)",
        }}
      >
        {chunkWords.map((w, i) => {
          const globalIdx = chunkStartIdx + i;
          const isActive = globalIdx === activeIndex;

          return (
            <span
              key={globalIdx}
              style={{
                fontFamily,
                fontSize,
                fontWeight: 800,
                color: isActive ? activeColor : inactiveColor,
                textShadow:
                  isActive && glow
                    ? `0 0 16px ${activeColor}, 0 2px 8px rgba(0,0,0,0.9)`
                    : "0 2px 6px rgba(0,0,0,0.8)",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
