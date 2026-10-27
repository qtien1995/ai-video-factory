# HƯỚNG DẪN TÁI TẠO 100% PHONG CÁCH: HODL.VN INVESTMENT RACE CHART 🧬

> **ID Phong cách**: `HODL-VN-INVESTMENT-RACE`  
> **Chuyên môn**: Financial Bar Chart Race / Investment Comparison / Multi-Curve Progression  
> **Ngăn xếp công nghệ**: Remotion + React 19 + GSAP + Tailwind CSS + EBU R128 (-12.5 LUFS)

---

## 1. TỔNG QUAN THỊ GIÁC & TRIẾT LÝ THIẾT KẾ (VISUAL SPINE)

Tái hiện format cuộc đua tài sản gây nghiện của HODL.VN: Người xem bị thôi miên theo dõi 100 triệu biến đổi qua các năm khi đầu tư vào cổ phiếu vs gửi tiết kiệm.
- **Tỷ lệ khung hình**: `1080x1920` (9:16 Vertical Mobile), 30 FPS.
- **Nền**: `#0b0e14` (Obsidian Dark), lưới tọa độ mờ `rgba(255, 255, 255, 0.08)`.
- **Màu nhấn chủ đạo**: `#d4af37` (Vàng kim ánh kim) cho Top 1, Eyebrow và mốc thời gian lớn.

---

## 2. BỐ CỤC KHÔNG GIAN 3 TẦNG (3-TIER ARCHITECTURE)

```text
┌────────────────────────────────────────────────────────┐ y: 0
│                   SAFE TOP ZONE                        │
├────────────────────────────────────────────────────────┤ y: 260
│ [1/4 TRÊN] FIXED HEADER                                │
│ • Eyebrow: "100 TRIỆU ĐẦU TƯ VN30" (Gold #d4af37)      │
│ • Headline: "Mua 02/01/2019 - Giữ tới nay" (White)     │
│ • Subtitle: "Diễn biến tài sản thực tế qua các năm"    │
├────────────────────────────────────────────────────────┤ y: 600
│ [1/2 GIỮA] MULTI-CURVE RACE STAGE                      │
│ • Dynamic SVG Line Chart: 5 đường biểu đồ tiến triển   │
│ • Tracking Badges: Logo ngân hàng + Giá trị bám theo   │
│ • Top 1 Leader Star: Hiệu ứng ánh sáng vàng + Ngôi sao │
│ • Event Markers: Cột mốc Covid, Sập 2022, Đổi ngôi     │
├────────────────────────────────────────────────────────┤ y: 1400
│ [1/4 DƯỚI] CHỈ BÁO NĂM KHỔNG LỒ & SUBTITLE             │
│ • Giant Year Ticker: "2020 THÁNG 03" (Size 110px Gold) │
│ • Phụ đề đồng bộ giọng nói: Highlight vàng kim         │
├────────────────────────────────────────────────────────┤ y: 1550
│                   SAFE BOTTOM ZONE                     │
└────────────────────────────────────────────────────────┘ y: 1920
```

---

## 3. DESIGN TOKENS

### Bảng màu
```typescript
export const RACE_CHART_PALETTE = {
  background: "#0b0e14",
  surface: "#161b22",
  gridLine: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  goldAccent: "#d4af37",
  goldPill: "#fef08a",
  alertRed: "#ef4444",
  lineColors: {
    item1: "#38bdf8", // Xanh dương
    item2: "#22c55e", // Xanh lá
    item3: "#c084fc", // Tím
    item4: "#f97316", // Cam
    item5: "#ef4444", // Đỏ
    benchmark: "#e2e8f0" // Tiết kiệm ngân hàng
  }
};
```

### Remotion Spring Physics
```typescript
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

export const snappySpring = spring({
  frame,
  fps,
  config: { damping: 13, stiffness: 155, mass: 0.6 }
});
```

---

## 4. QUY TẮC CỐT LÕI (HARD CONSTRAINTS)

1. **Top 1 Tự động chuyển đổi**: Khi đường biểu đồ nào vươn lên dẫn đầu, huy hiệu viền vàng phát sáng + icon ⭐ tự động chuyển sang đường đó.
2. **Trục Y co giãn linh hoạt (Dynamic Exponential Scale)**: Trục giá trị tự mở rộng từ 150 triệu -> 600 triệu -> 1,6 tỷ mà không làm gãy đường đồ thị.
3. **Outro Tổng kết**: Kết thúc bằng Bảng tổng sắp Podium (Rank 1-5 Leaderboard) vinh danh tài sản tăng bao nhiêu lần (x5.2, x13.9).
