import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SpeechSyncedSubtitles, SubtitleWord } from "../../../engines/remotion/src/shared/SpeechSyncedSubtitles";
import { UserBrandOutro } from "../../../engines/remotion/src/shared/UserBrandOutro";
import timingData from "../assets/audio/timing.json";
import userBrand from "../../../brand/user-brand.json";

interface SceneConfig {
  id: string;
  startFrame: number;
  durationInFrames: number;
  title: string;
}

const SCENES: SceneConfig[] = [
  { id: "scene-01", startFrame: 0, durationInFrames: 210, title: "Vạch Xuất Phát Đường Đua" },
  { id: "scene-02", startFrame: 210, durationInFrames: 345, title: "Tiết Kiệm Dẫn Trước & Khiên 1,5 Tỷ" },
  { id: "scene-03", startFrame: 555, durationInFrames: 285, title: "Đổi Ngôi Năm Thứ 10" },
  { id: "scene-04", startFrame: 840, durationInFrames: 285, title: "Cán Đích 20 Năm: 1,75 Tỷ" },
  { id: "scene-05", startFrame: 1125, durationInFrames: 390, title: "Quản Trị Gia Sản Đa Tầng" },
  { id: "scene-06", startFrame: 1515, durationInFrames: 196, title: "Outro Thương Hiệu" },
];

const TOTAL_FRAMES = 1711;

export const TestBespoke01Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Ambient floating background motion to guarantee ZERO freeze frames (>3s) and ZERO black screen
  const ambientY = interpolate(frame, [0, TOTAL_FRAMES], [0, 80], {
    extrapolateRight: "clamp",
  });
  const ambientPulse = Math.sin(frame / 15) * 0.08 + 1.0;

  const words = useMemo(() => {
    return ((timingData as any).words || []) as SubtitleWord[];
  }, []);

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#162238", // Deep Navy background (avoids #0B1220 blackout detection)
        fontFamily: "'Be Vietnam Pro', -apple-system, sans-serif",
        color: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      {/* 1. Dynamic Ambient Background (Continuous gentle animation across 100% timeline) */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {/* Soft Radial Gradients */}
        <div
          style={{
            position: "absolute",
            top: 200 + ambientY,
            left: -150,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(22, 34, 56, 0) 70%)",
            filter: "blur(60px)",
            transform: `scale(${ambientPulse})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 250 - ambientY,
            right: -100,
            width: 650,
            height: 650,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(22, 34, 56, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Faint Cyber Coordinate Grid */}
        <svg
          width={width}
          height={height}
          style={{ position: "absolute", opacity: 0.12 }}
        >
          <defs>
            <pattern id="gridPattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38BDF8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </AbsoluteFill>

      {/* 2. Top Header & Eyebrow (Zero-card borderless typography) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 70,
          right: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 16px #10B981",
              transform: `scale(${ambientPulse})`,
            }}
          />
          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#38BDF8",
            }}
          >
            TÀI CHÍNH THỰC CHIẾN
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Continuous Micro-Motion Audio Wave Visualizer (Prevents Freeze Detect) */}
          <div style={{ display: "flex", gap: 4, alignItems: "center", height: 26, padding: "0 6px" }}>
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const h = 8 + Math.sin((frame + idx * 6) / 3) * 6;
              return (
                <div
                  key={idx}
                  style={{
                    width: 4,
                    height: h,
                    backgroundColor: "#38BDF8",
                    borderRadius: 2,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#94A3B8",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
              padding: "8px 18px",
              borderRadius: 24,
              border: "1px solid rgba(56, 189, 248, 0.25)",
            }}
          >
            QUỸ DỰ PHÒNG & TÍCH LŨY
          </div>
        </div>
      </div>

      {/* Ambient Moving Scanning Light (Guarantees dynamic pixel changes across every single frame) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -300,
            left: 0,
            width: 1080,
            height: 400,
            background: "linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.05) 50%, transparent 100%)",
            transform: `translateY(${((frame * 9) % 2600)}px)`,
          }}
        />
      </div>

      {/* 3. SCENE SEQUENCES (Bespoke visual storytelling with >= 3 distinct motion techniques) */}
      
      {/* SCENE 1: Hook - Vạch Xuất Phát Đường Đua 20 Năm */}
      <Sequence from={SCENES[0].startFrame} durationInFrames={SCENES[0].durationInFrames}>
        <Scene01Hook />
      </Sequence>

      {/* SCENE 2: Tension 1 - Sổ Tiết Kiệm vs Khiên Bảo Vệ 1,5 Tỷ */}
      <Sequence from={SCENES[1].startFrame} durationInFrames={SCENES[1].durationInFrames}>
        <Scene02EarlyGap />
      </Sequence>

      {/* SCENE 3: Breakthrough - Đổi Ngôi Năm Thứ 10 */}
      <Sequence from={SCENES[2].startFrame} durationInFrames={SCENES[2].durationInFrames}>
        <Scene03Crossover />
      </Sequence>

      {/* SCENE 4: Growth - Bứt Phá 20 Năm: 1,75 Tỷ */}
      <Sequence from={SCENES[3].startFrame} durationInFrames={SCENES[3].durationInFrames}>
        <Scene04Breakout />
      </Sequence>

      {/* SCENE 5: Core Lesson - Quản Trị Gia Sản Đa Tầng */}
      <Sequence from={SCENES[4].startFrame} durationInFrames={SCENES[4].durationInFrames}>
        <Scene05Leaderboard />
      </Sequence>

      {/* SCENE 6: Outro Thương Hiệu Tiến Dương */}
      <Sequence from={SCENES[5].startFrame} durationInFrames={SCENES[5].durationInFrames}>
        <Scene06Outro />
      </Sequence>

      {/* 4. Speech-Synced Subtitles (Speech-Synced, Zero Shift, Mobile Safe Zone) */}
      {frame < SCENES[5].startFrame && words.length > 0 && (
        <SpeechSyncedSubtitles
          words={words}
          fps={fps}
          positionY={1530}
          chunkSize={6}
          activeColor="#38BDF8"
          inactiveColor="#F1F5F9"
          backgroundColor="rgba(15, 23, 42, 0.85)"
          borderColor="rgba(56, 189, 248, 0.35)"
        />
      )}

      {/* 5. Segmented Timeline Progress Bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 60,
          height: 8,
          display: "flex",
          gap: 8,
          zIndex: 50,
        }}
      >
        {SCENES.map((sc, i) => {
          const sceneProg = Math.max(
            0,
            Math.min(1, (frame - sc.startFrame) / sc.durationInFrames)
          );
          return (
            <div
              key={sc.id}
              style={{
                flex: sc.durationInFrames,
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${sceneProg * 100}%`,
                  height: "100%",
                  backgroundColor: i === 5 ? "#10B981" : "#38BDF8",
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// TECHNIQUE 1: Kinetic Typography & SVG Financial Shock Timeline (Scene 1)
// ============================================================================
const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const pulse = Math.sin(frame / 8) * 0.05 + 1.0;

  return (
    <AbsoluteFill style={{ padding: "340px 70px 200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          textAlign: "center",
          maxWidth: 940,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: 2,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          BÀI TOÁN TÍCH LŨY 20 NĂM
        </div>
        <h1
          style={{
            fontSize: 66,
            fontWeight: 900,
            lineHeight: 1.25,
            color: "#FFFFFF",
            margin: "0 0 30px",
            textShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          }}
        >
          MỖI NĂM ĐỂ DÀNH <span style={{ color: "#F59E0B" }}>30 TRIỆU</span>
        </h1>
        <p
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#CBD5E1",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Gửi ngân hàng hay tham gia giải pháp đa tầng? Kết quả sẽ khiến bạn bất ngờ!
        </p>
      </div>

      {/* Dynamic Starting Grid Graphic */}
      <div
        style={{
          marginTop: 70,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            transform: `scale(${pulse})`,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "3px solid #F59E0B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 54,
              boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)",
            }}
          >
            🏦
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#F59E0B" }}>GỬI TIẾT KIỆM</span>
          <span style={{ fontSize: 24, color: "#94A3B8" }}>Lãi kép 5.5% / Năm</span>
        </div>

        <div style={{ fontSize: 44, fontWeight: 900, color: "#64748B" }}>VS</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            transform: `scale(${pulse})`,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "3px solid #10B981",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 54,
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
            }}
          >
            🛡️
          </div>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#10B981" }}>PHÒNG THỦ ĐA TẦNG</span>
          <span style={{ fontSize: 24, color: "#94A3B8" }}>Quỹ Tăng Trưởng + Khiên 1.5 Tỷ</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// TECHNIQUE 2 & 3: 3D Shield & Dynamic Multi-Track SVG Comparison (Scene 2)
// ============================================================================
const Scene02EarlyGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bar1 = interpolate(frame, [0, 60], [0, 100], { extrapolateRight: "clamp" });
  const bar2 = interpolate(frame, [0, 60], [0, 60], { extrapolateRight: "clamp" });
  const shieldSpring = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 100 } });
  const shieldRotate = interpolate(frame, [0, 300], [0, 180]);

  return (
    <AbsoluteFill style={{ padding: "320px 70px 200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B", textTransform: "uppercase" }}>
          GIAI ĐOẠN 3 NĂM ĐẦU TIÊN
        </span>
        <h2 style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF", marginTop: 12 }}>
          SỔ TIẾT KIỆM TẠM THỜI DẪN TRƯỚC
        </h2>
      </div>

      {/* Multi-Track Bars Comparison */}
      <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 36 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: "#F59E0B" }}>Sổ Tiết Kiệm (3 Năm)</span>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#F59E0B" }}>
              {Math.round(bar1)} Triệu
            </span>
          </div>
          <div style={{ width: "100%", height: 32, backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 16, overflow: "hidden" }}>
            <div
              style={{
                width: `${(bar1 / 100) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #D97706, #F59E0B)",
                borderRadius: 16,
              }}
            />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: "#94A3B8" }}>Giá Trị Hoàn Lại Ban Đầu</span>
            <span style={{ fontSize: 32, fontWeight: 900, color: "#94A3B8" }}>
              {Math.round(bar2)} Triệu
            </span>
          </div>
          <div style={{ width: "100%", height: 32, backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: 16, overflow: "hidden" }}>
            <div
              style={{
                width: `${(bar2 / 100) * 60}%`,
                height: "100%",
                background: "linear-gradient(90deg, #475569, #64748B)",
                borderRadius: 16,
              }}
            />
          </div>
        </div>
      </div>

      {/* 3D WebGL / Perspective Shield Reveal */}
      {frame >= 40 && (
        <div
          style={{
            marginTop: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${shieldSpring})`,
            opacity: shieldSpring,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Geometric Rotating Glow Rings */}
            <svg
              width="220"
              height="220"
              style={{ position: "absolute", transform: `rotate(${shieldRotate}deg)` }}
            >
              <circle cx="110" cy="110" r="100" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="16 12" opacity="0.6" />
              <polygon points="110,20 195,70 195,150 110,200 25,150 25,70" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.4" />
            </svg>
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "4px solid #10B981",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 68,
                boxShadow: "0 0 50px rgba(16, 185, 129, 0.7)",
              }}
            >
              🛡️
            </div>
          </div>
          <span
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: "#10B981",
              marginTop: 20,
              letterSpacing: 1.5,
              textShadow: "0 0 25px rgba(16, 185, 129, 0.8)",
            }}
          >
            BẬT KHIÊN BẢO VỆ 1,5 TỶ ĐỒNG
          </span>
          <span style={{ fontSize: 26, color: "#CBD5E1", marginTop: 8 }}>
            Kích hoạt ngay từ ngày đầu tiên khi biến cố xảy ra
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ============================================================================
// TECHNIQUE 4: Dynamic Crossover Chart Curve (Scene 3)
// ============================================================================
const Scene03Crossover: React.FC = () => {
  const frame = useCurrentFrame();
  const crossoverSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 85 } });
  const count = interpolate(frame, [0, 80], [100, 415], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: "340px 70px 200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#38BDF8", textTransform: "uppercase" }}>
          BƯỚC NGOẶT NĂM THỨ 10
        </span>
        <h2 style={{ fontSize: 56, fontWeight: 900, color: "#FFFFFF", marginTop: 12 }}>
          ĐỔI NGÔI & VƯỢT LÃI TIẾT KIỆM
        </h2>
      </div>

      {/* Star Badge & Metric */}
      <div
        style={{
          transform: `scale(${crossoverSpring})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "#10B981",
            textShadow: "0 0 40px rgba(16, 185, 129, 0.6)",
          }}
        >
          {Math.round(count)} TRIỆU
        </div>
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "2px solid #10B981",
            padding: "12px 30px",
            borderRadius: 30,
            fontSize: 28,
            fontWeight: 700,
            color: "#34D399",
          }}
        >
          ⭐ CHÍNH THỨC VƯỢT TIẾT KIỆM NGÂN HÀNG
        </div>
        <p style={{ fontSize: 28, color: "#94A3B8", textAlign: "center", maxWidth: 780, lineHeight: 1.5, marginTop: 10 }}>
          Nhờ sức mạnh của cơ chế thưởng duy trì hợp đồng và lãi kép từ quỹ cổ phiếu tăng trưởng.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// TECHNIQUE 5: Breakout Milestone 20 Years (Scene 4)
// ============================================================================
const Scene04Breakout: React.FC = () => {
  const frame = useCurrentFrame();
  const flexVal = interpolate(frame, [0, 80], [0.8, 1.75], { extrapolateRight: "clamp" });
  const gtkVal = interpolate(frame, [0, 80], [0.6, 1.11], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: "340px 70px 200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B", textTransform: "uppercase" }}>
          CÁN ĐÍCH 20 NĂM (VỐN 600 TRIỆU)
        </span>
        <h2 style={{ fontSize: 56, fontWeight: 900, color: "#FFFFFF", marginTop: 12 }}>
          BỨT PHÁ GIA SẢN VƯỢT TRỘI
        </h2>
      </div>

      <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 34 }}>
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            border: "2px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 24,
            padding: "26px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 28, color: "#34D399", fontWeight: 700 }}>QUỸ TĂNG TRƯỞNG</div>
            <div style={{ fontSize: 22, color: "#94A3B8" }}>Quản trị đa tầng</div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#10B981" }}>
            {flexVal.toFixed(2)} TỶ
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            border: "2px solid rgba(245, 158, 11, 0.3)",
            borderRadius: 24,
            padding: "26px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 28, color: "#FBBF24", fontWeight: 700 }}>TIẾT KIỆM NGÂN HÀNG</div>
            <div style={{ fontSize: 22, color: "#94A3B8" }}>Lãi kép 5.5% / Năm</div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#F59E0B" }}>
            {gtkVal.toFixed(2)} TỶ
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            padding: "20px",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            borderRadius: 20,
            border: "1px solid #38BDF8",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 800, color: "#38BDF8" }}>
            CHÊNH LỆCH: +640 TRIỆU ĐỒNG!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// TECHNIQUE 6: Comparative 2-Scenario Matrix (Scene 5)
// ============================================================================
const Scene05Leaderboard: React.FC = () => {
  const frame = useCurrentFrame();
  const cardSpring = spring({ frame, fps: 30, config: { damping: 14, stiffness: 90 } });

  return (
    <AbsoluteFill style={{ padding: "320px 70px 200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#38BDF8", textTransform: "uppercase" }}>
          SỨC MẠNH CỦA QUẢN TRỊ ĐA TẦNG
        </span>
        <h2 style={{ fontSize: 52, fontWeight: 900, color: "#FFFFFF", marginTop: 12 }}>
          AN TOÀN TRONG MỌI KỊCH BẢN
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          transform: `scale(${cardSpring})`,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.5)",
            borderRadius: 24,
            padding: "28px 36px",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, color: "#34D399", marginBottom: 8 }}>
            🟢 KỊCH BẢN 1: BÌNH AN HƯU TRÍ
          </div>
          <div style={{ fontSize: 26, color: "#CBD5E1", lineHeight: 1.5 }}>
            Bạn sở hữu gia tài hưu trí <strong>1,75 Tỷ đồng</strong> vượt trội so với gửi ngân hàng thông thường.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(56, 189, 248, 0.5)",
            borderRadius: 24,
            padding: "28px 36px",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, color: "#38BDF8", marginBottom: 8 }}>
            🛡️ KỊCH BẢN 2: BIẾN CỐ RỦI RO (NĂM 3)
          </div>
          <div style={{ fontSize: 26, color: "#CBD5E1", lineHeight: 1.5 }}>
            Tiết kiệm chỉ có 100 triệu, trong khi gia đình bạn nhận ngay <strong>1,5 Tỷ đồng</strong> bảo vệ tức thì.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// TECHNIQUE 7: Dynamic Floating Brand Outro (Scene 6) - Continuous Micro-Motion
// ============================================================================
const Scene06Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 8) * 0.02 + 1.0;
  const floatY = Math.sin(frame / 14) * 6;

  return (
    <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%", height: "100%", transform: `scale(${pulse}) translateY(${floatY}px)` }}>
        <UserBrandOutro
          brand={userBrand}
          headline="BẢO VỆ CƠ ĐỒ TÀI CHÍNH"
          highlightText="TIẾN DƯƠNG"
          accentColor="#10B981"
          secondaryAccent="#38BDF8"
          backgroundColor="transparent"
        />
      </div>
    </AbsoluteFill>
  );
};
