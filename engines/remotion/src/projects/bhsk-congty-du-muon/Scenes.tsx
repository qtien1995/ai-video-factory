import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import phrasesData from "../../../public/audio/bhsk-congty-du-muon/phrases.json";

// ============================================================================
// 1. GLOBAL EXECUTIVE & MEDICAL AMBIENT BACKDROP
// ============================================================================
export const OfficeMedicalBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const auraPulse = Math.sin(frame * 0.04) * 0.05 + 0.95;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 20%, #0c1a2e 0%, #030712 55%, #020617 100%)",
      }}
    >
      {/* Precision Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Atmospheric Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: `translateX(-50%) scale(${auraPulse})`,
          width: 920,
          height: 920,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// 2. SCENE 1: HOSPITAL POS CARD TAP & HOOK
// ============================================================================
export const HospitalTapScene: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const cardFloat = Math.sin(frame * 0.06) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
      {/* Floating Corporate Platinum Health Card */}
      <div
        style={{
          width: 920,
          height: 420,
          borderRadius: 28,
          background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)",
          border: "2px solid rgba(148, 163, 184, 0.4)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
          padding: "36px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          transform: `translateY(${cardFloat}px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer light pass */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 200,
            height: 600,
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
            transform: `translateX(${interpolate(frame, [0, 80], [0, 1100], { extrapolateRight: "clamp" })}px) rotate(25deg)`,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#94a3b8", letterSpacing: 2 }}>
              CORPORATE HEALTHCARE
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              THẺ BẢO HIỂM NHÓM DOANH NGHIỆP
            </div>
          </div>
          {/* Chip */}
          <div
            style={{
              width: 60,
              height: 46,
              borderRadius: 8,
              background: "linear-gradient(135deg, #facc15 0%, #ca8a04 100%)",
              border: "1px solid #eab308",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 700 }}>HẠN MỨC ĐƯỢC CẤP</div>
            <div style={{ fontSize: 38, fontWeight: 900, color: "#38bdf8" }}>500.000.000 VNĐ / NĂM</div>
          </div>
          <div
            style={{
              background: "rgba(56, 189, 248, 0.15)",
              border: "1px solid #38bdf8",
              borderRadius: 12,
              padding: "8px 18px",
              fontSize: 22,
              fontWeight: 800,
              color: "#38bdf8",
            }}
          >
            VIỆN TƯ QUỐC TẾ
          </div>
        </div>
      </div>

      {/* POS Terminal & Direct Bill Breakdown */}
      <div
        style={{
          width: 920,
          background: "rgba(15, 23, 42, 0.95)",
          border: "2px solid rgba(56, 189, 248, 0.4)",
          borderRadius: 26,
          padding: "36px 40px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              ✓
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#ffffff" }}>
              BẢO LÃNH VIỆN PHÍ TRỰC TIẾP
            </div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#34d399" }}>
            VIỆN PHÍ: 0 ĐỒNG
          </div>
        </div>

        {/* The Big Tension Question */}
        <div
          style={{
            background: "rgba(239, 68, 68, 0.12)",
            border: "1.5px dashed #f43f5e",
            borderRadius: 18,
            padding: "20px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fda4af", letterSpacing: 1 }}>
            CÂU HỎI QUAN TRỌNG NHẤT:
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", marginTop: 6 }}>
            CHIẾC THẺ NÀY... THỰC SỰ THUỘC VỀ AI?
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SCENE 2: REALITY CHECK — 17:00 NGHỈ VIỆC & CHIẾC DÙ MƯỢN
// ============================================================================
export const UmbrellaBorrowScene: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const timeProgress = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp" });
  const isAfter17 = timeProgress > 0.4;
  const pulse = Math.sin(frame * 0.1) * 0.05 + 1;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
      {/* Digital Flip Clock 17:00 -> 17:01 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          background: "rgba(15, 23, 42, 0.95)",
          border: "2px solid rgba(245, 158, 11, 0.5)",
          borderRadius: 24,
          padding: "24px 44px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#94a3b8" }}>NỘP ĐƠN NGHỈ VIỆC</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: isAfter17 ? "#64748b" : "#f59e0b" }}>
            17:00
          </div>
        </div>
        <div style={{ fontSize: 44, color: "#f59e0b", fontWeight: 900 }}>➔</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#f43f5e" }}>HẾT HIỆU LỰC BẢO VỆ</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: isAfter17 ? "#f43f5e" : "#64748b" }}>
            17:01
          </div>
        </div>
      </div>

      {/* The Borrowed Items Grid (Laptop, Chair, Health Card) */}
      <div
        style={{
          width: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {[
          { icon: "💻", title: "LAPTOP", status: "MƯỢN CÔNG TY" },
          { icon: "🪑", title: "GHẾ ERGONOMIC", status: "CỦA CÔNG TY" },
          { icon: "💳", title: "THẺ BẢO HIỂM", status: "GẮN LIỀN HĐLĐ", highlight: true },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: item.highlight ? "rgba(244, 63, 94, 0.16)" : "rgba(30, 41, 59, 0.75)",
              border: item.highlight ? "2px solid #f43f5e" : "1.5px solid rgba(148, 163, 184, 0.3)",
              borderRadius: 22,
              padding: "28px 18px",
              textAlign: "center",
              transform: item.highlight ? `scale(${pulse})` : "scale(1)",
            }}
          >
            <div style={{ fontSize: 50 }}>{item.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 12 }}>
              {item.title}
            </div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 800,
                color: item.highlight ? "#fda4af" : "#94a3b8",
              }}
            >
              {item.status}
            </div>
          </div>
        ))}
      </div>

      {/* The Umbrella Metaphor Visual Card - FULL OPACITY & High Contrast */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.9) 100%)",
          border: "2px solid rgba(245, 158, 11, 0.6)",
          borderRadius: 26,
          padding: "32px 38px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 64 }}>☂️</div>
          <div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#f59e0b" }}>
              CHIẾC DÙ MƯỢN CỦA DOANH NGHIỆP
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginTop: 4 }}>
              Phúc lợi đi liền hợp đồng — không phải tài sản cá nhân
            </div>
          </div>
        </div>

        {/* 2 States Comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <div
            style={{
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: 16,
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#34d399" }}>
              🏢 KHI ĐANG LÀM VIỆC
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", marginTop: 6 }}>
              Che mưa nắng trọn vẹn tại công ty
            </div>
          </div>

          <div
            style={{
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              borderRadius: 16,
              padding: "16px 20px",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: "#f43f5e" }}>
              🚪 KHI BƯỚC RA NGOÀI
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", marginTop: 6 }}>
              Dù bị thu hồi: 0 ngày bảo vệ!
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SCENE 3: TENSION — CÀY CUỐC & HỒ SƠ BỆNH CÓ SẴN (PRE-EXISTING)
// ============================================================================
export const PreExistingTensionScene: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.12) * 0.06 + 1;

  const ailments = [
    { name: "MEN GAN CAO", desc: "Thức khuya, tiếp khách", icon: "⚠️" },
    { name: "ĐAU DẠ DÀY / TRÀO NGƯỢC", desc: "Stress deadline kéo dài", icon: "⚠️" },
    { name: "U NANG / POLYP", desc: "Tích tụ theo năm tháng", icon: "⚠️" },
    { name: "HUYẾT ÁP / TIM MẠCH", desc: "Tì vết cơ thể bắt đầu lộ", icon: "⚠️" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
      {/* 4 Warning Ailments Grid */}
      <div
        style={{
          width: 920,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {ailments.map((a, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(220, 38, 38, 0.16)",
              border: "2px solid rgba(239, 68, 68, 0.55)",
              borderRadius: 22,
              padding: "26px 28px",
              display: "flex",
              alignItems: "center",
              gap: 18,
              transform: `scale(${idx === 1 ? pulse : 1})`,
            }}
          >
            <div style={{ fontSize: 40 }}>{a.icon}</div>
            <div>
              <div style={{ fontSize: 25, fontWeight: 900, color: "#ffffff" }}>{a.name}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fca5a5", marginTop: 4 }}>
                {a.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The Medical Record Baggage Card */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          border: "2px solid #818cf8",
          borderRadius: 26,
          padding: "36px 42px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 52 }}>📁</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#a5b4fc", letterSpacing: 1.5 }}>
              HỒ SƠ Y TẾ CÁ NHÂN (MEDICAL HISTORY)
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              BỆNH CÓ SẴN (PRE-EXISTING CONDITIONS)
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 25,
            fontWeight: 700,
            color: "#e2e8f0",
            lineHeight: 1.45,
            background: "rgba(0, 0, 0, 0.35)",
            padding: "20px 26px",
            borderRadius: 18,
          }}
        >
          Ở công ty cũ thẻ đã chi trả. Nhưng khi bạn nghỉ việc, bạn mang theo một{" "}
          <span style={{ color: "#f43f5e", fontWeight: 900 }}>hồ sơ bệnh có sẵn</span> ra ngoài và đi theo bạn suốt đời!
        </div>
      </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCENE 4: CONSEQUENCE — LOẠI TRỪ VĨNH VIỄN & 55 TUỔI HƯU TRÍ
// ============================================================================
export const ExclusionConsequenceScene: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
      {/* Exclusion Stamp Card - Clean Non-overlapping Layout */}
      <div
        style={{
          width: 920,
          background: "rgba(15, 23, 42, 0.95)",
          border: "2px solid #ef4444",
          borderRadius: 26,
          padding: "36px 40px",
          boxShadow: "0 20px 50px rgba(239, 68, 68, 0.2)",
        }}
      >
        {/* Header row with dedicated Stamp Badge on right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#94a3b8" }}>
            KHI NỘP BẢO HIỂM MỚI:
          </div>
          <div
            style={{
              border: "3px solid #ef4444",
              borderRadius: 14,
              padding: "8px 20px",
              fontSize: 24,
              fontWeight: 900,
              color: "#ef4444",
              background: "rgba(239, 68, 68, 0.15)",
              transform: "rotate(-3deg)",
            }}
          >
            LOẠI TRỪ VĨNH VIỄN
          </div>
        </div>

        <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", marginTop: 12 }}>
          GẠCH TÊN BỆNH CŨ KHỎI DANH MỤC
        </div>

        {/* 3 Striking Excluded Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "Men gan & Bệnh đường tiêu hóa", tag: "Tự chi trả 100%" },
            { name: "Dạ dày & Trào ngược dạ dày", tag: "Từ chối bảo lãnh" },
            { name: "U nang & Biến chứng liên quan", tag: "Loại trừ trọn đời" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 14,
                padding: "14px 22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#cbd5e1",
                  textDecoration: "line-through",
                }}
              >
                <span style={{ color: "#ef4444", fontWeight: 900, fontSize: 26, textDecoration: "none" }}>✕</span>{" "}
                {item.name}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#f87171",
                  background: "rgba(239, 68, 68, 0.2)",
                  padding: "4px 12px",
                  borderRadius: 8,
                }}
              >
                {item.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age 55 Retirement Cliff */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          border: "2px solid #f59e0b",
          borderRadius: 26,
          padding: "32px 38px",
          display: "flex",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div style={{ fontSize: 64 }}>🏥</div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#f59e0b" }}>
            SAU 55 TUỔI NGHỈ HƯU: AI MUA THẺ CHO BẠN?
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#cbd5e1", lineHeight: 1.4 }}>
            Công ty không còn mua thẻ nữa. Đúng giai đoạn cơ thể cần giường bệnh nhất, bạn lại phải{" "}
            <span style={{ color: "#f43f5e", fontWeight: 900 }}>tự móc 100% tiền túi</span>.
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCENE 5: STRATEGY — CHIẾN LƯỢC KẸP 2 THẺ (TWO-TIER SHIELD)
// ============================================================================
export const TwoTierShieldStrategyScene: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
      {/* Tier 1: Corporate Card (Tuyến đầu) */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)",
          border: "2px solid #38bdf8",
          borderRadius: 26,
          padding: "30px 38px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 40px rgba(56, 189, 248, 0.2)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ background: "#0284c7", color: "#fff", padding: "6px 16px", borderRadius: 10, fontSize: 20, fontWeight: 900 }}>
              TẦNG 1: TUYẾN ĐẦU
            </span>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff" }}>
              THẺ DOANH NGHIỆP CẤP
            </div>
          </div>
          <div style={{ fontSize: 23, fontWeight: 700, color: "#94a3b8", marginTop: 10 }}>
            • Khám vặt, kiểm tra định kỳ, nha khoa ngoại trú
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, color: "#38bdf8", marginTop: 6 }}>
            ✓ Chi phí: 0 đồng (Công ty đài thọ theo HĐLĐ)
          </div>
        </div>
        <div style={{ fontSize: 60 }}>🛡️</div>
      </div>

      {/* Plus Connector Badge */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: "#10b981",
          background: "rgba(16, 185, 129, 0.2)",
          padding: "8px 24px",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "2px solid #10b981",
        }}
      >
        <span>+</span> KẸP CẢ HAI SONG SONG <span>+</span>
      </div>

      {/* Tier 2: Personal Long-Term Card (Lõi 75 Tuổi) */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(135deg, rgba(6, 78, 59, 0.9) 0%, rgba(15, 23, 42, 0.98) 100%)",
          border: "3px solid #10b981",
          borderRadius: 26,
          padding: "32px 38px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 20px 50px rgba(16, 185, 129, 0.35)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ background: "#10b981", color: "#fff", padding: "6px 16px", borderRadius: 10, fontSize: 20, fontWeight: 900 }}>
              TẦNG 2: BẮT BUỘC
            </span>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff" }}>
              THẺ CÁ NHÂN ĐỘC LẬP ĐẾN 75 TUỔI
            </div>
          </div>
          <div style={{ fontSize: 23, fontWeight: 700, color: "#a7f3d0", marginTop: 10 }}>
            • Bảo vệ rủi ro lớn, nội trú, viện tư quốc tế
          </div>
          <div style={{ fontSize: 21, fontWeight: 800, color: "#facc15", marginTop: 6 }}>
            ⭐ Mua khi còn sạch bệnh án — Khóa quyền trọn đời bất kể nhảy việc!
          </div>
        </div>
        <div style={{ fontSize: 60 }}>⭐</div>
      </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. SCENE 6: CALL TO ACTION & TAKEAWAY
// ============================================================================
export const TakeawayCloseScene: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
      {/* Core Message Card */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(135deg, #0369a1 0%, #0284c7 40%, #0f172a 100%)",
          border: "2px solid #38bdf8",
          borderRadius: 28,
          padding: "36px 40px",
          textAlign: "center",
          boxShadow: "0 25px 60px rgba(2, 132, 199, 0.5)",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: "#bae6fd", letterSpacing: 2 }}>
          THÔNG ĐIỆP CỐT LÕI
        </div>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", lineHeight: 1.25 }}>
          SỨC KHỎE VÀ VIỆN PHÍ LÀ CỦA BẠN!
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#fef08a",
            background: "rgba(0, 0, 0, 0.35)",
            padding: "16px 24px",
            borderRadius: 18,
            lineHeight: 1.35,
          }}
        >
          Đừng để sự an toàn tài chính nằm trên bảng chấm công của người khác.
        </div>
      </div>

      {/* 3 Action Items */}
      <div
        style={{
          width: 920,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[
          "1️⃣ Kiểm tra lại hạn mức & điều khoản thẻ công ty hiện tại",
          "2️⃣ Rà soát hồ sơ sức khỏe cá nhân trước khi nhảy việc",
          "3️⃣ Trang bị ngay thẻ cá nhân dài hạn khi còn sạch bệnh án",
        ].map((act, i) => (
          <div
            key={i}
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1.5px solid rgba(148, 163, 184, 0.3)",
              borderRadius: 16,
              padding: "16px 24px",
              fontSize: 22,
              fontWeight: 800,
              color: "#e2e8f0",
            }}
          >
            {act}
          </div>
        ))}
      </div>

      {/* Action Prompt */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.95)",
          border: "2px solid #eab308",
          borderRadius: 22,
          padding: "20px 34px",
          textAlign: "center",
          width: 920,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 800, color: "#ffffff" }}>
          👉 Thẻ công ty của bạn còn hạn bao lâu? <span style={{ color: "#facc15" }}>Kiểm tra lại nhé!</span>
        </div>
      </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. DYNAMIC SPEECH-SYNCED CAPTIONS (Strict Word-By-Word Highlight)
// ============================================================================
export const SyncedCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  // Find active semantic phrase
  const activePhrase = (phrasesData as Array<{
    text: string;
    startMs: number;
    endMs: number;
    words: Array<{ word: string; startMs: number; durationMs: number }>;
  }>).find(
    (p) => currentMs >= p.startMs - 50 && currentMs <= p.endMs + 100
  );

  // RULE: "Ẩn cả nền lẫn chữ khi im lặng"
  if (!activePhrase) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 140,
        left: "50%",
        transform: "translateX(-50%)",
        width: 920,
        background: "rgba(3, 7, 18, 0.94)",
        backdropFilter: "blur(16px)",
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 24,
        padding: "16px 28px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        zIndex: 80,
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        boxSizing: "border-box",
      }}
    >
      {activePhrase.words.map((item, idx) => {
        const isCurrent =
          currentMs >= item.startMs - 20 &&
          currentMs <= item.startMs + item.durationMs + 20;

        // STRICT RULE (rules/visual-storytelling.md):
        // "Chỉ từ đang đọc đổi màu highlight; từ đã đọc và chưa đọc cùng màu thường."
        // "Không đổi cỡ, độ đậm, scale hay vị trí theo từ; không tô theo danh sách từ khóa."
        return (
          <span
            key={idx}
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: isCurrent ? "#facc15" : "rgba(255, 255, 255, 0.75)",
              display: "inline-block",
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};
