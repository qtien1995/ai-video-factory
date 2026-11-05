---
name: auto-footage
description: "Tự động biên tập video quay sẵn (raw footage/talking-head) chuyên nghiệp: tự động cắt lọc khoảng lặng (jump-cut), tách nền người nói bằng AI (Cutout Matting) để người nổi bồng bềnh trước đồ họa, phụ đề động highlight từng từ (Karaoke-style), tự động nhận diện từ khóa để bật logo/thẻ số liệu (Keyword Mapping), chèn hiệu ứng vẽ tay SVG (HandDrawn Circle/Underline), và cân bằng âm thanh chuẩn EBU R128."
---

# Auto Footage & Talking-Head Studio (Pro V2)

Quy trình tự động hóa toàn diện cho video người nói trước camera (vlog, review tài chính, chia sẻ chuyên gia) trên TikTok, Reels, Shorts kết hợp sức mạnh Remotion Bespoke.

---

## 🚀 Các Siêu Năng Lực Nâng Cao

1. **AI Video Matting (Tách nền người nói)**: Dùng mô hình RVM (`core/scripts/footage/cutout.py`) bóc tách người nói thành video WebM trong suốt (`speaker_alpha.webm`). Cho phép người nói đứng đè lên các biểu đồ 3D, canvas chuyển động hoặc hiệu ứng Remotion.
2. **Hiệu ứng Vẽ tay Sinh động (HandDrawn SVG)**: Khoanh tròn hữu cơ (`<HandDrawnCircle />`), gạch chân uốn lượn (`<HandDrawnUnderline />`), vệt dạ quang (`<HandDrawnHighlight />`) và mũi tên chỉ trỏ (`<HandDrawnArrow />`) có animation vẽ nét + hiệu ứng rung lắc tự nhiên.
3. **Keyword-to-Asset Mapping**: Tự động quét từ khóa thương hiệu (Manulife, Vietcombank, ngân hàng, lạm phát, GDP, % số liệu) để kích hoạt popup đúng giây (`core/scripts/footage/keyword-mapper.js`).
4. **Silence Cut & Dynamic Subs**: Cắt ngập ngừng chính xác, tạo phụ đề động chuẩn nhịp giọng đọc.

---

## 🛠️ Quy Trình Xử Lý 6 Bước Chuẩn (SOP)

### Bước 1: Khởi tạo Project trong `projects/auto-cuts/`
- Đặt tên project chuẩn: `CNT-[YYYYMMDD]-[TEN-DU-AN]`
- Đưa video gốc vào thư mục dự án: `assets/raw-footage.mp4`.

### Bước 2: Tự động Lọc khoảng lặng (Jump-Cut)
- Sử dụng FFmpeg hoặc silencedetect để cắt sạch ngập ngừng:
  ```bash
  ffmpeg -i assets/raw-footage.mp4 -af silencedetect=noise=-30dB:d=0.45 -f null -
  ```
- Ghép nối liền mạch, giữ nhịp nói dồn dập, tự nhiên, cuốn hút.

### Bước 3: Tách Nền Người Nói AI (Tùy chọn Chế độ Nổi trước Đồ Họa)
- Nếu kịch bản yêu cầu người nói nổi trên background động hoặc biểu đồ 3D:
  ```bash
  python core/scripts/footage/cutout.py assets/raw-footage.mp4 assets/cutout/ --format webm --ratio 0.4
  ```
- Kết quả tạo ra `assets/cutout/speaker_alpha.webm` (video trong suốt).
- Trong Remotion chỉ cần nhúng:
  ```tsx
  <Video src={staticFile("cutout/speaker_alpha.webm")} style={{ position: "absolute", zIndex: 10 }} />
  ```

### Bước 4: Nhận Diện Từ Khóa & Tạo Plan Hiển Thị (Keyword Mapping)
- Chạy mapper để tự động khớp các điểm rơi đồ họa:
  ```bash
  node core/scripts/footage/keyword-mapper.js assets/words.json assets/overlays_plan.json
  ```
- Plan tự động định vị các đoạn cần khoanh tròn hoặc nhảy thẻ tài chính.

### Bước 5: Chèn HandDrawn SVG & Overlays Trong Remotion
- Nhúng các primitive có sẵn trong `engines/remotion/src/shared/`:
  - **Khoanh tròn từ khóa quan trọng**: `<HandDrawnCircle color="#EAB308" />`
  - **Vệt highlight dạ quang**: `<HandDrawnHighlight color="rgba(234, 179, 8, 0.4)">Tên thương hiệu</HandDrawnHighlight>`
  - **Gạch chân số liệu**: `<HandDrawnUnderline width={320} />`
  - **Thẻ thống kê/tin nóng**: `<HighlightBadge label="CẢNH BÁO LẠM PHÁT" />`, `<MetricCounter to={15} suffix="%" />`

### Bước 6: Hoàn Tất Render & QC Âm Thanh Chuẩn
- Ghép footage + track phụ đề + track overlay + nhạc nền BGM (tự động ducking dìm nhỏ nhạc khi người nói đang nói).
- Kiểm tra cổng chất lượng:
  - Khổ hình 1080x1920 (9:16)
  - Loudness EBU R128: **-14 đến -12 LUFS; True Peak < -1.0 dBFS**
  - Không freeze hình quá 3 giây.
