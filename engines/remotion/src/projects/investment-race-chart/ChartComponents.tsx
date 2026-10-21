import React from "react";
import { DataPoint, STOCKS_META } from "./data";

interface ChartProps {
  progress: number; // 0 to 1
  timeline: DataPoint[];
}

export const FixedHeader: React.FC<{
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}> = ({
  eyebrow = "HODL.VN · 100 TRIỆU VN30",
  title = "Mua ngày 02/01/2019, giữ tới nay",
  subtitle = "Giữ nguyên, cổ tức mua thêm cổ phiếu"
}) => {
  return (
    <div style={{ position: "absolute", top: 180, left: 60, right: 60, zIndex: 10 }}>
      <div style={{ color: "#d4af37", fontSize: 30, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
        {eyebrow}
      </div>
      <h1 style={{ color: "#ffffff", fontSize: 56, fontWeight: 800, margin: 0, lineHeight: 1.25 }}>
        {title}
      </h1>
      <div style={{ color: "#94a3b8", fontSize: 32, marginTop: 10, fontWeight: 400 }}>
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

  // Determine current active timeline index and interpolation factor
  const totalSteps = timeline.length - 1;
  const exactIndex = progress * totalSteps;
  const currentIndex = Math.min(Math.floor(exactIndex), totalSteps);
  const nextIndex = Math.min(currentIndex + 1, totalSteps);
  const lerpFactor = exactIndex - Math.floor(exactIndex);

  // Compute current values for each stock
  const currentValues: Record<string, number> = {};
  const currentPoint = timeline[currentIndex];
  const nextPoint = timeline[nextIndex];

  const stockKeys = ["lpb", "hdb", "vpb", "vib", "tcb", "savings"] as const;

  stockKeys.forEach(key => {
    const v1 = currentPoint[key];
    const v2 = nextPoint[key];
    currentValues[key] = Math.round(v1 + (v2 - v1) * lerpFactor);
  });

  // Dynamic max Y ceiling calculation for adaptive rescaling
  const maxCurrentVal = Math.max(...Object.values(currentValues));
  let yCeiling = 200;
  if (maxCurrentVal > 1200) yCeiling = 1800;
  else if (maxCurrentVal > 800) yCeiling = 1400;
  else if (maxCurrentVal > 450) yCeiling = 750;
  else if (maxCurrentVal > 250) yCeiling = 500;
  else if (maxCurrentVal > 150) yCeiling = 300;

  // Coordinate mapping functions
  const getX = (index: number, subT: number = 0) => {
    return originX + ((index + subT) / totalSteps) * (chartWidth - 220);
  };

  const getY = (val: number) => {
    const ratio = Math.min(Math.max(val / yCeiling, 0), 1);
    return originY + chartHeight - ratio * chartHeight;
  };

  // Identify top 1 stock
  const ranked = [...stockKeys.filter(k => k !== "savings")].sort((a, b) => currentValues[b] - currentValues[a]);
  const leaderKey = ranked[0];

  // Grid levels
  const gridSteps = 4;
  const gridLevels = Array.from({ length: gridSteps + 1 }, (_, i) => Math.round((yCeiling / gridSteps) * i));

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1920 }}>
      {/* Background Grid Lines */}
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
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
                fontWeight="500"
                fontFamily="Inter, sans-serif"
              >
                {lvl >= 1000 ? `${(lvl / 1000).toFixed(2)} tỷ` : `${lvl} tr`}
              </text>
            </g>
          );
        })}

        {/* Event Markers (Dashed vertical lines) */}
        {timeline.map((pt, idx) => {
          if (!pt.event || idx > currentIndex + 1) return null;
          const x = getX(idx);
          const opacity = idx <= currentIndex ? 1 : lerpFactor;
          return (
            <g key={`event-${idx}`} opacity={opacity}>
              <line
                x1={x}
                y1={originY + 20}
                x2={x}
                y2={originY + chartHeight}
                stroke="rgba(212, 175, 55, 0.6)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <rect
                x={x - 45}
                y={originY}
                width={90}
                height={30}
                rx={6}
                fill="#d4af37"
              />
              <text
                x={x}
                y={originY + 20}
                fill="#000000"
                fontSize="20"
                fontWeight="800"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
              >
                {pt.event}
              </text>
            </g>
          );
        })}

        {/* Dynamic Multi-line Paths */}
        {STOCKS_META.map(meta => {
          const key = meta.id as keyof DataPoint;
          const points: string[] = [];

          for (let i = 0; i <= currentIndex; i++) {
            const x = getX(i);
            const y = getY(Number(timeline[i][key]));
            points.push(`${x},${y}`);
          }

          if (currentIndex < totalSteps) {
            const tipX = getX(currentIndex, lerpFactor);
            const tipY = getY(Number(currentValues[meta.id]));
            points.push(`${tipX},${tipY}`);
          }

          if (points.length < 2) return null;

          const isBenchmark = meta.isBenchmark;
          const isLeader = meta.id === leaderKey;

          return (
            <g key={meta.id}>
              {/* Glow filter for leader */}
              {isLeader && (
                <polyline
                  points={points.join(" ")}
                  fill="none"
                  stroke={meta.color}
                  strokeWidth="10"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <polyline
                points={points.join(" ")}
                fill="none"
                stroke={meta.color}
                strokeWidth={isBenchmark ? "2.5" : isLeader ? "5" : "3.5"}
                strokeDasharray={isBenchmark ? "6 6" : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>

      {/* Head Badges Tracking Realtime Positions with Collision Avoidance */}
      {(() => {
        const sortedStocks = [...STOCKS_META].sort((a, b) => currentValues[b.id] - currentValues[a.id]);
        const tipX = getX(currentIndex, lerpFactor);
        const minGap = 46;

        // Calculate initial Y positions
        const positions: Record<string, number> = {};
        sortedStocks.forEach(meta => {
          positions[meta.id] = getY(currentValues[meta.id]);
        });

        // Enforce non-overlapping vertical separation
        for (let i = 1; i < sortedStocks.length; i++) {
          const prevId = sortedStocks[i - 1].id;
          const currId = sortedStocks[i].id;
          if (positions[currId] < positions[prevId] + minGap) {
            positions[currId] = positions[prevId] + minGap;
          }
        }

        return sortedStocks.map(meta => {
          const val = currentValues[meta.id];
          const badgeY = positions[meta.id];
          const isLeader = meta.id === leaderKey;
          const isBenchmark = meta.isBenchmark;

          return (
            <div
              key={meta.id}
              style={{
                position: "absolute",
                left: tipX + 14,
                top: badgeY - 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
                zIndex: isLeader ? 30 : 20
              }}
            >
              {/* White Card with Logo / Code */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontWeight: 800,
                  fontSize: 22,
                  boxShadow: isLeader ? "0 0 15px rgba(212, 175, 55, 0.8)" : "0 4px 10px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  border: isLeader ? "2px solid #d4af37" : "none"
                }}
              >
                {isLeader && <span style={{ color: "#d4af37", fontSize: 20 }}>★</span>}
                <span>{meta.code}</span>
              </div>

              {/* Value Pill */}
              <div
                style={{
                  backgroundColor: isLeader ? "#fef08a" : isBenchmark ? "rgba(255,255,255,0.15)" : "#0f172a",
                  color: isLeader ? "#854d0e" : isBenchmark ? "#e2e8f0" : "#ffffff",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontWeight: 800,
                  fontSize: 24,
                  border: isLeader ? "1px solid #eab308" : "1px solid rgba(255,255,255,0.1)",
                  whiteSpace: "nowrap"
                }}
              >
                {val >= 1000 ? `${(val / 1000).toFixed(2)} tỷ` : `${val} tr`}
              </div>
            </div>
          );
        });
      })()}

      {/* Bottom Focus Anchor: Giant Year/Month Ticker & Subtitles */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 60,
          right: 60,
          zIndex: 40
        }}
      >
        {/* Giant Year + Month Row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 16 }}>
          <span style={{ fontSize: 130, fontWeight: 900, color: "#d4af37", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {currentPoint.year}
          </span>
          <span style={{ fontSize: 44, fontWeight: 600, color: "#cbd5e1", letterSpacing: "0.02em" }}>
            tháng {String(currentPoint.month).padStart(2, "0")}
          </span>
        </div>

        {/* Subtitle with Keyword Highlight */}
        {currentPoint.subtitle && (
          <div style={{ fontSize: 38, fontWeight: 700, color: "#f8fafc", lineHeight: 1.4 }}>
            {currentPoint.subtitle.text.split(currentPoint.subtitle.highlight).map((part, i, arr) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      color: "#d4af37",
                      borderBottom: "3px solid #d4af37",
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
