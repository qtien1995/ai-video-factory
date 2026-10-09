---
name: auto-footage
description: Tự động xử lý video quay sẵn (raw footage/talking head) - cắt lọc khoảng lặng (jump-cut), tạo phụ đề động (subtitles) và chèn các motion graphics overlay (breaking news, stat callout, split screen) từ component library.
---

# Auto Footage & Raw Video Processor

Quy trình tự động hóa xử lý video quay sẵn cho TikTok, Reels, Shorts.

## Khi nào sử dụng?
Sử dụng skill này khi:
1. Người dùng cung cấp file video quay sẵn (talking-head, vlog, video review, clip thuyết trình).
2. Yêu cầu: "cắt ghép video này", "thêm sub cho clip", "gắn motion graphic vào video quay sẵn", "biên tập tự động từ footage".

## Quy trình xử lý (5 bước chuẩn)

### Bước 1: Khởi tạo Project trong `projects/auto-cuts/`
- Đặt tên project chuẩn: `CNT-[YYYYMMDD]-[TEN-DU-AN]`
- Copy hoặc link video gốc vào `assets/raw-footage.mp4`.

### Bước 2: Tự động Cắt khoảng lặng (Silence Removal / Jump-cut)
- Sử dụng FFmpeg hoặc script audio-silencedetect:
  ```bash
  ffmpeg -i raw-footage.mp4 -af silencedetect=noise=-30dB:d=0.5 -f null -
  ```
- Cắt bỏ các đoạn ngập ngừng, giữ nhịp nói dồn dập, tự nhiên chuẩn mạng xã hội.

### Bước 3: Tạo Phụ đề Động (Dynamic Word-Level Subtitles)
- Trích xuất audio và nhận diện thời gian từ chính xác (word-level timestamps).
- Định dạng phụ đề:
  - Kiểu 1: Phụ đề 1 dòng (Single-line chunked), 5-7 từ/lần, cỡ lớn `font-bold text-4xl`.
  - Kiểu 2: Highlight từng từ đang đọc (Karaoke-style highlight).

### Bước 4: Chèn Motion Graphics Overlays
Lựa chọn các mẫu overlay phù hợp từ `component-library/overlays/`:
- **`breaking-news`**: Dải tin giật gân, sự kiện nóng, ticker chạy chân trang.
- **`stat-callout`**: Hộp chỉ số, thống kê khi người nói nhắc đến số liệu.
- **`split-screen`**: Chia đôi màn hình (người nói + ảnh/video minh họa B-roll).
- **`quote-card`**: Thẻ trích dẫn lời nói hoặc phát biểu quan trọng.
- **`big-number`**: Số đếm nhảy số ấn tượng.
- **`shimmer-sweep` / `grain-overlay`**: Hiệu ứng cinematic & ánh sáng.

### Bước 5: Ghép Final Video (Assembly)
- Ghép footage đã cắt + track phụ đề + track overlay + nhạc nền BGM (tự động ducking dìm nhỏ nhạc khi người nói đang nói).
- Xuất file bàn giao duy nhất tại `output/final.mp4` chuẩn 1080x1920, 30fps/60fps, loudness EBU R128 (-14 đến -12.5 LUFS).
