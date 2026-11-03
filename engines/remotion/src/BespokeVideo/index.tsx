import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SpeechSyncedSubtitles, SubtitleWord } from "../shared/SpeechSyncedSubtitles";
import { UserBrandOutro } from "../shared/UserBrandOutro";

export interface BespokeScene {
  id: string;
  durationInFrames: number;
  label?: string;
}

export interface BespokeSpec {
  scenes: BespokeScene[];
  subtitles?: SubtitleWord[];
  brandOutroFrames?: number;
  backgroundColor?: string;
}

export interface BespokeVideoProps {
  spec?: BespokeSpec;
  scenes?: BespokeScene[];
  subtitles?: SubtitleWord[];
  brandOutroFrames?: number;
  backgroundColor?: string;
}

const DEFAULT_SCENES: BespokeScene[] = [
  { id: "scene-1", durationInFrames: 150, label: "Scene 1: Hook" },
  { id: "scene-2", durationInFrames: 150, label: "Scene 2: Core" },
  { id: "scene-3", durationInFrames: 150, label: "Scene 3: Outro" },
];

export const calculateBespokeMetadata = ({
  props,
}: {
  props: BespokeVideoProps;
}) => {
  const effectiveSpec = props.spec || props;
  const scenes =
    effectiveSpec.scenes && effectiveSpec.scenes.length > 0
      ? effectiveSpec.scenes
      : DEFAULT_SCENES;
  const totalDuration = scenes.reduce(
    (acc, scene) => acc + (scene.durationInFrames || 0),
    0
  );

  return {
    durationInFrames: totalDuration > 0 ? totalDuration : 450,
    fps: 30,
    width: 1080,
    height: 1920,
  };
};

export const BespokeVideo: React.FC<BespokeVideoProps> = ({
  spec,
  scenes: directScenes,
  subtitles: directSubtitles,
  brandOutroFrames: directOutroFrames,
  backgroundColor: directBgColor,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const scenes = spec?.scenes || directScenes || DEFAULT_SCENES;
  const subtitles = spec?.subtitles || directSubtitles;
  const brandOutroFrames = spec?.brandOutroFrames ?? directOutroFrames ?? 90;
  const backgroundColor =
    spec?.backgroundColor || directBgColor || "#0e1424";

  // Compute timing boundaries for each scene
  const { sceneTimings, totalDuration } = useMemo(() => {
    let offset = 0;
    const timings = scenes.map((s) => {
      const from = offset;
      offset += s.durationInFrames;
      return {
        ...s,
        from,
        to: offset,
      };
    });
    return { sceneTimings: timings, totalDuration: offset };
  }, [scenes]);

  const outroStartFrame = Math.max(0, totalDuration - brandOutroFrames);

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Scene sequences with neutral placeholders */}
      {sceneTimings.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.from}
          durationInFrames={scene.durationInFrames}
        >
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 50,
              color: "rgba(255, 255, 255, 0.45)",
              fontSize: 24,
              fontWeight: 600,
              fontFamily:
                "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {scene.label || scene.id}
          </div>
        </Sequence>
      ))}

      {/* Speech-synced subtitles if provided */}
      {subtitles && subtitles.length > 0 && (
        <SpeechSyncedSubtitles words={subtitles} />
      )}

      {/* Brand Outro during the final frames */}
      {brandOutroFrames > 0 && totalDuration > brandOutroFrames && (
        <Sequence from={outroStartFrame} durationInFrames={brandOutroFrames}>
          <UserBrandOutro />
        </Sequence>
      )}

      {/* Segmented bottom progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 40,
          right: 40,
          height: 6,
          display: "flex",
          gap: 6,
          zIndex: 99,
        }}
      >
        {sceneTimings.map((scene) => {
          const isPast = frame >= scene.to;
          const isCurrent = frame >= scene.from && frame < scene.to;
          const progressPercent = isPast
            ? 100
            : isCurrent
            ? Math.min(
                100,
                Math.max(
                  0,
                  ((frame - scene.from) / scene.durationInFrames) * 100
                )
              )
            : 0;

          return (
            <div
              key={scene.id}
              style={{
                flex: scene.durationInFrames,
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  backgroundColor: "#D4AF37",
                  borderRadius: 3,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
