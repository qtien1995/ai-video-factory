import "./index.css";
import React from "react";
import { Composition } from "remotion";
import {
  BespokeVideo,
  calculateBespokeMetadata,
} from "./BespokeVideo";
import { TestBespoke01Video } from "../../../projects/test-bespoke-01/remotion/TestBespoke01Video";
import { QuyTac72Video } from "../../../projects/CNT-20261104-QUY-TAC-72-NHAN-DOI-TAI-SAN/remotion/QuyTac72Video";

/**
 * AI Video Factory V4 — Remotion Root
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
                label: "Cảnh 1: Hook 3s Giữ Chân (Ẩn Dụ Thị Giác)",
              },
              {
                id: "scene-02-core",
                durationInFrames: 150,
                label: "Cảnh 2: Bản Chất Cơ Chế (Sơ Đồ Sống)",
              },
              {
                id: "scene-03-action",
                durationInFrames: 150,
                label: "Cảnh 3: Hành Động & Outro Thương Hiệu",
              },
            ],
            brandOutroFrames: 90,
            subtitles: [],
          },
        }}
        calculateMetadata={calculateBespokeMetadata}
      />
      <Composition
        id="QuyTac72"
        component={QuyTac72Video}
        durationInFrames={1602}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
