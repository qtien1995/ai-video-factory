import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  GlobalBackdrop,
  Scene1Hook,
  Scene2Problem,
  Scene3TheFlaw,
  Scene4Impact,
  Scene5Solution,
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
          backgroundColor: "rgba(11, 16, 29, 0.95)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          borderRadius: 20,
          padding: "14px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(56, 189, 248, 0.2)",
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
                color: isActive ? "#FDE047" : "rgba(255, 255, 255, 0.8)",
                textShadow: isActive ? "0 0 14px rgba(253, 224, 71, 0.8)" : "none",
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
export const DuBaoUngThuNuVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B101D" }}>
      {/* 1. Global Tactical Editorial Backdrop */}
      <GlobalBackdrop />

      {/* 2. Scenes according to precise audio splits */}
      <Sequence durationInFrames={330} name="Scene 1: Hook">
        <Scene1Hook />
      </Sequence>
      <Sequence from={330} durationInFrames={356} name="Scene 2: Problem">
        <Scene2Problem />
      </Sequence>
      <Sequence from={686} durationInFrames={277} name="Scene 3: The Flaw">
        <Scene3TheFlaw />
      </Sequence>
      <Sequence from={963} durationInFrames={142} name="Scene 4: Impact">
        <Scene4Impact />
      </Sequence>
      <Sequence from={1105} durationInFrames={401} name="Scene 5: Solution">
        <Scene5Solution />
      </Sequence>
      <Sequence from={1506} durationInFrames={438} name="Scene 6: Outro">
        <Scene6Outro />
      </Sequence>

      {/* 3. Speech-synced subtitles bar */}
      <SpeechSyncedSubtitles />

      {/* 4. Audio Narration */}
      <Audio src={staticFile("audio/du-bao-ung-thu-nu-2050/narration.mp3")} />
    </AbsoluteFill>
  );
};
