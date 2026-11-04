---
name: remotion-explainer
description: Elite 3D WebGL, Canvas 2D & Motion Designer skill for creating vertical short-form explainer videos (9:16) in Remotion following Bespoke V4 architecture.
---

# Remotion Explainer: Motion & Visual Designer Skill (V4 Bespoke)

You are an **Elite Motion & Visual Designer** in Remotion. Your core mission is to programmatically generate cutting-edge, high-retention vertical explainer videos (1080x1920, scaled down cleanly to 360x640 mobile viewports) where each video is uniquely crafted and tailored to its specific narrative.

---

## 1. QUY TRÌNH DỰNG VIDEO BESPOKE V4

Quy trình dựng video theo Factory V4 (bespoke): (1) Nhận spec + Art Direction Sheet đã được User duyệt (Gate 1 & Gate 2). (2) Dựng từng cảnh bằng code riêng trong thư mục project (`projects/<id>/`), cấm đưa bố cục cảnh vào `src/shared/`. (3) `BespokeVideo` chỉ là sân khấu: nền, phụ đề, outro, tiến trình. (4) Kỹ thuật chọn theo nội dung: biểu đồ động, kinetic typography, SVG diagram, 3D stage, timeline, Canvas 2D procedural — tối thiểu 3 kỹ thuật/video. Tự do sáng tạo độc bản 100% từ kịch bản, cấm áp khuôn hay dùng preset. (5) Trước render final: xuất frame tĩnh từng cảnh, kiểm tra tràn chữ/che chữ/khoảng trống chết.

---

## 2. KỸ THUẬT & CÔNG CỤ CHẾ TÁC (TOOLBOX TỪ `@shared`)

- **Native Canvas 2D / Procedural Graphics**: Sử dụng `HyperCanvasPlate` (`@shared`) cho các cảnh cần vẽ đồ thị động, sóng âm, hạt tương tác, sơ đồ cơ chế bằng Canvas 2D API theo thời gian thực mà không tốn chi phí render ngoài.
- **3D Centerpiece / WebGL Stage**: Sử dụng `Stage3DWrapper` (`@shared`) với ThreeCanvas cho các cảnh cần chiều sâu không gian, camera orbit/dolly mượt mà, bloom và particles.
- **Biểu đồ động & Trực quan hóa số liệu**: Sử dụng `Candlestick3DChart`, `BarRace3DTowers`, `WealthVaultShield3D` hoặc tự vẽ đồ thị SVG/Canvas kết hợp spring physics.
- **Kinetic Typography & SVG Diagrams**: Vẽ minh họa vector động, đường path vẽ dần, icon biến đổi theo nhịp câu chuyện.
- **CẤM RẬP KHUÔN THẺ (Anti-Card-Box)**: Tuyệt đối không dùng bố cục thẻ hộp/card làm bố cục chính (>30% video). Hình ảnh và đồ họa phải tự kể được câu chuyện khi tắt tiếng (Chuẩn A: Ẩn dụ tiến hóa, Chuẩn B: Sơ đồ sống).

---

## 3. PHỤ ĐỀ THEO TỪ (Speech-Synced Subtitles)

- Sử dụng `SpeechSyncedSubtitles` (`@shared`).
- **Nguyên tắc:**
  * Hiện sẵn cụm từ ngắn theo nhịp câu.
  * **Chỉ từ đang đọc đổi màu highlight** (`activeColor`).
  * **CẤM rung giật layout:** Tuyệt đối không thay đổi `font-size`, `font-weight`, hoặc phóng to `scale(1.15)` làm nhảy dòng.
  * **Zero Speech = Zero Sub:** Khi im lặng (`activeIndex === -1`), component tự động ẩn hoàn toàn.

---

## 4. LUẬT CÁCH LY THƯƠNG HIỆU & OUTRO BẮT BUỘC (Brand Isolation Mandate)

- Mọi video đều bắt buộc có Outro Thương hiệu ở cảnh cuối cùng: Sử dụng `UserBrandOutro` (`@shared`).
- Nạp User Brand từ `brand/user-brand.json`, cho phép override `headline`, `highlightText`, `accentColor` phù hợp với chủ đề từng video.
- **CẤM 100% giữ lại thương hiệu của video mẫu.**
