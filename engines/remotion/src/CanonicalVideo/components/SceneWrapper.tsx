import React, { useMemo } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { TextLayout } from "./TextLayout";
import { Flow, Interrupt, Drain, ProgressiveBuild, FadeIn } from "./MotionComponents";
import {
  Stage3DWrapper,
  BioShield3D,
  ColonHologram3D,
  EndoscopySimulation3D,
  Candlestick3DChart,
  BarRace3DTowers,
  WealthVaultShield3D,
  SpeechSyncedSubtitles,
  UserBrandOutro,
} from "../../shared";
import type { SceneSpec } from "../../../../../core/schemas/types";

export interface SceneWrapperProps {
  scene: SceneSpec;
  isOutro?: boolean;
}

export const SceneWrapper: React.FC<SceneWrapperProps> = ({ scene, isOutro = false }) => {
  const { fps } = useVideoConfig();
  const motionTypes = scene.motionIntent?.map((intent) => intent.type) || [];

  // Generate speech-synced subtitle words from scene narration
  const words = useMemo(() => {
    if (!scene.narration) return [];
    const tokens = scene.narration.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    const durationMs = scene.durationMs || 3000;
    const wordDuration = Math.max(160, Math.floor(durationMs / tokens.length));

    return tokens.map((token, idx) => {
      const startMs = idx * wordDuration;
      return {
        word: token,
        startMs,
        durationMs: wordDuration,
        endMs: startMs + wordDuration,
      };
    });
  }, [scene.narration, scene.durationMs]);

  // Determine appropriate procedural 3D centerpiece based on semantic intent
  const render3DCenterpiece = () => {
    const textLower = (
      scene.narration +
      " " +
      scene.purpose +
      " " +
      (scene.visualIntent?.description || "")
    ).toLowerCase();

    if (
      textLower.includes("colon") ||
      textLower.includes("polyp") ||
      textLower.includes("đại tràng") ||
      textLower.includes("ung thư")
    ) {
      return (
        <Stage3DWrapper cameraMode="orbit" sparklesColor="#ef4444" enableBloom={true}>
          <ColonHologram3D progress={1} highlightPolyp={true} />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("nội soi") ||
      textLower.includes("laser") ||
      textLower.includes("phẫu thuật")
    ) {
      return (
        <Stage3DWrapper cameraMode="dolly-in" sparklesColor="#00f0ff" enableBloom={true}>
          <EndoscopySimulation3D cutProgress={0.4} />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("nến") ||
      textLower.includes("chứng khoán") ||
      textLower.includes("candlestick") ||
      textLower.includes("thị trường")
    ) {
      return (
        <Stage3DWrapper cameraMode="orbit" sparklesColor="#22c55e" enableBloom={true}>
          <Candlestick3DChart />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("đua") ||
      textLower.includes("tăng trưởng") ||
      textLower.includes("bar race") ||
      textLower.includes("cột")
    ) {
      return (
        <Stage3DWrapper cameraMode="fly-through" sparklesColor="#fbbf24" enableBloom={true}>
          <BarRace3DTowers />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("tài sản") ||
      textLower.includes("vốn") ||
      textLower.includes("kim cương") ||
      textLower.includes("wealth") ||
      textLower.includes("tiền")
    ) {
      return (
        <Stage3DWrapper cameraMode="breathing" sparklesColor="#fbbf24" enableBloom={true}>
          <WealthVaultShield3D />
        </Stage3DWrapper>
      );
    }

    // Default: versatile bio-protection holographic shield
    return (
      <Stage3DWrapper cameraMode="breathing" sparklesColor="#38bdf8" enableBloom={true}>
        <BioShield3D progress={1} accentColor="#38bdf8" />
      </Stage3DWrapper>
    );
  };

  // If this scene is designated as the brand Outro
  if (isOutro || scene.purpose === "outro") {
    return (
      <AbsoluteFill style={{ backgroundColor: "#060a14" }}>
        {/* Subtle background 3D stage */}
        <Stage3DWrapper cameraMode="breathing" sparklesColor="#fbbf24" enableBloom={true}>
          <WealthVaultShield3D progress={0.9} accentColor="#fbbf24" />
        </Stage3DWrapper>

        {/* Foreground User Brand Outro Card */}
        <UserBrandOutro />

        {/* Speech-Synced Subtitles */}
        {words.length > 0 && <SpeechSyncedSubtitles words={words} fps={fps} positionY={1530} />}
      </AbsoluteFill>
    );
  }

  // Foreground HUD content with optional motion wrappers
  let foregroundHUD = (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {scene.text && <TextLayout texts={scene.text} layout={scene.visualIntent?.layout} />}
    </div>
  );

  if (motionTypes.includes("fade-in")) {
    foregroundHUD = <FadeIn>{foregroundHUD}</FadeIn>;
  }
  if (motionTypes.includes("flow")) {
    foregroundHUD = <Flow>{foregroundHUD}</Flow>;
  }
  if (motionTypes.includes("progressive-build")) {
    foregroundHUD = <ProgressiveBuild>{foregroundHUD}</ProgressiveBuild>;
  }
  if (motionTypes.includes("drain")) {
    foregroundHUD = <Drain>{foregroundHUD}</Drain>;
  }
  if (motionTypes.includes("interrupt")) {
    foregroundHUD = <Interrupt>{foregroundHUD}</Interrupt>;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060a14",
        backgroundImage:
          "radial-gradient(circle at 50% 25%, rgba(14, 165, 233, 0.12) 0%, rgba(6, 10, 20, 0.98) 75%)",
      }}
    >
      {/* Layer 1: Background & Procedural 3D Stage */}
      {render3DCenterpiece()}

      {/* Layer 2: Foreground 2.5D Spatial HUD Overlay */}
      {foregroundHUD}

      {/* Layer 3: Speech-Synced Subtitles at Safe Zone Y: 1530 */}
      {words.length > 0 && <SpeechSyncedSubtitles words={words} fps={fps} positionY={1530} />}
    </AbsoluteFill>
  );
};
