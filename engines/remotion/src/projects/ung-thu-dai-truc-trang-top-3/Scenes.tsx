import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Helper for animated counter
const countUp = (
  frame: number,
  startFrame: number,
  duration: number,
  target: number
): number => {
  const val = interpolate(frame, [startFrame, startFrame + duration], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(val);
};

// ============================================================================
// ANIMATED COLON & RECTUM VECTOR ILLUSTRATION (Scene 1)
// ============================================================================
export const ColonAnatomyIllustration: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.12) * 0.15 + 0.85;
  const scanY = 120 + ((frame * 3) % 340);

  const colonPath =
    "M 130 390 C 120 310, 120 210, 130 150 C 135 120, 160 105, 190 110 C 230 115, 270 115, 310 110 C 340 105, 365 120, 370 150 C 380 210, 380 300, 370 350 C 360 390, 320 420, 275 410 C 255 405, 250 425, 250 470";

  const totalLength = 1100;
  const strokeDashoffset = totalLength * (1 - Math.min(progress, 1));

  return (
    <div
      style={{
        position: "relative",
        width: 380,
        height: 380,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="80 70 340 430"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="colonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="1" />
          </linearGradient>

          <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Background Ghost Path */}
        <path
          d={colonPath}
          fill="none"
          stroke="rgba(30, 41, 59, 0.7)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Inner Track Guide */}
        <path
          d={colonPath}
          fill="none"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Dynamic Animated Neon Tracing Stroke */}
        <path
          d={colonPath}
          fill="none"
          stroke="url(#colonGlow)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
          filter="url(#neonBlur)"
        />

        {/* 4. Scanning laser plane line */}
        <line
          x1="80"
          y1={scanY}
          x2="420"
          y2={scanY}
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />

        {/* 5. Highlight & Crosshair Target on Rectum */}
        {progress > 0.6 && (
          <g transform="translate(250, 460)">
            <circle
              r={36 * pulse}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              opacity={0.4}
            />
            <circle
              r={22 * pulse}
              fill="rgba(239, 68, 68, 0.2)"
              stroke="#EF4444"
              strokeWidth="3"
            />
            <circle r="9" fill="#EF4444" filter="url(#neonBlur)" />

            <line x1="-30" y1="0" x2="-14" y2="0" stroke="#FCA5A5" strokeWidth="2" />
            <line x1="14" y1="0" x2="30" y2="0" stroke="#FCA5A5" strokeWidth="2" />
            <line x1="0" y1="-30" x2="0" y2="-14" stroke="#FCA5A5" strokeWidth="2" />
            <line x1="0" y1="14" x2="0" y2="30" stroke="#FCA5A5" strokeWidth="2" />

            <rect
              x="-90"
              y="38"
              width="180"
              height="34"
              rx="8"
              fill="rgba(239, 68, 68, 0.9)"
            />
            <text
              x="0"
              y="60"
              fill="#FFFFFF"
              fontSize="16"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              VỊ TRÍ TRỰC TRÀNG
            </text>
          </g>
        )}

        <text
          x="250"
          y="80"
          fill="#94A3B8"
          fontSize="15"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="1.5"
          fontFamily="system-ui, sans-serif"
        >
          KHUNG ĐẠI TRÀNG
        </text>
      </svg>
    </div>
  );
};

// ============================================================================
// ANIMATED ENDOSCOPY ESD MICROSURGERY SIMULATION (Scene 4 Visual Metaphor)
// ============================================================================
export const EndoscopyESDMicroAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  // Knife / snare cut progress from frame 30 to 80
  const cutProgress = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const polypLift = interpolate(cutProgress, [0.7, 1], [0, -35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const polypOpacity = interpolate(cutProgress, [0.85, 1], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beamPulse = Math.sin(frame * 0.4) * 0.2 + 0.8;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 920,
        height: 240,
        backgroundColor: "rgba(11, 19, 36, 0.85)",
        border: "2px solid rgba(16, 185, 129, 0.5)",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Header bar of microscope HUD */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 10px #10B981",
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 800, color: "#34D399", letterSpacing: 1.5 }}>
            MÔ PHỎNG NỘI SOI CẮT TÁCH NIÊM MẠC (ESD)
          </span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#94A3B8", fontFamily: "monospace" }}>
          MAG: 10X · HD ENDOSCOPY
        </span>
      </div>

      {/* SVG Cross-section Animation */}
      <div style={{ flex: 1, position: "relative" }}>
        <svg viewBox="0 0 700 170" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="mucosaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E11D48" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Deep Muscular Layer (Lớp cơ đáy được bảo tồn nguyên vẹn) */}
          <rect x="0" y="115" width="700" height="55" fill="url(#muscleGrad)" />
          <line x1="0" y1="115" x2="700" y2="115" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="20" y="145" fill="#64748B" fontSize="13" fontWeight="700">
            LỚP CƠ THÀNH RUỘT (ĐƯỢC BẢO TỒN NGUYÊN VẸN 100%)
          </text>

          {/* Mucosa Tissue Base */}
          <path
            d="M 0 115 L 0 75 Q 180 75, 270 75 Q 350 75, 430 75 L 700 75 L 700 115 Z"
            fill="url(#mucosaGrad)"
          />

          {/* Polyp lesion being detached */}
          <g transform={`translate(0, ${polypLift})`} opacity={polypOpacity}>
            {/* The elevated polyp dome */}
            <path
              d="M 285 75 C 285 30, 320 18, 350 18 C 380 18, 415 30, 415 75 Z"
              fill="#E11D48"
              stroke="#FDA4AF"
              strokeWidth="2.5"
            />
            {/* Target label inside polyp */}
            <text x="350" y="52" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle">
              POLYP TIỀN UNG THƯ
            </text>
          </g>

          {/* Endoscopic Probe Catheter coming from the left */}
          <g transform={`translate(${interpolate(cutProgress, [0, 1], [-20, 110])}, 0)`}>
            {/* Probe body */}
            <rect x="120" y="65" width="160" height="12" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Knife tip */}
            <polygon points="280,71 292,67 292,75" fill="#38BDF8" />

            {/* Laser energy arc cutting under the polyp */}
            {cutProgress > 0.1 && cutProgress < 0.9 && (
              <circle
                cx="292"
                cy="71"
                r={9 * beamPulse}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3"
                opacity={0.8}
              />
            )}
          </g>

          {/* Separation Clean Cut Line */}
          {cutProgress > 0.3 && (
            <path
              d={`M 290 75 L ${290 + cutProgress * 120} 75`}
              stroke="#34D399"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          )}

          {/* Success Callout Badge when cut finishes */}
          {cutProgress >= 0.8 && (
            <g transform="translate(480, 40)">
              <rect x="0" y="0" width="200" height="34" rx="8" fill="rgba(16, 185, 129, 0.9)" />
              <text x="100" y="22" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">
                ✓ ĐÃ BÓC TÁCH TRIỆT ĐỂ
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

// ============================================================================
// CONTINUOUS MEDICAL TELEMETRY HUD & ECG PULSE LINE (Feature #4: Continuity)
// ============================================================================
export const GlobalBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.05) * 0.1 + 0.9;
  const scanLine = (frame * 4) % 1920;

  // ECG Heartbeat offset
  const ecgOffset = (frame * 6) % 1080;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#060A14",
        backgroundImage: "radial-gradient(circle at 50% 30%, #0F172A 0%, #060A14 85%)",
        overflow: "hidden",
      }}
    >
      {/* High-tech Blueprint Grid with subtle parallax */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${Math.sin(frame * 0.02) * 8}px)`,
        }}
      />

      {/* Atmospheric Medical Pulsing Glow */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: "50%",
          transform: `translateX(-50%) scale(${pulse})`,
          width: 950,
          height: 950,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Horizontal Telemetry Scanline */}
      <div
        style={{
          position: "absolute",
          top: scanLine,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), transparent)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Bottom Continuous ECG Pulse Wave (Feature #4: Seamless Continuity) */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          height: 40,
          opacity: 0.25,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg viewBox="0 0 1080 40" style={{ width: "100%", height: "100%" }}>
          <path
            d="M 0 20 L 400 20 L 415 5 L 430 35 L 445 10 L 460 25 L 475 20 L 1080 20"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="8 4"
            style={{ transform: `translateX(${-ecgOffset}px)` }}
          />
        </svg>
      </div>

      {/* Top Header / Eyebrow HUD */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          paddingBottom: 16,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#EF4444",
              boxShadow: "0 0 12px #EF4444",
            }}
          />
          <span
            style={{
              color: "#F8FAFC",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Y TẾ & SỨC KHỎE CỘNG ĐỒNG
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 8,
            padding: "6px 14px",
            color: "#FCA5A5",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.5,
            fontFamily: "system-ui, monospace",
          }}
        >
          GLOBOCAN 2024
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 1: HOOK — BÁO ĐỘNG ĐỎ VỚI HÌNH VẼ TRỰC TRÀNG SVG & ĐẾM SỐ (0 -> 431)
// ============================================================================
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  const isPhase2 = frame >= 210;
  const phase2Progress = spring({
    frame: frame - 210,
    fps,
    config: { damping: 18, stiffness: 140 },
  });

  const countMacMoi = countUp(frame, 15, 60, 177404);
  const countTuVong = countUp(frame, 25, 60, 111015);
  const colonProgress = spring({
    frame: frame - 10,
    fps,
    config: { mass: 1, damping: 20, stiffness: 80 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enterSpring,
        transform: `translateY(${interpolate(enterSpring, [0, 1], [40, 0])}px)`,
      }}
    >
      {!isPhase2 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              borderRadius: 100,
              padding: "8px 22px",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#EF4444",
                boxShadow: "0 0 10px #EF4444",
              }}
            />
            <span
              style={{
                color: "#FCA5A5",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              CẢNH BÁO KHẨN CẤP
            </span>
          </div>

          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "#94A3B8",
              letterSpacing: 1,
              marginBottom: 6,
            }}
          >
            UNG THƯ ĐẠI TRỰC TRÀNG
          </div>

          <div
            style={{
              fontSize: 105,
              fontWeight: 950,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: -2,
              textShadow: "0 0 40px rgba(239, 68, 68, 0.7), 0 0 80px rgba(239, 68, 68, 0.4)",
              background: "linear-gradient(180deg, #FFFFFF 25%, #FCA5A5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 14,
            }}
          >
            TOP 3 MẮC MỚI
          </div>

          {/* SVG Animated Colon & Rectum Anatomy */}
          <div style={{ marginBottom: 16 }}>
            <ColonAnatomyIllustration progress={colonProgress} />
          </div>

          {/* National Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
              width: "100%",
              maxWidth: 920,
            }}
          >
            <div
              style={{
                background: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 22,
                padding: "20px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "#94A3B8", marginBottom: 6 }}>
                MẮC MỚI TOÀN QUỐC
              </span>
              <span style={{ fontSize: 44, fontWeight: 900, color: "#F8FAFC", fontFamily: "monospace" }}>
                {countMacMoi.toLocaleString("vi-VN")}
              </span>
              <span style={{ fontSize: 18, color: "#64748B", marginTop: 2 }}>ca mỗi năm</span>
            </div>

            <div
              style={{
                background: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: 22,
                padding: "20px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 700, color: "#FCA5A5", marginBottom: 6 }}>
                TỬ VONG DO UNG THƯ
              </span>
              <span style={{ fontSize: 44, fontWeight: 900, color: "#EF4444", fontFamily: "monospace" }}>
                {countTuVong.toLocaleString("vi-VN")}
              </span>
              <span style={{ fontSize: 18, color: "#64748B", marginTop: 2 }}>ca mỗi năm</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            opacity: phase2Progress,
            transform: `translateY(${interpolate(phase2Progress, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#EF4444",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            TỐC ĐỘ TĂNG BẬC ĐÁNG BÁO ĐỘNG
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 44,
            }}
          >
            SO VỚI GLOBOCAN 2022
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 26,
              width: "100%",
              maxWidth: 920,
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "2px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 28,
                padding: "36px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(239, 68, 68, 0.2)",
                transform: `translateX(${interpolate(
                  spring({ frame: frame - 215, fps, config: { damping: 16 } }),
                  [0, 1],
                  [-60, 0]
                )}px)`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#FCA5A5" }}>
                  SỐ CA MẮC MỚI
                </span>
                <span style={{ fontSize: 36, fontWeight: 800, color: "#FFFFFF" }}>
                  Vượt lên Top 3 toàn quốc
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "#EF4444",
                  color: "#FFFFFF",
                  fontSize: 42,
                  fontWeight: 900,
                  padding: "16px 28px",
                  borderRadius: 20,
                  boxShadow: "0 0 25px rgba(239, 68, 68, 0.8)",
                }}
              >
                +1 BẬC ↗
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(225, 29, 72, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)",
                border: "2px solid rgba(225, 29, 72, 0.7)",
                borderRadius: 28,
                padding: "36px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(225, 29, 72, 0.25)",
                transform: `translateX(${interpolate(
                  spring({ frame: frame - 230, fps, config: { damping: 16 } }),
                  [0, 1],
                  [60, 0]
                )}px)`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#FDA4AF" }}>
                  NGUY CƠ TỬ VONG
                </span>
                <span style={{ fontSize: 36, fontWeight: 800, color: "#FFFFFF" }}>
                  Trong 3 nguyên nhân hàng đầu
                </span>
              </div>
              <div
                style={{
                  backgroundColor: "#BE123C",
                  color: "#FFFFFF",
                  fontSize: 42,
                  fontWeight: 900,
                  padding: "16px 28px",
                  borderRadius: 20,
                  boxShadow: "0 0 25px rgba(190, 18, 60, 0.8)",
                }}
              >
                +2 BẬC ⇈
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SCENE 2: NGUYÊN NHÂN & TRẺ HÓA — 4 THẺ TUẦN TỰ TRƯỢT VÀO + ICON TO + SỐ ĐỘNG
// ============================================================================
export const Scene2Causes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  const sp1 = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 130 } });
  const sp2 = spring({ frame: frame - 25, fps, config: { damping: 16, stiffness: 130 } });
  const sp3 = spring({ frame: frame - 45, fps, config: { damping: 16, stiffness: 130 } });
  const sp4 = spring({ frame: frame - 65, fps, config: { damping: 16, stiffness: 130 } });

  const num1 = countUp(frame, 10, 40, 45);
  const num2 = countUp(frame, 30, 40, 65);
  const num3 = (interpolate(frame, [50, 85], [1.0, 2.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);
  const num4 = countUp(frame, 70, 40, 85);

  const cardsData = [
    {
      sp: sp1,
      icon: "🥩",
      title: "Ăn nhiều thịt đỏ & đồ chế biến",
      desc: "Xúc xích, thịt xông khói, đồ đóng hộp tạo độc tố ruột",
      stat: `+${num1}%`,
      statLabel: "Tăng độc tố",
      borderColor: "rgba(239, 68, 68, 0.5)",
      bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)",
      statColor: "#EF4444",
    },
    {
      sp: sp2,
      icon: "🥗❌",
      title: "Thiếu hụt trầm trọng chất xơ",
      desc: "Lười ăn rau củ quả làm chậm quá trình đào thải cặn bã",
      stat: `-${num2}%`,
      statLabel: "Thiếu hụt",
      borderColor: "rgba(239, 68, 68, 0.5)",
      bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)",
      statColor: "#F87171",
    },
    {
      sp: sp3,
      icon: "🍺🚬",
      title: "Rượu bia & Thuốc lá kéo dài",
      desc: "Tổn thương niêm mạc mạn tính, thúc đẩy tế bào biến dị",
      stat: `x${num3}`,
      statLabel: "Nguy cơ",
      borderColor: "rgba(245, 158, 11, 0.5)",
      bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)",
      statColor: "#FBBF24",
    },
    {
      sp: sp4,
      icon: "⏳⚠️",
      title: "Polyp đại tràng không xử lý",
      desc: "Polyp để lâu năm trong đường ruột sẽ tiến triển thành ung thư",
      stat: `${num4}%`,
      statLabel: "Hóa ác tính",
      borderColor: "rgba(245, 158, 11, 0.5)",
      bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)",
      statColor: "#F59E0B",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(245, 158, 11, 0.18)",
          border: "1px solid rgba(245, 158, 11, 0.5)",
          borderRadius: 100,
          padding: "8px 24px",
          marginBottom: 16,
        }}
      >
        <span style={{ color: "#FBBF24", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
          XU HƯỚNG BỆNH LÝ
        </span>
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 950,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        NGÀY CÀNG TRẺ HÓA
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: "#94A3B8",
          textAlign: "center",
          maxWidth: 860,
          marginBottom: 36,
        }}
      >
        Bác sĩ Bệnh viện K chỉ ra 4 yếu tố nguy cơ hàng đầu từ lối sống
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 920,
        }}
      >
        {cardsData.map((c, i) => (
          <div
            key={i}
            style={{
              background: c.bgGradient,
              border: `2px solid ${c.borderColor}`,
              borderRadius: 24,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: c.sp,
              transform: `translateX(${interpolate(c.sp, [0, 1], [i % 2 === 0 ? -60 : 60, 0])}px) scale(${interpolate(
                c.sp,
                [0, 1],
                [0.92, 1]
              )})`,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <div
                style={{
                  fontSize: 58,
                  width: 76,
                  height: 76,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: "#FFFFFF" }}>
                  {c.title}
                </span>
                <span style={{ fontSize: 20, color: "#94A3B8", maxWidth: 540 }}>
                  {c.desc}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: 120,
              }}
            >
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 950,
                  color: c.statColor,
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}
              >
                {c.stat}
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#94A3B8", marginTop: 4 }}>
                {c.statLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 3: BẪY TRIỆU CHỨNG THẦM LẶNG — TRÌNH CHIẾU TỪNG THẺ + PHÓNG TO ICON + HERO STAT 80%
// ============================================================================
export const Scene3Symptoms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  const sp1 = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 130 } });
  const sp2 = spring({ frame: frame - 28, fps, config: { damping: 16, stiffness: 130 } });
  const sp3 = spring({ frame: frame - 50, fps, config: { damping: 16, stiffness: 130 } });
  const spBottom = spring({ frame: frame - 70, fps, config: { damping: 16, stiffness: 130 } });

  const latePercent = countUp(frame, 75, 45, 80);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(239, 68, 68, 0.18)",
          border: "1px solid rgba(239, 68, 68, 0.5)",
          borderRadius: 100,
          padding: "8px 24px",
          marginBottom: 16,
        }}
      >
        <span style={{ color: "#FCA5A5", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
          NGUY HIỂM TIỀM ẨN
        </span>
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 950,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        BẪY TRIỆU CHỨNG THẦM LẶNG
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#F87171",
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: 14,
          padding: "10px 24px",
          marginBottom: 36,
        }}
      >
        Dễ nhầm với rối loạn tiêu hóa thông thường
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          width: "100%",
          maxWidth: 920,
          marginBottom: 32,
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "2px solid rgba(239, 68, 68, 0.6)",
            borderRadius: 24,
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: sp1,
            transform: `translateY(${interpolate(sp1, [0, 1], [40, 0])}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              border: "2px solid #EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
          >
            🩸
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>
              Đại tiện ra máu, phân lẫn máu đen
            </span>
            <span style={{ fontSize: 21, color: "#FCA5A5" }}>
              Dấu hiệu then chốt báo động tổn thương niêm mạc đại trực tràng
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "2px solid rgba(245, 158, 11, 0.6)",
            borderRadius: 24,
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: sp2,
            transform: `translateY(${interpolate(sp2, [0, 1], [40, 0])}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: "50%",
              backgroundColor: "rgba(245, 158, 11, 0.25)",
              border: "2px solid #F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
            }}
          >
            ⚠️
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>
              Táo bón hoặc tiêu chảy kéo dài
            </span>
            <span style={{ fontSize: 21, color: "#FDE68A" }}>
              Thay đổi thói quen đại tiện, cảm giác đi ngoài không hết phân
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "2px solid rgba(148, 163, 184, 0.5)",
            borderRadius: 24,
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: sp3,
            transform: `translateY(${interpolate(sp3, [0, 1], [40, 0])}px)`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: "50%",
              backgroundColor: "rgba(148, 163, 184, 0.25)",
              border: "2px solid #CBD5E1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              flexShrink: 0,
            }}
          >
            📉
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>
              Đau bụng âm ỉ, sụt cân, thiếu máu
            </span>
            <span style={{ fontSize: 21, color: "#CBD5E1" }}>
              Khối u phát triển gây chèn ép hoặc chảy máu rỉ rả kéo dài
            </span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Card: 80% Đi khám muộn */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(30, 41, 59, 0.9) 100%)",
          border: "2px solid rgba(239, 68, 68, 0.7)",
          borderRadius: 26,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 920,
          opacity: spBottom,
          transform: `scale(${interpolate(spBottom, [0, 1], [0.95, 1])})`,
          boxShadow: "0 15px 35px rgba(239, 68, 68, 0.25)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#FCA5A5", letterSpacing: 1.5 }}>
            THỰC TRẠNG ĐÁNG TIẾC
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF" }}>
            Người bệnh chẩn đoán ở giai đoạn muộn
          </span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 950,
            color: "#EF4444",
            fontFamily: "monospace",
            lineHeight: 1,
            textShadow: "0 0 25px rgba(239, 68, 68, 0.8)",
          }}
        >
          {latePercent}%
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 4: ĐỘT PHÁ ĐIỀU TRỊ — TÍCH HỢP MÔ PHỎNG VI PHẪU NỘI SOI ESD (Feature #3)
// ============================================================================
export const Scene4Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  const sp1 = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 130 } });
  const sp2 = spring({ frame: frame - 35, fps, config: { damping: 16, stiffness: 130 } });

  const countBaoTon = countUp(frame, 15, 45, 100);
  const countHoiPhuc = countUp(frame, 20, 35, 24);
  const countKhoangCach = (interpolate(frame, [40, 75], [0.5, 2.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(16, 185, 129, 0.18)",
          border: "1px solid rgba(16, 185, 129, 0.5)",
          borderRadius: 100,
          padding: "8px 24px",
          marginBottom: 16,
        }}
      >
        <span style={{ color: "#34D399", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
          ĐỘT PHÁ ĐIỀU TRỊ
        </span>
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 950,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        PHÁT HIỆN SỚM: ĐỔI MỚI CỤC DIỆN
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: "#38BDF8",
          textAlign: "center",
          maxWidth: 860,
          marginBottom: 20,
        }}
      >
        Can thiệp khi tổn thương còn nông ➔ Tránh hoàn toàn cuộc mổ mở lớn
      </div>

      {/* Feature #3: Animated Endoscopy ESD Simulation Diagram */}
      <div style={{ width: "100%", maxWidth: 920, marginBottom: 20 }}>
        <EndoscopyESDMicroAnimation />
      </div>

      {/* 2 Medical Tech Specs Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          width: "100%",
          maxWidth: 920,
        }}
      >
        {/* Card 1: ESD Tech Stats */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 22,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: sp1,
            transform: `translateX(${interpolate(sp1, [0, 1], [-40, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 900, color: "#34D399" }}>
            NỘI SOI ESD
          </span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 38, fontWeight: 950, color: "#10B981", fontFamily: "monospace" }}>
              {countBaoTon}%
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Bảo tồn ruột</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 38, fontWeight: 950, color: "#38BDF8", fontFamily: "monospace" }}>
              {countHoiPhuc}H
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Xuất viện</span>
          </div>
        </div>

        {/* Card 2: Da Vinci Robot */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "2px solid rgba(56, 189, 248, 0.6)",
            borderRadius: 22,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: sp2,
            transform: `translateX(${interpolate(sp2, [0, 1], [40, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8" }}>
            ROBOT DA VINCI XI
          </span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 38, fontWeight: 950, color: "#38BDF8", fontFamily: "monospace" }}>
              {countKhoangCach} CM
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Cách rìa hậu môn</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 32, fontWeight: 950, color: "#34D399", fontFamily: "monospace" }}>
              TRIỆT CĂN
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Giữ chất lượng sống</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 5: TỶ LỆ SỐNG 90% & MỐC 45 TUỔI (1179 -> 1478 frames)
// ============================================================================
export const Scene5Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  const progressPercent = countUp(frame, 5, 55, 90);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(16, 185, 129, 0.18)",
          border: "1px solid rgba(16, 185, 129, 0.5)",
          borderRadius: 100,
          padding: "8px 24px",
          marginBottom: 16,
        }}
      >
        <span style={{ color: "#34D399", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
          HIỆP HỘI UNG THƯ MỸ
        </span>
      </div>

      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: "#94A3B8",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        TỶ LỆ SỐNG THÊM 5 NĂM GIAI ĐOẠN KHU TRÚ
      </div>

      <div
        style={{
          fontSize: 160,
          fontWeight: 950,
          color: "#10B981",
          lineHeight: 1,
          letterSpacing: -4,
          textShadow: "0 0 50px rgba(16, 185, 129, 0.6), 0 0 100px rgba(16, 185, 129, 0.3)",
          background: "linear-gradient(180deg, #FFFFFF 20%, #34D399 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 36,
        }}
      >
        {progressPercent}%
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)",
          border: "2px solid rgba(56, 189, 248, 0.5)",
          borderRadius: 28,
          padding: "36px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 920,
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          KHUYẾN CÁO TẦM SOÁT ĐỊNH KỲ
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 16 }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: "#64748B", textDecoration: "line-through" }}>
            50 TUỔI
          </span>
          <span style={{ fontSize: 44, color: "#38BDF8" }}>➔</span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 950,
              color: "#FFFFFF",
              backgroundColor: "#0284C7",
              padding: "8px 24px",
              borderRadius: 18,
              boxShadow: "0 0 25px rgba(2, 132, 199, 0.6)",
            }}
          >
            45 TUỔI
          </span>
        </div>

        <span style={{ fontSize: 22, color: "#94A3B8", textAlign: "center" }}>
          Nội soi định kỳ là phương pháp vàng giúp phát hiện sớm và triệt tiêu mầm mống ung thư
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 6: OUTRO & KÊU GỌI HÀNH ĐỘNG (1478 -> 1776 frames)
// ============================================================================
export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          border: "2px solid #10B981",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          marginBottom: 20,
          boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
        }}
      >
        🛡️
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 950,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.25,
          marginBottom: 14,
        }}
      >
        ĐỪNG CHỜ CÓ TRIỆU CHỨNG
      </div>

      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "#EF4444",
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        Ung thư giai đoạn sớm hoàn toàn không có cảm giác đau!
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, rgba(2, 132, 199, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)",
          border: "2px solid rgba(56, 189, 248, 0.6)",
          borderRadius: 28,
          padding: "36px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 920,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: 2,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          HÀNH ĐỘNG BẢO VỆ GIA ĐÌNH
        </span>

        <span
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.3,
            marginBottom: 20,
          }}
        >
          Chủ động nội soi tầm soát định kỳ
        </span>

        <div
          style={{
            backgroundColor: "#10B981",
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 800,
            padding: "14px 32px",
            borderRadius: 100,
            boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
          }}
        >
          Lưu video & Chia sẻ để bảo vệ người thân ngay!
        </div>
      </div>

      <div
        style={{
          fontSize: 20,
          color: "#64748B",
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: 820,
        }}
      >
        Nguồn số liệu: Báo cáo IARC Globocan 2024 & Bệnh viện K Trung Ương<br />
        Thông tin mang tính truyền thông giáo dục sức khỏe cộng đồng
      </div>
    </div>
  );
};
