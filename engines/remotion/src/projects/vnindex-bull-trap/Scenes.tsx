import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrand from "../../../../../brand/user-brand.json";
import timingData from "./subtitles.json";

// --- GLOBAL BACKGROUND & AMBIENT GLOW ---
export const GlobalBackdrop: React.FC<{ theme?: "gold" | "red" | "green" | "purple" | "blue" }> = ({
  theme = "green"
}) => {
  const frame = useCurrentFrame();
  const glowOpacity = interpolate(Math.sin(frame / 20), [-1, 1], [0.25, 0.45]);

  const glowColor =
    theme === "red"
      ? "rgba(239, 68, 68, 0.28)"
      : theme === "purple"
      ? "rgba(168, 85, 247, 0.28)"
      : theme === "gold"
      ? "rgba(212, 175, 55, 0.25)"
      : theme === "blue"
      ? "rgba(56, 189, 248, 0.25)"
      : "rgba(16, 185, 129, 0.25)";

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

      {/* Top Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 820,
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
}> = ({ badge, title, badgeColor = "#10b981", badgeBg = "rgba(16, 185, 129, 0.15)" }) => {
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
            border: `1.5px solid ${badgeColor}`,
            padding: "8px 20px",
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
        <div style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: 20, fontWeight: 700, letterSpacing: "0.05em" }}>
          TÀI CHÍNH THỰC CHIẾN
        </div>
      </div>
      <h1
        style={{
          color: "#ffffff",
          fontSize: 46,
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

// --- SCENE 1: THE HOOK (0 - 242 frames) ---
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const pulse = interpolate(Math.sin(frame / 8), [-1, 1], [0.98, 1.02]);

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 60,
        right: 60,
        bottom: 260,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
      }}
    >
      {/* Hero Metric Card */}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          border: "2px solid rgba(16, 185, 129, 0.35)",
          borderRadius: 36,
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 20px 50px rgba(16, 185, 129, 0.2)",
          transform: `scale(${pop * pulse})`
        }}
      >
        <span style={{ color: "#34d399", fontSize: 24, fontWeight: 800, letterSpacing: "0.1em" }}>
          ĐIỂM SỐ ĐÓNG CỬA 21/10
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 100,
              fontWeight: 900,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px rgba(16, 185, 129, 0.6)"
            }}
          >
            1,738.67
          </span>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(16, 185, 129, 0.25)",
            padding: "8px 24px",
            borderRadius: 999,
            border: "1px solid #10b981"
          }}
        >
          <span style={{ color: "#10b981", fontSize: 32, fontWeight: 900 }}>▲ +46.70 (+2.76%)</span>
        </div>
      </div>

      {/* Volume Stat Card */}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 28,
          padding: "28px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 700 }}>THANH KHOẢN KHỚP LỆNH</div>
          <div style={{ color: "#ffffff", fontSize: 44, fontWeight: 900, fontFamily: "'Montserrat', sans-serif" }}>
            895.8 TRIỆU CP
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1px solid #38bdf8",
            borderRadius: 16,
            padding: "10px 18px",
            color: "#38bdf8",
            fontSize: 22,
            fontWeight: 800
          }}
        >
          +39% vs MA20
        </div>
      </div>

      {/* Contrast Dilemma Badge */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            border: "1.5px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 24,
            padding: "24px 20px",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: 36 }}>🚀</div>
          <div style={{ color: "#34d399", fontSize: 24, fontWeight: 900, marginTop: 8 }}>CHÂN SÓNG THẦN?</div>
          <div style={{ color: "#94a3b8", fontSize: 18, marginTop: 4 }}>Bùng nổ dòng tiền</div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 24,
            padding: "24px 20px",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: 36 }}>⚠️</div>
          <div style={{ color: "#f87171", fontSize: 24, fontWeight: 900, marginTop: 8 }}>BẪY BULL TRAP?</div>
          <div style={{ color: "#94a3b8", fontSize: 18, marginTop: 4 }}>Kéo trụ xả hàng</div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 2: VIN BREAKDOWN (242 - 568 frames) ---
export const Scene2VinBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vinStocks = [
    { code: "VHM", name: "Vinhomes", price: "61,800 đ", change: "+6.92%", vol: "13.8M cp", contrib: "+7.9 điểm" },
    { code: "VIC", name: "Vingroup", price: "46,500 đ", change: "+6.88%", vol: "8.5M cp", contrib: "+6.8 điểm" },
    { code: "VRE", name: "Vincom Retail", price: "19,500 đ", change: "+6.85%", vol: "7.2M cp", contrib: "+3.1 điểm" }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 60,
        right: 60,
        bottom: 260,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        justifyContent: "center",
        zIndex: 10
      }}
    >
      {/* Highlight Header Card */}
      <div
        style={{
          backgroundColor: "rgba(168, 85, 247, 0.12)",
          border: "2px solid #a855f7",
          borderRadius: 28,
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)"
        }}
      >
        <div>
          <div style={{ color: "#c084fc", fontSize: 20, fontWeight: 800 }}>NGÒI NỔ CHỈ SỐ</div>
          <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 900 }}>BỘ 3 HỌ VIN ĐỒNG LOẠT TRẦN</div>
        </div>
        <div
          style={{
            backgroundColor: "#a855f7",
            color: "#ffffff",
            padding: "8px 18px",
            borderRadius: 14,
            fontSize: 22,
            fontWeight: 900
          }}
        >
          GÁNH ~18 ĐIỂM
        </div>
      </div>

      {/* 3 Vin Stocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {vinStocks.map((stock, i) => {
          const delay = i * 4;
          const s = spring({ frame: frame - 242 - delay, fps, config: { damping: 15 } });

          return (
            <div
              key={stock.code}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1.5px solid rgba(168, 85, 247, 0.35)",
                borderRadius: 24,
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `translateX(${(1 - s) * 40}px)`,
                opacity: s
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    backgroundColor: "rgba(168, 85, 247, 0.25)",
                    color: "#e9d5ff",
                    fontSize: 28,
                    fontWeight: 900,
                    fontFamily: "'Montserrat', sans-serif",
                    padding: "8px 16px",
                    borderRadius: 12,
                    border: "1px solid #c084fc"
                  }}
                >
                  {stock.code}
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 800 }}>{stock.price}</div>
                  <div style={{ color: "#94a3b8", fontSize: 18 }}>Vol: {stock.vol}</div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: "#c084fc",
                    fontSize: 28,
                    fontWeight: 900,
                    textShadow: "0 0 15px rgba(192, 132, 252, 0.6)"
                  }}
                >
                  {stock.change} (TÍM)
                </div>
                <div style={{ color: "#a855f7", fontSize: 18, fontWeight: 700 }}>{stock.contrib}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contrast Box */}
      <div
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          border: "1.5px dashed rgba(239, 68, 68, 0.4)",
          borderRadius: 24,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16
        }}
      >
        <span style={{ fontSize: 32 }}>🔍</span>
        <div style={{ color: "#cbd5e1", fontSize: 20, lineHeight: 1.4 }}>
          <strong style={{ color: "#f87171" }}>Thực trạng tài khoản cá nhân:</strong> Chiếm tới gần 38% tổng đà tăng của
          toàn thị trường. Đa số Midcap vẫn đi ngang, tài khoản chưa hề về bờ!
        </div>
      </div>
    </div>
  );
};

// --- SCENE 3: RISK MATRIX (568 - 899 frames) ---
export const Scene3RiskMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const risks = [
    {
      badge: "BÁO ĐỘNG ĐỎ",
      title: "10 PHIÊN PHÂN PHỐI",
      desc: "Xuất hiện dày đặc trong 25 phiên gần nhất — Dấu vết dòng tiền lớn thoát hàng dần.",
      badgeColor: "#ef4444",
      bg: "rgba(239, 68, 68, 0.12)"
    },
    {
      badge: "CẢN KỸ THUẬT",
      title: "CẢN CỨNG SMA200 (1,780Đ)",
      desc: "Vùng kháng cự trung hạn đè ngay trên đầu với khối lượng kẹp hàng khổng lồ.",
      badgeColor: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)"
    },
    {
      badge: "VĨ MÔ SIẾT",
      title: "NHNN HÚT OMO 3.95%",
      desc: "Phát hành tín phiếu OMO kỳ hạn 14-28 ngày nhằm kìm hãm áp lực tỷ giá USD/VND.",
      badgeColor: "#38bdf8",
      bg: "rgba(56, 189, 248, 0.12)"
    }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 60,
        right: 60,
        bottom: 260,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        justifyContent: "center",
        zIndex: 10
      }}
    >
      {risks.map((risk, idx) => {
        const delay = idx * 5;
        const s = spring({ frame: frame - 568 - delay, fps, config: { damping: 14 } });

        return (
          <div
            key={idx}
            style={{
              backgroundColor: risk.bg,
              border: `1.5px solid ${risk.badgeColor}40`,
              borderRadius: 26,
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transform: `translateY(${(1 - s) * 30}px)`,
              opacity: s
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  color: risk.badgeColor,
                  fontSize: 18,
                  fontWeight: 900,
                  backgroundColor: `${risk.badgeColor}25`,
                  padding: "4px 14px",
                  borderRadius: 8,
                  letterSpacing: "0.06em"
                }}
              >
                {risk.badge}
              </span>
              <span style={{ color: "#64748b", fontSize: 20, fontWeight: 700 }}>ÁP LỰC 0{idx + 1}</span>
            </div>

            <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 900, letterSpacing: "-0.01em" }}>
              {risk.title}
            </div>

            <div style={{ color: "#cbd5e1", fontSize: 21, lineHeight: 1.45 }}>{risk.desc}</div>
          </div>
        );
      })}
    </div>
  );
};

// --- SCENE 4: 2 SCENARIOS (899 - 1319 frames) ---
export const Scene4Scenarios: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sLeft = spring({ frame: frame - 899, fps, config: { damping: 15 } });
  const sRight = spring({ frame: frame - 899 - 6, fps, config: { damping: 15 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 60,
        right: 60,
        bottom: 260,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        justifyContent: "center",
        zIndex: 10
      }}
    >
      {/* Scenario 1: Base Case (55%) */}
      <div
        style={{
          backgroundColor: "rgba(212, 175, 55, 0.1)",
          border: "2px solid #d4af37",
          borderRadius: 30,
          padding: "30px 34px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transform: `scale(${sLeft})`,
          boxShadow: "0 15px 40px rgba(212, 175, 55, 0.15)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "#d4af37",
              color: "#0b0e14",
              fontSize: 22,
              fontWeight: 900,
              padding: "6px 18px",
              borderRadius: 12
            }}
          >
            KỊCH BẢN 1 (55% XÁC SUẤT)
          </div>
          <span style={{ color: "#d4af37", fontSize: 28, fontWeight: 900 }}>CƠ SỞ TÍCH LŨY</span>
        </div>

        <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 900 }}>TÍCH LŨY TRONG BIÊN 1,721 – 1,782Đ</div>

        <div style={{ color: "#e2e8f0", fontSize: 22, lineHeight: 1.45 }}>
          VN-Index dao động giằng co trong biên độ để hấp thụ lượng cung lơ lửng, tạo nền giá trước khi có dòng tiền
          lớn dẫn dắt vào sóng mới.
        </div>
      </div>

      {/* Scenario 2: Bear Trap (20%) */}
      <div
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          border: "2px solid #ef4444",
          borderRadius: 30,
          padding: "30px 34px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transform: `scale(${sRight})`,
          boxShadow: "0 15px 40px rgba(239, 68, 68, 0.15)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 900,
              padding: "6px 18px",
              borderRadius: 12
            }}
          >
            KỊCH BẢN 2 (20% RỦI RO)
          </div>
          <span style={{ color: "#f87171", fontSize: 28, fontWeight: 900 }}>BẪY BULL TRAP</span>
        </div>

        <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 900 }}>THỦNG 1,720Đ LAO VỀ 1,651 ĐIỂM</div>

        <div style={{ color: "#e2e8f0", fontSize: 22, lineHeight: 1.45 }}>
          Kéo trụ Vin để xả danh mục Midcap; khi nhóm Vin hạ nhiệt lượng hàng 900 triệu cp về tài khoản gây áp lực bán
          tháo xuyên thủng hỗ trợ 1,720đ.
        </div>
      </div>
    </div>
  );
};

// --- SCENE 5: ACTION PLAN (1319 - 1671 frames) ---
export const Scene5ActionPlan: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame: frame - 1319, fps, config: { damping: 15 } });
  const s2 = spring({ frame: frame - 1319 - 6, fps, config: { damping: 15 } });

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 60,
        right: 60,
        bottom: 260,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        justifyContent: "center",
        zIndex: 10
      }}
    >
      {/* Action 1: Trapped Position */}
      <div
        style={{
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          border: "2px solid #f59e0b",
          borderRadius: 30,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transform: `translateY(${(1 - s1) * 30}px)`,
          opacity: s1
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.25)",
              color: "#fbbf24",
              fontSize: 22,
              fontWeight: 900,
              padding: "6px 16px",
              borderRadius: 10
            }}
          >
            NGƯỜI ĐANG KẸP HÀNG
          </div>
          <span style={{ color: "#f59e0b", fontSize: 24, fontWeight: 800 }}>HẠ ĐÒN BẨY</span>
        </div>

        <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 900 }}>CANH RƯỚN 1,760 – 1,770 ĐIỂM</div>

        <div style={{ color: "#e2e8f0", fontSize: 22, lineHeight: 1.45 }}>
          Tận dụng nhịp hưng phấn đầu phiên kéo điểm để tỉa bớt mã yếu, hạ ngay đòn bẩy Margin về mức an toàn. Tuyệt đối
          không ôm full cổ phiếu!
        </div>
      </div>

      {/* Action 2: Cash Position */}
      <div
        style={{
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          border: "2px solid #10b981",
          borderRadius: 30,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          transform: `translateY(${(1 - s2) * 30}px)`,
          opacity: s2
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.25)",
              color: "#34d399",
              fontSize: 22,
              fontWeight: 900,
              padding: "6px 16px",
              borderRadius: 10
            }}
          >
            NGƯỜI ĐANG CẦM TIỀN MẶT
          </div>
          <span style={{ color: "#10b981", fontSize: 24, fontWeight: 800 }}>KIÊN NHẪN CHỜ</span>
        </div>

        <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 900 }}>CHỜ RETEST VÙNG 1,720 ĐIỂM</div>

        <div style={{ color: "#e2e8f0", fontSize: 22, lineHeight: 1.45 }}>
          Tuyệt đối KHÔNG FOMO mua đuổi giá xanh. Chỉ mở vị thế giải ngân thăm dò khi thị trường test lại mốc 1,720đ với
          thanh khoản cạn kiệt!
        </div>
      </div>
    </div>
  );
};

// --- SCENE 6: BRANDED OUTRO (1671 - 1874 frames) ---
export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame: frame - 1671, fps, config: { damping: 14 } });

  const creatorName = userBrand.creatorName || "Tiến Dương";
  const brandName = userBrand.brandName || "TÀI CHÍNH THỰC CHIẾN";
  const tagline = userBrand.tagline || "HOẠCH ĐỊNH TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG";
  const cta = userBrand.cta || "Bình luận mã cổ phiếu bạn đang kẹp bên dưới 👇";
  const disclaimer = userBrand.disclaimer || "Số liệu mang tính chất tham khảo · Không phải khuyến nghị đầu tư";

  return (
    <div
      style={{
        position: "absolute",
        top: 260,
        left: 60,
        right: 60,
        bottom: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        zIndex: 10,
        transform: `scale(${scale})`
      }}
    >
      {/* Avatar Circle */}
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d4af37 0%, #f59e0b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 50px rgba(212, 175, 55, 0.4)",
          border: "4px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <span style={{ fontSize: 72 }}>📈</span>
      </div>

      {/* Host Name & Brand */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: 54,
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-0.01em",
            fontFamily: "'Be Vietnam Pro', sans-serif"
          }}
        >
          {creatorName}
        </h2>
        <div
          style={{
            color: "#d4af37",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}
        >
          {brandName}
        </div>
        <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 600 }}>{tagline}</div>
      </div>

      {/* CTA Box */}
      <div
        style={{
          backgroundColor: "rgba(212, 175, 55, 0.15)",
          border: "2px solid #d4af37",
          borderRadius: 24,
          padding: "24px 36px",
          color: "#ffffff",
          fontSize: 26,
          fontWeight: 800,
          textAlign: "center",
          boxShadow: "0 0 35px rgba(212, 175, 55, 0.3)"
        }}
      >
        {cta}
      </div>

      {/* Disclaimer */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          color: "#64748b",
          fontSize: 20,
          textAlign: "center",
          padding: "0 30px"
        }}
      >
        {disclaimer}
      </div>
    </div>
  );
};

// --- SPEECH-SYNCED SUBTITLES (Color Highlight Only, No Scale / No Jump) ---
export const SyncedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  const chunks = (timingData as any).chunks || [];

  // Find active chunk
  const activeChunk = chunks.find((c: any) => currentMs >= c.startMs && currentMs < c.endMs);

  // Zero Speech = Zero Sub
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
          padding: "18px 32px",
          borderRadius: 22,
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
                fontSize: 36,
                lineHeight: 1.25,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: isCurrent ? 900 : 700,
                color: isCurrent ? "#facc15" : isPast ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                backgroundColor: isCurrent ? "rgba(250, 204, 21, 0.2)" : "transparent",
                padding: "2px 6px",
                borderRadius: 8,
                textShadow: isCurrent ? "0 0 20px rgba(250, 204, 21, 0.8)" : "none"
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
