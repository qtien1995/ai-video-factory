import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import timingData from "../assets/audio/timing.json";

/**
 * AI Video Factory V4 — Pure Bespoke Video
 * Đề tài: Quy Tắc 72 — Bao Lâu Thì Tiền Của Bạn Tự Nhân Đôi?
 * Brand: Tiến Dương · TÀI CHÍNH THỰC CHIẾN
 * Khổ hình: 1080 × 1920 (9:16), 30fps
 * Tổng thời lượng thật: 53.37s (1602 frames)
 * Thẩm mỹ: Warm Forest Wealth & Champagne Gold (Pure Bespoke, Không dark-tech, Không neon matrix)
 */

interface SubtitleWord {
  word: string;
  startMs: number;
  durationMs: number;
}

export const QuyTac72Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Timeline đo theo lời đọc thực tế từ CIT Voice Studio Hải Đăng:
  // Cảnh 1: 0 - 210 frames (0 - 7.0s)      Hook: Đồng xu vàng phân tách đôi (100M -> 200M)
  // Cảnh 2: 210 - 600 frames (7.0 - 20.0s) Cơ chế: Phương trình sống 72 / r = Số năm
  // Cảnh 3: 600 - 1080 frames (20.0 - 36.0s) Sơ đồ sống: 3 cuộc đua (Bank 6% vs Tích sản 12% vs Lạm phát 4%)
  // Cảnh 4: 1080 - 1380 frames (36.0 - 46.0s) Insight: Đồ thị Parabol thời gian bùng nổ
  // Cảnh 5: 1380 - 1602 frames (46.0 - 53.4s) Outro: Nhận diện thương hiệu Tiến Dương

  const currentMs = (frame / fps) * 1000;
  const subtitles: SubtitleWord[] = (timingData.words as SubtitleWord[]) || [];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#051A18",
        fontFamily: "'Be Vietnam Pro', 'Montserrat', 'Segoe UI', sans-serif",
        color: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      {/* 1. NỀN THỊNH VƯỢNG HỮU CƠ (WARM WEALTH AMBIENT BACKGROUND) */}
      <AmbientWealthBackground frame={frame} fps={fps} />

      {/* 2. NỘI DUNG 5 PHÂN CẢNH BESPOKE */}
      {frame < 220 && <Scene1Hook frame={frame} fps={fps} />}
      {frame >= 210 && frame < 610 && <Scene2Formula frame={frame - 210} fps={fps} />}
      {frame >= 600 && frame < 1090 && <Scene3Race frame={frame - 600} fps={fps} />}
      {frame >= 1080 && frame < 1390 && <Scene4Parabola frame={frame - 1080} fps={fps} />}
      {frame >= 1380 && <Scene5Outro frame={frame - 1380} fps={fps} />}

      {/* 3. PHỤ ĐỀ ĐỒNG BỘ THEO TỪ — SINGLE LINE WORD JUMP */}
      <BespokeSubtitles
        subtitles={subtitles}
        currentMs={currentMs}
        frame={frame}
        totalFrames={durationInFrames}
      />

      {/* 4. THANH TIẾN TRÌNH TỐI GIẢN (PROGRESS BAR) */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 60,
          right: 60,
          height: 4,
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          borderRadius: 2,
          overflow: "hidden",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / durationInFrames) * 100}%`,
            background: "linear-gradient(90deg, #10B981, #E5B869)",
            borderRadius: 2,
          }}
        />
      </div>

      {/* 5. BRAND HEADER WATERMARK */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          zIndex: 90,
          opacity: 0.9,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#E5B869",
            boxShadow: "0 0 14px #E5B869",
          }}
        />
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#E2E8F0",
          }}
        >
          TIẾN DƯƠNG · TÀI CHÍNH THỰC CHIẾN
        </span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 1. NỀN HỮU CƠ WARM FOREST EMERALD
// =========================================================================
const AmbientWealthBackground: React.FC<{ frame: number; fps: number }> = ({
  frame,
}) => {
  const pulse = Math.sin(frame * 0.035) * 0.12 + 0.88;

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(circle at 50% 32%, rgba(16, 185, 129, ${0.2 * pulse}) 0%, transparent 65%),
          radial-gradient(circle at 75% 70%, rgba(229, 184, 105, ${0.14 * pulse}) 0%, transparent 55%),
          linear-gradient(180deg, #031412 0%, #062826 45%, #020D0C 100%)
        `,
      }}
    >
      {/* Vòng hào quang vàng xoay tròn nhẹ nhàng chống freeze frame */}
      <svg
        width="1080"
        height="1920"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.22,
          transform: `rotate(${frame * 0.12}deg)`,
          transformOrigin: "540px 960px",
        }}
      >
        <circle
          cx="540"
          cy="960"
          r="480"
          stroke="#E5B869"
          strokeWidth="1.5"
          strokeDasharray="10 18"
          fill="none"
        />
        <circle
          cx="540"
          cy="960"
          r="640"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="6 26"
          fill="none"
        />
      </svg>
    </AbsoluteFill>
  );
};

// =========================================================================
// CẢNH 1: HOOK 3S — ĐỒNG XU VÀNG PHÂN TÁCH ĐÔI (MITOSIS)
// =========================================================================
const Scene1Hook: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const splitProgress = interpolate(frame, [35, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const coinDistance = splitProgress * 170;
  const coinScale = interpolate(frame, [0, 35, 80], [0.6, 1.15, 1.0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        opacity: enter,
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(229, 184, 105, 0.15)",
          border: "1px solid rgba(229, 184, 105, 0.4)",
          fontSize: 26,
          fontWeight: 700,
          color: "#F5D061",
          marginBottom: 30,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        ⚡ BÀI TOÁN TÍCH SẢN
      </div>

      <h1
        style={{
          fontSize: 62,
          fontWeight: 900,
          lineHeight: 1.25,
          textAlign: "center",
          margin: "0 0 50px 0",
          color: "#FFFFFF",
        }}
      >
        GỬI <span style={{ color: "#E5B869" }}>100 TRIỆU</span>,
        <br />
        BAO LÂU TỰ THÀNH{" "}
        <span style={{ color: "#10B981" }}>200 TRIỆU?</span>
      </h1>

      <div
        style={{
          position: "relative",
          width: 600,
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${coinScale})`,
        }}
      >
        {/* Đồng xu 1 (Bên trái) */}
        <div
          style={{
            position: "absolute",
            transform: `translateX(-${coinDistance}px)`,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F5D061 0%, #D97706 100%)",
            boxShadow: "0 10px 40px rgba(245, 208, 97, 0.45), inset 0 2px 6px #FFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #FEF08A",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700, color: "#78350F" }}>VỐN GỐC</span>
          <span style={{ fontSize: 44, fontWeight: 900, color: "#451A03" }}>100 TR</span>
        </div>

        {/* Mũi tên phân tách */}
        {splitProgress > 0 && (
          <div
            style={{
              position: "absolute",
              fontSize: 48,
              fontWeight: 900,
              color: "#10B981",
              opacity: splitProgress,
            }}
          >
            ➜
          </div>
        )}

        {/* Đồng xu 2 (Bên phải - Tự sinh sôi) */}
        {splitProgress > 0 && (
          <div
            style={{
              position: "absolute",
              transform: `translateX(${coinDistance}px)`,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
              boxShadow: "0 10px 40px rgba(16, 185, 129, 0.5), inset 0 2px 6px #FFF",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid #A7F3D0",
              opacity: splitProgress,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: "#064E3B" }}>TỰ NHÂN ĐÔI</span>
            <span style={{ fontSize: 44, fontWeight: 900, color: "#022C22" }}>200 TR</span>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 45,
          fontSize: 28,
          color: "#94A3B8",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Không cần nạp thêm bất kỳ đồng nào!
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// CẢNH 2: CƠ CHẾ — PHƯƠNG TRÌNH SỐNG QUY TẮC 72
// =========================================================================
const Scene2Formula: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const num72Scale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        opacity: enter,
      }}
    >
      <div
        style={{
          padding: "8px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          fontSize: 26,
          fontWeight: 700,
          color: "#10B981",
          marginBottom: 30,
          letterSpacing: 2,
        }}
      >
        MẸO TÍNH NHẨM CỦA GIỚI ĐẦU TƯ
      </div>

      <h2
        style={{
          fontSize: 66,
          fontWeight: 900,
          textAlign: "center",
          margin: "0 0 50px 0",
          color: "#FFFFFF",
        }}
      >
        QUY TẮC <span style={{ color: "#E5B869" }}>72 THẦN THÁNH</span>
      </h2>

      {/* Sơ đồ phân số động 72 / Lãi suất = Số năm */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "2px solid rgba(229, 184, 105, 0.35)",
          borderRadius: 32,
          padding: "50px 70px",
          display: "flex",
          alignItems: "center",
          gap: 40,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#E5B869",
              lineHeight: 1,
              transform: `scale(${Math.max(0, num72Scale)})`,
              textShadow: "0 0 35px rgba(229, 184, 105, 0.6)",
            }}
          >
            72
          </div>

          <div
            style={{
              width: "120%",
              height: 6,
              backgroundColor: "#E2E8F0",
              borderRadius: 3,
              margin: "16px 0",
            }}
          />

          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#38BDF8",
              lineHeight: 1,
            }}
          >
            LÃI SUẤT (%/NĂM)
          </div>
        </div>

        <div style={{ fontSize: 80, fontWeight: 900, color: "#94A3B8" }}>=</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 30px",
            background: "rgba(16, 185, 129, 0.12)",
            borderRadius: 20,
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: "#A7F3D0" }}>SỐ NĂM</span>
          <span style={{ fontSize: 56, fontWeight: 900, color: "#10B981" }}>NHÂN ĐÔI</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          fontSize: 32,
          color: "#CBD5E1",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 820,
        }}
      >
        "Lãi kép là kỳ quan thứ 8 của nhân loại."
        <br />
        <span style={{ color: "#E5B869", fontSize: 26 }}>— Albert Einstein —</span>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// CẢNH 3: SƠ ĐỒ SỐNG — CUỘC ĐUA 3 LÀN TĂNG TRƯỞNG
// =========================================================================
const Scene3Race: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });

  const p1 = interpolate(frame, [15, 90], [0, 1], { extrapolateRight: "clamp" });
  const p2 = interpolate(frame, [45, 120], [0, 1], { extrapolateRight: "clamp" });
  const p3 = interpolate(frame, [75, 150], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 70px",
        opacity: enter,
      }}
    >
      <div
        style={{
          padding: "8px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          border: "1px solid rgba(56, 189, 248, 0.35)",
          fontSize: 26,
          fontWeight: 700,
          color: "#38BDF8",
          marginBottom: 24,
          letterSpacing: 2,
        }}
      >
        SO SÁNH THỰC TẾ
      </div>

      <h2
        style={{
          fontSize: 64,
          fontWeight: 900,
          textAlign: "center",
          margin: "0 0 50px 0",
          color: "#FFFFFF",
        }}
      >
        3 CUỘC ĐUA <span style={{ color: "#E5B869" }}>DÒNG TIỀN</span>
      </h2>

      {/* LÀN 1: GỬI TIẾT KIỆM 6% */}
      <div
        style={{
          width: "100%",
          background: "rgba(30, 41, 59, 0.75)",
          border: "1.5px solid rgba(56, 189, 248, 0.4)",
          borderRadius: 24,
          padding: "26px 36px",
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#38BDF8" }}>
            🏦 Gửi Tiết Kiệm (6%/năm)
          </span>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#F8FAFC" }}>
            72 ÷ 6 = <span style={{ color: "#38BDF8" }}>12 NĂM</span>
          </span>
        </div>
        <div style={{ width: "100%", height: 16, backgroundColor: "#0F172A", borderRadius: 8 }}>
          <div
            style={{
              width: `${p1 * 50}%`,
              height: "100%",
              backgroundColor: "#38BDF8",
              borderRadius: 8,
              boxShadow: "0 0 15px rgba(56, 189, 248, 0.6)",
            }}
          />
        </div>
      </div>

      {/* LÀN 2: TÍCH SẢN ĐẦU TƯ 12% */}
      <div
        style={{
          width: "100%",
          background: "rgba(6, 78, 59, 0.65)",
          border: "2px solid rgba(16, 185, 129, 0.75)",
          borderRadius: 24,
          padding: "28px 36px",
          marginBottom: 28,
          boxShadow: "0 10px 40px rgba(16, 185, 129, 0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 34, fontWeight: 900, color: "#34D399" }}>
            🚀 Tích Sản Bền Vững (12%/năm)
          </span>
          <span style={{ fontSize: 34, fontWeight: 900, color: "#F8FAFC" }}>
            72 ÷ 12 = <span style={{ color: "#34D399" }}>CHỈ 6 NĂM!</span>
          </span>
        </div>
        <div style={{ width: "100%", height: 18, backgroundColor: "#022C22", borderRadius: 9 }}>
          <div
            style={{
              width: `${p2 * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #10B981, #34D399)",
              borderRadius: 9,
              boxShadow: "0 0 20px rgba(52, 211, 153, 0.8)",
            }}
          />
        </div>
      </div>

      {/* LÀN 3: LẠM PHÁT 4% */}
      <div
        style={{
          width: "100%",
          background: "rgba(76, 5, 25, 0.55)",
          border: "1.5px solid rgba(244, 63, 94, 0.4)",
          borderRadius: 24,
          padding: "26px 36px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: "#FB7185" }}>
            📉 Tiền Mặt / Lạm Phát (4%/năm)
          </span>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#F8FAFC" }}>
            72 ÷ 4 = <span style={{ color: "#F43F5E" }}>MẤT 1/2 SAU 18 NĂM</span>
          </span>
        </div>
        <div style={{ width: "100%", height: 16, backgroundColor: "#2A040F", borderRadius: 8 }}>
          <div
            style={{
              width: `${(1 - p3 * 0.5) * 100}%`,
              height: "100%",
              backgroundColor: "#F43F5E",
              borderRadius: 8,
              boxShadow: "0 0 15px rgba(244, 63, 94, 0.6)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// CẢNH 4: INSIGHT — ĐỒ THỊ PARABOL THỜI GIAN BÙNG NỔ
// =========================================================================
const Scene4Parabola: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const drawLength = interpolate(frame, [10, 80], [0, 1000], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        opacity: enter,
      }}
    >
      <div
        style={{
          padding: "8px 24px",
          borderRadius: 30,
          backgroundColor: "rgba(229, 184, 105, 0.15)",
          border: "1px solid rgba(229, 184, 105, 0.35)",
          fontSize: 26,
          fontWeight: 700,
          color: "#E5B869",
          marginBottom: 24,
          letterSpacing: 2,
        }}
      >
        VŨ KHÍ TỐI THƯỢNG CỦA LÃI KÉP
      </div>

      <h2
        style={{
          fontSize: 62,
          fontWeight: 900,
          textAlign: "center",
          margin: "0 0 40px 0",
          color: "#FFFFFF",
          lineHeight: 1.25,
        }}
      >
        KHÔNG CẦN ĐOÁN ĐÁY
        <br />
        CHỈ CẦN <span style={{ color: "#10B981" }}>CHO ĐỦ THỜI GIAN</span>
      </h2>

      <div
        style={{
          width: 820,
          height: 420,
          background: "rgba(15, 23, 42, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 24,
          padding: 30,
          position: "relative",
        }}
      >
        <svg width="760" height="360" viewBox="0 0 760 360">
          <line x1="60" y1="310" x2="720" y2="310" stroke="#475569" strokeWidth="2" />
          <line x1="60" y1="310" x2="60" y2="30" stroke="#475569" strokeWidth="2" />

          <path
            d="M 60 300 Q 400 290 700 50"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeDasharray="1000"
            strokeDashoffset={1000 - drawLength}
          />

          <circle cx="280" cy="280" r="8" fill="#38BDF8" />
          <text x="280" y="340" fill="#94A3B8" fontSize="20" textAnchor="middle">
            Năm 6
          </text>

          <circle cx="500" cy="220" r="10" fill="#E5B869" />
          <text x="500" y="340" fill="#94A3B8" fontSize="20" textAnchor="middle">
            Năm 12
          </text>

          <circle cx="700" cy="50" r="14" fill="#34D399" />
          <text x="700" y="340" fill="#34D399" fontSize="22" fontWeight="700" textAnchor="middle">
            Năm 18 (Bùng Nổ)
          </text>
        </svg>

        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            background: "rgba(16, 185, 129, 0.2)",
            border: "1px solid #10B981",
            borderRadius: 16,
            padding: "10px 20px",
            color: "#A7F3D0",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          TĂNG TRƯỞNG HÀM MŨ ↗
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// CẢNH 5: BRAND OUTRO — TIẾN DƯƠNG
// =========================================================================
const Scene5Outro: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        opacity: enter,
      }}
    >
      <div
        style={{
          width: 760,
          background: "linear-gradient(180deg, rgba(6, 40, 38, 0.9) 0%, rgba(3, 16, 14, 0.95) 100%)",
          border: "2px solid rgba(229, 184, 105, 0.5)",
          borderRadius: 36,
          padding: "60px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E5B869 0%, #B45309 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            color: "#FFF",
            boxShadow: "0 10px 30px rgba(229, 184, 105, 0.4)",
            marginBottom: 26,
            border: "3px solid #FEF08A",
          }}
        >
          📈
        </div>

        <h3
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "0 0 10px 0",
            letterSpacing: 1,
          }}
        >
          TIẾN DƯƠNG
        </h3>

        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#E5B869",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          TÀI CHÍNH THỰC CHIẾN
        </div>

        <p
          style={{
            fontSize: 28,
            color: "#CBD5E1",
            textAlign: "center",
            lineHeight: 1.4,
            margin: "0 0 36px 0",
          }}
        >
          Hoạch Định Tài Chính · Đầu Tư Tích Sản Bền Vững
        </p>

        <div
          style={{
            background: "linear-gradient(90deg, #10B981, #059669)",
            borderRadius: 50,
            padding: "18px 46px",
            fontSize: 30,
            fontWeight: 800,
            color: "#FFFFFF",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
          }}
        >
          💬 Bình Luận Danh Mục Của Bạn 👇
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =========================================================================
// 3. PHỤ ĐỀ ĐỒNG BỘ THEO TỪ — SINGLE LINE WORD JUMP KINETIC
// =========================================================================
interface WordItem {
  word: string;
  startMs: number;
  durationMs: number;
  globalIndex: number;
}

interface WordChunk {
  words: WordItem[];
  startMs: number;
  endMs: number;
}

const buildWordChunks = (rawWords: SubtitleWord[]): WordChunk[] => {
  const chunks: WordChunk[] = [];
  let current: WordItem[] = [];
  let charCount = 0;

  rawWords.forEach((item, idx) => {
    const w: WordItem = { ...item, globalIndex: idx };
    current.push(w);
    charCount += item.word.length;

    const hasPunctuation = /[.,!?:;]/.test(item.word);
    const isFull = current.length >= 4 || charCount >= 20;

    if (hasPunctuation || isFull) {
      const startMs = current[0].startMs;
      const endMs = current[current.length - 1].startMs + current[current.length - 1].durationMs;
      chunks.push({ words: current, startMs, endMs });
      current = [];
      charCount = 0;
    }
  });

  if (current.length > 0) {
    const startMs = current[0].startMs;
    const endMs = current[current.length - 1].startMs + current[current.length - 1].durationMs;
    chunks.push({ words: current, startMs, endMs });
  }

  return chunks;
};

const BespokeSubtitles: React.FC<{
  subtitles: SubtitleWord[];
  currentMs: number;
  frame: number;
  totalFrames: number;
}> = ({ subtitles, currentMs, frame, totalFrames }) => {
  // Ẩn trong 3 giây cuối Outro thương hiệu
  if (frame > totalFrames - 90 || subtitles.length === 0) {
    return null;
  }

  // Tiền xử lý chunks một lần
  const chunks = React.useMemo(() => buildWordChunks(subtitles), [subtitles]);

  // Tìm chunk hiện tại đang được đọc (dung sai 100ms tránh nhấp nháy giữa 2 từ)
  const activeChunk = chunks.find(
    (c) => currentMs >= c.startMs - 50 && currentMs <= c.endMs + 100
  );

  if (!activeChunk) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 230,
        left: 0,
        right: 0,
        margin: "0 auto",
        width: "fit-content",
        maxWidth: 960,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        gap: 12,
        padding: "16px 34px",
        backgroundColor: "rgba(3, 16, 14, 0.92)",
        borderRadius: 40,
        border: "1.5px solid rgba(229, 184, 105, 0.45)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 14px 45px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        zIndex: 200,
      }}
    >
      {activeChunk.words.map((item) => {
        const isCurrent =
          currentMs >= item.startMs && currentMs < item.startMs + item.durationMs;
        const isPast = currentMs >= item.startMs + item.durationMs;

        return (
          <span
            key={`${item.word}-${item.startMs}`}
            style={{
              fontSize: 42,
              fontWeight: isCurrent ? 900 : 700,
              fontFamily: "'Be Vietnam Pro', 'Montserrat', sans-serif",
              letterSpacing: "0.5px",
              padding: isCurrent ? "6px 16px" : "6px 8px",
              borderRadius: isCurrent ? 14 : 0,
              background: isCurrent
                ? "linear-gradient(135deg, #FDE047 0%, #EAB308 100%)"
                : "transparent",
              color: isCurrent ? "#031412" : isPast ? "#FFFFFF" : "#94A3B8",
              transform: isCurrent ? "translateY(-16px) scale(1.18)" : "translateY(0) scale(1.0)",
              transformOrigin: "center bottom",
              boxShadow: isCurrent
                ? "0 0 28px rgba(250, 204, 21, 0.85), 0 8px 18px rgba(0, 0, 0, 0.45)"
                : "none",
              textShadow: isCurrent ? "none" : "0 2px 8px rgba(0, 0, 0, 0.9)",
              transition:
                "transform 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.12s ease, color 0.12s ease",
              display: "inline-block",
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};
