import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrand from "../../../../../brand/user-brand.json";

// ============================================================================
// GLOBAL BACKDROP: Deep Slate Navy (#08121f -> #0d2238) with Subtle Tech Glow
// ============================================================================
export const GlobalBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.04) * 0.08 + 0.92;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#08121f",
        backgroundImage: "radial-gradient(circle at 50% 20%, #0d2238 0%, #08121f 100%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle Grid Matrix */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Atmospheric Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) scale(${pulse})`,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header Eyebrow Bar (Safe Zone Top: 64px) */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          paddingBottom: 14,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#38bdf8",
              boxShadow: "0 0 10px #38bdf8",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: "#38bdf8",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            HOẠCH ĐỊNH BẢO HIỂM THỰC CHIẾN
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {userBrand.creatorName.toUpperCase()} · {userBrand.handle}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 1: HOOK & BÀI TOÁN (Frames 0 -> 324) — 20 TRIỆU MUA SAO CHO ĐÚNG?
// ============================================================================
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const translateY = (1 - entrance) * 50;
  const opacity = Math.min(1, frame / 8);

  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "240px 48px 180px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* Eyebrow & Pill Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 960,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1.5,
          }}
        >
          BÀI TOÁN THỰC CHIẾN • HOOK
        </span>
        <div
          style={{
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#38bdf8",
            fontSize: 20,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          NGÂN SÁCH 20TR / NĂM
        </div>
      </div>

      {/* Main 2-Line Headline */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          textTransform: "uppercase",
          margin: "0 0 32px 0",
        }}
      >
        <div style={{ color: "#ffffff" }}>CÓ 20 TRIỆU MỖI NĂM</div>
        <div style={{ color: "#38bdf8" }}>MUA BẢO HIỂM SAO CHO ĐÚNG?</div>
      </h1>

      {/* Hero Metric Card & Warning */}
      <div
        style={{
          transform: `translateY(${translateY + floatY}px)`,
          opacity,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(56, 189, 248, 0.3)",
            borderRadius: 28,
            padding: "36px 32px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(245, 158, 11, 0.15)",
              color: "#f59e0b",
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            NGÂN SÁCH HOẠCH ĐỊNH
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              20.000.000
            </span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#38bdf8" }}>
              VNĐ / Năm
            </span>
          </div>

          <p
            style={{
              fontSize: 28,
              color: "#e2e8f0",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Nhiều người dồn hết tiền vào tích lũy sinh lời mà quên mất giá trị
            bảo vệ cốt lõi khi rủi ro ập đến!
          </p>

          <div
            style={{
              marginTop: 10,
              padding: "12px 20px",
              borderRadius: 14,
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 24 }}>⚠️</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#f87171",
                textTransform: "uppercase",
              }}
            >
              80% NGƯỜI MUA SAI THỨ TỰ ƯU TIÊN
            </span>
          </div>
        </div>

        {/* 3 Pillars Teaser Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            width: "100%",
          }}
        >
          <div
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8" }}>
              CỘT 1
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
              Sinh Mạng
            </div>
          </div>
          <div
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>
              CỘT 2
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
              Hiểm Nghèo
            </div>
          </div>
          <div
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 18,
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981" }}>
              CỘT 3
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
              Nằm Viện
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 2: TRỤ CỘT 1 — BẢO VỆ SINH MẠNG 1 TỶ (Frames 324 -> 650)
// ============================================================================
export const Scene2Pillar1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const translateY = (1 - entrance) * 50;
  const opacity = Math.min(1, frame / 8);
  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "240px 48px 180px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* Eyebrow & Pill Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 960,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1.5,
          }}
        >
          HOẠCH ĐỊNH BẢO HIỂM • TRỤ CỘT 1
        </span>
        <div
          style={{
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#38bdf8",
            fontSize: 20,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          THAY THẾ THU NHẬP
        </div>
      </div>

      {/* Main 2-Line Headline */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          textTransform: "uppercase",
          margin: "0 0 32px 0",
        }}
      >
        <div style={{ color: "#ffffff" }}>TRỤ CỘT THỨ NHẤT</div>
        <div style={{ color: "#38bdf8" }}>BẢO VỆ SINH MẠNG 1 TỶ</div>
      </h1>

      {/* Hero Metric Card */}
      <div
        style={{
          transform: `translateY(${translateY + floatY}px)`,
          opacity,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(56, 189, 248, 0.35)",
            borderRadius: 28,
            padding: "36px 32px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            MỆNH GIÁ BẢO VỆ TRỤ CỘT
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              1.000.000.000
            </span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#38bdf8" }}>
              VNĐ
            </span>
          </div>

          <p
            style={{
              fontSize: 28,
              color: "#e2e8f0",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Tấm lá chắn thay thế thu nhập cho gia đình trong ít nhất 5 đến 10
            năm nếu người trụ cột chẳng may vắng mặt.
          </p>

          <div
            style={{
              marginTop: 10,
              paddingTop: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 22, color: "#94a3b8", fontWeight: 600 }}>
              Mức phí khuyến nghị:
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 12,
                background: "rgba(56, 189, 248, 0.15)",
                color: "#38bdf8",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              ~30% NGÂN SÁCH (KHOẢNG 6 TRIỆU/NĂM)
            </div>
          </div>
        </div>

        {/* Highlight Feature Card */}
        <div
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 32 }}>🛡️</span>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>
              Chi trả Tử vong & Thương tật toàn bộ vĩnh viễn
            </div>
            <div style={{ fontSize: 20, color: "#94a3b8", marginTop: 4 }}>
              Ưu tiên số 1 của người đang gánh vác kinh tế và nuôi con nhỏ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 3: TRỤ CỘT 2 — QUỸ BỆNH HIỂM NGHÈO 500 TRIỆU (Frames 650 -> 996)
// ============================================================================
export const Scene3Pillar2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const translateY = (1 - entrance) * 50;
  const opacity = Math.min(1, frame / 8);
  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "240px 48px 180px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* Eyebrow & Pill Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 960,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1.5,
          }}
        >
          HOẠCH ĐỊNH BẢO HIỂM • TRỤ CỘT 2
        </span>
        <div
          style={{
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            color: "#f59e0b",
            fontSize: 20,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          TIỀN MẶT ĐIỀU TRỊ
        </div>
      </div>

      {/* Main 2-Line Headline */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          textTransform: "uppercase",
          margin: "0 0 32px 0",
        }}
      >
        <div style={{ color: "#ffffff" }}>TRỤ CỘT THỨ HAI</div>
        <div style={{ color: "#f59e0b" }}>BỆNH HIỂM NGHÈO 500 TRIỆU</div>
      </h1>

      {/* Hero Metric Card */}
      <div
        style={{
          transform: `translateY(${translateY + floatY}px)`,
          opacity,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(245, 158, 11, 0.35)",
            borderRadius: 28,
            padding: "36px 32px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(245, 158, 11, 0.15)",
              color: "#f59e0b",
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            QUỸ DỰ PHÒNG UNG THƯ / ĐỘT QUỴ
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              500.000.000
            </span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#f59e0b" }}>
              VNĐ
            </span>
          </div>

          <p
            style={{
              fontSize: 28,
              color: "#e2e8f0",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Nhận tiền mặt một lần ngay khi có chẩn đoán bệnh giai đoạn đầu đến
            giai đoạn cuối để kịp thời điều trị thuốc đích đắt đỏ.
          </p>

          <div
            style={{
              marginTop: 10,
              paddingTop: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 22, color: "#94a3b8", fontWeight: 600 }}>
              Mức phí khuyến nghị:
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 12,
                background: "rgba(245, 158, 11, 0.15)",
                color: "#f59e0b",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              ~35% NGÂN SÁCH (KHOẢNG 7 TRIỆU/NĂM)
            </div>
          </div>
        </div>

        {/* Key Advantage Alert */}
        <div
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 32 }}>⚡</span>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>
              Chi trả tiền mặt, không phụ thuộc hóa đơn viện phí
            </div>
            <div style={{ fontSize: 20, color: "#94a3b8", marginTop: 4 }}>
              Bù đắp 100% thu nhập bị mất trong suốt thời gian điều trị
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 4: TRỤ CỘT 3 — THẺ SỨC KHỎE 250 TRIỆU/NĂM (Frames 996 -> 1319)
// ============================================================================
export const Scene4Pillar3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const translateY = (1 - entrance) * 50;
  const opacity = Math.min(1, frame / 8);
  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "240px 48px 180px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* Eyebrow & Pill Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 960,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1.5,
          }}
        >
          HOẠCH ĐỊNH BẢO HIỂM • TRỤ CỘT 3
        </span>
        <div
          style={{
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#10b981",
            fontSize: 20,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          BẢO LÃNH VIỆN PHÍ 100%
        </div>
      </div>

      {/* Main 2-Line Headline */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          textTransform: "uppercase",
          margin: "0 0 32px 0",
        }}
      >
        <div style={{ color: "#ffffff" }}>TRỤ CỘT THỨ BA</div>
        <div style={{ color: "#10b981" }}>THẺ SỨC KHỎE 250TR/NĂM</div>
      </h1>

      {/* Hero Metric Card */}
      <div
        style={{
          transform: `translateY(${translateY + floatY}px)`,
          opacity,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.35)",
            borderRadius: 28,
            padding: "36px 32px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            HẠN MỨC ĐIỀU TRỊ NỘI TRÚ
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              250.000.000
            </span>
            <span style={{ fontSize: 36, fontWeight: 800, color: "#10b981" }}>
              VNĐ / Năm
            </span>
          </div>

          <p
            style={{
              fontSize: 28,
              color: "#e2e8f0",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Chi trả thực tế toàn bộ tiền giường phòng dịch vụ 2 triệu/ngày, phẫu
            thuật, xét nghiệm kỹ thuật cao và cấp cứu 24/7.
          </p>

          <div
            style={{
              marginTop: 10,
              paddingTop: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 22, color: "#94a3b8", fontWeight: 600 }}>
              Mức phí khuyến nghị:
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 12,
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              ~35% (7 TRIỆU CÒN LẠI)
            </div>
          </div>
        </div>

        {/* Hospital Badges Grid */}
        <div
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 28 }}>🏥</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>
              Hệ thống bảo lãnh viện phí:
            </span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["VINMEC", "VIỆT PHÁP", "HỒNG NGỌC"].map((hosp) => (
              <span
                key={hosp}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.08)",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#e2e8f0",
                }}
              >
                {hosp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 5: TỔNG KẾT & OUTRO CTA (Frames 1319 -> 1662)
// ============================================================================
export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.8 },
  });
  const translateY = (1 - entrance) * 50;
  const opacity = Math.min(1, frame / 8);
  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "240px 48px 180px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* Eyebrow & Pill Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 960,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1.5,
          }}
        >
          {userBrand.brandName} • LỜI KHUYÊN
        </span>
        <div
          style={{
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#38bdf8",
            fontSize: 20,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          {userBrand.creatorName}
        </div>
      </div>

      {/* Main 2-Line Headline */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.15,
          textTransform: "uppercase",
          margin: "0 0 32px 0",
        }}
      >
        <div style={{ color: "#ffffff" }}>TỔNG BẢO VỆ GIA ĐÌNH</div>
        <div style={{ color: "#38bdf8" }}>LÊN TỚI 1,75 TỶ ĐỒNG</div>
      </h1>

      {/* Comparison Summary Card */}
      <div
        style={{
          transform: `translateY(${translateY + floatY}px)`,
          opacity,
          width: "100%",
          maxWidth: 960,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(56, 189, 248, 0.35)",
            borderRadius: 28,
            padding: "32px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#38bdf8",
              textTransform: "uppercase",
            }}
          >
            TỔNG HỢP GÓI 20 TRIỆU / NĂM
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 14,
            }}
          >
            <div
              style={{
                background: "rgba(30, 41, 59, 0.9)",
                borderRadius: 16,
                padding: "16px 12px",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>
                Sinh Mạng
              </div>
              <div style={{ fontSize: 32, color: "#ffffff", fontWeight: 900 }}>
                1,0 Tỷ
              </div>
            </div>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.9)",
                borderRadius: 16,
                padding: "16px 12px",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>
                Hiểm Nghèo
              </div>
              <div style={{ fontSize: 32, color: "#f59e0b", fontWeight: 900 }}>
                500 Tr
              </div>
            </div>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.9)",
                borderRadius: 16,
                padding: "16px 12px",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>
                Nội Trú/Năm
              </div>
              <div style={{ fontSize: 32, color: "#10b981", fontWeight: 900 }}>
                250 Tr
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button Box */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(16, 185, 129, 0.2) 100%)",
            border: "2px solid #38bdf8",
            borderRadius: 24,
            padding: "24px 28px",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(56, 189, 248, 0.3)",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span>💬</span>
            <span>ĐỂ LẠI ĐỘ TUỔI CỦA BẠN BÊN DƯỚI 👇</span>
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#cbd5e1",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Nhận bảng phân bổ quyền lợi tối ưu theo thực tế
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          {userBrand.disclaimer} · {userBrand.handle}
        </div>
      </div>
    </div>
  );
};
