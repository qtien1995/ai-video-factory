import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MOBILE_LAYOUT } from "../../shared/design-system";

// ============================================================================
// 1. GLOBAL BACKDROP & AMBIENT
// ============================================================================
export const FamilyBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const auraPulse = Math.sin(frame * 0.05) * 0.05 + 0.95;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, #0f172a 0%, #030712 70%, #020617 100%)`,
      }}
    >
      {/* Subtle Blueprint Tech Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Warm Center Glow */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) scale(${auraPulse})`,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// 2. HERO BHYT CARD (Scene 1)
// ============================================================================
export const BhytCard: React.FC<{
  progress: number;
  scale?: number;
  yOffset?: number;
}> = ({ progress, scale = 1, yOffset = 0 }) => {
  const frame = useCurrentFrame();
  const cardFloat = Math.sin(frame * 0.08) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: MOBILE_LAYOUT.centerAnchorY + yOffset + cardFloat,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 900,
        height: 540,
        borderRadius: 36,
        background: "linear-gradient(135deg, #064e3b 0%, #065f46 45%, #047857 100%)",
        border: "4px solid rgba(52, 211, 153, 0.5)",
        boxShadow: "0 35px 80px rgba(5, 150, 105, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
        padding: "44px 50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        zIndex: 20,
      }}
    >
      {/* Card Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Emblem Icon */}
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#10b981",
              border: "2px solid #a7f3d0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 28, color: "#fff", fontWeight: 900 }}>✚</span>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#a7f3d0", letterSpacing: 1 }}>
              BẢO HIỂM XÃ HỘI VIỆT NAM
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.5px" }}>
              THẺ BẢO HIỂM Y TẾ
            </div>
          </div>
        </div>

        {/* Badge 100% */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.18)",
            border: "1.5px solid #6ee7b7",
            borderRadius: 16,
            padding: "8px 18px",
            fontSize: 22,
            fontWeight: 800,
            color: "#ecfdf5",
          }}
        >
          TRẺ EM DƯỚI 6T
        </div>
      </div>

      {/* Chip & Barcode line */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, margin: "16px 0" }}>
        <div
          style={{
            width: 72,
            height: 52,
            borderRadius: 10,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "1.5px solid #fbbf24",
          }}
        />
        <div style={{ flex: 1, height: 4, background: "rgba(255, 255, 255, 0.15)", borderRadius: 2 }} />
      </div>

      {/* Card Info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#a7f3d0", marginBottom: 4 }}>
            MỨC HƯỞNG ĐÚNG TUYẾN
          </div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#facc15", letterSpacing: 1 }}>
            100% CHI PHÍ KCB
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, color: "#e2e8f0", opacity: 0.8 }}>TRONG DANH MỤC</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#6ee7b7" }}>BHYT CHI TRẢ</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SEVEN DAY COUNTER BADGE (Scene 1)
// ============================================================================
export const SevenDayBadge: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.15) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: MOBILE_LAYOUT.centerAnchorY + 360 + pulse,
        transform: `translateX(-50%) scale(${progress})`,
        background: "rgba(220, 38, 38, 0.95)",
        border: "4px solid #f87171",
        boxShadow: "0 20px 50px rgba(220, 38, 38, 0.5)",
        borderRadius: 32,
        padding: "16px 36px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        zIndex: 30,
      }}
    >
      <div style={{ fontSize: 56, color: "#ffffff" }}>⏱️</div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fecaca", textTransform: "uppercase" }}>
          TÌNH HUỐNG GIẢ ĐỊNH
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff" }}>
          CON NẰM VIỆN 7 NGÀY
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. HOSPITAL INVOICE & PAID STAMP (Scene 2)
// ============================================================================
export const HospitalInvoice: React.FC<{
  stampProgress: number;
}> = ({ stampProgress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: MOBILE_LAYOUT.centerAnchorY,
        transform: "translate(-50%, -50%)",
        width: 940,
        background: "rgba(15, 23, 42, 0.96)",
        border: "3px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 32,
        boxShadow: "0 35px 80px rgba(0, 0, 0, 0.75)",
        padding: "40px 48px",
        boxSizing: "border-box",
        zIndex: 25,
      }}
    >
      {/* Invoice Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px dashed rgba(255, 255, 255, 0.15)",
          paddingBottom: 24,
          marginBottom: 28,
        }}
      >
        <div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#f8fafc" }}>HÓA ĐƠN VIỆN PHÍ NỘI TRÚ</div>
          <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 4 }}>Thời gian điều trị: 07 ngày</div>
        </div>
        <div
          style={{
            background: "#0284c7",
            borderRadius: 14,
            padding: "8px 20px",
            fontSize: 24,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          DANH MỤC BHYT
        </div>
      </div>

      {/* Invoice Rows */}
      {[
        { label: "Tiền giường bệnh nội trú", cost: "3.500.000 đ", status: "BHYT chi trả 100%" },
        { label: "Thuốc điều trị trong danh mục", cost: "5.200.000 đ", status: "BHYT chi trả 100%" },
        { label: "Xét nghiệm & Chẩn đoán hình ảnh", cost: "2.800.000 đ", status: "BHYT chi trả 100%" },
        { label: "Công khám & Dịch vụ kỹ thuật", cost: "1.500.000 đ", status: "BHYT chi trả 100%" },
      ].map((row, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#e2e8f0" }}>{row.label}</div>
            <div style={{ fontSize: 22, color: "#34d399", fontWeight: 700, marginTop: 4 }}>✔ {row.status}</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#94a3b8", textDecoration: "line-through" }}>
            {row.cost}
          </div>
        </div>
      ))}

      {/* Total row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
          paddingTop: 14,
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 900, color: "#f8fafc" }}>PHẦN BỆNH NHÂN TRẢ:</div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#10b981" }}>0 ĐỒNG (ĐÚNG TUYẾN)</div>
      </div>

      {/* BIG PAID STAMP */}
      {stampProgress > 0 && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(-12deg) scale(${stampProgress})`,
            border: "8px solid #10b981",
            borderRadius: 24,
            padding: "20px 48px",
            background: "rgba(6, 78, 59, 0.92)",
            boxShadow: "0 20px 50px rgba(16, 185, 129, 0.6)",
            color: "#34d399",
            textAlign: "center",
            zIndex: 40,
          }}
        >
          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: 2 }}>BHYT ĐÃ CHI TRẢ</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#ecfdf5" }}>100% TRONG DANH MỤC</div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 5. FAMILY HOUSE & CASHFLOW NETWORK (Scene 3)
// ============================================================================
export const FamilyCashflowSystem: React.FC<{
  zoomProgress: number; // 0 to 1
  valveClosed: boolean;
}> = ({ zoomProgress, valveClosed }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: MOBILE_LAYOUT.centerAnchorY - 30, // Slight adjustment for balance
        transform: "translate(-50%, -50%)",
        width: 1000,
        height: 760,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 22,
      }}
    >
      {/* Top Income Pipes from Parents */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          marginBottom: 30,
        }}
      >
        {/* Parent 1 */}
        <div
          style={{
            background: valveClosed ? "rgba(220, 38, 38, 0.25)" : "rgba(16, 185, 129, 0.25)",
            border: `3px solid ${valveClosed ? "#f87171" : "#34d399"}`,
            borderRadius: 24,
            padding: "20px 32px",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 900, color: "#f8fafc" }}>BỐ (NGHỈ LÀM)</div>
          <div style={{ fontSize: 24, color: valveClosed ? "#fca5a5" : "#6ee7b7", fontWeight: 800, marginTop: 4 }}>
            {valveClosed ? "❌ Thu nhập tạm ngưng" : "✔ Thu nhập bình thường"}
          </div>
        </div>

        {/* Valve Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: valveClosed ? "#dc2626" : "#0284c7",
            border: "4px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 35px rgba(0,0,0,0.5)",
            transform: valveClosed ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease",
          }}
        >
          <span style={{ fontSize: 40, color: "#fff" }}>⚙️</span>
        </div>

        {/* Parent 2 */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "3px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 24,
            padding: "20px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 900, color: "#f8fafc" }}>MẸ (TÚC TRỰC VIỆN)</div>
          <div style={{ fontSize: 24, color: "#94a3b8", fontWeight: 700, marginTop: 4 }}>Chăm con 24/7</div>
        </div>
      </div>

      {/* Center House Icon */}
      <div
        style={{
          width: 320,
          height: 260,
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          border: "4px solid #38bdf8",
          borderRadius: 32,
          boxShadow: "0 20px 60px rgba(56, 189, 248, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          margin: "20px 0",
        }}
      >
        <span style={{ fontSize: 90 }}>🏠</span>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#f8fafc", marginTop: 10 }}>
          NGÔI NHÀ GIA ĐÌNH
        </div>
      </div>

      {/* Expanding Cost Branches */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        {[
          { icon: "🍱", title: "Ăn uống tại viện", desc: "7 ngày phát sinh", color: "#f59e0b" },
          { icon: "🚕", title: "Đi lại / Taxi", desc: "Đưa đón liên tục", color: "#f59e0b" },
          { icon: "💊", title: "Thuốc ngoài danh mục", desc: "Lựa chọn riêng", color: "#f87171" },
          { icon: "📉", title: "Thu nhập giảm", desc: "Nghỉ làm 7 ngày", color: "#ef4444" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              border: `3px solid ${item.color}`,
              borderRadius: 24,
              padding: "20px 16px",
              width: 235,
              textAlign: "center",
              boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#f8fafc", lineHeight: 1.3 }}>{item.title}</div>
            <div style={{ fontSize: 20, color: item.color, fontWeight: 700, marginTop: 6 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 6. THREE FOUNDATION LAYERS (Scene 4 & 5)
// ============================================================================
export const ThreeLayersFoundation: React.FC<{
  layerProgress: number; // 0 to 3
  activeCirculation?: boolean;
}> = ({ layerProgress, activeCirculation = false }) => {
  const layers = [
    {
      id: 3,
      title: "TẦNG 3: BẢO HIỂM BỔ SUNG (NẾU PHÙ HỢP)",
      mission: "Chuyển giao bớt chi phí dịch vụ kỹ thuật cao & phòng riêng",
      color: "#0284c7",
      borderColor: "#38bdf8",
      bgGradient: "linear-gradient(90deg, #0369a1 0%, #0284c7 100%)",
      icon: "🛡️",
    },
    {
      id: 2,
      title: "TẦNG 2: QUỸ DỰ PHÒNG TIỀN MẶT",
      mission: "Tiền mặt cần ngay • Bù đắp 5–7 ngày bố mẹ nghỉ làm chăm con",
      color: "#d97706",
      borderColor: "#fbbf24",
      bgGradient: "linear-gradient(90deg, #b45309 0%, #f59e0b 100%)",
      icon: "💰",
    },
    {
      id: 1,
      title: "TẦNG 1: BHYT NHÀ NƯỚC (NỀN MÓNG AN SINH)",
      mission: "Chi trả phần lớn chi phí khám chữa bệnh đúng danh mục",
      color: "#047857",
      borderColor: "#34d399",
      bgGradient: "linear-gradient(90deg, #065f46 0%, #10b981 100%)",
      icon: "🏛️",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: MOBILE_LAYOUT.centerAnchorY + 180,
        transform: "translateX(-50%)",
        width: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        zIndex: 28,
      }}
    >
      {layers.map((layer, idx) => {
        // layer 1 appears first, then 2, then 3
        const isShown = layerProgress >= layer.id;
        const slideX = isShown ? 0 : 40;
        const opacity = isShown ? 1 : 0.2;

        return (
          <div
            key={layer.id}
            style={{
              background: layer.bgGradient,
              border: `4px solid ${layer.borderColor}`,
              borderRadius: 32,
              padding: "32px 40px",
              boxShadow: isShown
                ? `0 20px 50px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)`
                : "none",
              display: "flex",
              alignItems: "center",
              gap: 32,
              opacity,
              transform: `translateX(${slideX}px)`,
              transition: "all 0.4s ease",
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 22,
                background: "rgba(0, 0, 0, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                flexShrink: 0,
              }}
            >
              {layer.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.3px",
                  marginBottom: 8,
                }}
              >
                {layer.title}
              </div>
              <div
                style={{
                  fontSize: 25,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  lineHeight: 1.35,
                  opacity: 0.95,
                }}
              >
                {layer.mission}
              </div>
            </div>
            {isShown && (
              <div
                style={{
                  fontSize: 34,
                  color: "#ffffff",
                  background: "rgba(255, 255, 255, 0.25)",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✔
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// 7. HERO QUESTION CARD (Scene 5 Close)
// ============================================================================
export const HeroQuestionCard: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: MOBILE_LAYOUT.centerAnchorY - 340,
        transform: `translateX(-50%) scale(${progress})`,
        width: 1000,
        background: "rgba(15, 23, 42, 0.98)",
        border: "4px solid #38bdf8",
        borderRadius: 40,
        padding: "56px 48px",
        boxShadow: "0 40px 100px rgba(56, 189, 248, 0.55)",
        textAlign: "center",
        zIndex: 45,
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "rgba(56, 189, 248, 0.25)",
          border: "2px solid #38bdf8",
          borderRadius: 20,
          padding: "12px 32px",
          fontSize: 26,
          fontWeight: 800,
          color: "#7dd3fc",
          textTransform: "uppercase",
          marginBottom: 30,
        }}
      >
        CÂU HỎI CỐT LÕI CHO BỐ MẸ
      </div>

      <div
        style={{
          fontSize: 60,
          fontWeight: 900,
          color: "#f8fafc",
          lineHeight: 1.2,
          marginBottom: 24,
        }}
      >
        NẾU CON NẰM VIỆN 7 NGÀY...
      </div>

      <div
        style={{
          fontSize: 46,
          fontWeight: 900,
          color: "#facc15",
          lineHeight: 1.3,
        }}
      >
        DÒNG TIỀN NHÀ MÌNH CHẠY THẾ NÀO?
      </div>
    </div>
  );
};

// ============================================================================
// 8. SYNCED CAPTION SUBTITLE BAR
// ============================================================================
export const SyncedCaptions: React.FC<{
  timingWords: Array<{ word: string; startMs: number; durationMs: number }>;
}> = ({ timingWords }) => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  // Find active word
  const activeIndex = timingWords.findIndex(
    (w) => currentMs >= w.startMs && currentMs <= w.startMs + w.durationMs
  );

  // Pagination logic: break into chunks of ~7-8 words so the whole bar updates at once
  // rather than sliding erratically word-by-word.
  const chunkSize = 8;
  const chunkIndex = Math.floor(Math.max(0, activeIndex) / chunkSize);
  const startIdx = chunkIndex * chunkSize;
  const endIdx = Math.min(timingWords.length, startIdx + chunkSize);
  const visibleWords = timingWords.slice(startIdx, endIdx);

  if (visibleWords.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: MOBILE_LAYOUT.subtitleBarBottom,
        left: MOBILE_LAYOUT.safeMarginHorizontal,
        right: MOBILE_LAYOUT.safeMarginHorizontal,
        background: "rgba(3, 7, 18, 0.95)",
        backdropFilter: "blur(12px)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 24,
        padding: "20px 32px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px 14px",
        zIndex: 50,
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.65)",
      }}
    >
      {visibleWords.map((item, idx) => {
        const isCurrent = activeIndex >= 0 && timingWords[activeIndex] === item;
        return (
          <span
            key={idx}
            style={{
              fontSize: 38,
              fontWeight: isCurrent ? 900 : 700,
              color: isCurrent ? "#facc15" : "#e2e8f0",
              transform: isCurrent ? "scale(1.1)" : "scale(1)",
              textShadow: isCurrent ? "0 0 16px rgba(250, 204, 21, 0.5)" : "none",
              transition: "transform 0.15s ease",
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};
