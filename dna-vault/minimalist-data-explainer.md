---
name: Minimalist Data Explainer
description: Video dọc giải thích số liệu tài chính/kinh doanh mang phong cách tối giản, tập trung vào đồ thị, motion mượt mà và phụ đề hiển thị theo từ (word-by-word).
source_video: "1791172016538_1628895491199834929_6979031375699815793.mp4"
engine_preference: "remotion-template" hoặc "hyperframes"
---

# DNA PROFILE: MINIMALIST DATA EXPLAINER

## 1. Tỷ lệ & Vùng an toàn (Format & Safe Zones)
- **Tỷ lệ:** 9:16 (Vertical) - 1080x1920.
- **Safe Zone:** Phân bổ thị giác dọc theo khung từ `y: 260` đến `y: 1550`.
- Nửa trên cùng chừa trống logo/thương hiệu, góc dưới cùng chừa trống cho UI của TikTok/Reels.

## 2. Thẩm mỹ thị giác (Visual Archetypes)
- **Chủ nghĩa tối giản (Anti-slop):** Không viền rườm rà, không gradient phức tạp. Nền trơn màu tối (Dark Mode - ví dụ: Xanh rêu đậm `#1a302a`, Đen nhám).
- **Màu tương phản (Accent Color):** Các dữ liệu (Data) nổi bật với màu Đỏ/Cam Neon (`#f05030`) để hút mắt người xem.
- **Card Archetypes (Áp dụng theo rule hệ thống):**
  - *Hero Metric:* Hiển thị một con số khổng lồ duy nhất (VD: "-603 tỷ").
  - *Comparison / Grid:* Lưới phân chia rõ ràng 2-4 ô để so sánh các hạng mục.

## 3. Động lực học & Chuyển động (Motion Dynamics)
- **Continuous Transformation:** Không chuyển cảnh bằng kiểu "cắt cụp". Mọi thứ liên tục biến đổi (VD: Cột tụt xuống, khối hình tách đôi).
- **Easing:** Sử dụng các hàm nội suy mượt mà (GSAP spring, custom bezier) để tạo cảm giác "chắc chắn" cho số liệu.
- **Hiệu ứng đặc trưng:**
  - *Bar Grow/Shrink:* Đồ thị tăng giảm.
  - *Liquid/Particle Fill:* Tiền rơi vào phễu, lấp đầy các ô trống (thể hiện sự phân bổ dòng tiền).

## 4. Phụ đề & Âm thanh (Text & Audio Sync)
- **Speech-Synced Subtitles:** Phụ đề Glassmorphism (nền mờ mờ).
- Cơ chế **Karaoke-style Highlight**: Chữ màu trắng, từ nào đang được đọc sẽ đổi sang màu cam/đỏ. Tuyệt đối **KHÔNG** làm nhảy dòng, không zoom size chữ (tránh làm giật mắt).
- **Zero Speech = Zero Sub:** Khi âm thanh ngưng (khoảng lặng), nền và chữ phụ đề biến mất hoàn toàn, trả lại không gian cho đồ thị.
- **Audio:** Giọng đọc nhịp điệu nhanh, rõ ràng (Khuyến nghị: CIT Voice Studio - Giọng Hải Đăng 48kHz). Mức âm lượng chuẩn EBU R128 (-14 đến -12 LUFS).

## 5. Cấu trúc kể chuyện (Storytelling Beats)
- **0-3s (Hook):** Số liệu gây sốc đập vào mắt ngay lập tức.
- **4-35s (Body):** Bóc tách phân tích biểu đồ (tại sao tăng/giảm, chia theo ngành nghề). Tốc độ lướt thẻ nhanh, 1 ý/1 màn hình.
- **35-45s (CTA/Takeaway):** Rút ra một bài học kinh doanh hoặc giải pháp thực thi cực ngắn gọn. Không lan man.

## Hướng dẫn tái tạo (Technical Mapping)
- Sử dụng engine `remotion-template` (dành cho luồng giải thích 6-card chuẩn).
- Áp dụng các thư viện `component-library/charts` (nếu có) hoặc GSAP (`hyperframes` core) để tái tạo hiệu ứng Fill/Grow.
- Chạy qua bước `tts` bằng Factory CLI để lấy word-level timing chuẩn xác.
