import React from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Sparkles } from "@react-three/drei";

// ============================================================================
// 3D TV MESH WITH GLITCH & EXPLODING AD POPUPS
// ============================================================================
export const GlitchTVScreenMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140, mass: 0.8 },
  });

  // Violent lag & glitch jitter calculation
  const isHeavyGlitch = frame % 7 === 0 || frame % 11 === 0;
  const jitterX = Math.sin(frame * 1.8) * (isHeavyGlitch ? 0.35 : 0.08);
  const jitterY = Math.cos(frame * 2.3) * (isHeavyGlitch ? 0.25 : 0.05);
  const jitterRotZ = Math.sin(frame * 3.1) * (isHeavyGlitch ? 0.05 : 0.015);
  const scalePulsing = 1 + Math.sin(frame * 0.4) * 0.03 + (isHeavyGlitch ? 0.06 : 0);

  // Shockwave expansion
  const shockwaveScale = interpolate(frame % 30, [0, 30], [1.2, 3.8], {
    extrapolateRight: "clamp",
  });
  const shockwaveOpacity = interpolate(frame % 30, [0, 30], [0.8, 0], {
    extrapolateRight: "clamp",
  });

  // Exploding ad panels floating in 3D space
  const popProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <group
      position={[jitterX, jitterY, 0]}
      rotation={[0, Math.sin(frame * 0.03) * 0.2, jitterRotZ]}
      scale={entry * scalePulsing}
    >
      {/* 1. TV Main Outer Bezel (Dark Titanium) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[7.2, 4.2, 0.4]} />
        <meshStandardMaterial
          color="#161B22"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 2. TV Screen (Glowing Crimson Red Glitch Face) */}
      <mesh position={[0, 0, 0.22]}>
        <planeGeometry args={[6.8, 3.8]} />
        <meshBasicMaterial
          color={isHeavyGlitch ? "#FF2A55" : "#B91C1C"}
          wireframe={frame % 5 === 0}
        />
      </mesh>

      {/* 2.1 Screen Internal Wireframe Matrix Grid */}
      <mesh position={[0, 0, 0.23]}>
        <planeGeometry args={[6.7, 3.7, 16, 10]} />
        <meshBasicMaterial
          color="#FFAA00"
          wireframe={true}
          transparent={true}
          opacity={0.35 + Math.sin(frame * 0.5) * 0.2}
        />
      </mesh>

      {/* 3. TV Stand Base & Neck */}
      <mesh position={[0, -2.4, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#30363D" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -2.7, 0.2]}>
        <boxGeometry args={[2.4, 0.1, 1.2]} />
        <meshStandardMaterial color="#21262D" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 4. Exploding Shockwave Ring from screen center */}
      <mesh position={[0, 0, 0.3]} scale={[shockwaveScale, shockwaveScale, 1]}>
        <ringGeometry args={[1.5, 1.65, 32]} />
        <meshBasicMaterial
          color="#FF0055"
          transparent={true}
          opacity={shockwaveOpacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 5. 3D Bursting Ad Panels (Flying out toward viewer) */}
      {/* Panel 1: Top-Left (70% ADS) */}
      <group
        position={[
          interpolate(popProgress, [0, 1], [-0.5, -2.6]),
          interpolate(popProgress, [0, 1], [0.2, 1.8]),
          interpolate(popProgress, [0, 1], [0.3, 1.4]),
        ]}
        rotation={[0.1, 0.25, -0.1]}
      >
        <mesh>
          <boxGeometry args={[2.5, 0.9, 0.1]} />
          <meshStandardMaterial
            color="#E11D48"
            emissive="#E11D48"
            emissiveIntensity={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Panel 2: Top-Right (RAM 95% OVERFLOW) */}
      <group
        position={[
          interpolate(popProgress, [0, 1], [0.5, 2.7]),
          interpolate(popProgress, [0, 1], [0.3, 1.7]),
          interpolate(popProgress, [0, 1], [0.3, 1.8]),
        ]}
        rotation={[-0.1, -0.2, 0.15]}
      >
        <mesh>
          <boxGeometry args={[2.6, 0.9, 0.1]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Panel 3: Bottom-Left (BUFFERING 99%...) */}
      <group
        position={[
          interpolate(popProgress, [0, 1], [-0.2, -2.4]),
          interpolate(popProgress, [0, 1], [-0.4, -1.4]),
          interpolate(popProgress, [0, 1], [0.3, 1.9]),
        ]}
        rotation={[0.15, 0.15, -0.05]}
      >
        <mesh>
          <boxGeometry args={[2.4, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#DC2626"
            emissive="#DC2626"
            emissiveIntensity={0.4}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Panel 4: Bottom-Right (48+ BACKGROUND SERVICES) */}
      <group
        position={[
          interpolate(popProgress, [0, 1], [0.3, 2.5]),
          interpolate(popProgress, [0, 1], [-0.3, -1.5]),
          interpolate(popProgress, [0, 1], [0.3, 1.5]),
        ]}
        rotation={[-0.1, -0.15, 0.08]}
      >
        <mesh>
          <boxGeometry args={[2.5, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#991B1B"
            emissive="#991B1B"
            emissiveIntensity={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* 6. Dynamic Point Lights emitting red emergency alarm */}
      <pointLight
        position={[0, 0, 3]}
        color={isHeavyGlitch ? "#FF0044" : "#FF5500"}
        intensity={4}
        distance={10}
      />
    </group>
  );
};

// ============================================================================
// MAIN EXPLOSIVE 3D TV STAGE WITH 2.5D GLITCH OVERLAYS
// ============================================================================
export const ExplosiveGlitchTV3D: React.FC<{ width?: number; height?: number }> = ({
  width = 960,
  height = 540,
}) => {
  const frame = useCurrentFrame();
  const isGlitch = frame % 6 === 0 || frame % 9 === 0;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. 3D WebGL Canvas Stage */}
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <directionalLight position={[-5, -4, 3]} color="#FF0044" intensity={2.0} />

        {/* 3D Glitching TV Component */}
        <GlitchTVScreenMesh />

        {/* Explosive Debris & Warning Sparks */}
        <Sparkles
          count={100}
          scale={[10, 6, 5]}
          size={5}
          speed={3}
          color="#FF3344"
          opacity={0.9}
        />
        <Sparkles
          count={60}
          scale={[8, 5, 4]}
          size={4}
          speed={2}
          color="#FBBF24"
          opacity={0.8}
        />
      </ThreeCanvas>

      {/* 2. Floating 2.5D HUD Overlays right on the 3D TV Screen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: isGlitch ? `translate(${(frame % 5) - 2}px, ${(frame % 3) - 1}px)` : "none",
        }}
      >
        {/* Buffering Loading Spinner & Critical Stutter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(12px)",
            padding: "16px 28px",
            borderRadius: 18,
            border: "2px solid #F85149",
            boxShadow: "0 0 30px rgba(248, 81, 73, 0.5)",
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              border: "5px solid rgba(255, 255, 255, 0.15)",
              borderTopColor: "#F85149",
              borderRightColor: "#FBBF24",
              transform: `rotate(${Math.floor((frame * 18) / 45) * 45}deg)`, // Stuttering stepped rotation!
            }}
          />
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2,
              textShadow: "0 0 10px #F85149",
            }}
          >
            BUFFERING 99%... GIẬT LAG
          </span>
        </div>

        {/* 2D Callout Ad Badges exploding out with absolute offsets */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 50,
            background: "#E11D48",
            color: "#FFFFFF",
            padding: "8px 18px",
            borderRadius: 8,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 1,
            boxShadow: "0 10px 25px rgba(225, 29, 72, 0.6)",
            transform: `rotate(-8deg) scale(${isGlitch ? 1.08 : 1})`,
          }}
        >
          💥 70% QUẢNG CÁO RÁC
        </div>

        <div
          style={{
            position: "absolute",
            top: 45,
            right: 50,
            background: "#D97706",
            color: "#FFFFFF",
            padding: "8px 18px",
            borderRadius: 8,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 1,
            boxShadow: "0 10px 25px rgba(217, 119, 6, 0.6)",
            transform: `rotate(7deg) scale(${isGlitch ? 1.08 : 1})`,
          }}
        >
          ⚠️ NGHẼN 95% RAM
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 70,
            background: "rgba(185, 28, 28, 0.95)",
            border: "1px solid #FF5555",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 800,
            transform: "rotate(4deg)",
          }}
        >
          📡 48 SERVICE THEO DÕI
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 55,
            right: 70,
            background: "rgba(185, 28, 28, 0.95)",
            border: "1px solid #FF5555",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 800,
            transform: "rotate(-5deg)",
          }}
        >
          🐢 DELAY REMOTE 3 GIÂY
        </div>
      </div>
    </div>
  );
};
