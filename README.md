# AI VIDEO FACTORY V3 🚀

> **Workspace sản xuất video ngắn (9:16) chuyên nghiệp cho TikTok, Reels, YouTube Shorts với Remotion & AI Voice Studio.**

---

## ⚡ Bắt đầu nhanh trong 3 bước

### 1. Kiểm tra môi trường
```bash
npm run doctor
```
Kiểm tra xem CIT Voice Studio (VieNeu-TTS :8001), FFmpeg và Remotion đã sẵn sàng chưa.

### 2. Khởi động dịch vụ hỗ trợ
```bash
npm run services
```
Tự động kích hoạt CIT Voice Studio (giọng chuẩn Studio Hải Đăng 48kHz) và các công cụ cần thiết.

### 3. Mở Remotion Studio xem trước
```bash
npm run studio
```
Mở giao diện Remotion Studio trực tiếp trên trình duyệt để chỉnh sửa timeline, components và typography thời gian thực.

---

## 🎬 2 Workflows sản xuất chính

| Workflow | Đầu vào | Quy trình | Lưu trữ |
| :--- | :--- | :--- | :--- |
| **Remotion Explainer** | Ý tưởng / Kịch bản giải thích | Khung 6 cảnh chuẩn Cường IT + 6 Card Archetypes + CIT Voice + Subtitle highlight từ | `projects/social-shorts/` |
| **Auto Footage** | Video quay sẵn (talking-head, review) | Cắt lọc khoảng lặng (jump-cut) + Phụ đề động + Motion Overlays | `projects/auto-cuts/` |

---

## 📁 Cấu trúc thư mục tinh gọn

```text
D:\AI\VIDEO AI\
├── .agents/skills/      # 6 kỹ năng AI cốt lõi (remotion-explainer, cit-voice-studio, auto-footage, prompts-chat...)
├── .tools/              # FFmpeg tĩnh & FlowKit engine
├── assets/              # Kho âm thanh BGM, SFX, fonts, hình ảnh
├── brand/               # Nhận diện thương hiệu & cấu hình cá nhân
├── config/              # Cấu hình chuẩn factory-config.json
├── core/                # Bộ não điều phối Factory CLI, validation, loudness EBU R128
├── engines/
│   └── remotion/        # Engine dựng video Remotion React/TypeScript duy nhất
├── projects/            # Thư mục chứa các video thực tế (không xóa khi dọn dẹp)
├── prompts/             # Kho 1.100+ prompts.chat, hook-crafter, personas
├── renders/             # Nơi lưu trữ các video MP4 thành phẩm
├── rules/               # Luật thiết kế visual-storytelling & 6 card-archetypes
├── templates/
│   └── cuongit-explainer/ # Template mẫu 6 cảnh chuẩn Remotion
├── tests/               # Bộ test tự động E2E 4-tier kiểm tra chất lượng video
├── AGENTS.md            # Quy chuẩn bắt buộc cho AI Agent
└── package.json         # Danh mục lệnh npm điều khiển toàn bộ workspace
```

---

## 🛠️ Lệnh điều khiển hữu ích

```bash
# Kiểm tra sức khỏe toàn hệ thống
npm run doctor

# Mở Remotion Studio trực quan
npm run studio

# Chạy test kiểm thử logic Factory
npm test

# Kiểm tra cú pháp TypeScript & Linting
npm run typecheck
npm run lint

# Kiểm định chất lượng video MP4 đã xuất (Loudness, Resolution, Codec, Freeze frame)
npm run verify -- --target projects/<id>/output/final.mp4
```

---

## 📋 Tiêu chuẩn xuất xưởng bắt buộc

1. **Khung hình**: Portrait 9:16 (1080×1920), 30fps, codec H.264 / AAC.
2. **Âm thanh chuẩn phát thanh**: Integrated Loudness **-12.5 LUFS**, LRA **< 8 LU**, True Peak **< -1.0 dBFS**.
3. **Phụ đề**: Đồng bộ theo giọng đọc thật, đổi màu highlight từng từ đang đọc, im lặng thì ẩn hoàn toàn (`Zero Speech = Zero Sub`).
4. **An toàn hiển thị**: Thiết kế tối ưu cho màn hình điện thoại 360×640, không cắt chữ, không tràn lề.
