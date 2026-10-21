# AGENTS.md — AI VIDEO FACTORY V3 (STREAMLINED)

## Mục tiêu

Đây là workspace sản xuất video social tối ưu bằng Codex/Antigravity. Mục tiêu là video hoàn chỉnh, visual storytelling cuốn hút, thiết kế chuẩn mobile 9:16 (kiểm tra trên viewport 360×640).

- **Engine chính duy nhất**: **Remotion** (React, TypeScript, Tailwind/CSS).
- **Voiceover**: Bắt buộc tạo giọng đọc qua **CIT Voice Studio** (VieNeu-TTS local AI `:8001`, mặc định: "Hải Đăng" 48kHz studio, trích xuất timing word thật).
- **Chiến lược phát triển tối thượng**: **Copy & Clone DNA từ Video Mẫu Chuyên Nghiệp 100%**. Bóc tách từng mili-giây, từng chuyển động, layout và nhịp điệu của các video viral để tái hiện hoàn hảo bằng code.
- **An toàn dữ liệu**: Không xóa, di chuyển hoặc làm hỏng các project video cũ trong `projects/` hoặc bản xuất trong `renders/`.

---

## QUY TRÌNH BÓC TÁCH & CLONE DNA VIDEO MẪU 100%

Khi người dùng cung cấp một video mẫu (file `.mp4`, đường dẫn, hoặc link video):

```text
VIDEO MẪU (MP4 / LINK)
➔ BƯỚC 1: BÓC TÁCH VẬT LÝ TỰ ĐỘNG (`npm run dna -- analyze <path> [--id <name>]`)
  ├─ Trích xuất Technical Specs (Resolution, FPS, Codec, Duration)
  ├─ Tách Audio Track độc lập (`narration.wav` / `audio.mp3`)
  ├─ Bắt Scene Cuts tự động (Điểm chuyển cảnh)
  ├─ Trích xuất 1fps Frames để phân tích chuyển động liên tục
  └─ Tạo ảnh Contact Sheet lưới (Tổng quan thị giác toàn bộ video)
➔ BƯỚC 2: GIẢI PHẪU 5 TẦNG DNA (5-Layer Deep Breakdown)
  ├─ 1. Hook 3s đầu: Visual Hook (vật thể, hiệu ứng) + Verbal Hook + Text Hook (font, màu)
  ├─ 2. Layout & Colors: Palette nền/thẻ/accent, bo góc (radius), đổ bóng, safe zone
  ├─ 3. Typography & Subtitles: Font family, casing, vị trí Y, kiểu highlight từng từ
  ├─ 4. Motion & Spring Physics: Nhịp chuyển cảnh (s/cut), spring damping/stiffness, idle animation
  └─ 5. Sound Design & Audio: Tốc độ đọc WPM, nhịp ngắt nghỉ, năng lượng BGM, danh sách cues SFX
➔ BƯỚC 3: TÁI HIỆN CODE REMOTION 100% (Remotion Replication)
  ├─ Viết Component Remotion tái hiện đúng 100% cấu trúc thị giác và chuyển động
  └─ Lưu profile vào `dna-vault/<id>/dna.json` + `components/`
➔ BƯỚC 4: SẢN XUẤT VIDEO MỚI
  └─ Giữ nguyên 100% DNA chuyển động & layout, thay thế kịch bản và nội dung mới
```

> [!CAUTION]
> **LUẬT CÁCH LY THƯƠNG HIỆU & OUTRO BẮT BUỘC (BRAND ISOLATION MANDATE)**:
> 1. **Mọi video đều cần có Outro Thương hiệu**: Tạo điểm dừng kết thúc chuyên nghiệp, kêu gọi hành động (CTA), ghi nhớ thương hiệu và tuân thủ pháp lý/disclaimer.
> 2. **CẤM 100% giữ lại thương hiệu của video mẫu**: Khi bóc tách video tham khảo, tuyệt đối KHÔNG mang tên kênh, logo, slogan, watermark hay hotline của tác giả gốc (như HODL.VN, Cường IT...) vào code sản phẩm.
> 3. **Tự động thay thế bằng Thương hiệu của User**: Toàn bộ Outro, Eyebrow và Watermark bắt buộc nạp thông tin nhận diện của User (được định cấu hình tại `brand/user-brand.json`).


---

## 2 Workflows sản xuất chính (+ 1 Luồng Mở rộng)

1. **Remotion Explainer (`remotion-template`) [Chính]**:
   - **Mục đích**: Giải thích kiến thức, tài chính, công nghệ, bảo hiểm 45–60 giây.
   - **Cấu trúc**: Áp dụng khung 6 cảnh chuẩn Cường IT (`templates/cuongit-explainer/`: Hook, Problem, Solution, Workflow, Benefits, Outro) kết hợp 6 Card Archetypes (`rules/card-archetypes.md`) hoặc các DNA Profile đã clone.
   - **Quy trình**: Kịch bản + Beats ➔ Ghép giọng CIT Voice Studio Hải Đăng (lấy timing thật) ➔ Render qua engine `engines/remotion` ➔ Preview & QA ➔ Final MP4.
   - **Lưu trữ**: `projects/social-shorts/CNT-[YYYYMMDD]-[TEN-DU-AN]` hoặc `projects/financial-insurance/`.

2. **Auto Footage (`auto-footage`) [Chính]**:
   - **Mục đích**: Video quay sẵn (talking-head, review clip, podcast).
   - **Quy trình**: Cắt bỏ khoảng lặng (jump-cut tự động) ➔ Phụ đề động speech-synced ➔ Chèn motion graphic overlays ➔ Xuất MP4 hoàn chỉnh.
   - **Lưu trữ**: `projects/auto-cuts/CNT-[YYYYMMDD]-[TEN-DU-AN]`.

3. **Vox Style / Google Flow (`vox-director`) [Mở rộng]**:
   - **Mục đích**: Video phóng sự, phân tích chuyên sâu với footage AI sinh từ Google Flow (Omni 1.1 Flash / Veo).
   - **Quy trình**: Script & Beats ➔ Xuất `production_prompts.md` ➔ User tạo clip hoặc chạy qua FlowKit ➔ Ghép giọng CIT Voice + Phụ đề ASS glassmorphism ➔ Xuất Final MP4.
   - **Lưu trữ**: `projects/vox-style/CNT-[YYYYMMDD]-[TEN-DU-AN]`.

---

## Pipeline chuẩn & Chốt chặn kiểm duyệt (Gates)

```text
INPUT (Ý tưởng / URL / Tài liệu / Video Mẫu)
→ XÁC ĐỊNH ĐỊNH DẠNG VIDEO & NGUỒN DNA (Chọn template chuẩn hoặc Clone từ Video Mẫu)
→ STORY & CREATIVE PASS
  ├─ Kích hoạt Persona từ kho prompts.chat (prompts/video-personas.md)
  └─ Tạo 2 phương án Hook 3s đầu theo prompts/hook-crafter.md
→ GATE 1: Duyệt Kịch bản (Script) & Beats (DỪNG LẠI CHỜ DUYỆT)
→ CHUẨN BỊ VOICE & TIMING THẬT (CIT Voice Studio :8001 - Hải Đăng 48kHz)
→ GATE 2: Asset Handoff (Duyệt hướng hình ảnh / asset trước khi code)
→ CODE REMOTION / HẬU KỲ (Áp dụng 100% DNA đã bóc tách & Motion Rules)
→ QA, PACKAGE (Sinh 3 Thumbnails, SEO metadata, Caption đăng tải)
→ GATE 3: Báo cáo QA & Duyệt Render Final (DỪNG LẠI CHỜ DUYỆT)
→ Final video MP4 hoàn chỉnh (1080x1920, EBU R128 -12.5 LUFS)
```

> [!IMPORTANT]
> **CHẾ ĐỘ SẢN XUẤT (DUAL-MODE)**:
> - **Strict Mode (Mặc định)**: Dừng lại ở từng chốt chặn (**Gate 1 ➔ Gate 2 ➔ Gate 3**) để người dùng trực tiếp kiểm duyệt và phản hồi.
> - **Fast-Track Mode (`fast-track`)**: Dành cho video ngắn theo template chuẩn. Tự động duyệt qua Gate 1 & 2 theo template và chỉ dừng lại duy nhất ở **Gate 3 (Báo cáo QA & Duyệt Render Final)**.

---

## Hàng rào an toàn thị giác bắt buộc (Hard Constraints)

Trước khi code Remotion, Agent **BẮT BUỘC** đọc:
- [`rules/visual-storytelling.md`](rules/visual-storytelling.md) — Chi tiết thiết kế thẻ, ngắt dòng, phân bổ dọc, phụ đề và kiểm tra thực tế trên 360×640.
- [`rules/card-archetypes.md`](rules/card-archetypes.md) — 6 bố cục thẻ mẫu chuẩn (Hero Metric, Comparison, Feature Grid, Step Flow, Checklist, Quote).

1. **Thiết kế riêng từng thẻ**: Một ý chính rõ ràng, phân cấp rõ Tiêu đề / Nội dung / Số liệu / Nhấn mạnh. Font size phải đọc rõ ràng trên mobile viewport 360×640.
2. **CẤM cắt chữ**: Tuyệt đối không dùng `overflow: hidden`, `text-overflow: ellipsis`, hoặc `-webkit-line-clamp` để giấu chữ thừa. Cấm tự co chữ (shrink-to-fit) làm nát layout.
3. **CẤM render khung rỗng**: Khi title/description rỗng hoặc undefined, component phải `return null`, tuyệt đối không render wrapper có viền/nền trống.
4. **Phụ đề theo từ (Speech-Synced Subtitles)**:
   - Hiện sẵn cụm từ ngắn theo nhịp câu.
   - **Chỉ từ đang đọc đổi màu highlight**. CẤM đổi cỡ chữ, độ đậm, scale (không dùng `scale(1.15)`) làm nhảy dòng/rung chữ.
   - **Zero Speech = Zero Sub**: Khi im lặng (`activeIndex === -1`), ẩn hoàn toàn cả chữ lẫn khung nền phụ đề (`return null`).
5. **Mobile Safe Zones**: Phân bố thị giác cân đối dọc theo khung 9:16 (trải từ `y: 260` đến `y: 1550`), tránh dồn cục ở nửa trên bỏ trống nửa dưới.
6. **Tiêu chuẩn Audio (EBU R128 Bắt buộc)**:
   - `Integrated Loudness`: **-14 đến -12 LUFS** (chuẩn **-12.5 LUFS** cho TikTok/Reels/Shorts).
   - `Loudness Range (LRA)`: **< 8 LU**.
   - `True Peak`: **< -1.0 dBFS** (chống clipping/méo tiếng).

---

## Factory CLI & Lệnh tắt Nhanh

- `npm run dna -- analyze <video-file> [--id <name>]`: **Bóc tách và Clone DNA từ Video Mẫu**.
- `npm run dna -- list`: Xem danh mục các DNA Profile đã bóc tách trong `dna-vault/`.
- `npm run doctor`: Kiểm tra sức khỏe hệ thống (CIT Voice Studio, FFmpeg, Remotion).
- `npm run studio`: Khởi động Remotion Studio trực quan để xem trước cảnh quay.
- `npm run services`: Khởi động các background services (CIT Voice Studio, FlowKit).
- `npm run factory -- status --project <id>`: Kiểm tra trạng thái dự án.
- `npm run factory -- approve --gate GATE1|GATE2|GATE3 --project <id> --evidence "lời duyệt"`: Phê duyệt chốt chặn.
- `npm run factory -- tts --project <id>`: Tạo voice và đo timing thật bằng FFprobe.
- `npm run factory -- render --kind preview|final --project <id>`: Render Remotion + chuẩn hóa EBU R128 + contact sheet QA.
- `npm run factory -- package --project <id>`: Tự động trích xuất 3 thumbnails, sinh metadata SEO và caption mạng xã hội.
- `npm run verify -- --project <dir>`: Chạy bộ kiểm thử E2E 4-Tier kiểm tra file MP4 xuất xưởng.
- `npm test`: Chạy toàn bộ unit test của Factory Core.
- `npm run lint` & `npm run typecheck`: Kiểm tra chất lượng mã nguồn TypeScript/ESLint.
