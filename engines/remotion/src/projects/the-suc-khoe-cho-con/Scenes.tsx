import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { MOBILE_LAYOUT, MOBILE_TYPOGRAPHY, MOBILE_COLORS } from "../../shared/design-system";

// ============================================================================
// 1. GLOBAL MEDICAL AMBIENT BACKDROP (High-End Mesh & Blueprint)
// ============================================================================
export const MedicalBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const auraPulse = Math.sin(frame * 0.04) * 0.05 + 0.95;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 25%, #0d1e38 0%, #030712 60%, #020617 100%)",
      }}
    >
      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: "50%",
          transform: `translateX(-50%) scale(${auraPulse})`,
          width: 880,
          height: 880,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// 2. HERO HEALTH CARD (Scene 1: Hook)
// ============================================================================
export const KidsHealthCard: React.FC<{
  progress: number;
}> = ({ progress }) => {
  const frame = useCurrentFrame();
  const cardFloat = Math.sin(frame * 0.07) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 290 + cardFloat,
        transform: `translateX(-50%) scale(${0.94 + progress * 0.06})`,
        width: 930,
        height: 440,
        borderRadius: 32,
        background: "linear-gradient(135deg, #0369a1 0%, #0284c7 45%, #0ea5e9 100%)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 25px 60px rgba(2, 132, 199, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
        padding: "36px 44px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        zIndex: 20,
        opacity: progress,
      }}
    >
      {/* Card Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "#38bdf8",
              border: "2px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <span style={{ fontSize: 32, color: "#034066", fontWeight: 900 }}>✚</span>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#bae6fd", letterSpacing: 1.5 }}>
              MANULIFE VIỆT NAM
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff" }}>
              SỐNG KHỎE MỖI NGÀY 2024
            </div>
          </div>
        </div>

        {/* Chip Icon */}
        <div
          style={{
            width: 64,
            height: 48,
            borderRadius: 10,
            background: "linear-gradient(135deg, #fef08a 0%, #eab308 100%)",
            border: "1px solid #ca8a04",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div style={{ width: 44, height: 2, background: "rgba(0,0,0,0.35)" }} />
          <div style={{ width: 44, height: 2, background: "rgba(0,0,0,0.35)" }} />
        </div>
      </div>

      {/* Card Body */}
      <div>
        <div style={{ fontSize: 24, color: "#e0f2fe", fontWeight: 700, letterSpacing: 1 }}>
          CHƯƠNG TRÌNH CHĂM SÓC SỨC KHỎE CHO CON
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", letterSpacing: 1.2, marginTop: 6 }}>
          THẺ BẢO LÃNH NỘI TRÚ
        </div>
      </div>

      {/* Card Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(255,255,255,0.25)",
          paddingTop: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 20, color: "#bae6fd", fontWeight: 700 }}>3 HẠNG THẺ CHỦ LỰC</div>
          <div style={{ fontSize: 34, fontWeight: 900, color: "#fef08a" }}>BẠC • TITAN • VÀNG</div>
        </div>
        <div
          style={{
            padding: "8px 20px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontSize: 22,
            fontWeight: 800,
            color: "#ffffff",
          }}
        >
          BẢN CẢI TIẾN
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. TWO METRIC GAUGES (Scene 1: 2 Câu Hỏi Đầu Tiên)
// ============================================================================
export const TwoMetricGauges: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const oscillate = Math.sin(frame * 0.08) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 770,
        transform: `translateX(-50%) translateY(${(1 - progress) * 25}px)`,
        width: 930,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        opacity: progress,
        zIndex: 25,
      }}
    >
      {/* Metric 1 */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.88)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(56, 189, 248, 0.4)",
          borderRadius: 24,
          padding: "24px 34px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 35px rgba(2, 132, 199, 0.2)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                background: "rgba(2, 132, 199, 0.3)",
                border: "1px solid #38bdf8",
                color: "#7dd3fc",
                fontSize: 22,
                fontWeight: 800,
                padding: "3px 12px",
                borderRadius: 10,
              }}
            >
              CÂU HỎI 1
            </span>
            <span style={{ fontSize: 36, fontWeight: 900, color: "#ffffff" }}>
              MỘT NĂM ĐÓNG BAO NHIÊU?
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#94a3b8", marginTop: 8 }}>
            Phí đóng mỗi năm là yếu tố phụ huynh nhìn vào đầu tiên
          </div>
        </div>
        <div
          style={{
            background: "rgba(56, 189, 248, 0.15)",
            border: "1px solid #38bdf8",
            borderRadius: 16,
            padding: "12px 20px",
            fontSize: 26,
            fontWeight: 800,
            color: "#38bdf8",
          }}
        >
          PHÍ 1 NĂM
        </div>
      </div>

      {/* Metric 2 */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.88)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(250, 204, 21, 0.4)",
          borderRadius: 24,
          padding: "24px 34px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 35px rgba(250, 204, 21, 0.15)",
          transform: `translateY(${oscillate}px)`,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                background: "rgba(202, 138, 4, 0.3)",
                border: "1px solid #facc15",
                color: "#fef08a",
                fontSize: 22,
                fontWeight: 800,
                padding: "3px 12px",
                borderRadius: 10,
              }}
            >
              CÂU HỎI 2
            </span>
            <span style={{ fontSize: 36, fontWeight: 900, color: "#ffffff" }}>
              HẠN MỨC ĐƯỢC BAO NHIÊU?
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#94a3b8", marginTop: 8 }}>
            Tổng số tiền bảo hiểm chi trả tối đa trong năm
          </div>
        </div>
        <div
          style={{
            background: "rgba(250, 204, 21, 0.15)",
            border: "1px solid #facc15",
            borderRadius: 16,
            padding: "12px 20px",
            fontSize: 26,
            fontWeight: 800,
            color: "#facc15",
          }}
        >
          HẠN MỨC
        </div>
      </div>

      {/* Insight Banner */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.9)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: 20,
          padding: "20px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
          💡 <span style={{ color: "#38bdf8" }}>Hai con số dễ so nhất</span> nhưng chưa đủ để phản ánh nhu cầu thực tế!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SPLIT CARD COMPARISON (Scene 2: 250M vs 500M)
// ============================================================================
export const SplitCardComparison: React.FC<{
  progress: number;
  highlightPull: boolean;
}> = ({ progress, highlightPull }) => {
  const frame = useCurrentFrame();
  const pullShake = highlightPull ? Math.sin(frame * 0.2) * 3 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 310,
        transform: "translateX(-50%)",
        width: 930,
        zIndex: 25,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Card 1: 250M */}
        <div
          style={{
            background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
            border: "1.5px solid rgba(148, 163, 184, 0.4)",
            borderRadius: 26,
            padding: "30px 38px",
            boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
            transform: `scale(${progress})`,
            opacity: progress,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  background: "#334155",
                  color: "#cbd5e1",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: 10,
                }}
              >
                HẠNG TITAN
              </span>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#94a3b8" }}>
                HẠN MỨC TIÊU CHUẨN
              </span>
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#f8fafc", margin: "8px 0" }}>
              250 TRIỆU <span style={{ fontSize: 30, color: "#94a3b8", fontWeight: 700 }}>/ NĂM</span>
            </div>
            <div style={{ fontSize: 28, color: "#cbd5e1", fontWeight: 600 }}>
              Hạn mức nội trú vừa vặn cho đa số nhu cầu
            </div>
          </div>
          <div
            style={{
              background: "#334155",
              borderRadius: 18,
              padding: "16px 24px",
              fontSize: 26,
              fontWeight: 800,
              color: "#cbd5e1",
            }}
          >
            MỨC VỪA PHẢI
          </div>
        </div>

        {/* Card 2: 500M with Magnet Pull */}
        <div
          style={{
            background: "linear-gradient(90deg, #713f12 0%, #ca8a04 100%)",
            border: "2px solid #fef08a",
            borderRadius: 26,
            padding: "30px 38px",
            boxShadow: "0 22px 55px rgba(234, 179, 8, 0.35)",
            transform: `scale(${progress * (highlightPull ? 1.02 : 1)}) translateY(${pullShake}px)`,
            opacity: progress,
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  background: "#854d0e",
                  color: "#fef08a",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: 10,
                }}
              >
                HẠNG VÀNG
              </span>
              <span style={{ fontSize: 30, fontWeight: 800, color: "#fef08a" }}>
                HẠN MỨC GẤP ĐÔI
              </span>
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, color: "#ffffff", margin: "8px 0" }}>
              500 TRIỆU <span style={{ fontSize: 30, color: "#fef08a", fontWeight: 700 }}>/ NĂM</span>
            </div>
            <div style={{ fontSize: 28, color: "#fef9c3", fontWeight: 600 }}>
              Con số trần rất lớn, tạo tâm lý cực kỳ an tâm
            </div>
          </div>

          <div
            style={{
              background: "#dc2626",
              border: "2px solid #ffffff",
              borderRadius: 18,
              padding: "14px 22px",
              fontSize: 26,
              fontWeight: 900,
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(220, 38, 38, 0.5)",
              textAlign: "center",
            }}
          >
            CỐ THÊM CHÚT<br />CHO CHẮC?
          </div>
        </div>
      </div>

      {/* Tension Callout Card */}
      <div
        style={{
          marginTop: 28,
          background: "rgba(15, 23, 42, 0.92)",
          border: "2px solid rgba(245, 158, 11, 0.6)",
          borderRadius: 24,
          padding: "28px 36px",
          textAlign: "center",
          boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
          opacity: progress,
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 900, color: "#facc15" }}>
          "THÔI CỐ THÊM CHÚT LẤY 500 TRIỆU CHO CHẮC"
        </div>
        <div style={{ fontSize: 28, color: "#cbd5e1", fontWeight: 600, marginTop: 10 }}>
          Bẫy tâm lý: Hạn mức trần chưa chắc là thứ con chạm tới đầu tiên khi nằm viện!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. HOSPITAL PORTAL & LOCATION PIN (Scene 3: Reframe)
// ============================================================================
export const HospitalPortal: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const pinBounce = Math.sin(frame * 0.1) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 310,
        transform: `translateX(-50%) scale(${0.94 + progress * 0.06})`,
        width: 930,
        zIndex: 25,
        opacity: progress,
      }}
    >
      {/* Hospital Portal Card */}
      <div
        style={{
          width: "100%",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          border: "2px solid rgba(56, 189, 248, 0.6)",
          borderRadius: 30,
          boxShadow: "0 25px 65px rgba(2, 132, 199, 0.35)",
          padding: "32px 38px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#0284c7",
            border: "3px solid #7dd3fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(56, 189, 248, 0.4)",
          }}
        >
          <span style={{ fontSize: 40, color: "#ffffff", fontWeight: 900 }}>✚</span>
        </div>

        <div style={{ fontSize: 42, fontWeight: 900, color: "#ffffff", marginTop: 14 }}>
          BỆNH VIỆN ĐIỀU TRỊ CỦA CON
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#7dd3fc", marginTop: 6 }}>
          CÂU HỎI THỰC TẾ TRƯỚC TIÊN BỐ MẸ NÊN HỎI
        </div>

        {/* Location Pin */}
        <div
          style={{
            marginTop: 20,
            transform: `translateY(${pinBounce}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "14px 34px",
              background: "#ef4444",
              borderRadius: 24,
              fontSize: 34,
              fontWeight: 900,
              color: "#ffffff",
              boxShadow: "0 10px 25px rgba(239, 68, 68, 0.5)",
              textAlign: "center",
            }}
          >
            📍 NHÀ MÌNH ĐỊNH CHO CON NẰM VIỆN NÀO?
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderTop: "16px solid #ef4444",
            }}
          />
        </div>
      </div>

      {/* 3 Hospital Options */}
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff" }}>1. VIỆN CÔNG</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#cbd5e1" }}>Khoa điều trị theo yêu cầu</div>
        </div>

        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(56, 189, 248, 0.6)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 900, color: "#38bdf8" }}>2. VIỆN TƯ TIÊU CHUẨN</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#bae6fd" }}>Phòng riêng tiện nghi</div>
        </div>

        <div
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(250, 204, 21, 0.6)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 900, color: "#facc15" }}>3. VIỆN QUỐC TẾ</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#fef08a" }}>Dịch vụ cao cấp quốc tế</div>
        </div>
      </div>

      {/* Insight Banner */}
      <div
        style={{
          marginTop: 18,
          background: "rgba(15, 23, 42, 0.85)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: 18,
          padding: "18px 26px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
          💡 <span style={{ color: "#38bdf8" }}>Tuyến điều trị</span> quyết định chi phí thực tế gia đình cần chuẩn bị!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. REAL BILL & 3 FACTORS (Scene 4: Key Factors)
// ============================================================================
export const RealBillAndFactors: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 310,
        transform: `translateX(-50%) translateY(${(1 - progress) * 20}px)`,
        width: 930,
        zIndex: 25,
        opacity: progress,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Factor 1: Room Price */}
        <div
          style={{
            background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
            border: "2px solid rgba(56, 189, 248, 0.6)",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 12px 35px rgba(2, 132, 199, 0.25)",
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#38bdf8" }}>YẾU TỐ 1 (QUAN TRỌNG NHẤT)</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              TIỀN PHÒNG & GIƯỜNG / NGÀY
            </div>
            <div style={{ fontSize: 28, color: "#7dd3fc", fontWeight: 600, marginTop: 4 }}>
              Vượt trần định mức phải tự bù mỗi ngày!
            </div>
          </div>
          <div
            style={{
              background: "#0369a1",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 26,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            ĐỊNH MỨC<br />PHÒNG
          </div>
        </div>

        {/* Factor 2: Copay */}
        <div
          style={{
            background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
            border: "2px solid rgba(245, 158, 11, 0.6)",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 12px 35px rgba(245, 158, 11, 0.25)",
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b" }}>YẾU TỐ 2</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              TỶ LỆ ĐỒNG CHI TRẢ
            </div>
            <div style={{ fontSize: 28, color: "#fcd34d", fontWeight: 600, marginTop: 4 }}>
              Bảo hiểm thanh toán bao nhiêu % hóa đơn viện phí?
            </div>
          </div>
          <div
            style={{
              background: "#b45309",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 26,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            CO-PAY<br />TỶ LỆ %
          </div>
        </div>

        {/* Factor 3: Outpatient */}
        <div
          style={{
            background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 12px 35px rgba(16, 185, 129, 0.25)",
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#10b981" }}>YẾU TỐ 3</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              CÓ CẦN NGOẠI TRÚ?
            </div>
            <div style={{ fontSize: 28, color: "#6ee7b7", fontWeight: 600, marginTop: 4 }}>
              Khám thông thường tự chi trả hay mua thêm bảo lãnh?
            </div>
          </div>
          <div
            style={{
              background: "#047857",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 26,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            TÙY<br />CHỌN
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div
        style={{
          marginTop: 22,
          background: "rgba(15, 23, 42, 0.92)",
          border: "1.5px solid #ef4444",
          borderRadius: 20,
          padding: "20px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
          ⚠️ <span style={{ color: "#ef4444", fontWeight: 900 }}>Lưu ý:</span> Tiền phòng vượt trần phải bù mỗi ngày, hạn mức trăm triệu cũng không bù được!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 7. THREE-TIER PRODUCT BRIDGE (Scene 5: Bạc, Titan, Vàng)
// ============================================================================
export const ThreeTierPodium: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 310,
        transform: "translateX(-50%)",
        width: 930,
        zIndex: 25,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Tier 1: BAC */}
        <div
          style={{
            background: activeStep >= 1 ? "linear-gradient(90deg, #334155 0%, #1e293b 100%)" : "rgba(30,41,59,0.4)",
            border: activeStep >= 1 ? "2px solid #cbd5e1" : "1px solid #475569",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: activeStep >= 1 ? "0 12px 30px rgba(203, 213, 225, 0.2)" : "none",
            transform: activeStep >= 1 ? "scale(1)" : "scale(0.98)",
            transition: "all 0.2s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  background: "#64748b",
                  color: "#ffffff",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: 10,
                }}
              >
                HẠNG BẠC
              </span>
              <span style={{ fontSize: 38, fontWeight: 900, color: "#ffffff" }}>
                125 TRIỆU / NĂM
              </span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#cbd5e1", marginTop: 8 }}>
              Tiền phòng & giường: <span style={{ color: "#fef08a", fontWeight: 800 }}>750.000 đ/ngày</span>
            </div>
          </div>
          <div
            style={{
              background: "rgba(100, 116, 139, 0.3)",
              border: "1px solid #cbd5e1",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 24,
              fontWeight: 800,
              color: "#e2e8f0",
              textAlign: "right",
            }}
          >
            Khớp Viện Công<br />chất lượng cao
          </div>
        </div>

        {/* Tier 2: TITAN */}
        <div
          style={{
            background: activeStep >= 2 ? "linear-gradient(90deg, #0369a1 0%, #0f172a 100%)" : "rgba(30,41,59,0.4)",
            border: activeStep >= 2 ? "2px solid #38bdf8" : "1px solid #475569",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: activeStep >= 2 ? "0 15px 35px rgba(56, 189, 248, 0.3)" : "none",
            transform: activeStep >= 2 ? "scale(1.02)" : "scale(0.98)",
            transition: "all 0.2s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  background: "#0284c7",
                  color: "#ffffff",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: 10,
                }}
              >
                HẠNG TITAN
              </span>
              <span style={{ fontSize: 40, fontWeight: 900, color: "#ffffff" }}>
                250 TRIỆU / NĂM
              </span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#7dd3fc", marginTop: 8 }}>
              Tiền phòng & giường: <span style={{ color: "#ffffff", fontWeight: 800 }}>1.500.000 đ/ngày</span>
            </div>
          </div>
          <div
            style={{
              background: "rgba(2, 132, 199, 0.3)",
              border: "1px solid #38bdf8",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 24,
              fontWeight: 800,
              color: "#bae6fd",
              textAlign: "right",
            }}
          >
            Khớp Viện Tư<br />tiêu chuẩn
          </div>
        </div>

        {/* Tier 3: VANG */}
        <div
          style={{
            background: activeStep >= 3 ? "linear-gradient(90deg, #854d0e 0%, #ca8a04 100%)" : "rgba(30,41,59,0.4)",
            border: activeStep >= 3 ? "2px solid #fef08a" : "1px solid #475569",
            borderRadius: 24,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: activeStep >= 3 ? "0 18px 45px rgba(234, 179, 8, 0.4)" : "none",
            transform: activeStep >= 3 ? "scale(1.03)" : "scale(0.98)",
            transition: "all 0.2s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  background: "#ca8a04",
                  color: "#ffffff",
                  fontSize: 22,
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: 10,
                }}
              >
                HẠNG VÀNG
              </span>
              <span style={{ fontSize: 42, fontWeight: 900, color: "#ffffff" }}>
                500 TRIỆU / NĂM
              </span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#fef9c3", marginTop: 8 }}>
              Tiền phòng & giường: <span style={{ color: "#ffffff", fontWeight: 800 }}>2.500.000 đ/ngày</span>
            </div>
          </div>
          <div
            style={{
              background: "rgba(202, 138, 4, 0.3)",
              border: "1px solid #fef08a",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 24,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "right",
            }}
          >
            Khớp Viện Tư<br />Quốc tế cao cấp
          </div>
        </div>
      </div>

      {/* Decision Guide Banner */}
      <div
        style={{
          marginTop: 22,
          background: "rgba(15, 23, 42, 0.9)",
          border: "1.5px solid rgba(250, 204, 21, 0.6)",
          borderRadius: 20,
          padding: "20px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
          🎯 <span style={{ color: "#facc15", fontWeight: 900 }}>Quy tắc:</span> Chọn hạng thẻ khớp với giá phòng thực tế tại viện dự kiến!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. PERFECT-FIT TAKEAWAY (Scene 6: Close)
// ============================================================================
export const PerfectFitTakeaway: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 330,
        transform: `translateX(-50%) scale(${0.94 + progress * 0.06})`,
        width: 930,
        zIndex: 25,
        opacity: progress,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          border: "2px solid #34d399",
          borderRadius: 32,
          padding: "40px 38px",
          textAlign: "center",
          boxShadow: "0 25px 65px rgba(5, 150, 105, 0.4)",
          position: "relative",
        }}
      >
        {/* Stamp */}
        <div
          style={{
            position: "absolute",
            top: -22,
            right: 36,
            background: "#eab308",
            border: "2px solid #ffffff",
            borderRadius: 20,
            padding: "8px 24px",
            fontSize: 26,
            fontWeight: 900,
            color: "#0f172a",
            boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
            transform: "rotate(-4deg)",
          }}
        >
          ✓ VỪA VẶN HOÀN HẢO
        </div>

        <div style={{ fontSize: 26, fontWeight: 800, color: "#a7f3d0", letterSpacing: 2 }}>
          NGUYÊN TẮC CHỌN THẺ CHO CON
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", margin: "16px 0", lineHeight: 1.25 }}>
          ĐỪNG CHỈ MUA<br />CON SỐ HẠN MỨC LỚN!
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: "#fef08a",
            background: "rgba(0,0,0,0.25)",
            padding: "18px 26px",
            borderRadius: 20,
            marginTop: 10,
            lineHeight: 1.35,
          }}
        >
          HÃY CHỌN CHIẾC THẺ VỪA VẶN VỚI BỆNH VIỆN VÀ TÀI CHÍNH GIA ĐÌNH
        </div>
      </div>

      {/* Concluding Message */}
      <div
        style={{
          marginTop: 28,
          background: "rgba(15, 23, 42, 0.9)",
          border: "1.5px solid rgba(16, 185, 129, 0.5)",
          borderRadius: 22,
          padding: "22px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
          👨‍👩‍👧‍👦 Không có chiếc thẻ tốt nhất cho mọi đứa trẻ. Chỉ có chiếc thẻ <span style={{ color: "#34d399", fontWeight: 800 }}>vừa vặn nhất</span> với thói quen y tế của con!
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 9. DYNAMIC SPEECH-SYNCED CAPTIONS (Single-Line Floating Glass Pill)
// ============================================================================
export const SyncedCaptions: React.FC<{
  timingWords: Array<{ word: string; startMs: number; durationMs: number }>;
}> = ({ timingWords }) => {
  const frame = useCurrentFrame();
  const currentMs = (frame / 30) * 1000;

  // Find currently spoken word (with 50ms continuity buffer)
  const activeIndex = timingWords.findIndex(
    (w) => currentMs >= w.startMs - 40 && currentMs <= w.startMs + w.durationMs + 50
  );

  // RULE: "Không đọc thì không hiện sub"
  if (activeIndex === -1) {
    return null;
  }

  // Group into short natural phrases (5 words per phrase)
  const phraseSize = 5;
  const phraseIndex = Math.floor(activeIndex / phraseSize);
  const startIdx = phraseIndex * phraseSize;
  const endIdx = Math.min(timingWords.length, startIdx + phraseSize);
  const visibleWords = timingWords.slice(startIdx, endIdx);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 140,
        left: "50%",
        transform: "translateX(-50%)",
        width: 880,
        background: "rgba(3, 7, 18, 0.9)",
        backdropFilter: "blur(16px)",
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 24,
        padding: "16px 28px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px 14px",
        zIndex: 80,
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.7)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {visibleWords.map((item, idx) => {
        const isCurrent = timingWords[activeIndex] === item;
        const isSpoken = currentMs >= item.startMs - 20;

        return (
          <span
            key={idx}
            style={{
              fontSize: isCurrent ? 38 : 34,
              fontWeight: isCurrent ? 900 : 700,
              color: isCurrent ? "#facc15" : isSpoken ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
              transform: isCurrent ? "scale(1.12)" : "scale(1)",
              textShadow: isCurrent ? "0 0 16px rgba(250, 204, 21, 0.75)" : "none",
              transition: "transform 0.1s ease, color 0.1s ease",
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
