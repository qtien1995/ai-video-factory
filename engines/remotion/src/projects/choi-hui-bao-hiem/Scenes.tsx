import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import subtitlesData from "./subtitles.json";

// ============================================================================
// SVG ICONS & VISUAL METAPHORS (MAGNIFIED FOR MOBILE)
// ============================================================================

// 1. Calculator Icon / Illustration
export const CasioCalculator: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none">
    <rect x="5" y="5" width="90" height="120" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3.5" />
    {/* Screen */}
    <rect x="14" y="16" width="72" height="28" rx="7" fill="#0f172a" stroke="#475569" strokeWidth="2" />
    <text x="80" y="36" fill="#38bdf8" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="end">
      123,456,789
    </text>
    {/* Keypad */}
    {[
      [14, 52], [35, 52], [55, 52], [75, 52],
      [14, 70], [35, 70], [55, 70], [75, 70],
      [14, 88], [35, 88], [55, 88], [75, 88],
      [14, 106], [35, 106], [55, 106], [75, 106],
    ].map(([kx, ky], idx) => (
      <rect
        key={idx}
        x={kx}
        y={ky}
        width="14"
        height="12"
        rx="3.5"
        fill={idx % 4 === 3 ? "#f59e0b" : idx < 4 ? "#64748b" : "#334155"}
      />
    ))}
  </svg>
);

// 2. Piggy Bank SVG (Large 380px)
export const PiggyBankSvg: React.FC<{ size?: number; scale?: number }> = ({ size = 380, scale = 1 }) => (
  <div style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-out" }}>
    <svg width={size} height={size * 0.85} viewBox="0 0 200 170" fill="none">
      <defs>
        <radialGradient id="piggyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="60%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </radialGradient>
        <linearGradient id="coinSlot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#831843" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>
      </defs>
      {/* Ears */}
      <polygon points="55,45 75,15 90,45" fill="#be185d" />
      <polygon points="60,42 75,22 85,42" fill="#fbcfe8" />
      {/* Body */}
      <ellipse cx="110" cy="100" rx="75" ry="60" fill="url(#piggyGrad)" />
      {/* Coin Slot */}
      <rect x="95" y="42" width="30" height="7" rx="3.5" fill="url(#coinSlot)" />
      {/* Snout */}
      <ellipse cx="40" cy="105" rx="22" ry="18" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" />
      <ellipse cx="33" cy="105" rx="4" ry="7" fill="#9d174d" />
      <ellipse cx="47" cy="105" rx="4" ry="7" fill="#9d174d" />
      {/* Eye */}
      <circle cx="70" cy="80" r="6" fill="#0f172a" />
      <circle cx="68" cy="78" r="2.5" fill="#ffffff" />
      {/* Legs */}
      <rect x="65" y="145" width="22" height="22" rx="6" fill="#be185d" />
      <rect x="135" y="145" width="22" height="22" rx="6" fill="#be185d" />
      {/* Tail */}
      <path d="M185 95 Q195 85 190 75 Q185 65 195 60" stroke="#be185d" strokeWidth="5.5" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

// 3. Falling Gold Coin (Size 54px)
export const GoldCoin: React.FC<{ size?: number; y: number; opacity?: number }> = ({ size = 54, y, opacity = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{
      position: "absolute",
      top: y,
      left: "50%",
      marginLeft: -size / 2,
      opacity,
      filter: "drop-shadow(0 8px 18px rgba(245, 158, 11, 0.7))",
    }}
  >
    <circle cx="20" cy="20" r="18" fill="#f59e0b" stroke="#fef08a" strokeWidth="2.5" />
    <circle cx="20" cy="20" r="13" fill="#d97706" />
    <text x="20" y="26" textAnchor="middle" fill="#fef08a" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
      ₫
    </text>
  </svg>
);

// 4. Emerald Protective Shield (Size 220px)
export const ProtectiveShieldSvg: React.FC<{ size?: number; glowColor?: string; pulse?: number }> = ({
  size = 220,
  glowColor = "#10b981",
  pulse = 1,
}) => (
  <div style={{ transform: `scale(${pulse})`, filter: `drop-shadow(0 0 40px ${glowColor})` }}>
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <path
        d="M50 5 L90 20 V65 C90 95 50 115 50 115 C50 115 10 95 10 65 V20 Z"
        fill="url(#shieldGrad)"
        stroke="#6ee7b7"
        strokeWidth="3.5"
      />
      <path
        d="M32 60 L45 73 L70 45"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// 5. Family Silhouette (Size 300px)
export const FamilySilhouette: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 200 150" fill="none">
    {/* Father */}
    <circle cx="65" cy="40" r="16" fill="#60a5fa" />
    <path d="M45 65 C45 58 52 54 65 54 C78 54 85 58 85 65 V140 H45 Z" fill="#3b82f6" />
    {/* Mother */}
    <circle cx="135" cy="45" r="15" fill="#f472b6" />
    <path d="M117 70 C117 63 124 59 135 59 C146 59 153 63 153 70 V140 H117 Z" fill="#ec4899" />
    {/* Child */}
    <circle cx="100" cy="80" r="11" fill="#facc15" />
    <path d="M86 100 C86 94 92 91 100 91 C108 91 114 94 114 100 V140 H86 Z" fill="#eab308" />
  </svg>
);

// ============================================================================
// GLOBAL BACKDROP & HEADER
// ============================================================================

export const GlobalBackdrop: React.FC<{ theme?: "dark" | "hospital" | "gold" | "warm" }> = ({
  theme = "dark",
}) => {
  let bgGradient = "radial-gradient(circle at 50% 30%, #1e293b 0%, #0b0f19 80%)";
  let ambientGlow = "rgba(56, 189, 248, 0.08)";

  if (theme === "gold") {
    bgGradient = "radial-gradient(circle at 50% 35%, #291e0a 0%, #0b0f19 85%)";
    ambientGlow = "rgba(245, 158, 11, 0.15)";
  } else if (theme === "hospital") {
    bgGradient = "radial-gradient(circle at 50% 30%, #1e1b2e 0%, #0b0f19 85%)";
    ambientGlow = "rgba(239, 68, 68, 0.13)";
  } else if (theme === "warm") {
    bgGradient = "radial-gradient(circle at 50% 35%, #064e3b 0%, #0b0f19 85%)";
    ambientGlow = "rgba(16, 185, 129, 0.15)";
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: bgGradient,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          width: 900,
          height: 900,
          marginLeft: -450,
          borderRadius: "50%",
          background: ambientGlow,
          filter: "blur(140px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.75,
        }}
      />
    </div>
  );
};

export const HeaderBar: React.FC<{
  badge: string;
  title: string;
  badgeColor?: string;
  badgeBg?: string;
}> = ({ badge, title, badgeColor = "#f59e0b", badgeBg = "rgba(245, 158, 11, 0.15)" }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 85,
        left: 40,
        right: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "12px 34px",
          borderRadius: 24,
          backgroundColor: badgeBg,
          color: badgeColor,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 16,
          border: `2.5px solid ${badgeColor}85`,
          boxShadow: `0 4px 20px ${badgeColor}25`,
        }}
      >
        {badge}
      </div>
      <div
        style={{
          color: "#f8fafc",
          fontSize: 48,
          fontWeight: 900,
          letterSpacing: -0.5,
          textTransform: "uppercase",
          textShadow: "0 4px 28px rgba(0,0,0,0.85)",
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>
    </div>
  );
};


// ============================================================================
// 1. SCENE 1: THE 5 QUESTIONS (0 - 437 frames)
// ============================================================================

export const Scene1FiveQuestions: React.FC = () => {
  const frame = useCurrentFrame();

  const questions = [
    { num: "01", text: "1 năm đóng bao nhiêu?", enterFrame: 130 },
    { num: "02", text: "Mấy năm thì xong?", enterFrame: 190 },
    { num: "03", text: "Rủi ro đền mấy đồng?", enterFrame: 245 },
    { num: "04", text: "Đóng xong rút về có lời không?", enterFrame: 305 },
    { num: "05", text: "Và để lâu có giàu lên được không?", enterFrame: 375 },
  ];

  const calcSpring = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 265,
      }}
    >
      {/* Casio Calculator Widget */}
      <div
        style={{
          transform: `scale(${calcSpring}) translateY(${interpolate(calcSpring, [0, 1], [-40, 0])}px)`,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 28,
          background: "rgba(30, 41, 59, 0.88)",
          padding: "26px 40px",
          borderRadius: 28,
          border: "2.5px solid rgba(148, 163, 184, 0.4)",
          backdropFilter: "blur(18px)",
          width: 980,
          boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
        }}
      >
        <CasioCalculator size={110} />
        <div>
          <div style={{ color: "#94a3b8", fontSize: 26, fontWeight: 800, textTransform: "uppercase", marginBottom: 6 }}>
            Tư duy tính toán kiểu gom họ
          </div>
          <div style={{ color: "#38bdf8", fontSize: 44, fontWeight: 900 }}>
            5 CÂU HỎI KIỂU "CHƠI HỤI"
          </div>
        </div>
      </div>

      {/* 5 Stacked Question Cards - Giant, prominent, highly readable on mobile */}
      <div style={{ width: 980, display: "flex", flexDirection: "column", gap: 22 }}>
        {questions.map((q, idx) => {
          const cardSpring = spring({
            frame: frame - q.enterFrame,
            fps: 30,
            config: { damping: 13, stiffness: 140 },
          });

          if (frame < q.enterFrame) return null;

          return (
            <div
              key={idx}
              style={{
                transform: `translateX(${interpolate(cardSpring, [0, 1], [-60, 0])}px) scale(${cardSpring})`,
                opacity: cardSpring,
                background: "rgba(15, 23, 42, 0.94)",
                border: "2.5px solid rgba(56, 189, 248, 0.5)",
                borderLeft: "12px solid #38bdf8",
                borderRadius: 24,
                padding: "26px 34px",
                display: "flex",
                alignItems: "center",
                gap: 26,
                boxShadow: "0 14px 36px rgba(0,0,0,0.65)",
              }}
            >
              <div
                style={{
                  background: "#0284c7",
                  color: "#ffffff",
                  fontSize: 32,
                  fontWeight: 900,
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.5)",
                }}
              >
                {q.num}
              </div>
              <div
                style={{
                  color: "#f8fafc",
                  fontSize: 40,
                  fontWeight: 900,
                  lineHeight: 1.3,
                }}
              >
                {q.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 2. SCENE 2: THE MENTAL MODEL (437 - 734 frames)
// ============================================================================

export const Scene2PiggyBank: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 437;

  // Piggy bank pulse/growth
  const pigScale = interpolate(localFrame, [0, 60, 150, 240], [1.0, 1.15, 1.25, 1.35], {
    extrapolateRight: "clamp",
  });

  // Coin drops
  const coins = [
    { y: interpolate(localFrame % 35, [0, 35], [240, 560]), opacity: 1 },
    { y: interpolate((localFrame + 15) % 35, [0, 35], [210, 560]), opacity: 0.9 },
    { y: interpolate((localFrame + 28) % 35, [0, 35], [250, 560]), opacity: 0.85 },
  ];

  const cardSpring = spring({
    frame: localFrame - 45,
    fps: 30,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 265,
      }}
    >
      {/* Falling Coins */}
      {coins.map((c, i) => (
        <GoldCoin key={i} size={64} y={c.y} opacity={c.opacity} />
      ))}

      {/* Piggy Bank Central Graphic */}
      <div style={{ marginTop: 170, marginBottom: 44 }}>
        <PiggyBankSvg size={450} scale={pigScale} />
      </div>

      {/* Floating Insight Card - Bigger & Bolder */}
      {localFrame >= 40 && (
        <div
          style={{
            transform: `scale(${cardSpring})`,
            opacity: cardSpring,
            width: 980,
            background: "rgba(15, 23, 42, 0.96)",
            border: "3px solid rgba(245, 158, 11, 0.65)",
            borderRadius: 34,
            padding: "46px 52px",
            textAlign: "center",
            boxShadow: "0 22px 60px rgba(0,0,0,0.85)",
          }}
        >
          <div
            style={{
              color: "#fbbf24",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            TÂM LÝ: "CHƠI" BẢO HIỂM
          </div>
          <div
            style={{
              color: "#f8fafc",
              fontSize: 50,
              fontWeight: 900,
              lineHeight: 1.4,
            }}
          >
            Tiền bỏ vào ống heo <span style={{ color: "#38bdf8" }}>➔</span> Sau một thời gian phải{" "}
            <span
              style={{
                color: "#f59e0b",
                fontSize: 60,
                textShadow: "0 0 25px rgba(245, 158, 11, 0.7)",
              }}
            >
              "HỐT CỤC TO"
            </span>{" "}
            mang về!
          </div>

          <div
            style={{
              marginTop: 22,
              display: "inline-block",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              color: "#cbd5e1",
              fontSize: 28,
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: 18,
            }}
          >
            Kỳ vọng sinh lời như gom hụi ➔ Vỡ mộng khi đối mặt rủi ro!
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. SCENE 3: THE REALITY CHECK (734 - 1101 frames)
// ============================================================================

export const Scene3RealityCheck: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 734;

  const strikeProgress = interpolate(localFrame, [45, 75], [0, 1], { extrapolateRight: "clamp" });

  const shieldSpring = spring({
    frame: localFrame - 70,
    fps: 30,
    config: { damping: 12, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 265,
      }}
    >
      {/* Side-by-side: Bank Interest vs Shield */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: 980,
          gap: 32,
          marginBottom: 36,
        }}
      >
        {/* Left: Bank Interest Card getting crossed out */}
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "rgba(30, 41, 59, 0.88)",
            border: "2.5px solid rgba(148, 163, 184, 0.4)",
            borderRadius: 32,
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
            minHeight: 380,
          }}
        >
          <div style={{ fontSize: 68, marginBottom: 12 }}>🏛️</div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            LÃI SUẤT<br />TIẾT KIỆM
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 26,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Kỳ vọng sinh lời & nhân tài sản
          </div>

          {/* Big Red Strikethrough Cross */}
          {localFrame >= 45 && (
            <svg
              width="180"
              height="180"
              viewBox="0 0 100 100"
              style={{
                position: "absolute",
                top: 80,
                left: "50%",
                marginLeft: -90,
                opacity: strikeProgress,
                transform: `scale(${strikeProgress})`,
              }}
            >
              <line x1="15" y1="15" x2="85" y2="85" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" />
              <line x1="85" y1="15" x2="15" y2="85" stroke="#ef4444" strokeWidth="16" strokeLinecap="round" />
            </svg>
          )}

          <div
            style={{
              marginTop: 10,
              color: "#ef4444",
              fontSize: 30,
              fontWeight: 900,
              background: "rgba(239, 68, 68, 0.2)",
              padding: "10px 24px",
              borderRadius: 18,
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
            }}
          >
            ❌ KHÔNG ĐỂ LÀM GIÀU
          </div>
        </div>

        {/* Right: Protective Shield */}
        <div
          style={{
            flex: 1,
            background: "rgba(6, 78, 59, 0.55)",
            border: "3px solid #10b981",
            borderRadius: 32,
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 14px 45px rgba(16, 185, 129, 0.25)",
            transform: `scale(${shieldSpring})`,
            opacity: shieldSpring,
            minHeight: 380,
          }}
        >
          <ProtectiveShieldSvg size={190} />
          <div
            style={{
              marginTop: 18,
              color: "#34d399",
              fontSize: 34,
              fontWeight: 900,
              textAlign: "center",
            }}
          >
            🛡️ LÁ CHẮN TÀI CHÍNH
          </div>
          <div
            style={{
              marginTop: 12,
              color: "#a7f3d0",
              fontSize: 26,
              fontWeight: 800,
              background: "rgba(16, 185, 129, 0.25)",
              padding: "8px 20px",
              borderRadius: 14,
            }}
          >
            BẢO VỆ DÒNG TIỀN GIA ĐÌNH
          </div>
        </div>
      </div>

      {/* Main Core Verdict Card - Large readable text */}
      <div
        style={{
          width: 980,
          background: "rgba(15, 23, 42, 0.96)",
          border: "3px solid rgba(239, 68, 68, 0.65)",
          borderRadius: 34,
          padding: "46px 52px",
          boxShadow: "0 22px 60px rgba(0,0,0,0.85)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 28,
            fontWeight: 800,
            textTransform: "uppercase",
            marginBottom: 16,
            letterSpacing: 1.5,
          }}
        >
          ĐÍNH CHÍNH VẠCH XUẤT PHÁT
        </div>
        <div style={{ color: "#f8fafc", fontSize: 48, fontWeight: 900, lineHeight: 1.4 }}>
          Bảo hiểm nhân thọ <span style={{ color: "#ef4444" }}>chưa bao giờ</span> sinh ra để làm giàu
          hay cạnh tranh lãi suất với ngân hàng!
        </div>

        <div
          style={{
            marginTop: 22,
            display: "inline-block",
            background: "rgba(56, 189, 248, 0.15)",
            border: "1.5px solid rgba(56, 189, 248, 0.35)",
            color: "#38bdf8",
            fontSize: 28,
            fontWeight: 800,
            padding: "12px 28px",
            borderRadius: 18,
          }}
        >
          MỤC ĐÍCH DUY NHẤT: BẢO VỆ TÀI SẢN TRƯỚC BIẾN CỐ BẤT NGỜ
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SCENE 4: THE MECHANISM (1101 - 1525 frames)
// ============================================================================

export const Scene4TwoProgressBars: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1101;

  // Top progress bar (slow 10 years crawl)
  const slowProgress = interpolate(localFrame, [0, 220], [8, 100], {
    extrapolateRight: "clamp",
  });
  const yearCounter = Math.min(10, Math.floor(interpolate(localFrame, [0, 220], [1, 10])));

  // Bottom progress bar (instant burst to 100% after 20tr lock at frame 60)
  const fastProgress = interpolate(localFrame, [60, 110], [0, 100], {
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
        paddingTop: 265,
        gap: 36,
      }}
    >
      {/* Card 1: Hụi / Tiết kiệm (10 năm gom góp = 1 Tỷ) */}
      <div
        style={{
          width: 980,
          background: "rgba(30, 41, 59, 0.88)",
          border: "2.5px solid rgba(148, 163, 184, 0.4)",
          borderRadius: 34,
          padding: "42px 48px",
          backdropFilter: "blur(18px)",
          boxShadow: "0 14px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ color: "#f59e0b", fontSize: 38, fontWeight: 900 }}>
            HỤI & TIẾT KIỆM: TÍCH LŨY CHẬM
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 30, fontWeight: 800 }}>
            Năm thứ {yearCounter} / 10 năm
          </div>
        </div>

        {/* Progress Bar Track */}
        <div
          style={{
            width: "100%",
            height: 50,
            background: "rgba(15, 23, 42, 0.95)",
            borderRadius: 25,
            overflow: "hidden",
            position: "relative",
            border: "2px solid rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              width: `${slowProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
              borderRadius: 25,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
          <span style={{ color: "#cbd5e1", fontSize: 28, fontWeight: 700 }}>Tích lũy từng tháng (100tr/năm)</span>
          <span style={{ color: "#fbbf24", fontSize: 40, fontWeight: 900 }}>Mục tiêu: 1 TỶ ĐỒNG</span>
        </div>
      </div>

      {/* VS Badge */}
      <div
        style={{
          background: "#0f172a",
          color: "#94a3b8",
          fontSize: 28,
          fontWeight: 900,
          padding: "12px 36px",
          borderRadius: 24,
          border: "2.5px solid rgba(255,255,255,0.25)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        ⚡ CƠ CHẾ ĐỐI NGHỊCH HOÀN TOÀN
      </div>

      {/* Card 2: Bảo hiểm (20 Triệu = Khóa ngay 2 TỶ) */}
      <div
        style={{
          width: 980,
          background: "rgba(15, 23, 42, 0.97)",
          border: "3.5px solid #10b981",
          borderRadius: 34,
          padding: "44px 48px",
          boxShadow: "0 20px 60px rgba(16, 185, 129, 0.4)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ color: "#34d399", fontSize: 38, fontWeight: 900 }}>
            BẢO HIỂM: KHÓA NGAY TÀI SẢN
          </div>
          <div
            style={{
              background: "#10b981",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 900,
              padding: "10px 24px",
              borderRadius: 16,
            }}
          >
            NGAY TỪ NGÀY ĐẦU
          </div>
        </div>

        {/* Progress Bar Track */}
        <div
          style={{
            width: "100%",
            height: 60,
            background: "rgba(2, 44, 34, 0.95)",
            borderRadius: 30,
            overflow: "hidden",
            position: "relative",
            border: "2.5px solid #10b981",
          }}
        >
          <div
            style={{
              width: `${fastProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #10b981, #6ee7b7)",
              borderRadius: 30,
              boxShadow: "0 0 35px #10b981",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
          <div style={{ color: "#f8fafc", fontSize: 32, fontWeight: 800 }}>
            Chỉ cần bỏ ra: <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 40 }}>20 TRIỆU</span>
          </div>
          <div
            style={{
              color: "#10b981",
              fontSize: 54,
              fontWeight: 900,
              textShadow: "0 0 28px rgba(16, 185, 129, 0.8)",
            }}
          >
            KHÓA NGAY 2 TỶ ĐỒNG
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            display: "inline-block",
            background: "rgba(16, 185, 129, 0.18)",
            border: "1.5px solid rgba(16, 185, 129, 0.4)",
            color: "#6ee7b7",
            fontSize: 28,
            fontWeight: 800,
            padding: "10px 24px",
            borderRadius: 16,
          }}
        >
          Đòn bẩy tài chính gấp 100 lần ngay sau chữ ký đầu tiên
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCENE 5: THE CRUCIAL TEST (1525 - 1922 frames)
// 3 Prominent Stacked Cards (Optimized for Mobile Portrait Screen)
// ============================================================================

export const Scene5ThreeColumnsYear2: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1525;

  const card1Spring = spring({ frame: localFrame - 10, fps: 30, config: { damping: 14, stiffness: 120 } });
  const card2Spring = spring({ frame: localFrame - 35, fps: 30, config: { damping: 14, stiffness: 120 } });
  const card3Spring = spring({ frame: localFrame - 60, fps: 30, config: { damping: 14, stiffness: 120 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 265,
      }}
    >
      {/* 3 Full-Width Stacked Cards - Giant, readable, completely unmissable */}
      <div style={{ width: 980, display: "flex", flexDirection: "column", gap: 26 }}>
        {/* Card 1: Sổ tiết kiệm */}
        {localFrame >= 10 && (
          <div
            style={{
              transform: `translateX(${interpolate(card1Spring, [0, 1], [-50, 0])}px) scale(${card1Spring})`,
              opacity: card1Spring,
              background: "rgba(30, 41, 59, 0.9)",
              border: "2.5px solid rgba(148, 163, 184, 0.4)",
              borderRadius: 30,
              padding: "36px 42px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ fontSize: 64 }}>🏦</div>
              <div>
                <div style={{ color: "#cbd5e1", fontSize: 34, fontWeight: 900 }}>
                  SỔ TIẾT KIỆM (Đóng 2 năm)
                </div>
                <div style={{ color: "#94a3b8", fontSize: 28, fontWeight: 700, marginTop: 6 }}>
                  Chỉ nhận lại đúng tiền gốc đã gửi
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#fbbf24",
                fontSize: 44,
                fontWeight: 900,
                background: "rgba(15, 23, 42, 0.95)",
                padding: "16px 30px",
                borderRadius: 20,
                border: "2px solid rgba(251, 191, 36, 0.4)",
                boxShadow: "0 4px 18px rgba(0,0,0,0.5)",
              }}
            >
              40 TRIỆU
            </div>
          </div>
        )}

        {/* Card 2: Chơi hụi */}
        {localFrame >= 35 && (
          <div
            style={{
              transform: `translateX(${interpolate(card2Spring, [0, 1], [-50, 0])}px) scale(${card2Spring})`,
              opacity: card2Spring,
              background: "rgba(30, 41, 59, 0.9)",
              border: "2.5px solid rgba(239, 68, 68, 0.55)",
              borderRadius: 30,
              padding: "36px 42px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ fontSize: 64 }}>📋</div>
              <div>
                <div style={{ color: "#cbd5e1", fontSize: 34, fontWeight: 900 }}>
                  CHƠI HỤI / BÁT HỌ
                </div>
                <div style={{ color: "#fca5a5", fontSize: 28, fontWeight: 700, marginTop: 6 }}>
                  Không được tha ➔ Vẫn chịu trách nhiệm trả nợ!
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#ef4444",
                fontSize: 40,
                fontWeight: 900,
                background: "rgba(239, 68, 68, 0.2)",
                padding: "16px 30px",
                borderRadius: 20,
                border: "2.5px dashed #ef4444",
                boxShadow: "0 4px 18px rgba(239, 68, 68, 0.25)",
              }}
            >
              GÁNH NỢ TIẾP
            </div>
          </div>
        )}

        {/* Card 3: Bảo hiểm Nhân Thọ (HERO HIGHLIGHT) */}
        {localFrame >= 60 && (
          <div
            style={{
              transform: `scale(${card3Spring})`,
              opacity: card3Spring,
              background: "rgba(6, 78, 59, 0.96)",
              border: "3.5px solid #10b981",
              borderRadius: 34,
              padding: "42px 46px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 22px 60px rgba(16, 185, 129, 0.45)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
                <div style={{ fontSize: 72 }}>🛡️</div>
                <div>
                  <div style={{ color: "#6ee7b7", fontSize: 38, fontWeight: 900 }}>
                    BẢO HIỂM NHÂN THỌ
                  </div>
                  <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 800, marginTop: 8 }}>
                    Mới đóng 40 triệu ➔ <span style={{ color: "#34d399" }}>Chi trả trọn vẹn lập tức!</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: 54,
                  fontWeight: 900,
                  background: "#10b981",
                  padding: "20px 34px",
                  borderRadius: 22,
                  boxShadow: "0 0 35px #10b981",
                  textAlign: "center",
                }}
              >
                2 TỶ ĐỒNG
              </div>
            </div>

            <div
              style={{
                marginTop: 22,
                display: "inline-block",
                alignSelf: "flex-start",
                background: "rgba(16, 185, 129, 0.25)",
                border: "1.5px solid rgba(16, 185, 129, 0.45)",
                color: "#a7f3d0",
                fontSize: 26,
                fontWeight: 800,
                padding: "10px 24px",
                borderRadius: 16,
              }}
            >
              GẤP 50 LẦN SỐ TIỀN BỎ RA — BẢO VỆ GIA ĐÌNH VƯỢT BIẾN CỐ
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCENE 6: THE FINAL QUESTION (1922 - 2469 frames)
// ============================================================================

export const Scene6EmotionalClosure: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1922;

  const cardSpring = spring({
    frame: localFrame - 30,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 265,
      }}
    >
      {/* Family Silhouette Under Shelter */}
      <div style={{ marginBottom: 36 }}>
        <FamilySilhouette size={380} />
      </div>

      {/* Hero Impact Quote Card */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          width: 980,
          background: "rgba(15, 23, 42, 0.97)",
          border: "3.5px solid rgba(245, 158, 11, 0.7)",
          borderRadius: 36,
          padding: "54px 58px",
          textAlign: "center",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.95)",
        }}
      >
        <div
          style={{
            color: "#f59e0b",
            fontSize: 30,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 26,
          }}
        >
          CÂU HỎI CỦA NGƯỜI HIỂU VỀ TIỀN
        </div>

        <div
          style={{
            color: "#f8fafc",
            fontSize: 52,
            fontWeight: 900,
            lineHeight: 1.45,
            marginBottom: 34,
          }}
        >
          “Nếu chiều nay tôi <span style={{ color: "#ef4444" }}>không thể về nhà</span>...<br />
          Ai sẽ mang{" "}
          <span
            style={{
              color: "#10b981",
              fontSize: 76,
              textShadow: "0 0 35px rgba(16, 185, 129, 0.85)",
            }}
          >
            2 TỶ
          </span>{" "}
          về nuôi con tôi?”
        </div>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(16, 185, 129, 0.25)",
            color: "#6ee7b7",
            fontSize: 32,
            fontWeight: 900,
            padding: "18px 44px",
            borderRadius: 26,
            border: "2px solid rgba(16, 185, 129, 0.55)",
            boxShadow: "0 4px 20px rgba(16, 185, 129, 0.25)",
          }}
        >
          BẢO VỆ GIA TÀI NGAY TỪ NGÀY ĐẦU TIÊN
        </div>

        <div
          style={{
            marginTop: 24,
            color: "#cbd5e1",
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          Không phải tích lũy để làm giàu — mà là điểm tựa an toàn cho người ta thương yêu
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. SYNCED CAPTIONS (WORD-BY-WORD HIGHLIGHT COMPONENT)
// ============================================================================

export const SyncedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  // Find active cue from subtitlesData
  const activeCue = (subtitlesData as any[]).find(
    (c) => currentMs >= c.startMs - 40 && currentMs <= c.endMs + 60
  );

  if (!activeCue) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 125,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        padding: "0 36px",
      }}
    >
      <div
        style={{
          background: "rgba(11, 15, 25, 0.95)",
          backdropFilter: "blur(22px)",
          border: "2.5px solid rgba(255, 255, 255, 0.22)",
          borderRadius: 30,
          padding: "24px 44px",
          maxWidth: 1020,
          textAlign: "center",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 50,
            fontWeight: 900,
            lineHeight: 1.38,
            display: "inline",
          }}
        >
          {activeCue.words.map((w: any, idx: number) => {
            const isHighlighted =
              currentMs >= w.startMs - 30 && currentMs <= w.startMs + w.durationMs + 30;
            return (
              <span
                key={idx}
                style={{
                  color: isHighlighted ? "#fbbf24" : "#f1f5f9",
                  marginRight: 12,
                  display: "inline-block",
                  transition: "color 0.05s ease",
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
