import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SceneWrapper } from "./components/SceneWrapper";
import { Stage3DWrapper, BioShield3D, SpatialHUDCard } from "../shared";
import type { CanonicalVideoSpec } from "../../../../core/schemas/types";

export const CanonicalVideo: React.FC<{ spec: CanonicalVideoSpec | null }> = ({ spec }) => {
  // If no spec is passed, render a live demo preview of the V4 Spatial 3D engine
  if (!spec || !spec.script || !spec.script.scenes || spec.script.scenes.length === 0) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#060a14",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.15) 0%, rgba(6, 10, 20, 0.98) 80%)",
        }}
      >
        <Stage3DWrapper cameraMode="breathing" sparklesColor="#38bdf8" enableBloom={true}>
          <BioShield3D progress={1} accentColor="#38bdf8" />
        </Stage3DWrapper>

        <div
          style={{
            position: "absolute",
            top: 300,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            padding: "0 40px",
            zIndex: 10,
          }}
        >
          <SpatialHUDCard
            frame={30}
            springVal={1}
            accentColor="#38bdf8"
            style={{ maxWidth: 880, padding: "36px 32px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#38bdf8", letterSpacing: 2 }}>
                CANONICAL VIDEO V4
              </div>
              <div style={{ fontSize: 60, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
                SPATIAL 3D & HUD
              </div>
              <div style={{ fontSize: 26, color: "#94a3b8", lineHeight: 1.4 }}>
                Sẵn sàng tiếp nhận CanonicalVideoSpec từ Factory Core
              </div>
            </div>
          </SpatialHUDCard>
        </div>
      </AbsoluteFill>
    );
  }

  const scenes = spec.script.scenes;
  let nextFrame = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060a14",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.1) 0%, rgba(6, 10, 20, 1) 85%)",
      }}
    >
      {scenes.map((scene, idx) => {
        const fps = spec.format.fps || spec.format.fpsPreference || 30;
        const startFrame =
          scene.startFrame ??
          (scene.startMs == null ? nextFrame : Math.ceil((scene.startMs / 1000) * fps));
        const durationFrames =
          scene.durationFrames ?? Math.ceil((scene.durationMs / 1000) * fps);
        nextFrame = startFrame + durationFrames;

        const isLastScene = idx === scenes.length - 1;

        return (
          <Sequence
            key={scene.id || idx}
            from={startFrame}
            durationInFrames={durationFrames}
          >
            <SceneWrapper scene={scene} isOutro={isLastScene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
