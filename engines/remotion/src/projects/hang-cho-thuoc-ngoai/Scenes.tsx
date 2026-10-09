import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import subtitlesData from "./subtitles.json";

// ============================================================================
// SVG ICONS & METAPHOR GRAPHICS
// ============================================================================

// Minimalist Human Silhouette in Queue
const QueueAvatar: React.FC<{ color?: string; size?: number; opacity?: number }> = ({
  color = "#f8fafc",
  size = 40,
  opacity = 1,
}) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 40 64" fill="none" style={{ opacity }}>
    {/* Head */}
    <circle cx="20" cy="14" r="10" fill={color} />
    {/* Body */}
    <path
      d="M6 34C6 27.3726 11.3726 22 18 22H22C28.6274 22 34 27.3726 34 34V60C34 62.2091 32.2091 64 30 64H10C7.79086 64 6 62.2091 6 60V34Z"
      fill={color}
    />
  </svg>
);

// Parent holding Child silhouette
const ParentAndChild: React.FC<{ color?: string; size?: number }> = ({ color = "#38bdf8", size = 80 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 80 120" fill="none">
    {/* Parent Head */}
    <circle cx="34" cy="20" r="14" fill={color} />
    {/* Parent Body */}
    <path
      d="M14 48C14 40.268 20.268 34 28 34H40C47.732 34 54 40.268 54 48V114C54 117.314 51.3137 120 48 120H20C16.6863 120 14 117.314 14 114V48Z"
      fill={color}
    />
    {/* Child Head */}
    <circle cx="56" cy="50" r="10" fill="#facc15" />
    {/* Child Body carried */}
    <path
      d="M44 68C44 63.5817 47.5817 60 52 60H60C64.4183 60 68 63.5817 68 68V95C68 97.7614 65.7614 100 63 100H49C46.2386 100 44 97.7614 44 95V68Z"
      fill="#facc15"
    />
  </svg>
);

// Continuous Timeline Ribbon SVG Component
const TimelineRibbonBackground: React.FC<{
  color1?: string;
  color2?: string;
  speedMultiplier?: number;
  cracked?: boolean;
  crackProgress?: number;
  hasBridge?: boolean;
}> = ({
  color1 = "#f59e0b",
  color2 = "#d97706",
  speedMultiplier = 1,
  cracked = false,
  crackProgress = 0,
  hasBridge = false,
}) => {
  const frame = useCurrentFrame();
  const offset = (frame * 4 * speedMultiplier) % 200;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none">
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.4" />
            <stop offset="50%" stopColor={color2} stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {!cracked && (
          <>
            {/* Smooth continuous road/ribbon */}
            <path
              d="M 540 -100 Q 560 600 540 1000 T 540 2100"
              stroke="url(#ribbonGrad)"
              strokeWidth="240"
              fill="none"
              strokeLinecap="round"
            />
            {/* Center animated dash line */}
            <path
              d="M 540 -100 Q 560 600 540 1000 T 540 2100"
              stroke="#ffffff"
              strokeWidth="6"
              strokeDasharray="25 35"
              strokeDashoffset={-offset}
              strokeOpacity="0.4"
              fill="none"
            />
          </>
        )}

        {/* When cracked: Splits into two jagged cliffs */}
        {cracked && (
          <>
            {/* Left Cliff */}
            <path
              d={`M 140 300 L ${520 - crackProgress * 140} 300 L ${480 - crackProgress * 150} 800 L ${520 - crackProgress * 160} 1250 L 140 1250 Z`}
              fill="rgba(15, 23, 42, 0.9)"
              stroke="#ef4444"
              strokeWidth="3"
            />
            {/* Right Cliff */}
            <path
              d={`M ${560 + crackProgress * 140} 300 L 940 300 L 940 1250 L ${600 + crackProgress * 160} 1250 L ${560 + crackProgress * 150} 800 Z`}
              fill="rgba(15, 23, 42, 0.9)"
              stroke="#ef4444"
              strokeWidth="3"
            />
            {/* Red Jagged Abyss Glow */}
            <path
              d={`M ${520 - crackProgress * 140} 300 L ${480 - crackProgress * 150} 800 L ${520 - crackProgress * 160} 1250 L ${600 + crackProgress * 160} 1250 L ${560 + crackProgress * 150} 800 L ${560 + crackProgress * 140} 300 Z`}
              fill="rgba(239, 68, 68, 0.15)"
            />
            {/* Crack lightning bolt center */}
            <path
              d={`M ${540} 300 L ${520} 550 L ${560} 800 L ${510} 1050 L ${540} 1250`}
              stroke="#ef4444"
              strokeWidth="4"
              filter="url(#glow)"
              strokeDasharray="12 8"
            />

            {/* The Bridge (when unlocked in Scene 6) */}
            {hasBridge && (
              <g filter="url(#glow)">
                {/* Main Arch / Deck */}
                <rect
                  x={320}
                  y={680}
                  width={440}
                  height={36}
                  rx={18}
                  fill="url(#bridgeGrad)"
                  stroke="#6ee7b7"
                  strokeWidth="3"
                />
                {/* Suspension Cables */}
                <line x1={330} y1={680} x2={540} y2={590} stroke="#34d399" strokeWidth="4" />
                <line x1={750} y1={680} x2={540} y2={590} stroke="#34d399" strokeWidth="4" />
                <circle cx={540} cy={590} r="10" fill="#10b981" />
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// 1. GLOBAL BACKDROP & AMBIENCE
// ============================================================================
export const GlobalBackdrop: React.FC<{ theme?: "dark" | "hospital" | "gold" | "warm" }> = ({ theme = "dark" }) => {
  const frame = useCurrentFrame();

  let bgGradient = "radial-gradient(circle at 50% 25%, #1e293b 0%, #0b0f19 100%)";
  let orbColor = "rgba(56, 189, 248, 0.08)";

  if (theme === "hospital") {
    bgGradient = "radial-gradient(circle at 50% 30%, #0f172a 0%, #020617 100%)";
    orbColor = "rgba(14, 165, 233, 0.06)";
  } else if (theme === "gold") {
    bgGradient = "radial-gradient(circle at 50% 25%, #291e0a 0%, #0b0f19 100%)";
    orbColor = "rgba(245, 158, 11, 0.1)";
  } else if (theme === "warm") {
    bgGradient = "radial-gradient(circle at 50% 30%, #1a2e22 0%, #0b0f19 100%)";
    orbColor = "rgba(16, 185, 129, 0.08)";
  }

  const orbShift = Math.sin(frame / 45) * 30;

  return (
    <div style={{ position: "absolute", inset: 0, background: bgGradient, overflow: "hidden" }}>
      {/* Subtle Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Dynamic ambient orb */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: `translate(-50%, ${orbShift}px)`,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: orbColor,
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// ============================================================================
// 2. STANDARD MOBILE HEADER
// ============================================================================
export const HeaderBar: React.FC<{
  badge: string;
  title: string;
  badgeBg?: string;
  badgeColor?: string;
}> = ({ badge, title, badgeBg = "rgba(239, 68, 68, 0.15)", badgeColor = "#ef4444" }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
        padding: "0 60px",
      }}
    >
      <div
        style={{
          backgroundColor: badgeBg,
          color: badgeColor,
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 2,
          padding: "8px 24px",
          borderRadius: 999,
          textTransform: "uppercase",
          border: `1px solid ${badgeColor}40`,
          marginBottom: 16,
        }}
      >
        {badge}
      </div>
      <div
        style={{
          color: "#f8fafc",
          fontSize: 46,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.25,
          textTransform: "uppercase",
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        {title}
      </div>
    </div>
  );
};

// ============================================================================
// 3. SCENE 1: THE QUEUES (Gold, Petrol, iPhone) - Option 1 Implementation
// ============================================================================
export const Scene1Queues: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0 - 90: Gold queue
  // 90 - 180: Gas queue
  // 180 - 270: iPhone queue
  // 270 - 367: Synthesis (Only lasts a few days)
  const isGold = frame < 90;
  const isGas = frame >= 90 && frame < 180;
  const isPhone = frame >= 180 && frame < 270;
  const isSummary = frame >= 270;

  const currentLocalFrame = isGold ? frame : isGas ? frame - 90 : isPhone ? frame - 180 : frame - 270;
  const scale = spring({ frame: currentLocalFrame, fps, config: { damping: 14, stiffness: 120 } });
  const opacity = interpolate(currentLocalFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Floating queue avatars along the ribbon path
  const queuePositions = [
    { x: -160, y: 180, scale: 0.8 },
    { x: -80, y: 100, scale: 0.9 },
    { x: 0, y: 30, scale: 1.0 },
    { x: 80, y: -40, scale: 1.1 },
    { x: 160, y: -100, scale: 1.2 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Background Animated Ribbon */}
      <TimelineRibbonBackground color1="#f59e0b" color2="#b45309" speedMultiplier={2.5} />

      {/* Dynamic Queue Avatars Flowing */}
      <div style={{ position: "absolute", top: "52%", display: "flex", alignItems: "center", gap: 30 }}>
        {queuePositions.map((pos, idx) => {
          const wave = Math.sin((frame + idx * 8) / 8) * 8;
          return (
            <div
              key={idx}
              style={{
                transform: `translateY(${wave}px) scale(${pos.scale})`,
                opacity: 0.85,
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
              }}
            >
              <QueueAvatar
                color={isGold ? "#facc15" : isGas ? "#f87171" : isPhone ? "#38bdf8" : "#94a3b8"}
                size={44}
              />
            </div>
          );
        })}
      </div>

      {/* Target Landmark Cards */}
      {isGold && (
        <div style={{ transform: `scale(${scale})`, opacity, width: 900, textAlign: "center", marginTop: -260 }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(15, 23, 42, 0.9))",
              border: "2px solid rgba(245, 158, 11, 0.6)",
              borderRadius: 36,
              padding: "40px 30px",
              boxShadow: "0 20px 50px rgba(245, 158, 11, 0.25)",
            }}
          >
            <div style={{ fontSize: 72, marginBottom: 12 }}>🥇</div>
            <div style={{ color: "#fbbf24", fontSize: 52, fontWeight: 900, marginBottom: 12 }}>XẾP HÀNG MUA VÀNG</div>
            <div style={{ color: "#cbd5e1", fontSize: 30, fontWeight: 700, marginBottom: 20 }}>
              Dòng người rồng rắn từ 4 giờ sáng
            </div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(245, 158, 11, 0.25)",
                color: "#fef08a",
                fontSize: 24,
                fontWeight: 800,
                padding: "10px 28px",
                borderRadius: 16,
              }}
            >
              CƠN SỐT VÀNG TÍCH TRỮ
            </div>
          </div>
        </div>
      )}

      {isGas && (
        <div style={{ transform: `scale(${scale})`, opacity, width: 900, textAlign: "center", marginTop: -260 }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(15, 23, 42, 0.9))",
              border: "2px solid rgba(239, 68, 68, 0.6)",
              borderRadius: 36,
              padding: "40px 30px",
              boxShadow: "0 20px 50px rgba(239, 68, 68, 0.25)",
            }}
          >
            <div style={{ fontSize: 72, marginBottom: 12 }}>⛽</div>
            <div style={{ color: "#f87171", fontSize: 52, fontWeight: 900, marginBottom: 12 }}>TRANH NHAU ĐỔ XĂNG</div>
            <div style={{ color: "#cbd5e1", fontSize: 30, fontWeight: 700, marginBottom: 20 }}>
              Chờ đợi hàng giờ, ùn tắc nhiều tuyến phố
            </div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(239, 68, 68, 0.25)",
                color: "#fecaca",
                fontSize: 24,
                fontWeight: 800,
                padding: "10px 28px",
                borderRadius: 16,
              }}
            >
              NỖI LO THIẾU NHIÊN LIỆU TẠM THỜI
            </div>
          </div>
        </div>
      )}

      {isPhone && (
        <div style={{ transform: `scale(${scale})`, opacity, width: 900, textAlign: "center", marginTop: -260 }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(15, 23, 42, 0.9))",
              border: "2px solid rgba(56, 189, 248, 0.6)",
              borderRadius: 36,
              padding: "40px 30px",
              boxShadow: "0 20px 50px rgba(56, 189, 248, 0.25)",
            }}
          >
            <div style={{ fontSize: 72, marginBottom: 12 }}>📱</div>
            <div style={{ color: "#38bdf8", fontSize: 52, fontWeight: 900, marginBottom: 12 }}>THỨC ĐÊM MUA IPHONE</div>
            <div style={{ color: "#cbd5e1", fontSize: 30, fontWeight: 700, marginBottom: 20 }}>
              Cửa hàng sáng đèn, hàng người chờ thâu đêm
            </div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(56, 189, 248, 0.25)",
                color: "#bae6fd",
                fontSize: 24,
                fontWeight: 800,
                padding: "10px 28px",
                borderRadius: 16,
              }}
            >
              THỎA MÃN TRÀO LƯU NGẮN HẠN
            </div>
          </div>
        </div>
      )}

      {isSummary && (
        <div style={{ transform: `scale(${scale})`, opacity, width: 900, textAlign: "center", marginTop: -260 }}>
          <div
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "2px dashed rgba(245, 158, 11, 0.5)",
              borderRadius: 36,
              padding: "50px 30px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div style={{ fontSize: 72, marginBottom: 12 }}>⏳</div>
            <div style={{ color: "#94a3b8", fontSize: 38, fontWeight: 800, marginBottom: 16 }}>
              NHƯNG NHỮNG CƠN SỐT ĐÓ...
            </div>
            <div style={{ color: "#facc15", fontSize: 60, fontWeight: 900, marginBottom: 20 }}>CHỈ VÀI NGÀY</div>
            <div style={{ color: "#64748b", fontSize: 26, fontWeight: 600 }}>Rồi tất cả sẽ lại đâu vào đấy</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. SCENE 2: THE ETERNAL HOSPITAL QUEUE - Option 1 Deceleration
// ============================================================================
export const Scene2Hospital: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 367;
  const { fps } = useVideoConfig();

  const scale = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 100 } });
  const pulse = Math.sin(localFrame / 15) * 4;

  // Row of frozen seated patients
  const seatedPatients = [0, 1, 2, 3, 4, 5];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Cold Hospital Ribbon with Decelerated Flow */}
      <TimelineRibbonBackground color1="#0284c7" color2="#0f172a" speedMultiplier={0.3} />

      {/* Main Focus Card */}
      <div style={{ width: 900, transform: `scale(${scale})`, textAlign: "center", zIndex: 10 }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))",
            border: "2px solid rgba(14, 165, 233, 0.5)",
            borderRadius: 36,
            padding: "50px 36px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(14, 165, 233, 0.15)",
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 16 }}>🏥</div>
          <div style={{ color: "#38bdf8", fontSize: 28, fontWeight: 800, letterSpacing: 2, marginBottom: 12 }}>
            NƠI DUY NHẤT XẾP HÀNG QUANH NĂM
          </div>
          <div
            style={{
              color: "#f87171",
              fontSize: 66,
              fontWeight: 900,
              letterSpacing: 3,
              marginBottom: 30,
              textShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
          >
            BỆNH VIỆN
          </div>

          {/* Row of seated silhouettes (waiting benches) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              backgroundColor: "rgba(2, 6, 23, 0.8)",
              padding: "24px 20px",
              borderRadius: 24,
              border: "1px solid rgba(148, 163, 184, 0.15)",
              marginBottom: 28,
            }}
          >
            {seatedPatients.map((i) => (
              <div key={i} style={{ opacity: 0.7, transform: `translateY(${pulse}px)` }}>
                <QueueAvatar color="#94a3b8" size={36} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 20,
                padding: "16px 20px",
              }}
            >
              <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>TẦN SUẤT</div>
              <div style={{ color: "#f87171", fontSize: 32, fontWeight: 900 }}>365 NGÀY</div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: 20,
                padding: "16px 20px",
              }}
            >
              <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>TÌNH TRẠNG</div>
              <div style={{ color: "#38bdf8", fontSize: 32, fontWeight: 900 }}>KHÔNG TRỐNG 1 NGÀY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCENE 3: THE DOCTOR'S DECISIVE QUESTION (POV) - Option 1 Separation
// ============================================================================
export const Scene3Doctor: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 609;
  const { fps } = useVideoConfig();

  const scale = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 110 } });
  const heartbeat = Math.sin(localFrame / 8) * 6;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Background Ribbon with focus beam */}
      <TimelineRibbonBackground color1="#0284c7" color2="#38bdf8" speedMultiplier={0.5} />

      <div style={{ width: 900, transform: `scale(${scale})`, zIndex: 10 }}>
        {/* Parent & Child Step Out of Line */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div
            style={{
              padding: "18px 30px",
              background: "rgba(15, 23, 42, 0.9)",
              borderRadius: 30,
              border: "2px solid #38bdf8",
              boxShadow: "0 10px 30px rgba(56, 189, 248, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <ParentAndChild color="#38bdf8" size={60} />
            <div>
              <div style={{ color: "#f8fafc", fontSize: 26, fontWeight: 900 }}>ĐƯA CON ĐI KHÁM BỆNH</div>
              <div style={{ color: "#34d399", fontSize: 22, fontWeight: 700 }}>Đã có thẻ BHYT theo quy định</div>
            </div>
          </div>
        </div>

        {/* Doctor's Decisive Question Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98))",
            border: "3px solid #38bdf8",
            borderRadius: 36,
            padding: "46px 36px",
            boxShadow: `0 25px 60px rgba(0, 0, 0, 0.8), 0 0 ${20 + heartbeat * 2}px rgba(56, 189, 248, 0.4)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 12 }}>👨‍⚕️</div>
          <div style={{ color: "#94a3b8", fontSize: 24, fontWeight: 800, letterSpacing: 1.5, marginBottom: 16 }}>
            BÁC SĨ ĐẶT CÂU HỎI LỰA CHỌN
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.35,
              marginBottom: 24,
            }}
          >
            “Gia đình muốn dùng <span style={{ color: "#34d399" }}>thuốc BHYT</span>,<br />
            hay kê <span style={{ color: "#f87171" }}>thuốc ngoài?</span>”
          </div>
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              fontSize: 24,
              fontWeight: 700,
              padding: "14px 24px",
              borderRadius: 20,
            }}
          >
            Khoảnh khắc khiến bất kỳ người làm cha mẹ nào cũng phải khựng lại...
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCENE 4: THE FINANCIAL CHASM / CANYON CRACK - Option 1 Climax
// ============================================================================
export const Scene4Bill: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 990;
  const { fps } = useVideoConfig();

  // Violent crack progress: from 0 to 1
  const crackProgress = interpolate(localFrame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const billSpring = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 120 } });
  const highlightWidth = interpolate(localFrame, [35, 75], [0, 100], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Background Ribbon Fracturing into a Deep Red Canyon */}
      <TimelineRibbonBackground cracked={true} crackProgress={crackProgress} />

      <div style={{ width: 900, transform: `scale(${billSpring})`, zIndex: 20 }}>
        {/* Hospital Invoice with red marker strike */}
        <div
          style={{
            background: "#ffffff",
            color: "#0f172a",
            borderRadius: 36,
            padding: "44px 40px",
            boxShadow: "0 30px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(239, 68, 68, 0.3)",
            marginBottom: 24,
          }}
        >
          {/* Bill Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: 16,
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a" }}>BẢNG KÊ VIỆN PHÍ & THUỐC</div>
              <div style={{ fontSize: 20, color: "#64748b", fontWeight: 700 }}>BỆNH NHI: NGUYỄN AN (3 TUỔI)</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#64748b" }}>MÃ HỒ SƠ: #8921</div>
          </div>

          {/* Line Item 1: General */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800 }}>1. Khám & xét nghiệm tổng quát</div>
              <div style={{ fontSize: 20, color: "#059669", fontWeight: 700 }}>BHYT chi trả 80%</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900 }}>350.000đ</div>
          </div>

          {/* Line Item 2: Standard Meds */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800 }}>2. Thuốc thông thường trong danh mục</div>
              <div style={{ fontSize: 20, color: "#059669", fontWeight: 700 }}>Được quỹ BHYT hỗ trợ</div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900 }}>680.000đ</div>
          </div>

          {/* Line Item 3: THE CHASM (Thuốc ngoài danh mục) */}
          <div
            style={{
              position: "relative",
              border: "3px solid #ef4444",
              borderRadius: 20,
              padding: "18px 20px",
              backgroundColor: "rgba(254, 226, 226, 0.6)",
              overflow: "hidden",
            }}
          >
            {/* Red Marker Strike animation */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${highlightWidth}%`,
                background: "rgba(239, 68, 68, 0.2)",
                zIndex: 0,
              }}
            />
            <div
              style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#dc2626" }}>3. THUỐC NGOÀI DANH MỤC</div>
                <div style={{ fontSize: 22, color: "#b91c1c", fontWeight: 800 }}>
                  Tự chi trả 100% (Thuốc đặc trị, ít tác dụng phụ)
                </div>
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#dc2626" }}>18.500.000đ</div>
            </div>
          </div>
        </div>

        {/* Translation Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(15, 23, 42, 0.95))",
            border: "2px solid #ef4444",
            borderRadius: 24,
            padding: "20px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#fca5a5", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            BẢN CHẤT CỦA CÂU HỎI BÁC SĨ:
          </div>
          <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 900 }}>
            “GIA ĐÌNH CÓ ĐỦ NGÂN SÁCH ĐỂ ĐỔI LẤY SỰ DỄ CHỊU CHO CON?”
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. SCENE 5: THE DILEMMA (Child's Health vs Wallet Weight) - Option 1
// ============================================================================
export const Scene5Dilemma: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1460;
  const { fps } = useVideoConfig();

  const scale = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 110 } });
  const tiltAngle = Math.sin(localFrame / 15) * 8; // Balance scale tilting

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Background Ribbon fractured canyon */}
      <TimelineRibbonBackground cracked={true} crackProgress={1} />

      <div style={{ width: 900, transform: `scale(${scale})`, zIndex: 10 }}>
        {/* Tilting Balance Scale Visual */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-block",
              transform: `rotate(${tiltAngle}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.1s ease",
            }}
          >
            <div style={{ fontSize: 90 }}>⚖️</div>
          </div>
        </div>

        {/* Dual Comparison Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Card Left: Bệnh nhẹ */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "2px solid rgba(148, 163, 184, 0.3)",
              borderRadius: 28,
              padding: "36px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 12 }}>💊</div>
            <div style={{ color: "#94a3b8", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>BỆNH NHẸ THƯỜNG GẶP</div>
            <div style={{ color: "#38bdf8", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Vài trăm ngàn</div>
            <div style={{ color: "#64748b", fontSize: 20, fontWeight: 600 }}>Dễ dàng xoay xở</div>
          </div>

          {/* Card Right: Rủi ro lớn */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(15, 23, 42, 0.95))",
              border: "2px solid #ef4444",
              borderRadius: 28,
              padding: "36px 24px",
              textAlign: "center",
              boxShadow: "0 15px 40px rgba(239, 68, 68, 0.2)",
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 12 }}>🚨</div>
            <div style={{ color: "#fca5a5", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>RỦI RO LỚN / ĐẶC TRỊ</div>
            <div style={{ color: "#ef4444", fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Hàng chục triệu</div>
            <div style={{ color: "#f87171", fontSize: 20, fontWeight: 700 }}>Mỗi đợt điều trị</div>
          </div>
        </div>

        {/* The Core Pain Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98))",
            border: "2px solid rgba(245, 158, 11, 0.6)",
            borderRadius: 32,
            padding: "36px 30px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div style={{ color: "#f59e0b", fontSize: 24, fontWeight: 800, letterSpacing: 1.5, marginBottom: 12 }}>
            NỖI XÓT XA NHẤT CỦA CHA MẸ
          </div>
          <div style={{ color: "#ffffff", fontSize: 44, fontWeight: 900, lineHeight: 1.35 }}>
            Phải cân đo giữa <span style={{ color: "#38bdf8" }}>Sức khỏe của con</span>
            <br />
            và <span style={{ color: "#f87171" }}>Độ dày của chiếc ví</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. SCENE 6: THE BRIDGE OF CHOICE (Thẻ Sức Khỏe Lấp Đầy Khe Nứt) - Option 1
// ============================================================================
export const Scene6Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1854;
  const { fps } = useVideoConfig();

  const scale = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 120 } });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Background Ribbon WITH THE LUMINOUS GREEN BRIDGE CONNECTING BOTH CLIFFS */}
      <TimelineRibbonBackground cracked={true} crackProgress={1} hasBridge={true} />

      <div style={{ width: 900, transform: `scale(${scale})`, zIndex: 20 }}>
        {/* Layer 1: BHYT Foundation */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(15, 23, 42, 0.95))",
            border: "2px solid #0284c7",
            borderRadius: 28,
            padding: "32px 30px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: "#7dd3fc", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>BHYT LÀ NỀN TẢNG</div>
            <div style={{ color: "#ffffff", fontSize: 40, fontWeight: 900 }}>“QUYỀN ĐƯỢC CHỮA BỆNH”</div>
            <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 600 }}>Bảo đảm an sinh căn bản cho mọi người</div>
          </div>
          <div style={{ fontSize: 56 }}>🛡️</div>
        </div>

        {/* Layer 2: Thẻ Sức Khỏe (The Bridge & Choice) */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(15, 23, 42, 0.98))",
            border: "3px solid #10b981",
            borderRadius: 28,
            padding: "38px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 25px 60px rgba(16, 185, 129, 0.3), 0 0 40px rgba(52, 211, 153, 0.2)",
          }}
        >
          <div>
            <div style={{ color: "#a7f3d0", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
              THẺ CHĂM SÓC SỨC KHỎE TỰ NGUYỆN
            </div>
            <div style={{ color: "#34d399", fontSize: 44, fontWeight: 900, marginBottom: 4 }}>
              “QUYỀN ĐƯỢC LỰA CHỌN”
            </div>
            <div style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700 }}>
              Thuốc tốt nhất • Bệnh viện tốt nhất • Không âu lo viện phí
            </div>
          </div>
          <div style={{ fontSize: 60 }}>⭐</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 9. SCENE 7: PEACE OF MIND & CROSSING THE BRIDGE - Option 1 Resolution
// ============================================================================
export const Scene7PeaceOfMind: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 2140;
  const { fps } = useVideoConfig();

  const scale = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 120 } });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* Reconnected Golden Ribbon to Golden Future */}
      <TimelineRibbonBackground color1="#10b981" color2="#34d399" speedMultiplier={1} />

      <div style={{ width: 900, transform: `scale(${scale})`, textAlign: "center", zIndex: 20 }}>
        {/* Parent & Child Conquering the Journey */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div
            style={{
              padding: "20px 32px",
              background: "rgba(16, 185, 129, 0.2)",
              borderRadius: 36,
              border: "2px solid #10b981",
              boxShadow: "0 15px 40px rgba(16, 185, 129, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <ParentAndChild color="#34d399" size={70} />
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 900 }}>BÌNH AN XUẤT VIỆN</div>
              <div style={{ color: "#a7f3d0", fontSize: 22, fontWeight: 700 }}>Sức khỏe của con là ưu tiên số 1</div>
            </div>
          </div>
        </div>

        {/* Final Quote Box */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(15, 23, 42, 0.98))",
            border: "2px solid #10b981",
            borderRadius: 36,
            padding: "50px 36px",
            boxShadow: "0 30px 60px rgba(16, 185, 129, 0.25)",
            marginBottom: 24,
          }}
        >
          <div style={{ color: "#6ee7b7", fontSize: 24, fontWeight: 800, letterSpacing: 1.5, marginBottom: 16 }}>
            CÂU TRẢ LỜI THANH THẢN CỦA CHA MẸ
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.35,
              marginBottom: 24,
            }}
          >
            “Bác sĩ cứ kê <span style={{ color: "#facc15" }}>thuốc tốt nhất</span> cho cháu,<br />
            chi phí <span style={{ color: "#34d399" }}>không cần lo</span>.”
          </div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(16, 185, 129, 0.25)",
              color: "#a7f3d0",
              fontSize: 24,
              fontWeight: 800,
              padding: "12px 28px",
              borderRadius: 20,
            }}
          >
            SỰ CHỦ ĐỘNG TRỌN VẸN VÌ CON
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 10. SYNCED CAPTIONS (WORD-BY-WORD HIGHLIGHT)
// ============================================================================
export const SyncedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  // Find the active cue from subtitlesData
  const activeCue = (subtitlesData as any[]).find(
    (c) => currentMs >= c.startMs - 50 && currentMs <= c.endMs + 80
  );

  if (!activeCue) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        padding: "0 50px",
      }}
    >
      <div
        style={{
          background: "rgba(11, 15, 25, 0.9)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 24,
          padding: "20px 32px",
          maxWidth: 960,
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.45,
            display: "inline",
          }}
        >
          {activeCue.words.map((w: any, idx: number) => {
            const isHighlighted = currentMs >= w.startMs - 30 && currentMs <= w.startMs + w.durationMs + 30;
            return (
              <span
                key={idx}
                style={{
                  color: isHighlighted ? "#fbbf24" : "#f1f5f9",
                  marginRight: 8,
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
