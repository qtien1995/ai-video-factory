import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { CanonicalVideo } from "./CanonicalVideo";
import { DockerExplainer } from "./examples/DockerExplainer/DockerExplainer";
import { dockerExplainerSchema } from "./examples/DockerExplainer/types";
import { UngThuDaiTrucTrangVideo } from "../../../projects/financial-insurance/CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3/remotion/UngThuDaiTrucTrangVideo";
import { Scene1Hook } from "../../../projects/financial-insurance/CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3/remotion/Scenes";
import { CleanYourTvVideo } from "../../../projects/explainers/CNT-20261026-CLEANYOURTV-DEBLOAT-AI/remotion/CleanYourTvVideo";
import { AiJobSearchVideo } from "../../../projects/explainers/CNT-20261026-AI-JOB-SEARCH/remotion/AiJobSearchVideo";

/**
 * AI Video Factory V3 — Remotion Root
 * Standardized Dynamic Architecture:
 * All video outputs are driven dynamically by CanonicalVideoSpec via props.
 * Individual video projects are decoupled from the engine and reside in projects/.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Primary Dynamic Engine Composition: Driven by VideoSpec Props */}
      <Composition
        id="CanonicalVideo"
        component={CanonicalVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          spec: null,
        }}
        calculateMetadata={({
          props,
        }: {
          props: {
            spec?: {
              format?: {
                totalDurationFrames?: number;
                fps?: number;
                width?: number;
                height?: number;
              };
            } | null;
          };
        }) => {
          return {
            durationInFrames: props.spec?.format?.totalDurationFrames || 300,
            fps: props.spec?.format?.fps || 30,
            width: props.spec?.format?.width || 1080,
            height: props.spec?.format?.height || 1920,
          };
        }}
      />

      {/* Reference Template Composition */}
      <Composition
        id="DockerExplainer"
        component={DockerExplainer}
        durationInFrames={3500}
        fps={30}
        width={1080}
        height={1920}
        schema={dockerExplainerSchema}
        defaultProps={{
          title: "Docker là gì?",
          subtitle: "Giải thích trong 60 giây",
        }}
      />

      {/* Project Verification Composition: Ung Thư Đại Trực Tràng Full Video */}
      <Composition
        id="UngThuDaiTrucTrangVideo"
        component={UngThuDaiTrucTrangVideo}
        durationInFrames={1776}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Project Verification Composition: Scene 1 Hook with SmartSceneLayout */}
      <Composition
        id="UngThuDaiTrucTrangHookScene"
        component={Scene1Hook}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Explainer: cleanyourtv GitHub Repo Video */}
      <Composition
        id="CleanYourTvVideo"
        component={CleanYourTvVideo}
        durationInFrames={1435}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Explainer: AI Job Search GitHub Viral Repo Video */}
      <Composition
        id="AiJobSearchVideo"
        component={AiJobSearchVideo}
        durationInFrames={1622}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
