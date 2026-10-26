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
➔ BƯỚC 1: BÓC TÁCH VẬT LÝ TỰ ĐỘNG (`npm run dna -- analyze <path> [--name <style-name>]`)
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
➔ BƯỚC 3: TỰ ĐỘNG ĐÓNG GÓI VÀO THƯ VIỆN STYLE (`styles/<style-name>/`)
  ├─ Tự động sinh `style.json` (chuẩn schema) + `theme.ts` (TypeScript dùng ngay cho Remotion)
  ├─ Lưu ảnh Contact Sheet vào `styles/<style-name>/contact_sheet.jpg`
  └─ Tự động đăng ký vào `styles/registry.json` và export qua alias `@styles`
➔ BƯỚC 4: SẢN XUẤT VIDEO MỚI
  └─ Chọn Style từ `styles/`, giữ nguyên 100% DNA chuyển động & layout, thay thế kịch bản và nội dung mới
```

> [!CAUTION]
> **LUẬT CÁCH LY THƯƠNG HIỆU & OUTRO BẮT BUỘC (BRAND ISOLATION MANDATE)**:
> 1. **Mọi video đều cần có Outro Thương hiệu**: Tạo điểm dừng kết thúc chuyên nghiệp, kêu gọi hành động (CTA), ghi nhớ thương hiệu và tuân thủ pháp lý/disclaimer.
> 2. **CẤM 100% giữ lại thương hiệu của video mẫu**: Khi bóc tách video tham khảo, tuyệt đối KHÔNG mang tên kênh, logo, slogan, watermark hay hotline của tác giả gốc (như HODL.VN, Cường IT...) vào code sản phẩm.
> 3. **Tự động thay thế bằng Thương hiệu của User**: Toàn bộ Outro, Eyebrow và Watermark bắt buộc nạp thông tin nhận diện của User (được định cấu hình tại `brand/user-brand.json`).


---

## 2 Workflows sản xuất chính

1. **Remotion Explainer (`remotion-template`) [Chính]**:
   - **Mục đích**: Giải thích kiến thức, tài chính, công nghệ, bảo hiểm 45–60 giây.
   - **3 Style Cốt Lõi Tinh Gọn (`styles/`)**:
     * `finance-data-pro`: Tài chính & Dữ liệu chuyên sâu (Tích hợp 100% DNA HODL.VN Bar Chart Race + TradingView + Báo cáo vĩ mô).
     * `clean-explainer`: Giải thích thẻ 2D chuẩn Cường IT (6 cảnh Hook->Problem->Solution->Workflow->Benefits->Outro, 2 preset: Tech/Bảo hiểm).
     * `kinetic-minimalist`: Chữ động siêu lớn tương phản mạnh mẽ cho hook viral 15–30s.
   - **Quy trình**: Kịch bản + Beats ➔ Ghép giọng CIT Voice Studio Hải Đăng (lấy timing thật) ➔ Render qua engine `engines/remotion` ➔ Xuất Final MP4 trực tiếp (điều chỉnh trực tiếp trên video).
   - **Lưu trữ**: `projects/social-shorts/CNT-[YYYYMMDD]-[TEN-DU-AN]` hoặc `projects/financial-insurance/`.

2. **Auto Footage (`auto-footage`) [Chính]**:
   - **Mục đích**: Video quay sẵn (talking-head, review clip, podcast).
   - **Quy trình**: Cắt bỏ khoảng lặng (jump-cut tự động) ➔ Phụ đề động speech-synced ➔ Chèn motion graphic overlays ➔ Xuất Final MP4 hoàn chỉnh.
   - **Lưu trữ**: `projects/auto-cuts/CNT-[YYYYMMDD]-[TEN-DU-AN]`.

---

## Pipeline Chuẩn 3 Bước Bắt Buộc & 2 Chế Độ Thực Hiện

> [!IMPORTANT]
> **2 CHẾ ĐỘ THỰC HIỆN (BẮT BUỘC ĐỀ XUẤT CHO USER CHỌN KHI BẮT ĐẦU)**:
> 1. **Chế độ Rảnh tay**: Người dùng đưa nội dung/chủ đề, hệ thống tự động chạy toàn bộ quy trình từ A-Z và trả về video Final MP4 hoàn chỉnh.
> 2. **Chế độ Duyệt từng bước**: Bắt buộc đi tuần tự từng bước, trả kết quả trên chat để người dùng tương tác duyệt, **TUYỆT ĐỐI CẤM NHẢY CÓC**.

```text
QUY TRÌNH 3 BƯỚC BẮT BUỘC (KHI DUYỆT TỪNG BƯỚC)
────────────────────────────────────────────────────────────────────────
➔ BƯỚC 1: KỊCH BẢN TỪNG PHẦN (SCRIPT BREAKDOWN)
  ├─ Trình bày kịch bản phân rã chi tiết từng cảnh (Hook, Problem, Solution, Workflow, Benefits, Outro)
  ├─ Nêu rõ nội dung lời thoại (voiceover) và thời lượng dự kiến từng đoạn
  └─ Dừng lại chờ User phản hồi / góp ý kịch bản

➔ BƯỚC 2: DỰNG RENDER HÌNH ĐỂ HÌNH DUNG VIDEO (STORYBOARD / VISUAL FRAMES)
  ├─ Dựng layout / render các khung hình trực quan (still frames / mockup thẻ)
  ├─ Thể hiện màu sắc, typography, safe zone, vị trí text, icon/graphics
  └─ Trả kết quả trực quan trên chat để User dễ dàng hình dung toàn bộ video

➔ BƯỚC 3: USER CHỐT MỚI BẮT ĐẦU LÀM VIDEO LUÔN (FINAL MP4 DIRECT)
  ├─ Chỉ khi User xác nhận chốt kịch bản & hình ảnh ở Bước 1 và 2 mới tiến hành code & render
  ├─ Bỏ qua khâu preview phân giải thấp, xuất thẳng video FINAL MP4 hoàn chỉnh (1080x1920, EBU R128 -12.5 LUFS)
  └─ Nếu có yêu cầu điều chỉnh sau khi xem, tiến hành điều chỉnh trực tiếp trên video final
```

> [!CAUTION]
> **LUẬT DUY NHẤT 1 FILE FINAL MP4 — CẤM HOÀN TOÀN FILE PREVIEW (SINGLE FINAL MP4 MANDATE)**:
> 1. **Bỏ hẳn 100% khâu preview**: Áp dụng bắt buộc cho mọi video tạo mới. Tuyệt đối KHÔNG render video preview, KHÔNG chạy ngầm tạo hoặc sao chép bất kỳ file preview nào (`preview.mp4`, `preview-contact-sheet.svg`, `preview-qc.json`).
> 2. **Chỉ xuất trực tiếp 1 file Final duy nhất**: Sau khi duyệt storyboard/still frames (Bước 2), xuất thẳng trực tiếp `projects/<id>/output/final.mp4` (chuẩn 1080×1920, EBU R128 -12.5 LUFS).
> 3. **Thư mục `output/` sạch sẽ chuẩn mực**: Chỉ được phép chứa `final.mp4`, `final-contact-sheet.svg`, `final-qc.json`, thư mục `dist/` và `storyboard/`. Tuyệt đối cấm để lọt bất kỳ file `preview.*` nào vào thư mục bàn giao.


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

- `npm run style -- list`: **Xem danh mục toàn bộ các Style có sẵn trong xưởng (`styles/`)**.
- `npm run style -- show <id>`: **Xem chi tiết bảng màu, typography, spring physics của style**.
- `npm run dna -- analyze <video-file> [--name <style-name>]`: **Bóc tách video mẫu và tự động lưu thành Style mới trong `styles/<style-name>/`**.
- `npm run dna -- list`: Xem danh mục các DNA Profile đã bóc tách trong `dna-vault/`.
- `npm run doctor`: Kiểm tra sức khỏe hệ thống (CIT Voice Studio, FFmpeg, Remotion).
- `npm run studio`: Khởi động Remotion Studio trực quan để xem trước cảnh quay.
- `npm run services`: Khởi động các background services (CIT Voice Studio, FlowKit).
- `npm run factory -- status --project <id>`: Kiểm tra trạng thái dự án.
- `npm run factory -- approve --gate GATE1|GATE2|GATE3 --project <id> --evidence "lời duyệt"`: Phê duyệt chốt chặn.
- `npm run factory -- tts --project <id>`: Tạo voice và đo timing thật bằng FFprobe.
- `npm run factory -- render --kind final --project <id>`: Render Remotion trực tiếp Final MP4 + chuẩn hóa EBU R128 + contact sheet QA.
- `npm run factory -- package --project <id>`: Tự động trích xuất 3 thumbnails, sinh metadata SEO và caption mạng xã hội.
- `npm run verify -- --project <dir>`: Chạy bộ kiểm thử E2E 4-Tier kiểm tra file MP4 xuất xưởng.
- `npm test`: Chạy toàn bộ unit test của Factory Core.
- `npm run lint` & `npm run typecheck`: Kiểm tra chất lượng mã nguồn TypeScript/ESLint.
