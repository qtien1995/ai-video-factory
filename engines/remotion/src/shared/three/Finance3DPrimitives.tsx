import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

// ============================================================================
// 1. CANDLESTICK 3D CHART (Biểu đồ nến Nhật 3D nổi khối phát sáng)
// ============================================================================
export interface Candlestick3DItem {
  open: number;
  close: number;
  high: number;
  low: number;
  label?: string;
}

export interface Candlestick3DChartProps {
  data?: Candlestick3DItem[];
  bullColor?: string;
  bearColor?: string;
  spacing?: number;
  staggerDelay?: number;
}

const DEFAULT_CANDLE_DATA: Candlestick3DItem[] = [
  { open: 1.2, close: 1.9, high: 2.2, low: 1.0, label: "Q1" },
  { open: 1.9, close: 1.5, high: 2.1, low: 1.3, label: "Q2" },
  { open: 1.5, close: 2.4, high: 2.7, low: 1.4, label: "Q3" },
  { open: 2.4, close: 3.2, high: 3.5, low: 2.2, label: "Q4" },
  { open: 3.2, close: 2.8, high: 3.4, low: 2.6, label: "Q5" },
];

export const Candlestick3DChart: React.FC<Candlestick3DChartProps> = ({
  data = DEFAULT_CANDLE_DATA,
  bullColor = "#22c55e",
  bearColor = "#ef4444",
  spacing = 1.0,
  staggerDelay = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalWidth = (data.length - 1) * spacing;
  const startX = -totalWidth / 2;

  // Gentle 3D presentation tilt
  const chartTiltX = 0.25 + Math.sin(frame * 0.03) * 0.04;
  const chartTiltY = -0.35 + Math.cos(frame * 0.02) * 0.05;

  return (
    <group rotation={[chartTiltX, chartTiltY, 0]}>
      {/* Floor Reference Grid Base */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[totalWidth + 3, 4, 8, 4]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.12} />
      </mesh>

      {data.map((c, idx) => {
        const isBull = c.close >= c.open;
        const color = isBull ? bullColor : bearColor;

        const bodyBottom = Math.min(c.open, c.close);
        const bodyTop = Math.max(c.open, c.close);
        const bodyHeight = Math.max(0.12, bodyTop - bodyBottom);
        const bodyCenterY = bodyBottom + bodyHeight / 2;

        const wickHeight = Math.max(0.2, c.high - c.low);
        const wickCenterY = (c.high + c.low) / 2;

        const growthSpring = spring({
          frame: Math.max(0, frame - idx * staggerDelay),
          fps,
          config: { damping: 14, stiffness: 120 },
        });

        const posX = startX + idx * spacing;

        return (
          <group
            key={idx}
            position={[posX, 0, 0]}
            scale={[1, growthSpring, 1]}
          >
            {/* Candle Wick (High to Low thin cylinder) */}
            <mesh position={[0, wickCenterY, 0]}>
              <cylinderGeometry args={[0.025, 0.025, wickHeight, 12]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Candle 3D Body */}
            <mesh position={[0, bodyCenterY, 0]}>
              <boxGeometry args={[0.48, bodyHeight, 0.48]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.15}
                metalness={0.25}
                transmission={0.2}
                emissive={color}
                emissiveIntensity={0.45}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ============================================================================
// 2. BAR RACE 3D TOWERS (Các cột trụ 3D đua chiều cao trong không gian)
// ============================================================================
export interface BarRace3DItem {
  label: string;
  value: number; // e.g. 10 to 100
  color?: string;
}

export interface BarRace3DTowersProps {
  items?: BarRace3DItem[];
  maxHeight?: number;
  spacing?: number;
  accentColor?: string;
}

const DEFAULT_BAR_ITEMS: BarRace3DItem[] = [
  { label: "Bonds", value: 35, color: "#38bdf8" },
  { label: "Real Estate", value: 55, color: "#a855f7" },
  { label: "Equities", value: 85, color: "#22c55e" },
  { label: "AI Tech", value: 100, color: "#fbbf24" },
];

export const BarRace3DTowers: React.FC<BarRace3DTowersProps> = ({
  items = DEFAULT_BAR_ITEMS,
  maxHeight = 3.6,
  spacing = 1.15,
  accentColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxValue = useMemo(() => {
    return Math.max(...items.map((it) => it.value), 1);
  }, [items]);

  const totalWidth = (items.length - 1) * spacing;
  const startX = -totalWidth / 2;

  // Cinematic isometric camera view
  const rotY = -0.45 + Math.sin(frame * 0.02) * 0.04;
  const rotX = 0.32 + Math.cos(frame * 0.02) * 0.03;

  return (
    <group rotation={[rotX, rotY, 0]}>
      {/* Ground Pedestal Slab */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[totalWidth + 2.5, 0.12, 3.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>

      {items.map((item, idx) => {
        const itemColor = item.color || accentColor;
        const targetHeight = (item.value / maxValue) * maxHeight;

        const growthSpring = spring({
          frame: Math.max(0, frame - idx * 8),
          fps,
          config: { damping: 15, stiffness: 110 },
        });

        const currentHeight = Math.max(0.08, targetHeight * growthSpring);
        const posX = startX + idx * spacing;

        return (
          <group key={idx} position={[posX, 0, 0]}>
            {/* 3D Monolith Tower Shaft */}
            <mesh position={[0, currentHeight / 2, 0]}>
              <boxGeometry args={[0.62, currentHeight, 0.62]} />
              <meshPhysicalMaterial
                color={itemColor}
                transmission={0.35}
                roughness={0.2}
                metalness={0.65}
                emissive={itemColor}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Glowing Summit Top Cap */}
            <mesh position={[0, currentHeight + 0.03, 0]}>
              <boxGeometry args={[0.66, 0.06, 0.66]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive={itemColor}
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ============================================================================
// 3. WEALTH VAULT SHIELD 3D (Khối kim cương & khiên bảo toàn vốn xoay 3D)
// ============================================================================
export interface WealthVaultShield3DProps {
  progress?: number;
  accentColor?: string;
}

export const WealthVaultShield3D: React.FC<WealthVaultShield3DProps> = ({
  progress = 1,
  accentColor = "#fbbf24", // Golden wealth standard
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = entry * progress;

  // Gimbal rotations
  const gemRotX = frame * 0.02;
  const gemRotY = frame * 0.025;
  const ring1Rot = frame * 0.03;
  const ring2Rot = -frame * 0.022;

  return (
    <group scale={scale}>
      {/* Central Precious Diamond Core */}
      <mesh rotation={[gemRotX, gemRotY, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color={accentColor}
          roughness={0.05}
          metalness={0.2}
          transmission={0.85}
          ior={2.4}
          emissive={accentColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Gold Ring 1 (Horizontal Inclined Gimbal) */}
      <mesh rotation={[Math.PI / 4 + ring1Rot, 0, ring1Rot]}>
        <torusGeometry args={[1.85, 0.045, 16, 64]} />
        <meshStandardMaterial
          color="#fef08a"
          metalness={0.95}
          roughness={0.15}
          emissive={accentColor}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Gold Ring 2 (Vertical Perpendicular Gimbal) */}
      <mesh rotation={[0, ring2Rot, Math.PI / 3 + ring2Rot]}>
        <torusGeometry args={[2.15, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#fef08a"
          metalness={0.95}
          roughness={0.15}
          emissive={accentColor}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Satellite Node Orbs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + frame * 0.025;
        const nodeX = Math.cos(angle) * 2.5;
        const nodeZ = Math.sin(angle) * 2.5;
        const nodeY = Math.sin(frame * 0.05 + i) * 0.3;

        return (
          <mesh key={i} position={[nodeX, nodeY, nodeZ]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={accentColor}
              emissiveIntensity={1.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};
