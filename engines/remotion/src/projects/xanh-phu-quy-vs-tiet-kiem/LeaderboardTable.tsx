import React from "react";
import { FINAL_RANKINGS, RISK_SCENARIO_DATA } from "./data";

export const LeaderboardTable: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0b0e14",
        opacity,
        display: "flex",
        flexDirection: "column",
        padding: "160px 60px 100px 60px",
        zIndex: 50,
        fontFamily: "'Be Vietnam Pro', sans-serif"
      }}
    >
      {/* Header */}
      <div
        style={{
          color: "#d4af37",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 8
        }}
      >
        TÀI CHÍNH THỰC CHIẾN · SO SÁNH 20 NĂM
      </div>
      <h1
        style={{
          color: "#ffffff",
          fontSize: 54,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.2
        }}
      >
        Kết quả đường đua 30 triệu/năm
      </h1>
      <div style={{ color: "#94a3b8", fontSize: 28, marginTop: 8, marginBottom: 36 }}>
        Tổng vốn đầu tư 600 triệu · Lãi kép 20 năm
      </div>

      {/* Rankings List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {FINAL_RANKINGS.map((item) => {
          const isTop1 = item.rank === 1;

          return (
            <div
              key={item.rank}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isTop1 ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.03)",
                border: isTop1 ? "2px solid #10b981" : "1px dashed rgba(255, 255, 255, 0.2)",
                borderRadius: 18,
                padding: "24px 28px",
                boxShadow: isTop1 ? "0 0 30px rgba(16, 185, 129, 0.25)" : "none"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {/* Rank Number */}
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    color: isTop1 ? "#10b981" : "#94a3b8",
                    width: 36,
                    textAlign: "center"
                  }}
                >
                  {item.rank}
                </div>

                {/* Badge & Name */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        backgroundColor: isTop1 ? "#059669" : "#334155",
                        color: "#ffffff",
                        fontSize: 20,
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 6
                      }}
                    >
                      {item.code}
                    </div>
                    <div style={{ color: "#ffffff", fontSize: 32, fontWeight: 800 }}>
                      {item.name}
                    </div>
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 24, marginTop: 4 }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {/* Total & Multiplier */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: isTop1 ? "#34d399" : "#ffffff",
                    fontSize: 40,
                    fontWeight: 900
                  }}
                >
                  {item.total}
                </div>
                <div
                  style={{
                    color: isTop1 ? "#10b981" : "#94a3b8",
                    fontSize: 24,
                    fontWeight: 700,
                    marginTop: 2
                  }}
                >
                  {item.multiplier}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk Scenario Callout (Năm thứ 3) */}
      <div
        style={{
          marginTop: 40,
          backgroundColor: "rgba(212, 175, 55, 0.08)",
          border: "2px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 20,
          padding: "24px 28px"
        }}
      >
        <div
          style={{
            color: "#d4af37",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "0.05em",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10
          }}
        >
          <span>⚡</span>
          <span>{RISK_SCENARIO_DATA.title}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Tiết kiệm */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              padding: "14px 18px",
              borderRadius: 12
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: 26, fontWeight: 600 }}>
              Gửi tiết kiệm ngân hàng
            </span>
            <span style={{ color: "#e2e8f0", fontSize: 28, fontWeight: 800 }}>
              100 Triệu
            </span>
          </div>

          {/* Xanh Phú Quý Flex */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid #10b981",
              padding: "14px 18px",
              borderRadius: 12
            }}
          >
            <div>
              <span style={{ color: "#ffffff", fontSize: 26, fontWeight: 800 }}>
                Xanh Phú Quý Flex
              </span>
              <span style={{ color: "#34d399", fontSize: 20, marginLeft: 8, fontWeight: 600 }}>
                (Khiên 1,5 Tỷ + 60tr GTTK)
              </span>
            </div>
            <span style={{ color: "#34d399", fontSize: 32, fontWeight: 900 }}>
              1,56 TỶ ĐỒNG
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div
        style={{
          marginTop: "auto",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: 22,
          lineHeight: 1.4
        }}
      >
        Số vốn ban đầu 30 triệu/năm · Quỹ cổ phiếu kỳ vọng 9.5%/năm · Tiết kiệm lãi kép 5.5%/năm
      </div>
    </div>
  );
};
