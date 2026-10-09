import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import subtitlesData from "./subtitles.json";

// ============================================================================
// 1. GLOBAL BACKDROP & AMBIENCE (EDITORIAL FINANCIAL AUDIT)
// ============================================================================

export const GlobalBackdrop: React.FC<{ theme?: "dark" | "hospital" | "warning" | "emerald" }> = ({
  theme = "dark",
}) => {
  const frame = useCurrentFrame();

  const glowColors = {
    dark: { c1: "rgba(30, 58, 138, 0.12)", c2: "rgba(15, 23, 42, 0.4)" },
    hospital: { c1: "rgba(239, 68, 68, 0.15)", c2: "rgba(185, 28, 28, 0.08)" },
    warning: { c1: "rgba(245, 158, 11, 0.15)", c2: "rgba(217, 119, 6, 0.08)" },
    emerald: { c1: "rgba(16, 185, 129, 0.15)", c2: "rgba(5, 150, 105, 0.08)" },
  }[theme];

  const pulse = Math.sin(frame / 20) * 8;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#080c14",
        backgroundImage: `
          radial-gradient(circle at 50% 25%, ${glowColors.c1} 0%, transparent 65%),
          radial-gradient(circle at 50% 85%, ${glowColors.c2} 0%, transparent 60%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Top ambient light bar */}
      <div
        style={{
          position: "absolute",
          top: -120 + pulse,
          left: "20%",
          width: "60%",
          height: 300,
          background: glowColors.c1,
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />
      {/* Technical corner coordinate markings */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          fontSize: 14,
          fontFamily: "ui-monospace, monospace",
          color: "rgba(148, 163, 184, 0.4)",
          letterSpacing: 2,
        }}
      >
        AUDIT-DOC // BHYT-ANALYSIS-2026
      </div>
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 48,
          fontSize: 14,
          fontFamily: "ui-monospace, monospace",
          color: "rgba(148, 163, 184, 0.4)",
          letterSpacing: 1.5,
        }}
      >
        CONFIDENTIAL // 9:16 MOBILE
      </div>
    </div>
  );
};

// ============================================================================
// 2. PINNED TOP HEADER BAR (Mobile Safe Zone: y: 80 - 220)
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
  badgeColor = "#38bdf8",
  badgeBg = "rgba(56, 189, 248, 0.15)",
  fileRef = "DOC #VN-BHYT-2026",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 48,
        right: 48,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 40,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        paddingBottom: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: badgeColor,
            backgroundColor: badgeBg,
            border: `1.5px solid ${badgeColor}40`,
            padding: "6px 18px",
            borderRadius: 100,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          {badge}
        </span>
        <span
          style={{
            fontSize: 16,
            fontFamily: "ui-monospace, monospace",
            color: "#94a3b8",
            letterSpacing: 1,
          }}
        >
          {fileRef}
        </span>
      </div>
      <h2
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: "#ffffff",
          margin: 0,
          lineHeight: 1.25,
          letterSpacing: -0.5,
        }}
      >
        {title}
      </h2>
    </div>
  );
};

// ============================================================================
// 3. AUDIT STAMP COMPONENT (Dấu Mộc Kiểm Toán)
// ============================================================================

export const AuditStamp: React.FC<{
  text: string;
  subtext?: string;
  color?: "red" | "green" | "amber";
  rotation?: number;
  scale?: number;
}> = ({ text, subtext, color = "green", rotation = -6, scale = 1 }) => {
  const colors = {
    green: { border: "#10b981", text: "#34d399", bg: "rgba(16, 185, 129, 0.12)" },
    red: { border: "#ef4444", text: "#f87171", bg: "rgba(239, 68, 68, 0.15)" },
    amber: { border: "#f59e0b", text: "#fbbf24", bg: "rgba(245, 158, 11, 0.14)" },
  }[color];

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: `3.5px double ${colors.border}`,
        borderRadius: 14,
        padding: "10px 22px",
        backgroundColor: colors.bg,
        boxShadow: `0 0 24px ${colors.border}30`,
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: colors.text,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: "ui-monospace, monospace",
          lineHeight: 1.1,
        }}
      >
        {text}
      </span>
      {subtext && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: 1.5,
            opacity: 0.85,
            marginTop: 4,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};

// ============================================================================
// 4. SCENE 1: HOOK — BẢNG KÊ BHYT 15 TRIỆU (0s - 10.60s | Frame 0 - 318)
// ============================================================================

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const cardEntrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - 28,
    fps: 30,
    config: { damping: 10, stiffness: 180 },
  });

  const questionEntrance = spring({
    frame: frame - 65,
    fps: 30,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 48,
        right: 48,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        zIndex: 10,
        opacity: cardEntrance,
        transform: `translateY(${(1 - cardEntrance) * 40}px)`,
      }}
    >
      {/* Editorial Document Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 28,
          padding: "44px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
          position: "relative",
        }}
      >
        {/* Document Header info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 12px #10b981",
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Hồ sơ BHYT 5 Năm Liên Tục
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              fontFamily: "ui-monospace, monospace",
              color: "#64748b",
            }}
          >
            MỤC TIÊU: 100% MIỄN PHÍ
          </span>
        </div>

        {/* Hero Metric Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "24px 28px",
            backgroundColor: "rgba(2, 6, 23, 0.7)",
            border: "1.5px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: "#94a3b8" }}>
            Hạn mức cùng chi trả tối đa trong năm:
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span
              style={{
                fontSize: 92,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                fontFamily: "ui-monospace, monospace",
                letterSpacing: -2,
              }}
            >
              15.000.000
            </span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#38bdf8" }}>VNĐ</span>
          </div>
          <span style={{ fontSize: 20, color: "#94a3b8", fontStyle: "italic" }}>
            * Tương đương 6 tháng lương cơ sở (theo Điều 22 Luật BHYT)
          </span>

          {/* Stamp overlay */}
          {frame >= 28 && (
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 28,
                opacity: stampEntrance,
              }}
            >
              <AuditStamp
                text="TỰ TRẢ ĐỦ LÀ XONG"
                subtext="PHẦN SAU 100% MIỄN PHÍ"
                color="green"
                rotation={-8}
                scale={stampEntrance}
              />
            </div>
          )}
        </div>

        {/* Narrative Inquisitive Callout */}
        {frame >= 65 && (
          <div
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              border: "2px solid rgba(245, 158, 11, 0.4)",
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: questionEntrance,
              transform: `translateY(${(1 - questionEntrance) * 20}px)`,
            }}
          >
            <span style={{ fontSize: 44, lineHeight: 1 }}>💬</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: "#fbbf24", lineHeight: 1.3 }}>
                "15 triệu thì dư sức trả tự lo..."
              </span>
              <span style={{ fontSize: 22, fontWeight: 600, color: "#fef08a", lineHeight: 1.3 }}>
                Tự nhiên tốn tiền mua thêm Thẻ Y tế tư nhân làm gì?
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCENE 2: SETUP — ĐỒNG TÌNH: MÓNG NHÀ AN SINH (10.60s - 19.35s | Frame 0 - 262)
// ============================================================================

export const Scene2Setup: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - 25,
    fps: 30,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 48,
        right: 48,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        zIndex: 10,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 36}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(16, 185, 129, 0.3)",
          borderRadius: 28,
          padding: "44px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#34d399",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            KIỂM ĐỊNH THỰC TẾ
          </span>
          {frame >= 25 && (
            <AuditStamp
              text="XÁC NHẬN CHUẨN XÁC"
              subtext="MÓNG NHÀ AN SINH"
              color="green"
              rotation={4}
              scale={stampEntrance}
            />
          )}
        </div>

        {/* Checklist confirmation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              backgroundColor: "rgba(2, 6, 23, 0.75)",
              border: "1.5px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span style={{ fontSize: 36, color: "#10b981" }}>✔</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#ffffff" }}>
                15 triệu tiền túi: Chẳng làm ai nghèo đi cả
              </span>
              <span style={{ fontSize: 22, color: "#94a3b8" }}>
                Thu nhập trung bình - khá dư sức trang trải khoản này.
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "2px solid rgba(16, 185, 129, 0.35)",
              borderRadius: 20,
              padding: "28px 28px",
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            <span style={{ fontSize: 44, color: "#34d399" }}>🏛️</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: "#34d399", lineHeight: 1.25 }}>
                BHYT là cái móng nhà quá rẻ và vững chắc!
              </span>
              <span style={{ fontSize: 22, color: "#e2e8f0", lineHeight: 1.4 }}>
                Chính sách an sinh xã hội nhân văn nhất của Nhà nước cho toàn dân.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCENE 3: TENSION 1 — LỖ HỔNG NGOÀI DANH MỤC (19.35s - 34.20s | Frame 0 - 446)
// ============================================================================

export const Scene3Tension1: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  // Strikethrough line animation
  const strikeProgress = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter roll: from 15M to 120M
  const counterVal = Math.round(
    interpolate(frame, [90, 160], [15, 120], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const stampEntrance = spring({
    frame: frame - 80,
    fps: 30,
    config: { damping: 9, stiffness: 160 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 48,
        right: 48,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        zIndex: 10,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 36}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(239, 68, 68, 0.35)",
          borderRadius: 28,
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
          position: "relative",
        }}
      >
        {/* Table header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#f87171",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            ĐỐI SOÁT DANH MỤC THUỐC ĐẶC TRỊ
          </span>
          <span
            style={{
              fontSize: 16,
              fontFamily: "ui-monospace, monospace",
              color: "#fca5a5",
            }}
          >
            ĐIỀU KHOẢN LOẠI TRỪ
          </span>
        </div>

        {/* Row 1: Thuốc thường trong danh mục */}
        <div
          style={{
            backgroundColor: "rgba(2, 6, 23, 0.7)",
            border: "1.5px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 18,
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
              Thuốc phổ thông & Bệnh viện công
            </span>
            <span style={{ fontSize: 18, color: "#94a3b8" }}>Kháng sinh, giảm đau, dịch truyền cơ bản</span>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#34d399",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              padding: "6px 16px",
              borderRadius: 8,
              border: "1px solid #10b981",
            }}
          >
            TRONG DANH MỤC (100%)
          </span>
        </div>

        {/* Row 2: Thuốc Đích & Miễn Dịch (Targeted & Immunotherapy) */}
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "2px solid rgba(239, 68, 68, 0.45)",
            borderRadius: 20,
            padding: "24px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#ffffff" }}>
                Thuốc Đích & Thuốc Miễn Dịch Thế Hệ Mới
              </span>
              <span style={{ fontSize: 20, color: "#fca5a5" }}>
                (Liệu pháp sống còn cho bệnh ung thư, hiểm nghèo)
              </span>
            </div>
            {frame >= 80 && (
              <AuditStamp
                text="NGOÀI DANH MỤC BHYT"
                subtext="TỰ CHI TRẢ 100%"
                color="red"
                rotation={-5}
                scale={stampEntrance}
              />
            )}
          </div>

          {/* Red strikethrough effect line */}
          <div
            style={{
              height: 4,
              backgroundColor: "#ef4444",
              width: `${strikeProgress * 100}%`,
              boxShadow: "0 0 10px #ef4444",
              borderRadius: 2,
            }}
          />

          <span style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.4 }}>
            BHYT không chi trả hoặc chỉ đồng chi trả tỷ lệ rất thấp. Toàn bộ tiền thuốc đổ lên vai bệnh nhân.
          </span>
        </div>

        {/* Counter Cost Explosion Callout */}
        <div
          style={{
            backgroundColor: "rgba(2, 6, 23, 0.9)",
            border: "2px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 22,
            padding: "24px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#f87171" }}>
              CHI PHÍ THỰC TẾ PHẢI TRẢ:
            </span>
            <span style={{ fontSize: 18, color: "#94a3b8" }}>Không còn là 15 triệu tiền túi...</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: "#ef4444",
                lineHeight: 1,
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {counterVal}+
            </span>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#ffffff" }}>TRIỆU / THÁNG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. SCENE 4: TENSION 2 — MẤT THU NHẬP & TIỀN NỢ (34.20s - 45.70s | Frame 0 - 345)
// ============================================================================

export const Scene4Tension2: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - 40,
    fps: 30,
    config: { damping: 9, stiffness: 180 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 48,
        right: 48,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        zIndex: 10,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 36}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(245, 158, 11, 0.35)",
          borderRadius: 28,
          padding: "38px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#fbbf24",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            BẢNG DÒNG TIỀN NẰM VIỆN (6 THÁNG)
          </span>
          {frame >= 40 && (
            <AuditStamp
              text="MẤT THU NHẬP TRỤ CỘT"
              subtext="ĐỨT GÃY DÒNG TIỀN"
              color="amber"
              rotation={3}
              scale={stampEntrance}
            />
          )}
        </div>

        {/* 2-Side Financial Reality Check */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* Left: BHYT lo viện phí */}
          <div
            style={{
              backgroundColor: "rgba(2, 6, 23, 0.7)",
              border: "1.5px solid rgba(16, 185, 129, 0.3)",
              borderRadius: 20,
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#34d399",
                background: "rgba(16, 185, 129, 0.15)",
                padding: "4px 12px",
                borderRadius: 8,
                alignSelf: "flex-start",
              }}
            >
              TIỀN VIỆN PHÍ BV
            </span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>
              BHYT Trả Trực Tiếp Cho Bệnh Viện
            </span>
            <span style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.4 }}>
              Thanh toán theo hóa đơn nội trú trong phạm vi danh mục.
            </span>
          </div>

          {/* Right: Thu nhập người bệnh */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "2px solid rgba(239, 68, 68, 0.45)",
              borderRadius: 20,
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#f87171",
                background: "rgba(239, 68, 68, 0.2)",
                padding: "4px 12px",
                borderRadius: 8,
                alignSelf: "flex-start",
              }}
            >
              LƯƠNG HÀNG THÁNG
            </span>
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#ef4444",
                lineHeight: 1,
                fontFamily: "ui-monospace, monospace",
              }}
            >
              0 VNĐ
            </span>
            <span style={{ fontSize: 18, color: "#fca5a5", lineHeight: 1.3 }}>
              Nửa năm nằm viện không đi làm ➔ Mất 100% thu nhập!
            </span>
          </div>
        </div>

        {/* Fixed Expenses that never stop */}
        <div
          style={{
            backgroundColor: "rgba(2, 6, 23, 0.8)",
            border: "1.5px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 20,
            padding: "22px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fbbf24" }}>
            CHI PHÍ CỐ ĐỊNH GIA ĐÌNH VẪN TIẾP TỤC ĐÒI HỎI:
          </span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 22, color: "#ffffff", fontWeight: 600 }}>
              🏫 Tiền học cho con cái
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#f87171",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 700,
              }}
            >
              PHẢI ĐÓNG ĐÚNG HẠN
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 22, color: "#ffffff", fontWeight: 600 }}>
              🏦 Tiền lãi vay mua nhà / xe
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#f87171",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 700,
              }}
            >
              NGÂN HÀNG KHÔNG GIẢM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. SCENE 5: SOLUTION — PHÒNG THỦ 3 LỚP (45.70s - 57.30s | Frame 0 - 348)
// ============================================================================

export const Scene5Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - 45,
    fps: 30,
    config: { damping: 9, stiffness: 170 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 48,
        right: 48,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        zIndex: 10,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 36}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "2px solid rgba(56, 189, 248, 0.35)",
          borderRadius: 28,
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#38bdf8",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            HỆ THỐNG PHÒNG THỦ TÀI CHÍNH Y TẾ
          </span>
          {frame >= 45 && (
            <AuditStamp
              text="ĐẠT CHUẨN 3 LỚP"
              subtext="AN TOÀN TUYỆT ĐỐI"
              color="green"
              rotation={-4}
              scale={stampEntrance}
            />
          )}
        </div>

        {/* 3-Column Feature Grid (Archetype 3) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {/* Column 1: BHYT */}
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "2px solid rgba(16, 185, 129, 0.4)",
              borderRadius: 20,
              padding: "24px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 36 }}>🏛️</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#34d399",
                background: "rgba(16, 185, 129, 0.2)",
                padding: "4px 12px",
                borderRadius: 100,
              }}
            >
              LỚP 1
            </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
              BHYT Nhà Nước
            </span>
            <span style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.35 }}>
              Lo phần MÓNG viện phí cơ bản tại tuyến công.
            </span>
          </div>

          {/* Column 2: Thẻ Tư Nhân */}
          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              border: "2px solid rgba(56, 189, 248, 0.4)",
              borderRadius: 20,
              padding: "24px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 36 }}>💳</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#38bdf8",
                background: "rgba(56, 189, 248, 0.2)",
                padding: "4px 12px",
                borderRadius: 100,
              }}
            >
              LỚP 2
            </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
              Thẻ Sức Khỏe
            </span>
            <span style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.35 }}>
              Lấp lỗ hổng thuốc ngoài danh mục, viện quốc tế.
            </span>
          </div>

          {/* Column 3: Bệnh Hiểm Nghèo */}
          <div
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              border: "2px solid rgba(245, 158, 11, 0.4)",
              borderRadius: 20,
              padding: "24px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 36 }}>🛡️</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#fbbf24",
                background: "rgba(245, 158, 11, 0.2)",
                padding: "4px 12px",
                borderRadius: 100,
              }}
            >
              LỚP 3
            </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
              Bệnh Hiểm Nghèo
            </span>
            <span style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.35 }}>
              Đền bù tiền mặt thay thế 1-2 năm tiền lương bị mất.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 9. SCENE 6: OUTRO — KẾT LUẬN KIỂM TOÁN & CTA (57.30s - 64.37s | Frame 0 - 213)
// ============================================================================

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  const stampEntrance = spring({
    frame: frame - 15,
    fps: 30,
    config: { damping: 8, stiffness: 220 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 48,
        right: 48,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        zIndex: 10,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 36}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 28,
          padding: "44px 38px",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)",
          position: "relative",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 32 }}>⚠️</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fbbf24",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            KẾT LUẬN KIỂM TOÁN
          </span>
        </div>

        {/* Master warning stamp */}
        {frame >= 15 && (
          <AuditStamp
            text="ĐỪNG CHẠY TRẦN VỚI MỖI BHYT"
            subtext="RÀ SOÁT LẠI 3 LỚP PHÒNG THỦ"
            color="red"
            rotation={-2}
            scale={stampEntrance * 1.05}
          />
        )}

        <p style={{ fontSize: 26, color: "#ffffff", fontWeight: 600, lineHeight: 1.45, margin: 0 }}>
          Nếu công ty chưa trang bị đủ thẻ tư nhân và gói bảo vệ thu nhập, hãy chủ động liên hệ mình.
        </p>

        {/* CTA Profile Card */}
        <div
          style={{
            marginTop: 10,
            width: "100%",
            backgroundColor: "rgba(2, 6, 23, 0.8)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #38bdf8, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
                color: "#080c14",
              }}
            >
              T
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>Tiến Manulife</span>
              <span style={{ fontSize: 18, color: "#94a3b8" }}>Chuyên gia Hoạch định Tài chính</span>
            </div>
          </div>

          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#080c14",
              backgroundColor: "#38bdf8",
              padding: "10px 22px",
              borderRadius: 12,
              letterSpacing: 0.5,
            }}
          >
            NHẮN MÌNH NGAY ➔
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 10. SYNCED WORD-BY-WORD CAPTIONS (SPEECH-SYNCED SUBTITLES)
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
        bottom: 120,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 15, 23, 0.92)",
          border: "1.5px solid rgba(255, 255, 255, 0.14)",
          borderRadius: 16,
          padding: "16px 28px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.7)",
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
                fontSize: 32,
                fontWeight: 800,
                color: isWordActive ? "#38bdf8" : "#ffffff",
                letterSpacing: -0.3,
                textShadow: isWordActive
                  ? "0 0 16px rgba(56, 189, 248, 0.8)"
                  : "0 2px 4px rgba(0, 0, 0, 0.5)",
                lineHeight: 1.3,
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
