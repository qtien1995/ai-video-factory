import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { MeshDistortMaterial } from "@react-three/drei";

// ============================================================================
// 1. TỔ HỢP GIẢI PHẪU Ổ BỤNG 3D (MULTI-ORGAN ABDOMINAL HOLOGRAM ASSEMBLY)
// ============================================================================
export interface ColonHologram3DProps {
  progress?: number;
  highlightPolyp?: boolean;
  accentColor?: string;
  polypColor?: string;
  wireframeOpacity?: number;
  scaleMultiplier?: number;
  position?: [number, number, number];
  opacityMultiplier?: number;
}

export const ColonHologram3D: React.FC<ColonHologram3DProps> = ({
  progress = 1,
  highlightPolyp = true,
  accentColor = "#38BDF8",
  polypColor = "#F43F5E",
  wireframeOpacity = 0.25,
  scaleMultiplier = 0.4,
  position = [0, 0, 0],
  opacityMultiplier = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance spring
  const entry = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  // --------------------------------------------------------------------------
  // GEOMETRIES MEMOIZATION
  // --------------------------------------------------------------------------
  const {
    colonCurve,
    smallIntestineCurve,
    stomachCurve,
    polypPosition,
    rectumCurve,
  } = useMemo(() => {
    // 1. Hero Large Intestine (Ascending -> Transverse -> Descending -> Sigmoid)
    const cPoints = [
      new THREE.Vector3(-1.8, -1.8, 0),    // Cecum / Appendix base
      new THREE.Vector3(-2.0, 0.0, 0.1),   // Ascending colon
      new THREE.Vector3(-1.7, 1.4, 0.2),
      new THREE.Vector3(-1.3, 1.8, 0.2),   // Hepatic flexure
      new THREE.Vector3(-0.5, 2.0, -0.1),  // Transverse colon
      new THREE.Vector3(0.5, 1.9, -0.1),
      new THREE.Vector3(1.4, 1.7, 0.15),   // Splenic flexure
      new THREE.Vector3(1.9, 0.2, -0.1),   // Descending colon
      new THREE.Vector3(1.7, -1.2, 0.1),
      new THREE.Vector3(1.3, -1.8, 0.25),  // Sigmoid entrance
    ];
    const cCurve = new THREE.CatmullRomCurve3(cPoints);

    // Transitioning Rectum & Sigmoid section down to lesion
    const rPoints = [
      new THREE.Vector3(1.3, -1.8, 0.25),
      new THREE.Vector3(0.9, -2.1, 0.3),
      new THREE.Vector3(0.4, -2.5, 0.35),  // Rectum canal
    ];
    const rCurve = new THREE.CatmullRomCurve3(rPoints);

    // 2. Small Intestine Sinuous Core (fills the center hollow)
    const sPoints = [
      new THREE.Vector3(0.3, 1.3, 0.1),    // Duodenum exit
      new THREE.Vector3(-0.6, 1.1, 0.2),
      new THREE.Vector3(0.6, 0.8, -0.1),
      new THREE.Vector3(-0.9, 0.5, 0.15),
      new THREE.Vector3(0.8, 0.2, 0.1),
      new THREE.Vector3(-0.8, -0.1, -0.1),
      new THREE.Vector3(0.7, -0.4, 0.2),
      new THREE.Vector3(-0.7, -0.7, 0.1),
      new THREE.Vector3(0.6, -1.0, -0.15),
      new THREE.Vector3(-0.5, -1.3, 0.2),
      new THREE.Vector3(0.1, -1.5, 0.1),
      new THREE.Vector3(-1.5, -1.7, 0.1),  // Ileocecal junction
    ];
    const sCurve = new THREE.CatmullRomCurve3(sPoints);

    // 3. Stomach J-Curve
    const stomPoints = [
      new THREE.Vector3(0.1, 3.0, -0.1),   // Cardia / Esophagus
      new THREE.Vector3(0.8, 2.9, 0.1),    // Fundus
      new THREE.Vector3(1.2, 2.3, 0.0),    // Body
      new THREE.Vector3(0.8, 1.7, 0.1),    // Antrum
      new THREE.Vector3(0.3, 1.4, 0.0),    // Pylorus
    ];
    const stomCurve = new THREE.CatmullRomCurve3(stomPoints);

    return {
      colonCurve: cCurve,
      rectumCurve: rCurve,
      smallIntestineCurve: sCurve,
      stomachCurve: stomCurve,
      polypPosition: [0.4, -2.5, 0.4] as [number, number, number],
    };
  }, []);

  // Continuous subtle 3D rotational float
  const rotY = frame * 0.012 * entry;
  const rotX = Math.sin(frame * 0.03) * 0.06;
  const currentScale = scaleMultiplier * entry * Math.min(progress, 1);

  // Polyp pulsation
  const polypPulse = 1 + (highlightPolyp ? Math.sin(frame * 0.22) * 0.18 : 0);
  const polypEmissiveIntensity = highlightPolyp
    ? (1.8 + Math.sin(frame * 0.22) * 0.9) * opacityMultiplier
    : 0.3 * opacityMultiplier;

  return (
    <group
      position={position}
      scale={currentScale}
      rotation={[rotX, rotY, 0]}
    >
      {/* ==================================================================== */}
      {/* LỚP 3 - KHUNG LƯỚI CƠ THỂ & CỘT SỐNG (TORSO WIREFRAME & SPINE)       */}
      {/* ==================================================================== */}
      {/* 3A. Hologram Torso Contour Cage */}
      <mesh position={[0, 0.2, -0.3]} scale={[1.15, 1, 0.75]}>
        <cylinderGeometry args={[2.8, 2.5, 6.6, 24, 8, true]} />
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.07 * opacityMultiplier}
        />
      </mesh>

      {/* 3B. Vertebral Spine Axis behind abdominal cavity */}
      <group position={[0, 0.2, -1.4]}>
        {Array.from({ length: 9 }).map((_, idx) => (
          <mesh key={idx} position={[0, (idx - 4) * 0.65, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.24, 16]} />
            <meshStandardMaterial
              color="#334155"
              emissive="#1E293B"
              emissiveIntensity={0.2 * opacityMultiplier}
              transparent
              opacity={0.22 * opacityMultiplier}
            />
          </mesh>
        ))}
      </group>

      {/* ==================================================================== */}
      {/* LỚP 2 - GAN & DẠ DÀY PHÍA TRÊN (UPPER ORGANS: LIVER & STOMACH)       */}
      {/* ==================================================================== */}
      {/* 2A. Liver (Gan - Bên phải giải phẫu / Trái màn hình) */}
      <group position={[-1.35, 2.35, -0.2]} rotation={[0.15, 0.1, -0.25]}>
        <mesh scale={[1.6, 0.95, 0.9]}>
          <sphereGeometry args={[0.85, 32, 24]} />
          <MeshDistortMaterial
            color="#0D9488"
            emissive="#042F2E"
            emissiveIntensity={0.4 * opacityMultiplier}
            distort={0.15}
            speed={0}
            roughness={0.35}
            transparent
            opacity={0.3 * opacityMultiplier}
          />
        </mesh>
        {/* Liver outer subtle wireframe grid */}
        <mesh scale={[1.63, 0.98, 0.93]}>
          <sphereGeometry args={[0.85, 16, 12]} />
          <meshBasicMaterial
            color="#0D9488"
            wireframe
            transparent
            opacity={0.12 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* 2B. Stomach (Dạ dày - Bên trái giải phẫu / Phải màn hình, chữ J phình) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[stomachCurve, 48, 0.32, 16, false]} />
          <meshPhysicalMaterial
            color="#0284C7"
            transmission={0.65}
            roughness={0.25}
            metalness={0.1}
            emissive="#0369A1"
            emissiveIntensity={0.25 * opacityMultiplier}
            transparent
            opacity={0.32 * opacityMultiplier}
          />
        </mesh>
        <mesh>
          <tubeGeometry args={[stomachCurve, 48, 0.32, 10, false]} />
          <meshBasicMaterial
            color="#38BDF8"
            wireframe
            transparent
            opacity={0.12 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* LỚP 1 - RUỘT NON CUỘN XOẮN Ở TRUNG TÂM (SMALL INTESTINE CORE)         */}
      {/* ==================================================================== */}
      <group position={[0, 0, 0]}>
        {/* Physical translucent small intestine meanders */}
        <mesh>
          <tubeGeometry args={[smallIntestineCurve, 120, 0.16, 14, false]} />
          <meshPhysicalMaterial
            color="#0284C7"
            transmission={0.7}
            roughness={0.2}
            metalness={0.1}
            emissive="#0369A1"
            emissiveIntensity={0.35 * opacityMultiplier}
            transparent
            opacity={0.38 * opacityMultiplier}
          />
        </mesh>
        {/* Fine wireframe mesh layer */}
        <mesh>
          <tubeGeometry args={[smallIntestineCurve, 120, 0.165, 8, false]} />
          <meshBasicMaterial
            color="#00F0FF"
            wireframe
            transparent
            opacity={0.16 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* LỚP 4 - ĐẠI TRỰC TRÀNG & KHỐI U (HERO HIGHLIGHTED ORGAN)             */}
      {/* ==================================================================== */}
      {/* 4A. Colon Ascending, Transverse, Descending */}
      <group position={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[colonCurve, 84, 0.34, 18, false]} />
          <meshPhysicalMaterial
            color={accentColor}
            transmission={0.6}
            roughness={0.12}
            metalness={0.15}
            emissive={accentColor}
            emissiveIntensity={0.8 * opacityMultiplier}
            transparent
            opacity={0.85 * opacityMultiplier}
          />
        </mesh>
        {/* Outer Sci-Fi Wireframe Scan Grid */}
        <mesh>
          <tubeGeometry args={[colonCurve, 84, 0.35, 12, false]} />
          <meshBasicMaterial
            color={accentColor}
            wireframe
            transparent
            opacity={wireframeOpacity * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* 4B. Sigmoid & Rectum (Transitions to warning red-rose #F43F5E) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[rectumCurve, 32, 0.32, 18, false]} />
          <meshPhysicalMaterial
            color="#F43F5E"
            transmission={0.55}
            roughness={0.15}
            metalness={0.2}
            emissive="#E11D48"
            emissiveIntensity={1.0 * opacityMultiplier}
            transparent
            opacity={0.88 * opacityMultiplier}
          />
        </mesh>
        <mesh>
          <tubeGeometry args={[rectumCurve, 32, 0.33, 12, false]} />
          <meshBasicMaterial
            color="#F43F5E"
            wireframe
            transparent
            opacity={0.4 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* 4C. Pulsating Warning Tumor Lesion at Rectum */}
      <group position={polypPosition} scale={polypPulse}>
        <mesh>
          <sphereGeometry args={[0.26, 32, 32]} />
          <MeshDistortMaterial
            color={polypColor}
            emissive={polypColor}
            emissiveIntensity={polypEmissiveIntensity}
            distort={0.38}
            speed={0}
            roughness={0.18}
          />
        </mesh>

        {/* Pulsing Warning Halo Ring */}
        {highlightPolyp && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.34, 0.44, 32]} />
            <meshBasicMaterial
              color={polypColor}
              transparent
              opacity={(0.7 + Math.sin(frame * 0.22) * 0.3) * opacityMultiplier}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

// ============================================================================
// 2. ENDOSCOPY SIMULATION 3D (Mô phỏng nội soi cắt polyp bằng laser)
// ============================================================================
export interface EndoscopySimulation3DProps {
  cutProgress?: number; // 0 to 1
  accentColor?: string;
  scale?: number;
}

export const EndoscopySimulation3D: React.FC<EndoscopySimulation3DProps> = ({
  cutProgress = 0,
  accentColor = "#00f0ff",
  scale = 0.42,
}) => {
  const frame = useCurrentFrame();

  // Mucosal gut wall background curve
  const wallGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(3.2, 3.2, 6, 32, 1, true, -Math.PI / 2, Math.PI);
  }, []);

  // Endoscope probe translation towards target
  const probeZ = interpolate(cutProgress, [0, 0.4, 1], [-3.8, -1.8, -1.8], {
    extrapolateRight: "clamp",
  });

  // Laser activation: active between cutProgress 0.25 and 0.85
  const isLaserActive = cutProgress >= 0.2 && cutProgress <= 0.85;
  const laserOpacity = isLaserActive
    ? 0.75 + Math.sin(frame * 0.6) * 0.25
    : 0;

  // Polyp detachment: capped at max 0.7 units so it never breaches upper HUD cards
  const polypLiftY = interpolate(cutProgress, [0.5, 1], [0, 0.7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const polypScale = interpolate(cutProgress, [0.5, 1], [1, 0.4], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <group scale={scale} rotation={[0.15, 0, 0]}>
      {/* Organic Intestinal Mucosal Wall */}
      <mesh geometry={wallGeometry} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhysicalMaterial
          color="#be185d"
          roughness={0.45}
          metalness={0.05}
          transmission={0.15}
          emissive="#831843"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Target Polyp Tissue on Mucosa (Max lift capped at 0.7) */}
      <group position={[0, -0.6 + polypLiftY, -0.2]} scale={polypScale}>
        <mesh>
          <sphereGeometry args={[0.38, 32, 32]} />
          <MeshDistortMaterial
            color={cutProgress > 0.5 ? "#fbbf24" : "#ef4444"}
            emissive={cutProgress > 0.5 ? "#f59e0b" : "#dc2626"}
            emissiveIntensity={isLaserActive ? 1.6 : 0.4}
            distort={0.35}
            speed={0}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Endoscope Tube & Camera Head */}
      <group position={[0, -0.6, probeZ]}>
        {/* Metal Endoscope Shaft */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 3.5, 24]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Optical Tip Ring */}
        <mesh position={[0, 0, 1.76]}>
          <ringGeometry args={[0.16, 0.24, 24]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>

        {/* 3D Cyan Surgical Laser Beam */}
        {isLaserActive && (
          <mesh position={[0, 0, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 16]} />
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={laserOpacity}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

// ============================================================================
// 3. BIO SHIELD 3D (Khiên bảo vệ y tế đa diện 2 lớp)
// ============================================================================
export interface BioShield3DProps {
  progress?: number;
  accentColor?: string;
  radius?: number;
  scaleMultiplier?: number;
}

export const BioShield3D: React.FC<BioShield3DProps> = ({
  progress = 1,
  accentColor = "#38bdf8",
  radius = 1.4,
  scaleMultiplier = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const scale = entry * progress * scaleMultiplier;

  // Counter-rotating dual layers
  const innerRotX = frame * 0.015;
  const innerRotY = frame * 0.02;
  const outerRotX = -frame * 0.018;
  const outerRotY = -frame * 0.015;

  return (
    <group scale={scale}>
      {/* Inner Faceted Holographic Core */}
      <mesh rotation={[innerRotX, innerRotY, 0]}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshPhysicalMaterial
          color={accentColor}
          transmission={0.72}
          roughness={0.1}
          metalness={0.15}
          emissive={accentColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer Protective Glowing Wireframe Cage */}
      <mesh rotation={[outerRotX, outerRotY, 0]}>
        <icosahedronGeometry args={[radius * 1.22, 1]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Equatorial Energy Ring */}
      <mesh rotation={[Math.PI / 3, frame * 0.025, 0]}>
        <torusGeometry args={[radius * 1.38, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={accentColor}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
};

// ============================================================================
// 4. DNA STRAND 3D (Chuỗi xoắn kép DNA 3D tham số hóa)
// ============================================================================
export interface DNAStrand3DProps {
  rungsCount?: number;
  radius?: number;
  heightStep?: number;
  accentColor?: string;
  secondaryColor?: string;
}

export const DNAStrand3D: React.FC<DNAStrand3DProps> = ({
  rungsCount = 18,
  radius = 1.1,
  heightStep = 0.22,
  accentColor = "#38bdf8",
  secondaryColor = "#ec4899",
}) => {
  const frame = useCurrentFrame();

  const rungs = useMemo(() => {
    return Array.from({ length: rungsCount }).map((_, i) => {
      const baseY = (i - rungsCount / 2) * heightStep;
      const baseAngle = i * 0.38;
      return { id: i, baseY, baseAngle };
    });
  }, [rungsCount, heightStep]);

  return (
    <group>
      {rungs.map((r) => {
        const theta = r.baseAngle + frame * 0.025;
        const x1 = Math.cos(theta) * radius;
        const z1 = Math.sin(theta) * radius;
        const x2 = -x1;
        const z2 = -z1;
        const y = r.baseY;

        return (
          <group key={r.id}>
            {/* Nucleotide Node 1 */}
            <mesh position={[x1, y, z1]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>

            {/* Connecting Base Pair Rung */}
            <mesh position={[0, y, 0]} rotation={[0, -theta, Math.PI / 2]}>
              <cylinderGeometry args={[0.028, 0.028, radius * 2, 12]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>

            {/* Nucleotide Node 2 */}
            <mesh position={[x2, y, z2]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ============================================================================
// 5. BLOOD CELL STREAM 3D (Dòng chảy hồng cầu 3D trong không gian)
// ============================================================================
export interface BloodCellStream3DProps {
  count?: number;
  flowSpeed?: number;
  cellColor?: string;
}

export const BloodCellStream3D: React.FC<BloodCellStream3DProps> = ({
  count = 18,
  flowSpeed = 0.035,
  cellColor = "#dc2626",
}) => {
  const frame = useCurrentFrame();

  const cells = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed = i + 1;
      const posX = ((seed * 73) % 40) / 10 - 2.0;
      const posZ = ((seed * 47) % 30) / 10 - 1.5;
      const initialY = ((seed * 91) % 60) / 10 - 3.0;
      const rotSpeedX = 0.02 + ((seed * 13) % 20) * 0.001;
      const rotSpeedY = 0.015 + ((seed * 29) % 20) * 0.001;
      const scale = 0.75 + ((seed * 37) % 30) * 0.01;
      return { id: i, posX, posZ, initialY, rotSpeedX, rotSpeedY, scale };
    });
  }, [count]);

  return (
    <group>
      {cells.map((c) => {
        const range = 7.0;
        const currentY = ((c.initialY + frame * flowSpeed + 3.5) % range) - 3.5;
        const rotX = frame * c.rotSpeedX;
        const rotY = frame * c.rotSpeedY;

        return (
          <group
            key={c.id}
            position={[c.posX, currentY, c.posZ]}
            rotation={[rotX, rotY, 0]}
            scale={[c.scale, c.scale * 0.35, c.scale]}
          >
            <mesh>
              <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
              <meshStandardMaterial
                color={cellColor}
                emissive="#7f1d1d"
                emissiveIntensity={0.3}
                roughness={0.25}
                metalness={0.1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
