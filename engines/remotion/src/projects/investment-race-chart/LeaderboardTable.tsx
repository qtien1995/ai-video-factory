import React from "react";
import { FINAL_RANKINGS } from "./data";

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
        zIndex: 50
      }}
    >
      {/* Header */}
      <div style={{ color: "#d4af37", fontSize: 26, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
        TÀI CHÍNH THỰC CHIẾN · 100 TRIỆU VN30
      </div>
      <h1 style={{ color: "#ffffff", fontSize: 52, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
        100 triệu sau 2019–2026
      </h1>
      <div style={{ color: "#94a3b8", fontSize: 28, marginTop: 8, marginBottom: 40 }}>
        Mua 02/01/2019 · giá cập nhật 2026
      </div>

      {/* Rankings List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {FINAL_RANKINGS.filter(r => !r.isBenchmark).map((item) => {
          const isTop1 = item.rank === 1;
          return (
            <div
              key={item.rank}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isTop1 ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.04)",
                border: isTop1 ? "2px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 16,
                padding: "20px 24px",
                boxShadow: isTop1 ? "0 0 25px rgba(212, 175, 55, 0.25)" : "none"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {/* Rank Number */}
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: isTop1 ? "#d4af37" : "#94a3b8",
                    width: 32,
                    textAlign: "center"
                  }}
                >
                  {item.rank}
                </div>

                {/* Logo & Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      fontSize: 20,
                      fontWeight: 800,
                      padding: "6px 10px",
                      borderRadius: 8
                    }}
                  >
                    {item.code}
                  </div>
                  <div>
                    <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}>
                      {item.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total & Multiplier */}
              <div style={{ textAlign: "right" }}>
                <div style={{ color: isTop1 ? "#d4af37" : "#ffffff", fontSize: 34, fontWeight: 800 }}>
                  {item.total}
                </div>
                <div style={{ color: "#22c55e", fontSize: 24, fontWeight: 700, marginTop: 2 }}>
                  {item.multiplier}
                </div>
              </div>
            </div>
          );
        })}

        {/* Benchmark (Gửi tiết kiệm) */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: 16,
            padding: "18px 24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ color: "#94a3b8", fontSize: 28, fontWeight: 600 }}>
              Gửi tiết kiệm ngân hàng
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#e2e8f0", fontSize: 30, fontWeight: 700 }}>
              140 triệu
            </div>
            <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 600 }}>
              x1.4
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div style={{ marginTop: "auto", textAlign: "center", color: "rgba(255, 255, 255, 0.4)", fontSize: 24 }}>
        Số vốn ban đầu: 100 triệu đồng · Lợi nhuận gộp cổ tức
      </div>
    </div>
  );
};
