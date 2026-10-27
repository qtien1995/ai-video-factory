import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export type CameraMode = "orbit" | "dolly-in" | "fly-through" | "breathing";

export interface Stage3DWrapperProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  cameraMode?: CameraMode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  cameraTarget?: [number, number, number];
  sparklesCount?: number;
  sparklesScale?: number | [number, number, number];
  sparklesColor?: string;
  enableSparkles?: boolean;
  enableBloom?: boolean;
  bloomIntensity?: number;
  bloomLuminanceThreshold?: number;
  ambientIntensity?: number;
  dirLightIntensity?: number;
  dirLightPosition?: [number, number, number];
  style?: React.CSSProperties;
}

const CameraRig: React.FC<{
  cameraMode: CameraMode;
  basePosition: [number, number, number];
  target: [number, number, number];
}> = ({ cameraMode, basePosition, target }) => {
  const { camera } = useThree();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame / fps;

  let posX = basePosition[0];
  let posY = basePosition[1];
  let posZ = basePosition[2];

  if (cameraMode === "orbit") {
    const radius = Math.sqrt(basePosition[0] ** 2 + basePosition[2] ** 2) || 11.5;
    const angle = t * 0.35;
    posX = Math.sin(angle) * radius;
    posZ = Math.cos(angle) * radius;
    posY = basePosition[1] + Math.sin(t * 0.2) * 0.5;
  } else if (cameraMode === "dolly-in") {
    const dollyProgress = interpolate(frame, [0, fps * 4], [0, 1], {
      extrapolateRight: "clamp",
    });
    posZ = basePosition[2] - dollyProgress * (basePosition[2] * 0.35);
    posY = basePosition[1] + Math.sin(t * 0.3) * 0.2;
  } else if (cameraMode === "fly-through") {
    const flyProgress = frame * 0.04;
    posX = basePosition[0] + Math.sin(flyProgress * 0.5) * 1.5;
    posY = basePosition[1] + Math.cos(flyProgress * 0.3) * 0.8;
    posZ = basePosition[2] - ((frame * 0.05) % (basePosition[2] * 0.7));
  } else if (cameraMode === "breathing") {
    posX = basePosition[0] + Math.sin(t * 0.8) * 0.25;
    posY = basePosition[1] + Math.cos(t * 0.6) * 0.2;
    posZ = basePosition[2] + Math.sin(t * 0.4) * 0.15;
  }

  camera.position.set(posX, posY, posZ);
  camera.lookAt(target[0], target[1], target[2]);
  camera.updateProjectionMatrix();

  return null;
};

export const Stage3DWrapper: React.FC<Stage3DWrapperProps> = ({
  children,
  width,
  height,
  cameraMode = "breathing",
  cameraPosition = [0, 0, 11.5],
  cameraFov = 42,
  cameraTarget = [0, 0, 0],
  sparklesCount = 50,
  sparklesScale = [10, 10, 10],
  sparklesColor = "#38bdf8",
  enableSparkles = true,
  enableBloom = true,
  bloomIntensity = 0.7,
  bloomLuminanceThreshold = 0.35,
  ambientIntensity = 0.6,
  dirLightIntensity = 1.2,
  dirLightPosition = [5, 8, 5],
  style = {},
}) => {
  const videoConfig = useVideoConfig();
  const canvasWidth = width ?? videoConfig.width;
  const canvasHeight = height ?? videoConfig.height;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    >
      <ThreeCanvas
        width={canvasWidth}
        height={canvasHeight}
        camera={{ position: cameraPosition, fov: cameraFov }}
      >
        <CameraRig
          cameraMode={cameraMode}
          basePosition={cameraPosition}
          target={cameraTarget}
        />

        {/* Cinematic Lighting System */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={dirLightPosition} intensity={dirLightIntensity} />
        <pointLight position={[-4, -3, 3]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[4, 4, 2]} intensity={0.6} color="#818cf8" />

        {/* Ambient Environment Particles */}
        {enableSparkles && (
          <Sparkles
            count={sparklesCount}
            scale={sparklesScale}
            size={2.5}
            speed={0.3}
            color={sparklesColor}
            opacity={0.6}
          />
        )}

        {/* User 3D Content */}
        {children}

        {/* Cinematic Post-Processing Bloom */}
        {enableBloom && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={bloomLuminanceThreshold}
              intensity={bloomIntensity}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </ThreeCanvas>
    </div>
  );
};
