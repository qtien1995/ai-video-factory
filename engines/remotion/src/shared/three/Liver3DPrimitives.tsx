import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { MeshDistortMaterial } from "@react-three/drei";

// ============================================================================
// 1. ANATOMICAL 3D LIVER HOLOGRAM WITH CIRRHOSIS NODULES & LASER BIO-SCAN
// ============================================================================
export interface LiverHologram3DProps {
  progress?: number;
  damageLevel?: number; // 0 (healthy) to 1 (critical necrosis)
  accentColor?: string;
  wireframeOpacity?: number;
  scaleMultiplier?: number;
  position?: [number, number, number];
}

export const LiverHologram3D: React.FC<LiverHologram3DProps> = ({
  progress = 1,
  damageLevel = 0.85,
  accentColor = "#EF4444",
  wireframeOpacity = 0.25,
  scaleMultiplier = 1.05,
  position = [0, 0, 0],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Dynamic continuous 3D rotation & floating
  const rotY = Math.sin(frame * 0.025) * 0.55;
  const rotX = 0.15 + Math.cos(frame * 0.02) * 0.12;
  const floatY = Math.sin(frame * 0.04) * 0.15;

  // Scanner laser wave along Y axis (-1.8 to 1.8)
  const scanY = Math.sin(frame * 0.06) * 1.6;

  // Pulsation of damaged necrotic area
  const damagePulse = 1 + Math.sin(frame * 0.18) * 0.08;

  // Nodules positions on the anterior and inferior surfaces
  const nodules = useMemo(() => [
    { pos: [0.6, 0.4, 0.8] as [number, number, number], r: 0.18, c: "#F59E0B" },
    { pos: [1.1, 0.1, 0.7] as [number, number, number], r: 0.22, c: "#EF4444" },
    { pos: [0.3, -0.4, 0.9] as [number, number, number], r: 0.16, c: "#EF4444" },
    { pos: [1.3, -0.3, 0.6] as [number, number, number], r: 0.25, c: "#DC2626" },
    { pos: [-0.6, 0.2, 0.6] as [number, number, number], r: 0.15, c: "#F59E0B" },
    { pos: [-1.1, -0.1, 0.5] as [number, number, number], r: 0.14, c: "#F59E0B" },
    { pos: [0.8, -0.7, 0.7] as [number, number, number], r: 0.20, c: "#7F1D1D" },
  ], []);

  // Portal vein branch curves
  const veinCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, -1.8, -0.4),
      new THREE.Vector3(0.15, -1.0, -0.2),
      new THREE.Vector3(0.3, -0.4, -0.1),
      new THREE.Vector3(0.8, 0.1, 0.1),
    ]);
  }, []);

  const arteryCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.1, -1.8, -0.3),
      new THREE.Vector3(-0.05, -1.0, -0.1),
      new THREE.Vector3(-0.4, -0.4, 0.0),
      new THREE.Vector3(-0.9, 0.0, 0.2),
    ]);
  }, []);

  return (
    <group
      position={[position[0], position[1] + floatY, position[2]]}
      scale={scaleMultiplier * entry * Math.min(progress, 1)}
      rotation={[rotX, rotY, 0]}
    >
      {/* ==================================================================== */}
      {/* 1. ANATOMICAL RIGHT LOBE (Thùy Phải - Khối lớn hình nêm cong vát)     */}
      {/* ==================================================================== */}
      <group position={[0.65, 0.05, 0]} rotation={[0.08, 0.12, -0.18]}>
        {/* Organic Right Lobe Flesh */}
        <mesh scale={[1.75, 1.25, 1.15]}>
          <sphereGeometry args={[1, 36, 28]} />
          <MeshDistortMaterial
            color={damageLevel > 0.5 ? "#78350F" : "#881337"}
            emissive={damageLevel > 0.5 ? "#451A03" : "#4C0519"}
            emissiveIntensity={0.65}
            distort={0.28}
            speed={0}
            roughness={0.28}
            metalness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Hologram Bio-Wireframe Layer */}
        <mesh scale={[1.78, 1.28, 1.18]}>
          <sphereGeometry args={[1, 20, 16]} />
          <meshBasicMaterial
            color={accentColor}
            wireframe
            transparent
            opacity={wireframeOpacity}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* 2. ANATOMICAL LEFT LOBE (Thùy Trái - Dẹt, thon nhỏ vuốt nhọn)       */}
      {/* ==================================================================== */}
      <group position={[-1.15, 0.2, 0.05]} rotation={[-0.05, -0.15, 0.25]}>
        <mesh scale={[1.25, 0.85, 0.75]}>
          <sphereGeometry args={[0.9, 32, 24]} />
          <MeshDistortMaterial
            color={damageLevel > 0.5 ? "#854D0E" : "#9F1239"}
            emissive={damageLevel > 0.5 ? "#422006" : "#4C0519"}
            emissiveIntensity={0.5}
            distort={0.22}
            speed={0}
            roughness={0.3}
            metalness={0.1}
            clearcoat={1}
          />
        </mesh>
        <mesh scale={[1.28, 0.88, 0.78]}>
          <sphereGeometry args={[0.9, 16, 12]} />
          <meshBasicMaterial
            color="#38BDF8"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* 3. FALCIFORM LIGAMENT (Dây chằng liềm - Màng phân chia 2 thùy)       */}
      {/* ==================================================================== */}
      <mesh position={[-0.1, 0.35, 0.85]} rotation={[0, 0.15, -0.05]}>
        <planeGeometry args={[0.22, 1.8]} />
        <meshPhysicalMaterial
          color="#E2E8F0"
          emissive="#38BDF8"
          emissiveIntensity={0.4}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ==================================================================== */}
      {/* 4. GALLBLADDER (Đáy Túi Mật - Quả lê xanh lục đính mặt dưới thùy P)  */}
      {/* ==================================================================== */}
      <group position={[0.45, -0.95, 0.4]} rotation={[0.4, 0.1, -0.2]}>
        <mesh scale={[0.32, 0.65, 0.32]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshPhysicalMaterial
            color="#10B981"
            emissive="#047857"
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.2}
            transmission={0.4}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* 5. VASCULAR HILUM (Mạch máu rốn gan: Tĩnh mạch cửa + Động mạch gan) */}
      {/* ==================================================================== */}
      <mesh>
        <tubeGeometry args={[veinCurve, 32, 0.14, 12, false]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      <mesh>
        <tubeGeometry args={[arteryCurve, 32, 0.11, 12, false]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive="#B91C1C"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* ==================================================================== */}
      {/* 6. CIRRHOTIC NODULES (Các nốt sần xơ hóa nổi gồ mặt gan)            */}
      {/* ==================================================================== */}
      {nodules.map((n, i) => (
        <group key={i} position={n.pos} scale={damagePulse}>
          <mesh>
            <sphereGeometry args={[n.r, 16, 16]} />
            <meshStandardMaterial
              color={n.c}
              emissive={n.c}
              emissiveIntensity={1.2}
              roughness={0.4}
            />
          </mesh>
          <mesh scale={1.25}>
            <sphereGeometry args={[n.r, 12, 12]} />
            <meshBasicMaterial
              color={n.c}
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      ))}

      {/* ==================================================================== */}
      {/* 7. 3D LASER BIO-SCAN RING (Vòng laser quét cắt lớp)                 */}
      {/* ==================================================================== */}
      <group position={[0, scanY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[2.5, 2.58, 48]} />
          <meshBasicMaterial
            color={accentColor}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Crosshair Laser Cross */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 5.2, 8]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 5.2, 8]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
};
