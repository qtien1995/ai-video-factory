import "./index.css";
import React from "react";
import { Composition } from "remotion";
import {
  BespokeVideo,
  calculateBespokeMetadata,
} from "./BespokeVideo";
import { KhoangKinChongChimVideo } from "../../../projects/CNT-20261105-KHOANG-KIN-CHONG-CHIM/remotion/KhoangKinChongChimVideo";
import { RachGamXoaiMutVideo } from "../../../projects/CNT-20261105-RACH-GAM-XOAI-MUT/remotion/RachGamXoaiMutVideo";

/**
 * AI Video Factory V4 — Remotion Root
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RachGamXoaiMut"
        component={RachGamXoaiMutVideo}
        durationInFrames={2367}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KhoangKinChongChim"
        component={KhoangKinChongChimVideo}
        durationInFrames={1620}
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
    </>
  );
};
