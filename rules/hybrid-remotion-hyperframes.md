# HYBRID REMOTION + HYPERFRAMES ARCHITECTURE (V4+)

## 1. Triết lý Phối hợp (Hybrid Philosophy)

Remotion và HyperFrames không loại trừ nhau mà bổ trợ lẫn nhau theo cấu trúc phân tầng:
* **Remotion đóng vai trò Host / Master Engine**:
  * Quản lý Master Timeline (khung hình chuẩn 30fps).
  * Audio Mastering: VieNeu-TTS "Hải Đăng" 48kHz, BGM ducking chuẩn -14 đến -12 LUFS, True Peak < -1.0 dBFS.
  * Phụ đề đồng bộ từng từ (`SpeechSyncedSubtitles`).
  * Nhận diện thương hiệu (`UserBrandOutro`), kiểm định chất lượng (QC hard gates).
* **HyperFrames đóng vai trò Visual Plate / Procedural Motion Engine**:
  * Sáng tạo chuyển động nhanh bằng HTML5, CSS Animations/Keyframes, SVG và Canvas 2D API.
  * Xuất video plate có kênh trong suốt (Alpha WebM / Transparent Video) hoặc trực tiếp nhúng code Canvas vào scene Remotion.

---

## 2. Hai Phương thức Kết hợp Thực chiến

### Phương thức 1: Native Canvas Plate (Zero Overhead - Khuyên dùng)
Viết code vẽ Canvas 2D / procedural graphics trực tiếp trong Remotion scene bằng component `<HyperCanvasPlate />`:
```tsx
import React from "react";
import { HyperCanvasPlate, HyperCanvasDrawContext } from "@shared";

export const DynamicChartScene: React.FC = () => {
  const drawGraphic = ({ ctx, frame, progress, width, height }: HyperCanvasDrawContext) => {
    // Vẽ đồ họa Canvas 2D theo từng frame
    ctx.strokeStyle = "#38BDF8";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(100, 1400);
    ctx.bezierCurveTo(300, 1400 - 300 * progress, 700, 1200 - 500 * progress, width - 100, 800);
    ctx.stroke();
  };

  return <HyperCanvasPlate draw={drawGraphic} />;
};
```
* Ưu điểm: Render siêu tốc, không sinh file trung gian, khớp nhịp 100% với giọng đọc.

### Phương thức 2: HyperFrames Transparent WebM Overlay
1. Thiết kế composition trong HyperFrames:
   ```bash
   hyperframes init my-plate
   hyperframes render --format webm -o plate.webm
   ```
2. Nhúng plate vào Remotion Composition:
   ```tsx
   import React from "react";
   import { HyperPlateVideo } from "@shared";

   export const SceneWithHyperPlate: React.FC = () => {
     return <HyperPlateVideo src="assets/plates/plate.webm" opacity={0.9} />;
   };
   ```
* Ưu điểm: Tận dụng sức mạnh chuyển động đồ họa phong phú và công cụ render của HyperFrames CLI.
