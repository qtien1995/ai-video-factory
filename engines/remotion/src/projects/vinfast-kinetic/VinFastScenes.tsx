import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const BRAND_COLORS = {
  blue: "#1464F4",
  red: "#EE3D43",
  green: "#2DBE78",
  ink: "#05070D",
  darkNavy: "#0B1330",
};

// 1. GLOBAL BACKDROP
export const KineticBackdrop: React.FC<{ activeTheme?: "blue" | "green" | "red" }> = ({ activeTheme = "blue" }) => {
  const glowColor = activeTheme === "green" ? "rgba(45, 190, 120, 0.25)" : activeTheme === "red" ? "rgba(238, 61, 67, 0.25)" : "rgba(20, 100, 244, 0.25)";

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: BRAND_COLORS.ink, overflow: "hidden", zIndex: 0 }}>
      {/* Radial Deep Space Ambient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${BRAND_COLORS.darkNavy} 0%, ${BRAND_COLORS.ink} 75%, #000 100%)`,
        }}
      />
      {/* Perspective 3D Grid Floor */}
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: "-25%",
          width: "150%",
          height: 620,
          backgroundImage: `
            linear-gradient(to right, rgba(20, 100, 244, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 100, 244, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "80px 40px",
          transform: "perspective(650px) rotateX(72deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 85%)",
        }}
      />
      {/* Horizon Laser Ground Line */}
      <div
        style={{
          position: "absolute",
          top: 845,
          left: 0,
          width: "100%",
          height: 3,
          background: `linear-gradient(90deg, transparent 5%, ${BRAND_COLORS.blue} 25%, #FFFFFF 50%, ${BRAND_COLORS.blue} 75%, transparent 95%)`,
          boxShadow: `0 0 25px ${BRAND_COLORS.blue}, 0 0 50px ${glowColor}`,
          zIndex: 5,
        }}
      />
    </div>
  );
};

// 2. HUD & TELEMETRY BAR
export const TelemetryOverlay: React.FC<{ activeModelIndex?: number }> = ({ activeModelIndex = 0 }) => {
  const models = ["VF 3", "VF 5", "VF 6", "VF 7", "VF 8", "VF 9"];

  return (
    <>
      {/* Top Left Watermark */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: "0.12em",
          color: BRAND_COLORS.blue,
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span>VINFAST KINETIC ENGINE // 1080P 60FPS</span>
        <span style={{ color: BRAND_COLORS.red, fontSize: 14 }}>BPM: 136 // CTC SYNC ACCURACY: ±40ms</span>
      </div>

      {/* Top Right Specs */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 60,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.7)",
          zIndex: 40,
          textAlign: "right",
        }}
      >
        <span>POWERED BY ANTIGRAVITY</span>
        <br />
        <span style={{ color: BRAND_COLORS.blue, fontSize: 14 }}>REMOTION CAD ACCELERATED</span>
      </div>

      {/* Bottom HUD Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          backgroundColor: "rgba(11, 19, 48, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(20, 100, 244, 0.4)",
          borderRadius: 10,
          zIndex: 35,
        }}
      >
        {models.map((name, idx) => {
          const isActive = idx === activeModelIndex;
          return (
            <div
              key={name}
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)",
                textShadow: isActive ? `0 0 15px ${BRAND_COLORS.blue}` : "none",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "all 0.2s",
              }}
            >
              {isActive && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: BRAND_COLORS.red,
                    boxShadow: `0 0 10px ${BRAND_COLORS.red}`,
                  }}
                />
              )}
              {name}
            </div>
          );
        })}
      </div>
    </>
  );
};

// 3. SCENE 1: INTRO (Cánh chim V Chrome & Anamorphic Flare)
export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const flareOpacity = interpolate(frame, [10, 20, 30, 45], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(frame, [12, 35], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [12, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
      {/* Anamorphic Blue Flare Beam */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          width: "100%",
          height: 3,
          background: `linear-gradient(90deg, transparent 0%, ${BRAND_COLORS.blue} 25%, #FFFFFF 50%, ${BRAND_COLORS.blue} 75%, transparent 100%)`,
          boxShadow: `0 0 35px 8px ${BRAND_COLORS.blue}, 0 0 80px 14px rgba(20, 100, 244, 0.7)`,
          opacity: flareOpacity,
          transform: "translateY(-50%)",
          pointerEvents: "none",
          zIndex: 25,
        }}
      />

      {/* Chrome V-Wing 3D Icon */}
      <div style={{ transform: `scale(${vScale})`, filter: `drop-shadow(0 0 40px ${BRAND_COLORS.blue}) drop-shadow(0 0 80px rgba(20,100,244,0.5))` }}>
        <svg width="520" height="260" viewBox="0 0 400 200" fill="none">
          <defs>
            <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#C4DCFF" />
              <stop offset="70%" stopColor="#1464F4" />
              <stop offset="100%" stopColor="#081A42" />
            </linearGradient>
          </defs>
          <path
            d="M40 50 L185 160 Q200 172 215 160 L360 50 Q370 42 360 38 L300 35 L200 120 L100 35 L40 38 Q30 42 40 50 Z"
            fill="url(#chromeGrad)"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <path d="M120 40 L200 105 L280 40 Q290 35 280 32 L200 80 L120 32 Q110 35 120 40 Z" fill="#FFFFFF" opacity="0.9" />
        </svg>
      </div>

      {/* Slogan */}
      <div
        style={{
          marginTop: 25,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 34,
          fontWeight: 900,
          letterSpacing: "0.35em",
          color: "#FFFFFF",
          textShadow: `0 0 20px ${BRAND_COLORS.blue}`,
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
        }}
      >
        CHẠM TƯƠNG LAI
      </div>
    </div>
  );
};

// 4. SCENE 2: COUNT-IN STACCATO (Ba! Năm! Sáu, Bảy! Tám! Tám! Chín, Chín, Chín!)
export const Scene2CountIn: React.FC<{ subFrame: number }> = ({ subFrame }) => {
  const steps = [
    { num: "3", name: "VF 3 // TIÊN PHONG ĐÔ THỊ", scale: 0.82, chipIdx: 0 },
    { num: "5", name: "VF 5 // CHẠY NHANH BẤT CHẤP", scale: 0.88, chipIdx: 1 },
    { num: "6", name: "VF 6 // ĐẸP TỪNG GÓC CẠNH", scale: 0.94, chipIdx: 2 },
    { num: "7", name: "VF 7 // PHI CƠ CẤT CÁNH", scale: 1.0, chipIdx: 3 },
    { num: "8", name: "VF 8 // VỮNG CHÃI ĐƯỜNG DÀI", scale: 1.08, chipIdx: 4 },
    { num: "9", name: "VF 9 // ĐẲNG CẤP TƯƠNG LAI", scale: 1.18, chipIdx: 5 },
  ];

  // 180 frames total / 6 steps = 30 frames per step
  const stepIdx = Math.min(Math.floor(subFrame / 30), 5);
  const cur = steps[stepIdx];
  const stepLocalFrame = subFrame % 30;

  const numScale = interpolate(stepLocalFrame, [0, 6, 25], [1.35, 1.0, 1.0], { extrapolateRight: "clamp" });
  const carX = interpolate(stepLocalFrame, [0, 12], [450, -120], { extrapolateRight: "clamp" });
  const carOpacity = interpolate(stepLocalFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 12 }}>
      {/* Giant Typography Number */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 140,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 620,
          fontWeight: 900,
          fontStyle: "italic",
          lineHeight: 0.8,
          background: "linear-gradient(180deg, #FFFFFF 20%, rgba(20, 100, 244, 0.4) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `0 0 50px rgba(20, 100, 244, 0.6)`,
          transform: `scale(${numScale})`,
          transformOrigin: "left center",
          zIndex: 14,
        }}
      >
        {cur.num}
      </div>

      {/* Model Name Badge */}
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 680,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 54,
          fontWeight: 900,
          letterSpacing: "0.04em",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          gap: 18,
          zIndex: 15,
        }}
      >
        <span
          style={{
            backgroundColor: BRAND_COLORS.red,
            padding: "6px 20px",
            borderRadius: 6,
            fontSize: 24,
            fontWeight: 900,
            fontStyle: "italic",
          }}
        >
          STACCATO
        </span>
        <span>{cur.name}</span>
      </div>

      {/* Side-view Vector Car (Positioned exactly on GROUND = 845px) */}
      <div
        style={{
          position: "absolute",
          right: carX,
          bottom: 235, // Align to ground 845px
          width: 1080,
          height: 380,
          transform: `scale(${cur.scale})`,
          transformOrigin: "bottom center",
          opacity: carOpacity,
          zIndex: 13,
        }}
      >
        <svg viewBox="0 0 800 300" width="100%" height="100%" fill="none">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B1B3D" />
              <stop offset="50%" stopColor="#1464F4" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <path
            d="M50 210 L150 210 Q190 140 230 210 L570 210 Q610 140 650 210 L760 210 Q780 190 770 140 L710 100 L560 60 L330 60 L190 100 L90 120 Q50 140 50 210 Z"
            fill="url(#bodyGrad)"
            stroke="#1464F4"
            strokeWidth="4"
          />
          <path d="M220 95 L335 68 L545 68 L680 98 Q500 95 220 95 Z" fill="#05070D" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
          <path d="M720 105 L770 115" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <path d="M80 125 L50 135" stroke="#EE3D43" strokeWidth="8" strokeLinecap="round" />
          <circle cx="190" cy="210" r="45" fill="#05070D" stroke="#FFFFFF" strokeWidth="6" />
          <circle cx="190" cy="210" r="22" fill="#1464F4" />
          <circle cx="610" cy="210" r="45" fill="#05070D" stroke="#FFFFFF" strokeWidth="6" />
          <circle cx="610" cy="210" r="22" fill="#1464F4" />
        </svg>
      </div>

      {/* Showroom Mirror Floor Reflection */}
      <div
        style={{
          position: "absolute",
          right: carX,
          top: 845,
          width: 1080,
          height: 380,
          transform: `scaleY(-1) scale(${cur.scale})`,
          transformOrigin: "top center",
          opacity: 0.28,
          filter: "blur(2px)",
          maskImage: "linear-gradient(to top, transparent 40%, rgba(0,0,0,0.8) 100%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 40%, rgba(0,0,0,0.8) 100%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 800 300" width="100%" height="100%" fill="none">
          <path
            d="M50 210 L150 210 Q190 140 230 210 L570 210 Q610 140 650 210 L760 210 Q780 190 770 140 L710 100 L560 60 L330 60 L190 100 L90 120 Q50 140 50 210 Z"
            fill="#1464F4"
          />
        </svg>
      </div>
    </div>
  );
};

// 5. SCENE 3: SLAM WORDMARK VINFAST
export const Scene3Slam: React.FC<{ subFrame: number }> = ({ subFrame }) => {
  const scale = interpolate(subFrame, [0, 8], [3.2, 1.0], { extrapolateRight: "clamp" });
  const opacity = interpolate(subFrame, [0, 4], [0, 1], { extrapolateRight: "clamp" });
  const shake = subFrame < 10 ? (subFrame % 2 === 0 ? 8 : -8) : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${shake}px)`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 170,
          fontWeight: 900,
          letterSpacing: "0.15em",
          color: "#FFFFFF",
          textShadow: `0 0 60px ${BRAND_COLORS.blue}, 0 0 120px rgba(20, 100, 244, 0.8)`,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        VINFAST
      </div>
      <div
        style={{
          marginTop: -10,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: "0.38em",
          color: BRAND_COLORS.green,
          textShadow: `0 0 30px rgba(45, 190, 120, 0.7)`,
          opacity,
        }}
      >
        CHẠM TƯƠNG LAI
      </div>
    </div>
  );
};

// 6. SCENE 4: BUILD-UP (VF 3 -> VF 7)
export const Scene4BuildUp: React.FC<{ subFrame: number }> = ({ subFrame }) => {
  const cards = [
    { model: "VF 3", slogan: "PHỐ ĐÔNG LUỒN LÁCH", spec: "Bán kính quay đầu 4.1m · Gầm cao 175mm", color: BRAND_COLORS.blue },
    { model: "VF 5", slogan: "CHẠY NHANH BẤT CHẤP", spec: "Tăng tốc tức thì · Tối ưu đô thị linh hoạt", color: BRAND_COLORS.red },
    { model: "VF 6", slogan: "ĐẸP TỪNG GÓC CẠNH", spec: "Pininfarina & Torino Design chuẩn Âu", color: BRAND_COLORS.blue },
    { model: "VF 7", slogan: "PHI CƠ CẤT CÁNH", spec: "Công suất 349 mã lực · AWD 2 cầu toàn thời gian", color: BRAND_COLORS.red },
  ];

  const cardIdx = Math.min(Math.floor(subFrame / 45), 3);
  const cur = cards[cardIdx];
  const local = subFrame % 45;
  const slideX = interpolate(local, [0, 8], [-100, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(local, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 140px", zIndex: 15 }}>
      {/* Left Kinetic Typography */}
      <div style={{ flex: 1, transform: `translateX(${slideX}px)`, opacity }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: cur.color,
            padding: "8px 26px",
            borderRadius: 6,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 28,
            fontWeight: 900,
            fontStyle: "italic",
            color: "#FFFFFF",
            marginBottom: 20,
          }}
        >
          {cur.model}
        </div>
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 78,
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
            textShadow: `0 0 35px ${cur.color}`,
            marginBottom: 20,
          }}
        >
          {cur.slogan}
        </div>
        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 32,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          {cur.spec}
        </div>
      </div>

      {/* Right V-Chevron Dynamic Visual Box */}
      <div
        style={{
          width: 580,
          height: 380,
          background: `linear-gradient(135deg, rgba(20,100,244,0.3) 0%, rgba(11,19,48,0.8) 100%)`,
          border: `2px solid ${cur.color}`,
          borderRadius: 16,
          boxShadow: `0 0 40px ${cur.color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "skewX(-10deg)",
          overflow: "hidden",
        }}
      >
        <div style={{ transform: "skewX(10deg)", textAlign: "center" }}>
          <div style={{ fontSize: 110, fontWeight: 900, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>{cur.model}</div>
          <div style={{ fontSize: 24, letterSpacing: "0.2em", color: cur.color, fontWeight: 800 }}>ELECTRIC SMART SUV</div>
        </div>
      </div>
    </div>
  );
};

// 7. SCENE 5: DROP NĂNG LƯỢNG (Bật nguồn! Cắm sạc! Vút êm! Đạp ga! BỨT PHÁ!)
export const Scene5DropEnergy: React.FC<{ subFrame: number }> = ({ subFrame }) => {
  const speed = Math.min(Math.round(interpolate(subFrame, [0, 80], [0, 168])), 168);
  const pulse = subFrame % 8 < 4 ? 1.05 : 1.0;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 18 }}>
      <div
        style={{
          backgroundColor: BRAND_COLORS.red,
          padding: "10px 36px",
          borderRadius: 8,
          fontSize: 30,
          fontWeight: 900,
          fontStyle: "italic",
          color: "#fff",
          marginBottom: 30,
          transform: `scale(${pulse})`,
        }}
      >
        INSTANT TORQUE // BỨT TỐC 0-100 KM/H
      </div>

      {/* Speedometer Circle Dial */}
      <div style={{ position: "relative", width: 440, height: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="440" height="440" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="170" stroke="rgba(255,255,255,0.15)" strokeWidth="16" />
          <circle
            cx="200"
            cy="200"
            r="170"
            stroke={BRAND_COLORS.blue}
            strokeWidth="16"
            strokeDasharray="1068"
            strokeDashoffset={1068 - (speed / 180) * 1068}
            strokeLinecap="round"
            filter={`drop-shadow(0 0 20px ${BRAND_COLORS.blue})`}
          />
        </svg>
        <div style={{ position: "absolute", textAlign: "center" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 130, fontWeight: 900, color: "#fff", lineHeight: 0.9 }}>{speed}</div>
          <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 26, fontWeight: 800, color: BRAND_COLORS.blue, letterSpacing: "0.15em" }}>
            KM / H
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 40,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 56,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "0.1em",
          textShadow: `0 0 30px ${BRAND_COLORS.red}`,
        }}
      >
        MỘT! HAI! BA! BỨT PHÁ!
      </div>
    </div>
  );
};

// 8. SCENE 6: CHORUS & CHẾ ĐỘ XANH (VF 8, VF 9, Không khói bụi, Eco Emerald Green)
export const Scene6Chorus: React.FC<{ subFrame: number }> = ({ subFrame }) => {
  const waveOpacity = interpolate(subFrame, [0, 20, 60], [0.3, 0.85, 0.4]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 18 }}>
      {/* Green Emerald Wave Horizon */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, rgba(45, 190, 120, ${waveOpacity}) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          backgroundColor: BRAND_COLORS.green,
          color: "#05070D",
          padding: "8px 30px",
          borderRadius: 6,
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: "0.15em",
          marginBottom: 20,
        }}
      >
        ECO EMERALD MODE // ZERO EMISSIONS
      </div>

      <div
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 82,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          textShadow: `0 0 40px ${BRAND_COLORS.green}`,
        }}
      >
        LƯỚT ÊM RU · KHÔNG KHÓI BỤI
        <br />
        <span style={{ color: BRAND_COLORS.green }}>BẬT CHẾ ĐỘ XANH, VINFAST DẪN ĐẦU!</span>
      </div>

      <div
        style={{
          marginTop: 40,
          display: "flex",
          gap: 60,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 32,
          fontWeight: 800,
          color: "rgba(255,255,255,0.9)",
        }}
      >
        <span>⚡ VF 8 // VỮNG CHÃI ĐƯỜNG DÀI</span>
        <span>🌟 VF 9 // ĐẲNG CẤP TƯƠNG LAI</span>
      </div>
    </div>
  );
};

// 9. SCENE 7: OUTRO END CARD (Showroom 6 xe + Logo V Chrome)
export const Scene7EndCard: React.FC<{ subFrame: number }> = ({ subFrame }) => {
  const opacity = interpolate(subFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(subFrame, [0, 20], [0.9, 1.0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        zIndex: 25,
      }}
    >
      {/* Center Chrome V Wing Logo */}
      <svg width="340" height="170" viewBox="0 0 400 200" fill="none">
        <path
          d="M40 50 L185 160 Q200 172 215 160 L360 50 L300 35 L200 120 L100 35 Z"
          fill="#FFFFFF"
          stroke={BRAND_COLORS.blue}
          strokeWidth="4"
          filter={`drop-shadow(0 0 30px ${BRAND_COLORS.blue})`}
        />
      </svg>

      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 88,
          fontWeight: 900,
          letterSpacing: "0.12em",
          color: "#FFFFFF",
          marginTop: 10,
          textShadow: `0 0 40px ${BRAND_COLORS.blue}`,
        }}
      >
        VINFAST
      </div>

      <div
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "0.3em",
          color: BRAND_COLORS.green,
          marginTop: 5,
        }}
      >
        GO GREEN · CHẠM TƯƠNG LAI
      </div>

      <div
        style={{
          marginTop: 35,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        VF 3 · VF 5 · VF 6 · VF 7 · VF 8 · VF 9
      </div>

      <div
        style={{
          marginTop: 20,
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: 18,
          color: BRAND_COLORS.blue,
          letterSpacing: "0.1em",
        }}
      >
        HỆ SINH THÁI THUẦN ĐIỆN THÔNG MINH TOÀN CẦU
      </div>
    </div>
  );
};
