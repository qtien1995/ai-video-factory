# AI VIDEO FACTORY V3 🚀

> **Workspace sản xuất video ngắn (9:16) chuyên nghiệp cho TikTok, Reels, YouTube Shorts với Remotion & AI Voice Studio.**  
> **Tích hợp bộ công cụ Reverse-Engineering: Bóc tách và Nhân bản DNA Video Mẫu Chuyên Nghiệp 100%.**

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

## 🧬 Chiến lược "Copy to Win": Bóc tách DNA Video Mẫu 100%

Cách nhanh nhất để làm ra video đẳng cấp là học hỏi từ các pro creators. Chỉ cần gửi file video mẫu (`.mp4`):

```bash
# Bóc tách toàn diện video mẫu
npm run dna -- analyze "duong/dan/video-mau.mp4" --id <TEN-PHONG-CACH>

# Xem danh sách các phong cách DNA đã bóc tách
npm run dna -- list
```

**Hệ thống sẽ tự động bóc tách 5 tầng DNA:**
1. **Bức tranh thị giác tổng quan (Contact Sheet)**: Tạo 1 ảnh lưới chụp toàn bộ nhịp video.
2. **Audio Track độc lập**: Tách riêng giọng đọc, đo tốc độ WPM, nhạc nền và thời điểm chèn SFX.
3. **Cắt cảnh tự động (Scene Cuts)**: Xác định chính xác từng điểm chuyển cảnh (cut frequency).
4. **Bảng màu & Typography**: Bóc tách mã màu nền, màu thẻ, màu accent, font size và vị trí phụ đề an toàn.
5. **Physics chuyển động (Spring Motion)**: Giải mã thông số lò xo (`damping`, `stiffness`), hiệu ứng xuất hiện và continuous idle animation.

Tất cả được lưu trữ tại `dna-vault/<id>/` và sẵn sàng tái hiện 1:1 bằng Remotion!

---

## 🎬 2 Workflows sản xuất chính

| Workflow | Đầu vào | Quy trình | Lưu trữ |
| :--- | :--- | :--- | :--- |
| **Remotion Explainer** | Ý tưởng / Kịch bản giải thích | Khung 6 cảnh chuẩn hoặc 100% DNA đã bóc tách + CIT Voice + Subtitle highlight từ | `projects/social-shorts/` |
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
├── core/                # Bộ não điều phối: Factory CLI, DNA Reverse-Engineering, loudness EBU R128
├── dna-vault/           # Kho lưu trữ các Bộ Gen Video (DNA Profiles) đã bóc tách
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

## 🛠️ Danh mục lệnh điều khiển

```bash
# Bóc tách video mẫu
npm run dna -- analyze "path/to/video.mp4" --id <NAME>
npm run dna -- list

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
