import React, { useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  GlobalBackdrop,
  Scene1Hook,
  Scene2Problem,
  Scene3Solution,
  Scene4Workflow,
  Scene5Benefits,
  Scene6Outro,
} from "./Scenes";
import subtitlesData from "./subtitles.json";

interface SubtitleWord {
  word: string;
  startMs: number;
  endMs: number;
  durationMs: number;
}

// ============================================================================
// SPEECH-SYNCED SUBTITLES BAR (Mobile Safe Zone Y: 1530)
// ============================================================================
const SpeechSyncedSubtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  const words = (subtitlesData.words || []) as SubtitleWord[];

  // Find active word
  const activeIndex = words.findIndex(
    (w) => currentMs >= w.startMs && currentMs < w.endMs
  );

  // Group into display chunks of 6 words
  const activeChunk = useMemo(() => {
    if (activeIndex === -1) return null;
    const chunkIndex = Math.floor(activeIndex / 6);
    const start = chunkIndex * 6;
    const end = Math.min(start + 6, words.length);
    return {
      words: words.slice(start, end),
      chunkStartIdx: start,
    };
  }, [activeIndex, words]);

  // Zero speech = zero sub
  if (!activeChunk || activeIndex === -1) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1530,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 14, 20, 0.95)",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "14px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.2)",
          maxWidth: 960,
        }}
      >
        {activeChunk.words.map((w, i) => {
          const globalIdx = activeChunk.chunkStartIdx + i;
          const isActive = globalIdx === activeIndex;

          return (
            <span
              key={globalIdx}
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 34,
                fontWeight: 800,
                color: isActive ? "#D4AF37" : "rgba(255, 255, 255, 0.8)",
                textShadow: isActive ? "0 0 14px rgba(212, 175, 55, 0.8)" : "none",
                transition: "color 0.1s ease",
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

// ============================================================================
// MAIN COMPOSITION
// ============================================================================
export const BaoHiemGiuGonVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Ensure fonts load properly before rendering
  const [fontHandle] = useState(() => delayRender("Wait for Vietnamese fonts to load"));
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => continueRender(fontHandle))
        .catch(() => continueRender(fontHandle));
    } else {
      continueRender(fontHandle);
    }
  }, [fontHandle]);

  // SCENE TIMING FROM REAL CIT VOICE STUDIO HẢI ĐĂNG (2100 frames = 70.0s @ 30fps)
  // Scene 1: 0 - 255 (0.0s - 8.5s)
  // Scene 2: 255 - 480 (8.5s - 16.0s)
  // Scene 3: 480 - 985 (16.0s - 32.8s)
  // Scene 4: 985 - 1545 (32.8s - 51.5s)
  // Scene 5: 1545 - 1885 (51.5s - 62.8s)
  // Scene 6: 1885 - 2100 (62.8s - 70.0s)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#06090F",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 0. Studio Audio Track */}
      <Audio src={staticFile("audio/bao-hiem-giu-gon/narration.mp3")} />

      {/* 1. Global Ambient Backdrop */}
      <GlobalBackdrop />

      {/* 2. SCENE 1: HOOK */}
      {frame >= 0 && frame < 255 && (
        <Scene1Hook progress={interpolate(frame, [0, 255], [0, 1], { extrapolateRight: "clamp" })} />
      )}

      {/* 3. SCENE 2: PROBLEM */}
      {frame >= 255 && frame < 480 && (
        <Scene2Problem progress={interpolate(frame, [255, 480], [0, 1], { extrapolateRight: "clamp" })} />
      )}

      {/* 4. SCENE 3: SOLUTION */}
      {frame >= 480 && frame < 985 && (
        <Scene3Solution progress={interpolate(frame, [480, 985], [0, 1], { extrapolateRight: "clamp" })} />
      )}

      {/* 5. SCENE 4: WORKFLOW */}
      {frame >= 985 && frame < 1545 && (
        <Scene4Workflow progress={interpolate(frame, [985, 1545], [0, 1], { extrapolateRight: "clamp" })} />
      )}

      {/* 6. SCENE 5: BENEFITS */}
      {frame >= 1545 && frame < 1885 && (
        <Scene5Benefits progress={interpolate(frame, [1545, 1885], [0, 1], { extrapolateRight: "clamp" })} />
      )}

      {/* 7. SCENE 6: OUTRO */}
      {frame >= 1885 && (
        <Scene6Outro progress={interpolate(frame, [1885, 2100], [0, 1], { extrapolateRight: "clamp" })} />
      )}

      {/* 8. Speech-Synced Subtitles */}
      <SpeechSyncedSubtitles />
    </AbsoluteFill>
  );
};
