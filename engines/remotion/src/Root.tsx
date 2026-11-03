import "./index.css";
import React from "react";
import { Composition } from "remotion";
import {
  BespokeVideo,
  calculateBespokeMetadata,
} from "./BespokeVideo";
import { TestBespoke01Video } from "../../../projects/test-bespoke-01/remotion/TestBespoke01Video";

/**
 * AI Video Factory V4 — Remotion Root
 * Registered compositions:
 * - `TestBespoke01`: Acceptance test bespoke video project
 * - `BespokeVideo`: Dynamic empty-stage composition for bespoke pipeline
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TestBespoke01"
        component={TestBespoke01Video}
        durationInFrames={1711}
        fps={30}
        width={1080}
        height={1920}
      />
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
