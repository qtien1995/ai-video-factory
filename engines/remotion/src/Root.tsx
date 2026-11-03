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
import { FinCopilotVideo } from "../../../projects/explainers/CNT-20261029-FINCOPILOT-AI-PROMO/remotion/FinCopilotVideo";
import { BhytBiKhoaVideo } from "../../../projects/financial-insurance/CNT-20261029-BHYT-BI-KHOA-VIEN-PHI/remotion/BhytBiKhoaVideo";
import { BhytBiKhoaVideo3D } from "../../../projects/financial-insurance/CNT-20261029-BHYT-BI-KHOA-VIEN-PHI/remotion/BhytBiKhoaVideo3D";
import { ViemGanRuouVideo } from "../../../projects/financial-insurance/CNT-20261029-VIEM-GAN-RUOU-BENH-LY-NGHIEM-TRONG/remotion/ViemGanRuouVideo";
import { CamCumSuyTimVideo } from "../../../projects/financial-insurance/CNT-20261030-CAM-CUM-HOA-SUY-TIM-CAP-RSV/remotion/CamCumSuyTimVideo";
import { BietBoiSaoMangPhaoVideo } from "../../../projects/financial-insurance/CNT-20261030-BIET-BOI-SAO-VAN-MANG-PHAO/remotion/BietBoiSaoMangPhaoVideo";
import { TranhBienAllInVsPhongThuVideo } from "../../../projects/financial-insurance/CNT-20261102-TRANH-BIEN-ALLIN-VS-PHONG-THU/remotion/TranhBienAllInVsPhongThuVideo";
import { VanCo300TyUsdTtckVideo } from "../../../projects/financial-insurance/CNT-20261102-VAN-CO-300-TY-USD-TTCK/remotion/VanCo300TyUsdTtckVideo";
import { ExplodedView3D } from "../../../styles/cinematic-saas-craft/components/ExplodedView3D";
import { GrazeFaceTour3D } from "../../../styles/cinematic-saas-craft/components/GrazeFaceTour3D";
import { ProgressiveCardAssemble } from "../../../styles/cinematic-saas-craft/components/ProgressiveCardAssemble";
import { NonCardStylesShowcase } from "./examples/NonCardStylesShowcase";

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
      {/* Project: CNT-20261029-FINCOPILOT-AI-PROMO */}
      <Composition
        id="FinCopilotVideo"
        component={FinCopilotVideo}
        durationInFrames={1020}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Project: CNT-20261029-BHYT-BI-KHOA-VIEN-PHI (Standard Edition) */}
      <Composition
        id="BhytBiKhoaVideo"
        component={BhytBiKhoaVideo}
        durationInFrames={1859}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Project: CNT-20261029-BHYT-BI-KHOA-VIEN-PHI (3D WebGL Spatial Edition) */}
      <Composition
        id="BhytBiKhoaVideo3D"
        component={BhytBiKhoaVideo3D}
        durationInFrames={1859}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Project: CNT-20261029-VIEM-GAN-RUOU-BENH-LY-NGHIEM-TRONG */}
      <Composition
        id="ViemGanRuouVideo"
        component={ViemGanRuouVideo}
        durationInFrames={2229}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Project: CNT-20261030-CAM-CUM-HOA-SUY-TIM-CAP-RSV */}
      <Composition
        id="CamCumSuyTimVideo"
        component={CamCumSuyTimVideo}
        durationInFrames={1680}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Project: CNT-20261030-BIET-BOI-SAO-VAN-MANG-PHAO */}
      <Composition
        id="BietBoiSaoMangPhaoVideo"
        component={BietBoiSaoMangPhaoVideo}
        durationInFrames={2593}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Showcase 3D Components (cinematic-saas-craft 9:16) */}
      <Composition
        id="ExplodedView3D"
        component={ExplodedView3D}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="GrazeFaceTour3D"
        component={GrazeFaceTour3D}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="ProgressiveCardAssemble"
        component={ProgressiveCardAssemble}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 6 Non-Card Styles Showcase */}
      <Composition
        id="NonCardStylesShowcase"
        component={NonCardStylesShowcase}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Tranh Biện All-In vs Phòng Thủ Gia Sản - 2.5D Dual Speaker Dialogue */}
      <Composition
        id="TranhBienAllInVsPhongThuVideo"
        component={TranhBienAllInVsPhongThuVideo}
        durationInFrames={2630}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Ván Cờ 300 Tỷ USD & Tương Lai TTCK (10 Scenes Hybrid Visual) */}
      <Composition
        id="VanCo300TyUsdTtckVideo"
        component={VanCo300TyUsdTtckVideo}
        durationInFrames={4965}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
