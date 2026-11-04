import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SpeechSyncedSubtitles, SubtitleWord } from "../../../../engines/remotion/src/shared/SpeechSyncedSubtitles";
import { UserBrandOutro } from "../../../../engines/remotion/src/shared/UserBrandOutro";
import timingData from "../assets/audio/timing.json";

import broll01 from "../assets/broll-01.jpg";
import broll02 from "../assets/broll-02.jpg";
import broll03 from "../assets/broll-03.jpg";
import broll04 from "../assets/broll-04.jpg";
import broll05 from "../assets/broll-05.jpg";
import broll06 from "../assets/broll-06.jpg";
import broll07 from "../assets/broll-07.jpg";

const BROLL_IMAGES = [broll01, broll02, broll03, broll04, broll05, broll06, broll07];

interface SceneConfig {
  id: string;
  startFrame: number;
  durationInFrames: number;
  badge: string;
  headline: string;
}

// 7 Scenes calibrated to 50.5 seconds @ 30fps (1515 frames) from CIT Voice Studio Timing
const SCENES: SceneConfig[] = [
  {
    id: "scene-01",
    startFrame: 0,
    durationInFrames: 192, // 0 - 6.4s
    badge: "MONOLITH FRACTURE",
    headline: "FPT GIẢM -46%\nĐẦU ĐÀN RƠI NHƯ CỔ RÁC?",
  },
  {
    id: "scene-02",
    startFrame: 192,
    durationInFrames: 220, // 6.4 - 13.7s
    badge: "BẺ GÃY ẢO TƯỞNG",
    headline: "ẢO TƯỞNG TÍCH SẢN\nNHẮM MẮT CŨNG GIÀU?",
  },
  {
    id: "scene-03",
    startFrame: 412,
    durationInFrames: 256, // 13.7 - 22.3s
    badge: "SỰ THẬT 1: RÒ RỈ DÒNG TIỀN",
    headline: "LÃI SỔ SÁCH 10.000 TỶ\nTIỀN VỀ CHỈ MỘT NỬA!",
  },
  {
    id: "scene-04",
    startFrame: 668,
    durationInFrames: 249, // 22.3 - 30.6s
    badge: "SỰ THẬT 2: KHỐI NGOẠI XẢ",
    headline: "ROOM NGOẠI TỤT VỀ 26%\nNHỎ LẺ ÔM 75% TRÔI NỔI",
  },
  {
    id: "scene-05",
    startFrame: 917,
    durationInFrames: 165, // 30.6 - 36.1s
    badge: "SỰ THẬT 3: BONG BÓNG AI",
    headline: "BONG BÓNG AI XẸP HƠI\nĐỊNH GIÁ P/E BỊ NÉN SÂU",
  },
  {
    id: "scene-06",
    startFrame: 1082,
    durationInFrames: 283, // 36.1 - 45.5s
    badge: "LƯỚI LASER PHÒNG THỦ",
    headline: "RSI 16: CẤM BẮT ĐÁY!\nHỒI 56k-58k ĐỂ HẠ TỶ TRỌNG",
  },
  {
    id: "scene-07",
    startFrame: 1365,
    durationInFrames: 150, // 45.5 - 50.5s
    badge: "THOÁT HÀNG AN TOÀN",
    headline: "BẠN ĐANG KẸP FPT GIÁ NÀO?\nCOMMENT ĐỂ TÍNH ĐIỂM THOÁT",
  },
];

const TOTAL_FRAMES = 1515;

export const FptCrashVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Floating background motion to eliminate freeze frames (>3s)
  const ambientY = interpolate(frame, [0, TOTAL_FRAMES], [0, 80], { extrapolateRight: "clamp" });
  const pulseScale = Math.sin(frame / 12) * 0.05 + 1.0;
  const scanY = (frame * 16) % (height + 400) - 200;

  const words = useMemo(() => {
    return ((timingData as any).words || []) as SubtitleWord[];
  }, []);

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#050811", // Obsidian Black Forensic
        fontFamily: "'Be Vietnam Pro', -apple-system, sans-serif",
        color: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      {/* 1. Global Ambient Space & Full-Bleed Lighting */}
      <AbsoluteFill style={{ pointerEvents: "none", zIndex: 1 }}>
        {/* Warning Crimson Aura Top-Right */}
        <div
          style={{
            position: "absolute",
            top: -120 + ambientY * 0.5,
            right: -120,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 42, 66, 0.25) 0%, rgba(5, 8, 17, 0) 70%)",
            filter: "blur(80px)",
            transform: `scale(${pulseScale})`,
          }}
        />
        {/* Electric Cyan Depth Glow Bottom-Left */}
        <div
          style={{
            position: "absolute",
            bottom: -150 - ambientY * 0.5,
            left: -120,
            width: 850,
            height: 850,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.18) 0%, rgba(5, 8, 17, 0) 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Dynamic Scanning Laser Beam */}
        <div
          style={{
            position: "absolute",
            top: scanY,
            left: 0,
            width: 1080,
            height: 4,
            background: "linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.9) 50%, transparent 100%)",
            boxShadow: "0 0 20px rgba(0, 240, 255, 1)",
          }}
        />

        {/* Cyber Coordinate Grid */}
        <svg width={width} height={height} style={{ position: "absolute", opacity: 0.1 }}>
          <defs>
            <pattern id="fptMonolithGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fptMonolithGrid)" />
        </svg>

        {/* Top HUD Status - Borderless Full-Bleed */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#FF2A42",
                boxShadow: "0 0 16px #FF2A42",
                transform: `scale(${Math.sin(frame / 5) * 0.25 + 1})`,
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 900, color: "#F8FAFC", letterSpacing: "0.1em" }}>
              FPT · HOSE FORENSIC
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: "#FF2A42", textShadow: "0 0 15px rgba(255,42,66,0.8)" }}>
              52,700 đ
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#FFFFFF",
                backgroundColor: "#FF2A42",
                padding: "4px 12px",
                borderRadius: 4,
                boxShadow: "0 0 12px rgba(255,42,66,0.6)",
              }}
            >
              -46.0%
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* 2. 7 Multi-Scene Procedural Sequences (Zero-Card Mandate) */}
      {SCENES.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
        >
          <SceneContent scene={scene} index={index} />
        </Sequence>
      ))}

      {/* 3. Speech-Synced Subtitles */}
      {words && words.length > 0 && frame < TOTAL_FRAMES - 90 && (
        <SpeechSyncedSubtitles
          words={words}
          positionY={1500}
          fontSize={40}
          activeColor="#FFB703" // Cyber Gold highlight
          inactiveColor="rgba(255, 255, 255, 0.92)"
          backgroundColor="rgba(5, 8, 17, 0.95)"
          borderColor="rgba(255, 42, 66, 0.5)"
          chunkSize={6}
        />
      )}

      {/* 4. Brand Outro at final frames */}
      <Sequence from={TOTAL_FRAMES - 90} durationInFrames={90}>
        <UserBrandOutro
          headline="TIẾN DƯƠNG · TÀI CHÍNH THỰC CHIẾN"
          highlightText="Bình luận giá kẹp để nhận kịch bản thoát hàng an toàn!"
          accentColor="#FFB703"
          secondaryAccent="#FF2A42"
          backgroundColor="transparent"
        />
      </Sequence>

      {/* 5. 7-Segment Dynamic Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 50,
          right: 50,
          height: 6,
          display: "flex",
          gap: 6,
          zIndex: 99,
        }}
      >
        {SCENES.map((sc) => {
          const scEnd = sc.startFrame + sc.durationInFrames;
          const isPast = frame >= scEnd;
          const isCurrent = frame >= sc.startFrame && frame < scEnd;
          const progressPercent = isPast
            ? 100
            : isCurrent
            ? Math.min(100, Math.max(0, ((frame - sc.startFrame) / sc.durationInFrames) * 100))
            : 0;

          return (
            <div
              key={sc.id}
              style={{
                flex: sc.durationInFrames,
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  backgroundColor: isCurrent ? "#FFB703" : "#00F0FF",
                  borderRadius: 3,
                  boxShadow: isCurrent ? "0 0 12px rgba(255, 183, 3, 0.9)" : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * SceneContent Wrapper - Zero Card, Full-Bleed Spatial Graphic
 */
const SceneContent: React.FC<{ scene: SceneConfig; index: number }> = ({ scene, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const bgScale = interpolate(frame, [0, scene.durationInFrames], [1.02, 1.14], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Background B-roll image as subtle atmospheric texture (low opacity) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BROLL_IMAGES[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${bgScale})`,
          opacity: 0.22,
          filter: "brightness(0.55) contrast(1.3) grayscale(30%)",
        }}
      />
      {/* Dark Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(5,8,17,0.4) 0%, rgba(5,8,17,0.95) 85%)",
        }}
      />

      {/* Main Content Area - Full-Bleed Spatial Graphic */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 50,
          right: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${enterSpring}) translateY(${(1 - enterSpring) * 20}px)`,
          opacity: enterSpring,
          zIndex: 10,
        }}
      >
        {/* Category Pill Tag */}
        <div
          style={{
            border: `1.5px solid ${index === 0 ? "#FF2A42" : "#00F0FF"}`,
            padding: "8px 26px",
            borderRadius: 30,
            fontSize: 20,
            fontWeight: 900,
            color: index === 0 ? "#FF2A42" : "#00F0FF",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 16,
            background: "rgba(5, 8, 17, 0.7)",
            boxShadow: `0 0 25px ${index === 0 ? "rgba(255,42,66,0.5)" : "rgba(0,240,255,0.4)"}`,
          }}
        >
          {scene.badge}
        </div>

        {/* Dynamic Scene Headline (Kinetic Impact) */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.25,
            color: "#FFFFFF",
            textShadow: "0 4px 30px rgba(0,0,0,0.95), 0 0 20px rgba(255, 42, 66, 0.6)",
            margin: "0 0 35px",
            whiteSpace: "pre-line",
          }}
        >
          {scene.headline}
        </h1>

        {/* ZERO-CARD PROCEDURAL GRAPHICS */}
        {index === 0 && <MonolithFractureHook frame={frame} />}
        {index === 1 && <DeepCrackAgitation frame={frame} />}
        {index === 2 && <CashflowPipelineLeak frame={frame} />}
        {index === 3 && <ForeignPressureValve frame={frame} />}
        {index === 4 && <AiCoreOverheatBubble frame={frame} />}
        {index === 5 && <LaserDefenseGrid frame={frame} />}
        {index === 6 && <TerminalInteraction frame={frame} />}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// 1. SCENE 1: THE MONOLITH FRACTURE & PLUNGE (Zero-Card Full-Bleed)
// ============================================================================
const MonolithFractureHook: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = Math.min(1, frame / 50);
  const price = Math.round(interpolate(progress, [0, 1], [97470, 52700]));
  const pct = (interpolate(progress, [0, 1], [0.0, -46.0])).toFixed(1);

  // Screen shake during fracture
  const shakeX = progress < 1 ? Math.sin(frame * 2.2) * 10 * (1 - progress * 0.5) : 0;
  const shakeY = progress < 1 ? Math.cos(frame * 2.5) * 8 * (1 - progress * 0.5) : 0;

  // Monolith fracture offset (the right block slides down)
  const slideDown = interpolate(progress, [0, 1], [0, 70]);

  return (
    <div style={{ width: "100%", transform: `translate(${shakeX}px, ${shakeY}px)`, position: "relative" }}>
      {/* Dynamic Big Numbers - Floating Free */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 20, color: "#94A3B8", fontWeight: 700, letterSpacing: "0.08em" }}>ĐỈNH CAO:</span>
          <div style={{ fontSize: 34, color: "#F8FAFC", fontWeight: 900 }}>97,470 đ</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: 20, color: "#FF2A42", fontWeight: 800 }}>ĐÁY SỤT GIẢM:</span>
          <div style={{ fontSize: 50, color: "#FF2A42", fontWeight: 900, textShadow: "0 0 25px #FF2A42" }}>
            {price.toLocaleString()} đ ({pct}%)
          </div>
        </div>
      </div>

      {/* SVG Monolith Structure Splitting Along Fault Line */}
      <svg width="980" height="420" viewBox="0 0 980 420">
        <defs>
          <linearGradient id="monolithGradLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0A1128" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="monolithGradRight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF2A42" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1C0508" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Support Grid Guidelines */}
        <line x1="40" y1="80" x2="940" y2="80" stroke="#1E293B" strokeDasharray="4 4" />
        <line x1="40" y1="200" x2="940" y2="200" stroke="#F59E0B" strokeDasharray="6 6" strokeWidth="1.5" />
        <line x1="40" y1="320" x2="940" y2="320" stroke="#FF2A42" strokeDasharray="6 6" strokeWidth="2" />

        <text x="50" y="72" fill="#64748B" fontSize="18" fontWeight="700">Đỉnh 97.4k</text>
        <text x="50" y="192" fill="#F59E0B" fontSize="18" fontWeight="700">MA50 (76.2k) — THỦNG</text>
        <text x="50" y="312" fill="#FF2A42" fontSize="18" fontWeight="700">MA200 (68.3k) — GÃY SÂU</text>

        {/* Left Monolith Half */}
        <path d="M 120 40 L 460 40 L 320 380 L 120 380 Z" fill="url(#monolithGradLeft)" stroke="#00F0FF" strokeWidth="2.5" />

        {/* Right Monolith Half (Slides down on fracture) */}
        <g transform={`translate(0, ${slideDown})`}>
          <path d="M 480 50 L 860 50 L 860 380 L 340 380 Z" fill="url(#monolithGradRight)" stroke="#FF2A42" strokeWidth="3" />
          {/* Laser Fracture Line */}
          <line x1="470" y1="40" x2="330" y2="390" stroke="#FF2A42" strokeWidth="6" strokeDasharray="8 4" />
        </g>

        {/* Plummeting Candlesticks Drawing */}
        {[
          { x: 180, y: 70, h: 50, f: 0 },
          { x: 320, y: 120, h: 70, f: 10 },
          { x: 460, y: 190, h: 80, f: 20 },
          { x: 600, y: 250, h: 75, f: 30 },
          { x: 740, y: 310, h: 50, f: 40 },
        ].map((c, i) => {
          const cProg = Math.min(1, Math.max(0, (frame - c.f) / 10));
          return (
            <g key={i} opacity={cProg} transform={`translate(0, ${(1 - cProg) * -30})`}>
              <line x1={c.x + 15} y1={c.y - 20} x2={c.x + 15} y2={c.y + c.h + 20} stroke="#FF2A42" strokeWidth="3" />
              <rect x={c.x} y={c.y} width="30" height={c.h} fill="#FF2A42" rx="4" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================================
// 2. SCENE 2: LAO VÀO VẾT NỨT & SÓNG TIM ECG (Zero-Card Full-Bleed)
// ============================================================================
const DeepCrackAgitation: React.FC<{ frame: number }> = ({ frame }) => {
  const lossProg = Math.min(1, frame / 50);
  const lossVal = (interpolate(lossProg, [0, 1], [-8.0, -43.02])).toFixed(2);
  const beat = Math.sin(frame / 3.5) > 0.6 ? 1.06 : 1.0;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Slashed Illusion Headline */}
      <div style={{ position: "relative", marginBottom: 35 }}>
        <div style={{ fontSize: 38, fontWeight: 900, color: "rgba(255, 255, 255, 0.4)", letterSpacing: "0.06em" }}>
          ẢO TƯỞNG: "CỔ PHIẾU TỐT THÌ KHÔNG THỂ SẬP"
        </div>
        {/* Red Laser Slash */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: -30,
            right: -30,
            height: 5,
            backgroundColor: "#FF2A42",
            boxShadow: "0 0 20px #FF2A42",
            transform: "rotate(-3deg)",
          }}
        />
      </div>

      {/* Big Loss Callout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          padding: "24px 40px",
          borderLeft: "6px solid #FF2A42",
          background: "linear-gradient(90deg, rgba(255,42,66,0.15) 0%, transparent 100%)",
          marginBottom: 30,
          transform: `scale(${beat})`,
        }}
      >
        <div>
          <div style={{ fontSize: 24, color: "#94A3B8", fontWeight: 700 }}>TÀI KHOẢN TÍCH SẢN:</div>
          <div style={{ fontSize: 32, color: "#F8FAFC", fontWeight: 900 }}>Vốn 500 Triệu $\rightarrow$ Còn 285 Triệu</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, color: "#FF2A42", fontWeight: 800 }}>TỔNG LỖ:</div>
          <div style={{ fontSize: 60, color: "#FF2A42", fontWeight: 900, textShadow: "0 0 30px #FF2A42" }}>
            {lossVal}%
          </div>
        </div>
      </div>

      {/* Dynamic Pulsing ECG Heartbeat Wave */}
      <svg width="900" height="90" viewBox="0 0 900 90">
        <path
          d={`M 0 45 L 250 45 L 280 15 L 300 75 L 320 5 L 340 85 L 360 45 L ${360 + ((frame * 15) % 520)} 45`}
          fill="none"
          stroke="#FF2A42"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div style={{ fontSize: 26, color: "#FFB703", fontWeight: 900, letterSpacing: "0.08em", marginTop: 20 }}>
        ⚡ ĐỪNG ĐỔ LỖI CHO LÁI — ĐÂY LÀ 3 SỰ THẬT TÀI CHÍNH TRẦN TRỤI!
      </div>
    </div>
  );
};

// ============================================================================
// 3. SCENE 3: PIPELINE RÒ RỈ DÒNG TIỀN (Zero-Card Full-Bleed)
// ============================================================================
const CashflowPipelineLeak: React.FC<{ frame: number }> = ({ frame }) => {
  const lnstHeight = interpolate(Math.min(1, frame / 30), [0, 1], [0, 260]);
  const cfoHeight = interpolate(Math.min(1, Math.max(0, (frame - 35) / 30)), [0, 1], [0, 128]);
  const stampSpring = spring({
    frame: frame - 65,
    fps: 30,
    config: { damping: 10, stiffness: 150, mass: 0.9 },
  });

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#00F0FF", textAlign: "center", marginBottom: 30 }}>
        CƠ CHẾ RÒ RỈ: LÃI SỔ SÁCH VS TIỀN THỰC THU
      </div>

      {/* Waterfall Comparison Columns */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: 350, paddingBottom: 20 }}>
        {/* LNST Pillar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#00F0FF" }}>10,287 TỶ</span>
          <div
            style={{
              width: 170,
              height: lnstHeight,
              background: "linear-gradient(180deg, #00F0FF 0%, #0284C7 100%)",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 0 35px rgba(0, 240, 255, 0.6)",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 800, color: "#F8FAFC" }}>Lãi Sổ Sách (LNST)</span>
        </div>

        {/* Split Factor Ratio */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingBottom: 60 }}>
          <span style={{ fontSize: 44, fontWeight: 900, color: "#FF2A42", textShadow: "0 0 20px #FF2A42" }}>0.49x</span>
          <span style={{ fontSize: 20, color: "#94A3B8", fontWeight: 700 }}>Tỷ lệ thu tiền</span>
          <div style={{ fontSize: 34, color: "#FF2A42" }}>$\longrightarrow$</div>
        </div>

        {/* CFO Pillar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#FFB703" }}>5,060 TỶ</span>
          <div
            style={{
              width: 170,
              height: cfoHeight,
              background: "linear-gradient(180deg, #FFB703 0%, #D97706 100%)",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 0 35px rgba(255, 183, 3, 0.6)",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 800, color: "#F8FAFC" }}>Tiền Mặt Thật (CFO)</span>
        </div>
      </div>

      {/* Forensic Audit Stamp Impact */}
      {frame > 65 && (
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 80,
            right: 80,
            transform: `scale(${stampSpring}) rotate(-4deg)`,
            opacity: stampSpring,
            background: "rgba(255, 42, 66, 0.95)",
            border: "4px solid #FFFFFF",
            borderRadius: 14,
            padding: "20px 24px",
            textAlign: "center",
            boxShadow: "0 10px 50px rgba(0,0,0,0.9), 0 0 40px #FF2A42",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.06em" }}>
            ĐÓNG MỘC: KẸT 5.227 TỶ CÔNG NỢ & CAPEX!
          </div>
          <div style={{ fontSize: 20, color: "#FEE2E2", fontWeight: 700, marginTop: 6 }}>
            Hơn 50% lợi nhuận nằm trên giấy tờ khách nợ chưa trả
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. SCENE 4: VAN XẢ KHỐI NGOẠI & FREE-FLOAT PHÌNH TO (Zero-Card Full-Bleed)
// ============================================================================
const ForeignPressureValve: React.FC<{ frame: number }> = ({ frame }) => {
  const prog = Math.min(1, frame / 50);
  const room = (interpolate(prog, [0, 1], [49.0, 26.63])).toFixed(2);
  const floatVal = (interpolate(prog, [0, 1], [51.0, 75.7])).toFixed(1);
  const needleRot = interpolate(prog, [0, 1], [45, -65]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#F8FAFC", textAlign: "center", marginBottom: 30 }}>
        VAN ÁP SUẤT: KHỐI NGOẠI THÁO CHẠY — F0 ÔM TRỌN
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 50, marginBottom: 35 }}>
        {/* Animated Pressure Valve Gauge */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <span style={{ fontSize: 22, color: "#94A3B8", fontWeight: 800 }}>TỶ LỆ ROOM NGOẠI</span>
          <svg width="240" height="140" viewBox="0 0 240 140" style={{ margin: "14px auto" }}>
            <path d="M 25 120 A 95 95 0 0 1 215 120" fill="none" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
            <path
              d="M 25 120 A 95 95 0 0 1 215 120"
              fill="none"
              stroke="#FF2A42"
              strokeWidth="20"
              strokeDasharray="298"
              strokeDashoffset={298 * (1 - (parseFloat(room) / 49))}
              strokeLinecap="round"
            />
            {/* Needle */}
            <line
              x1="120"
              y1="120"
              x2="120"
              y2="40"
              stroke="#FFB703"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${needleRot} 120 120)`}
            />
            <circle cx="120" cy="120" r="12" fill="#FFB703" />
          </svg>
          <div style={{ fontSize: 44, color: "#FF2A42", fontWeight: 900 }}>{room}%</div>
          <span style={{ fontSize: 20, color: "#F87171", fontWeight: 800 }}>Tây xả ròng rã liên tục</span>
        </div>

        {/* Free-Float Surge Bar */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontSize: 22, color: "#94A3B8", fontWeight: 800, marginBottom: 12 }}>TRÔI NỔI TỰ DO (FREE-FLOAT)</span>
          <div style={{ fontSize: 56, color: "#FFB703", fontWeight: 900, marginBottom: 16 }}>{floatVal}%</div>

          <div style={{ width: "100%", height: 32, backgroundColor: "#1E293B", borderRadius: 16, overflow: "hidden", border: "1.5px solid #FFB703" }}>
            <div
              style={{
                width: `${floatVal}%`,
                height: "100%",
                background: "linear-gradient(90deg, #F59E0B 0%, #FF2A42 100%)",
                borderRadius: 16,
              }}
            />
          </div>
          <span style={{ fontSize: 20, color: "#FBBF24", fontWeight: 800, marginTop: 14 }}>
            Nhỏ lẻ cá nhân ôm lại sạch 75.7%
          </span>
        </div>
      </div>

      <div style={{ fontSize: 24, color: "#E2E8F0", textAlign: "center", fontWeight: 800, lineHeight: 1.4 }}>
        ⚠️ Cổ phiếu bị phân mảnh cực độ $\rightarrow$ Khi giảm sẽ tạo hiệu ứng tuyết lăn dẫm đạp lên nhau chạy!
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCENE 5: LÕI CHIP AI QUÁ NHIỆT & P/E NỔ XẸP (Zero-Card Full-Bleed)
// ============================================================================
const AiCoreOverheatBubble: React.FC<{ frame: number }> = ({ frame }) => {
  const pProg = Math.min(1, frame / 50);
  const pe = (interpolate(pProg, [0, 1], [28.5, 18.2])).toFixed(1);
  const bubbleScale = interpolate(pProg, [0, 1], [1.4, 0.8]);
  const spark = Math.sin(frame / 2.5) * 0.4 + 0.6;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#FFB703", textAlign: "center", marginBottom: 35 }}>
        LÕI CHIP AI QUÁ NHIỆT: ĐỊNH GIÁ P/E BỊ NÉN SÂU
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: 35 }}>
        {/* Overheated AI Bubble Deflating */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,240,255,0.7) 0%, rgba(2,132,199,0.1) 70%)",
            border: "3px solid #00F0FF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${bubbleScale})`,
            boxShadow: "0 0 40px rgba(0,240,255,0.9)",
          }}
        >
          <span style={{ fontSize: 20, color: "#F8FAFC", fontWeight: 800 }}>KỲ VỌNG AI</span>
          <span style={{ fontSize: 44, color: "#00F0FF", fontWeight: 900 }}>{pe}x</span>
          <span style={{ fontSize: 18, color: "#94A3B8" }}>P/E RATIO</span>
        </div>

        <div style={{ fontSize: 48, color: "#FF2A42", fontWeight: 900 }}>$\longrightarrow$</div>

        {/* GPU Overheat Circuit Sparks */}
        <div style={{ textAlign: "center", opacity: spark }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>⚡🔥</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#FF2A42" }}>CAPEX QUÁ TẢI</div>
          <div style={{ fontSize: 18, color: "#94A3B8", marginTop: 4 }}>Chi phí GPU ngốn sạch dòng tiền</div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "0 40px" }}>
        <span style={{ fontSize: 24, color: "#F8FAFC", fontWeight: 800, lineHeight: 1.4 }}>
          💡 AI chưa kịp đẻ ra tiền thì chi phí hạ tầng máy móc đã ngốn sạch dòng tiền $\rightarrow$ Thị trường định giá lại!
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCENE 6: LƯỚI LASER PHÒNG THỦ & RSI 16.4 (Zero-Card Full-Bleed)
// ============================================================================
const LaserDefenseGrid: React.FC<{ frame: number }> = ({ frame }) => {
  const rProg = Math.min(1, frame / 45);
  const rsi = (interpolate(rProg, [0, 1], [45.0, 16.4])).toFixed(1);
  const radarAngle = (frame * 8) % 360;

  return (
    <div style={{ width: "100%" }}>
      {/* Top RSI Barometer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="#FF2A42" strokeWidth="2.5" />
            <line x1="24" y1="24" x2="24" y2="2" stroke="#00F0FF" strokeWidth="3" transform={`rotate(${radarAngle} 24 24)`} />
          </svg>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#FF2A42" }}>RSI(14): {rsi} ĐIỂM</span>
        </div>
        <span style={{ fontSize: 20, color: "#FFFFFF", background: "#FF2A42", padding: "6px 18px", borderRadius: 6, fontWeight: 900 }}>
          QUÁ BÁN CỰC ĐẠI
        </span>
      </div>

      {/* Dual Laser Defense Boundaries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Warning Principle */}
        <div style={{ borderLeft: "6px solid #FF2A42", padding: "16px 24px", background: "linear-gradient(90deg, rgba(255,42,66,0.18) 0%, transparent 100%)" }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#FF4D4D" }}>⛔ NGUYÊN TẮC THÉP: </span>
          <span style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF" }}>CẤM BẮT ĐÁY DƯỚI MA200!</span>
        </div>

        {/* Boundary 1 - Laser Gold */}
        <div style={{ borderLeft: "6px solid #F59E0B", padding: "16px 24px", background: "linear-gradient(90deg, rgba(245,158,11,0.18) 0%, transparent 100%)" }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#FBBF24" }}>VÙNG CẢN HỒI KỸ THUẬT: </span>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#FBBF24" }}>56,000 – 58,000 đ (HẠ TỶ TRỌNG)</span>
        </div>

        {/* Boundary 2 - Laser Crimson */}
        <div style={{ borderLeft: "6px solid #FF2A42", padding: "16px 24px", background: "linear-gradient(90deg, rgba(255,42,66,0.25) 0%, transparent 100%)" }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#FF4D4D" }}>NGƯỠNG CẮT LỖ SINH TỬ: </span>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#FF2A42", textShadow: "0 0 20px #FF2A42" }}>50,100 đ</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. SCENE 7: TERMINAL TƯƠNG TÁC (Zero-Card Full-Bleed)
// ============================================================================
const TerminalInteraction: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame / 6) * 0.08 + 1.0;

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div style={{ fontSize: 38, fontWeight: 900, color: "#FFB703", marginBottom: 25, textShadow: "0 0 25px rgba(255,183,3,0.8)" }}>
        BẠN ĐANG KẸP FPT Ở GIÁ NÀO?
      </div>

      <div
        style={{
          borderBottom: "3px solid #00F0FF",
          padding: "20px 0",
          marginBottom: 25,
          transform: `scale(${pulse})`,
        }}
      >
        <span style={{ fontSize: 30, color: "#F8FAFC", fontWeight: 900 }}>
          👉 Hãy để lại bình luận mức giá vốn của bạn bên dưới!
        </span>
      </div>

      <div style={{ fontSize: 24, color: "#94A3B8", fontWeight: 700 }}>
        Tiến Dương sẽ cùng bạn giải phẫu danh mục và tính toán điểm thoát hàng an toàn nhất.
      </div>
    </div>
  );
};
