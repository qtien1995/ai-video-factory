import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface XRayDigestiveHologramProps {
  progress?: number;
  highlightTumor?: boolean;
  accentColor?: string;
  tumorColor?: string;
  showCallout?: boolean;
  scale?: number;
  width?: number;
  height?: number;
}

/**
 * XRayDigestiveHologram — Medical-Grade 2.5D X-Ray Hologram Component
 *
 * Replaces crude cylinder/tube procedural geometry with a high-fidelity
 * semi-transparent anatomical X-Ray medical visualization:
 * - Luminescent Torso Silhouette with translucent ribcage & spine
 * - Anatomically accurate Stomach, Liver, Small Intestine, and Colon (with haustra folds)
 * - Pulsing Cancer Hotspot in the Rectum / Sigmoid region
 * - Sweeping X-Ray laser scan beam & medical telemetry grid
 */
export const XRayDigestiveHologram: React.FC<XRayDigestiveHologramProps> = ({
  progress = 1,
  highlightTumor = true,
  accentColor = "#38BDF8",
  tumorColor = "#EF4444",
  showCallout = true,
  scale = 1.0,
  width = 680,
  height = 700,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entry = spring({
    frame,
    fps,
    config: { mass: 0.9, damping: 18, stiffness: 110 },
  });

  // Natural biological breathing & micro-tilt
  const breathY = Math.sin(frame * 0.04) * 6;
  const breathScale = 1 + Math.sin(frame * 0.03) * 0.015;
  const tiltDeg = Math.sin(frame * 0.025) * 0.8;

  // Vertical X-Ray laser scanline cycle
  const scanProgress = (frame * 3.5) % height;

  // Tumor pulsation waves
  const pulse1 = (frame * 0.1) % 1;
  const pulseScale = 1 + Math.sin(frame * 0.22) * 0.25;
  const pulseOpacity = interpolate(pulse1, [0, 0.7, 1], [0.8, 0.3, 0]);

  // Overall opacity based on progress
  const masterOpacity = Math.min(entry * progress, 1);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200,
        opacity: masterOpacity,
        transform: `translateY(${breathY}px) scale(${scale * breathScale}) rotateY(${tiltDeg}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* -------------------------------------------------------------------- */}
      {/* 1. ATMOSPHERIC HOLOGRAPHIC GLOW & SCANNING LASER                    */}
      {/* -------------------------------------------------------------------- */}
      <div
        style={{
          position: "absolute",
          width: "90%",
          height: "85%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 75%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Sweeping Laser Scan Line */}
      <div
        style={{
          position: "absolute",
          top: scanProgress,
          left: 40,
          right: 40,
          height: 3,
          background: "linear-gradient(90deg, transparent 5%, rgba(56, 189, 248, 0.8) 25%, #ffffff 50%, rgba(56, 189, 248, 0.8) 75%, transparent 95%)",
          boxShadow: "0 0 16px rgba(56, 189, 248, 0.9), 0 0 30px rgba(56, 189, 248, 0.5)",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      />

      {/* -------------------------------------------------------------------- */}
      {/* 2. HIGH-DETAIL ANATOMICAL SVG VECTOR STACK                          */}
      {/* -------------------------------------------------------------------- */}
      <svg
        viewBox="0 0 680 720"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          filter: "drop-shadow(0 0 18px rgba(56, 189, 248, 0.25))",
        }}
      >
        <defs>
          {/* Hologram Fresnel Blue Linear Gradient */}
          <linearGradient id="xrayBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.22" />
          </linearGradient>

          {/* Colon Organic Wall Gradient */}
          <linearGradient id="colonWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
          </linearGradient>

          {/* Cancer Hotspot Radial Glow */}
          <radialGradient id="tumorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
            <stop offset="40%" stopColor="#DC2626" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#991B1B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>

          {/* Hexagon Blueprint Pattern */}
          <pattern id="bioHexGrid" width="28" height="48.5" patternUnits="userSpaceOnUse">
            <path
              d="M 14,0 L 28,8 L 28,24 L 14,32 L 0,24 L 0,8 Z M 14,48.5 L 28,40.5 L 28,24.5 L 14,32.5 L 0,24.5 L 0,40.5 Z"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.6"
              strokeOpacity="0.12"
            />
          </pattern>
        </defs>

        {/* 2A. Background Medical Hexagonal Mesh */}
        <rect x="60" y="30" width="560" height="660" fill="url(#bioHexGrid)" />

        {/* ------------------------------------------------------------------ */}
        {/* 2B. TORSO SILHOUETTE & SKELETAL FRAMEWORK (X-RAY CONTOUR)          */}
        {/* ------------------------------------------------------------------ */}
        {/* Human Body Outer Contour */}
        <path
          d="M 230 40 
             C 270 30, 410 30, 450 40 
             C 490 60, 560 140, 570 240 
             C 580 340, 510 400, 500 480 
             C 490 560, 530 640, 510 700 
             L 170 700 
             C 150 640, 190 560, 180 480 
             C 170 400, 100 340, 110 240 
             C 120 140, 190 60, 230 40 Z"
          fill="url(#xrayBodyGrad)"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeOpacity="0.4"
          strokeDasharray="8 4"
        />

        {/* Translucent Ribcage (Xương sườn lồng ngực) */}
        {[0, 1, 2, 3, 4].map((i) => {
          const yOff = 120 + i * 36;
          const wOff = 160 + i * 16;
          return (
            <g key={`rib-${i}`} opacity="0.35">
              <path
                d={`M 340 ${yOff} C 280 ${yOff - 10}, ${340 - wOff} ${yOff + 25}, ${320 - wOff} ${yOff + 50}`}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d={`M 340 ${yOff} C 400 ${yOff - 10}, ${340 + wOff} ${yOff + 25}, ${360 + wOff} ${yOff + 50}`}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Vertebral Spine (Cột sống trung tâm thanh thoát) */}
        <line x1="340" y1="60" x2="340" y2="670" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.4" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((j) => (
          <rect
            key={`vert-${j}`}
            x="332"
            y={80 + j * 48}
            width="16"
            height="18"
            rx="4"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
        ))}

        {/* Pelvic Basin (Khung chậu X-ray) */}
        <path
          d="M 210 570 C 260 630, 420 630, 470 570 C 490 650, 410 685, 340 685 C 270 685, 190 650, 210 570 Z"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeOpacity="0.35"
        />

        {/* ------------------------------------------------------------------ */}
        {/* 2C. UPPER DIGESTIVE TRACT (LIVER & STOMACH)                        */}
        {/* ------------------------------------------------------------------ */}
        {/* Esophagus (Thực quản đi từ họng xuống dạ dày) */}
        <path
          d="M 334 40 L 334 165 C 334 185, 310 200, 310 220"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />

        {/* Liver (Gan - Bên phải giải phẫu / Trái màn hình) */}
        <path
          d="M 220 220 
             C 210 180, 310 180, 335 210 
             C 345 250, 330 300, 315 315 
             C 270 330, 210 300, 220 220 Z"
          fill="rgba(13, 148, 136, 0.25)"
          stroke="#14B8A6"
          strokeWidth="2"
          strokeOpacity="0.6"
        />
        <text x="245" y="260" fill="#14B8A6" fontSize="13" fontWeight="800" letterSpacing="1.5" opacity="0.8">
          GAN (LIVER)
        </text>

        {/* Stomach (Dạ dày chữ J phát sáng sinh học) */}
        <path
          d="M 310 215 
             C 325 210, 395 210, 410 250 
             C 425 295, 390 350, 345 350 
             C 315 350, 320 315, 335 305 
             C 365 295, 375 255, 345 245 
             C 330 240, 315 240, 310 215 Z"
          fill="rgba(56, 189, 248, 0.28)"
          stroke="#38BDF8"
          strokeWidth="2.8"
          strokeOpacity="0.85"
        />
        <text x="355" y="290" fill="#7DD3FC" fontSize="13" fontWeight="800" letterSpacing="1.5" opacity="0.85">
          DẠ DÀY
        </text>

        {/* ------------------------------------------------------------------ */}
        {/* 2D. SMALL INTESTINE (RUỘT NON TRUNG TÂM KHỐI Ổ BỤNG)                */}
        {/* ------------------------------------------------------------------ */}
        <g opacity="0.55">
          {/* Anatomical coils of jejunum and ileum */}
          <path
            d="M 345 350 
               C 320 365, 370 380, 340 395 
               C 310 410, 370 425, 335 440 
               C 300 455, 365 470, 330 485 
               C 305 500, 355 515, 325 530 
               C 295 545, 270 540, 255 520"
            fill="none"
            stroke="#0284C7"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.4"
          />
          {/* Inner mucosa ridges */}
          <path
            d="M 345 350 
               C 320 365, 370 380, 340 395 
               C 310 410, 370 425, 335 440 
               C 300 455, 365 470, 330 485 
               C 305 500, 355 515, 325 530 
               C 295 545, 270 540, 255 520"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.75"
          />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* 2E. HERO LARGE INTESTINE / COLON (ĐẠI TRÀNG VỚI MÚI PHÌNH HAUSTRA)  */}
        {/* ------------------------------------------------------------------ */}
        {/*
          Anatomical path:
          1. Cecum & Appendix (Manh tràng & Ruột thừa - dưới bên phải giải phẫu / trái ảnh: x: 235, y: 535)
          2. Ascending Colon (Đại tràng lên: x: 220..235, y: 535 -> 320)
          3. Hepatic Flexure (Góc gan: x: 240, y: 310)
          4. Transverse Colon (Đại tràng ngang cong nhẹ: x: 240 -> 440, y: 310 -> 320)
          5. Splenic Flexure (Góc lách: x: 450, y: 315)
          6. Descending Colon (Đại tràng xuống: x: 455..440, y: 320 -> 520)
          7. Sigmoid Colon (Đại tràng Sigma cong chữ S: x: 440 -> 360, y: 520 -> 590)
          8. Rectum (Trực tràng hướng xuống: x: 360 -> 345, y: 590 -> 660)
        */}
        <g id="heroColon">
          {/* Base Thick Tube with Haustra Segment Bulges */}
          <path
            d="M 235 565 
               C 220 545, 220 480, 222 430
               C 224 380, 225 340, 245 315
               C 270 295, 310 325, 345 325
               C 385 325, 420 295, 445 315
               C 465 335, 465 390, 460 440
               C 455 490, 455 530, 430 560
               C 405 590, 360 575, 350 615
               C 345 635, 345 660, 345 675"
            fill="none"
            stroke="url(#colonWallGrad)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.45"
          />

          {/* Glowing Outer High-Tech Outline with Haustra notches */}
          <path
            d="M 235 565 
               C 220 545, 220 480, 222 430
               C 224 380, 225 340, 245 315
               C 270 295, 310 325, 345 325
               C 385 325, 420 295, 445 315
               C 465 335, 465 390, 460 440
               C 455 490, 455 530, 430 560
               C 405 590, 360 575, 350 615
               C 345 635, 345 660, 345 675"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.95"
            style={{
              filter: "drop-shadow(0 0 10px #00F0FF)",
            }}
          />

          {/* Anatomical Haustra Cross-Ribs (Các rãnh thắt múi đại tràng) */}
          {[
            { x1: 206, y1: 520, x2: 238, y2: 520 },
            { x1: 206, y1: 470, x2: 238, y2: 470 },
            { x1: 207, y1: 420, x2: 239, y2: 420 },
            { x1: 210, y1: 370, x2: 240, y2: 370 },
            { x1: 260, y1: 295, x2: 260, y2: 328 },
            { x1: 300, y1: 308, x2: 300, y2: 340 },
            { x1: 345, y1: 308, x2: 345, y2: 340 },
            { x1: 390, y1: 308, x2: 390, y2: 340 },
            { x1: 430, y1: 295, x2: 430, y2: 328 },
            { x1: 445, y1: 370, x2: 475, y2: 370 },
            { x1: 445, y1: 420, x2: 475, y2: 420 },
            { x1: 442, y1: 470, x2: 474, y2: 470 },
            { x1: 430, y1: 520, x2: 462, y2: 520 },
            { x1: 385, y1: 565, x2: 410, y2: 588 },
            { x1: 335, y1: 605, x2: 365, y2: 605 },
            { x1: 330, y1: 645, x2: 360, y2: 645 },
          ].map((bar, idx) => (
            <line
              key={`haustra-${idx}`}
              x1={bar.x1}
              y1={bar.y1}
              x2={bar.x2}
              y2={bar.y2}
              stroke="#E0F2FE"
              strokeWidth="2"
              strokeOpacity="0.75"
            />
          ))}

          {/* Appendix (Ruột thừa) */}
          <path
            d="M 235 570 C 230 595, 215 605, 205 600"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* 2F. CANCER HOTSPOT / MALIGNANT LESION (VÙNG TỔN THƯƠNG ĐẠI TRỰC TRÀNG)*/}
        {/* ------------------------------------------------------------------ */}
        {highlightTumor && (
          <g id="malignantHotspot">
            {/* Outward Radar Pulse Wave 1 */}
            <circle
              cx="352"
              cy="615"
              r={24 + pulse1 * 36}
              fill="none"
              stroke={tumorColor}
              strokeWidth="2.5"
              opacity={pulseOpacity}
            />

            {/* Outward Radar Pulse Wave 2 */}
            <circle
              cx="352"
              cy="615"
              r={16 + ((pulse1 + 0.5) % 1) * 36}
              fill="none"
              stroke="#F43F5E"
              strokeWidth="1.8"
              opacity={interpolate((pulse1 + 0.5) % 1, [0, 0.7, 1], [0.8, 0.3, 0])}
            />

            {/* Glowing Danger Aura */}
            <circle cx="352" cy="615" r="28" fill="url(#tumorGlow)" />

            {/* Core Tumor Mass (Khối u ác tính với hình thái biến dạng) */}
            <g transform={`translate(352, 615) scale(${pulseScale}) translate(-352, -615)`}>
              <circle
                cx="352"
                cy="615"
                r="13"
                fill="#EF4444"
                stroke="#FEE2E2"
                strokeWidth="2.5"
                style={{
                  filter: "drop-shadow(0 0 16px #EF4444) drop-shadow(0 0 30px #EF4444)",
                }}
              />
              <circle cx="352" cy="615" r="5" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* ---------------------------------------------------------------- */}
            {/* 2G. HIGH-TECH CALLOUT POINTER LINE & TAG                          */}
            {/* ---------------------------------------------------------------- */}
            {showCallout && (
              <g id="calloutTag">
                {/* Pointer angled trajectory */}
                <path
                  d="M 368 615 L 435 615 L 485 585 L 565 585"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  opacity="0.95"
                />
                {/* Joint Node */}
                <circle cx="485" cy="585" r="4" fill="#EF4444" />
                <circle cx="565" cy="585" r="4" fill="#EF4444" />

                {/* Callout Info Badge */}
                <g transform="translate(435, 540)">
                  <rect
                    x="0"
                    y="0"
                    width="215"
                    height="38"
                    rx="8"
                    fill="rgba(15, 23, 42, 0.94)"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    style={{ filter: "drop-shadow(0 4px 15px rgba(239, 68, 68, 0.45))" }}
                  />
                  {/* Warning Dot */}
                  <circle cx="16" cy="19" r="5" fill="#EF4444" />
                  <text
                    x="30"
                    y="24"
                    fill="#FEE2E2"
                    fontSize="13"
                    fontWeight="900"
                    letterSpacing="1"
                    fontFamily="monospace"
                  >
                    TỔN THƯƠNG ĐẠI TRÀNG
                  </text>
                </g>
              </g>
            )}
          </g>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 2H. TELEMETRY HUD LABELS (GÓC MÀN HÌNH CHUẨN X-RAY BỆNH VIỆN)        */}
        {/* ------------------------------------------------------------------ */}
        <text x="80" y="75" fill="#38BDF8" fontSize="12" fontWeight="700" letterSpacing="2" opacity="0.65" fontFamily="monospace">
          SCAN // MODALITY: BIO-XRAY 3D
        </text>
        <text x="80" y="95" fill="#94A3B8" fontSize="11" opacity="0.5" fontFamily="monospace">
          TARGET: COLON & RECTUM AXIS
        </text>

        <text x="470" y="75" fill="#38BDF8" fontSize="12" fontWeight="700" letterSpacing="2" opacity="0.65" fontFamily="monospace">
          FOV: 42° // 1080x1920
        </text>
        <text x="470" y="95" fill="#10B981" fontSize="11" fontWeight="700" opacity="0.8" fontFamily="monospace">
          STATUS: ACTIVE TRACKING
        </text>
      </svg>
    </div>
  );
};
