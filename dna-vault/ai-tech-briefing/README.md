# DNA PROFILE: ai-tech-briefing

> **Nguồn video mẫu**: `video_2026-10-24_11-45-50.mp4`  
> **Thời lượng**: 110.64s | **Khung hình**: 576x1024 (9:16 Mobile) | **FPS**: 30

---

## 📸 Bức tranh thị giác tổng quan (Contact Sheet)

Toàn bộ nhịp diễn hoạt của video mẫu được trích xuất thành 1 contact sheet tại:
`raw/contact_sheet.jpg`

---

## 🔬 Giải phẫu 5 tầng DNA của video mẫu

### 1. Nhịp độ & Dựng cảnh (Rhythm & Cuts)
- **Tổng số cảnh (Scene Cuts)**: **6** điểm cắt.
- **Tần suất cắt trung bình**: **18.4 giây/cảnh**.
- **Đánh giá nhịp độ**: **CALM / DOCUMENTARY**.

### 2. Thiết kế Thẻ & Màu sắc (Layout & Color Palette)
- **Nền**: `#0f172a`
- **Mặt thẻ (Card Surface)**: `#1e293b`
- **Màu nhấn (Accent)**: `#38bdf8`
- **Bo góc (Radius)**: `24px`

### 3. Phụ đề & Typography (Subtitles DNA)
- **Kiểu phụ đề**: Highlight từng từ theo giọng nói thật (Speech-synced word highlight).
- **Màu từ đang đọc**: `#38bdf8`
- **Vị trí hiển thị an toàn**: Safe zone `y: 1450`

### 4. Vật lý chuyển động (Spring Motion DNA)
- **Spring parameters**: `damping: 18`, `stiffness: 140`, `mass: 0.8`.
- **Hiệu ứng xuất hiện**: slide-up + pop-scale(0.85 -> 1.0).
- **Hiệu ứng duy trì (Continuous Motion)**: subtle-floating(sin-wave +- 6px).

### 5. Thiết kế Âm thanh (Sound Design DNA)
- **Tốc độ đọc**: ~150 WPM.
- **Tone giọng**: Authoritative, confident, tech-savvy.
- **SFX điểm xuyết**: whoosh-transition, pop-reveal, cash-ding, camera-click.

---

## 🎯 Hướng dẫn nhân bản (100% Replication Guide)

1. Mở xem Contact Sheet để nắm trọn vẹn bố cục các cảnh.
2. Dùng file `dna.json` này để áp dụng vào component Remotion tương ứng trong `engines/remotion/src/projects/`.
3. Giữ 100% DNA chuyển động và bố cục thẻ, thay thế nội dung kịch bản mới.
