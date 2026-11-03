import "./index.css";
import React from "react";
import { Composition } from "remotion";
import {
  BespokeVideo,
  calculateBespokeMetadata,
} from "./BespokeVideo";

/**
 * AI Video Factory V4 — Remotion Root
 * Pure Bespoke Architecture:
 * - Empty-stage composition `BespokeVideo` drives dynamic video rendering.
 * - Project codes are fully decoupled and live in `projects/<id>/`.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BespokeVideo"
        component={BespokeVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          spec: {
            scenes: [
              {
                id: "scene-01-hook",
                durationInFrames: 150,
                label: "Cảnh 1: Hook 3s Giữ Chân",
              },
              {
                id: "scene-02-core",
                durationInFrames: 150,
                label: "Cảnh 2: Bản Chất Cơ Chế",
              },
              {
                id: "scene-03-action",
                durationInFrames: 150,
                label: "Cảnh 3: Hành Động & Outro",
              },
            ],
            brandOutroFrames: 90,
            subtitles: [
              { word: "Chào", startMs: 300, endMs: 600 },
              { word: "mừng", startMs: 600, endMs: 900 },
              { word: "đến", startMs: 900, endMs: 1200 },
              { word: "với", startMs: 1200, endMs: 1500 },
              { word: "AI", startMs: 1500, endMs: 1900 },
              { word: "Video", startMs: 1900, endMs: 2400 },
              { word: "Factory", startMs: 2400, endMs: 3000 },
              { word: "V4", startMs: 3000, endMs: 3500 },
              { word: "Bespoke", startMs: 3500, endMs: 4200 },
            ],
          },
        }}
        calculateMetadata={calculateBespokeMetadata}
      />
    </>
  );
};
