# AI VIDEO FACTORY V4 — BESPOKE

> V4: Độc bản thuần túy (Pure Bespoke) — xóa bỏ hoàn toàn styles & DNA preset, mỗi video tự do sáng tạo từ kịch bản.

AI Video Factory V4 sản xuất video ngắn mạng xã hội theo triết lý **độc bản (bespoke)**: mỗi video là một tác phẩm may đo riêng cho nội dung, không rập khuôn mẫu. Hệ thống không còn styles/DNA mẫu. Mỗi video xuất phát từ con số 0 (Tabula Rasa), tự do sáng tạo chuyển động và thẩm mỹ phù hợp với nội dung.

---

## ⚡ BẮT ĐẦU NHANH

```bash
# 1. Kiểm tra sức khoẻ hệ thống (Voice Studio, Remotion, FFmpeg, Dung lượng)
npm run doctor

# 2. Khởi động dịch vụ giọng đọc AI local (CIT Voice Studio VieNeu-TTS :8001)
npm run services

# 3. Mở Remotion Studio xem trước trực quan
npm run studio
```

---

## 🎬 QUY TRÌNH SẢN XUẤT 7 BƯỚC

1. **Brief**: 1 video = 1 ý niệm chính; dọc 9:16 (1080×1920), 45-90 giây.
2. **Art Direction Sheet**: Director lập sheet (mẫu `rules/bespoke-creativity.md`) trình User duyệt (Gate 1 & Gate 2). Cấm fast-track tự duyệt.
3. **Kịch bản**: Số cảnh $N$ may đo theo nội dung (cấm fix cứng 6 cảnh); hook 3s đầu; văn phong nói tự nhiên (`humanizer`, `reels-scripting`).
4. **Voice & Timing**: CIT Voice Studio (giọng khóa cứng "Hải Đăng" 48kHz, speed tùy chỉnh theo project), trích xuất timing từng từ.
5. **Dựng cảnh Bespoke**: Code riêng trong `projects/<id>/` trên nền sân khấu `BespokeVideo`. Tối thiểu 3 kỹ thuật chuyển động/video.
6. **Kiểm tra Frame Tĩnh**: Xuất frame kiểm tra chống tràn chữ, che chữ, khoảng trống chết trước khi render.
7. **Render & Hard QC Gate**: Render trực tiếp Final MP4 (1080x1920, EBU R128 -12.5 LUFS), chạy bộ kiểm thử E2E; fail bất kỳ lỗi nào sẽ dừng và đổi tên thành `final.FAILED.mp4`.

---

## 🛠️ LỆNH THƯỜNG DÙNG

- `npm run doctor` — Kiểm tra sức khỏe toàn bộ workspace.
- `npm run services` — Khởi động VieNeu-TTS local (:8001).
- `npm run studio` — Mở giao diện Remotion Studio.
- `npm run make -- --project <id>` — Sản xuất video: kiểm tra Gate -> TTS Hải Đăng -> Render -> Hard QC Gate.
- `npm run clean` — Dọn dẹp tệp rác tạm (.tmp, .raw.mp4, .runtime).
- `npm run verify -- --project <dir>` — Chạy bộ kiểm thử E2E 4-Tier lên video thành phẩm.
- `node core/scripts/validate/reference.js <video.mp4>` — Đo nhanh thông số video mẫu (in JSON ra stdout).
- `npm test`, `npm run typecheck`, `npm run lint` — Kiểm tra chất lượng mã nguồn.

---

## 📂 CẤU TRÚC THƯ MỤC

```text
ai-video-factory/
├── AGENTS.md                   # Hiến chương V4 Bespoke & Luật Tối Cao
├── brand/                      # Nhận diện thương hiệu User (Tiến Dương / Manulife)
├── config/                     # Cấu hình hệ thống & component-index.json
├── core/                       # Bộ máy điều phối: scripts, factory, tts, validate
├── engines/remotion/           # Engine Remotion, composition BespokeVideo & toolbox shared
├── projects/                   # Thư mục mã nguồn và tài sản phẳng của từng video (projects/<id>/)
├── rules/                      # Quy chuẩn sáng tạo: bespoke-creativity, visual-storytelling
└── tests/                      # Bộ kiểm định E2E (test_final_video.cjs)
```
