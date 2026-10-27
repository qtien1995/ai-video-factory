# HƯỚNG DẪN TÁI TẠO 100% PHONG CÁCH VIDEO (REPLICATION PROMPT)

> **ID Phong cách**: `TECH-TV-TIPS`  
> **Dành cho**: Master AI Director & Senior Remotion Motion Engineer  
> **Ngăn xếp công nghệ**: Remotion + React 19 + TypeScript + Tailwind CSS + GSAP + Motion Physics

---

## 1. TỔNG QUAN THỊ GIÁC & TRIẾT LÝ THIẾT KẾ (VISUAL SPINE)

Tái hiện hoàn hảo phong cách video công nghệ ngắn 9:16 tối ưu giữ chân người xem bằng kiến trúc đồ họa không gian:
- **Tỷ lệ khung hình**: Vertical `1080x1920` (9:16), FPS: `30`.
- **Vùng an toàn bắt buộc (Mobile Safe Zone)**: Trục Y từ `260` đến `1550`. Mọi tiêu đề, thẻ trọng tâm, đồ họa và nút bấm phải nằm trong vùng này để không bị che khuất bởi giao diện TikTok/Reels/Shorts.
- **Phong cách thị giác**: Nền tối cyber sâu (`#0a121e`) kết hợp thẻ kính nổi 2.5D Spatial Glass HUD (`#111d2e`), viền phát sáng Electric Cyan (`#22d3ee`), điểm xuyết màu cảnh báo Amber (`#f59e0b`).
- **Luật cách ly thương hiệu (Brand Isolation Mandate)**: Tuyệt đối KHÔNG giữ lại bất kỳ logo, watermark hay hotline của tác giả video tham khảo. Toàn bộ phần Outro, Header Eyebrow và Call-To-Action nạp trực tiếp nhận diện thương hiệu của User từ `brand/user-brand.json`.

---

## 2. BỐ CỤC KHÔNG GIAN 3 TẦNG (3-TIER VERTICAL ARCHITECTURE)

```text
┌───────────────────────────────────────────────┐ y: 0
│                 TOP STATUS BAR                │
├───────────────────────────────────────────────┤ y: 260 (Safe Top)
│ [1/4 TRÊN] FIXED HEADER                       │
│ • Eyebrow Pill: Electric Cyan #22d3ee tracking-widest
│ • Headline chính: Montserrat Black 64px, chữ trắng
│ • Subheadline/Category: Inter SemiBold 34px, xám bạc
├───────────────────────────────────────────────┤ y: 620
│ [1/2 GIỮA] TRỌNG TÂM THỊ GIÁC (HERO STAGE)    │
│ • SpatialTvMockupCard: Khung TV 16:9 với 3D tilt nhẹ
│ • PerformanceMetricGauge: Đo lường RAM trước & sau
│ • StepByStepFlow: Quy trình 3 bước xử lý dứt điểm
│ • Viền Glass HUD bo tròn 24px + viền phát sáng cyan
├───────────────────────────────────────────────┤ y: 1380
│ [1/4 DƯỚI] SPEECH-SYNCED SUBTITLE & ANCHOR    │
│ • Khung phụ đề kính mờ y: 1450 (pill radius 24px)
│ • Highlight từ khóa đang đọc: #22d3ee         │
│ • Zero Speech = Zero Sub (Im lặng thì ẩn)     │
├───────────────────────────────────────────────┤ y: 1550 (Safe Bottom)
│                BOTTOM NAV BAR                 │
└───────────────────────────────────────────────┘ y: 1920
```

---

## 3. DESIGN TOKENS & MÃ NGUỒN CẤU HÌNH

### Bảng màu (Tailwind Palette)
```typescript
export const PALETTE = {
  background: "#0a121e",
  surface: "#111d2e",
  surfaceGlass: "rgba(17, 29, 46, 0.85)",
  accentPrimary: "#22d3ee",   // Electric Cyan
  accentSecondary: "#f59e0b", // Amber Warning
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  positive: "#10b981",
  negative: "#ef4444",
  border: "rgba(34, 211, 238, 0.22)",
  borderActive: "#22d3ee",
};
```

### Công thức vật lý chuyển động (Remotion Spring)
```typescript
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const cardEntrance = spring({
  frame,
  fps,
  config: {
    damping: 18,
    stiffness: 140,
    mass: 0.8,
  },
});

// Chuyển động xuất hiện mượt mà
const translateY = (1 - cardEntrance) * 70;
const scale = 0.90 + cardEntrance * 0.10;
const opacity = Math.min(1, cardEntrance * 1.6);
```

---

## 4. QUY TẮC PHỤ ĐỀ THEO TỪ (SPEECH-SYNCED WORD HIGHLIGHT)

1. Cụm từ ngắn hiển thị sẵn trong khung kính mờ bo tròn (Pill shape, radius: 24px, padding: 14px 28px).
2. **Chỉ từ đang đọc đổi màu sang `#22d3ee`** kèm gạch chân tinh tế.
3. **CẤM** đổi cỡ chữ, không dùng `scale(1.15)` gây rung lắc nhảy chữ.
4. Khi im lặng (`activeIndex === -1`), ẩn hoàn toàn cả phụ đề và khung nền.

---

## 5. DỰNG KỊCH BẢN & PHÂN NHỊP (PACING BLUEPRINT)

- **Thời lượng cảnh**: Cắt đổi trạng thái mỗi **8.03 giây** (tuân thủ danh sách cutTimestampsMs: `[2670, 10300, 30000, 33930, 43030]`).
- **Hook 3 giây đầu**: Đặt câu hỏi nhức nhối hoặc cảnh báo giật lag tivi ngay tại y: 700.
- **Cấu trúc 6 cảnh**:
  1. Hook 3s (0s - 2.67s)
  2. Bóc trần thủ phạm tràn RAM/app rác (2.67s - 10.3s)
  3. Quy trình 3 bước xử lý dứt điểm (10.3s - 30.0s)
  4. Hiệu năng Before / After (30.0s - 33.9s)
  5. Mẹo duy trì mượt mà lâu dài (33.9s - 43.0s)
  6. Outro thương hiệu & Call-To-Action (43.0s - 48.2s).
