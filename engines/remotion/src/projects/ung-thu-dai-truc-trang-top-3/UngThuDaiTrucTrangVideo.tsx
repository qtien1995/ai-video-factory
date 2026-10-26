import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  GlobalBackdrop,
  Scene1Hook,
  Scene2Causes,
  Scene3Symptoms,
  Scene4Solution,
  Scene5Stats,
  Scene6Outro,
} from "./Scenes";
import subtitlesData from "./subtitles.json";
import scenesData from "./scenes.json";

interface SubtitleWord {
  word: string;
  startMs: number;
  endMs: number;
  durationMs: number;
}

// Impactful keywords that trigger "Word Punching" (Feature #5)
const PUNCH_WORDS = new Set([
  "top", "3", "tử", "vong", "trẻ", "hóa", "máu", "nội", "soi",
  "90", "phần", "trăm", "45", "tuổi", "đột", "phá", "sớm", "đại", "trực", "tràng"
]);

// ============================================================================
// KINETIC SPEECH-SYNCED SUBTITLES BAR (Feature #5: Word Punching)
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
          backgroundColor: "rgba(6, 10, 20, 0.94)",
          border: "1.5px solid rgba(56, 189, 248, 0.5)",
          borderRadius: 22,
          padding: "16px 36px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.85), 0 0 25px rgba(56, 189, 248, 0.25)",
          maxWidth: 960,
        }}
      >
        {activeChunk.words.map((w, i) => {
          const globalIdx = activeChunk.chunkStartIdx + i;
          const isActive = globalIdx === activeIndex;
          const cleanWord = w.word.toLowerCase().replace(/[^a-z0-9à-ỹ]/gi, "");
          const isPunch = PUNCH_WORDS.has(cleanWord);

          return (
            <span
              key={globalIdx}
              style={{
                fontSize: 32,
                fontWeight: isActive ? 900 : 700,
                color: isActive
                  ? isPunch
                    ? "#FACC15" // Vibrant Gold for punch words
                    : "#38BDF8" // Electric Cyan for active word
                  : "rgba(248, 250, 252, 0.7)",
                transform: isActive && isPunch ? "scale(1.22)" : "scale(1)",
                display: "inline-block",
                textShadow: isActive
                  ? isPunch
                    ? "0 0 20px rgba(250, 204, 21, 0.9)"
                    : "0 0 16px rgba(56, 189, 248, 0.8)"
                  : "none",
                transition: "all 0.08s ease-out",
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
// MAIN COMPOSITION WITH CAMERA BREATHING (Feature #2) & SEAMLESS FLOW
// ============================================================================
export const UngThuDaiTrucTrangVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const scenes = scenesData.scenes;

  // Feature #2: Dynamic Camera Breathing & Subtle Parallax Drift
  const cameraScale = 1 + Math.sin(frame * 0.035) * 0.015;
  const cameraRotate = Math.sin(frame * 0.02) * 0.15; // in degrees

  return (
    <AbsoluteFill style={{ backgroundColor: "#060A14" }}>
      {/* 1. Global High-Tech Medical Backdrop with Continuous ECG Wave */}
      <GlobalBackdrop />

      {/* 2. SCENES CONTENT LAYER WITH CAMERA DRIFT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale}) rotate(${cameraRotate}deg)`,
          transformOrigin: "center center",
        }}
      >
        {/* Scene 1: Hook with Animated Colon Anatomy */}
        <Sequence
          from={scenes[0].startFrame}
          durationInFrames={scenes[0].durationFrames}
        >
          <Scene1Hook />
        </Sequence>

        {/* Scene 2: Causes & Young Age Trend */}
        <Sequence
          from={scenes[1].startFrame}
          durationInFrames={scenes[1].durationFrames}
        >
          <Scene2Causes />
        </Sequence>

        {/* Scene 3: Symptoms Trap */}
        <Sequence
          from={scenes[2].startFrame}
          durationInFrames={scenes[2].durationFrames}
        >
          <Scene3Symptoms />
        </Sequence>

        {/* Scene 4: Precision Treatment with Animated ESD Simulation */}
        <Sequence
          from={scenes[3].startFrame}
          durationInFrames={scenes[3].durationFrames}
        >
          <Scene4Solution />
        </Sequence>

        {/* Scene 5: 90% Golden Ratio & Age 45 */}
        <Sequence
          from={scenes[4].startFrame}
          durationInFrames={scenes[4].durationFrames}
        >
          <Scene5Stats />
        </Sequence>

        {/* Scene 6: Outro & Action Call */}
        <Sequence
          from={scenes[5].startFrame}
          durationInFrames={scenes[5].durationFrames}
        >
          <Scene6Outro />
        </Sequence>
      </div>

      {/* 3. Kinetic Speech-Synced Subtitles Bar */}
      <SpeechSyncedSubtitles />
    </AbsoluteFill>
  );
};
