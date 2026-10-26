import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrand from "../../../../../brand/user-brand.json";

// ============================================================================
// SHARED COSMIC FINTECH BACKDROP (Deep Space + Cyber Coordinates)
// ============================================================================
export const GlobalBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.04) * 0.08 + 0.92;
  const gridShift = (frame * 0.5) % 60;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#06090F",
        backgroundImage: "radial-gradient(circle at 50% 30%, #0F172A 0%, #06090F 80%)",
        overflow: "hidden",
      }}
    >
      {/* Moving Cyber Tactical Grid */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          opacity: 0.15,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${gridShift}px)`,
        }}
      />

      {/* Dynamic Ambient Color Blobs */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) scale(${pulse})`,
          width: 850,
          height: 850,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

// ============================================================================
// SCENE 1: HOOK — MINH HỌA CỖ MÁY BƠM THỔI BONG BÓNG LÃI ẢO 300 TRIỆU
// ============================================================================
export const Scene1Hook: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating inflation animation
  const pumpPhase = (frame * 0.08) % (Math.PI * 2);
  const bubbleScale = 1 + Math.sin(pumpPhase) * 0.06 + Math.min(frame / 120, 0.25);
  const floatY = Math.sin(frame * 0.05) * 12;

  // Title entrance
  const titleY = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Top Freeform Headline */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 48,
          right: 48,
          textAlign: "center",
          transform: `translateY(${(1 - titleY) * -50}px)`,
          opacity: titleY,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            color: "#D4AF37",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ● ẢO TƯỞNG TÀI CHÍNH PHỔ BIẾN
        </div>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.12,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          MUA BẢO HIỂM VỚI TÂM LÝ
          <br />
          <span style={{ color: "#38BDF8" }}>GỬI TIẾT KIỆM RÚT LÃI KHỦNG!</span>
        </h1>
      </div>

      {/* CENTRAL ILLUSTRATION: The Giant Hologram Bubble & Safe Machine */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 0,
          right: 0,
          height: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Giant Floating Neon Bubble */}
        <div
          style={{
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, rgba(56, 189, 248, 0.4) 0%, rgba(14, 165, 233, 0.15) 45%, rgba(15, 23, 42, 0.7) 85%)",
            border: "3px solid rgba(56, 189, 248, 0.65)",
            boxShadow:
              "0 0 60px rgba(56, 189, 248, 0.4), inset 0 0 40px rgba(56, 189, 248, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateY(${floatY}px) scale(${bubbleScale})`,
            position: "relative",
          }}
        >
          {/* Bubble Iridescent Highlight */}
          <div
            style={{
              position: "absolute",
              top: 45,
              left: 70,
              width: 120,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 80%)",
              transform: "rotate(-35deg)",
              filter: "blur(2px)",
            }}
          />

          <span style={{ fontSize: 44, marginBottom: 4 }}>💭</span>
          <div
            style={{
              color: "#38BDF8",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: "2px",
            }}
          >
            ĐINH NINH RÚT VỀ
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 88,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
              textShadow: "0 0 30px rgba(56, 189, 248, 0.8)",
            }}
          >
            250 – 300 TR
          </div>
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1px solid #10B981",
              borderRadius: 999,
              padding: "4px 18px",
              color: "#10B981",
              fontSize: 20,
              fontWeight: 800,
              marginTop: 10,
            }}
          >
            +50% LÃI SUẤT ẢO
          </div>
        </div>

        {/* Pump Connecting Pipe (SVG Mechanical Tube) */}
        <svg width="240" height="130" viewBox="0 0 240 130" style={{ overflow: "visible", margin: "-15px 0" }}>
          {/* Main Air Hose */}
          <path
            d="M 120,0 L 120,130"
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Flowing Air Pulse */}
          <circle cx="120" cy={(frame * 8) % 130} r="7" fill="#38BDF8" filter="drop-shadow(0 0 8px #38BDF8)" />
          {/* Machine Joint Ring */}
          <rect x="90" y="50" width="60" height="16" rx="8" fill="#D4AF37" />
        </svg>

        {/* Real Deposit Base: Metallic Titanium Vault (Vốn gốc 200 Triệu) */}
        <div
          style={{
            width: 580,
            backgroundColor: "#0D131F",
            border: "2px solid #D4AF37",
            borderRadius: 28,
            padding: "24px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.25)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid #D4AF37",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
              }}
            >
              🔒
            </div>
            <div>
              <div style={{ color: "#94A3B8", fontSize: 20, fontWeight: 700, textTransform: "uppercase" }}>
                VỐN THỰC ĐÓNG 10 NĂM
              </div>
              <div style={{ color: "#FFFFFF", fontSize: 26, fontWeight: 800 }}>Tiền mồ hôi nước mắt</div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 58,
                fontWeight: 900,
                color: "#D4AF37",
                lineHeight: 1,
              }}
            >
              200 TRIỆU
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 2: PROBLEM — MINH HỌA BONG BÓNG NỔ TUNG & CHIẾC KÍNH LÚP LASER BÓC MẼ
// ============================================================================
export const Scene2Problem: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Burst explosion physics for particles
  const burstFrame = Math.max(0, frame - 10);
  const burstRadius = interpolate(burstFrame, [0, 45], [0, 360], { extrapolateRight: "clamp" });
  const burstOpacity = interpolate(burstFrame, [0, 20, 50], [1, 1, 0], { extrapolateRight: "clamp" });

  // Stamp slam spring
  const stampSlam = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 9, stiffness: 200 },
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Top Headline */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 48,
          right: 48,
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            color: "#EF4444",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚠️ THỰC TẾ PHŨ PHÀNG
        </div>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.12,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          MỞ TÀI KHOẢN: CHỈ HUỀ VỐN!
          <br />
          <span style={{ color: "#EF4444" }}>"HÓA RA BẢO HIỂM LỪA ĐẢO À?"</span>
        </h1>
      </div>

      {/* CENTRAL ILLUSTRATION: Bursting Bubble Particles & Busted Document */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          height: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Exploding Shard Particles Canvas */}
        <div style={{ position: "relative", width: 600, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Shards flying outwards */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = Math.cos(angle) * burstRadius;
            const y = Math.sin(angle) * burstRadius * 0.7;
            const rot = (i * 45 + burstFrame * 10) % 360;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 24,
                  height: 36,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 70%)",
                  background: "linear-gradient(135deg, #38BDF8, #EF4444)",
                  transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                  opacity: burstOpacity,
                  filter: "drop-shadow(0 0 10px #38BDF8)",
                }}
              />
            );
          })}

          {/* Central Remainder: Bare 200 Triệu (Sứt mẻ) */}
          <div
            style={{
              width: 380,
              height: 240,
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "3px dashed #EF4444",
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 50px rgba(239, 68, 68, 0.3)",
            }}
          >
            <span style={{ fontSize: 44 }}>💥</span>
            <div style={{ color: "#EF4444", fontSize: 22, fontWeight: 900, textTransform: "uppercase", marginTop: 4 }}>
              SỐ DƯ THỰC NHẬN
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 72,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              ~200 TRIỆU
            </div>
            <div style={{ color: "#F87171", fontSize: 20, fontWeight: 700, marginTop: 6 }}>
              (Huề vốn / Hụt chi phí)
            </div>
          </div>
        </div>

        {/* The Myth-Busting Document under Laser Magnifier */}
        <div
          style={{
            position: "relative",
            width: 700,
            backgroundColor: "#0D131F",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 24,
            padding: "32px 40px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
            marginTop: 20,
          }}
        >
          <div style={{ color: "#64748B", fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>
            LỜI TƯ VẤN MẬP MỜ BAN ĐẦU:
          </div>
          <div
            style={{
              color: "#E2E8F0",
              fontSize: 30,
              fontWeight: 800,
              lineHeight: 1.35,
              marginTop: 10,
              fontStyle: "italic",
            }}
          >
            "Cứ đóng 10 năm rồi rút cả gốc lẫn lãi, coi như được bảo vệ hoàn toàn miễn phí!"
          </div>

          {/* Huge Red Stamp Slammed Over It */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(-10deg) scale(${stampSlam})`,
              border: "6px solid #EF4444",
              borderRadius: 18,
              padding: "12px 32px",
              backgroundColor: "rgba(11, 14, 20, 0.95)",
              color: "#EF4444",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: "4px",
              textTransform: "uppercase",
              boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)",
              whiteSpace: "nowrap",
              zIndex: 30,
            }}
          >
            ✖ THẦN THOẠI SAI LỆCH
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 3: SOLUTION — MINH HỌA VÒM KHIÊN NĂNG LƯỢNG 1-2 TỶ CHỐNG GIÔNG BÃO
// ============================================================================
export const Scene3Solution: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Shield energy pulses
  const shieldAura = Math.sin(frame * 0.08) * 0.05 + 0.95;
  const lightningPhase = (frame * 12) % 30;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Top Headline */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 48,
          right: 48,
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            color: "#38BDF8",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          🛡️ QUY LUẬT TÀI CHÍNH BẤT BIẾN
        </div>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.12,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          TRÊN ĐỜI NÀY
          <br />
          <span style={{ color: "#38BDF8" }}>KHÔNG CÓ BỮA TRƯA MIỄN PHÍ!</span>
        </h1>
      </div>

      {/* CENTRAL ILLUSTRATION: Huge Cybernetic Dome Shield Deflecting Storm Bolts */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          height: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SVG Forcefield Dome */}
        <div style={{ position: "relative", width: 680, height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Incoming Lightning Hazard (Red bolts deflected on the outside) */}
          <svg
            width="680"
            height="500"
            viewBox="0 0 680 500"
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#0284C7" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Dome Arc */}
            <path
              d="M 60,460 A 280,280 0 0,1 620,460"
              fill="url(#shieldGrad)"
              stroke="#38BDF8"
              strokeWidth="6"
              strokeDasharray="16 8"
              style={{
                filter: "drop-shadow(0 0 35px #38BDF8)",
                transform: `scale(${shieldAura})`,
                transformOrigin: "340px 460px",
              }}
            />

            {/* Deflected Lightning Bolt Left */}
            {lightningPhase < 15 && (
              <path
                d="M 40,80 L 120,180 L 80,220 L 160,310"
                stroke="#EF4444"
                strokeWidth="5"
                fill="none"
                filter="drop-shadow(0 0 15px #EF4444)"
              />
            )}

            {/* Deflected Lightning Bolt Right */}
            {lightningPhase >= 10 && (
              <path
                d="M 640,60 L 560,160 L 600,200 L 510,290"
                stroke="#EF4444"
                strokeWidth="5"
                fill="none"
                filter="drop-shadow(0 0 15px #EF4444)"
              />
            )}
          </svg>

          {/* Golden Shield Insignia & Guaranteed Billion Protection Badge */}
          <div
            style={{
              position: "absolute",
              top: 140,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                border: "3px solid #38BDF8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                boxShadow: "0 0 40px rgba(56, 189, 248, 0.5)",
                marginBottom: 12,
              }}
            >
              🛡️
            </div>
            <div style={{ color: "#94A3B8", fontSize: 20, fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase" }}>
              BẢO CHỨNG VIỆN PHÍ & SINH MẠNG
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 86,
                fontWeight: 900,
                color: "#38BDF8",
                lineHeight: 1,
                textShadow: "0 0 35px rgba(56, 189, 248, 0.8)",
              }}
            >
              1 – 2 TỶ ĐỒNG
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 700, marginTop: 6 }}>
              Bảo lãnh liên tục 24/7 suốt 10 năm
            </div>
          </div>
        </div>

        {/* Energy Reactor Generator Core (Minh chứng chi phí vận hành) */}
        <div
          style={{
            width: 640,
            backgroundColor: "#0D131F",
            border: "2px solid #D4AF37",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 38 }}>⚡</span>
            <div>
              <div style={{ color: "#D4AF37", fontSize: 20, fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase" }}>
                CHI PHÍ DUY TRÌ BẢO VỆ
              </div>
              <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 700 }}>
                Không thể đòi hỏi miễn phí!
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              border: "1px solid #D4AF37",
              borderRadius: 14,
              padding: "8px 18px",
              color: "#D4AF37",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            BẮT BUỘC THU PHÍ
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 4: WORKFLOW — MINH HỌA CỖ MÁY PHÂN TÁCH THỦY LỰC 100 ĐỒNG
// ============================================================================
export const Scene4Workflow: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Pulse animation along the fluid pipes
  const pulsePhase = (frame * 6) % 200;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Top Headline */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 48,
          right: 48,
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            color: "#D4AF37",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚙️ CƠ CHẾ DÒNG TIỀN MINH BẠCH
        </div>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.12,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          BÓC TÁCH 100 ĐỒNG PHÍ
          <br />
          <span style={{ color: "#D4AF37" }}>MỖI THÁNG BẠN NỘP VÀO!</span>
        </h1>
      </div>

      {/* CENTRAL ILLUSTRATION: Dual Fluid Splitter Pipeline Mechanism */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          height: 1140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top Intake Coin Chamber: 100 ĐỒNG */}
        <div
          style={{
            width: 480,
            height: 120,
            backgroundColor: "#111827",
            border: "3px solid #D4AF37",
            borderRadius: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            boxShadow: "0 0 50px rgba(212, 175, 55, 0.45)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              backgroundColor: "#D4AF37",
              color: "#0B0E14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 900,
              boxShadow: "0 0 25px rgba(212, 175, 55, 0.8)",
            }}
          >
            $
          </div>
          <div>
            <div style={{ color: "#94A3B8", fontSize: 18, fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              TỔNG PHÍ NỘP VÀO
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 56,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              100 ĐỒNG NGUYÊN VẸN
            </div>
          </div>
        </div>

        {/* SVG Branching Tubes (Perfect 1080 Center-to-Target Math) */}
        <svg width="1080" height="200" viewBox="0 0 1080 200" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="pipeRisk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="pipeInvest" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Left Tube from (540,0) to Left Target (290,200) */}
          <path
            d="M 540,0 C 540,110 290,90 290,200"
            fill="none"
            stroke="url(#pipeRisk)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Right Tube from (540,0) to Right Target (790,200) */}
          <path
            d="M 540,0 C 540,110 790,90 790,200"
            fill="none"
            stroke="url(#pipeInvest)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Moving Pulse Left */}
          <circle
            cx={540 - (250 * pulsePhase) / 200}
            cy={pulsePhase}
            r="10"
            fill="#EF4444"
            filter="drop-shadow(0 0 12px #EF4444)"
          />
          {/* Moving Pulse Right */}
          <circle
            cx={540 + (250 * pulsePhase) / 200}
            cy={pulsePhase}
            r="10"
            fill="#10B981"
            filter="drop-shadow(0 0 12px #10B981)"
          />
        </svg>

        {/* Two Concrete Visual Entities (Exactly aligned at X=290 and X=790) */}
        <div style={{ width: 1080, position: "relative", height: 500 }}>
          {/* Left Entity: Robot Vệ sĩ hộ mệnh 24/7 (Left 70px to 510px, Center 290) */}
          <div
            style={{
              position: "absolute",
              left: 70,
              width: 440,
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #EF4444",
              borderRadius: 32,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 0 50px rgba(239, 68, 68, 0.3)",
            }}
          >
            {/* Guardian Helmet & Shield Icon */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.18)",
                border: "2px solid #EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
                marginBottom: 16,
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)",
              }}
            >
              🛡️
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 36,
                fontWeight: 900,
                color: "#EF4444",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              CHI PHÍ RỦI RO
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, marginTop: 6 }}>
              Tiền "thuê vệ sĩ" túc trực 24/7
            </div>
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                borderRadius: 14,
                padding: "10px 16px",
                marginTop: 14,
                color: "#FCA5A5",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              Trừ hàng tháng để sẵn sàng bảo vệ <b style={{ color: "#38BDF8" }}>1 – 2 TỶ</b> khi có biến cố.
            </div>
          </div>

          {/* Right Entity: Bể ươm mầm sinh lãi (Left 570px to 1010px, Center 790) */}
          <div
            style={{
              position: "absolute",
              left: 570,
              width: 440,
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #10B981",
              borderRadius: 32,
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 0 50px rgba(16, 185, 129, 0.3)",
            }}
          >
            {/* Wealth Seedling Flask Icon */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.18)",
                border: "2px solid #10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
                marginBottom: 16,
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
              }}
            >
              🌱
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 36,
                fontWeight: 900,
                color: "#10B981",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              PHẦN TÍCH LŨY
            </div>
            <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, marginTop: 6 }}>
              Mang đi đầu tư tích lũy
            </div>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                borderRadius: 14,
                padding: "10px 16px",
                marginTop: 14,
                color: "#A7F3D0",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              Lãi suất chỉ chạy trên phần này, <b style={{ color: "#F59E0B" }}>không phải 100đ nguyên vẹn!</b>
            </div>
          </div>
        </div>

        {/* Bottom Floating Warning Banner */}
        <div
          style={{
            marginTop: 20,
            backgroundColor: "rgba(11, 14, 20, 0.9)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: 999,
            padding: "16px 36px",
            color: "#D4AF37",
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          💡 Vì vậy, bảo hiểm không bao giờ có thể đua lãi suất với ngân hàng!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 5: BENEFITS — MINH HỌA SA BÀN BÓNG ĐÁ: TIỀN ĐẠO TẤN CÔNG VS THỦ MÔN GIỮ GÔN
// ============================================================================
export const Scene5Benefits: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Soccer ball dynamic bounce
  const ballY = Math.sin(frame * 0.1) * 8;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Top Headline */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 48,
          right: 48,
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            color: "#10B981",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ CHIẾN THUẬT QUẢN TRỊ TÀI SẢN
        </div>
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.12,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          TIỀN ĐẠO GHI BÀN LÀM GIÀU
          <br />
          <span style={{ color: "#D4AF37" }}>THỦ MÔN GIỮ CHO KHÔNG NGHÈO ĐI!</span>
        </h1>
      </div>

      {/* CENTRAL ILLUSTRATION: Cyber Neon Football Pitch with Striker and Goalie */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          height: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
        }}
      >
        {/* Half Pitch Top: Striker (Ngân hàng & Chứng khoán) */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#0D131F",
            border: "2px solid #10B981",
            borderRadius: 28,
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 0 45px rgba(16, 185, 129, 0.25)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Striker Jersey #9 */}
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: 22,
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid #10B981",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#10B981",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
              }}
            >
              <span style={{ fontSize: 44, lineHeight: 1 }}>9</span>
              <span style={{ fontSize: 14, letterSpacing: "1px" }}>TIỀN ĐẠO</span>
            </div>

            <div>
              <div style={{ color: "#10B981", fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>
                NGÂN HÀNG & CHỨNG KHOÁN
              </div>
              <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                MỤC TIÊU: GHI BÀN & LÀM GIÀU
              </div>
              <div style={{ color: "#94A3B8", fontSize: 20, fontWeight: 600, marginTop: 4 }}>
                Tận dụng 100% dòng vốn vận hành sinh lãi kép tối đa.
              </div>
            </div>
          </div>

          <span style={{ fontSize: 50, transform: `translateY(${ballY}px)` }}>⚽</span>
        </div>

        {/* Center Pitch Line & Neon Tactical Compass */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#64748B", fontWeight: 800, fontSize: 22 }}>
          <div style={{ width: 140, height: 2, backgroundColor: "rgba(255,255,255,0.15)" }} />
          <span>PHỐI HỢP CÔNG THỦ TOÀN DIỆN</span>
          <div style={{ width: 140, height: 2, backgroundColor: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Half Pitch Bottom: Goalkeeper (Bảo hiểm nhân thọ) */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#0D131F",
            border: "3px solid #D4AF37",
            borderRadius: 28,
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 0 50px rgba(212, 175, 55, 0.35)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Goalkeeper Jersey #1 */}
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: 22,
                backgroundColor: "rgba(212, 175, 55, 0.2)",
                border: "2px solid #D4AF37",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#D4AF37",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
              }}
            >
              <span style={{ fontSize: 44, lineHeight: 1 }}>1</span>
              <span style={{ fontSize: 14, letterSpacing: "1px" }}>THỦ MÔN</span>
            </div>

            <div>
              <div style={{ color: "#D4AF37", fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>
                BẢO HIỂM NHÂN THỌ
              </div>
              <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 4 }}>
                MỤC TIÊU: GIỮ CHO MÌNH KHÔNG NGHÈO ĐI
              </div>
              <div style={{ color: "#E2E8F0", fontSize: 20, fontWeight: 600, marginTop: 4 }}>
                Bịt kín khung thành rủi ro nếu chẳng may ngã ngựa giữa đường!
              </div>
            </div>
          </div>

          <span style={{ fontSize: 50 }}>🧤</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 6: OUTRO — MINH HỌA GĂNG TAY VÀNG BẮT DÍNH BÓNG & HUY HIỆU TIẾN DƯƠNG
// ============================================================================
export const Scene6Outro: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 56px",
        overflow: "hidden",
      }}
    >
      {/* Golden Goal Net Graphic (Găng tay vàng giữ lưới) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 12, filter: "drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))" }}>
          🧤⚽
        </div>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 60,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          ĐỪNG BẮT BẢO HIỂM PHẢI GHI BÀN.
          <br />
          <span style={{ color: "#D4AF37" }}>NHIỆM VỤ CỦA NÓ LÀ GIỮ GÔN!</span>
        </div>
      </div>

      {/* Creator Emblem Hologram */}
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10B981, #D4AF37, #38BDF8)",
          padding: 4,
          boxShadow: "0 0 50px rgba(212, 175, 55, 0.5)",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#06090F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 60,
            fontWeight: 900,
            color: "#D4AF37",
          }}
        >
          TD
        </div>
      </div>

      {/* Creator Info */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 60,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {userBrand.creatorName || "Tiến Dương"}
        </h2>
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 34,
            fontWeight: 900,
            color: "#D4AF37",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          {userBrand.brandName || "TÀI CHÍNH THỰC CHIẾN"}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#94A3B8",
            marginTop: 8,
          }}
        >
          {userBrand.tagline || "HOẠCH ĐỊNH TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG"}
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 36,
          backgroundColor: "rgba(212, 175, 55, 0.15)",
          border: "2px solid #D4AF37",
          borderRadius: 999,
          padding: "16px 40px",
          color: "#FFFFFF",
          fontSize: 26,
          fontWeight: 800,
          textAlign: "center",
          boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
        }}
      >
        💬 Bình luận quan điểm tài chính của bạn bên dưới 👇
      </div>
    </div>
  );
};
