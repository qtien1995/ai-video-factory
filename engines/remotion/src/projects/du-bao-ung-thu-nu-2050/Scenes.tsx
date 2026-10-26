import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrand from "../../../../../brand/user-brand.json";

// ============================================================================
// EDITORIAL GLOBAL BACKDROP (Dark Slate Press Room with Soft Crimson & Sky Glow)
// ============================================================================
export const GlobalBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.04) * 0.08 + 0.92;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0B101D",
        backgroundImage: "radial-gradient(circle at 50% 25%, #131B2E 0%, #0B101D 80%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle Tactical Grid */}
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

      {/* Atmospheric Glow */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: "50%",
          transform: `translateX(-50%) scale(${pulse})`,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Editorial Eyebrow & Brand Bar */}
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
              backgroundColor: "#E11D48",
              boxShadow: "0 0 10px #E11D48",
            }}
          />
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: "#F87171",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            QUẢN TRỊ RỦI RO TÀI CHÍNH
          </span>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 600,
          }}
        >
          TIẾN DƯƠNG · BẢN TIN BẢO HIỂM
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 1: HOOK (0 -> 270) — PRESS CLIPPING VNEXPRESS & VIỆN PHÍ TIỀN TỶ
// ============================================================================
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const sweepProgress = interpolate(frame, [15, 65], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          backgroundColor: "#131B2E",
          border: "2px solid rgba(225, 29, 72, 0.6)",
          borderRadius: 24,
          padding: "44px 40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(225, 29, 72, 0.25)",
          transform: `scale(${interpolate(cardEntrance, [0, 1], [0.92, 1])}) translateY(${interpolate(cardEntrance, [0, 1], [40, 0])}px)`,
          opacity: cardEntrance,
          position: "relative",
        }}
      >
        {/* Source metadata badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(225, 29, 72, 0.2)",
              padding: "8px 18px",
              borderRadius: 8,
              border: "1px solid rgba(225, 29, 72, 0.5)",
            }}
          >
            <span
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#E11D48",
                letterSpacing: 1,
              }}
            >
              VNEXPRESS SỨC KHỎE
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>|</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              DỰ BÁO ĐẾN 2050
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#E11D48",
              color: "#FFF",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              padding: "6px 16px",
              borderRadius: 6,
              letterSpacing: 1,
            }}
          >
            BÁO ĐỘNG TÀI CHÍNH
          </div>
        </div>

        {/* Headline with Yellow Highlighter Sweep */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.3,
              color: "#FFFFFF",
              margin: 0,
              position: "relative",
              zIndex: 2,
            }}
          >
            Dự báo số ca ung thư ở phụ nữ Việt{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                padding: "2px 8px",
                color: "#0F172A",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#FDE047",
                  borderRadius: 6,
                  width: `${sweepProgress}%`,
                  zIndex: -1,
                  boxShadow: "0 0 15px rgba(253, 224, 71, 0.5)",
                }}
              />
              tăng 50%
            </span>{" "}
            vào năm 2050
          </h1>
        </div>

        {/* Financial Warning Callout */}
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "2px solid #EF4444",
            borderRadius: 16,
            padding: "22px 26px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 44 }}>💸</div>
          <div>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#EF4444",
                marginBottom: 4,
              }}
            >
              CÚ SỐC VIỆN PHÍ TIỀN TỶ
            </div>
            <div
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 20,
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.4,
              }}
            >
              Hàng trăm triệu đến cả tỷ đồng bay màu trong tích tắc nếu không có lá chắn bảo hiểm!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 2: PROBLEM (270 -> 540) — 60% BỆNH NHÂN Ở TUỔI TRỤ CỘT GIA ĐÌNH
// ============================================================================
export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          backgroundColor: "#131B2E",
          border: "2px solid rgba(225, 29, 72, 0.6)",
          borderRadius: 24,
          padding: "44px 40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
          transform: `scale(${interpolate(entrance, [0, 1], [0.94, 1])})`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(225, 29, 72, 0.2)",
            color: "#E11D48",
            padding: "8px 18px",
            borderRadius: 8,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 16,
          }}
        >
          ● TÂM ĐIỂM NGUY CƠ
        </div>

        <h2
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "0 0 24px 0",
            lineHeight: 1.3,
          }}
        >
          Ung Thư Vú & Cổ Tử Cung
        </h2>

        {/* Hero Alert: 60% ở tuổi 30-60 */}
        <div
          style={{
            backgroundColor: "rgba(253, 224, 71, 0.12)",
            border: "2px solid #FDE047",
            borderRadius: 18,
            padding: "28px",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 60,
              fontWeight: 900,
              color: "#FDE047",
              lineHeight: 1,
            }}
          >
            60%
          </div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#FFFFFF",
              marginTop: 10,
            }}
          >
            Phát Hiện Ở Độ Tuổi 30 – 60
          </div>
          <div
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 19,
              color: "rgba(255, 255, 255, 0.8)",
              marginTop: 6,
            }}
          >
            Thời điểm đang là trụ cột kinh tế, nuôi dạy con nhỏ và lo toan gia đình
          </div>
        </div>

        {/* Stat strip */}
        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.1)",
            border: "1px dashed rgba(56, 189, 248, 0.4)",
            borderRadius: 14,
            padding: "16px 20px",
            textAlign: "center",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 21,
            color: "#38BDF8",
            fontWeight: 700,
          }}
        >
          Chiếm <strong>37% ca mắc mới</strong> và <strong>30% ca tử vong</strong> ở phụ nữ
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 3: THE FLAW (540 -> 799) — LỖ HỔNG BHYT VỚI THUỐC ĐÍCH TIỀN TRĂM TRIỆU
// ============================================================================
export const Scene3TheFlaw: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          backgroundColor: "#131B2E",
          border: "2px solid rgba(56, 189, 248, 0.5)",
          borderRadius: 24,
          padding: "44px 40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
          transform: `scale(${interpolate(entrance, [0, 1], [0.94, 1])})`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: "#EF4444",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          ẢO TƯỞNG TÀI CHÍNH PHỔ BIẾN
        </div>

        <h2
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "0 0 28px 0",
          }}
        >
          Có BHYT Nhà Nước Đã Đủ Chưa?
        </h2>

        {/* 2 Comparison Bento Boxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* BHYT */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#38BDF8" }}>
                BHYT NHÀ NƯỚC CHI TRẢ
              </div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                Thuốc phổ thông, giường bệnh công lập đúng tuyến
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8" }}>
              NỀN TẢNG
            </div>
          </div>

          {/* Thuốc đích & Xạ trị tiên tiến */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "2px solid #EF4444",
              borderRadius: 16,
              padding: "22px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 0 25px rgba(239, 68, 68, 0.3)",
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#EF4444" }}>
                THUỐC ĐÍCH &amp; MIỄN DỊCH TIÊN TIẾN
              </div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
                100 – 300 Triệu/đợt điều trị (Nằm ngoài danh mục 100%)
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#EF4444",
                color: "#FFF",
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              TỰ CHI TRẢ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 4: IMPACT (799 -> 931) — SỔ TIẾT KIỆM CẢ ĐỜI BỐC HƠI
// ============================================================================
export const Scene4Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          backgroundColor: "#131B2E",
          border: "2px solid rgba(239, 68, 68, 0.6)",
          borderRadius: 24,
          padding: "44px 40px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
          transform: `scale(${interpolate(entrance, [0, 1], [0.94, 1])})`,
          opacity: entrance,
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>📉</div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: "#EF4444",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          HỆ LỤY TÀI CHÍNH NẶNG NỀ
        </div>

        <h2
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 46,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "0 0 20px 0",
            lineHeight: 1.3,
          }}
        >
          Sổ Tiết Kiệm Bốc Hơi Sau Vài Tháng
        </h2>

        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.5,
            maxWidth: 780,
            margin: "0 auto 28px auto",
          }}
        >
          Tích lũy 10–20 năm có thể "bay màu" chỉ sau một đợt hóa trị. Vừa phải chống chọi với bệnh tật, vừa gánh nặng kiệt quệ tài chính cho con cái!
        </p>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "1px solid #EF4444",
            color: "#FCA5A5",
            padding: "12px 28px",
            borderRadius: 50,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          ⚠️ KHÔNG BẢO HIỂM = LẤY TOÀN BỘ GIA TÀI RA ĐÁNH ĐỔI
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 5: SOLUTION (931 -> 1216) — 3 TẦNG LÁ CHẮN TÀI CHÍNH CHO PHỤ NỮ
// ============================================================================
export const Scene5Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  const shields = [
    {
      num: "01",
      title: "BHYT Nhà Nước",
      desc: "Nền tảng thanh toán viện phí cơ bản tại các bệnh viện công",
      badge: "Lớp 1: Nền tảng",
      color: "#38BDF8",
    },
    {
      num: "02",
      title: "Thẻ Bảo Hiểm Sức Khỏe (BHSK)",
      desc: "Hạn mức 500tr – 1 tỷ/năm lo tiền giường dịch vụ, phẫu thuật & thuốc đích",
      badge: "Lớp 2: Viện phí thực",
      color: "#10B981",
    },
    {
      num: "03",
      title: "Bảo Hiểm Bệnh Hiểm Nghèo",
      desc: "Nhận ngay tiền mặt 500tr – 1 tỷ bù đắp thu nhập 2-3 năm dưỡng bệnh",
      badge: "Lớp 3: Tiền mặt sống",
      color: "#D4AF37",
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
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          textAlign: "center",
          marginBottom: 24,
          transform: `translateY(${interpolate(entrance, [0, 1], [-20, 0])}px)`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            color: "#10B981",
            padding: "8px 18px",
            borderRadius: 8,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          ● QUẢN TRỊ RỦI RO THỰC CHIẾN
        </div>
        <h2
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          3 Lớp Lá Chắn Bảo Vệ Gia Đình
        </h2>
      </div>

      {/* 3 Shield Cards */}
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {shields.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#131B2E",
              border: `1px solid ${item.color}66`,
              borderRadius: 18,
              padding: "22px 28px",
              display: "flex",
              alignItems: "center",
              gap: 22,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 30,
                fontWeight: 900,
                color: item.color,
                backgroundColor: `${item.color}22`,
                width: 60,
                height: 60,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.num}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <span
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 23,
                    fontWeight: 800,
                    color: "#FFFFFF",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    backgroundColor: `${item.color}22`,
                    color: item.color,
                    fontSize: 16,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 18,
                  color: "rgba(255, 255, 255, 0.75)",
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 6: OUTRO (1216 -> 1639) — USER BRAND TIẾN DƯƠNG & LỜI ĐÚC KẾT
// ============================================================================
export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          backgroundColor: "#131B2E",
          border: "2px solid rgba(212, 175, 55, 0.6)",
          borderRadius: 24,
          padding: "44px 40px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.2)",
          transform: `scale(${interpolate(entrance, [0, 1], [0.92, 1])})`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            border: "2px solid #D4AF37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            fontSize: 40,
          }}
        >
          🛡️
        </div>

        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#D4AF37",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {userBrand.brandName}
        </div>

        <h1
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "0 0 16px 0",
            lineHeight: 1.3,
          }}
        >
          Đừng Để Tiền Tiết Kiệm Biến Thành Viện Phí!
        </h1>

        <p
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: 800,
            margin: "0 auto 28px auto",
            lineHeight: 1.5,
          }}
        >
          Mua bảo hiểm khi còn khỏe là cách yêu thương bản thân và gia đình thông minh nhất.
        </p>

        {/* CTA Button */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "#D4AF37",
            color: "#0B101D",
            padding: "16px 36px",
            borderRadius: 50,
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 22,
            fontWeight: 900,
            boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)",
            marginBottom: 20,
          }}
        >
          <span>BÌNH LUẬN ĐỂ NHẬN TƯ VẤN QUỸ DỰ PHÒNG 👇</span>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 600,
          }}
        >
          {userBrand.creatorName} · {userBrand.handle}
        </div>
      </div>
    </div>
  );
};
