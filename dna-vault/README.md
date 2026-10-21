# DNA VAULT 🧬

Nơi lưu trữ các **Bộ Gen Video (Video DNA Profiles)** được bóc tách từ các video mẫu chuyên nghiệp (TikTok, Shorts, Reels, Vox, YouTube).

---

## 🔬 Cấu trúc một DNA Profile

Mỗi khi bạn bóc tách một video mẫu qua lệnh:
```bash
npm run dna -- analyze "duong/dan/video-mau.mp4" --id <TEN-PHONG-CACH>
```

Hệ thống sẽ tự động sinh thư mục `dna-vault/<TEN-PHONG-CACH>/` gồm:
- `raw/reference.mp4`: Video gốc được sao lưu.
- `raw/narration.wav` & `raw/audio.mp3`: Luồng âm thanh bóc tách độc lập (để phân tích nhịp giọng, BGM, SFX).
- `raw/contact_sheet.jpg`: Toàn bộ các cảnh của video được ghép vào 1 tấm ảnh lưới tổng thể.
- `raw/keyframes/`: Trích xuất 1 frame mỗi giây để theo dõi diễn biến động.
- `raw/scenes/`: Tự động nhận diện các điểm cắt cảnh (cut detection).
- `dna.json`: Thông số kỹ thuật chi tiết:
  - Bảng màu: Background, Surface, Text, Accent, Shadow.
  - Typography: Font family, kích cỡ, casing, line-height, safe zone margin.
  - Phụ đề: Vị trí Y, highlight từng từ (speech-synced), màu sắc.
  - Physics chuyển động: Spring config (damping, stiffness, mass), entrance/exit, continuous idle motion.
  - Thiết kế âm thanh: Tốc độ đọc WPM, vị trí chèn SFX (whoosh, pop, click, cash).
- `README.md`: Báo cáo giải phẫu trực quan.
