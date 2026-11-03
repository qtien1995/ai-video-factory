# CẨM NANG VẬN HÀNH & BẢO TRÌ (FACTORY V4 BESPOKE)

> Tài liệu vận hành ngắn gọn dành cho kỹ thuật viên và người vận hành hệ thống.

---

## 1. Ba Lệnh Cơ Bản (Quick Start)

```bash
# 1. Khởi động dịch vụ giọng đọc AI local (VieNeu-TTS Hải Đăng 48kHz :8001)
npm run services

# 2. Kiểm tra sức khỏe toàn bộ hệ thống (FFmpeg, Node, Remotion, TTS)
npm run doctor

# 3. Sản xuất video hoàn chỉnh (Kiểm tra Gate -> TTS -> Render Final -> QC Gate)
npm run make -- --project <tên_folder_dự_án>
```

> **Lệnh bổ trợ:**
> - `npm run studio`: Mở giao diện Remotion Studio xem trước trực quan.
> - `npm run clean`: Dọn dẹp nhanh các file tạm (.tmp, .raw.mp4) sau render.
> - `npm run verify -- --project <dir>`: Chạy kiểm định E2E độc lập lên video final.

---

## 2. Vị Trí Can Thiệp Khi Tùy Chỉnh (Key Touchpoints)

1. **Thông tin Thương hiệu User**: [`brand/user-brand.json`](file:///d:/AI/VIDEO%20AI/brand/user-brand.json) — Cập nhật tên kênh, slogan, handle và disclaimer.
2. **Tốc độ đọc giọng Hải Đăng**: Đặt `ttsSpeed` trong file `inputProps.json` của từng project (hoặc truyền cờ `--speed <value>` khi chạy TTS). Không cần sửa mã nguồn.
3. **Mã nguồn cảnh video**: Viết code riêng cho từng cảnh trong thư mục dự án `projects/<id>/`. Dùng composition `BespokeVideo` làm sân khấu trống.

---

## 3. Khắc Phục Sự Cố Nhanh (Troubleshooting)

| Hiện tượng | Nguyên nhân | Cách xử lý |
| :--- | :--- | :--- |
| **Báo lỗi `CIT Voice Studio OFFLINE`** | Chưa mở app CIT Voice Studio trên máy (:8001) | Chạy `npm run services` hoặc mở CIT Voice Studio. Chỉ dùng `ALLOW_VOICE_FALLBACK=1` khi User cho phép. |
| **Make báo `GATE CHECK BLOCKED`** | Dự án chưa qua Gate 1 (Kịch bản) hoặc Gate 2 (Art Direction) | Trình kịch bản & Art Direction Sheet cho User; sau đó duyệt bằng `node core/scripts/factory/index.js approve --project <id> --gate <GATE1\|GATE2>`. |
| **Video bị đổi tên thành `final.FAILED.mp4`** | Không vượt qua bộ kiểm định Hard QC (loudness, peak, freeze, duration...) | Xem thông báo lỗi QC trên terminal, kiểm tra 5 frame tĩnh trong `output/storyboard-check/`, tinh chỉnh code và chạy lại `make`. |
| **Không mở được Remotion Studio** | Port 3000 bị chiếm dụng | Tắt terminal cũ đang chạy studio hoặc chạy `npm run clean`. |
