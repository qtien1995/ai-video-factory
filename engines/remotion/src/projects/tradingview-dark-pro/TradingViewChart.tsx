import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number; // in millions
  highlight?: boolean;
}

export const VNINDEX_CANDLES: CandleData[] = [
  { date: "08/10", open: 1749.2, high: 1764.5, low: 1739.0, close: 1739.0, volume: 634.5 },
  { date: "09/10", open: 1737.6, high: 1744.9, low: 1724.2, close: 1735.1, volume: 819.3 },
  { date: "12/10", open: 1736.2, high: 1736.6, low: 1719.9, close: 1721.0, volume: 573.7 },
  { date: "13/10", open: 1716.9, high: 1726.4, low: 1711.0, close: 1719.4, volume: 557.0 },
  { date: "14/10", open: 1720.9, high: 1722.7, low: 1700.7, close: 1704.9, volume: 580.0 },
  { date: "15/10", open: 1701.2, high: 1709.5, low: 1694.8, close: 1698.4, volume: 676.6 },
  { date: "16/10", open: 1702.4, high: 1713.6, low: 1698.1, close: 1705.9, volume: 502.4 },
  { date: "19/10", open: 1721.1, high: 1721.4, low: 1689.8, close: 1689.8, volume: 602.5 },
  { date: "20/10", open: 1692.7, high: 1695.5, low: 1677.2, close: 1692.0, volume: 565.1 },
  { date: "21/10", open: 1696.8, high: 1738.9, low: 1696.0, close: 1738.67, volume: 895.8, highlight: true }
];

export const TradingViewChart: React.FC<{
  showResistance?: boolean;
  showSupport?: boolean;
  showForecastPaths?: boolean;
  actionZoneMode?: boolean;
  growthProgress?: number; // 0 to 1 for the 21/10 candle growth
}> = ({
  showResistance = true,
  showSupport = true,
  showForecastPaths = false,
  actionZoneMode = false,
  growthProgress = 1
}) => {
  const frame = useCurrentFrame();

  const chartWidth = 960;
  const chartHeight = 720;
  const minPrice = 1660;
  const maxPrice = 1805;
  const priceRange = maxPrice - minPrice;

  const priceToY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  const candleSpacing = chartWidth / (VNINDEX_CANDLES.length + 1);

  // Laser line pulsating glow
  const laserGlow = interpolate(Math.sin(frame / 6), [-1, 1], [0.6, 1]);

  return (
    <div
      style={{
        position: "relative",
        width: chartWidth,
        height: chartHeight + 200, // chart + volume
        backgroundColor: "rgba(13, 17, 23, 0.95)",
        borderRadius: 28,
        border: "1.5px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        padding: "20px 0"
      }}
    >
      {/* TradingView Top Toolbar Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px 14px 28px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          fontFamily: "'Be Vietnam Pro', sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              backgroundColor: "#22c55e20",
              color: "#22c55e",
              border: "1px solid #22c55e",
              padding: "4px 12px",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 900
            }}
          >
            VNINDEX · 1D
          </span>
          <span style={{ color: "#ffffff", fontSize: 24, fontWeight: 800 }}>HOSE</span>
          <span style={{ color: "#94a3b8", fontSize: 20 }}>O: 1696.8 H: 1738.9 L: 1696.0 C: 1738.7</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 10px #22c55e"
            }}
          />
          <span style={{ color: "#22c55e", fontSize: 18, fontWeight: 700 }}>LIVE TAPE</span>
        </div>
      </div>

      {/* Main SVG Coordinate Plane */}
      <svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="bullGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#089981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#089981" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="bearGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f23645" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f23645" stopOpacity="0.2" />
          </linearGradient>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal Price Grid Lines */}
        {[1680, 1700, 1720, 1740, 1760, 1780, 1800].map(price => {
          const y = priceToY(price);
          return (
            <g key={price}>
              <line x1={0} y1={y} x2={chartWidth - 90} y2={y} stroke="rgba(255, 255, 255, 0.07)" strokeDasharray="3 3" />
              <text
                x={chartWidth - 80}
                y={y + 5}
                fill="#64748b"
                fontSize={16}
                fontFamily="'Montserrat', sans-serif"
                fontWeight={600}
              >
                {price}
              </text>
            </g>
          );
        })}

        {/* Resistance Zone (SMA200) */}
        {showResistance && (
          <g>
            <rect
              x={0}
              y={priceToY(1796)}
              width={chartWidth - 90}
              height={priceToY(1780) - priceToY(1796)}
              fill="rgba(242, 54, 69, 0.15)"
              stroke="#f23645"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <rect
              x={20}
              y={priceToY(1796) + 6}
              width={260}
              height={26}
              rx={6}
              fill="rgba(242, 54, 69, 0.85)"
            />
            <text
              x={30}
              y={priceToY(1796) + 24}
              fill="#ffffff"
              fontSize={14}
              fontWeight={800}
              fontFamily="'Be Vietnam Pro', sans-serif"
            >
              CẢN CỨNG SMA200 (1,780 - 1,796Đ)
            </text>
          </g>
        )}

        {/* Support Zone (Fibo 61.8%) */}
        {showSupport && (
          <g>
            <rect
              x={0}
              y={priceToY(1715)}
              width={chartWidth - 90}
              height={priceToY(1677) - priceToY(1715)}
              fill="rgba(8, 153, 129, 0.12)"
              stroke="#089981"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <rect
              x={20}
              y={priceToY(1677) - 32}
              width={270}
              height={26}
              rx={6}
              fill="rgba(8, 153, 129, 0.85)"
            />
            <text
              x={30}
              y={priceToY(1677) - 14}
              fill="#ffffff"
              fontSize={14}
              fontWeight={800}
              fontFamily="'Be Vietnam Pro', sans-serif"
            >
              HỖ TRỢ / FIBO 61.8% (1,677 - 1,715Đ)
            </text>
          </g>
        )}

        {/* Action Strategy Zones (Scene 5) */}
        {actionZoneMode && (
          <g>
            {/* Take profit / reduce margin zone */}
            <rect
              x={chartWidth * 0.45}
              y={priceToY(1770)}
              width={chartWidth * 0.45}
              height={priceToY(1760) - priceToY(1770)}
              fill="rgba(245, 158, 11, 0.25)"
              stroke="#f59e0b"
              strokeWidth={2}
            />
            <text
              x={chartWidth * 0.47}
              y={priceToY(1760) - 10}
              fill="#fbbf24"
              fontSize={16}
              fontWeight={900}
              fontFamily="'Be Vietnam Pro', sans-serif"
            >
              ⚠️ KẸP HÀNG: HẠ MARGIN (1,760 - 1,770Đ)
            </text>

            {/* Cash buy test zone */}
            <rect
              x={chartWidth * 0.45}
              y={priceToY(1725)}
              width={chartWidth * 0.45}
              height={priceToY(1715) - priceToY(1725)}
              fill="rgba(34, 197, 94, 0.25)"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <text
              x={chartWidth * 0.47}
              y={priceToY(1715) - 8}
              fill="#4ade80"
              fontSize={16}
              fontWeight={900}
              fontFamily="'Be Vietnam Pro', sans-serif"
            >
              🎯 CẦM TIỀN: CHỜ RETEST CẠN CUNG (1,720Đ)
            </text>
          </g>
        )}

        {/* Forecast Trajectory Paths (Scene 4) */}
        {showForecastPaths && (
          <g>
            {/* Path 1: Base Case Accumulation (Gold) */}
            <path
              d={`M ${candleSpacing * 10} ${priceToY(1738.67)} Q ${candleSpacing * 10 + 60} ${priceToY(1775)}, ${
                candleSpacing * 10 + 110
              } ${priceToY(1740)} T ${candleSpacing * 10 + 200} ${priceToY(1760)}`}
              fill="none"
              stroke="#d4af37"
              strokeWidth={4}
              strokeDasharray="6 6"
            />
            <circle cx={candleSpacing * 10 + 200} cy={priceToY(1760)} r={8} fill="#d4af37" />
            <rect
              x={candleSpacing * 10 + 130}
              y={priceToY(1785)}
              width={160}
              height={28}
              rx={6}
              fill="#d4af37"
            />
            <text
              x={candleSpacing * 10 + 140}
              y={priceToY(1785) + 19}
              fill="#0b0e14"
              fontSize={14}
              fontWeight={900}
              fontFamily="'Be Vietnam Pro', sans-serif"
            >
              55% TÍCH LŨY BIÊN
            </text>

            {/* Path 2: Bull Trap Breakdown (Red) */}
            <path
              d={`M ${candleSpacing * 10} ${priceToY(1738.67)} L ${candleSpacing * 10 + 50} ${priceToY(
                1750
              )} L ${candleSpacing * 10 + 100} ${priceToY(1710)} L ${candleSpacing * 10 + 170} ${priceToY(1651)}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth={4}
              strokeDasharray="6 6"
            />
            <polygon
              points={`${candleSpacing * 10 + 170},${priceToY(1651)} ${candleSpacing * 10 + 155},${priceToY(
                1665
              )} ${candleSpacing * 10 + 185},${priceToY(1665)}`}
              fill="#ef4444"
            />
            <rect
              x={candleSpacing * 10 + 110}
              y={priceToY(1640)}
              width={160}
              height={28}
              rx={6}
              fill="#ef4444"
            />
            <text
              x={candleSpacing * 10 + 120}
              y={priceToY(1640) + 19}
              fill="#ffffff"
              fontSize={14}
              fontWeight={900}
              fontFamily="'Be Vietnam Pro', sans-serif"
            >
              20% BẪY GÃY 1,651Đ
            </text>
          </g>
        )}

        {/* Japanese Candlesticks */}
        {VNINDEX_CANDLES.map((c, i) => {
          const x = candleSpacing * (i + 1);
          const isGreen = c.close >= c.open;
          const color = isGreen ? "#089981" : "#f23645";

          // Dynamic animation for the 21/10 candle
          let currentClose = c.close;
          let currentHigh = c.high;
          if (c.highlight) {
            currentClose = c.open + (c.close - c.open) * growthProgress;
            currentHigh = Math.max(c.open, currentClose, c.open + (c.high - c.open) * growthProgress);
          }

          const topBody = priceToY(Math.max(c.open, currentClose));
          const botBody = priceToY(Math.min(c.open, currentClose));
          const bodyHeight = Math.max(4, botBody - topBody);
          const yHigh = priceToY(currentHigh);
          const yLow = priceToY(c.low);

          const candleWidth = 46;

          return (
            <g key={c.date} filter={c.highlight ? "url(#neonGlow)" : undefined}>
              {/* Wick */}
              <line
                x1={x}
                y1={yHigh}
                x2={x}
                y2={yLow}
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
              />

              {/* Body */}
              <rect
                x={x - candleWidth / 2}
                y={topBody}
                width={candleWidth}
                height={bodyHeight}
                fill={color}
                rx={4}
                stroke={c.highlight ? "#00F5A0" : color}
                strokeWidth={c.highlight ? 2 : 1}
              />

              {/* Date label */}
              <text
                x={x}
                y={chartHeight - 12}
                textAnchor="middle"
                fill={c.highlight ? "#00F5A0" : "#64748b"}
                fontSize={15}
                fontWeight={c.highlight ? 800 : 600}
                fontFamily="'Montserrat', sans-serif"
              >
                {c.date}
              </text>

              {/* Special Tag for 20/10 Hammer and 21/10 Engulfing */}
              {c.date === "20/10" && (
                <text
                  x={x}
                  y={yLow + 24}
                  textAnchor="middle"
                  fill="#38bdf8"
                  fontSize={14}
                  fontWeight={800}
                  fontFamily="'Be Vietnam Pro', sans-serif"
                >
                  RÚT CHÂN
                </text>
              )}
              {c.highlight && (
                <text
                  x={x}
                  y={yHigh - 16}
                  textAnchor="middle"
                  fill="#00F5A0"
                  fontSize={18}
                  fontWeight={900}
                  fontFamily="'Montserrat', sans-serif"
                >
                  +46.7Đ ▲
                </text>
              )}
            </g>
          );
        })}

        {/* Laser Price Line at 1,738.67 */}
        <g opacity={laserGlow}>
          <line
            x1={0}
            y1={priceToY(1738.67)}
            x2={chartWidth - 110}
            y2={priceToY(1738.67)}
            stroke="#00F5A0"
            strokeWidth={2}
            strokeDasharray="5 4"
          />
          {/* Pulsating live price pill */}
          <rect
            x={chartWidth - 115}
            y={priceToY(1738.67) - 16}
            width={110}
            height={32}
            rx={8}
            fill="#089981"
            stroke="#00F5A0"
            strokeWidth={1.5}
          />
          <text
            x={chartWidth - 60}
            y={priceToY(1738.67) + 6}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={16}
            fontWeight={900}
            fontFamily="'Montserrat', sans-serif"
          >
            1,738.67
          </text>
        </g>
      </svg>

      {/* Volume Histogram Section Below Candlesticks */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "10px 28px 0 28px",
          display: "flex",
          flexDirection: "column",
          gap: 6
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#94a3b8", fontSize: 16, fontWeight: 700 }}>
            VOL KHỚP LỆNH (TRIỆU CP) · MA20 = 644M
          </span>
          <span style={{ color: "#00F5A0", fontSize: 18, fontWeight: 900 }}>
            21/10: 895.8M (+39% BÙNG NỔ)
          </span>
        </div>

        <svg width={chartWidth - 56} height={120}>
          {/* MA20 Volume Line */}
          <line
            x1={0}
            y1={120 - (644 / 1000) * 120}
            x2={chartWidth - 56}
            y2={120 - (644 / 1000) * 120}
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <text
            x={chartWidth - 120}
            y={120 - (644 / 1000) * 120 - 6}
            fill="#f59e0b"
            fontSize={12}
            fontWeight={700}
          >
            MA20: 644M
          </text>

          {/* Volume Bars */}
          {VNINDEX_CANDLES.map((c, i) => {
            const x = candleSpacing * (i + 1) - 28;
            const barH = (c.volume / 1000) * 120;
            const isGreen = c.close >= c.open;
            const color = isGreen ? "#089981" : "#f23645";

            return (
              <rect
                key={c.date}
                x={x - 18}
                y={120 - barH}
                width={36}
                height={barH}
                fill={c.highlight ? "#00F5A0" : color}
                opacity={c.highlight ? 1 : 0.75}
                rx={4}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
