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
  Scene2Pillar1,
  Scene3Pillar2,
  Scene4Pillar3,
  Scene5Outro,
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

  // Zero speech = zero sub (Hard constraint)
  if (!activeChunk || activeIndex === -1) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 1520,
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
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.85), 0 0 20px rgba(56, 189, 248, 0.2)",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: 34,
                fontWeight: 800,
                color: isActive ? "#FDE047" : "rgba(255, 255, 255, 0.85)",
                textShadow: isActive
                  ? "0 0 14px rgba(253, 224, 71, 0.8)"
                  : "none",
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
// MAIN COMPOSITION: GoiBaoHiem20TrVideo (1080x1920 @ 30fps, 1662 frames)
// ============================================================================
export const GoiBaoHiem20TrVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#08121f" }}>
      {/* 1. Global Visual Backdrop */}
      <GlobalBackdrop />

      {/* 2. Audio Narration Track */}
      <Audio src={staticFile("audio/goi-bao-hiem-20tr/narration.mp3")} />

      {/* 3. Scene Sequences (Direct Millisecond Audio Cuts) */}
      {/* Scene 1: Hook & Bài toán 20 triệu (0 -> 324 frames) */}
      <Sequence durationInFrames={324}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Trụ cột 1 — Sinh mạng 1 Tỷ (324 -> 650 frames) */}
      <Sequence from={324} durationInFrames={326}>
        <Scene2Pillar1 />
      </Sequence>

      {/* Scene 3: Trụ cột 2 — Bệnh hiểm nghèo 500Tr (650 -> 996 frames) */}
      <Sequence from={650} durationInFrames={346}>
        <Scene3Pillar2 />
      </Sequence>

      {/* Scene 4: Trụ cột 3 — Thẻ sức khỏe 250Tr/năm (996 -> 1319 frames) */}
      <Sequence from={996} durationInFrames={323}>
        <Scene4Pillar3 />
      </Sequence>

      {/* Scene 5: Tổng kết & Outro CTA Tiến Dương (1319 -> 1662 frames) */}
      <Sequence from={1319} durationInFrames={343}>
        <Scene5Outro />
      </Sequence>

      {/* 4. Speech-Synced Subtitles Bar (Mobile Safe Zone Y: 1520) */}
      <SpeechSyncedSubtitles />
    </AbsoluteFill>
  );
};
