import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrand from "../../../../../brand/user-brand.json";
import timingData from "./subtitles.json";
import { TradingViewChart } from "./TradingViewChart";

// --- GLOBAL BACKGROUND & AMBIENT GLOW ---
export const GlobalBackdrop: React.FC<{ theme?: "green" | "purple" | "red" | "gold" }> = ({
  theme = "green"
}) => {
  const frame = useCurrentFrame();
  const glowOpacity = interpolate(Math.sin(frame / 20), [-1, 1], [0.2, 0.4]);

  const glowColor =
    theme === "red"
      ? "rgba(242, 54, 69, 0.25)"
      : theme === "purple"
      ? "rgba(168, 85, 247, 0.25)"
      : theme === "gold"
      ? "rgba(212, 175, 55, 0.22)"
      : "rgba(8, 153, 129, 0.25)";

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#080b11", overflow: "hidden", zIndex: 0 }}>
      {/* Subtle Coordinate Grid */}
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }}>
        <defs>
          <pattern id="trading-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="1080" height="1920" fill="url(#trading-grid)" />
      </svg>

      {/* Top Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 850,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          opacity: glowOpacity,
          pointerEvents: "none",
          filter: "blur(70px)"
        }}
      />
    </div>
  );
};

// --- TRADINGVIEW HEADER BAR ---
export const HeaderBar: React.FC<{
  badge: string;
  title: string;
  badgeColor?: string;
  badgeBg?: string;
}> = ({ badge, title, badgeColor = "#00F5A0", badgeBg = "rgba(0, 245, 160, 0.12)" }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 60,
        right: 60,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            backgroundColor: badgeBg,
            border: `1.5px solid ${badgeColor}`,
            padding: "6px 18px",
            borderRadius: 999,
            color: badgeColor,
            fontSize: 20,
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
          fontSize: 44,
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

// --- SCENE 1: THE HOOK ---
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const growth = interpolate(frame, [0, 45], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        bottom: 240,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        zIndex: 10
      }}
    >
      <TradingViewChart growthProgress={growth} />

      {/* Floating Hook Callout */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(8, 153, 129, 0.15)",
            border: "1.5px solid #089981",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <span style={{ fontSize: 32 }}>🚀</span>
          <div>
            <div style={{ color: "#00F5A0", fontSize: 22, fontWeight: 900 }}>CHÂN SÓNG THẦN?</div>
            <div style={{ color: "#94a3b8", fontSize: 16 }}>Nến búa đảo chiều cực mạnh</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(242, 54, 69, 0.15)",
            border: "1.5px solid #f23645",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <span style={{ fontSize: 32 }}>⚠️</span>
          <div>
            <div style={{ color: "#f87171", fontSize: 22, fontWeight: 900 }}>BẪY BULL TRAP?</div>
            <div style={{ color: "#94a3b8", fontSize: 16 }}>Kéo trụ Vin để xả Midcap</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 2: VIN BREAKDOWN ---
export const Scene2VinBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vinStocks = [
    { code: "VHM", name: "Vinhomes", price: "61,800 đ", change: "+6.92%", vol: "13.8M", contrib: "+7.9 điểm", high: "61,800" },
    { code: "VIC", name: "Vingroup", price: "46,500 đ", change: "+6.88%", vol: "8.5M", contrib: "+6.8 điểm", high: "46,500" },
    { code: "VRE", name: "Vincom Retail", price: "19,500 đ", change: "+6.85%", vol: "7.2M", contrib: "+3.1 điểm", high: "19,500" }
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        bottom: 240,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        zIndex: 10
      }}
    >
      {/* Background Chart Dimmed */}
      <div style={{ opacity: 0.35, transform: "scale(0.96)", filter: "blur(2px)" }}>
        <TradingViewChart />
      </div>

      {/* Floating 3 Vin Mini-Candle HUD Cards */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            border: "2px solid #a855f7",
            borderRadius: 24,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 40px rgba(168, 85, 247, 0.3)"
          }}
        >
          <div>
            <div style={{ color: "#c084fc", fontSize: 18, fontWeight: 800 }}>BÓC TÁCH ORDER FLOW</div>
            <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 900 }}>BỘ 3 HỌ VIN TÍM LỊM ĐỒNG LOẠT</div>
          </div>
          <div
            style={{
              backgroundColor: "#a855f7",
              color: "#ffffff",
              padding: "8px 18px",
              borderRadius: 12,
              fontSize: 22,
              fontWeight: 900
            }}
          >
            GÁNH 17.8 ĐIỂM
          </div>
        </div>

        {vinStocks.map((stock, i) => {
          const delay = i * 4;
          const s = spring({ frame: frame - 242 - delay, fps, config: { damping: 14 } });

          return (
            <div
              key={stock.code}
              style={{
                backgroundColor: "rgba(13, 17, 23, 0.95)",
                border: "1.5px solid #a855f7",
                borderRadius: 22,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `translateX(${(1 - s) * 40}px)`,
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    backgroundColor: "rgba(168, 85, 247, 0.3)",
                    border: "1.5px solid #c084fc",
                    borderRadius: 12,
                    padding: "8px 16px",
                    color: "#e9d5ff",
                    fontSize: 28,
                    fontWeight: 900,
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                >
                  {stock.code}
                </div>
                <div>
                  <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 800 }}>{stock.price} (Trần)</div>
                  <div style={{ color: "#94a3b8", fontSize: 18 }}>Khớp: {stock.vol} cp</div>
                </div>
              </div>

              {/* Mini Candle Icon */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#c084fc", fontSize: 28, fontWeight: 900 }}>{stock.change}</div>
                  <div style={{ color: "#a855f7", fontSize: 18, fontWeight: 700 }}>{stock.contrib}</div>
                </div>
                <div
                  style={{
                    width: 14,
                    height: 54,
                    backgroundColor: "#c084fc",
                    borderRadius: 3,
                    boxShadow: "0 0 15px #c084fc"
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Warning Callout */}
        <div
          style={{
            backgroundColor: "rgba(242, 54, 69, 0.15)",
            border: "1.5px dashed rgba(242, 54, 69, 0.5)",
            borderRadius: 20,
            padding: "16px 20px",
            color: "#f87171",
            fontSize: 20,
            lineHeight: 1.4,
            fontWeight: 700
          }}
        >
          ⚠️ <strong>Sự thật:</strong> 3 mã Vin chiếm gần 38% đà tăng chỉ số. Phần lớn Midcap cá nhân vẫn đi ngang,
          chưa về bờ!
        </div>
      </div>
    </div>
  );
};

// --- SCENE 3: RISK MATRIX ---
export const Scene3RiskMatrix: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        bottom: 240,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        zIndex: 10
      }}
    >
      {/* Chart with Highlighted Resistance Zone */}
      <TradingViewChart showResistance={true} showSupport={false} />

      {/* 2 Risk Callout Badges */}
      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            backgroundColor: "rgba(242, 54, 69, 0.15)",
            border: "2px solid #f23645",
            borderRadius: 20,
            padding: "18px 22px"
          }}
        >
          <div style={{ color: "#f87171", fontSize: 22, fontWeight: 900 }}>10 PHIÊN PHÂN PHỐI</div>
          <div style={{ color: "#cbd5e1", fontSize: 17, marginTop: 4 }}>
            Xuất hiện dày đặc trong 25 phiên — Dấu chân xả hàng âm thầm.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "2px solid #38bdf8",
            borderRadius: 20,
            padding: "18px 22px"
          }}
        >
          <div style={{ color: "#38bdf8", fontSize: 22, fontWeight: 900 }}>NHNN HÚT OMO 3.95%</div>
          <div style={{ color: "#cbd5e1", fontSize: 17, marginTop: 4 }}>
            Phát hành tín phiếu OMO kìm tỷ giá USD/VND chưa dừng lại.
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 4: 2 SCENARIOS ---
export const Scene4Scenarios: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        bottom: 240,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        zIndex: 10
      }}
    >
      {/* Chart with 2 Trajectory Paths Drawn */}
      <TradingViewChart showResistance={true} showSupport={true} showForecastPaths={true} />

      {/* 2 Scenario Explanations */}
      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            border: "2px solid #d4af37",
            borderRadius: 20,
            padding: "16px 20px"
          }}
        >
          <div style={{ color: "#d4af37", fontSize: 22, fontWeight: 900 }}>55% TÍCH LŨY (1,721 - 1,782Đ)</div>
          <div style={{ color: "#e2e8f0", fontSize: 16, marginTop: 4 }}>
            Hấp thụ lượng hàng lơ lửng, tạo nền trước khi vào sóng mới.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "2px solid #ef4444",
            borderRadius: 20,
            padding: "16px 20px"
          }}
        >
          <div style={{ color: "#f87171", fontSize: 22, fontWeight: 900 }}>20% BẪY GÃY VỀ 1,651Đ</div>
          <div style={{ color: "#e2e8f0", fontSize: 16, marginTop: 4 }}>
            Kéo trụ xả danh mục, gãy thủng 1,720đ kích hoạt đợt bán tháo.
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 5: ACTION PLAN ---
export const Scene5ActionPlan: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 60,
        right: 60,
        bottom: 240,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        zIndex: 10
      }}
    >
      {/* Chart with Action Zones */}
      <TradingViewChart actionZoneMode={true} showResistance={false} showSupport={false} />

      {/* Strategy Summary Pills */}
      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            border: "2px solid #f59e0b",
            borderRadius: 20,
            padding: "16px 20px"
          }}
        >
          <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: 900 }}>KẸP HÀNG ➔ 1,760 - 1,770Đ</div>
          <div style={{ color: "#e2e8f0", fontSize: 16, marginTop: 4 }}>
            Canh nhịp rướn hưng phấn để hạ ngay Margin, tỉa bớt mã yếu.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(8, 153, 129, 0.15)",
            border: "2px solid #089981",
            borderRadius: 20,
            padding: "16px 20px"
          }}
        >
          <div style={{ color: "#00F5A0", fontSize: 22, fontWeight: 900 }}>CẦM TIỀN ➔ VÙNG 1,720Đ</div>
          <div style={{ color: "#e2e8f0", fontSize: 16, marginTop: 4 }}>
            Tuyệt đối KHÔNG FOMO đua xanh. Chờ retest cạn von mới gom!
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 6: BRANDED OUTRO ---
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
      {/* TradingView Candlestick Logo Box */}
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: 36,
          background: "linear-gradient(135deg, rgba(8, 153, 129, 0.3) 0%, rgba(13, 17, 23, 0.9) 100%)",
          border: "2px solid #00F5A0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 50px rgba(0, 245, 160, 0.3)"
        }}
      >
        <span style={{ fontSize: 80 }}>🕯️</span>
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
            color: "#00F5A0",
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
          backgroundColor: "rgba(0, 245, 160, 0.12)",
          border: "2px solid #00F5A0",
          borderRadius: 24,
          padding: "24px 36px",
          color: "#ffffff",
          fontSize: 26,
          fontWeight: 800,
          textAlign: "center",
          boxShadow: "0 0 35px rgba(0, 245, 160, 0.25)"
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

// --- SPEECH-SYNCED SUBTITLES ---
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
        bottom: 160,
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
          backgroundColor: "rgba(13, 17, 23, 0.94)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          padding: "18px 32px",
          borderRadius: 22,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 14px",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.75)",
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
                color: isCurrent ? "#00F5A0" : isPast ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                backgroundColor: isCurrent ? "rgba(0, 245, 160, 0.2)" : "transparent",
                padding: "2px 6px",
                borderRadius: 8,
                textShadow: isCurrent ? "0 0 20px rgba(0, 245, 160, 0.8)" : "none"
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
