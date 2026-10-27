# CẨM NANG VẬN HÀNH & BẢO TRÌ HỆ THỐNG
**AI Video Factory V3 — Modular Architecture**

> Tài liệu hướng dẫn ngắn gọn dành cho kỹ thuật viên và người vận hành không chuyên.

---

## 1. Ba lệnh cơ bản chạy từ A đến Z (Quick Start)

Chỉ cần mở PowerShell hoặc Terminal tại thư mục gốc của dự án và chạy tuần tự 3 lệnh:

```bash
# Bước 1: Khởi động dịch vụ hỗ trợ giọng đọc (VieNeu-TTS AI :8001)
npm run start

# Bước 2: Kiểm tra sức khỏe hệ thống (FFmpeg, Node.js, Voice Studio)
npm run check

# Bước 3: Tự động sản xuất video hoàn chỉnh (TTS -> Render Final MP4 -> QC -> Packaging)
npm run make -- --project <tên_folder_dự_án>
```

*Ví dụ thực tế:*
```bash
npm run make -- --project CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3
```

> **Lệnh bổ trợ khi cần:**
> * `npm run studio`: Mở giao diện Web xem trước (Remotion Studio) để căn chỉnh khung hình.
> * `npm run clean`: Dọn dẹp nhanh các file nháp tạm (.tmp, .raw.mp4) sau khi render.

---

## 2. Vị trí các tệp cần sửa đổi khi bảo trì (Key Touchpoints)

Khi cần tùy chỉnh hành vi hoặc giao diện của xưởng video, bạn chỉ cần can thiệp vào đúng 4 vị trí sau:

### 🎙️ 1. Thay đổi giọng đọc & âm điệu thuyết minh (TTS)
* **Tệp cần sửa:** [`core/scripts/tts/index.js`](file:///d:/AI/VIDEO%20AI/core/scripts/tts/index.js)
* **Nội dung điều chỉnh:**
  * Thay đổi tên giọng đọc mặc định (dòng 178: `voice = argv.voice || "Hải Đăng"`).
  * Tùy chỉnh tốc độ đọc (dòng 179: `speed = 0.85` — 1.0 là tốc độ chuẩn, 0.85 là truyền cảm/chậm rãi).
  * Điều chỉnh địa chỉ server CIT Voice Studio cục bộ (mặc định: `http://127.0.0.1:8001`).

---

### 🎨 2. Tùy chỉnh bố cục thẻ, hiệu ứng & chuyển động (Components)
* **Thư mục cần sửa:** [`engines/remotion/src/shared/`](file:///d:/AI/VIDEO%20AI/engines/remotion/src/shared)
* **Các linh kiện chính:**
  * [`CardArchetypes.tsx`](file:///d:/AI/VIDEO%20AI/engines/remotion/src/shared/CardArchetypes.tsx): Sửa 6 bố cục thẻ chuẩn (Hero Metric, So sánh 2 cột, Lưới đặc tính, Quy trình các bước...).
  * [`SpatialHUDCard.tsx`](file:///d:/AI/VIDEO%20AI/engines/remotion/src/shared/SpatialHUDCard.tsx): Hiệu ứng thẻ 2.5D Spatial Glass HUD nghiêng thị sai và laser quét.
  * [`SpeechSyncedSubtitles.tsx`](file:///d:/AI/VIDEO%20AI/engines/remotion/src/shared/SpeechSyncedSubtitles.tsx): Cỡ chữ, màu highlight từng từ theo giọng nói thật.
  * [`UserBrandOutro.tsx`](file:///d:/AI/VIDEO%20AI/engines/remotion/src/shared/UserBrandOutro.tsx): Hoạt cảnh Outro kết thúc video (Logo, Slogan, Kêu gọi hành động CTA).

---

### 📁 3. Thêm một video dự án mới
* **Thư mục thao tác:** Tạo một thư mục con mới trong [`projects/`](file:///d:/AI/VIDEO%20AI/projects) theo phân loại phù hợp:
  * `projects/financial-insurance/`: Video tài chính, bảo hiểm, ngân hàng.
  * `projects/explainers/`: Video giải thích kiến thức, công nghệ dạng thẻ 2D.
  * `projects/motion-graphics/`: Video đồ họa chuyển động, timeline phức tạp.
  * `projects/social-shorts/`: Video ngắn 15–30s viral TikTok/Reels.
* **Cấu trúc tối thiểu của 1 folder dự án:**
  ```text
  projects/<nhóm>/<MÃ-DỰ-ÁN>/
  ├── script.md              # Kịch bản lời thoại
  ├── beats.json             # Phân rã nhịp các cảnh (Hook, Problem, Solution...)
  └── assets/
      └── audio/             # Nhạc nền bgm.mp3 hoặc sfx (nếu có)
  ```

---

### 🏷️ 4. Thay đổi thông tin nhận diện thương hiệu (Brand)
* **Tệp cần sửa:** [`brand/user-brand.json`](file:///d:/AI/VIDEO%20AI/brand/user-brand.json)
* **Nội dung điều chỉnh:**
  * Tên kênh (`channelName`), slogan (`tagline`).
  * Tên người sáng tạo (`creatorHandle`), số hotline/website.
  * Màu sắc nhận diện (`brandColor`).

---

## 3. Khắc phục sự cố nhanh (Troubleshooting)

| Hiện tượng | Nguyên nhân | Cách xử lý |
| :--- | :--- | :--- |
| **Báo lỗi `CIT Voice Studio OFFLINE`** | Chưa mở app CIT Voice Studio trên máy | Mở icon `CIT Voice Studio` trên màn hình Desktop hoặc chạy `npm run start`. |
| **Video render xong bị lệch tiếng** | File `timing.json` không khớp thời lượng thực | Chạy lại `npm run factory -- tts --project <tên_folder>` để đo lại nhịp bằng FFprobe. |
| **Bị tràn bộ nhớ đệm render** | Webpack cache hoặc tệp tạm quá nhiều | Chạy lệnh `npm run clean`. |
| **Không mở được Remotion Studio** | Port Remotion bị chiếm dụng | Tắt bớt terminal cũ và chạy lại `npm run studio`. |
