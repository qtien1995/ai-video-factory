import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// ============================================================================
// 1. KINETIC TYPOGRAPHY (CHỮ ĐỘNG CHOÁN MÀN HÌNH - KHÔNG DÙNG THẺ)
// ============================================================================
export const KineticTypographyScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05070D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 48px",
        fontFamily: "'Montserrat', 'Barlow Condensed', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Spotlight & Cyber Grid Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Punch Badge */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: 6,
          color: "#EF4444",
          textTransform: "uppercase",
          marginBottom: 48,
          borderBottom: "3px solid #EF4444",
          paddingBottom: 8,
        }}
      >
        // CANH BÁO TÀI CHÍNH 2026 //
      </div>

      {/* Giant Kinetic Headline Stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
          width: "100%",
        }}
      >
        <span
          style={{
            fontSize: 104,
            fontWeight: 900,
            lineHeight: 0.95,
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: "-2px",
            textShadow: "0 10px 30px rgba(0,0,0,0.8)",
          }}
        >
          TIỀN CỦA BẠN
        </span>

        <span
          style={{
            fontSize: 132,
            fontWeight: 900,
            lineHeight: 0.92,
            color: "#EF4444",
            textTransform: "uppercase",
            letterSpacing: "-3px",
            textShadow: "0 0 50px rgba(239,68,68,0.5)",
          }}
        >
          ĐANG BỊ BỐC HƠI
        </span>

        <span
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#FBBF24",
            textTransform: "uppercase",
            letterSpacing: "-1px",
            marginTop: 16,
          }}
        >
          MỖI NGÀY 1.2%
        </span>
      </div>

      {/* Bottom Sub-message with Raw High-contrast typography */}
      <div
        style={{
          marginTop: 80,
          maxWidth: 900,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#E2E8F0",
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          Lạm phát thực tế không nằm trên báo cáo. Nó nằm ngay trong ví của bạn!
        </p>
      </div>

      {/* Bottom Ticker Tapes */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          gap: 32,
          opacity: 0.7,
        }}
      >
        <span style={{ fontSize: 20, color: "#94A3B8", fontWeight: 700, letterSpacing: 2 }}>
          CPI +8.4% · VÀNG +32% · TIỀN GỬI 4.8%
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// 2. CINEMATIC 3D SPATIAL (KHÔNG GIAN VÔ CỰC & LEADER LINES - KHÔNG DÙNG THẺ)
// ============================================================================
export const Cinematic3DSpatialScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030712",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      {/* 3D Horizon Grid Background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        }}
      >
        <defs>
          <linearGradient id="gridFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Perspective converging lines */}
        {[-300, -150, 0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={1920}
            x2={540}
            y2={950}
            stroke="url(#gridFade)"
            strokeWidth="1.5"
          />
        ))}
        {/* Horizontal grid rings */}
        {[1000, 1100, 1220, 1370, 1550, 1750].map((y, i) => (
          <line
            key={i}
            x1={0}
            y1={y}
            x2={1080}
            y2={y}
            stroke="url(#gridFade)"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Top Floating Editorial Headline */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 60,
          right: 60,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 4,
            color: "#06B6D4",
            textTransform: "uppercase",
          }}
        >
          // ARCHITECTURE OVERVIEW //
        </span>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.15,
            margin: "12px 0 0 0",
            letterSpacing: "-1px",
          }}
        >
          Kiến Trúc Nhân AI 3 Lớp Tự Hành
        </h1>
      </div>

      {/* Central 3D Object Illustration (Pure Geometry, no card wrapping) */}
      <svg
        style={{
          position: "absolute",
          top: 560,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
        }}
        viewBox="0 0 800 600"
      >
        {/* Outer Glow Ring */}
        <circle cx="400" cy="300" r="180" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="2" strokeDasharray="6 8" />
        <circle cx="400" cy="300" r="120" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" />

        {/* 3D Isometric Core Prisms */}
        <polygon points="400,190 530,265 400,340 270,265" fill="rgba(6, 182, 212, 0.2)" stroke="#06B6D4" strokeWidth="3" />
        <polygon points="400,340 530,265 530,370 400,445" fill="rgba(6, 182, 212, 0.4)" stroke="#06B6D4" strokeWidth="3" />
        <polygon points="400,340 270,265 270,370 400,445" fill="rgba(6, 182, 212, 0.6)" stroke="#06B6D4" strokeWidth="3" />

        {/* Floating Inner Gold Nucleus */}
        <polygon points="400,270 450,300 400,330 350,300" fill="#F59E0B" opacity="0.9" />

        {/* LEADER LINE 1: Top Right */}
        <line x1="490" y1="240" x2="620" y2="180" stroke="#06B6D4" strokeWidth="2" />
        <line x1="620" y1="180" x2="740" y2="180" stroke="#06B6D4" strokeWidth="2" />
        <circle cx="490" cy="240" r="4" fill="#06B6D4" />

        {/* LEADER LINE 2: Mid Left */}
        <line x1="310" y1="360" x2="180" y2="420" stroke="#F59E0B" strokeWidth="2" />
        <line x1="180" y1="420" x2="60" y2="420" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="310" cy="360" r="4" fill="#F59E0B" />

        {/* LEADER LINE 3: Bottom Right */}
        <line x1="470" y1="410" x2="600" y2="500" stroke="#10B981" strokeWidth="2" />
        <line x1="600" y1="500" x2="740" y2="500" stroke="#10B981" strokeWidth="2" />
        <circle cx="470" cy="410" r="4" fill="#10B981" />
      </svg>

      {/* Callout Floating Texts (No Boxes, purely floating) */}
      <div style={{ position: "absolute", top: 690, right: 60, textAlign: "right" }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#06B6D4" }}>TẦNG TRÍ TUỆ NHẬN THỨC</div>
        <div style={{ fontSize: 20, color: "#94A3B8", marginTop: 4 }}>Xử lý 1.8M tokens/giây với độ trễ 45ms</div>
      </div>

      <div style={{ position: "absolute", top: 940, left: 60, textAlign: "left" }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#F59E0B" }}>ĐỘNG CƠ RA QUYẾT ĐỊNH</div>
        <div style={{ fontSize: 20, color: "#94A3B8", marginTop: 4 }}>Khử nhiễu dữ liệu và lọc sai số 99.4%</div>
      </div>

      <div style={{ position: "absolute", top: 1020, right: 60, textAlign: "right" }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#10B981" }}>TẦNG THỰC THI AN TOÀN</div>
        <div style={{ fontSize: 20, color: "#94A3B8", marginTop: 4 }}>Bảo mật mã hóa đa khóa Zero-Trust</div>
      </div>

      {/* Bottom Metric Callout */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 60,
          right: 60,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div>
          <span style={{ fontSize: 72, fontWeight: 900, color: "#FFFFFF" }}>0.04</span>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#06B6D4", marginLeft: 8 }}>GIÂY</span>
          <div style={{ fontSize: 20, color: "#94A3B8", marginTop: 4 }}>Tốc độ phản hồi trung bình</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: 72, fontWeight: 900, color: "#FFFFFF" }}>100</span>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#10B981", marginLeft: 8 }}>% TỰ ĐỘNG</span>
          <div style={{ fontSize: 20, color: "#94A3B8", marginTop: 4 }}>Không cần can thiệp tay</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// 3. EDITORIAL & DOCUMENTARY (PHÓNG SỰ BÁO CHÍ CAO CẤP - KHÔNG DÙNG THẺ)
// ============================================================================
export const EditorialDocumentaryScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B101D",
        padding: "90px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Segoe UI', 'Be Vietnam Pro', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Press Masthead */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #E2E8F0",
            paddingBottom: 16,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: 4, color: "#E11D48", textTransform: "uppercase" }}>
            SPECIAL INVESTIGATION
          </span>
          <span style={{ fontSize: 18, color: "#94A3B8", letterSpacing: 1 }}>
            THÁNG 10, 2026 · HỒ SƠ ĐỘC QUYỀN
          </span>
        </div>

        {/* Big Serif Article Headline */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginTop: 36,
            letterSpacing: "-1px",
            fontFamily: "Georgia, serif",
          }}
        >
          Cú Sốc Viện Phí & Những Lỗ Hổng Bị Bỏ Quên
        </h1>

        <div style={{ fontSize: 26, color: "#94A3B8", marginTop: 16, fontStyle: "italic" }}>
          Phân tích thực trạng từ 12.000 hồ sơ thanh toán bảo hiểm y tế tại các bệnh viện tuyến đầu.
        </div>
      </div>

      {/* Main Authentic Press Highlight (Text with yellow fluorescent marker) */}
      <div style={{ margin: "40px 0" }}>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.6,
            color: "#F8FAFC",
            fontFamily: "Georgia, serif",
          }}
        >
          “Có đến{" "}
          <span
            style={{
              backgroundColor: "rgba(250, 204, 21, 0.4)",
              color: "#FEF08A",
              padding: "4px 8px",
              fontWeight: 900,
              borderBottom: "3px solid #EAB308",
            }}
          >
            73% gia đình Việt Nam
          </span>{" "}
          rơi vào tình trạng kiệt quệ tài chính chỉ sau 30 ngày điều trị bệnh hiểm nghèo tại bệnh viện trung ương, dù đã có BHYT.”
        </div>

        {/* Source citation */}
        <div style={{ marginTop: 24, fontSize: 20, color: "#E11D48", fontWeight: 800, letterSpacing: 1.5 }}>
          — THE VIETNAM MEDICAL ECONOMIC JOURNAL (VOL. 48)
        </div>
      </div>

      {/* Bottom Editorial Data Split (Pure typography, no boxes) */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: 36,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div style={{ fontSize: 68, fontWeight: 900, color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            450<span style={{ fontSize: 32, color: "#E11D48" }}>TR</span>
          </div>
          <div style={{ fontSize: 22, color: "#94A3B8", marginTop: 6, lineHeight: 1.4 }}>
            Chi phí thuốc ngoài danh mục BHYT trung bình mỗi đợt.
          </div>
        </div>

        <div>
          <div style={{ fontSize: 68, fontWeight: 900, color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            90<span style={{ fontSize: 32, color: "#EAB308" }}>%</span>
          </div>
          <div style={{ fontSize: 22, color: "#94A3B8", marginTop: 6, lineHeight: 1.4 }}>
            Người bệnh không nắm rõ các điều khoản loại trừ trước khi nhập viện.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// 4. RAW DATA & DYNAMIC GRAPHS (BIỂU ĐỒ TRADINGVIEW TOÀN CẢNH - KHÔNG DÙNG THẺ)
// ============================================================================
export const RawDataTradingViewScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0E14",
        padding: "80px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'JetBrains Mono', 'Be Vietnam Pro', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Market Bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#00F5A0", letterSpacing: 2 }}>
              VNINDEX · D1
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 8 }}>
              <span style={{ fontSize: 80, fontWeight: 900, color: "#00F5A0" }}>1,738.67</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#00F5A0" }}>+42.50 (+2.50%)</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, color: "#94A3B8" }}>VOL: 1.24B CP</div>
            <div style={{ fontSize: 24, color: "#FBBF24", fontWeight: 800, marginTop: 4 }}>32,840 TỶ VNĐ</div>
          </div>
        </div>
      </div>

      {/* Center Candlestick Chart Area (Rendered via clean SVG lines & bars) */}
      <div style={{ position: "relative", width: "100%", height: 750 }}>
        {/* Background Grid Lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[150, 300, 450, 600].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="984" y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          ))}

          {/* SMA 20 Moving Average Curve (Cyan) */}
          <path
            d="M 20 520 Q 200 480 400 420 T 700 280 T 960 160"
            fill="none"
            stroke="#00F5A0"
            strokeWidth="3.5"
          />
          {/* SMA 200 Moving Average Curve (Purple) */}
          <path
            d="M 20 580 Q 250 560 500 530 T 800 470 T 960 410"
            fill="none"
            stroke="#A855F7"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />

          {/* Candlesticks Sample Set */}
          {[
            { x: 60, high: 490, low: 570, open: 550, close: 510, green: true },
            { x: 130, high: 470, low: 540, open: 510, close: 530, green: false },
            { x: 200, high: 450, low: 520, open: 520, close: 460, green: true },
            { x: 270, high: 430, low: 490, open: 465, close: 440, green: true },
            { x: 340, high: 400, low: 480, open: 445, close: 475, green: false },
            { x: 410, high: 380, low: 460, open: 460, close: 400, green: true },
            { x: 480, high: 360, low: 430, open: 405, close: 370, green: true },
            { x: 550, high: 340, low: 400, open: 375, close: 390, green: false },
            { x: 620, high: 300, low: 370, open: 380, close: 320, green: true },
            { x: 690, high: 280, low: 340, open: 325, close: 290, green: true },
            { x: 760, high: 240, low: 310, open: 295, close: 250, green: true },
            { x: 830, high: 200, low: 270, open: 255, close: 210, green: true },
            { x: 900, high: 140, low: 220, open: 215, close: 150, green: true },
          ].map((c, i) => (
            <g key={i}>
              {/* Wick */}
              <line x1={c.x + 12} y1={c.low} x2={c.x + 12} y2={c.high} stroke={c.green ? "#00F5A0" : "#F23645"} strokeWidth="2.5" />
              {/* Body */}
              <rect
                x={c.x}
                y={Math.min(c.open, c.close)}
                width="24"
                height={Math.max(Math.abs(c.close - c.open), 8)}
                fill={c.green ? "#00F5A0" : "#F23645"}
              />
            </g>
          ))}
        </svg>

        {/* Floating Resistance Marker */}
        <div
          style={{
            position: "absolute",
            top: 140,
            right: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ height: 2, width: 80, backgroundColor: "#00F5A0" }} />
          <span style={{ fontSize: 22, fontWeight: 900, color: "#00F5A0", background: "rgba(0,245,160,0.15)", padding: "4px 10px" }}>
            VƯỢT ĐỈNH LỊCH SỬ 1,738
          </span>
        </div>
      </div>

      {/* Bottom Technical Conclusion (Pure Floating Text) */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 32,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 20, color: "#94A3B8" }}>RSI (14) · OVERBOUGHT</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#FBBF24", marginTop: 4 }}>74.8 ĐIỂM</div>
        </div>
        <div>
          <div style={{ fontSize: 20, color: "#94A3B8" }}>KHỐI NGOẠI RÒNG</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#00F5A0", marginTop: 4 }}>+1,850 TỶ</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, color: "#94A3B8" }}>XÁC SUẤT BÙNG NỔ</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#00F5A0", marginTop: 4 }}>85%</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// 5. TACTICAL GEOPOLITICAL MAP (BẢN ĐỒ ĐỊA CHÍNH TRỊ - KHÔNG DÙNG THẺ)
// ============================================================================
export const TacticalMapScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080C14",
        padding: "80px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Space Grotesk', 'JetBrains Mono', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Tactical Telemetry */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: 3, color: "#00F0FF" }}>
            GEO-TACTICAL SURVEILLANCE // SECTOR 07
          </span>
          <span style={{ fontSize: 18, color: "#FF334B", fontWeight: 800, letterSpacing: 2 }}>
            ● LIVE SATELLITE
          </span>
        </div>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginTop: 18,
            letterSpacing: "-1px",
          }}
        >
          Tuyến Vận Tải Biển & Điểm Nóng Chiến Lược
        </h1>
      </div>

      {/* Center Tactical Map Graphics */}
      <div style={{ position: "relative", width: "100%", height: 850 }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 984 850">
          {/* Tactical Grid Coordinates */}
          {[150, 350, 550, 750].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="984" y2={y} stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1" />
          ))}
          {[200, 400, 600, 800].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="850" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1" />
          ))}

          {/* Continent / Coastline Vector Silhouette */}
          <path
            d="M 100 80 Q 250 140 320 280 T 260 480 T 420 620 T 580 750"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
          />
          <path
            d="M 680 120 Q 750 240 820 400 T 780 650 T 890 800"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
          />

          {/* Strategic Chokepoint (Strait) with Red Pulsating Rings */}
          <circle cx="340" cy="380" r="40" fill="none" stroke="#FF334B" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="340" cy="380" r="15" fill="#FF334B" opacity="0.8" />

          {/* Glowing Maritime Trade Route */}
          <path
            d="M 80 750 Q 280 620 340 380 T 520 200 T 920 100"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="4"
            strokeDasharray="8 6"
          />

          {/* Tactical Crosshairs */}
          <g transform="translate(340, 380)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#FF334B" strokeWidth="2" />
            <line x1="0" y1="-30" x2="0" y2="30" stroke="#FF334B" strokeWidth="2" />
          </g>
        </svg>

        {/* Floating Geo Labels (No Cards) */}
        <div style={{ position: "absolute", top: 320, left: 400 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#FF334B" }}>EO BIỂN MALACCA</div>
          <div style={{ fontSize: 18, color: "#94A3B8", marginTop: 4 }}>Tọa độ: 1.43°N, 102.89°E</div>
          <div style={{ fontSize: 20, color: "#00F0FF", fontWeight: 700, marginTop: 4 }}>40% VẬN TẢI DẦU MỎ TOÀN CẦU</div>
        </div>

        <div style={{ position: "absolute", bottom: 80, right: 40, textAlign: "right" }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#00F0FF" }}>TUYẾN HÀNG HẢI HUYẾT MẠCH</div>
          <div style={{ fontSize: 18, color: "#94A3B8", marginTop: 4 }}>Lưu lượng: 90.000 tàu hàng/năm</div>
        </div>
      </div>

      {/* Bottom Geopolitical Impact Statement */}
      <div
        style={{
          borderTop: "1px solid rgba(0, 240, 255, 0.2)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>
          3.400 TỶ USD GIÁ TRỊ GIAO THƯƠNG HÀNG NĂM
        </span>
        <span style={{ fontSize: 20, color: "#FF334B", fontWeight: 800 }}>
          STATUS: HIGH ALERT
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// 6. WHITEBOARD & HAND-DRAWN MINDMAP (NÉT VẼ TAY & SƠ ĐỒ TỰ DO - KHÔNG DÙNG THẺ)
// ============================================================================
export const WhiteboardMindmapScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FDFBF7",
        padding: "90px 54px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Patrick Hand', 'Segoe UI', cursive, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Paper Subtle Grain Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />

      {/* Top Handwritten Main Concept */}
      <div>
        <div style={{ display: "inline-block", position: "relative" }}>
          {/* Highlighter Yellow Underline */}
          <div
            style={{
              position: "absolute",
              bottom: 4,
              left: -8,
              right: -8,
              height: 24,
              backgroundColor: "rgba(250, 204, 21, 0.5)",
              transform: "rotate(-1deg)",
              zIndex: 0,
            }}
          />
          <h1
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#1E293B",
              margin: 0,
              position: "relative",
              zIndex: 1,
              letterSpacing: "-1px",
            }}
          >
            Sơ Đồ Dòng Tiền Tự Do
          </h1>
        </div>

        <p style={{ fontSize: 28, color: "#64748B", marginTop: 16, margin: 0 }}>
          Cách người giàu phân bổ thu nhập mà không cần theo dõi sổ sách phức tạp
        </p>
      </div>

      {/* Center Hand-Drawn Mindmap (SVG sketch paths & ideas) */}
      <div style={{ position: "relative", width: "100%", height: 850 }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 972 850">
          {/* Hand-drawn Curly Connecting Arrows */}
          {/* Main -> Node 1 */}
          <path
            d="M 486 180 Q 320 260 260 380"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
          {/* Main -> Node 2 */}
          <path
            d="M 486 180 Q 500 280 500 420"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Main -> Node 3 */}
          <path
            d="M 486 180 Q 660 260 740 380"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />

          {/* Node 1 to Sub-idea */}
          <path
            d="M 260 480 Q 230 580 340 680"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Central Idea Circle Sketch */}
          <ellipse cx="486" cy="140" rx="190" ry="60" fill="none" stroke="#1E293B" strokeWidth="4" />
        </svg>

        {/* Central Core Text */}
        <div style={{ position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <span style={{ fontSize: 40, fontWeight: 900, color: "#1E293B" }}>TỔNG THU NHẬP</span>
        </div>

        {/* Node 1: 50% Thiết yếu */}
        <div style={{ position: "absolute", top: 380, left: 60, width: 280, textAlign: "center" }}>
          <div
            style={{
              padding: "16px 20px",
              border: "3px dashed #1E293B",
              borderRadius: 30,
              backgroundColor: "#FFFFFF",
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 900, color: "#EF4444" }}>50%</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1E293B" }}>Sinh Hoạt Thiết Yếu</div>
            <div style={{ fontSize: 18, color: "#64748B", marginTop: 4 }}>Ăn uống, thuê nhà, hoá đơn</div>
          </div>
        </div>

        {/* Node 2: 30% Đầu tư */}
        <div style={{ position: "absolute", top: 420, left: "50%", transform: "translateX(-50%)", width: 280, textAlign: "center" }}>
          <div
            style={{
              padding: "16px 20px",
              border: "3.5px solid #10B981",
              borderRadius: 30,
              backgroundColor: "#ECFDF5",
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 900, color: "#10B981" }}>30%</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1E293B" }}>Đầu Tư Tự Động</div>
            <div style={{ fontSize: 18, color: "#047857", marginTop: 4 }}>Chứng chỉ quỹ, vàng, cổ phiếu</div>
          </div>
        </div>

        {/* Node 3: 20% Tự do */}
        <div style={{ position: "absolute", top: 380, right: 60, width: 280, textAlign: "center" }}>
          <div
            style={{
              padding: "16px 20px",
              border: "3px dashed #1E293B",
              borderRadius: 30,
              backgroundColor: "#FFFFFF",
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 900, color: "#F59E0B" }}>20%</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1E293B" }}>Hưởng Thụ & Học Tập</div>
            <div style={{ fontSize: 18, color: "#64748B", marginTop: 4 }}>Du lịch, mua sắm, sách vở</div>
          </div>
        </div>

        {/* Sub-note sketch */}
        <div style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", textAlign: "center", width: 500 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: "#B45309", backgroundColor: "rgba(254, 243, 199, 0.9)", padding: "6px 18px", borderRadius: 8 }}>
            ★ QUY TẮC BẤT DI BẤT DỊCH: TỰ ĐỘNG TRÍCH NGAY KHI LƯƠNG VỀ!
          </span>
        </div>
      </div>

      {/* Bottom Simple Signature */}
      <div
        style={{
          borderTop: "2px solid #CBD5E1",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#64748B",
          fontSize: 22,
        }}
      >
        <span>Mô hình 50/30/20 cải tiến</span>
        <span style={{ fontWeight: 700, color: "#1E293B" }}>Zero-Stress Budgeting</span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN SHOWCASE WRAPPER: 6 SCENES (Frame 0, 30, 60, 90, 120, 150)
// ============================================================================
export const NonCardStylesShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame < 30) {
    return <KineticTypographyScene />;
  }
  if (frame < 60) {
    return <Cinematic3DSpatialScene />;
  }
  if (frame < 90) {
    return <EditorialDocumentaryScene />;
  }
  if (frame < 120) {
    return <RawDataTradingViewScene />;
  }
  if (frame < 150) {
    return <TacticalMapScene />;
  }
  return <WhiteboardMindmapScene />;
};
