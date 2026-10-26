import React from "react";
import { ASSETS_META, DataPoint } from "./data";

interface ChartProps {
  progress: number; // 0 to 1
  timeline: DataPoint[];
}

export const FixedHeader: React.FC<{
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}> = ({
  eyebrow = "TÀI CHÍNH THỰC CHIẾN · SO SÁNH 30 TRIỆU/NĂM",
  title = "Đường đua tích lũy 20 năm",
  subtitle = "Xanh Phú Quý Flex vs Gửi tiết kiệm ngân hàng"
}) => {
  return (
    <div style={{ position: "absolute", top: 160, left: 60, right: 60, zIndex: 10 }}>
      <div
        style={{
          color: "#d4af37",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 10
        }}
      >
        {eyebrow}
      </div>
      <h1
        style={{
          color: "#ffffff",
          fontSize: 58,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: "-0.01em"
        }}
      >
        {title}
      </h1>
      <div
        style={{
          color: "#94a3b8",
          fontSize: 32,
          marginTop: 10,
          fontWeight: 500
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export const RaceLineChart: React.FC<ChartProps> = ({ progress, timeline }) => {
  const chartWidth = 960;
  const chartHeight = 720;
  const originX = 60;
  const originY = 460;

  // Total steps & active timeline index
  const totalSteps = timeline.length - 1;
  const exactIndex = progress * totalSteps;
  const currentIndex = Math.min(Math.floor(exactIndex), totalSteps);
  const nextIndex = Math.min(currentIndex + 1, totalSteps);
  const lerpFactor = exactIndex - Math.floor(exactIndex);

  // Compute current interpolated values
  const currentPoint = timeline[currentIndex];
  const nextPoint = timeline[nextIndex];

  const currentValues: { flex: number; savings: number } = {
    flex: Math.round(currentPoint.flex + (nextPoint.flex - currentPoint.flex) * lerpFactor),
    savings: Math.round(currentPoint.savings + (nextPoint.savings - currentPoint.savings) * lerpFactor)
  };

  // Adaptive Y-ceiling based on current maximum value
  const maxVal = Math.max(currentValues.flex, currentValues.savings);
  let yCeiling = 200;
  if (maxVal > 1200) yCeiling = 2000;
  else if (maxVal > 700) yCeiling = 1200;
  else if (maxVal > 350) yCeiling = 600;
  else if (maxVal > 150) yCeiling = 300;

  // Coordinate mapping functions
  const getX = (index: number, subT: number = 0) => {
    return originX + ((index + subT) / totalSteps) * (chartWidth - 220);
  };

  const getY = (val: number) => {
    const ratio = Math.min(Math.max(val / yCeiling, 0), 1);
    return originY + chartHeight - ratio * chartHeight;
  };

  // Identify leading asset
  const leaderKey = currentValues.flex >= currentValues.savings ? "flex" : "savings";

  // Grid steps (4 levels)
  const gridSteps = 4;
  const gridLevels = Array.from({ length: gridSteps + 1 }, (_, i) =>
    Math.round((yCeiling / gridSteps) * i)
  );

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1920 }}>
      {/* Background Grid Lines & Y-Axis Labels */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {gridLevels.map((lvl, idx) => {
          const y = getY(lvl);
          return (
            <g key={idx}>
              <line
                x1={originX}
                y1={y}
                x2={originX + chartWidth}
                y2={y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text
                x={originX}
                y={y - 8}
                fill="rgba(255, 255, 255, 0.45)"
                fontSize="24"
                fontWeight="600"
                fontFamily="'Be Vietnam Pro', sans-serif"
              >
                {lvl >= 1000 ? `${(lvl / 1000).toFixed(2)} tỷ` : `${lvl} tr`}
              </text>
            </g>
          );
        })}

        {/* Milestone Event Markers (Dashed vertical lines & badges) */}
        {timeline.map((pt, idx) => {
          if (!pt.event || idx > currentIndex + 1) return null;
          const x = getX(idx);
          const opacity = idx <= currentIndex ? 1 : lerpFactor;
          const isShield = pt.event.includes("Khiên");

          return (
            <g key={`event-${idx}`} opacity={opacity}>
              <line
                x1={x}
                y1={originY + 20}
                x2={x}
                y2={originY + chartHeight}
                stroke={isShield ? "#10b981" : "rgba(212, 175, 55, 0.7)"}
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <rect
                x={x - 65}
                y={originY - 8}
                width={130}
                height={34}
                rx={8}
                fill={isShield ? "#059669" : "#d4af37"}
              />
              <text
                x={x}
                y={originY + 16}
                fill={isShield ? "#ffffff" : "#000000"}
                fontSize="18"
                fontWeight="800"
                textAnchor="middle"
                fontFamily="'Be Vietnam Pro', sans-serif"
              >
                {pt.event}
              </text>
            </g>
          );
        })}

        {/* Dynamic Multi-line Paths */}
        {ASSETS_META.map((meta) => {
          const key = meta.id as "flex" | "savings";
          const points: string[] = [];

          for (let i = 0; i <= currentIndex; i++) {
            const x = getX(i);
            const y = getY(timeline[i][key]);
            points.push(`${x},${y}`);
          }

          if (currentIndex < totalSteps) {
            const tipX = getX(currentIndex, lerpFactor);
            const tipY = getY(currentValues[key]);
            points.push(`${tipX},${tipY}`);
          }

          if (points.length < 2) return null;

          const isBenchmark = meta.isBenchmark;
          const isLeader = meta.id === leaderKey;

          return (
            <g key={meta.id}>
              {/* Leader Glow */}
              {isLeader && (
                <polyline
                  points={points.join(" ")}
                  fill="none"
                  stroke={meta.color}
                  strokeWidth="12"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {/* Main Line */}
              <polyline
                points={points.join(" ")}
                fill="none"
                stroke={meta.color}
                strokeWidth={isLeader ? "6" : isBenchmark ? "3.5" : "4.5"}
                strokeDasharray={isBenchmark ? "6 6" : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>

      {/* Head Badges Tracking Realtime Positions with Collision Separation */}
      {(() => {
        const sortedAssets = [...ASSETS_META].sort(
          (a, b) => currentValues[b.id as "flex" | "savings"] - currentValues[a.id as "flex" | "savings"]
        );
        const tipX = getX(currentIndex, lerpFactor);
        const minGap = 54;

        // Calculate initial Y positions
        const positions: Record<string, number> = {};
        sortedAssets.forEach((meta) => {
          positions[meta.id] = getY(currentValues[meta.id as "flex" | "savings"]);
        });

        // Enforce vertical non-overlapping separation
        for (let i = 1; i < sortedAssets.length; i++) {
          const prevId = sortedAssets[i - 1].id;
          const currId = sortedAssets[i].id;
          if (positions[currId] < positions[prevId] + minGap) {
            positions[currId] = positions[prevId] + minGap;
          }
        }

        return sortedAssets.map((meta) => {
          const val = currentValues[meta.id as "flex" | "savings"];
          const badgeY = positions[meta.id];
          const isLeader = meta.id === leaderKey;
          const isFlex = meta.id === "flex";

          return (
            <div
              key={meta.id}
              style={{
                position: "absolute",
                left: tipX + 16,
                top: badgeY - 24,
                display: "flex",
                alignItems: "center",
                gap: 10,
                zIndex: isLeader ? 35 : 20
              }}
            >
              {/* Asset Badge Card */}
              <div
                style={{
                  backgroundColor: isFlex ? "#059669" : "#334155",
                  color: "#ffffff",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 22,
                  boxShadow: isLeader
                    ? "0 0 20px rgba(16, 185, 129, 0.7)"
                    : "0 4px 10px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: isLeader ? "2px solid #34d399" : "1px solid rgba(255,255,255,0.2)"
                }}
              >
                {isLeader && <span style={{ color: "#fef08a", fontSize: 20 }}>★</span>}
                <span>{meta.code}</span>
              </div>

              {/* Value Pill */}
              <div
                style={{
                  backgroundColor: isLeader ? "#10b981" : "rgba(255,255,255,0.12)",
                  color: isLeader ? "#ffffff" : "#e2e8f0",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 24,
                  border: isLeader ? "1px solid #34d399" : "1px solid rgba(255,255,255,0.15)",
                  whiteSpace: "nowrap"
                }}
              >
                {val >= 1000 ? `${(val / 1000).toFixed(2)} tỷ` : `${val} tr`}
              </div>
            </div>
          );
        });
      })()}

      {/* Bottom Anchor: Giant Year Ticker & Dynamic Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 60,
          right: 60,
          zIndex: 40
        }}
      >
        {/* Giant Year Row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 14 }}>
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "#d4af37",
              lineHeight: 1,
              letterSpacing: "-0.03em"
            }}
          >
            {currentPoint.year}
          </span>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#94a3b8" }}>
            (Năm {currentPoint.year - 2025})
          </span>
        </div>

        {/* Dynamic Subtitle with Keyword Highlight */}
        {currentPoint.subtitle && (
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.35
            }}
          >
            {currentPoint.subtitle.text.split(currentPoint.subtitle.highlight).map((part, i, arr) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      color: "#10b981",
                      borderBottom: "3px solid #10b981",
                      paddingBottom: 2,
                      margin: "0 6px"
                    }}
                  >
                    {currentPoint.subtitle!.highlight}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
