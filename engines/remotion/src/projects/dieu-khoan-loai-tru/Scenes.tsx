import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import subtitlesData from "./subtitles.json";

// ============================================================================
// 1. GLOBAL BACKDROP & AMBIENCE (HIGH-ENERGY CONTRACT HIGHLIGHTER)
// ============================================================================

export const GlobalBackdrop: React.FC<{ theme?: "dark" | "alert" | "mint" | "amber" }> = ({
  theme = "dark",
}) => {
  const frame = useCurrentFrame();

  const glowColors = {
    dark: { c1: "rgba(251, 191, 36, 0.12)", c2: "rgba(30, 41, 59, 0.7)" },
    alert: { c1: "rgba(239, 68, 68, 0.2)", c2: "rgba(153, 27, 27, 0.15)" },
    mint: { c1: "rgba(16, 185, 129, 0.2)", c2: "rgba(6, 95, 70, 0.15)" },
    amber: { c1: "rgba(245, 158, 11, 0.22)", c2: "rgba(180, 83, 9, 0.15)" },
  }[theme];

  const pulse = Math.sin(frame / 15) * 12;
  const gridShift = (frame * 0.8) % 48;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#070b12",
        backgroundImage: `
          radial-gradient(circle at 50% 25%, ${glowColors.c1} 0%, transparent 68%),
          radial-gradient(circle at 50% 80%, ${glowColors.c2} 0%, transparent 65%),
          linear-gradient(rgba(255, 255, 255, 0.03) 1.5px, transparent 1.5px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1.5px, transparent 1.5px)
        `,
        backgroundSize: `100% 100%, 100% 100%, 48px 48px, 48px 48px`,
        backgroundPosition: `0 0, 0 0, 0 ${gridShift}px, 0 0`,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Top ambient highlighter sweep */}
      <div
        style={{
          position: "absolute",
          top: -120 + pulse,
          left: "15%",
          width: "70%",
          height: 320,
          background: glowColors.c1,
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />
      {/* Radar scanning circular arcs */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: 800,
          height: 800,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px dashed rgba(255, 255, 255, 0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: 520,
          height: 520,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(251, 191, 36, 0.06)",
          pointerEvents: "none",
        }}
      />

      {/* Legal technical header stamp */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          fontSize: 16,
          fontFamily: "ui-monospace, monospace",
          color: "rgba(255, 255, 255, 0.45)",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        HỢP ĐỒNG BẢO HIỂM SỨC KHỎE • EXCLUSION CLAUSE
      </div>
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 48,
          fontSize: 16,
          fontFamily: "ui-monospace, monospace",
          color: "#fbbf24",
          letterSpacing: 1.5,
          fontWeight: 800,
        }}
      >
        ĐIỀU 19 LUẬT KDBH
      </div>
    </div>
  );
};

// ============================================================================
// 2. PINNED MOBILE TOP HEADER BAR (ENLARGED & HIGH CONTRAST)
// ============================================================================

export const HeaderBar: React.FC<{
  badge: string;
  title: string;
  badgeColor?: string;
  badgeBg?: string;
  fileRef?: string;
}> = ({
  badge,
  title,
  badgeColor = "#fbbf24",
  badgeBg = "rgba(251, 191, 36, 0.18)",
  fileRef = "DOC #EXCLUSION-RULE",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 72,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: badgeColor,
            backgroundColor: badgeBg,
            border: `2px solid ${badgeColor}`,
            padding: "8px 24px",
            borderRadius: 100,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            boxShadow: `0 0 20px ${badgeColor}30`,
          }}
        >
          {badge}
        </span>
        <span
          style={{
            fontSize: 20,
            fontFamily: "ui-monospace, monospace",
            color: "#cbd5e1",
            fontWeight: 700,
            letterSpacing: 1.2,
          }}
        >
          {fileRef}
        </span>
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: 46,
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: -0.5,
          lineHeight: 1.2,
          textShadow: "0 4px 16px rgba(0,0,0,0.8)",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          height: 3,
          width: "100%",
          background: `linear-gradient(90deg, ${badgeColor} 0%, rgba(255, 255, 255, 0.15) 100%)`,
          borderRadius: 3,
        }}
      />
    </div>
  );
};

// ============================================================================
// 3. SCENE 1: HOOK — THẺ 1 TỶ & LASER SCAN & BÚT DẠ QUANG VẼ TỪ TRÁI SANG PHẢI
// ============================================================================

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const cardEntrance = spring({ frame, fps: 30, config: { damping: 14, stiffness: 100 } });
  const stampEntrance = spring({ frame: frame - 28, fps: 30, config: { damping: 9, stiffness: 220 } });
  const highlightSweep = spring({ frame: frame - 60, fps: 30, config: { damping: 15, stiffness: 90 } });

  const highlightWidth = interpolate(highlightSweep, [0, 1], [0, 100]);
  const laserY = (frame * 3.5) % 180;
  const shockwave = interpolate(frame, [28, 55], [0.8, 2.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shockwaveOpacity = interpolate(frame, [28, 55], [0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        bottom: 230,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 36,
        zIndex: 10,
        transform: `translateY(${(1 - cardEntrance) * 60}px)`,
        opacity: cardEntrance,
      }}
    >
      {/* Hero Metric Card: Thẻ sức khỏe 1 tỷ với Laser Scan chuyển động */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          border: "2.5px solid rgba(251, 191, 36, 0.35)",
          borderRadius: 32,
          padding: "40px 36px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.7)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Laser Scanner beam across card */}
        <div
          style={{
            position: "absolute",
            top: `${laserY}%`,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent 0%, #38bdf8 30%, #ffffff 50%, #38bdf8 70%, transparent 100%)",
            boxShadow: "0 0 16px #38bdf8",
            opacity: 0.7,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 36 }}>💳</span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#fbbf24",
                backgroundColor: "rgba(251, 191, 36, 0.2)",
                border: "1.5px solid #fbbf24",
                padding: "8px 20px",
                borderRadius: 10,
                textTransform: "uppercase",
              }}
            >
              HẠN MỨC THẺ Y TẾ
            </span>
          </div>
          <span style={{ fontSize: 24, color: "#94a3b8", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>
            HẠNG KIM CƯƠNG
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: -3,
              textShadow: "0 0 30px rgba(255,255,255,0.3)",
            }}
          >
            1.000.000.000
          </span>
          <span style={{ fontSize: 42, fontWeight: 900, color: "#fbbf24" }}>VNĐ</span>
        </div>

        <p style={{ fontSize: 30, color: "#f1f5f9", margin: 0, lineHeight: 1.45, fontWeight: 600 }}>
          Hạn mức cả tỷ đồng mỗi năm — Ai cũng nghĩ vào viện là được trả 100%.
        </p>

        {/* Audit Stamp Impact with Shockwave Ripple */}
        {frame > 28 && (
          <>
            <div
              style={{
                position: "absolute",
                right: 36,
                bottom: 32,
                width: 320,
                height: 80,
                borderRadius: 20,
                border: "3px solid #ef4444",
                transform: `scale(${shockwave})`,
                opacity: shockwaveOpacity,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 36,
                bottom: 32,
                transform: `scale(${interpolate(stampEntrance, [0, 1], [2.4, 1])}) rotate(-10deg)`,
                opacity: stampEntrance,
                border: "5px solid #ef4444",
                borderRadius: 18,
                padding: "12px 28px",
                backgroundColor: "rgba(239, 68, 68, 0.28)",
                boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)",
                backdropFilter: "blur(8px)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#fca5a5",
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  fontFamily: "ui-monospace, monospace",
                  textShadow: "0 0 10px #ef4444",
                }}
              >
                [TỪ CHỐI CHI TRẢ]
              </span>
            </div>
          </>
        )}
      </div>

      {/* The Contract Highlighter Card with Animated Marker Tool */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.94)",
          border: "2.5px solid rgba(251, 191, 36, 0.4)",
          borderRadius: 28,
          padding: "36px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>🔍</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b", letterSpacing: 0.5 }}>
            NGUYÊN NHÂN: BỎ QUA TRANG HỢP ĐỒNG QUAN TRỌNG NHẤT
          </span>
        </div>

        {/* Text with dynamic Neon Highlighter line sweep + Marker Head */}
        <div style={{ position: "relative", display: "inline-block", alignSelf: "flex-start", paddingRight: 40 }}>
          <div
            style={{
              position: "absolute",
              left: -10,
              top: 2,
              bottom: 2,
              width: `${highlightWidth}%`,
              backgroundColor: "rgba(251, 191, 36, 0.42)",
              borderRadius: 8,
              zIndex: 0,
              borderBottom: "4px solid #fbbf24",
              boxShadow: "0 0 24px rgba(251, 191, 36, 0.5)",
            }}
          />
          {/* Animated Marker Pen Tip */}
          {highlightWidth > 0 && highlightWidth < 100 && (
            <div
              style={{
                position: "absolute",
                left: `${highlightWidth}%`,
                top: -16,
                fontSize: 32,
                zIndex: 2,
                transform: "rotate(45deg)",
              }}
            >
              🖊
            </div>
          )}
          <h2
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 0.5,
              position: "relative",
              zIndex: 1,
              padding: "0 10px",
              lineHeight: 1.25,
            }}
          >
            ĐIỀU KHOẢN LOẠI TRỪ TRÁCH NHIỆM
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: 28, color: "#e2e8f0", lineHeight: 1.5, fontWeight: 500 }}>
          Khách hàng bức xúc vì không đọc danh mục bệnh bị từ chối trước khi ký tên.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SCENE 2: CORE RULE — CÁN CÂN CÔNG BẰNG ĐỘNG (ANIMATED BALANCE SCALE)
// ============================================================================

export const Scene2Setup: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 340;

  const leftSpring = spring({ frame: localFrame, fps: 30, config: { damping: 14, stiffness: 110 } });
  const rightSpring = spring({ frame: localFrame - 15, fps: 30, config: { damping: 14, stiffness: 110 } });

  // Animated scale balance swing
  const scaleTilt = Math.sin(localFrame / 18) * 4;

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        bottom: 230,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        zIndex: 10,
      }}
    >
      {/* Animated SVG Balance Scale Visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotate(${scaleTilt}deg)`,
          transition: "transform 0.1s ease",
        }}
      >
        <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
          {/* Base & Pillar */}
          <path d="M110 15 L110 95" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
          <path d="M80 100 L140 100" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
          {/* Balance Beam */}
          <path d="M20 30 L200 30" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
          <circle cx="110" cy="30" r="10" fill="#fbbf24" />
          {/* Left Pan (Chặn trục lợi) */}
          <path d="M25 30 L10 65 L40 65 Z" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="3" />
          {/* Right Pan (Giữ phí rẻ) */}
          <path d="M195 30 L180 65 L210 65 Z" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="3" />
        </svg>
      </div>

      {/* Archetype 2: Side-by-Side Comparison */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 26,
        }}
      >
        {/* Vế trái: Ngăn chặn trục lợi */}
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "2.5px solid rgba(239, 68, 68, 0.45)",
            borderRadius: 28,
            padding: "36px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            transform: `translateY(${(1 - leftSpring) * 40}px)`,
            opacity: leftSpring,
            boxShadow: "0 16px 40px rgba(239, 68, 68, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🛡️</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#f87171",
                backgroundColor: "rgba(239, 68, 68, 0.25)",
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              MỤC ĐÍCH 1
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
            CHẶN ĐỨNG TRỤC LỢI
          </h3>
          <ul style={{ margin: 0, paddingLeft: 24, color: "#e2e8f0", fontSize: 26, lineHeight: 1.55 }}>
            <li>Chặn người đã có bệnh nặng mới nộp tiền mua bảo hiểm.</li>
            <li>Ngăn chặn nguy cơ làm thủng quỹ bồi thường chung.</li>
          </ul>
        </div>

        {/* Vế phải: Bảo vệ mức phí rẻ */}
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            border: "2.5px solid rgba(16, 185, 129, 0.5)",
            borderRadius: 28,
            padding: "36px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            transform: `translateY(${(1 - rightSpring) * 40}px)`,
            opacity: rightSpring,
            boxShadow: "0 16px 40px rgba(16, 185, 129, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>💰</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#34d399",
                backgroundColor: "rgba(16, 185, 129, 0.25)",
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              MỤC ĐÍCH 2
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
            GIỮ MỨC PHÍ BÌNH DÂN
          </h3>
          <ul style={{ margin: 0, paddingLeft: 24, color: "#ffffff", fontSize: 26, lineHeight: 1.55, fontWeight: 500 }}>
            <li>Nếu ai bệnh cũng đền, phí sẽ tăng gấp 10 lần ngay.</li>
            <li>Bảo vệ số tiền đóng phí của hàng triệu người khỏe mạnh.</li>
          </ul>
        </div>
      </div>

      {/* Tóm tắt thông điệp cốt lõi */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(24, 24, 27, 0.9)",
          border: "2.5px solid rgba(251, 191, 36, 0.3)",
          borderRadius: 24,
          padding: "26px 32px",
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <span style={{ fontSize: 50 }}>⚖</span>
        <div>
          <h4 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: "#fbbf24" }}>
            ĐIỀU KHOẢN LOẠI TRỪ KHÔNG PHẢI ĐỂ QUỊT TIỀN!
          </h4>
          <p style={{ margin: 0, fontSize: 24, color: "#cbd5e1", marginTop: 6, lineHeight: 1.4 }}>
            Đây là quy tắc toán học bảo đảm công ty bảo hiểm luôn còn tiền chi trả cho bạn lúc ngặt nghèo.
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCENE 3: TENSION 1 — BỆNH CÓ SẴN & THỜI GIAN CHỜ (ANIMATED TIMELINE METERS)
// ============================================================================

export const Scene3Tension1: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 605;

  const m1 = spring({ frame: localFrame, fps: 30, config: { damping: 14, stiffness: 120 } });
  const m2 = spring({ frame: localFrame - 25, fps: 30, config: { damping: 14, stiffness: 120 } });
  const m3 = spring({ frame: localFrame - 50, fps: 30, config: { damping: 14, stiffness: 120 } });

  // Progress line height animation
  const progressHeight = interpolate(localFrame, [0, 80], [0, 100], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        bottom: 230,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 26,
        zIndex: 10,
      }}
    >
      {/* Alert Banner: Bệnh có sẵn */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(239, 68, 68, 0.16)",
          border: "3px solid #ef4444",
          borderRadius: 24,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 12px 36px rgba(239, 68, 68, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 44 }}>⚠️</span>
          <div>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#f87171", textTransform: "uppercase", letterSpacing: 1 }}>
              NHÓM 1: NGUY CƠ TỪ CHỐI CAO NHẤT
            </span>
            <h3 style={{ margin: "4px 0 0 0", fontSize: 34, fontWeight: 900, color: "#ffffff" }}>
              BỆNH CÓ SẴN (PRE-EXISTING)
            </h3>
          </div>
        </div>
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            backgroundColor: "#ef4444",
            color: "#ffffff",
            padding: "10px 22px",
            borderRadius: 14,
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
          }}
        >
          GIẤU BỆNH = TỪ CHỐI 100%
        </span>
      </div>

      {/* Archetype 4: Sequential Step Flow / Animated Timeline */}
      <div style={{ width: "100%", maxWidth: 960, display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
        {/* Continuous Neon Timeline Line in background */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 40,
            bottom: 40,
            width: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 0,
          }}
        >
          <div
            style={{
              height: `${progressHeight}%`,
              width: "100%",
              backgroundColor: "#fbbf24",
              boxShadow: "0 0 12px #fbbf24",
            }}
          />
        </div>

        {/* Step 1: 0 Ngày */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            border: "2.5px solid rgba(16, 185, 129, 0.45)",
            borderRadius: 24,
            padding: "24px 28px",
            transform: `translateX(${(1 - m1) * -40}px)`,
            opacity: m1,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 140,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              padding: "10px 14px",
              borderRadius: 16,
              border: "1.5px solid #10b981",
            }}
          >
            <span style={{ fontSize: 38, fontWeight: 900, color: "#34d399", fontFamily: "ui-monospace, monospace" }}>
              0 NGÀY
            </span>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>🚑</span>
              <h4 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: "#ffffff" }}>
                TAI NẠN ĐỘT NGỘT
              </h4>
            </div>
            <p style={{ margin: "6px 0 0 0", fontSize: 24, color: "#f1f5f9", lineHeight: 1.4, fontWeight: 500 }}>
              Bảo vệ ngay lập tức từ giây phút ký hợp đồng và hoàn tất đóng phí.
            </p>
          </div>
        </div>

        {/* Step 2: 30 Ngày */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            backgroundColor: "rgba(245, 158, 11, 0.12)",
            border: "2.5px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 24,
            padding: "24px 28px",
            transform: `translateX(${(1 - m2) * -40}px)`,
            opacity: m2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 140,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              padding: "10px 14px",
              borderRadius: 16,
              border: "1.5px solid #f59e0b",
            }}
          >
            <span style={{ fontSize: 38, fontWeight: 900, color: "#fbbf24", fontFamily: "ui-monospace, monospace" }}>
              30 NGÀY
            </span>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>💊</span>
              <h4 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: "#ffffff" }}>
                BỆNH THÔNG THƯỜNG
              </h4>
            </div>
            <p style={{ margin: "6px 0 0 0", fontSize: 24, color: "#f1f5f9", lineHeight: 1.4, fontWeight: 500 }}>
              Cảm sốt cấp tính, sốt xuất huyết, viêm phế quản, ngộ độc thức ăn...
            </p>
          </div>
        </div>

        {/* Step 3: 365 Ngày */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "3px solid rgba(239, 68, 68, 0.6)",
            borderRadius: 24,
            padding: "24px 28px",
            transform: `translateX(${(1 - m3) * -40}px)`,
            opacity: m3,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 140,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              padding: "10px 14px",
              borderRadius: 16,
              border: "1.5px solid #ef4444",
            }}
          >
            <span style={{ fontSize: 38, fontWeight: 900, color: "#f87171", fontFamily: "ui-monospace, monospace" }}>
              365 NGÀY
            </span>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>🏥</span>
              <h4 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: "#ffffff" }}>
                BỆNH ĐẶC BIỆT & U / SỎI / MÃN TÍNH
              </h4>
            </div>
            <p style={{ margin: "6px 0 0 0", fontSize: 24, color: "#f1f5f9", lineHeight: 1.4, fontWeight: 500 }}>
              Sỏi thận, u xơ, trĩ, viêm xoang mãn tính, ung thư — Đi khám trước 1 năm là bị loại trừ!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCENE 4: TENSION 2 — CHECKLIST GẠCH CHÉO ĐỘNG (ANIMATED STRIKETHROUGH)
// ============================================================================

export const Scene4Tension2: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1093;

  const cardEntrance = spring({ frame: localFrame, fps: 30, config: { damping: 14, stiffness: 100 } });

  const items = [
    { icon: "🩺", text: "Khám sức khỏe tổng quát định kỳ (không có chỉ định bệnh)", strikeDelay: 15 },
    { icon: "🦷", text: "Nha khoa thẩm mỹ, bọc răng sứ, phẫu thuật mổ cận LASIK", strikeDelay: 35 },
    { icon: "🧬", text: "Bệnh bẩm sinh, dị tật di truyền phát hiện từ bé", strikeDelay: 55 },
    { icon: "🍺", text: "Tai nạn do nồng độ cồn trong máu hoặc chất kích thích", strikeDelay: 75 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        bottom: 230,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        transform: `translateY(${(1 - cardEntrance) * 40}px)`,
        opacity: cardEntrance,
      }}
    >
      {/* Archetype 5: Checklist & Status Badge Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.94)",
          border: "2.5px solid rgba(255, 255, 255, 0.16)",
          borderRadius: 30,
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#f87171" }}>NHÓM 2 & NHÓM 3</span>
            <h3 style={{ margin: "6px 0 0 0", fontSize: 38, fontWeight: 900, color: "#ffffff" }}>
              DANH MỤC LOẠI TRỪ TUYỆT ĐỐI
            </h3>
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              color: "#f87171",
              border: "2px solid #ef4444",
              padding: "8px 22px",
              borderRadius: 100,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
          >
            TỰ CHI TRẢ 100%
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {items.map((it, idx) => {
            const isStrike = localFrame > it.strikeDelay;
            const strikeProgress = interpolate(localFrame - it.strikeDelay, [0, 15], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  backgroundColor: isStrike ? "rgba(239, 68, 68, 0.12)" : "rgba(30, 41, 59, 0.6)",
                  border: `2px solid ${isStrike ? "rgba(239, 68, 68, 0.45)" : "rgba(255, 255, 255, 0.1)"}`,
                  borderRadius: 20,
                  padding: "20px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Red Strikethrough line animated across the card */}
                {isStrike && (
                  <div
                    style={{
                      position: "absolute",
                      left: 60,
                      top: "50%",
                      width: `${strikeProgress}%`,
                      height: 4,
                      backgroundColor: "#ef4444",
                      boxShadow: "0 0 10px #ef4444",
                      zIndex: 2,
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <span style={{ fontSize: 32, zIndex: 3 }}>
                  {isStrike ? "❌" : it.icon}
                </span>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: isStrike ? "#cbd5e1" : "#ffffff",
                    lineHeight: 1.4,
                    opacity: isStrike ? 0.75 : 1,
                    zIndex: 1,
                  }}
                >
                  {it.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. SCENE 5: SOLUTION — 3 CHÌA KHÓA VÀNG BẬT MỞ (3 ROTATING GOLDEN KEYS)
// ============================================================================

export const Scene5Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1450;

  const cardEntrance = spring({ frame: localFrame, fps: 30, config: { damping: 14, stiffness: 110 } });

  const keys = [
    { num: "01", title: "KÊ KHAI THẬT", desc: "Khai báo 100% lịch sử bệnh án, không giấu dù chỉ một lần khám.", icon: "✍" },
    { num: "02", title: "CANH NGÀY CHỜ", desc: "Đủ mốc 30 hoặc 365 ngày mới đi khám bệnh không khẩn cấp.", icon: "⏳" },
    { num: "03", title: "HỎI TRƯỚC BẢO LÃNH", desc: "Kiểm tra danh mục chi trả với tư vấn viên trước các ca mổ.", icon: "🏥" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        bottom: 230,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        zIndex: 10,
        transform: `translateY(${(1 - cardEntrance) * 40}px)`,
        opacity: cardEntrance,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: "#fbbf24",
            backgroundColor: "rgba(251, 191, 36, 0.2)",
            border: "2px solid #fbbf24",
            padding: "8px 26px",
            borderRadius: 100,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            boxShadow: "0 0 24px rgba(251, 191, 36, 0.4)",
          }}
        >
          NGUYÊN TẮC BẤT DI BẤT DỊCH
        </span>
        <h2
          style={{
            margin: "16px 0 0 0",
            fontSize: 46,
            fontWeight: 900,
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          3 CHÌA KHÓA BỒI THƯỜNG 100%
        </h2>
      </div>

      {/* Archetype 3: 3-Column Feature Grid with Rotating Pop-in Key Badges */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 22,
        }}
      >
        {keys.map((k, idx) => {
          const keySpring = spring({ frame: localFrame - idx * 12, fps: 30, config: { damping: 12, stiffness: 140 } });

          return (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.92)",
                border: "2.5px solid rgba(251, 191, 36, 0.5)",
                borderRadius: 26,
                padding: "32px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 16,
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                transform: `scale(${keySpring})`,
                opacity: keySpring,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "rgba(251, 191, 36, 0.2)",
                  border: "2px solid #fbbf24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  boxShadow: "0 0 24px rgba(251, 191, 36, 0.5)",
                }}
              >
                {k.icon}
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#fbbf24", fontFamily: "ui-monospace, monospace" }}>
                CHÌA KHÓA {k.num}
              </span>
              <h4 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#ffffff", lineHeight: 1.25 }}>
                {k.title}
              </h4>
              <p style={{ margin: 0, fontSize: 22, color: "#e2e8f0", lineHeight: 1.45, fontWeight: 500 }}>
                {k.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 8. SCENE 6: OUTRO & CALL TO ACTION (BREATHING SHIELD & SHIMMER CTA)
// ============================================================================

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1653;

  const entrance = spring({ frame: localFrame, fps: 30, config: { damping: 14, stiffness: 120 } });
  const pulse = Math.sin(localFrame / 10) * 0.04;
  const shimmerPos = (localFrame * 5) % 300;

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        bottom: 230,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        transform: `scale(${interpolate(entrance, [0, 1], [0.92, 1]) + pulse})`,
        opacity: entrance,
      }}
    >
      {/* Archetype 6: Quote & Official Statement / CTA Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "3px solid #fbbf24",
          borderRadius: 32,
          padding: "50px 42px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          textAlign: "center",
          alignItems: "center",
          boxShadow: "0 28px 70px rgba(251, 191, 36, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span style={{ fontSize: 72, color: "rgba(251, 191, 36, 0.4)", lineHeight: 0.8, fontFamily: "Georgia, serif" }}>
          “
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: 40,
            fontWeight: 900,
            color: "#ffffff",
            fontStyle: "italic",
            lineHeight: 1.45,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          "Hiểu luật chơi thì bảo hiểm là chiếc khiên phòng thủ tài chính vững vàng nhất!"
        </h3>

        <div
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            margin: "8px 0",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 28, color: "#f1f5f9", fontWeight: 700 }}>
            Bạn chưa rõ điều khoản loại trừ thẻ sức khỏe mình đang có?
          </span>

          {/* Dynamic Shimmer CTA Button */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#070b12",
              backgroundColor: "#fbbf24",
              padding: "18px 46px",
              borderRadius: 100,
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.8)",
              letterSpacing: 0.8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer light bar across button */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${shimmerPos}%`,
                width: 60,
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
                transform: "skewX(-25deg)",
              }}
            />
            NHẮN MÌNH ĐỂ RÀ SOÁT MIỄN PHÍ ➔
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 9. SPEECH-SYNCED WORD-BY-WORD CAPTIONS (ENLARGED TO 42PX FOR MAXIMUM READABILITY)
// ============================================================================

export const SyncedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  // Find active chunk
  const activeChunk = (subtitlesData as Array<{
    startMs: number;
    endMs: number;
    text: string;
    words: Array<{ word: string; startMs: number; durationMs: number }>;
  }>).find(
    (chunk) => currentMs >= chunk.startMs - 50 && currentMs <= chunk.endMs + 100
  );

  if (!activeChunk) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 110,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 15, 23, 0.95)",
          border: "2px solid rgba(251, 191, 36, 0.4)",
          borderRadius: 22,
          padding: "18px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
          backdropFilter: "blur(20px)",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.85)",
          maxWidth: 960,
        }}
      >
        {activeChunk.words.map((w, idx) => {
          const isWordActive =
            currentMs >= w.startMs - 20 && currentMs < w.startMs + w.durationMs + 20;

          return (
            <span
              key={idx}
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: isWordActive ? "#fbbf24" : "#ffffff",
                letterSpacing: -0.5,
                textShadow: isWordActive
                  ? "0 0 20px rgba(251, 191, 36, 0.95)"
                  : "0 2px 6px rgba(0, 0, 0, 0.8)",
                lineHeight: 1.3,
                transition: "color 0.08s ease",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
