# AGENTS.md — AI VIDEO FACTORY V3 (STREAMLINED)

## Mục tiêu

Đây là workspace sản xuất video social tối ưu bằng Codex/Antigravity. Mục tiêu là video hoàn chỉnh, visual storytelling cuốn hút, thiết kế chuẩn mobile 9:16 (kiểm tra trên viewport 360×640).

- **Engine chính duy nhất**: **Remotion** (React, TypeScript, Tailwind/CSS).
- **Voiceover**: Bắt buộc tạo giọng đọc qua **CIT Voice Studio** (VieNeu-TTS local AI `:8001`, mặc định: "Hải Đăng" 48kHz studio, trích xuất timing word thật).
- **An toàn dữ liệu**: Không xóa, di chuyển hoặc làm hỏng các project video cũ trong `projects/` hoặc bản xuất trong `renders/`.

---

## 2 Workflows sản xuất chính (+ 1 Luồng Mở rộng)

1. **Remotion Explainer (`remotion-template`) [Chính]**:
   - **Mục đích**: Giải thích kiến thức, tài chính, công nghệ, bảo hiểm 45–60 giây.
   - **Cấu trúc**: Áp dụng khung 6 cảnh chuẩn Cường IT (`templates/cuongit-explainer/`: Hook, Problem, Solution, Workflow, Benefits, Outro) kết hợp 6 Card Archetypes (`rules/card-archetypes.md`).
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
INPUT (Ý tưởng / URL / Tài liệu)
→ XÁC ĐỊNH ĐỊNH DẠNG VIDEO (BẮT BUỘC hỏi người dùng chọn: Remotion Explainer hay Auto Footage)
→ STORY & CREATIVE PASS
  ├─ Kích hoạt Persona từ kho prompts.chat (prompts/video-personas.md)
  └─ Tạo 2 phương án Hook 3s đầu theo prompts/hook-crafter.md
→ GATE 1: Duyệt Kịch bản (Script) & Beats (DỪNG LẠI CHỜ DUYỆT)
→ CHUẨN BỊ VOICE & TIMING THẬT (CIT Voice Studio :8001 - Hải Đăng 48kHz)
→ GATE 2: Asset Handoff (Duyệt hướng hình ảnh / asset trước khi code)
→ CODE REMOTION / HẬU KỲ (Áp dụng 6 Card Archetypes & Motion Rules)
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
