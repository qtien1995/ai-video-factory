import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrand from "../../../../../brand/user-brand.json";
import timingData from "./subtitles.json";

// --- GLOBAL BACKGROUND & AMBIENT GLOW ---
export const GlobalBackdrop: React.FC<{ theme?: "gold" | "red" | "green" | "blue" }> = ({ theme = "gold" }) => {
  const frame = useCurrentFrame();
  const glowOpacity = interpolate(Math.sin(frame / 20), [-1, 1], [0.25, 0.45]);

  const glowColor =
    theme === "red"
      ? "rgba(239, 68, 68, 0.25)"
      : theme === "green"
      ? "rgba(16, 185, 129, 0.25)"
      : theme === "blue"
      ? "rgba(56, 189, 248, 0.25)"
      : "rgba(212, 175, 55, 0.22)";

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#0b0e14", overflow: "hidden", zIndex: 0 }}>
      {/* Subtle Grid Lines */}
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}>
        <defs>
          <pattern id="macro-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="1080" height="1920" fill="url(#macro-grid)" />
      </svg>

      {/* Top Ambient Light */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          opacity: glowOpacity,
          pointerEvents: "none",
          filter: "blur(60px)"
        }}
      />
    </div>
  );
};

// --- HEADER BAR ---
export const HeaderBar: React.FC<{
  badge: string;
  title: string;
  badgeColor?: string;
  badgeBg?: string;
}> = ({ badge, title, badgeColor = "#d4af37", badgeBg = "rgba(212, 175, 55, 0.15)" }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        left: 60,
        right: 60,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 12
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            backgroundColor: badgeBg,
            border: `1px solid ${badgeColor}`,
            padding: "6px 16px",
            borderRadius: 999,
            color: badgeColor,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "'Be Vietnam Pro', sans-serif"
          }}
        >
          {badge}
        </div>
        <div style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 20, fontWeight: 600, letterSpacing: "0.05em" }}>
          TÀI CHÍNH THỰC CHIẾN
        </div>
      </div>
      <h1
        style={{
          color: "#ffffff",
          fontSize: 48,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.25,
          fontFamily: "'Be Vietnam Pro', sans-serif"
        }}
      >
        {title}
      </h1>
    </div>
  );
};

// --- SCENE 1: THE HOOK (0s - 7.8s) ---
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const pulse = interpolate(Math.sin(frame / 6), [-1, 1], [1, 1.03]);

  return (
    <div
      style={{
        position: "absolute",
        top: 360,
        left: 60,
        right: 60,
        bottom: 260,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`
      }}
    >
      {/* Alert Pill */}
      <div
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.18)",
          border: "2px solid #ef4444",
          color: "#f87171",
          padding: "10px 24px",
          borderRadius: 999,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.1em",
          marginBottom: 36,
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 0 25px rgba(239, 68, 68, 0.35)"
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444" }} />
        CẢNH BÁO TỌA ĐỘ VĨ MÔ
      </div>

      {/* Hero Metric */}
      <div
        style={{
          color: "#ffffff",
          fontSize: 92,
          fontWeight: 900,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          transform: `scale(${pulse})`,
          textShadow: "0 0 40px rgba(239, 68, 68, 0.5)"
        }}
      >
        1,691.97
      </div>
      <div style={{ color: "#ef4444", fontSize: 32, fontWeight: 700, marginTop: 12, letterSpacing: "0.06em" }}>
        VN-INDEX CHẠM ĐÁY EMA20
      </div>

      {/* RSI Gauge Card */}
      <div
        style={{
          marginTop: 50,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 24,
          padding: "32px 40px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 16 }}>
          <span style={{ color: "#94a3b8", fontSize: 26, fontWeight: 600 }}>CHỈ SỐ RSI(14)</span>
          <span style={{ color: "#f59e0b", fontSize: 32, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
            30.5
          </span>
        </div>

        {/* Horizontal Meter */}
        <div style={{ width: "100%", height: 16, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 8, position: "relative" }}>
          <div
            style={{
              width: "30.5%",
              height: "100%",
              backgroundColor: "#ef4444",
              borderRadius: 8,
              boxShadow: "0 0 15px #ef4444"
            }}
          />
          {/* Threshold marker */}
          <div style={{ position: "absolute", left: "30%", top: -8, bottom: -8, width: 4, backgroundColor: "#ffffff" }} />
        </div>

        <div style={{ color: "#f87171", fontSize: 24, fontWeight: 700, marginTop: 16, letterSpacing: "0.04em" }}>
          ⚠️ CHẠM NGƯỠNG QUÁ BÁN CỰC ĐẠI
        </div>
      </div>

      {/* Big Tension Hook */}
      <div
        style={{
          marginTop: 48,
          fontSize: 42,
          fontWeight: 900,
          textAlign: "center",
          color: "#f8fafc",
          lineHeight: 1.3
        }}
      >
        3 Tháng Cuối Năm 2026: <br />
        <span style={{ color: "#10b981" }}>BÙNG NỔ</span> HAY <span style={{ color: "#ef4444" }}>SỤP GÃY</span>?
      </div>
    </div>
  );
};

// --- SCENE 2: COORDINATES (7.8s - 16.3s) ---
export const Scene2Coordinates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const c1 = spring({ frame: frame - 234, fps, config: { damping: 14 } });
  const c2 = spring({ frame: frame - 250, fps, config: { damping: 14 } });
  const c3 = spring({ frame: frame - 266, fps, config: { damping: 14 } });

  const cards = [
    {
      label: "TÍN PHIẾU OMO NHNN",
      value: "3.95%",
      status: "Nấc 1 Kiểm Soát",
      note: "Chưa cần bán dự trữ ngoại hối",
      anim: c1,
      color: "#38bdf8",
      bg: "rgba(56, 189, 248, 0.08)",
      border: "rgba(56, 189, 248, 0.3)"
    },
    {
      label: "ĐỘ LỆCH USD TỰ DO",
      value: "+80 đồng",
      status: "Vùng An Toàn Tuyệt Đối",
      note: "Ngưỡng báo động là > 400 đồng",
      anim: c2,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)",
      border: "rgba(16, 185, 129, 0.3)"
    },
    {
      label: "LÃI SUẤT TIẾT KIỆM 12T",
      value: "5.2%",
      status: "Duy Trì Vùng Thấp",
      note: "Dòng tiền không bị rút mạnh gửi bank",
      anim: c3,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.3)"
    }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 360,
        left: 60,
        right: 60,
        bottom: 260,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        justifyContent: "center"
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: 28, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 12 }}>
        BỘ 3 CHỈ BÁO VĨ MÔ THỰC TẾ
      </div>

      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            transform: `translateY(${interpolate(c.anim, [0, 1], [60, 0])}px)`,
            opacity: c.anim,
            backgroundColor: c.bg,
            border: `1.5px solid ${c.border}`,
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ color: "#cbd5e1", fontSize: 26, fontWeight: 700 }}>{c.label}</span>
            <span
              style={{
                color: c.color,
                fontSize: 48,
                fontWeight: 900,
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              {c.value}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: c.color, fontSize: 24, fontWeight: 700 }}>● {c.status}</span>
            <span style={{ color: "#94a3b8", fontSize: 22, fontWeight: 500 }}>{c.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- SCENE 3: BASE CASE 65% (16.3s - 29.5s) ---
export const Scene3BaseCase: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - 489);

  const curveProgress = interpolate(relFrame, [0, 90], [0, 1], {
    extrapolateRight: "clamp"
  });

  const stocks = [
    { code: "MWG", name: "Bán Lẻ", color: "#f59e0b" },
    { code: "PNJ", name: "Mùa Cưới Tết", color: "#d4af37" },
    { code: "SSI", name: "Chứng Khoán", color: "#38bdf8" },
    { code: "HPG", name: "Thép Xây Dựng", color: "#ef4444" }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 340,
        left: 60,
        right: 60,
        bottom: 260,
        zIndex: 20,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Probability Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            backgroundColor: "#d4af37",
            color: "#000000",
            fontSize: 28,
            fontWeight: 900,
            padding: "8px 24px",
            borderRadius: 999,
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0 0 25px rgba(212, 175, 55, 0.6)"
          }}
        >
          65% XÁC SUẤT
        </div>
        <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 800 }}>KỊCH BẢN CƠ SỞ</div>
      </div>

      {/* Target Callout Card */}
      <div
        style={{
          backgroundColor: "rgba(212, 175, 55, 0.08)",
          border: "2px solid #d4af37",
          borderRadius: 24,
          padding: "32px 36px",
          marginBottom: 36,
          boxShadow: "0 10px 40px rgba(212, 175, 55, 0.2)"
        }}
      >
        <div style={{ color: "#94a3b8", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>VÙNG ĐIỂM SỐ MỤC TIÊU</div>
        <div
          style={{
            color: "#fef08a",
            fontSize: 68,
            fontWeight: 900,
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.1
          }}
        >
          1,780 – 1,830
        </div>
        <div style={{ color: "#10b981", fontSize: 28, fontWeight: 700, marginTop: 10 }}>
          ▲ Biên độ hồi phục sóng Tết: +5% đến +8%
        </div>
      </div>

      {/* W-Bottom Path Visualizer */}
      <div
        style={{
          height: 180,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 20,
          position: "relative",
          marginBottom: 36,
          padding: "20px 30px"
        }}
      >
        <div style={{ color: "#94a3b8", fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
          MÔ HÌNH: TẠO ĐÁY 1,680 – 1,700 ĐIỂM (W-BOTTOM)
        </div>
        <svg width="900" height="110" style={{ overflow: "visible" }}>
          {/* Baseline */}
          <line x1="0" y1="90" x2="900" y2="90" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="4 4" />
          <text x="20" y="85" fill="#ef4444" fontSize="18" fontWeight="700">
            Đáy 1: 1,680đ
          </text>
          <text x="420" y="85" fill="#f59e0b" fontSize="18" fontWeight="700">
            Đáy 2: 1,700đ
          </text>
          <text x="760" y="20" fill="#10b981" fontSize="22" fontWeight="900">
            Sóng Tết: 1,830đ
          </text>

          {/* Dynamic Curve */}
          <path
            d="M 20 70 Q 150 100 250 50 T 450 65 T 750 15 T 880 10"
            fill="none"
            stroke="#d4af37"
            strokeWidth="5"
            strokeDasharray="1000"
            strokeDashoffset={interpolate(curveProgress, [0, 1], [1000, 0])}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Recommended Stocks Grid */}
      <div style={{ color: "#cbd5e1", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        TÂM ĐIỂM SÓNG NGÀNH DẪN DẮT:
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {stocks.map((s, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span style={{ color: "#ffffff", fontSize: 32, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
              {s.code}
            </span>
            <span style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SCENE 4: COMPARISON 20% vs 15% (29.5s - 44.8s) ---
export const Scene4Comparison: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 350,
        left: 60,
        right: 60,
        bottom: 260,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        justifyContent: "center"
      }}
    >
      {/* Bullish Case 20% */}
      <div
        style={{
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          border: "2px solid #10b981",
          borderRadius: 24,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "#10b981",
              color: "#000000",
              fontWeight: 900,
              fontSize: 24,
              padding: "6px 18px",
              borderRadius: 999
            }}
          >
            20% BÙNG NỔ FTSE
          </div>
          <span style={{ color: "#10b981", fontSize: 44, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
            1,880 – 1,900
          </span>
        </div>
        <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 700 }}>
          Điều kiện: Dầu Brent gãy &lt; 85$ · DXY thủng 100 · Khối ngoại đảo chiều mua
        </div>
        <div style={{ color: "#34d399", fontSize: 22, fontWeight: 600 }}>
          Trọng tâm: Ngân hàng thương mại (VCB, CTG, TCB, MBB) + VN30
        </div>
      </div>

      {/* Bearish Case 15% */}
      <div
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.08)",
          border: "2px solid #ef4444",
          borderRadius: 24,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 24,
              padding: "6px 18px",
              borderRadius: 999
            }}
          >
            15% THẬN TRỌNG RŨ BỎ
          </div>
          <span style={{ color: "#ef4444", fontSize: 44, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
            1,580 – 1,630
          </span>
        </div>
        <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 700 }}>
          Rủi ro: Tỷ giá tự do vượt 26.200đ · NHNN bán can thiệp / Tăng lãi suất điều hành
        </div>
        <div style={{ color: "#f87171", fontSize: 22, fontWeight: 600 }}>
          Trọng tâm phòng thủ: Cổ tức tiền mặt cao (VEA, VNM, DPM) + Tiện ích (REE, POW)
        </div>
      </div>
    </div>
  );
};

// --- SCENE 5: ACTION MATRIX (44.8s - 57.7s) ---
export const Scene5ActionMatrix: React.FC = () => {
  const steps = [
    {
      step: "BẬC 1",
      trigger: "VÙNG HIỆN TẠI (1,680 – 1,700)",
      action: "40% CỔ / 60% TIỀN TƯƠI",
      desc: "Gom nhặt mã dẫn dắt, không đòn bẩy margin",
      color: "#f59e0b",
      border: "#f59e0b"
    },
    {
      step: "BẬC 2",
      trigger: "XÁC NHẬN VƯỢT 1,735 (EMA20)",
      action: "NÂNG LÊN 80% – 100% CỔ",
      desc: "Bùng nổ theo đà (FTD), gia tăng tỷ trọng đón sóng Tết",
      color: "#10b981",
      border: "#10b981"
    },
    {
      step: "BẬC 3",
      trigger: "KỶ LUẬT THỦNG 1,680 ĐIỂM",
      action: "CẮT DỨT KHOÁT VỀ 100% TIỀN MẶT",
      desc: "Đứng ngoài hoàn toàn, kiên nhẫn chờ vùng 1,600",
      color: "#ef4444",
      border: "#ef4444"
    }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 340,
        left: 60,
        right: 60,
        bottom: 260,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        justifyContent: "center"
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: 26, fontWeight: 700, letterSpacing: "0.08em" }}>
        BẢNG ĐIỀU HƯỚNG VỐN DỨT KHOÁT
      </div>

      {steps.map((st, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderLeft: `6px solid ${st.border}`,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "0 18px 18px 0",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: 22, fontWeight: 800 }}>{st.step} · {st.trigger}</span>
          </div>
          <div style={{ color: st.color, fontSize: 34, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
            {st.action}
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 22, fontWeight: 500 }}>{st.desc}</div>
        </div>
      ))}
    </div>
  );
};

// --- SCENE 6: BRANDED OUTRO (57.7s - 62.0s) ---
export const Scene6Outro: React.FC = () => {
  const brandName = userBrand.brandName || "TÀI CHÍNH THỰC CHIẾN";
  const creatorName = userBrand.creatorName || "Tiến Dương";
  const tagline = userBrand.tagline || "HOẠCH ĐỊNH TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG";
  const cta = userBrand.cta || "Bình luận danh mục cổ phiếu bạn quan tâm bên dưới 👇";
  const disclaimer = userBrand.disclaimer || "Số liệu mang tính chất tham khảo · Không phải khuyến nghị đầu tư";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0b0e14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 60px",
        zIndex: 60,
        fontFamily: "'Be Vietnam Pro', sans-serif"
      }}
    >
      {/* Brand Emblem */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d4af37, #f59e0b, #10b981)",
          padding: 4,
          boxShadow: "0 0 50px rgba(212, 175, 55, 0.5)",
          marginBottom: 36
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#0b0e14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            fontWeight: 900,
            color: "#d4af37",
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          {creatorName.charAt(0)}
        </div>
      </div>

      {/* Brand Name */}
      <h1
        style={{
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 900,
          margin: 0,
          letterSpacing: "0.02em",
          textAlign: "center",
          lineHeight: 1.2
        }}
      >
        {brandName}
      </h1>

      {/* Creator */}
      <div style={{ color: "#94a3b8", fontSize: 32, fontWeight: 700, marginTop: 12 }}>{creatorName}</div>

      {/* Tagline */}
      <div
        style={{
          color: "#d4af37",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.14em",
          marginTop: 16,
          textAlign: "center"
        }}
      >
        {tagline}
      </div>

      {/* CTA Pill */}
      <div
        style={{
          marginTop: 64,
          backgroundColor: "rgba(212, 175, 55, 0.12)",
          border: "2px solid #d4af37",
          borderRadius: 999,
          padding: "18px 40px",
          color: "#ffffff",
          fontSize: 28,
          fontWeight: 800,
          textAlign: "center",
          boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)"
        }}
      >
        {cta}
      </div>

      {/* Legal Disclaimer */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          color: "#64748b",
          fontSize: 22,
          textAlign: "center",
          padding: "0 40px"
        }}
      >
        {disclaimer}
      </div>
    </div>
  );
};

// --- SPEECH-SYNCED SUBTITLES (Karaoke Jump & Pop Highlight) ---
export const SyncedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  const chunks = (timingData as any).chunks || [];

  // Find active chunk
  const activeChunk = chunks.find(
    (c: any) => currentMs >= c.startMs && currentMs < c.endMs
  );

  // If no speech chunk active, hide subtitle
  if (!activeChunk) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 170,
        left: 60,
        right: 60,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none"
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(11, 14, 20, 0.92)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          padding: "20px 36px",
          borderRadius: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 14px",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.7)",
          maxWidth: 960
        }}
      >
        {activeChunk.words.map((w: any, idx: number) => {
          const isCurrent = currentMs >= w.startMs && currentMs < w.endMs;
          const isPast = currentMs >= w.endMs;

          return (
            <span
              key={idx}
              style={{
                display: "inline-block",
                fontSize: 38,
                lineHeight: 1.2,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: isCurrent ? 900 : 700,
                color: isCurrent ? "#facc15" : isPast ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                transform: isCurrent ? "translateY(-12px) scale(1.18)" : "translateY(0) scale(1)",
                backgroundColor: isCurrent ? "rgba(250, 204, 21, 0.22)" : "transparent",
                padding: isCurrent ? "4px 10px" : "4px 0",
                borderRadius: 10,
                borderBottom: isCurrent ? "3px solid #facc15" : "none",
                boxShadow: isCurrent ? "0 6px 20px rgba(250, 204, 21, 0.5)" : "none",
                textShadow: isCurrent ? "0 0 25px rgba(250, 204, 21, 0.9)" : "none",
                transition: "all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)"
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
