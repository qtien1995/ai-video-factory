import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// Colors & Styling
export const C = {
  bgDeep: "#030712",
  bgSlate: "#0f172a",
  indigo: "#1e1b4b",
  amber: "#f59e0b",
  gold: "#facc15",
  green: "#10b981",
  greenLight: "#34d399",
  cyan: "#06b6d4",
  cyanLight: "#38bdf8",
  blue: "#2563eb",
  purple: "#7c3aed",
  red: "#ef4444",
  white: "#f8fafc",
  subtle: "rgba(255, 255, 255, 0.15)",
};

export const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif';

// Baseline vertical anchor for bridge & vehicle
export const BRIDGE_Y = 1220;

// Global Background & Canyon
export const CanyonBackdrop: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle sunrise aura at the end (from frame 1411 to end)
  const sunriseOpacity = interpolate(frame, [1411, 1530], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 25%, ${C.indigo} 0%, ${C.bgSlate} 55%, ${C.bgDeep} 100%)` }}>
      {/* Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Mist at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 700,
          background: "linear-gradient(to top, rgba(3, 7, 18, 0.98), transparent)",
          zIndex: 10,
        }}
      />

      {/* Sunrise Aura */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1000,
          background:
            "radial-gradient(circle at 50% 100%, rgba(245, 158, 11, 0.45) 0%, rgba(234, 88, 12, 0.2) 45%, transparent 80%)",
          opacity: sunriseOpacity,
          zIndex: 15,
        }}
      />

      {/* Cliff Left */}
      <div
        style={{
          position: "absolute",
          left: -140,
          top: 750,
          width: 360,
          height: 1200,
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          clipPath: "polygon(0 0, 85% 15%, 70% 45%, 95% 75%, 60% 100%, 0 100%)",
          boxShadow: "20px 0 60px rgba(0,0,0,0.85)",
          zIndex: 20,
        }}
      />

      {/* Cliff Right */}
      <div
        style={{
          position: "absolute",
          right: -140,
          top: 700,
          width: 340,
          height: 1250,
          background: "linear-gradient(225deg, #1e293b, #0f172a)",
          clipPath: "polygon(15% 10%, 100% 0, 100% 100%, 35% 100%, 5% 65%, 25% 35%)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.85)",
          zIndex: 20,
        }}
      />
    </AbsoluteFill>
  );
};

// Delivery Rider Graphic (Upscaled & Prominent)
export const DeliveryRider: React.FC<{
  xOffset?: number;
  yVibration?: number;
  stopped?: boolean;
  baseY?: number;
}> = ({ xOffset = 0, yVibration = 0, stopped = false, baseY = BRIDGE_Y }) => {
  const frame = useCurrentFrame();
  const wheelRotation = stopped ? 0 : (frame * 18) % 360;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: baseY,
        transform: `translate(calc(-50% + ${xOffset}px), calc(-100% + ${yVibration}px))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 45,
      }}
    >
      {/* Upscaled SVG: 360 width x 275 height */}
      <svg width="360" height="275" viewBox="0 0 260 200">
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Cargo Box */}
        <rect x="25" y="45" width="65" height="75" rx="12" fill="#f59e0b" stroke="#ffffff" strokeWidth="5" />
        <circle cx="57" cy="82" r="16" fill="#fef08a" />
        <text x="57" y="89" fontSize="20" fontWeight="900" textAnchor="middle" fill="#3e1b04">
          ₫
        </text>

        {/* Motorcycle Frame */}
        <path d="M 60 120 L 115 120 L 150 90 L 125 70 Z" fill="#0284c7" />
        <rect x="70" y="115" width="45" height="15" rx="4" fill="#64748b" />
        <line x1="60" y1="125" x2="35" y2="135" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />

        {/* Rider */}
        <circle cx="120" cy="35" r="22" fill="#38bdf8" stroke="#ffffff" strokeWidth="4" />
        <path d="M 125 30 Q 138 35 125 42 Z" fill="#0f172a" />
        <path d="M 98 55 L 137 55 L 142 95 L 93 95 Z" fill="#0369a1" />
        <line x1="120" y1="65" x2="160" y2="75" stroke="#38bdf8" strokeWidth="9" strokeLinecap="round" />
        <circle cx="165" cy="75" r="9" fill="#f8fafc" />

        {/* Headlight beam */}
        {!stopped && <polygon points="175,75 258,35 258,115" fill="url(#beamGrad)" opacity="0.45" />}

        {/* Wheels */}
        <g transform={`rotate(${wheelRotation}, 55, 140)`}>
          <circle cx="55" cy="140" r="28" fill="#0f172a" stroke="#cbd5e1" strokeWidth="7" />
          <circle cx="55" cy="140" r="11" fill="#e2e8f0" />
        </g>
        <g transform={`rotate(${wheelRotation}, 165, 140)`}>
          <circle cx="165" cy="140" r="28" fill="#0f172a" stroke="#cbd5e1" strokeWidth="7" />
          <circle cx="165" cy="140" r="11" fill="#e2e8f0" />
        </g>
      </svg>
    </div>
  );
};

// Suspension Cable System (Positioned at baseY)
export const SuspensionCable: React.FC<{
  sag?: number;
  hasTruss?: boolean;
  hasStrands?: boolean;
  hasRoadway?: boolean;
  baseY?: number;
}> = ({ sag = 0, hasTruss = false, hasStrands = false, hasRoadway = false, baseY = BRIDGE_Y }) => {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}>
      <svg style={{ position: "absolute", width: 1080, height: 1920 }} viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="cableGlowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* Main Cable */}
        <path
          d={`M 0 ${baseY} Q 540 ${baseY + sag} 1080 ${baseY}`}
          fill="none"
          stroke="url(#cableGlowGrad)"
          strokeWidth="8"
        />

        {/* Strands */}
        {hasStrands && (
          <g opacity={1}>
            <line x1="160" y1={baseY - 140} x2="160" y2={baseY} stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 5" />
            <line x1="340" y1={baseY - 90} x2="340" y2={baseY} stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 5" />
            <line x1="540" y1={baseY - 60} x2="540" y2={baseY} stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 5" />
            <line x1="740" y1={baseY - 90} x2="740" y2={baseY} stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 5" />
            <line x1="920" y1={baseY - 140} x2="920" y2={baseY} stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 5" />
          </g>
        )}

        {/* Truss Arm from Left Cliff */}
        {hasTruss && (
          <g opacity={1}>
            <line x1="0" y1={baseY - 160} x2="260" y2={baseY} stroke="#38bdf8" strokeWidth="10" />
            <line x1="0" y1={baseY + 160} x2="260" y2={baseY} stroke="#0284c7" strokeWidth="10" />
            <circle cx="260" cy={baseY} r="18" fill="#38bdf8" stroke="#ffffff" strokeWidth="4" />
          </g>
        )}
      </svg>

      {/* Roadway Bridge Plate */}
      {hasRoadway && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: baseY - 14,
            height: 34,
            background: "linear-gradient(90deg, #334155, #64748b, #334155)",
            borderTop: "5px solid #facc15",
            borderBottom: "4px solid #1e293b",
            boxShadow: "0 15px 50px rgba(250, 204, 21, 0.5)",
            zIndex: 43,
          }}
        />
      )}
    </div>
  );
};

// Foundation Layers (Under bridge - Expanded, Large, Bold, Single-Line)
export const FoundationLayers: React.FC<{ progress: number; baseY?: number }> = ({ progress, baseY = BRIDGE_Y + 28 }) => {
  return (
    <div style={{ position: "absolute", left: 45, right: 45, top: baseY, zIndex: 42 }}>
      {/* 1. Emergency */}
      {progress >= 1 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 66,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 0.5,
            color: "#ffffff",
            background: "linear-gradient(90deg, #047857, #059669)",
            border: "3px solid #34d399",
            boxShadow: "0 12px 35px rgba(5, 150, 105, 0.45)",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>🛡️ 1. QUỸ DỰ PHÒNG KHẨN CẤP</span>
          <span style={{ fontSize: 21, background: "rgba(255,255,255,0.2)", padding: "4px 14px", borderRadius: 10, whiteSpace: "nowrap" }}>
            3–6 THÁNG CHI PHÍ
          </span>
        </div>
      )}

      {/* 2. Health & Pension */}
      {progress >= 2 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 74,
            height: 66,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 0.5,
            color: "#ffffff",
            background: "linear-gradient(90deg, #0369a1, #075985)",
            border: "3px solid #38bdf8",
            boxShadow: "0 12px 35px rgba(56, 189, 248, 0.45)",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>🏥 2. BHYT &amp; BHXH (Y TẾ, HƯU TRÍ)</span>
          <span style={{ fontSize: 21, background: "rgba(255,255,255,0.2)", padding: "4px 14px", borderRadius: 10, whiteSpace: "nowrap" }}>
            LƯỚI ĐỠ CƠ BẢN
          </span>
        </div>
      )}

      {/* 3. Protection */}
      {progress >= 3 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 148,
            height: 66,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 0.5,
            color: "#ffffff",
            background: "linear-gradient(90deg, #1d4ed8, #1e40af)",
            border: "3px solid #60a5fa",
            boxShadow: "0 12px 35px rgba(96, 165, 250, 0.45)",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>⚙️ 3. BẢO HIỂM NÂNG CAO (SỨC KHỎE)</span>
          <span style={{ fontSize: 21, background: "rgba(255,255,255,0.2)", padding: "4px 14px", borderRadius: 10, whiteSpace: "nowrap" }}>
            ĐỠ ĐÒN BIẾN CỐ
          </span>
        </div>
      )}

      {/* 4. Wealth */}
      {progress >= 4 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 222,
            height: 66,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 0.5,
            color: "#ffffff",
            background: "linear-gradient(90deg, #6d28d9, #5b21b6)",
            border: "3px solid #a78bfa",
            boxShadow: "0 12px 35px rgba(167, 139, 250, 0.45)",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>🌱 4. TÍCH LŨY &amp; ĐẦU TƯ DÀI HẠN</span>
          <span style={{ fontSize: 21, background: "rgba(255,255,255,0.2)", padding: "4px 14px", borderRadius: 10, whiteSpace: "nowrap" }}>
            TỰ DO TÀI CHÍNH
          </span>
        </div>
      )}
    </div>
  );
};

// Text Overlay Card (Prominent, High-Contrast Header)
export const TextHeader: React.FC<{
  title: string;
  subtitle?: string;
  subColor?: string;
  isHero?: boolean;
}> = ({ title, subtitle, subColor = C.gold, isHero = false }) => {
  const frame = useCurrentFrame();
  const enterY = interpolate(frame, [0, 15], [-30, 0], clamp);
  const opacity = interpolate(frame, [0, 12], [0, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 45,
        right: 45,
        top: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 60,
        opacity,
        transform: `translateY(${enterY}px)`,
      }}
    >
      <h1
        style={{
          fontFamily: FONT,
          fontSize: isHero ? 72 : 62,
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: "-1px",
          color: "#ffffff",
          textTransform: "uppercase",
          textShadow: "0 5px 25px rgba(0,0,0,0.85)",
          marginBottom: 10,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: FONT,
            fontSize: isHero ? 40 : 34,
            fontWeight: isHero ? 900 : 800,
            lineHeight: 1.25,
            color: subColor,
            textShadow: "0 3px 18px rgba(0,0,0,0.9)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
