# V4 BLUEPRINT CONTEXT - AGGREGATED CODEBASE & CONFIGS

> Tài liệu tổng hợp toàn bộ mã nguồn lõi, hợp đồng dữ liệu, cấu hình và skills của Video AI Factory V4.
> Tự động trích xuất và gom nhóm để phục vụ kiến trúc & phát triển.

## Mục lục (Table of Contents)

### 1. Tài liệu cốt lõi (Root Core Docs)
- [AGENTS.md](#file-agents-md)
- [README.md](#file-readme-md)

### 2. Cấu hình hệ thống (System Configs)
- [config/component-index.json](#file-config-component-index-json)
- [config/factory-config.json](#file-config-factory-config-json)
- [config/gen-video.json](#file-config-gen-video-json)

### 3. Nhận diện thương hiệu mẫu (Brand & Creator Configs)
- [brand/manulife/brand.json](#file-brand-manulife-brand-json)
- [brand/manulife/creator.json](#file-brand-manulife-creator-json)

### 4. Hợp đồng kỹ thuật & Schemas (Core Contracts & Schemas)
- [core/contracts/capabilities.js](#file-core-contracts-capabilities-js)
- [core/contracts/engine.ts](#file-core-contracts-engine-ts)
- [core/schemas/registry.js](#file-core-schemas-registry-js)
- [core/schemas/types.ts](#file-core-schemas-types-ts)
- [core/schemas/zod.js](#file-core-schemas-zod-js)

### 5. Scripts điều hướng & Factory Core
- [core/scripts/prompts/index.js](#file-core-scripts-prompts-index-js)
- [core/scripts/router/index.js](#file-core-scripts-router-index-js)
- [core/scripts/style/exporter.js](#file-core-scripts-style-exporter-js)
- [core/scripts/factory/index.js](#file-core-scripts-factory-index-js)

### 6. Kỹ năng & Hướng dẫn Remotion (.agents/skills)
- [.agents/skills/remotion-explainer/SKILL.md](#file--agents-skills-remotion-explainer-skill-md)
- [.agents/skills/remotion-markup/3d.md](#file--agents-skills-remotion-markup-3d-md)

### 7. Bộ Style Presets (Styles JSON)
- [styles/ai-tech-briefing/style.json](#file-styles-ai-tech-briefing-style-json)
- [styles/clean-explainer/style.json](#file-styles-clean-explainer-style-json)
- [styles/editorial-news-canvas/style.json](#file-styles-editorial-news-canvas-style-json)
- [styles/finance-data-pro/style.json](#file-styles-finance-data-pro-style-json)
- [styles/geopolitical-map-pro/style.json](#file-styles-geopolitical-map-pro-style-json)
- [styles/kinetic-minimalist/style.json](#file-styles-kinetic-minimalist-style-json)
- [styles/medical-biometrics-pro/style.json](#file-styles-medical-biometrics-pro-style-json)
- [styles/multi-asset-trading/style.json](#file-styles-multi-asset-trading-style-json)
- [styles/registry.json](#file-styles-registry-json)
- [styles/showcase-affiliate-luxury/style.json](#file-styles-showcase-affiliate-luxury-style-json)
- [styles/whiteboard-hand-draw/style.json](#file-styles-whiteboard-hand-draw-style-json)

### 8. Mã nguồn Remotion CanonicalVideo & Shared Core (.ts / .tsx)
- [engines/remotion/src/CanonicalVideo/components/MotionComponents.tsx](#file-engines-remotion-src-canonicalvideo-components-motioncomponents-tsx)
- [engines/remotion/src/CanonicalVideo/components/SceneWrapper.tsx](#file-engines-remotion-src-canonicalvideo-components-scenewrapper-tsx)
- [engines/remotion/src/CanonicalVideo/components/TextLayout.tsx](#file-engines-remotion-src-canonicalvideo-components-textlayout-tsx)
- [engines/remotion/src/CanonicalVideo/index.tsx](#file-engines-remotion-src-canonicalvideo-index-tsx)
- [engines/remotion/src/shared/CardArchetypes.tsx](#file-engines-remotion-src-shared-cardarchetypes-tsx)
- [engines/remotion/src/shared/design-system.tsx](#file-engines-remotion-src-shared-design-system-tsx)
- [engines/remotion/src/shared/index.ts](#file-engines-remotion-src-shared-index-ts)
- [engines/remotion/src/shared/primitives.tsx](#file-engines-remotion-src-shared-primitives-tsx)
- [engines/remotion/src/shared/SpatialHUDCard.tsx](#file-engines-remotion-src-shared-spatialhudcard-tsx)
- [engines/remotion/src/shared/SpeechSyncedSubtitles.tsx](#file-engines-remotion-src-shared-speechsyncedsubtitles-tsx)
- [engines/remotion/src/shared/three/Finance3DPrimitives.tsx](#file-engines-remotion-src-shared-three-finance3dprimitives-tsx)
- [engines/remotion/src/shared/three/index.ts](#file-engines-remotion-src-shared-three-index-ts)
- [engines/remotion/src/shared/three/Medical3DPrimitives.tsx](#file-engines-remotion-src-shared-three-medical3dprimitives-tsx)
- [engines/remotion/src/shared/three/Stage3DWrapper.tsx](#file-engines-remotion-src-shared-three-stage3dwrapper-tsx)
- [engines/remotion/src/shared/UserBrandOutro.tsx](#file-engines-remotion-src-shared-userbrandoutro-tsx)

---

# 1. Tài liệu cốt lõi (Root Core Docs)

## File: `AGENTS.md` <a id="file-agents-md"></a>

````markdown
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
   - **Các Style Cốt Lõi Tinh Gọn (`styles/`)**:
     * `medical-biometrics-pro`: Y sinh & Phóng sự y khoa tối tân (Kiến trúc Hybrid 3D WebGL với `<ThreeCanvas>`/R3F + 2.5D Spatial Glass HUD).
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
7. **Kiến trúc Thị giác Hybrid 3D WebGL + 2.5D Spatial HUD**:
   - Đối với các dự án y tế/y sinh học (`medical-biometrics-pro`) và công nghệ: Bắt buộc dùng `@remotion/three` (`<ThreeCanvas>`), `@react-three/fiber`, `@react-three/drei` và `@react-three/postprocessing` (Bioluminescence Bloom) cho vật thể giải phẫu/mô phỏng trung tâm.
   - Toàn bộ thẻ dữ liệu bắt buộc dùng `SpatialHUDCard` (2.5D Spatial Glass HUD) với perspective 3D, góc xoay nghiêng thị sai, 4 góc brackets kỹ thuật `[ ]` và tia quét laser.
   - CẤM HOÀN TOÀN việc vẽ minh họa trung tâm bằng hình học `<svg>` 2D phẳng đơn giản.

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

````

---

## File: `README.md` <a id="file-readme-md"></a>

````markdown
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

````

---

# 2. Cấu hình hệ thống (System Configs)

## File: `config/component-index.json` <a id="file-config-component-index-json"></a>

```json
{
  "version": "4.0.0",
  "lastUpdated": "2026-10-26",
  "description": "Component Registry & Index for Remotion Visual Core V4 (Spatial 3D & HUD Architecture)",
  "components": [
    {
      "name": "Stage3DWrapper",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Stage3DWrapper.tsx",
      "category": "3d-stage",
      "tags": ["3d", "three", "canvas", "lighting", "bloom", "camera", "particles"],
      "description": "Remotion ThreeCanvas wrapper with cinematic lighting, ambient Sparkles particles, postprocessing Bloom, and deterministic camera modes (orbit, dolly-in, fly-through, breathing) driven by useCurrentFrame().",
      "props": {
        "cameraMode": "'orbit' | 'dolly-in' | 'fly-through' | 'breathing'",
        "cameraPosition": "[number, number, number] (default [0, 0, 7.5])",
        "cameraFov": "number (default 45)",
        "cameraTarget": "[number, number, number] (default [0, 0, 0])",
        "sparklesCount": "number (default 50)",
        "sparklesColor": "string (default '#38bdf8')",
        "enableSparkles": "boolean (default true)",
        "enableBloom": "boolean (default true)",
        "bloomIntensity": "number (default 1.4)",
        "bloomLuminanceThreshold": "number (default 0.2)",
        "ambientIntensity": "number (default 0.6)",
        "dirLightIntensity": "number (default 1.2)",
        "dirLightPosition": "[number, number, number] (default [5, 8, 5])",
        "width": "number (optional, defaults to videoConfig.width)",
        "height": "number (optional, defaults to videoConfig.height)",
        "style": "React.CSSProperties"
      }
    },
    {
      "name": "ColonHologram3D",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Medical3DPrimitives.tsx",
      "category": "3d-medical",
      "tags": ["medical", "colon", "biometrics", "hologram", "polyp", "cancer", "tube"],
      "description": "Procedural 3D colonic intestine hologram using TubeGeometry along a CatmullRomCurve3 with physical holographic glass, outer wireframe scan grid, and a pulsing MeshDistortMaterial polyp warning sphere at the rectum.",
      "props": {
        "progress": "number (0 to 1 entrance progress, default 1)",
        "highlightPolyp": "boolean (whether polyp pulses red warning, default true)",
        "accentColor": "string (default '#38bdf8')",
        "polypColor": "string (default '#ef4444')",
        "wireframeOpacity": "number (default 0.25)"
      }
    },
    {
      "name": "EndoscopySimulation3D",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Medical3DPrimitives.tsx",
      "category": "3d-medical",
      "tags": ["medical", "endoscopy", "laser", "polyp", "surgery", "simulation"],
      "description": "Procedural 3D endoscopic closeup inside the intestinal mucosa: gut wall lining, distorting polyp, advancing metallic endoscope probe, and glowing 3D surgical laser beam with polyp detachment lifting animation.",
      "props": {
        "cutProgress": "number (0: intact, 0.25-0.75: laser firing, 0.5-1.0: polyp detachment & suction)",
        "accentColor": "string (default '#00f0ff')"
      }
    },
    {
      "name": "BioShield3D",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Medical3DPrimitives.tsx",
      "category": "3d-medical",
      "tags": ["medical", "shield", "insurance", "protection", "screening", "icosahedron"],
      "description": "Dual-layer icosahedron holographic shield with counter-rotating inner glass core and outer wireframe cage plus equatorial energy ring for screening and healthcare protection scenes.",
      "props": {
        "progress": "number (0 to 1 spring entrance)",
        "accentColor": "string (default '#38bdf8')",
        "radius": "number (default 1.4)"
      }
    },
    {
      "name": "DNAStrand3D",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Medical3DPrimitives.tsx",
      "category": "3d-medical",
      "tags": ["medical", "dna", "genetics", "biotechnology", "helix"],
      "description": "Parametric double-helix DNA strand with nucleotide node spheres and glowing base-pair rungs rotating continuously in 3D space.",
      "props": {
        "rungsCount": "number (default 18)",
        "radius": "number (default 1.1)",
        "heightStep": "number (default 0.22)",
        "accentColor": "string (default '#38bdf8')",
        "secondaryColor": "string (default '#ec4899')"
      }
    },
    {
      "name": "BloodCellStream3D",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Medical3DPrimitives.tsx",
      "category": "3d-medical",
      "tags": ["medical", "blood", "erythrocyte", "stream", "flow", "vascular"],
      "description": "3D streaming flow of biconcave red blood cells (erythrocytes) tumbling realistically along the vascular axis in 3D space.",
      "props": {
        "count": "number (default 18)",
        "flowSpeed": "number (default 0.035)",
        "cellColor": "string (default '#dc2626')"
      }
    },
    {
      "name": "Candlestick3DChart",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Finance3DPrimitives.tsx",
      "category": "3d-finance",
      "tags": ["finance", "trading", "candlestick", "chart", "crypto", "stocks"],
      "description": "3D Japanese Candlestick chart featuring dimensional box bodies, cylinder wicks, bullish/bearish color mapping, staggered growth springs, and reference grid floor.",
      "props": {
        "data": "Array<{ open: number; close: number; high: number; low: number; label?: string }>",
        "bullColor": "string (default '#22c55e')",
        "bearColor": "string (default '#ef4444')",
        "spacing": "number (default 1.0)",
        "staggerDelay": "number (default 6 frames)"
      }
    },
    {
      "name": "BarRace3DTowers",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Finance3DPrimitives.tsx",
      "category": "3d-finance",
      "tags": ["finance", "data", "bar-chart", "bar-race", "towers", "monolith"],
      "description": "3D monolithic towers racing height in isometric perspective, featuring physical metallic materials, high-emission summit caps, and pedestal base slab.",
      "props": {
        "items": "Array<{ label: string; value: number; color?: string }>",
        "maxHeight": "number (default 3.6)",
        "spacing": "number (default 1.15)",
        "accentColor": "string (default '#38bdf8')"
      }
    },
    {
      "name": "WealthVaultShield3D",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/three/Finance3DPrimitives.tsx",
      "category": "3d-finance",
      "tags": ["finance", "vault", "wealth", "capital", "shield", "diamond", "gold"],
      "description": "Central faceted diamond core encased in dual gold gimbal rings and satellite energy orbs representing capital preservation, wealth management, and insurance.",
      "props": {
        "progress": "number (0 to 1 spring entrance)",
        "accentColor": "string (default '#fbbf24')"
      }
    },
    {
      "name": "SpatialHUDCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/SpatialHUDCard.tsx",
      "category": "hud-container",
      "tags": ["hud", "spatial", "glassmorphism", "brackets", "laser", "scanline", "tilt"],
      "description": "2.5D Spatial Glass HUD Card container combining 3D perspective, floating physics, multi-layer glassmorphism, sci-fi corner brackets [ ], and animated laser sweep scanline.",
      "props": {
        "frame": "number (required, useCurrentFrame())",
        "springVal": "number (spring progress 0 to 1, default 1)",
        "staggerIndex": "number (default 0)",
        "accentColor": "string (default '#38BDF8')",
        "borderColor": "string (optional custom border)",
        "background": "string (optional custom background gradient)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)",
        "style": "React.CSSProperties"
      }
    },
    {
      "name": "HeroMetricCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/CardArchetypes.tsx",
      "category": "hud-card",
      "tags": ["archetype-1", "hero-metric", "stat", "kpi", "footnote"],
      "description": "Archetype 1: Oversized hero KPI metric (e.g. 96px number + 36px unit) with category badge, description, footnote, and automatic SpatialHUDCard 3D tilt & laser effects.",
      "props": {
        "category": "string (optional badge text)",
        "number": "string (required large stat number)",
        "unit": "string (optional metric unit)",
        "description": "string (required explanation text)",
        "footnote": "string (optional source / caveat)",
        "accentColor": "string (default '#fbbf24')",
        "staggerIndex": "number (default 0)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)"
      }
    },
    {
      "name": "ComparisonCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/CardArchetypes.tsx",
      "category": "hud-card",
      "tags": ["archetype-2", "comparison", "side-by-side", "vs", "pros-cons"],
      "description": "Archetype 2: Side-by-side comparison card (left column vs right column) with positive/negative semantic badges and bullet points in a unified SpatialHUDCard 3D envelope.",
      "props": {
        "left": "{ title: string; badge: string; points: string[]; isNegative?: boolean }",
        "right": "{ title: string; badge: string; points: string[]; isPositive?: boolean }",
        "accentColor": "string (default '#38bdf8')",
        "staggerIndex": "number (default 0)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)"
      }
    },
    {
      "name": "FeatureGridCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/CardArchetypes.tsx",
      "category": "hud-card",
      "tags": ["archetype-3", "grid", "features", "benefits", "icons"],
      "description": "Archetype 3: 3-column feature and benefit grid card with circular glowing icon badges, bold headings, and descriptions inside a SpatialHUDCard 3D wrapper.",
      "props": {
        "items": "Array<{ icon: string; title: string; desc: string }>",
        "accentColor": "string (default '#fbbf24')",
        "staggerIndex": "number (default 0)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)"
      }
    },
    {
      "name": "StepFlowCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/CardArchetypes.tsx",
      "category": "hud-card",
      "tags": ["archetype-4", "workflow", "steps", "timeline", "process"],
      "description": "Archetype 4: Sequential step flow cards with monospace numbered badges (01, 02, 03), active step highlighted state, and SpatialHUDCard floating physics.",
      "props": {
        "steps": "Array<{ stepNumber: string; title: string; detail: string; active?: boolean }>",
        "accentColor": "string (default '#fbbf24')",
        "staggerIndex": "number (default 0)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)"
      }
    },
    {
      "name": "ChecklistCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/CardArchetypes.tsx",
      "category": "hud-card",
      "tags": ["archetype-5", "checklist", "status", "audit", "compliance"],
      "description": "Archetype 5: Checklist card with header status pill badge (green/yellow/red) and tick-mark criteria items wrapped in SpatialHUDCard 3D perspective.",
      "props": {
        "title": "string (card title)",
        "badge": "{ text: string; color: 'green' | 'yellow' | 'red' }",
        "items": "string[] (checklist items)",
        "accentColor": "string (default '#38bdf8')",
        "staggerIndex": "number (default 0)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)"
      }
    },
    {
      "name": "QuoteCard",
      "importPath": "@/shared",
      "sourcePath": "engines/remotion/src/shared/CardArchetypes.tsx",
      "category": "hud-card",
      "tags": ["archetype-6", "quote", "statement", "expert", "testimonial"],
      "description": "Archetype 6: Statement and quote card featuring an oversized watermark quotation mark, italic statement text, author, role, and source chip inside a SpatialHUDCard 3D frame.",
      "props": {
        "quote": "string (quote text)",
        "author": "string (speaker name)",
        "role": "string (speaker role)",
        "source": "string (optional source / publication)",
        "accentColor": "string (default '#fbbf24')",
        "staggerIndex": "number (default 0)",
        "enableScanline": "boolean (default true)",
        "enableBrackets": "boolean (default true)"
      }
    }
  ]
}

```

---

## File: `config/factory-config.json` <a id="file-config-factory-config-json"></a>

```json
{
  "workspace": "D:\\AI\\VIDEO AI",
  "primary_engine": "remotion",
  "fallback_engine": "remotion",
  "default_video": {
    "width": 1080,
    "height": 1920,
    "fps": 30,
    "duration_target_seconds": [30, 60],
    "format": "9:16"
  },
  "primary_domains": ["explainer", "social-shorts", "auto-cuts", "insurance", "finance", "tech"],
  "approval_gates": ["script_and_beats", "creative_direction", "final_render"],
  "render_output": "projects/<id>/output"
}

```

---

## File: `config/gen-video.json` <a id="file-config-gen-video-json"></a>

```json
{
  "version": "1.0",
  "mode": "AUTO",
  "workspace_root": "D:\\VIDEO AI",
  "defaults": {
    "width": 1080,
    "height": 1920,
    "fps": 30,
    "aspect_ratio": "9:16",
    "language": "vi-VN",
    "target_duration_seconds": 60
  },
  "approval": {
    "blueprint_required": true,
    "final_render_required": true
  },
  "creative_quality": {
    "creative_idea_min": 8,
    "generic_ai_risk_max": 4,
    "anti_repetition": true,
    "wow_moments_target": "1-3 when meaningful"
  },
  "insurance_detection": {
    "enabled": true,
    "brand_profile": "manulife",
    "creator_profile": "tien-duong"
  },
  "paths": {
    "schemas": "D:\\VIDEO AI\\schemas",
    "brand": "D:\\VIDEO AI\\brand",
    "creative_library": "D:\\VIDEO AI\\creative-library",
    "component_library": "D:\\VIDEO AI\\component-library",
    "jobs": "D:\\VIDEO AI\\jobs"
  }
}

```

---

# 3. Nhận diện thương hiệu mẫu (Brand & Creator Configs)

## File: `brand/manulife/brand.json` <a id="file-brand-manulife-brand-json"></a>

```json
{
  "id": "manulife",
  "name": "Manulife",
  "enabled_for_domains": ["insurance"],
  "logo": {
    "required": true,
    "preferred_path": "D:\\VIDEO AI\\brand\\manulife\\logo.png",
    "fallback_paths": [
      "D:\\VIDEO AI\\brand\\manulife\\logo.svg"
    ],
    "placement": "creative_auto",
    "qc_block_if_missing": true
  },
  "visual_guidance": {
    "brand_presence_required": true,
    "do_not_force_corporate_layout": true,
    "allow_integrated_branding": true,
    "notes": "Branding is mandatory for insurance videos, but creative direction remains free. Use official brand assets supplied or verified for the workspace."
  }
}

```

---

## File: `brand/manulife/creator.json` <a id="file-brand-manulife-creator-json"></a>

```json
{
  "id": "tien-duong",
  "display_name": "Tiến Dương",
  "required_for_insurance": true,
  "placement": "creative_auto",
  "preferred_treatments": [
    "editorial_credit",
    "creator_signature",
    "lower_third",
    "outro"
  ]
}

```

---

# 4. Hợp đồng kỹ thuật & Schemas (Core Contracts & Schemas)

## File: `core/contracts/capabilities.js` <a id="file-core-contracts-capabilities-js"></a>

```javascript
export const EngineCapabilities = {
  HYPERFRAMES: {
    status: "implemented",
    maxComplexity: "medium",
    supportedAssetTypes: ["image", "audio", "vector", "font"],
    supportedVisualIntents: ["centered", "split", "overlay"],
    supportedMotionIntents: [
      // Only these are truly implemented in Phase 4 for parity
      "fade-in", "flow", "interrupt", "progressive-build", "drain",
      
      // Downgraded to planned (not actually implemented in code yet)
      // "slide-in", "scale-in", "draw-in", "stat-pop", "opposed-slide-in", "card-reveal", "check-pop",
      // "fade-out", "slide-out", "scale-out",
      // "transform", "fill", "collapse", "expand", "shield-expand",
      // "count-up", "count-down", "counter", "progress", "reverse-bar-grow", "balance-drain",
      // "pan", "zoom", "marker-draw"
    ]
  },
  REMOTION: {
    status: "implemented",
    maxComplexity: "high",
    supportedAssetTypes: ["image", "audio", "video", "font", "vector"],
    supportedVisualIntents: ["split", "centered", "overlay", "grid"],
    supportedMotionIntents: [
      // Only these are truly implemented in Phase 3
      "fade-in", "flow", "interrupt", "progressive-build", "drain",

      // Downgraded to planned for strict parity matching
      // "slide-in", "scale-in", "card-reveal",
      // "fade-out", "slide-out", "scale-out",
      // "transform", "morph", "timeline-merge", "mask-transition",
      // "compare-state",
      // "path-follow", "orbit", "pan", "zoom",
      // "stagger", "reveal-sequence", "timeline-progress"
    ]
  }
};

```

---

## File: `core/contracts/engine.ts` <a id="file-core-contracts-engine-ts"></a>

```typescript
import { CanonicalVideoSpec } from "../schemas/types";

export interface EngineRenderOptions {
  outputPath: string;
  quality?: "draft" | "high" | "production";
  headless?: boolean;
}

export interface EngineValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface EngineAdapter {
  /**
   * Identifies the engine this adapter is for (e.g., "HYPERFRAMES", "REMOTION")
   */
  engineId: string;

  /**
   * Checks if this engine can theoretically render the given spec based on intents.
   */
  supports(spec: CanonicalVideoSpec): boolean;

  /**
   * Validates the spec against the specific engine's constraints.
   */
  validate(spec: CanonicalVideoSpec): EngineValidationResult;

  /**
   * Transforms the CanonicalVideoSpec into an engine-specific input format 
   * (e.g., mapping logical assets to absolute paths, ms to frames, semantic intents to GSAP/React props).
   */
  transform(spec: CanonicalVideoSpec): any;

  /**
   * Triggers the actual render process using the transformed input.
   */
  render(transformedInput: any, options: EngineRenderOptions): Promise<void>;
}

```

---

## File: `core/schemas/registry.js` <a id="file-core-schemas-registry-js"></a>

```javascript
// Motion Intent Registry V0

export const MOTION_INTENTS = {
  // ENTRANCE
  "fade-in": { category: "ENTRANCE", fallback: null, complexity: "low" },
  "slide-in": { category: "ENTRANCE", fallback: "fade-in", complexity: "low" },
  "scale-in": { category: "ENTRANCE", fallback: "fade-in", complexity: "low" },
  "draw-in": { category: "ENTRANCE", fallback: "fade-in", complexity: "medium" },
  "stat-pop": { category: "ENTRANCE", fallback: "scale-in", complexity: "medium" },
  "opposed-slide-in": { category: "ENTRANCE", fallback: "slide-in", complexity: "medium" },
  "card-reveal": { category: "ENTRANCE", fallback: "fade-in", complexity: "medium" },
  "check-pop": { category: "ENTRANCE", fallback: "scale-in", complexity: "low" },

  // EXIT
  "fade-out": { category: "EXIT", fallback: null, complexity: "low" },
  "slide-out": { category: "EXIT", fallback: "fade-out", complexity: "low" },
  "scale-out": { category: "EXIT", fallback: "fade-out", complexity: "low" },

  // TRANSFORMATION
  "transform": { category: "TRANSFORMATION", fallback: null, complexity: "medium" },
  "morph": { category: "TRANSFORMATION", fallback: "transform", complexity: "high" },
  "drain": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "fill": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "collapse": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "expand": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },
  "shield-expand": { category: "TRANSFORMATION", fallback: "expand", complexity: "medium" },
  "timeline-merge": { category: "TRANSFORMATION", fallback: "transform", complexity: "high" },
  "mask-transition": { category: "TRANSFORMATION", fallback: "fade-in", complexity: "high" },
  "interrupt": { category: "TRANSFORMATION", fallback: "transform", complexity: "medium" },

  // DATA
  "count-up": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "count-down": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "counter": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "progressive-build": { category: "DATA", fallback: "fade-in", complexity: "medium" },
  "progress": { category: "DATA", fallback: "fade-in", complexity: "low" },
  "compare-state": { category: "DATA", fallback: "fade-in", complexity: "medium" },
  "reverse-bar-grow": { category: "DATA", fallback: "progress", complexity: "medium" },
  "balance-drain": { category: "DATA", fallback: "drain", complexity: "medium" },

  // MOVEMENT
  "flow": { category: "MOVEMENT", fallback: "fade-in", complexity: "medium" },
  "path-follow": { category: "MOVEMENT", fallback: "transform", complexity: "high" },
  "orbit": { category: "MOVEMENT", fallback: "transform", complexity: "high" },
  "pan": { category: "MOVEMENT", fallback: null, complexity: "low" },
  "zoom": { category: "MOVEMENT", fallback: null, complexity: "low" },

  // SEQUENCE
  "stagger": { category: "SEQUENCE", fallback: "fade-in", complexity: "medium" },
  "reveal-sequence": { category: "SEQUENCE", fallback: "fade-in", complexity: "medium" },
  "timeline-progress": { category: "SEQUENCE", fallback: "fade-in", complexity: "high" },
  "marker-draw": { category: "SEQUENCE", fallback: "fade-in", complexity: "medium" }
};

```

---

## File: `core/schemas/types.ts` <a id="file-core-schemas-types-ts"></a>

```typescript
export interface AssetReference {
  id: string;
  type: "image" | "audio" | "video" | "vector" | "font";
  path: string; // logical path, e.g., "assets/audio/narration.mp3"
}

export interface MotionIntent {
  type: string; // e.g., "progressive-build", "reveal", "enter-stage", "focus"
  subject: string; // The logical element being animated
  emphasis?: string; // Semantic reason/emphasis
}

export interface VisualIntent {
  description: string;
  layout?: "split" | "centered" | "overlay" | "grid";
  focalPoint?: string;
}

export interface TextContent {
  content: string;
  role?: "title" | "subtitle" | "body" | "caption" | "label";
  emphasis?: boolean;
  maxLines?: number;
  priority?: number;
}

export interface SceneSpec {
  id: string;
  purpose: string;
  narration: string;
  startMs?: number;
  durationMs: number;
  endMs?: number;
  startFrame?: number;
  durationFrames?: number;
  text?: Array<string | TextContent>;
  visualIntent: VisualIntent;
  motionIntent: MotionIntent[];
  transitionIntent?: string;
  assets: AssetReference[];
}

export interface CanonicalVideoSpec {
  schemaVersion: string;
  project: {
    id: string;
    title: string;
    version: number;
  };
  format: {
    aspectRatio: string;
    width: number;
    height: number;
    fpsPreference?: number;
    fps?: number;
    totalDurationFrames?: number;
    targetDurationMs?: number;
  };
  content: {
    coreMessage: string;
    audience: string;
    tone: string;
    language: string;
  };
  script: {
    narration: string;
    scenes: SceneSpec[];
  };
  engineRouting?: {
    suggestedEngine?: "HYPERFRAMES" | "REMOTION" | "AUTO";
    reason?: string;
  };
}

```

---

## File: `core/schemas/zod.js` <a id="file-core-schemas-zod-js"></a>

```javascript
import { z } from "zod";
import { MOTION_INTENTS } from "./registry.js";

const AssetReferenceSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "audio", "video", "vector", "font"]),
  path: z.string()
});

const MotionIntentSchema = z.object({
  type: z.string().refine((val) => Object.keys(MOTION_INTENTS).includes(val), {
    message: "Unknown motionIntent.type. Must be registered in Motion Intent Registry."
  }),
  subject: z.string(),
  emphasis: z.string().optional()
});

const VisualIntentSchema = z.object({
  description: z.string(),
  layout: z.enum(["split", "centered", "overlay", "grid"]).optional(),
  focalPoint: z.string().optional()
});

// Added text semantics as requested
const TextContentSchema = z.object({
  content: z.string(),
  role: z.enum(["title", "subtitle", "body", "caption", "label"]).optional(),
  emphasis: z.boolean().optional(),
  maxLines: z.number().int().optional(),
  priority: z.number().int().optional()
});

const SceneSpecSchema = z.object({
  id: z.string(),
  purpose: z.string(),
  narration: z.string(),
  startMs: z.number().nonnegative().optional(),
  durationMs: z.number().nonnegative(),
  endMs: z.number().nonnegative().optional(),
  text: z.array(z.union([z.string(), TextContentSchema])).optional(),
  visualIntent: VisualIntentSchema,
  motionIntent: z.array(MotionIntentSchema),
  transitionIntent: z.string().optional(),
  assets: z.array(AssetReferenceSchema)
});

export const CanonicalVideoSpecSchema = z.object({
  schemaVersion: z.string(),
  project: z.object({
    id: z.string(),
    title: z.string(),
    version: z.number()
  }),
  format: z.object({
    aspectRatio: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    fpsPreference: z.number().int().positive().optional(),
    targetDurationMs: z.number().nonnegative().optional()
  }),
  content: z.object({
    coreMessage: z.string(),
    audience: z.string(),
    tone: z.string(),
    language: z.string()
  }),
  script: z.object({
    narration: z.string(),
    scenes: z.array(SceneSpecSchema)
  }),
  engineRouting: z.object({
    suggestedEngine: z.enum(["HYPERFRAMES", "REMOTION", "AUTO"]).optional(),
    reason: z.string().optional()
  }).optional()
});

export function validateSpec(spec) {
  const result = CanonicalVideoSpecSchema.safeParse(spec);
  if (result.success) {
    return { valid: true, data: result.data, errors: [] };
  } else {
    const formattedErrors = result.error.issues.map(err => ({
      path: err.path.join("."),
      message: err.message,
      code: err.code
    }));
    return { valid: false, errors: formattedErrors };
  }
}

```

---

# 5. Scripts điều hướng & Factory Core

## File: `core/scripts/prompts/index.js` <a id="file-core-scripts-prompts-index-js"></a>

```javascript
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../../..");
const LIB_DIR = path.join(ROOT, "prompts", "library");

function loadData() {
  const promptsPath = path.join(LIB_DIR, "prompts.json");
  const categoriesPath = path.join(LIB_DIR, "categories.json");
  if (!fs.existsSync(promptsPath)) {
    throw new Error(`Data file not found: ${promptsPath}. Run data setup first.`);
  }
  const prompts = JSON.parse(fs.readFileSync(promptsPath, "utf8"));
  let categories = {};
  if (fs.existsSync(categoriesPath)) {
    categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));
  }
  return { prompts, categories };
}

function searchPrompts(query, options = {}) {
  const { prompts, categories } = loadData();
  const q = (query || "").toLowerCase().trim();
  const categoryFilter = options.category;
  const limit = parseInt(options.limit || 10, 10);

  let candidateIds = null;
  if (categoryFilter && categories[categoryFilter]) {
    candidateIds = new Set(categories[categoryFilter].items.map(item => item.id));
  }

  const results = [];
  for (const item of prompts) {
    if (candidateIds && !candidateIds.has(item.id)) continue;
    const matchAct = item.act.toLowerCase().includes(q);
    const matchPrompt = item.prompt.toLowerCase().includes(q);
    if (!q || matchAct || matchPrompt) {
      // Score: exact act match > act contains > prompt contains
      let score = 0;
      if (item.act.toLowerCase() === q) score += 100;
      else if (matchAct) score += 50;
      if (matchPrompt) score += 20;
      results.push({ item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit).map(r => r.item);
}

function getPrompt(identifier) {
  const { prompts } = loadData();
  const idNum = parseInt(identifier, 10);
  if (!isNaN(idNum)) {
    return prompts.find(p => p.id === idNum);
  }
  const name = identifier.toLowerCase().trim();
  return prompts.find(p => p.act.toLowerCase() === name || p.act.toLowerCase().includes(name));
}

function listCategories() {
  const { categories } = loadData();
  return Object.entries(categories).map(([key, val]) => ({
    key,
    title: val.title,
    count: val.items ? val.items.length : 0,
    description: val.description
  }));
}

export function main(argv = process.argv.slice(2)) {
  const [command, target, ...rest] = argv;
  const args = minimist(argv.slice(1));

  if (!command || command === "help" || command === "--help") {
    console.log(`
PROMPTS.CHAT CLI TOOL — AI Video Factory
Sử dụng:
  node core/scripts/prompts/index.js search <keyword> [--category <name>] [--limit <number>]
  node core/scripts/prompts/index.js get <id|name>
  node core/scripts/prompts/index.js list-categories
  node core/scripts/prompts/index.js random [--category <name>]
  node core/scripts/prompts/index.js export-persona <id|name> [--output <file>]
    `);
    return;
  }

  try {
    if (command === "search") {
      const query = target || args._[1] || "";
      const results = searchPrompts(query, {
        category: args.category,
        limit: args.limit
      });
      console.log(`\n🔍 Tìm thấy ${results.length} kết quả phù hợp với "${query}":\n`);
      for (const res of results) {
        console.log(`[ID ${res.id}] 🎭 ${res.act}`);
        const snippet = res.prompt.replace(/\n+/g, " ").slice(0, 120);
        console.log(`    ↳ "${snippet}..."`);
        console.log("");
      }
      return;
    }

    if (command === "get") {
      const identifier = target || args._[1];
      if (!identifier) {
        console.error("Vui lòng cung cấp ID hoặc Tên Act cần xem.");
        process.exit(1);
      }
      const item = getPrompt(identifier);
      if (!item) {
        console.error(`Không tìm thấy prompt với định danh: ${identifier}`);
        process.exit(1);
      }
      console.log(`\n======================================================`);
      console.log(`🎭 ACT: ${item.act} (ID: ${item.id})`);
      console.log(`👤 Contributor: ${item.contributor || "N/A"} | Type: ${item.type}`);
      console.log(`======================================================\n`);
      console.log(item.prompt);
      console.log(`\n======================================================\n`);
      return;
    }

    if (command === "list-categories" || command === "categories") {
      const cats = listCategories();
      console.log("\n📂 DANH MỤC PROMPTS PHỤC VỤ SẢN XUẤT VIDEO:\n");
      for (const cat of cats) {
        console.log(`- ${cat.key} (${cat.count} prompts)`);
        console.log(`  Tiêu đề: ${cat.title}`);
        console.log(`  Mô tả:   ${cat.description}\n`);
      }
      return;
    }

    if (command === "random") {
      const { prompts } = loadData();
      let pool = prompts;
      if (args.category) {
        const { categories } = loadData();
        if (categories[args.category]) {
          const ids = new Set(categories[args.category].items.map(i => i.id));
          pool = prompts.filter(p => ids.has(p.id));
        }
      }
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      console.log(`\n🎲 PROMPT NGẪU NHIÊN: [ID ${randomItem.id}] 🎭 ${randomItem.act}\n`);
      console.log(randomItem.prompt);
      console.log("");
      return;
    }

    if (command === "export-persona") {
      const identifier = target || args._[1];
      const item = getPrompt(identifier);
      if (!item) {
        console.error(`Không tìm thấy prompt với định danh: ${identifier}`);
        process.exit(1);
      }
      const markdown = `<!-- PERSONA: ${item.act} -->
> [!TIP]
> **Active Persona**: ${item.act}
> **Core Instruction**:
> ${item.prompt}
`;
      if (args.output) {
        fs.writeFileSync(path.resolve(ROOT, args.output), markdown, "utf8");
        console.log(`Đã xuất persona ra file: ${args.output}`);
      } else {
        console.log(markdown);
      }
      return;
    }

    console.log(`Lệnh không hợp lệ: ${command}. Gõ "help" để xem hướng dẫn.`);
  } catch (err) {
    console.error("Lỗi:", err.message);
    process.exit(1);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}

```

---

## File: `core/scripts/router/index.js` <a id="file-core-scripts-router-index-js"></a>

```javascript
import { EngineCapabilities } from "../../contracts/capabilities.js";
import { MOTION_INTENTS } from "../../schemas/registry.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const configPath = fs.existsSync(path.join(rootDir, "config", "factory-config.json"))
  ? path.join(rootDir, "config", "factory-config.json")
  : path.join(rootDir, "factory-config.json");

export function evaluateEngineCompatibility(spec, engineId) {
  const cap = EngineCapabilities[engineId];
  if (!cap || cap.status !== "implemented") return { supported: false, reasons: [`Engine ${engineId} is not implemented.`] };
  
  let supported = true;
  const reasons = [];

  for (const scene of spec.script.scenes) {
    if (scene.visualIntent && scene.visualIntent.layout) {
      if (!cap.supportedVisualIntents.includes(scene.visualIntent.layout)) {
        supported = false;
        reasons.push(`Scene ${scene.id} uses layout '${scene.visualIntent.layout}' unsupported by ${engineId}.`);
      }
    }
    if (scene.motionIntent) {
      for (const intent of scene.motionIntent) {
        if (!cap.supportedMotionIntents.includes(intent.type)) {
          // Check if registry defines a fallback
          const reg = MOTION_INTENTS[intent.type];
          if (reg && reg.fallback && cap.supportedMotionIntents.includes(reg.fallback)) {
             reasons.push(`WARNING: motion "${intent.type}" -> fallback "${reg.fallback}" (engine: ${engineId}, reason: unsupported capability)`);
          } else {
             supported = false;
             reasons.push(`Scene ${scene.id} uses motion '${intent.type}' unsupported by ${engineId} (No fallback available).`);
          }
        }
      }
    }
    if (scene.assets) {
       for (const asset of scene.assets) {
          if (!cap.supportedAssetTypes.includes(asset.type)) {
             supported = false;
             reasons.push(`Scene ${scene.id} uses asset type '${asset.type}' unsupported by ${engineId}.`);
          }
       }
    }
  }
  return { supported, reasons };
}

export function routeSpec(spec, userOverrideMode = "AUTO") {
  const aiSuggestion = spec.engineRouting?.suggestedEngine;
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const primary = String(config.primary_engine || "remotion").toUpperCase();
  
  const remotionCompat = evaluateEngineCompatibility(spec, "REMOTION");

  if (userOverrideMode && userOverrideMode.toUpperCase() !== "AUTO") {
    const overrideEngine = userOverrideMode.toUpperCase();
    if (!["REMOTION", "HYPERFRAMES"].includes(overrideEngine)) {
      return { success: false, error: "UNKNOWN_ENGINE", reasons: [`Unknown engine: ${overrideEngine}`] };
    }
    return { 
      success: true, 
      selectedEngine: overrideEngine, 
      reasons: [`User override enforced ${overrideEngine}.`, ...remotionCompat.reasons] 
    };
  }

  // Remotion is the unified primary engine
  if (remotionCompat.supported || !remotionCompat.reasons.length) {
    return {
      success: true,
      selectedEngine: "REMOTION",
      reasons: [
        "REMOTION selected as primary engine.",
        ...remotionCompat.reasons
      ]
    };
  }

  return {
    success: true,
    selectedEngine: "REMOTION",
    reasons: ["Defaulting to REMOTION engine.", ...remotionCompat.reasons]
  };
}

```

---

## File: `core/scripts/style/exporter.js` <a id="file-core-scripts-style-exporter-js"></a>

```javascript
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const STYLES_DIR = path.join(ROOT, "styles");
const REGISTRY_PATH = path.join(STYLES_DIR, "registry.json");

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function exportDnaToStylePack(dnaProfile, requestedName, vaultDir) {
  if (!fs.existsSync(STYLES_DIR)) {
    fs.mkdirSync(STYLES_DIR, { recursive: true });
  }

  const rawId = requestedName || dnaProfile.id || "custom-style";
  const styleId = toKebabCase(rawId);
  const pascalName = toPascalCase(styleId) + "Theme";
  const displayName = requestedName
    ? requestedName.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : styleId.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const styleFolder = path.join(STYLES_DIR, styleId);
  fs.mkdirSync(styleFolder, { recursive: true });

  const bp = dnaProfile.clonedDnaBlueprint || {};
  const vis = bp.visualStyle || {};
  const pal = vis.palette || {};
  const typo = bp.typography || {};
  const sub = bp.subtitleStyle || {};
  const mot = bp.motionPhysics || {};
  const snd = bp.soundDesign || {};
  const rh = dnaProfile.rhythmAndPacing || {};

  const background = pal.background || "#0f172a";
  const surface = pal.surface || "#1e293b";
  const primaryText = pal.primaryText || "#ffffff";
  const accentPrimary = pal.accentColor || "#38bdf8";
  const accentSecondary = pal.secondaryAccent || "#f59e0b";

  // 1. Write style.json conforming to schemas/style.schema.json
  const styleJson = {
    "$schema": "../../schemas/style.schema.json",
    "id": styleId,
    "version": "1.0.0",
    "name": displayName,
    "purpose": `Phong cách video bóc tách từ video tham chiếu ${dnaProfile.source || styleId}`,
    "bestFor": [
      "Video phong cách bóc tách thực chiến",
      rh.pacingVelocity || "DYNAMIC EXPLAINER",
      "Shorts / TikTok / Reels 9:16"
    ],
    "notIdealFor": ["Nội dung không hợp nhịp độ bóc tách"],
    "beatSeconds": {
      "min": Math.max(1.5, Number((rh.avgCutIntervalSec * 0.7).toFixed(1))),
      "max": Math.max(3.0, Number((rh.avgCutIntervalSec * 1.4).toFixed(1))),
      "resetEveryBeats": 3
    },
    "script": {
      "hookStyle": "Trích xuất từ video tham chiếu",
      "tone": snd.voiceTone || "Chuyên nghiệp, tự tin",
      "structure": "Hook -> Exploration -> Core Insight -> Climax -> Outro"
    },
    "visual": {
      "palette": {
        "background": background,
        "surface": surface,
        "accentPrimary": accentPrimary,
        "accentSecondary": accentSecondary,
        "positive": "#10B981",
        "negative": "#EF4444"
      },
      "cardStyle": vis.cardArchetype || "Cloned reference card layout",
      "cornerRadius": vis.cornerRadius || 20
    },
    "imagePrompt": {
      "stylePrefix": `style matched to ${displayName}, ${vis.borderStyle || "clean aesthetics"}`,
      "negativePrompt": "low quality, blurry, amateur rendering"
    },
    "motion": {
      "spring": mot.springConfig || { "damping": 16, "stiffness": 140, "mass": 0.8 },
      "entrance": mot.entranceMotion || "slide-up + pop-scale",
      "targetWpm": snd.narrationPacingWpm || 150
    },
    "typography": {
      "headlineFont": typo.headlineFont || "Be Vietnam Pro Bold",
      "bodyFont": typo.bodyFont || "Be Vietnam Pro Regular",
      "safeZoneY": typo.safeZonePaddingY || [260, 1550]
    },
    "audio": {
      "voiceGender": snd.voiceGender || "male",
      "tone": snd.voiceTone || "Hải Đăng studio",
      "bgm": snd.bgmStyle || "Dynamic electronic pulse",
      "targetLufs": -12.5
    },
    "thumbnail": {
      "style": "High-contrast hero frame with key metric and accent glow"
    },
    "renderer": {
      "primary": "remotion",
      "composition": "CanonicalVideo"
    },
    "prohibited": [
      "Khung hình rỗng",
      "Cắt chữ bằng ellipsis",
      "Vi phạm safe zone [260, 1550]"
    ]
  };

  const styleJsonPath = path.join(styleFolder, "style.json");
  fs.writeFileSync(styleJsonPath, JSON.stringify(styleJson, null, 2) + "\n");

  // 2. Write theme.ts
  const themeTsContent = `import { StyleTheme } from "../types";

export const ${pascalName}: StyleTheme = {
  meta: {
    id: "${styleId}",
    version: "1.0.0",
    name: "${displayName}",
    purpose: "Phong cách bóc tách từ video tham chiếu ${dnaProfile.source || styleId}",
    category: "custom",
    bestFor: [
      "Video phong cách bóc tách thực chiến",
      "${rh.pacingVelocity || "DYNAMIC EXPLAINER"}",
      "Shorts / TikTok / Reels 9:16"
    ],
    notIdealFor: ["Nội dung không hợp nhịp độ bóc tách"],
    tags: ["cloned", "dna", "${styleId}"],
    sourceDna: "${dnaProfile.id}",
    previewImage: "contact_sheet.jpg",
  },
  colors: {
    background: "${background}",
    backgroundGradient: "radial-gradient(ellipse at 50% 20%, ${surface} 0%, ${background} 80%)",
    surface: "${surface}",
    surfaceGlass: "${surface}EE",
    border: "${accentPrimary}33",
    borderActive: "${accentPrimary}",
    textPrimary: "${primaryText}",
    textSecondary: "${primaryText}B3",
    textMuted: "${primaryText}66",
    accentPrimary: "${accentPrimary}",
    accentSecondary: "${accentSecondary}",
    positive: "#10B981",
    negative: "#EF4444",
    warning: "${accentSecondary}",
  },
  typography: {
    fontFamily: "'${(typo.headlineFont || "Be Vietnam Pro").split("/")[0].trim()}', system-ui, sans-serif",
    headline: {
      fontSize: ${typo.headlineSize || 64},
      fontWeight: 900,
      lineHeight: 1.15,
      letterSpacing: "-1px",
    },
    subheadline: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.25,
    },
    cardTitle: {
      fontSize: 38,
      fontWeight: 800,
      lineHeight: 1.25,
    },
    cardBody: {
      fontSize: ${typo.bodySize || 28},
      fontWeight: 600,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 78,
      fontWeight: 900,
      letterSpacing: "-1px",
    },
    badgeText: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.35,
    },
  },
  subtitles: {
    positionY: ${sub.positionY || 1500},
    activeWordColor: "${sub.activeWordColor || accentPrimary}",
    inactiveWordColor: "${sub.inactiveWordColor || "rgba(255,255,255,0.7)"}",
    backgroundColor: "${background}F0",
    borderRadius: 20,
    padding: "14px 30px",
    fontSize: 34,
    fontWeight: 800,
  },
  springs: {
    snappy: { damping: ${mot.springConfig?.damping || 16}, stiffness: ${mot.springConfig?.stiffness || 140}, mass: ${mot.springConfig?.mass || 0.7} },
    gentle: { damping: 20, stiffness: 95, mass: 1 },
    bounce: { damping: 11, stiffness: 175, mass: 0.75 },
    slow: { damping: 25, stiffness: 55, mass: 1.2 },
  },
  motion: {
    pacingVelocity: "${rh.pacingVelocity || "DYNAMIC EXPLAINER"}",
    avgCutIntervalSec: ${rh.avgCutIntervalSec || 3.0},
    targetWpm: ${snd.narrationPacingWpm || 150},
    entranceMotion: "${mot.entranceMotion || "slide-up + pop-scale"}",
    continuousMotion: "${mot.continuousMotion || "subtle-float"}",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 50,
  },
};
`;

  const themeTsPath = path.join(styleFolder, "theme.ts");
  fs.writeFileSync(themeTsPath, themeTsContent);

  // 3. Copy contact sheet
  const srcContactSheet = path.join(vaultDir, "raw", "contact_sheet.jpg");
  const destContactSheet = path.join(styleFolder, "contact_sheet.jpg");
  if (fs.existsSync(srcContactSheet)) {
    fs.copyFileSync(srcContactSheet, destContactSheet);
  }

  // 4. Write README.md
  const readmeContent = `# Style: ${displayName} (\`${styleId}\`)

> **Nguồn gốc DNA**: Bóc tách từ video tham chiếu \`${dnaProfile.source || styleId}\`  
> **DNA Vault ID**: \`${dnaProfile.id}\`  
> **Tốc độ đọc đề xuất**: ~${snd.narrationPacingWpm || 150} WPM | **Nhịp cắt cảnh**: ${rh.avgCutIntervalSec || 3.0}s/cảnh

---

## 🎨 Bảng màu (Color Palette)
- **Background**: \`${background}\`
- **Surface**: \`${surface}\`
- **Accent Primary**: \`${accentPrimary}\`
- **Accent Secondary**: \`${accentSecondary}\`

---

## ⚡ Thông số Motion
- **Spring**: \`damping: ${mot.springConfig?.damping || 16}\`, \`stiffness: ${mot.springConfig?.stiffness || 140}\`, \`mass: ${mot.springConfig?.mass || 0.7}\`
- **Chuyển động xuất hiện**: \`${mot.entranceMotion || "slide-up + pop-scale"}\`
- **Phụ đề**: \`y: ${sub.positionY || 1500}\`, highlight từ đang đọc: \`${sub.activeWordColor || accentPrimary}\`
`;
  fs.writeFileSync(path.join(styleFolder, "README.md"), readmeContent);

  // 5. Update styles/registry.json
  let registry = { version: "1.0.0", styles: [] };
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    } catch {
      // ignore
    }
  }

  const existingIndex = registry.styles.findIndex(s => s.id === styleId);
  const entry = {
    id: styleId,
    name: displayName,
    category: "custom",
    purpose: styleJson.purpose,
    bestFor: styleJson.bestFor,
    tags: ["cloned", "dna", styleId],
    path: `styles/${styleId}`,
    targetWpm: snd.narrationPacingWpm || 150,
    avgCutIntervalSec: Number(rh.avgCutIntervalSec) || 3.0,
    sourceDna: dnaProfile.id,
    previewImage: fs.existsSync(destContactSheet) ? `styles/${styleId}/contact_sheet.jpg` : undefined
  };

  if (existingIndex >= 0) {
    registry.styles[existingIndex] = entry;
  } else {
    registry.styles.push(entry);
  }
  registry.updatedAt = new Date().toISOString();
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

  // 6. Update styles/index.ts to re-export the new theme
  updateStylesIndex(styleId, pascalName);

  console.log(`\n🎨 [Style Registry] Đã lưu thành công Style mới vào thư viện:`);
  console.log(`   └─ Style ID: ${styleId}`);
  console.log(`   └─ Thư mục: styles/${styleId}`);
  console.log(`   └─ Theme TS: styles/${styleId}/theme.ts`);
  console.log(`   └─ Registry: styles/registry.json (Tổng: ${registry.styles.length} styles)\n`);

  return { styleId, styleFolder, themeTsPath };
}

function updateStylesIndex(styleId, pascalName) {
  const indexPath = path.join(STYLES_DIR, "index.ts");
  if (!fs.existsSync(indexPath)) return;

  let content = fs.readFileSync(indexPath, "utf8");

  // Check if already imported
  if (!content.includes(`from "./${styleId}/theme"`)) {
    // Add import statement
    const importStmt = `import { ${pascalName} } from "./${styleId}/theme";\n`;
    content = importStmt + content;

    // Add to STYLE_THEMES dictionary
    const targetMap = "export const STYLE_THEMES: Record<string, StyleTheme> = {";
    if (content.includes(targetMap)) {
      content = content.replace(targetMap, `${targetMap}\n  "${styleId}": ${pascalName},`);
    }

    // Add to named exports
    const exportTarget = "export {";
    if (content.includes(exportTarget)) {
      content = content.replace(exportTarget, `${exportTarget}\n  ${pascalName},`);
    }

    fs.writeFileSync(indexPath, content);
  }
}

```

---

## File: `core/scripts/factory/index.js` <a id="file-core-scripts-factory-index-js"></a>

```javascript
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import { validateSpec } from "../../schemas/zod.js";
import { routeSpec } from "../router/index.js";
import { duration } from "./media.js";
import { ROOT, artifactPath, approveGate, evaluate, invalidateFrom, narrationFromScript,
  projectDir, readState, recordStage, stageInput } from "./state.js";

function requireSpec(project) {
  const file = artifactPath(project, "specs/video-spec.json");
  const spec = JSON.parse(fs.readFileSync(file, "utf8"));
  const result = validateSpec(spec);
  if (!result.valid) throw new Error(`Invalid VideoSpec: ${JSON.stringify(result.errors)}`);
  for (const scene of spec.script.scenes) {
    for (const asset of scene.assets) {
      const assetFile = artifactPath(project, asset.path);
      if (!fs.existsSync(assetFile) || fs.statSync(assetFile).size === 0) throw new Error(`Missing asset: ${asset.path}`);
    }
  }
  const routing = routeSpec(spec, "AUTO");
  if (!routing.success) throw new Error(`No compatible engine: ${routing.reasons.join("; ")}`);
  return spec;
}
function requireTechnicalQa(project, kind) {
  const file = artifactPath(project, `output/${kind}-qc.json`);
  const qc = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!qc.pass || qc.kind !== kind) throw new Error(`${kind} technical QA did not pass`);
  return qc;
}
function status(project) {
  const result = evaluate(project);
  const { signatures, ...visible } = result;
  return visible;
}
export async function main(argv = process.argv.slice(2)) {
  const [command, ...rest] = argv;
  const args = minimist(rest, { boolean: ["reviewed"] });
  if (!command || command === "help") {
    console.log("factory <doctor|status|next|record|approve|fast-track|check|dirty|tts|render|package> --project <id> [options]");
    return;
  }
  if (command === "doctor" || command === "health") {
    const { runDoctor } = await import("./doctor.js");
    await runDoctor();
    return;
  }
  if (command === "start-services" || command === "start") {
    const psScript = path.join(ROOT, "core", "scripts", "factory", "start-services.ps1");
    spawnSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psScript], {
      stdio: "inherit"
    });
    return;
  }
  const project = args.project;
  projectDir(project);
  if (command === "package") {
    const { packageProject } = await import("./package.js");
    await packageProject(project);
    return;
  }
  if (command === "fast-track") {
    const { ensureServices } = await import("./services.js");
    await ensureServices({ tts: true, flowkit: false });
    let current = evaluate(project);
    console.log(`[Fast-Track] Project: ${project} (Current stage: ${current.next})`);
    if (current.next === "GATE1") {
      current = approveGate(project, "GATE1", "Fast-track: Auto-approved standard script & beats");
      console.log(`[Fast-Track] Approved GATE1 -> Next: ${current.next}`);
    }
    if (current.next === "CREATIVE_DIRECTION") {
      const cdFile = path.join(projectDir(project), "creative-direction.md");
      if (!fs.existsSync(cdFile)) {
        fs.writeFileSync(cdFile, "# Creative Direction\n\nFast-track standard explainer template with high-contrast mobile typography.\n");
      }
      current = recordStage(project, "CREATIVE_DIRECTION", ["creative-direction.md"]);
      console.log(`[Fast-Track] Recorded CREATIVE_DIRECTION -> Next: ${current.next}`);
    }
    if (current.next === "GATE2") {
      current = approveGate(project, "GATE2", "Fast-track: Auto-selected standard creative direction");
      console.log(`[Fast-Track] Approved GATE2 -> Next: ${current.next}`);
    }
    console.log(JSON.stringify({ project, mode: "fast-track", next: current.next }, null, 2));
    return;
  }
  if (command === "status") { console.log(JSON.stringify(status(project), null, 2)); return; }
  if (command === "next") { console.log(JSON.stringify({ project, next: evaluate(project).next })); return; }
  if (command === "check") {
    const result = status(project);
    console.log(JSON.stringify(result, null, 2));
    if (Object.values(result.stages).some(item => item.status === "dirty")) process.exitCode = 1;
    return;
  }
  if (command === "dirty") {
    console.log(JSON.stringify(invalidateFrom(project, String(args.stage || "").toUpperCase()).stages));
    return;
  }
  if (command === "approve") {
    const gate = String(args.gate || "").toUpperCase();
    const result = approveGate(project, gate, args.evidence);
    console.log(JSON.stringify({ approved: gate, next: result.next }));
    return;
  }
  if (command === "record") {
    const stage = String(args.stage || "").toUpperCase();
    if (["VIDEO_SPEC", "VALIDATION", "PRODUCTION"].includes(stage)) requireSpec(project);
    if (stage === "VALIDATION") {
      const checked = spawnSync(process.execPath,
        [path.join(ROOT, "core", "scripts", "validate", "index.js"), "--project", project],
        { cwd: path.join(ROOT, "core"), stdio: "inherit", timeout: 30000 });
      if (checked.status !== 0) throw new Error(`VideoSpec validation failed: ${checked.status ?? checked.error?.message}`);
    }
    if (stage === "TTS") {
      if (![args.voice, args.rate, args.pitch, args.volume, args.provider].every(Boolean)) {
        throw new Error("Recording external TTS requires --voice --rate --pitch --volume --provider");
      }
      const voiceSeconds = duration(artifactPath(project, "assets/audio/narration.mp3"));
      const timing = JSON.parse(fs.readFileSync(artifactPath(project, "assets/audio/timing.json"), "utf8"));
      if (Math.abs(timing.durationMs / 1000 - voiceSeconds) > 0.1) throw new Error("TTS timing is not measured from actual audio");
      if (!Array.isArray(timing.words) || !timing.words.length || timing.words.some(word =>
        !Number.isFinite(word.startMs) || !Number.isFinite(word.durationMs) || word.durationMs <= 0)) {
        throw new Error("TTS needs measured word boundaries");
      }
    }
    if (stage === "PREVIEW_QA") requireTechnicalQa(project, "preview");
    if (stage === "FINAL_QA") requireTechnicalQa(project, "final");
    const artifacts = args.artifact ? [args.artifact].flat() : [];
    const metadata = { ...(args.reviewed && { reviewed: true }), ...(args.voice && { voice: args.voice }),
      ...(args.rate && { rate: args.rate }), ...(args.pitch && { pitch: args.pitch }),
      ...(args.volume && { volume: args.volume }), ...(args.provider && { provider: args.provider }),
      ...(args.engine && { engine: args.engine }) };
    const result = recordStage(project, stage, artifacts, metadata);
    console.log(JSON.stringify({ recorded: stage, next: result.next }));
    return;
  }
  if (command === "tts") {
    const { ensureCitVoiceStudio } = await import("./services.js");
    await ensureCitVoiceStudio(4000);
    const settings = { voice: args.voice || "Hải Đăng", rate: args.rate || "+10%",
      pitch: args.pitch || "+0Hz", volume: args.volume || "+0%", provider: "cit-voice-studio" };
    const state = readState(project), current = evaluate(project, state);
    const prior = current.signatures.GATE2;
    const wantedInput = prior && stageInput(project, "TTS", state, prior, settings);
    if (current.stages.TTS.status === "complete" && state.stages.TTS.input === wantedInput) {
      console.log(JSON.stringify({ stage: "TTS", cache: "HIT" })); return;
    }
    if (current.next !== "TTS") throw new Error(`Expected ${current.next} before TTS`);
    const narration = narrationFromScript(project);
    const commandArgs = [path.join(ROOT, "core", "scripts", "tts", "index.js"), "--project", project,
      "--text", narration, "--voice", settings.voice, "--rate", settings.rate,
      "--pitch", settings.pitch, "--volume", settings.volume, "--provider", settings.provider,
      ...(args.speed ? ["--speed", String(args.speed)] : [])];
    const result = spawnSync(process.execPath, commandArgs, { cwd: path.join(ROOT, "core"), stdio: "inherit", timeout: 180000 });
    if (result.status !== 0) throw new Error(`TTS failed with code ${result.status ?? result.error?.message}`);
    const voiceSeconds = duration(artifactPath(project, "assets/audio/narration.mp3"));
    const timingFile = artifactPath(project, "assets/audio/timing.json");
    const timing = JSON.parse(fs.readFileSync(timingFile, "utf8"));
    timing.durationSec = voiceSeconds;
    timing.durationMs = Math.round(voiceSeconds * 1000);
    timing.durationFrames = Math.ceil(voiceSeconds * 30);
    timing.measuredBy = "ffprobe";
    fs.writeFileSync(timingFile, JSON.stringify(timing, null, 2) + "\n");
    if (!Array.isArray(timing.words) || !timing.words.length) throw new Error("TTS provider returned no word boundaries");
    const recorded = recordStage(project, "TTS", [], settings);
    console.log(JSON.stringify({ stage: "TTS", cache: "MISS", next: recorded.next }));
    return;
  }
  if (command === "render") {
    const kind = args.kind || "final";
    const stage = kind === "preview" ? "PREVIEW" : kind === "final" ? "FINAL_RENDER" : null;
    if (!stage) throw new Error("--kind must be preview or final");
    const spec = requireSpec(project);
    const requestedEngine = String(args.engine || "AUTO").toUpperCase();
    if (requestedEngine === "FLOWKIT" || spec.engine === "FLOWKIT") {
      const { ensureFlowKit } = await import("./services.js");
      await ensureFlowKit(5000);
    }
    const routing = routeSpec(spec, requestedEngine);
    if (!routing.success) throw new Error(`Engine incompatible: ${routing.reasons.join("; ")}`);
    let current = evaluate(project);
    if (current.stages[stage].status === "complete") {
      const cachedEngine = readState(project).stages[stage]?.metadata?.engine;
      if (routing.selectedEngine === cachedEngine) {
        console.log(JSON.stringify({ render: kind, cache: "HIT" })); return;
      }
      current = invalidateFrom(project, stage);
    }
    if (current.next !== stage) {
      if (kind === "final" && ["PREVIEW", "PREVIEW_QA", "GATE3"].includes(current.next)) {
        // Direct Single Final Render Mode: render final directly without generating or copying preview artifacts
        process.env.FACTORY_FINAL_APPROVED = "1";
        try {
          const { renderProject } = await import("../render/index.js");
          const report = await renderProject({ project, kind: "final", engine: args.engine || "AUTO" });
          if (current.next === "PREVIEW") {
            current = recordStage(project, "PREVIEW", [], { engine: report.engine, skipped: true });
          }
          if (current.next === "PREVIEW_QA") {
            current = recordStage(project, "PREVIEW_QA", [], { reviewed: true, skipped: true });
          }
          if (current.next === "GATE3") {
            current = approveGate(project, "GATE3", "User requested single direct final render (skipping preview)");
          }
          const recorded = recordStage(project, "FINAL_RENDER", [], { engine: report.engine });
          console.log(JSON.stringify({ render: "final", qa: report, singleFinalMode: true, next: recorded.next }));
        } finally { delete process.env.FACTORY_FINAL_APPROVED; }
        return;
      }
      throw new Error(`Expected ${current.next} before ${stage}`);
    }
    if (kind === "final") process.env.FACTORY_FINAL_APPROVED = "1";
    try {
      const { renderProject } = await import("../render/index.js");
      const report = await renderProject({ project, kind, engine: args.engine || "AUTO" });
      const recorded = recordStage(project, stage, [], { engine: report.engine });
      console.log(JSON.stringify({ render: kind, qa: report, next: recorded.next }));
    } finally { delete process.env.FACTORY_FINAL_APPROVED; }
    return;
  }
  throw new Error(`Unknown factory command: ${command}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}

```

---

# 6. Kỹ năng & Hướng dẫn Remotion (.agents/skills)

## File: `.agents/skills/remotion-explainer/SKILL.md` <a id="file--agents-skills-remotion-explainer-skill-md"></a>

````markdown
---
name: remotion-explainer
description: Elite 3D WebGL & Spatial HUD Motion Designer skill for creating vertical short-form explainer videos (9:16). Masterfully combines procedural 3D WebGL centerpieces (ThreeCanvas/R3F) with 2.5D Spatial Glass HUD cards and speech-synced typography.
---

# Remotion Explainer: 3D WebGL & Spatial HUD Motion Designer Skill

You are an **Elite 3D WebGL & Spatial HUD Motion Designer**. Your core mission is to programmatically generate cutting-edge, high-retention vertical explainer videos (1080x1920, scaled down cleanly to 360x640 mobile viewports).

You strictly avoid flat, generic 2D explainer clichés (no flat 2D SVG illustrations, no plain flat cards, no generic cartoon vectors). Every scene is a multi-layered cinematic spatial experience fusing real-time 3D WebGL geometry with floating 2.5D HUD telemetry cards.

---

## 1. BẮT BUỘC KIẾN TRÚC 2 LỚP CHO MỌI SCENE (2-Layer Spatial Architecture)

Mọi cảnh quay Remotion được dựng phải tuân thủ nghiêm ngặt mô hình 2 lớp thị giác:

```text
┌────────────────────────────────────────────────────────┐
│ [LAYER 2] FOREGROUND 2.5D SPATIAL HUD OVERLAY          │
│ - Thẻ CardArchetypes (HeroMetric, Comparison, Feature) │
│ - Đã tích hợp sẵn SpatialHUDCard (Góc nghiêng 3D,      │
│   brackets [ ], tia laser sweep, floating physics)     │
│ - SpeechSyncedSubtitles (Y: 1530)                      │
├────────────────────────────────────────────────────────┤
│ [LAYER 1] BACKGROUND & CENTERPIECE 3D STAGE            │
│ - <Stage3DWrapper> bọc <ThreeCanvas>                   │
│ - Camera động: "orbit" | "dolly-in" | "fly-through"   │
│ - Ánh sáng 3 điểm + Hạt Sparkles + Bioluminescent Bloom│
│ - Mô hình 3D lõi: ColonHologram3D, BioShield3D,        │
│   Candlestick3DChart, BarRace3DTowers...               │
│ - CẤM HOÀN TOÀN VẼ MINH HỌA TRUNG TÂM BẰNG <SVG> 2D   │
└────────────────────────────────────────────────────────┘
```

### Lớp 1: Background & Centerpiece 3D Stage (`shared/three`)
- **Bắt buộc dùng `<Stage3DWrapper>`:** Luôn bọc không gian 3D bằng `<Stage3DWrapper>` từ `@/shared`.
- **Mô hình 3D tham số hóa (Procedural 3D Prefabs):**
  - **Y sinh / Y tế / Sức khỏe / Bảo hiểm:**
    * `<ColonHologram3D progress={...} highlightPolyp={...} />`: Tổ hợp 3D giải phẫu ổ bụng đa tầng (Gan + Dạ dày + Ruột non cuộn xoắn + Đại trực tràng phát sáng + Cột sống + Khung cơ thể).
    * `<EndoscopySimulation3D cutProgress={...} />`: Góc nhìn cận cảnh nội soi, niêm mạc ruột 3D, đầu dò kim loại phóng tia laser cyan 3D cắt chân polyp với lift giới hạn an toàn.
    * `<BioShield3D progress={...} accentColor={...} />`: Khiên bảo vệ khối đa diện `IcosahedronGeometry` 2 lớp xoay ngược chiều cho các cảnh Tầm soát / Bảo hiểm.
    * `<DNAStrand3D />` & `<BloodCellStream3D />`: Chuỗi xoắn kép DNA 3D và dòng chảy hồng cầu sinh học trong mạch máu.
  - **Tài chính / Dữ liệu / Chứng khoán / Kinh tế:**
    * `<Candlestick3DChart data={...} />`: Biểu đồ nến Nhật 3D nổi khối (`BoxGeometry` + `CylinderGeometry`) mọc lên theo `spring()` với hiệu ứng phát sáng xanh/đỏ.
    * `<BarRace3DTowers items={...} />`: Các cột tháp 3D nguyên khối kim loại đua chiều cao theo góc nghiêng Isometric.
    * `<WealthVaultShield3D />`: Khối kim cương bát diện khúc xạ đa tầng bọc trong các vành đai bảo vệ vàng gimbal xoay 3 chiều.
- **LUẬT 3D REMOTION TUYỆT ĐỐI:**
  - **CẤM DÙNG `useFrame` của R3F.**
  - 100% chuyển động, góc xoay và camera phải tính toán toán học từ `useCurrentFrame()`. Bất kỳ chuyển động nào không đồng bộ từ `useCurrentFrame()` sẽ gây chớp nháy (flickering) khi render MP4.

### Lớp 2: Foreground 2.5D HUD Overlay (`shared/CardArchetypes.tsx`)
- Không viết lại khung thẻ thủ công. Bắt buộc gọi 6 Card Archetypes từ `@/shared`:
  1. `<HeroMetricCard number="..." unit="..." description="..." category="..." footnote="..." />`
  2. `<ComparisonCard left={...} right={...} />`
  3. `<FeatureGridCard items={...} />`
  4. `<StepFlowCard steps={...} />`
  5. `<ChecklistCard title="..." badge={...} items={...} />`
  6. `<QuoteCard quote="..." author="..." role="..." source="..." />`
- Toàn bộ 6 thẻ trên đã tích hợp sẵn `<SpatialHUDCard>` bên trong: Tự động có góc nghiêng 3D (`rotateX`, `rotateY`, `translateZ`), hiệu ứng trôi nổi vật lý, 4 góc brackets `[ ]` và tia laser quét ngang.

---

## 2. CONTEXTUAL 3D ANATOMY & FRAMING (Tỷ lệ Vàng & Bối cảnh Giải phẫu 3D)
- **Bối cảnh Giải phẫu Toàn diện (Contextual Anatomy):**
  - Khi dựng mô hình giải phẫu cơ quan, luôn dựng kèm các cơ quan lân cận ở chế độ X-ray mờ (`opacity: 0.25 - 0.35`) và khung lưới cơ thể (`Torso Wireframe`) để tạo bối cảnh giải phẫu đầy đặn, sống động, **tuyệt đối tránh để 1 khối hình học trơ trọi, rỗng tuếch**.
  - Ví dụ: Đại trực tràng luôn đi kèm ruột non cuộn ở giữa, gan bên phải và dạ dày bên trái để lấp đầy thể tích giải phẫu 3D ổ bụng.
- **Tỷ lệ Khung hình & Không gian An toàn (Framing & Scale):**
  - Giữ tỷ lệ cụm 3D chiếm **35%–40% khung hình** trong vùng Safe Stage riêng biệt ở khoảng giữa (`Y: 500 - 1100`).
  - Đẩy Camera lùi xa (`cameraPosition = [0, 0, 11.5]`, `cameraFov = 42`) và điều chỉnh Bloom vừa phải (`intensity = 0.7`, `luminanceThreshold = 0.35`) để không bị lóa trắng làm chói mắt hay át chữ.
  - Khi có danh sách nhiều thẻ chữ xếp dọc (Scene 2, Scene 3), đẩy cụm 3D lùi sâu ra sau (`z = -6`, `scale = 0.32`) và hạ độ sáng xuống 25% kèm lớp nền tối mờ `rgba(6, 10, 20, 0.65)` chắn giữa để chữ và số liệu luôn sắc nét 100%.

---

## 3. QUY CHUẨN PHỤ ĐỀ THEO TỪ (Speech-Synced Subtitles)
- Sử dụng component `<SpeechSyncedSubtitles words={words} fps={fps} />` từ `@/shared`.
- **Nguyên tắc:**
  - Hiện sẵn cụm từ ngắn theo nhịp câu tại tọa độ an toàn `Y: 1530`.
  - **Chỉ từ đang đọc đổi màu highlight** (`activeColor`).
  - **CẤM rung giật layout:** Tuyệt đối không thay đổi `font-size`, `font-weight`, hoặc phóng to `scale(1.15)` làm nhảy dòng.
  - **Zero Speech = Zero Sub:** Khi im lặng (`activeIndex === -1`), component tự động `return null`.

---

## 4. LUẬT CÁCH LY THƯƠNG HIỆU & OUTRO BẮT BUỘC (Brand Isolation Mandate)
- **Mọi video đều bắt buộc có Outro Thương hiệu ở cảnh cuối cùng:** Sử dụng component `<UserBrandOutro />` từ `@/shared`.
- **CẤM 100% giữ lại thương hiệu của video mẫu:** Tuyệt đối KHÔNG mang tên kênh, logo, slogan, watermark hay hotline của tác giả gốc vào code sản phẩm.
- **Tự động nạp User Brand:** Toàn bộ thông tin nhận diện bắt buộc nạp từ `brand/user-brand.json`.

---

## 5. HÀNG RÀO AN TOÀN THỊ GIÁC TRÊN MOBILE (Hard Constraints)
- **Mobile Safe Zones:** Trục dọc 9:16 (1080x1920) luôn phân bổ cân đối trong khoảng `Y: 260` đến `Y: 1550`. Kiểm tra độ hiển thị rõ ràng trên viewport 360x640.
- **CẤM cắt chữ:** Tuyệt đối không dùng `overflow: hidden`, `text-overflow: ellipsis`, hoặc `-webkit-line-clamp`.
- **CẤM render khung rỗng:** Khi dữ liệu rỗng hoặc undefined, component phải `return null`, tuyệt đối không render container có viền/nền trống.
- **Tương phản chuẩn điện ảnh:** Nền tối sâu phối hợp ánh sáng neon phát quang (`#38bdf8`, `#22c55e`, `#fbbf24`, `#ec4899`) đảm bảo chữ và số liệu luôn sắc nét, nổi bật trên không gian 3D.

````

---

## File: `.agents/skills/remotion-markup/3d.md` <a id="file--agents-skills-remotion-markup-3d-md"></a>

````markdown
---
name: 3d
description: 3D content in Remotion using Three.js and React Three Fiber.
metadata:
  tags: 3d, three, threejs
---

# Using Three.js and React Three Fiber in Remotion

Follow React Three Fiber and Three.js best practices.  
Only the following Remotion-specific rules need to be followed:

## Prerequisites

First, the `@remotion/three` package needs to be installed.  
If it is not, use the following command:

```bash
npx remotion add @remotion/three # If project uses npm
bunx remotion add @remotion/three # If project uses bun
yarn remotion add @remotion/three # If project uses yarn
pnpm exec remotion add @remotion/three # If project uses pnpm
```

## Using ThreeCanvas

You MUST wrap 3D content in `<ThreeCanvas>` and include proper lighting.  
`<ThreeCanvas>` MUST have a `width` and `height` prop.

```tsx
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

const { width, height } = useVideoConfig();

<ThreeCanvas width={width} height={height}>
  <ambientLight intensity={0.4} />
  <directionalLight position={[5, 5, 5]} intensity={0.8} />
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="red" />
  </mesh>
</ThreeCanvas>;
```

## No animations not driven by `useCurrentFrame()`

Shaders, models etc MUST NOT animate by themselves.  
No animations are allowed unless they are driven by `useCurrentFrame()`.  
Otherwise, it will cause flickering during rendering.

Using `useFrame()` from `@react-three/fiber` is forbidden.

## Animate using `useCurrentFrame()`

Use `useCurrentFrame()` to perform animations.

```tsx
const frame = useCurrentFrame();
const rotationY = frame * 0.02;

<mesh rotation={[0, rotationY, 0]}>
  <boxGeometry args={[2, 2, 2]} />
  <meshStandardMaterial color="#4a9eff" />
</mesh>;
```

## Using `<Sequence>` inside `<ThreeCanvas>`

The `layout` prop of any `<Sequence>` inside a `<ThreeCanvas>` must be set to `none`.

```tsx
import { Sequence } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const { width, height } = useVideoConfig();

<ThreeCanvas width={width} height={height}>
  <Sequence layout="none">
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4a9eff" />
    </mesh>
  </Sequence>
</ThreeCanvas>;
```

````

---

# 7. Bộ Style Presets (Styles JSON)

## File: `styles/ai-tech-briefing/style.json` <a id="file-styles-ai-tech-briefing-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "ai-tech-briefing",
  "version": "1.0.0",
  "name": "AI Tech News Briefing",
  "purpose": "Phong cách bản tin thời sự công nghệ & tin tức AI cao cấp: Nền Dark Slate Cyan, bố cục thẻ Hero Metric, so sánh đối lập Side-by-Side, quote trích dẫn phát ngôn và phụ đề speech-synced highlight từ",
  "bestFor": [
    "Bản tin thời sự công nghệ, AI & Phần mềm (AI Hot News)",
    "Tổng hợp top 5 tin nóng trong tuần / trong ngày",
    "Giải thích mô hình AI mới (MoE, LLM, Robotics, Big Tech)",
    "So sánh vụ kiện pháp lý, tranh luận chính sách và đối đầu công nghệ"
  ],
  "notIdealFor": [
    "Nội dung không hợp nhịp độ bóc tách"
  ],
  "beatSeconds": {
    "min": 12.9,
    "max": 25.8,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Trích xuất từ video tham chiếu",
    "tone": "Authoritative, confident, tech-savvy",
    "structure": "Hook -> Exploration -> Core Insight -> Climax -> Outro"
  },
  "visual": {
    "palette": {
      "background": "#0f172a",
      "surface": "#1e293b",
      "accentPrimary": "#38bdf8",
      "accentSecondary": "#f59e0b",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cardStyle": "Hero Metric / Comparison Split",
    "cornerRadius": 24
  },
  "imagePrompt": {
    "stylePrefix": "style matched to Ai Tech Briefing, 1px solid rgba(255,255,255,0.12)",
    "negativePrompt": "low quality, blurry, amateur rendering"
  },
  "motion": {
    "spring": {
      "damping": 18,
      "stiffness": 140,
      "mass": 0.8
    },
    "entrance": "slide-up + pop-scale(0.85 -> 1.0)",
    "targetWpm": 150
  },
  "typography": {
    "headlineFont": "Montserrat / Inter Bold",
    "bodyFont": "Inter Regular",
    "safeZoneY": [
      260,
      1550
    ]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Authoritative, confident, tech-savvy",
    "bgm": "Minimal low-tempo modern lo-fi / electronic pulse",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "High-contrast hero frame with key metric and accent glow"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "CanonicalVideo"
  },
  "prohibited": [
    "Khung hình rỗng",
    "Cắt chữ bằng ellipsis",
    "Vi phạm safe zone [260, 1550]"
  ]
}

```

---

## File: `styles/clean-explainer/style.json` <a id="file-styles-clean-explainer-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "clean-explainer",
  "version": "2.0.0",
  "name": "Clean Explainer 2D",
  "purpose": "Giải thích kiến thức, cơ chế và sản phẩm qua hệ thống 6 cảnh chuẩn Cường IT và 6 bố cục thẻ Archetypes",
  "bestFor": [
    "Giải thích công nghệ, phần mềm, cloud, AI tools",
    "Bảo hiểm sức khỏe (BHSK), BHYT & An sinh gia đình",
    "Kế hoạch tài chính, quản lý rủi ro & hợp đồng quyền lợi",
    "Quy trình từng bước (Step-by-step How-it-works)"
  ],
  "notIdealFor": ["Clip hài ngắn", "MV ca nhạc"],
  "beatSeconds": {
    "min": 2.4,
    "max": 4.8,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Nghịch lý thực tế hoặc câu hỏi nhức nhối về vấn đề thường gặp",
    "tone": "Thực chiến, súc tích, mạch lạc, dễ hiểu và thấu cảm",
    "structure": "Hook -> Problem -> Solution -> Workflow -> Benefits -> Outro"
  },
  "visual": {
    "palette": {
      "background": "#0D1117",
      "surface": "#161B22",
      "accentPrimary": "#58A6FF",
      "accentSecondary": "#34D399",
      "positive": "#3FB950",
      "negative": "#F85149"
    },
    "cardStyle": "Frosted glass card with 6 standard archetypes (Fork, Step Flow, Checklist, Hero Metric)",
    "cornerRadius": 20
  },
  "imagePrompt": {
    "stylePrefix": "modern clean digital explainer cards, glowing technical and healthcare UI schematics",
    "negativePrompt": "low quality, blurry, messy cartoon, overcomplicated 3d"
  },
  "motion": {
    "spring": { "damping": 15, "stiffness": 145, "mass": 0.65 },
    "entrance": "slide-down-reveal",
    "targetWpm": 152
  },
  "typography": {
    "headlineFont": "Plus Jakarta Sans Bold",
    "bodyFont": "Be Vietnam Pro SemiBold",
    "monoFont": "Fira Code Regular",
    "safeZoneY": [250, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, rõ chữ, truyền cảm, tốc độ ổn định",
    "bgm": "Clean lo-fi tech / warm ambient",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Side-by-side comparison card (A vs B) with glowing question badge"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "CanonicalVideo"
  },
  "prohibited": [
    "Khung hình rỗng",
    "Cắt chữ bằng ellipsis",
    "Vi phạm vùng an toàn mobile 9:16"
  ]
}

```

---

## File: `styles/editorial-news-canvas/style.json` <a id="file-styles-editorial-news-canvas-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "editorial-news-canvas",
  "version": "2.0.0",
  "name": "Editorial News Canvas & Press Briefing",
  "purpose": "Phong cách báo chí chính luận & tin tức biên tập: Chèn bài báo thực tế với highlight trích dẫn, bảng điểm thể thao, thông số xe cộ và bảng học thuật",
  "bestFor": [
    "Thời sự chính luận, dân sinh, giao thông & biến động xã hội (Modern News Canvas & Crimson Timeline)",
    "Chèn ảnh chụp bài báo thực tế (Press Clipping Mockup với vệt bút dạ quang trên VnExpress, Tuổi Trẻ, Bloomberg)",
    "Bản tin thể thao: Tỉ số trận đấu (Scoreboard), thống kê cầu thủ & điểm nhấn highlight",
    "Tin thị trường xe cộ: Spec cards so sánh mã lực, tăng tốc, dung lượng pin & đồng hồ đo tốc độ (Gauges)",
    "Giáo dục & Học thuật: Bảng bài giảng step-by-step (Math Lesson Dark/Light), tuyển sinh & deadline"
  ],
  "notIdealFor": ["Clip hài parody", "Video nhảy TikTok ngắn"],
  "beatSeconds": {
    "min": 2.2,
    "max": 4.5,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Tiêu đề bài báo chấn động hoặc con số thống kê thực tế kèm ngày đăng nguồn chính thống",
    "tone": "Nghiêm túc, chuẩn mực phát thanh viên, khách quan và đáng tin cậy",
    "structure": "Tít báo/Sự kiện chấn động -> Trích dẫn bài viết có nguồn -> Số liệu/Bảng so sánh chuyên sâu -> Tác động xã hội -> Outro đúc kết"
  },
  "visual": {
    "palette": {
      "background": "#0B101D",
      "surface": "#131B2E",
      "accentPrimary": "#E11D48",
      "accentSecondary": "#38BDF8",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cardStyle": "Press clipping editorial card with paper tear edges, yellow highlight marker over quotes, and source metadata badge",
    "cornerRadius": 16
  },
  "imagePrompt": {
    "stylePrefix": "editorial press release layout, authentic news clipping collage, sleek dark briefing room background, highlighted text quotes, professional journalist presentation",
    "negativePrompt": "low quality, childish cartoon, messy neon graffiti, distorted text, blurry camera"
  },
  "motion": {
    "spring": { "damping": 16, "stiffness": 140, "mass": 0.75 },
    "entrance": "slide-horizontal-unfold + press-highlight-sweep",
    "targetWpm": 152
  },
  "typography": {
    "headlineFont": "Fraunces Bold",
    "bodyFont": "Be Vietnam Pro SemiBold",
    "monoFont": "JetBrains Mono Regular",
    "safeZoneY": [250, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, đĩnh đạc, rành rọt, chuẩn mực biên tập viên đài truyền hình",
    "bgm": "Deep news briefing pulse / orchestral subtle rhythm / typewriter & camera shutter SFX",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Authentic newspaper clipping headline with red Breaking tag and bold yellow quote highlight"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "NewsCanvasVideo"
  },
  "prohibited": [
    "Thiếu logo nguồn hoặc ngày tháng xuất bản bài báo",
    "Màu nền và chữ bị chìm khó đọc lướt trên điện thoại",
    "Highlight trích dẫn che mất chữ gốc của bài báo"
  ]
}

```

---

## File: `styles/finance-data-pro/style.json` <a id="file-styles-finance-data-pro-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "finance-data-pro",
  "version": "2.0.0",
  "name": "Finance Data Pro",
  "purpose": "Phong cách tài chính & dữ liệu đầu tư chuyên sâu: Tích hợp Bar Chart Race chuẩn HODL.VN, nến TradingView và báo cáo vĩ mô",
  "bestFor": [
    "So sánh lãi suất kép & Đua tài sản qua các năm (Chuẩn DNA HODL)",
    "Phân tích cổ phiếu, VN-Index & Kỹ thuật nến TradingView",
    "Báo cáo vĩ mô, tháp tài sản, lạm phát & tiền tệ",
    "Crypto, vàng, bất động sản & bảng xếp hạng Leaderboard"
  ],
  "notIdealFor": ["Vlog đời sống", "Kể chuyện thiếu nhi"],
  "beatSeconds": {
    "min": 2.0,
    "max": 4.5,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Nghịch lý lợi nhuận / Thách thức kết quả cuộc đua tài sản",
    "tone": "Chuyên gia tài chính sắc bén, kịch tính, số liệu định lượng rõ ràng",
    "structure": "Hook số liệu/cuộc đua -> Bối cảnh thị trường -> Diễn biến biểu đồ/nến -> Đột phá lợi nhuận -> Leaderboard Outro"
  },
  "visual": {
    "palette": {
      "background": "#0B0E14",
      "surface": "#121824",
      "accentPrimary": "#D4AF37",
      "accentSecondary": "#38BDF8",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cardStyle": "Obsidian dark glass with gold/cyan neon border highlight and dynamic leaderboard ranks",
    "cornerRadius": 20
  },
  "imagePrompt": {
    "stylePrefix": "obsidian high-tech financial terminal, glowing gold and cyan line charts, cinematic trading screens",
    "negativePrompt": "low quality, blurry, bright pastel cartoon, messy desk"
  },
  "motion": {
    "spring": { "damping": 13, "stiffness": 155, "mass": 0.6 },
    "entrance": "slide-horizontal-expand + pop-scale",
    "targetWpm": 156
  },
  "typography": {
    "headlineFont": "Barlow Condensed Black",
    "bodyFont": "Be Vietnam Pro Bold",
    "monoFont": "JetBrains Mono Bold",
    "safeZoneY": [240, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, nam trầm, dứt khoát, hào hứng theo nhịp nhảy số",
    "bgm": "Deep synthwave / upbeat electronic sports tech beat",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Side-by-side asset race clash with gold crown, giant multiplier number (x5, x10) and TradingView spike"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "InvestmentRaceVideo"
  },
  "prohibited": [
    "Khung hình rỗng",
    "Cắt chữ bằng ellipsis",
    "Số liệu nhảy không theo quán tính mượt mà"
  ]
}

```

---

## File: `styles/geopolitical-map-pro/style.json` <a id="file-styles-geopolitical-map-pro-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "geopolitical-map-pro",
  "version": "2.0.0",
  "name": "Geopolitical Map Pro",
  "purpose": "Phong cách bản đồ địa chính trị, chiến lược quân sự, tuyến thương mại hàng hải và diễn biến lịch sử toàn cầu",
  "bestFor": [
    "Bản đồ địa lý - chính trị thế giới & khu vực (Geopolitical & Fullscreen Map)",
    "Xung đột quân sự, chiến lược phòng thủ, tuyến vận tải hàng hải & eo biển",
    "Tranh chấp tài nguyên, liên minh quốc tế (NATO, BRICS, ASEAN) & biến động biên giới",
    "Phim tài liệu lịch sử, diễn biến chiến dịch và phân tích quan hệ quốc tế"
  ],
  "notIdealFor": ["Bán hàng mỹ phẩm", "Vlog ẩm thực đời sống"],
  "beatSeconds": {
    "min": 2.5,
    "max": 5.0,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Một điểm nóng quân sự bất ngờ bùng nổ hoặc câu hỏi địa chiến lược then chốt",
    "tone": "Trầm tĩnh, uy quyền, khách quan, phân tích đanh thép của chuyên gia chiến lược",
    "structure": "Điểm nóng bản đồ -> Phân tích vị trí chiến lược -> Diễn biến lực lượng/tuyến đường -> Tác động địa chính trị -> Outro nhận định"
  },
  "visual": {
    "palette": {
      "background": "#080C14",
      "surface": "#101826",
      "accentPrimary": "#00F0FF",
      "accentSecondary": "#FF334B",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cardStyle": "Tactical HUD command card with glowing geo-coordinates, crosshair reticles, and territory fill overlays",
    "cornerRadius": 14
  },
  "imagePrompt": {
    "stylePrefix": "tactical military geopolitical map overlay, illuminated country borders, glowing cyan trade routes, satellite terrain texture, high-tech command center HUD",
    "negativePrompt": "low quality, cartoonish, messy hand-drawn, blurry satellite, flat boring 2d chart"
  },
  "motion": {
    "spring": { "damping": 16, "stiffness": 135, "mass": 0.8 },
    "entrance": "camera-zoom-coordinate + territory-glow-fill + animated-path-arrow",
    "targetWpm": 150
  },
  "typography": {
    "headlineFont": "Space Grotesk Bold",
    "bodyFont": "Be Vietnam Pro SemiBold",
    "monoFont": "JetBrains Mono Bold",
    "safeZoneY": [250, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, giọng đọc chính luận đĩnh đạc, trầm hùng, nhấn mạnh các mốc sự kiện",
    "bgm": "Cinematic tension drone / strategic documentary pulse / radar ping & tactical SFX",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Glowing 3D globe coordinate zoom with bright red conflict border and bold white geopolitical question"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "GeopoliticalVideo"
  },
  "prohibited": [
    "Bản đồ mờ không nhận diện rõ quốc gia",
    "Mũi tên chiến dịch giật lắc mất phương hướng",
    "Che khuất vùng tâm điểm chiến sự bằng phụ đề"
  ]
}

```

---

## File: `styles/kinetic-minimalist/style.json` <a id="file-styles-kinetic-minimalist-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "kinetic-minimalist",
  "version": "1.0.0",
  "name": "Kinetic Minimalist",
  "purpose": "Typography động tương phản mạnh mẽ, chữ lớn choán khung hình cho hook viral và thông điệp đanh thép",
  "bestFor": [
    "Hook video viral 15–30s",
    "Bóc mẽ định kiến / Myth vs Fact",
    "Tuyên ngôn thương hiệu & Thông điệp lãnh đạo",
    "Phóng sự doanh nghiệp nhịp nhanh"
  ],
  "notIdealFor": ["Hướng dẫn chi tiết nhiều số liệu", "Bảng biểu phức tạp"],
  "beatSeconds": {
    "min": 1.2,
    "max": 2.8,
    "resetEveryBeats": 2
  },
  "script": {
    "hookStyle": "Một câu tuyên bố gây tranh cãi hoặc bất ngờ cực độ",
    "tone": "Đanh thép, dứt khoát, quyền lực, không dài dòng",
    "structure": "Slam Hook -> Phá vỡ lầm tưởng -> Tuyên ngôn cốt lõi -> Call to action"
  },
  "visual": {
    "palette": {
      "background": "#000000",
      "surface": "#111111",
      "accentPrimary": "#FF0033",
      "accentSecondary": "#FBBF24",
      "positive": "#22C55E",
      "negative": "#FF0033"
    },
    "cardStyle": "Bold edge borderless monochrome with red punch tag",
    "cornerRadius": 8
  },
  "imagePrompt": {
    "stylePrefix": "high contrast black and white cinematic photography, dramatic shadows, sharp brutalist typography",
    "negativePrompt": "soft pastel, cute cartoon, colorful gradients"
  },
  "motion": {
    "spring": { "damping": 10, "stiffness": 220, "mass": 0.4 },
    "entrance": "slam-zoom-in",
    "targetWpm": 168
  },
  "typography": {
    "headlineFont": "Anton Regular",
    "bodyFont": "Barlow Condensed Bold",
    "safeZoneY": [220, 1560]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, dứt khoát, nhịp điệu nhanh, giọng đọc sắc",
    "bgm": "Heavy industrial pulse / punchy cinematic percussion",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Giant bold red and white word slam with dramatic black background"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "VinFastKineticVideo"
  },
  "prohibited": [
    "Khung hình rỗng",
    "Các câu văn quá 6 chữ trên 1 dòng",
    "Chuyển cảnh chậm chạp êm dịu"
  ]
}

```

---

## File: `styles/medical-biometrics-pro/style.json` <a id="file-styles-medical-biometrics-pro-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "medical-biometrics-pro",
  "version": "2.0.0",
  "name": "Medical Biometrics & Clinical Editorial (Hybrid 3D WebGL + 2.5D Spatial HUD)",
  "purpose": "Phong cách y sinh học & phóng sự y khoa công nghệ cao tối tân: Kiến trúc Hybrid 3D WebGL (ThreeCanvas + R3F + Bioluminescence Bloom) cho vật thể giải phẫu trung tâm kết hợp 2.5D Spatial Glass HUD cho thẻ số liệu, nhịp đập ECG tuần hoàn, camera thở Parallax và sound design đa tầng",
  "bestFor": [
    "Giải thích bệnh học, ung thư, tim mạch, y tế cộng đồng",
    "Phóng sự tiến bộ công nghệ y khoa (Nội soi ESD, Robot phẫu thuật Da Vinci)",
    "Báo cáo thống kê dịch tễ (Globocan, WHO, Bộ Y Tế)",
    "Video cảnh báo sức khỏe và kêu gọi tầm soát định kỳ",
    "Mô phỏng cơ chế thuốc, sinh học phân tử và can thiệp vi phẫu"
  ],
  "notIdealFor": [
    "Video hài hước nhí nhảnh",
    "Vlog du lịch ẩm thực đời thường"
  ],
  "beatSeconds": {
    "min": 8.0,
    "max": 15.0,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Số liệu dịch tễ giật mình + Mô hình giải phẫu 3D WebGL phát quang Bioluminescence",
    "tone": "Chuyên môn, sâu sắc, ấm áp, cảnh tỉnh và truyền hy vọng",
    "structure": "Hook Báo động đỏ -> Nguyên nhân & Trẻ hóa -> Bẫy triệu chứng -> Giải pháp Vi phẫu -> Tỷ lệ sống 90% -> Outro Bảo vệ gia đình"
  },
  "visual": {
    "architecture": "Hybrid 3D WebGL + 2.5D Spatial Glass HUD",
    "threeDStage": {
      "renderer": "@remotion/three (ThreeCanvas)",
      "fiber": "@react-three/fiber",
      "drei": "@react-three/drei (Float, Sparkles, MeshDistortMaterial, PerspectiveCamera)",
      "postprocessing": "@react-three/postprocessing (EffectComposer + Bloom)",
      "rule": "Bắt buộc dùng 3D WebGL cho mô hình giải phẫu và thao tác vi phẫu trung tâm. CẤM vẽ minh họa chính bằng SVG phẳng 2D."
    },
    "hudCardStyle": {
      "component": "SpatialHUDCard",
      "perspective": "1200px",
      "transformStyle": "preserve-3d",
      "entryRotation": ["rotateX(16deg)", "rotateY(±12deg)", "translateZ(-80px)"],
      "floatingPhysics": "Math.sin(frame * 0.08) * 5px",
      "material": "Multi-layer Glassmorphism (backdrop-filter: blur(16px))",
      "accents": "Corner brackets [ ], Neon glow shadow, Animated laser sweep line"
    },
    "palette": {
      "background": "#060A14",
      "surface": "rgba(15, 23, 42, 0.82)",
      "accentPrimary": "#38BDF8",
      "accentSecondary": "#F59E0B",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cornerRadius": 24
  },
  "motion": {
    "spring": {
      "damping": 16,
      "stiffness": 120,
      "mass": 0.8
    },
    "cameraBreathing": true,
    "continuousECG": true,
    "wordPunching": true
  },
  "typography": {
    "headlineFont": "Montserrat / Inter 950",
    "bodyFont": "Inter 600",
    "safeZoneY": [160, 1550]
  },
  "audio": {
    "voiceGender": "male",
    "voiceId": "vi-VN-NamMinhNeural / HaiDang",
    "bgm": "Ambient Tech Pulse (-18dB)",
    "sfxCues": ["whoosh-cinematic", "impact-bass", "whoosh-short", "ping", "chime"],
    "targetLufs": -12.5
  }
}

```

---

## File: `styles/multi-asset-trading/style.json` <a id="file-styles-multi-asset-trading-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "multi-asset-trading",
  "version": "2.0.0",
  "name": "Multi-Asset Trading & Candlestick Replay",
  "purpose": "Phong cách giao dịch tài chính chuyên sâu: Tái hiện nến Nhật theo tick, vùng thanh khoản Smart Money, dải ticker ribbon và sổ cái kinh tế",
  "bestFor": [
    "Replay nến Nhật đa khung thời gian (Candlestick Replay cho Forex, Chứng khoán, Crypto)",
    "Phân tích cấu trúc thị trường: Order Block, Fair Value Gap (FVG), Liquidity Hunt & Volume Profile",
    "Digital Asset Forensics: Phân tích dòng tiền On-chain, Funding Rate, Liquidation Cascades",
    "Sổ cái tài chính (Financial Ledger Newspaper) & Báo cáo thu nhập doanh nghiệp (Earnings & Valuation)"
  ],
  "notIdealFor": ["Clip giải trí đời sống", "Vlog du lịch ẩm thực"],
  "beatSeconds": {
    "min": 2.0,
    "max": 4.2,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Một cú breakout giả, cú sập thanh khoản bất ngờ hoặc số liệu P/E gây sốc",
    "tone": "Sắc bén, nhạy bén thị trường, phân tích xác suất và hành vi dòng tiền lớn",
    "structure": "Cú quét thanh khoản -> Mô hình biểu đồ/nến -> Bóc tách dòng tiền cá mập -> Chiến lược Risk/Reward -> Outro quản trị vốn"
  },
  "visual": {
    "palette": {
      "background": "#070B19",
      "surface": "#0F172A",
      "accentPrimary": "#00E599",
      "accentSecondary": "#FF4D6A",
      "positive": "#00E599",
      "negative": "#FF4D6A"
    },
    "cardStyle": "High-tech exchange terminal card with live order book, tick-by-tick candlestick canvas, and running ticker ribbons",
    "cornerRadius": 16
  },
  "imagePrompt": {
    "stylePrefix": "modern trading terminal display, crisp candlestick replay charts, glowing cyan and emerald order blocks, dark cobalt background, sleek fintech data interface",
    "negativePrompt": "low quality, blurry, colorful messy cartoon, 3d toy coins, flat boring spreadsheet"
  },
  "motion": {
    "spring": { "damping": 14, "stiffness": 150, "mass": 0.65 },
    "entrance": "candlestick-grow + ticker-sweep + metric-counter-roll",
    "targetWpm": 156
  },
  "typography": {
    "headlineFont": "Barlow SemiCondensed Bold",
    "bodyFont": "Be Vietnam Pro Bold",
    "monoFont": "JetBrains Mono Bold",
    "safeZoneY": [240, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, đĩnh đạc, nhanh nhạy, dứt khoát theo từng cú nảy giá",
    "bgm": "Dark minimal techno / synthwave pulse / terminal typing & bell SFX",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Explosive candlestick breakout candle with liquidity swept line and bold profit multiplier badge"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "TradingReplayVideo"
  },
  "prohibited": [
    "Nến vẽ lệch tỷ lệ wick và body",
    "Dải ticker ribbon che lấp biểu đồ chính",
    "Số liệu tài chính thiếu đơn vị đo lường ($/VND/%)"
  ]
}

```

---

## File: `styles/registry.json` <a id="file-styles-registry-json"></a>

```json
{
  "$schema": "../schemas/style.schema.json",
  "version": "2.1.0",
  "updatedAt": "2026-10-24T04:50:43.175Z",
  "styles": [
    {
      "id": "medical-biometrics-pro",
      "name": "Medical Biometrics & Clinical Editorial",
      "category": "medical",
      "purpose": "Phong cách y sinh học & phóng sự y khoa công nghệ cao: Nền Deep Slate y tế, hình vẽ vector giải phẫu tự chạy, mô phỏng vi phẫu nội soi, nhịp đập ECG tuần hoàn, camera thở Parallax, số chạy động và lớp âm thanh sound design đa tầng",
      "bestFor": [
        "Giải thích bệnh học, ung thư, tim mạch, y tế cộng đồng",
        "Phóng sự tiến bộ công nghệ y khoa (Nội soi ESD, Robot phẫu thuật Da Vinci)",
        "Báo cáo thống kê dịch tễ (Globocan, WHO, Bộ Y Tế)",
        "Video cảnh báo sức khỏe và kêu gọi tầm soát định kỳ"
      ],
      "tags": [
        "medical",
        "biometrics",
        "clinical",
        "anatomy",
        "endoscopy",
        "ecg-telemetry",
        "counters",
        "sound-design"
      ],
      "path": "styles/medical-biometrics-pro",
      "targetWpm": 150,
      "avgCutIntervalSec": 9.3,
      "sourceDna": "UNG-THU-DAI-TRUC-TRANG-TOP-3"
    },
    {
      "id": "whiteboard-hand-draw",
      "name": "Whiteboard & Hand Draw",
      "category": "whiteboard",
      "purpose": "Phong cách vẽ tay bảng trắng, nét mực tự vẽ write-on, bàn tay cầm bút bám nét SVG và highlighter dạ quang bám sát lời kể",
      "bestFor": [
        "Vẽ tay bảng trắng (Whiteboard Animation & Sketch)",
        "Minh họa AI kể chuyện trên nền giấy trắng và giấy nhàu (Paper Clean & Textured)",
        "Giải thích ẩn dụ trừu tượng, tư duy hình ảnh và triết lý cuộc sống",
        "So sánh trực quan hai vật thể/nhân vật với nét vẽ viết dần (Write-on stroke)"
      ],
      "tags": [
        "whiteboard",
        "hand-draw",
        "paper-sketch",
        "write-on",
        "illustrated",
        "highlighter",
        "draw-motion"
      ],
      "path": "styles/whiteboard-hand-draw",
      "targetWpm": 145,
      "avgCutIntervalSec": 3.2,
      "sourceDna": "TRAM-AI-WHITEBOARD-SUITE"
    },
    {
      "id": "geopolitical-map-pro",
      "name": "Geopolitical Map Pro",
      "category": "map",
      "purpose": "Phong cách bản đồ địa chính trị, chiến lược quân sự, tuyến thương mại hàng hải và diễn biến lịch sử toàn cầu",
      "bestFor": [
        "Bản đồ địa lý - chính trị thế giới & khu vực (Geopolitical & Fullscreen Map)",
        "Xung đột quân sự, chiến lược phòng thủ, tuyến vận tải hàng hải & eo biển",
        "Tranh chấp tài nguyên, liên minh quốc tế (NATO, BRICS, ASEAN) & biến động biên giới",
        "Phim tài liệu lịch sử, diễn biến chiến dịch và phân tích quan hệ quốc tế"
      ],
      "tags": [
        "geopolitics",
        "map",
        "military",
        "strategy",
        "routes",
        "territory",
        "tactical-hud"
      ],
      "path": "styles/geopolitical-map-pro",
      "targetWpm": 150,
      "avgCutIntervalSec": 3.6,
      "sourceDna": "TRAM-AI-GEOPOLITICAL-MAP"
    },
    {
      "id": "multi-asset-trading",
      "name": "Multi-Asset Trading & Candlestick Replay",
      "category": "finance",
      "purpose": "Phong cách giao dịch tài chính chuyên sâu: Tái hiện nến Nhật theo tick, vùng thanh khoản Smart Money, dải ticker ribbon và sổ cái kinh tế",
      "bestFor": [
        "Replay nến Nhật đa khung thời gian (Candlestick Replay cho Forex, Chứng khoán, Crypto)",
        "Phân tích cấu trúc thị trường: Order Block, Fair Value Gap (FVG), Liquidity Hunt & Volume Profile",
        "Digital Asset Forensics: Phân tích dòng tiền On-chain, Funding Rate, Liquidation Cascades",
        "Sổ cái tài chính (Financial Ledger Newspaper) & Báo cáo thu nhập doanh nghiệp (Earnings & Valuation)"
      ],
      "tags": [
        "trading",
        "forex",
        "crypto",
        "candlestick",
        "order-block",
        "ticker",
        "liquidity",
        "stocks"
      ],
      "path": "styles/multi-asset-trading",
      "targetWpm": 156,
      "avgCutIntervalSec": 2.8,
      "sourceDna": "TRAM-AI-FINANCIAL-TRADING"
    },
    {
      "id": "editorial-news-canvas",
      "name": "Editorial News Canvas & Press Briefing",
      "category": "editorial",
      "purpose": "Phong cách báo chí chính luận & tin tức biên tập: Chèn bài báo thực tế với highlight trích dẫn, bảng điểm thể thao, thông số xe cộ và bảng học thuật",
      "bestFor": [
        "Thời sự chính luận, dân sinh, giao thông & biến động xã hội (Modern News Canvas & Crimson Timeline)",
        "Chèn ảnh chụp bài báo thực tế (Press Clipping Mockup với vệt bút dạ quang trên VnExpress, Tuổi Trẻ, Bloomberg)",
        "Bản tin thể thao: Tỉ số trận đấu (Scoreboard), thống kê cầu thủ & điểm nhấn highlight",
        "Tin thị trường xe cộ: Spec cards so sánh mã lực, tăng tốc, dung lượng pin & đồng hồ đo tốc độ (Gauges)",
        "Giáo dục & Học thuật: Bảng bài giảng step-by-step (Math Lesson Dark/Light), tuyển sinh & deadline"
      ],
      "tags": [
        "editorial",
        "news",
        "press-clipping",
        "newspaper",
        "sports",
        "auto",
        "education",
        "scoreboard"
      ],
      "path": "styles/editorial-news-canvas",
      "targetWpm": 152,
      "avgCutIntervalSec": 3.2,
      "sourceDna": "TRAM-AI-EDITORIAL-NEWS"
    },
    {
      "id": "showcase-affiliate-luxury",
      "name": "Showcase Affiliate & Luxury Editorial",
      "category": "showcase",
      "purpose": "Phong cách trưng bày sản phẩm thương mại điện tử, danh mục bất động sản kiến trúc, mỹ phẩm cao cấp và cẩm nang du lịch",
      "bestFor": [
        "Bán hàng Affiliate & TikTok Shop: Lộ diện sản phẩm (Mẫu 01-08), đường line chỉ tính năng xung quanh packshot & CTA chốt đơn",
        "Bất động sản & Kiến trúc: Hồ sơ dự án (Real Estate Atlas, Residential Atelier), khung ảnh vòm và bố cục cắt lớp",
        "Mỹ phẩm & Làm đẹp: Phong cách Beauty Luxury Noir & Editorial Light (espresso-plum, champagne gold, silk curves, bảng thành phần an toàn)",
        "Du lịch & Khám phá: Bưu thiếp Postcard du lịch với tem địa danh, lộ trình route strip và checklist chi phí"
      ],
      "tags": [
        "affiliate",
        "ecommerce",
        "luxury",
        "real-estate",
        "beauty",
        "travel",
        "packshot",
        "architecture"
      ],
      "path": "styles/showcase-affiliate-luxury",
      "targetWpm": 148,
      "avgCutIntervalSec": 3.4,
      "sourceDna": "TRAM-AI-LUXURY-SHOWCASE"
    },
    {
      "id": "finance-data-pro",
      "name": "Finance Data Pro",
      "category": "finance",
      "purpose": "Phong cách tài chính & dữ liệu đầu tư chuyên sâu: Tích hợp Bar Chart Race chuẩn HODL.VN, nến TradingView và báo cáo vĩ mô",
      "bestFor": [
        "So sánh lãi suất kép & Đua tài sản qua các năm (Chuẩn DNA HODL)",
        "Phân tích cổ phiếu, VN-Index & Kỹ thuật nến TradingView",
        "Báo cáo vĩ mô, tháp tài sản, lạm phát & tiền tệ",
        "Crypto, vàng, bất động sản & bảng xếp hạng Leaderboard"
      ],
      "tags": [
        "finance",
        "hodl-dna",
        "race-chart",
        "tradingview",
        "macro",
        "leaderboard",
        "stocks"
      ],
      "path": "styles/finance-data-pro",
      "targetWpm": 156,
      "avgCutIntervalSec": 3,
      "sourceDna": "HODL-VN-INVESTMENT-RACE"
    },
    {
      "id": "clean-explainer",
      "name": "Clean Explainer 2D",
      "category": "tech",
      "purpose": "Giải thích kiến thức, cơ chế và sản phẩm qua hệ thống 6 cảnh chuẩn Cường IT và 6 bố cục thẻ Archetypes",
      "bestFor": [
        "Giải thích công nghệ, phần mềm, cloud, AI tools",
        "Bảo hiểm sức khỏe (BHSK), BHYT & An sinh gia đình",
        "Kế hoạch tài chính, quản lý rủi ro & hợp đồng quyền lợi",
        "Quy trình từng bước (Step-by-step How-it-works)"
      ],
      "tags": [
        "explainer",
        "cards",
        "cuongit",
        "tech",
        "insurance",
        "archetypes",
        "workflow"
      ],
      "path": "styles/clean-explainer",
      "targetWpm": 152,
      "avgCutIntervalSec": 3.4
    },
    {
      "id": "kinetic-minimalist",
      "name": "Kinetic Minimalist",
      "category": "kinetic",
      "purpose": "Typography động tương phản mạnh mẽ, chữ lớn choán khung hình cho hook viral và thông điệp đanh thép",
      "bestFor": [
        "Hook video viral 15–30s",
        "Bóc mẽ định kiến / Myth vs Fact",
        "Tuyên ngôn thương hiệu & Thông điệp lãnh đạo",
        "Phóng sự doanh nghiệp nhịp nhanh"
      ],
      "tags": [
        "kinetic",
        "minimalist",
        "bold",
        "monochrome",
        "viral",
        "punchy"
      ],
      "path": "styles/kinetic-minimalist",
      "targetWpm": 168,
      "avgCutIntervalSec": 1.8
    },
    {
      "id": "ai-tech-briefing",
      "name": "AI Tech News Briefing",
      "category": "tech",
      "purpose": "Bản tin công nghệ & tin tức AI cao cấp: Nền Dark Slate Cyan, bố cục thẻ Hero Metric, so sánh đối lập Side-by-Side, quote trích dẫn phát ngôn và phụ đề speech-synced highlight từ",
      "bestFor": [
        "Bản tin thời sự công nghệ, AI & Phần mềm (AI Hot News)",
        "Tổng hợp top 5 tin nóng trong tuần / trong ngày",
        "Giải thích mô hình AI mới (MoE, LLM, Robotics, Big Tech)",
        "So sánh tranh luận chính sách, vụ kiện công nghệ và dữ liệu tài chính"
      ],
      "tags": [
        "tech-news",
        "ai-news",
        "ai-briefing",
        "hero-metric",
        "comparison-card",
        "slate-cyan",
        "social-shorts"
      ],
      "path": "styles/ai-tech-briefing",
      "targetWpm": 150,
      "avgCutIntervalSec": 18.4,
      "sourceDna": "ai-tech-briefing",
      "previewImage": "styles/ai-tech-briefing/contact_sheet.jpg"
    }
  ]
}

```

---

## File: `styles/showcase-affiliate-luxury/style.json` <a id="file-styles-showcase-affiliate-luxury-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "showcase-affiliate-luxury",
  "version": "2.0.0",
  "name": "Showcase Affiliate & Luxury Editorial",
  "purpose": "Phong cách trưng bày sản phẩm thương mại điện tử, danh mục bất động sản kiến trúc, mỹ phẩm cao cấp và cẩm nang du lịch",
  "bestFor": [
    "Bán hàng Affiliate & TikTok Shop: Lộ diện sản phẩm (Mẫu 01-08), đường line chỉ tính năng xung quanh packshot & CTA chốt đơn",
    "Bất động sản & Kiến trúc: Hồ sơ dự án (Real Estate Atlas, Residential Atelier), khung ảnh vòm và bố cục cắt lớp",
    "Mỹ phẩm & Làm đẹp: Phong cách Beauty Luxury Noir & Editorial Light (espresso-plum, champagne gold, silk curves, bảng thành phần an toàn)",
    "Du lịch & Khám phá: Bưu thiếp Postcard du lịch với tem địa danh, lộ trình route strip và checklist chi phí"
  ],
  "notIdealFor": ["Bản tin chiến sự khẩn cấp", "Kể chuyện hoạt hình thiếu nhi"],
  "beatSeconds": {
    "min": 2.2,
    "max": 4.5,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Khoảnh khắc mở hộp/lộ diện sản phẩm hoặc hình ảnh căn biệt thự tuyệt mỹ gây mê hoặc",
    "tone": "Sang trọng, cuốn hút, tinh tế, tập trung vào trải nghiệm xúc giác và giá trị độc bản",
    "structure": "Hook thị giác sản phẩm/không gian -> Bóc tách 3 điểm đắt giá nhất -> Trải nghiệm thực tế -> Báo giá/Ưu đãi giới hạn -> Outro CTA"
  },
  "visual": {
    "palette": {
      "background": "#0F0E11",
      "surface": "#1A1820",
      "accentPrimary": "#E2B774",
      "accentSecondary": "#F472B6",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cardStyle": "Frosted luxury glass card with champagne gold borders, arched window frames, and animated leader callout lines",
    "cornerRadius": 20
  },
  "imagePrompt": {
    "stylePrefix": "luxury editorial studio lighting, elegant product packshot centerpiece, soft silk draping, champagne gold and espresso plum tones, magazine quality advertisement",
    "negativePrompt": "low quality, cheap plastic, harsh white flash, blurry background, messy text clutter"
  },
  "motion": {
    "spring": { "damping": 18, "stiffness": 115, "mass": 0.85 },
    "entrance": "scale-unveil + feature-line-draw + champagne-glow",
    "targetWpm": 148
  },
  "typography": {
    "headlineFont": "Cormorant Garamond Bold",
    "bodyFont": "Plus Jakarta Sans SemiBold",
    "monoFont": "JetBrains Mono Regular",
    "safeZoneY": [250, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, ấm áp, lịch lãm, truyền cảm hứng sở hữu và nâng tầm phong cách sống",
    "bgm": "Deep lounge ambient / elegant piano silk chords / subtle glass chime SFX",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Glossy arched product packshot with gold price ribbon and glowing feature callout lines"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "ShowcaseVideo"
  },
  "prohibited": [
    "Đường line chỉ tính năng cắt ngang qua logo thương hiệu",
    "Bảng giá thiếu đơn vị tiền tệ rõ ràng",
    "Khung hình sản phẩm bị cắt cụt đầu đuôi"
  ]
}

```

---

## File: `styles/whiteboard-hand-draw/style.json` <a id="file-styles-whiteboard-hand-draw-style-json"></a>

```json
{
  "$schema": "../../schemas/style.schema.json",
  "id": "whiteboard-hand-draw",
  "version": "2.0.0",
  "name": "Whiteboard & Hand Draw",
  "purpose": "Phong cách vẽ tay bảng trắng, minh họa nét mực tự vẽ trên giấy và bút dạ quang bám sát nhịp lời kể",
  "bestFor": [
    "Vẽ tay bảng trắng (Whiteboard Animation & Sketch)",
    "Minh họa AI kể chuyện trên nền giấy trắng và giấy nhàu (Paper Clean & Textured)",
    "Giải thích ẩn dụ trừu tượng, tư duy hình ảnh và triết lý cuộc sống",
    "So sánh trực quan hai vật thể/nhân vật với nét vẽ viết dần (Write-on stroke)"
  ],
  "notIdealFor": ["Tin tức thời sự khẩn cấp", "Bản tin thị trường nến tài chính"],
  "beatSeconds": {
    "min": 2.2,
    "max": 4.5,
    "resetEveryBeats": 3
  },
  "script": {
    "hookStyle": "Một nét vẽ phác họa bất ngờ mở ra câu hỏi ẩn dụ hoặc vấn đề cuộc sống",
    "tone": "Ấm áp, gần gũi, truyền cảm hứng, nhịp kể chuyện thủ công thong thả",
    "structure": "Phác họa vấn đề -> Từng nét giải thích cơ chế -> Minh họa cao trào -> Đúc kết bài học & Outro"
  },
  "visual": {
    "palette": {
      "background": "#FDFBF7",
      "surface": "#FFFFFF",
      "accentPrimary": "#1E293B",
      "accentSecondary": "#F59E0B",
      "positive": "#10B981",
      "negative": "#EF4444"
    },
    "cardStyle": "Warm paper card with sketched charcoal borders, torn paper edges, and fluorescent highlighter bands",
    "cornerRadius": 16
  },
  "imagePrompt": {
    "stylePrefix": "hand-drawn ink sketch illustration on textured white paper, minimalist charcoal outline, warm watercolor tint, crisp vector lines",
    "negativePrompt": "low quality, 3d glossy render, realistic photo, cluttered neon, messy digital gradients"
  },
  "motion": {
    "spring": { "damping": 18, "stiffness": 120, "mass": 0.85 },
    "entrance": "stroke-dashoffset-draw + hand-follow + subtle-paper-pop",
    "targetWpm": 145
  },
  "typography": {
    "headlineFont": "Patrick Hand Regular",
    "bodyFont": "Caveat Bold",
    "monoFont": "JetBrains Mono Regular",
    "safeZoneY": [250, 1540]
  },
  "audio": {
    "voiceGender": "male",
    "tone": "Hải Đăng studio, ấm áp, thong thả, nhấn nhá từng câu chữ theo nét vẽ",
    "bgm": "Acoustic guitar / warm subtle lo-fi / chalk & pencil SFX cues",
    "targetLufs": -12.5
  },
  "thumbnail": {
    "style": "Hand holding pen finishing an eye-catching sketch with bright yellow highlighter title"
  },
  "renderer": {
    "primary": "remotion",
    "composition": "WhiteboardVideo"
  },
  "prohibited": [
    "Nét vẽ xuất hiện cùng lúc không có hiệu ứng vẽ dần",
    "Bóng đổ 3D quá gắt làm mất chất thủ công mộc mạc",
    "Chữ nhảy giật làm lệch toạ độ bút vẽ"
  ]
}

```

---

# 8. Mã nguồn Remotion CanonicalVideo & Shared Core (.ts / .tsx)

## File: `engines/remotion/src/CanonicalVideo/components/MotionComponents.tsx` <a id="file-engines-remotion-src-canonicalvideo-components-motioncomponents-tsx"></a>

```tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ opacity, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</div>;
};

export const Flow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const translateY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: "clamp" });
  return <div style={{ transform: `translateY(${translateY}px)`, opacity: frame > 0 ? 1 : 0 }}>{children}</div>;
};

export const ProgressiveBuild: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ fps, frame, config: { damping: 12 } });
  return <div style={{ transform: `scale(${scale})` }}>{children}</div>;
};

export const Drain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Simulating drain by scaling down slightly and reducing opacity
  const scale = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 12 }, reverse: true });
  return <div style={{ transform: `scale(${frame < 30 ? 1 : scale})` }}>{children}</div>;
};

export const Interrupt: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  // Simulating an interrupt by a sharp shake
  const shake = interpolate(frame, [0, 5, 10, 15, 20], [0, -20, 20, -10, 0], { extrapolateRight: "clamp" });
  return <div style={{ transform: `translateX(${shake}px)` }}>{children}</div>;
};

```

---

## File: `engines/remotion/src/CanonicalVideo/components/SceneWrapper.tsx` <a id="file-engines-remotion-src-canonicalvideo-components-scenewrapper-tsx"></a>

```tsx
import React, { useMemo } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { TextLayout } from "./TextLayout";
import { Flow, Interrupt, Drain, ProgressiveBuild, FadeIn } from "./MotionComponents";
import {
  Stage3DWrapper,
  BioShield3D,
  ColonHologram3D,
  EndoscopySimulation3D,
  Candlestick3DChart,
  BarRace3DTowers,
  WealthVaultShield3D,
  SpeechSyncedSubtitles,
  UserBrandOutro,
} from "../../shared";
import type { SceneSpec } from "../../../../../core/schemas/types";

export interface SceneWrapperProps {
  scene: SceneSpec;
  isOutro?: boolean;
}

export const SceneWrapper: React.FC<SceneWrapperProps> = ({ scene, isOutro = false }) => {
  const { fps } = useVideoConfig();
  const motionTypes = scene.motionIntent?.map((intent) => intent.type) || [];

  // Generate speech-synced subtitle words from scene narration
  const words = useMemo(() => {
    if (!scene.narration) return [];
    const tokens = scene.narration.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    const durationMs = scene.durationMs || 3000;
    const wordDuration = Math.max(160, Math.floor(durationMs / tokens.length));

    return tokens.map((token, idx) => {
      const startMs = idx * wordDuration;
      return {
        word: token,
        startMs,
        durationMs: wordDuration,
        endMs: startMs + wordDuration,
      };
    });
  }, [scene.narration, scene.durationMs]);

  // Determine appropriate procedural 3D centerpiece based on semantic intent
  const render3DCenterpiece = () => {
    const textLower = (
      scene.narration +
      " " +
      scene.purpose +
      " " +
      (scene.visualIntent?.description || "")
    ).toLowerCase();

    if (
      textLower.includes("colon") ||
      textLower.includes("polyp") ||
      textLower.includes("đại tràng") ||
      textLower.includes("ung thư")
    ) {
      return (
        <Stage3DWrapper cameraMode="orbit" sparklesColor="#ef4444" enableBloom={true}>
          <ColonHologram3D progress={1} highlightPolyp={true} />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("nội soi") ||
      textLower.includes("laser") ||
      textLower.includes("phẫu thuật")
    ) {
      return (
        <Stage3DWrapper cameraMode="dolly-in" sparklesColor="#00f0ff" enableBloom={true}>
          <EndoscopySimulation3D cutProgress={0.4} />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("nến") ||
      textLower.includes("chứng khoán") ||
      textLower.includes("candlestick") ||
      textLower.includes("thị trường")
    ) {
      return (
        <Stage3DWrapper cameraMode="orbit" sparklesColor="#22c55e" enableBloom={true}>
          <Candlestick3DChart />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("đua") ||
      textLower.includes("tăng trưởng") ||
      textLower.includes("bar race") ||
      textLower.includes("cột")
    ) {
      return (
        <Stage3DWrapper cameraMode="fly-through" sparklesColor="#fbbf24" enableBloom={true}>
          <BarRace3DTowers />
        </Stage3DWrapper>
      );
    }
    if (
      textLower.includes("tài sản") ||
      textLower.includes("vốn") ||
      textLower.includes("kim cương") ||
      textLower.includes("wealth") ||
      textLower.includes("tiền")
    ) {
      return (
        <Stage3DWrapper cameraMode="breathing" sparklesColor="#fbbf24" enableBloom={true}>
          <WealthVaultShield3D />
        </Stage3DWrapper>
      );
    }

    // Default: versatile bio-protection holographic shield
    return (
      <Stage3DWrapper cameraMode="breathing" sparklesColor="#38bdf8" enableBloom={true}>
        <BioShield3D progress={1} accentColor="#38bdf8" />
      </Stage3DWrapper>
    );
  };

  // If this scene is designated as the brand Outro
  if (isOutro || scene.purpose === "outro") {
    return (
      <AbsoluteFill style={{ backgroundColor: "#060a14" }}>
        {/* Subtle background 3D stage */}
        <Stage3DWrapper cameraMode="breathing" sparklesColor="#fbbf24" enableBloom={true}>
          <WealthVaultShield3D progress={0.9} accentColor="#fbbf24" />
        </Stage3DWrapper>

        {/* Foreground User Brand Outro Card */}
        <UserBrandOutro />

        {/* Speech-Synced Subtitles */}
        {words.length > 0 && <SpeechSyncedSubtitles words={words} fps={fps} positionY={1530} />}
      </AbsoluteFill>
    );
  }

  // Foreground HUD content with optional motion wrappers
  let foregroundHUD = (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {scene.text && <TextLayout texts={scene.text} layout={scene.visualIntent?.layout} />}
    </div>
  );

  if (motionTypes.includes("fade-in")) {
    foregroundHUD = <FadeIn>{foregroundHUD}</FadeIn>;
  }
  if (motionTypes.includes("flow")) {
    foregroundHUD = <Flow>{foregroundHUD}</Flow>;
  }
  if (motionTypes.includes("progressive-build")) {
    foregroundHUD = <ProgressiveBuild>{foregroundHUD}</ProgressiveBuild>;
  }
  if (motionTypes.includes("drain")) {
    foregroundHUD = <Drain>{foregroundHUD}</Drain>;
  }
  if (motionTypes.includes("interrupt")) {
    foregroundHUD = <Interrupt>{foregroundHUD}</Interrupt>;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060a14",
        backgroundImage:
          "radial-gradient(circle at 50% 25%, rgba(14, 165, 233, 0.12) 0%, rgba(6, 10, 20, 0.98) 75%)",
      }}
    >
      {/* Layer 1: Background & Procedural 3D Stage */}
      {render3DCenterpiece()}

      {/* Layer 2: Foreground 2.5D Spatial HUD Overlay */}
      {foregroundHUD}

      {/* Layer 3: Speech-Synced Subtitles at Safe Zone Y: 1530 */}
      {words.length > 0 && <SpeechSyncedSubtitles words={words} fps={fps} positionY={1530} />}
    </AbsoluteFill>
  );
};

```

---

## File: `engines/remotion/src/CanonicalVideo/components/TextLayout.tsx` <a id="file-engines-remotion-src-canonicalvideo-components-textlayout-tsx"></a>

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SpatialHUDCard } from "../../shared/SpatialHUDCard";
import type { TextContent } from "../../../../../core/schemas/types";

export interface TextLayoutProps {
  texts: Array<string | TextContent>;
  layout?: string;
  accentColor?: string;
}

export const TextLayout: React.FC<TextLayoutProps> = ({
  texts = [],
  layout,
  accentColor = "#38bdf8",
}) => {
  if (!texts || texts.length === 0) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      accentColor={accentColor}
      style={{
        maxWidth: 880,
        padding: "36px 36px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: layout === "split" ? 28 : 18,
          textAlign: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {texts.map((t, i) => {
          const content = typeof t === "string" ? t : t.content;
          if (!content) return null;

          const isTitle = typeof t === "object" && t.role === "title";
          const isSubtitle = typeof t === "object" && t.role === "subtitle";
          const isEmphasis = typeof t === "object" && t.emphasis;

          const fontSize = isTitle ? 64 : isSubtitle ? 40 : 32;
          const fontWeight = isTitle ? 900 : isEmphasis ? 800 : 600;
          const color = isTitle ? "#ffffff" : isEmphasis ? accentColor : "#e2e8f0";
          const letterSpacing = isTitle ? "-0.5px" : "normal";

          return (
            <div
              key={i}
              style={{
                fontSize,
                fontWeight,
                color,
                lineHeight: 1.35,
                maxWidth: 820,
                letterSpacing,
                textTransform: isTitle ? "uppercase" : "none",
                textShadow: isTitle ? `0 0 20px ${accentColor}44` : "none",
              }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </SpatialHUDCard>
  );
};

```

---

## File: `engines/remotion/src/CanonicalVideo/index.tsx` <a id="file-engines-remotion-src-canonicalvideo-index-tsx"></a>

```tsx
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SceneWrapper } from "./components/SceneWrapper";
import { Stage3DWrapper, BioShield3D, SpatialHUDCard } from "../shared";
import type { CanonicalVideoSpec } from "../../../../core/schemas/types";

export const CanonicalVideo: React.FC<{ spec: CanonicalVideoSpec | null }> = ({ spec }) => {
  // If no spec is passed, render a live demo preview of the V4 Spatial 3D engine
  if (!spec || !spec.script || !spec.script.scenes || spec.script.scenes.length === 0) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "#060a14",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.15) 0%, rgba(6, 10, 20, 0.98) 80%)",
        }}
      >
        <Stage3DWrapper cameraMode="breathing" sparklesColor="#38bdf8" enableBloom={true}>
          <BioShield3D progress={1} accentColor="#38bdf8" />
        </Stage3DWrapper>

        <div
          style={{
            position: "absolute",
            top: 300,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            padding: "0 40px",
            zIndex: 10,
          }}
        >
          <SpatialHUDCard
            frame={30}
            springVal={1}
            accentColor="#38bdf8"
            style={{ maxWidth: 880, padding: "36px 32px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#38bdf8", letterSpacing: 2 }}>
                CANONICAL VIDEO V4
              </div>
              <div style={{ fontSize: 60, fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
                SPATIAL 3D & HUD
              </div>
              <div style={{ fontSize: 26, color: "#94a3b8", lineHeight: 1.4 }}>
                Sẵn sàng tiếp nhận CanonicalVideoSpec từ Factory Core
              </div>
            </div>
          </SpatialHUDCard>
        </div>
      </AbsoluteFill>
    );
  }

  const scenes = spec.script.scenes;
  let nextFrame = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060a14",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.1) 0%, rgba(6, 10, 20, 1) 85%)",
      }}
    >
      {scenes.map((scene, idx) => {
        const fps = spec.format.fps || spec.format.fpsPreference || 30;
        const startFrame =
          scene.startFrame ??
          (scene.startMs == null ? nextFrame : Math.ceil((scene.startMs / 1000) * fps));
        const durationFrames =
          scene.durationFrames ?? Math.ceil((scene.durationMs / 1000) * fps);
        nextFrame = startFrame + durationFrames;

        const isLastScene = idx === scenes.length - 1;

        return (
          <Sequence
            key={scene.id || idx}
            from={startFrame}
            durationInFrames={durationFrames}
          >
            <SceneWrapper scene={scene} isOutro={isLastScene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

```

---

## File: `engines/remotion/src/shared/CardArchetypes.tsx` <a id="file-engines-remotion-src-shared-cardarchetypes-tsx"></a>

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SpatialHUDCard } from "./SpatialHUDCard";

// ============================================================================
// ARCHETYPE 1: HERO METRIC & FOOTNOTE
// ============================================================================
export interface HeroMetricCardProps {
  category?: string;
  number: string;
  unit?: string;
  description: string;
  footnote?: string;
  accentColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  staggerIndex?: number;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

export const HeroMetricCard: React.FC<HeroMetricCardProps> = ({
  category,
  number,
  unit = "",
  description,
  footnote,
  accentColor = "#fbbf24",
  backgroundColor,
  borderColor,
  staggerIndex = 0,
  enableScanline = true,
  enableBrackets = true,
}) => {
  if (!number && !description) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      staggerIndex={staggerIndex}
      accentColor={accentColor}
      background={backgroundColor}
      borderColor={borderColor}
      enableScanline={enableScanline}
      enableBrackets={enableBrackets}
      style={{ maxWidth: 920, padding: "32px 32px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        {category && (
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "6px 16px",
              borderRadius: 100,
              background: `${accentColor}25`,
              color: accentColor,
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            {category}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {number}
          </span>
          {unit && (
            <span style={{ fontSize: 36, fontWeight: 800, color: accentColor }}>
              {unit}
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: 28,
            color: "#e5e5e5",
            lineHeight: 1.4,
            margin: 0,
            fontWeight: 600,
          }}
        >
          {description}
        </p>

        {footnote && (
          <div
            style={{
              marginTop: 8,
              paddingTop: 14,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: 20,
              color: "#a3a3a3",
              lineHeight: 1.3,
            }}
          >
            * {footnote}
          </div>
        )}
      </div>
    </SpatialHUDCard>
  );
};

// ============================================================================
// ARCHETYPE 2: SIDE-BY-SIDE COMPARISON
// ============================================================================
export interface ComparisonCardProps {
  left: { title: string; badge: string; points: string[]; isNegative?: boolean };
  right: { title: string; badge: string; points: string[]; isPositive?: boolean };
  accentColor?: string;
  staggerIndex?: number;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  left,
  right,
  accentColor = "#38bdf8",
  staggerIndex = 0,
  enableScanline = true,
  enableBrackets = true,
}) => {
  if (!left && !right) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      staggerIndex={staggerIndex}
      accentColor={accentColor}
      enableScanline={enableScanline}
      enableBrackets={enableBrackets}
      style={{ maxWidth: 960, padding: "26px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: "100%",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            background: left.isNegative
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(30, 30, 30, 0.65)",
            border: `1.5px solid ${
              left.isNegative ? "rgba(239, 68, 68, 0.45)" : "rgba(255, 255, 255, 0.12)"
            }`,
            borderRadius: 20,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: left.isNegative ? "#f87171" : "#d4d4d4",
              background: left.isNegative
                ? "rgba(239, 68, 68, 0.25)"
                : "rgba(255, 255, 255, 0.12)",
              padding: "6px 14px",
              borderRadius: 8,
              alignSelf: "flex-start",
              textTransform: "uppercase",
            }}
          >
            {left.badge}
          </span>
          <h4 style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", margin: 0 }}>
            {left.title}
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: "#d4d4d4",
              fontSize: 22,
              lineHeight: 1.5,
            }}
          >
            {left.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div
          style={{
            background: right.isPositive
              ? "rgba(34, 197, 94, 0.18)"
              : "rgba(30, 30, 30, 0.65)",
            border: `1.5px solid ${
              right.isPositive ? "rgba(34, 197, 94, 0.55)" : "rgba(255, 255, 255, 0.12)"
            }`,
            borderRadius: 20,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: right.isPositive ? "#4ade80" : "#fbbf24",
              background: right.isPositive
                ? "rgba(34, 197, 94, 0.28)"
                : "rgba(251, 191, 36, 0.2)",
              padding: "6px 14px",
              borderRadius: 8,
              alignSelf: "flex-start",
              textTransform: "uppercase",
            }}
          >
            {right.badge}
          </span>
          <h4 style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", margin: 0 }}>
            {right.title}
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: "#ffffff",
              fontSize: 22,
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            {right.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>
    </SpatialHUDCard>
  );
};

// ============================================================================
// ARCHETYPE 3: 3-COLUMN FEATURE GRID
// ============================================================================
export interface FeatureGridCardProps {
  items: Array<{ icon: string; title: string; desc: string }>;
  accentColor?: string;
  staggerIndex?: number;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

export const FeatureGridCard: React.FC<FeatureGridCardProps> = ({
  items = [],
  accentColor = "#fbbf24",
  staggerIndex = 0,
  enableScanline = true,
  enableBrackets = true,
}) => {
  if (!items || items.length === 0) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      staggerIndex={staggerIndex}
      accentColor={accentColor}
      enableScanline={enableScanline}
      enableBrackets={enableBrackets}
      style={{ maxWidth: 960, padding: "24px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`,
          gap: 16,
          width: "100%",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(25, 25, 30, 0.65)",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 18,
              padding: "24px 16px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: `${accentColor}25`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: accentColor,
              }}
            >
              {item.icon}
            </div>
            <h4 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", margin: 0 }}>
              {item.title}
            </h4>
            <p style={{ fontSize: 18, color: "#a3a3a3", margin: 0, lineHeight: 1.35 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </SpatialHUDCard>
  );
};

// ============================================================================
// ARCHETYPE 4: SEQUENTIAL STEP FLOW
// ============================================================================
export interface StepFlowCardProps {
  steps: Array<{ stepNumber: string; title: string; detail: string; active?: boolean }>;
  accentColor?: string;
  staggerIndex?: number;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

export const StepFlowCard: React.FC<StepFlowCardProps> = ({
  steps = [],
  accentColor = "#fbbf24",
  staggerIndex = 0,
  enableScanline = true,
  enableBrackets = true,
}) => {
  if (!steps || steps.length === 0) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      staggerIndex={staggerIndex}
      accentColor={accentColor}
      enableScanline={enableScanline}
      enableBrackets={enableBrackets}
      style={{ maxWidth: 920, padding: "26px 28px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        {steps.map((st, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              background: st.active ? `${accentColor}20` : "rgba(25, 25, 30, 0.6)",
              border: `1.5px solid ${st.active ? accentColor : "rgba(255, 255, 255, 0.1)"}`,
              borderRadius: 18,
              padding: "18px 22px",
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: st.active ? accentColor : "#737373",
                fontFamily: "monospace",
              }}
            >
              {st.stepNumber}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <h4 style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", margin: 0 }}>
                {st.title}
              </h4>
              <p style={{ fontSize: 20, color: "#a3a3a3", margin: 0, lineHeight: 1.3 }}>
                {st.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SpatialHUDCard>
  );
};

// ============================================================================
// ARCHETYPE 5: CHECKLIST & STATUS BADGE
// ============================================================================
export interface ChecklistCardProps {
  title: string;
  badge?: { text: string; color: "green" | "yellow" | "red" };
  items: string[];
  accentColor?: string;
  staggerIndex?: number;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  title,
  badge,
  items = [],
  accentColor = "#38bdf8",
  staggerIndex = 0,
  enableScanline = true,
  enableBrackets = true,
}) => {
  if (!title && items.length === 0) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  const badgeColors = {
    green: { bg: "rgba(34, 197, 94, 0.2)", text: "#4ade80", border: "#22c55e" },
    yellow: { bg: "rgba(251, 191, 36, 0.2)", text: "#fbbf24", border: "#f59e0b" },
    red: { bg: "rgba(239, 68, 68, 0.2)", text: "#f87171", border: "#ef4444" },
  }[badge?.color || "yellow"];

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      staggerIndex={staggerIndex}
      accentColor={accentColor}
      enableScanline={enableScanline}
      enableBrackets={enableBrackets}
      style={{ maxWidth: 920, padding: "30px 28px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", margin: 0 }}>
            {title}
          </h3>
          {badge && (
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                background: badgeColors.bg,
                color: badgeColors.text,
                border: `1px solid ${badgeColors.border}`,
                padding: "5px 14px",
                borderRadius: 100,
              }}
            >
              {badge.text}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <span style={{ color: badgeColors.text, fontSize: 24, lineHeight: 1 }}>✔</span>
              <span style={{ fontSize: 22, color: "#e4e4e7", lineHeight: 1.4, fontWeight: 500 }}>
                {it}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SpatialHUDCard>
  );
};

// ============================================================================
// ARCHETYPE 6: QUOTE & STATEMENT CARD
// ============================================================================
export interface QuoteCardProps {
  quote: string;
  author: string;
  role: string;
  source?: string;
  accentColor?: string;
  staggerIndex?: number;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  role,
  source,
  accentColor = "#fbbf24",
  staggerIndex = 0,
  enableScanline = true,
  enableBrackets = true,
}) => {
  if (!quote) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      staggerIndex={staggerIndex}
      accentColor={accentColor}
      enableScanline={enableScanline}
      enableBrackets={enableBrackets}
      style={{ maxWidth: 920, padding: "36px 34px" }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: -12,
            left: -8,
            fontSize: 80,
            color: `${accentColor}25`,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          “
        </span>
        <p
          style={{
            fontSize: 26,
            fontStyle: "italic",
            color: "#ffffff",
            lineHeight: 1.5,
            margin: 0,
            zIndex: 1,
            fontWeight: 500,
          }}
        >
          "{quote}"
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 16,
            marginTop: 8,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: accentColor }}>
              {author}
            </div>
            <div style={{ fontSize: 18, color: "#a1a1aa", marginTop: 2 }}>{role}</div>
          </div>
          {source && (
            <span
              style={{
                fontSize: 16,
                color: "#94a3b8",
                background: "rgba(255, 255, 255, 0.08)",
                padding: "4px 12px",
                borderRadius: 6,
              }}
            >
              Nguồn: {source}
            </span>
          )}
        </div>
      </div>
    </SpatialHUDCard>
  );
};

```

---

## File: `engines/remotion/src/shared/design-system.tsx` <a id="file-engines-remotion-src-shared-design-system-tsx"></a>

```tsx
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

/**
 * AI VIDEO FACTORY V2 — MOBILE DESIGN SYSTEM (1080 × 1920)
 * 
 * Standardized Typography & Full-Bleed Layout Anchors to eliminate dead space
 * and ensure immediate mobile readability on TikTok, Reels, and Shorts.
 */

// ============================================================================
// 1. TYPOGRAPHY SCALE (Mobile Safe Standards)
// ============================================================================
export const MOBILE_TYPOGRAPHY = {
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  
  // Headers (Prominent & Punchy)
  headerTitle: {
    fontSize: 72,
    fontWeight: 900 as const,
    lineHeight: 1.15,
    letterSpacing: "-1px",
    textTransform: "uppercase" as const,
  },
  headerSubtitle: {
    fontSize: 38,
    fontWeight: 800 as const,
    lineHeight: 1.25,
  },
  
  // Editorial Cards
  cardTitle: {
    fontSize: 40,
    fontWeight: 900 as const,
    lineHeight: 1.25,
  },
  cardBody: {
    fontSize: 30,
    fontWeight: 700 as const,
    lineHeight: 1.45,
  },
  badgeText: {
    fontSize: 24,
    fontWeight: 800 as const,
    letterSpacing: "1px",
  },

  // Bottom Subtitle Caption Bar
  subtitleBar: {
    fontSize: 36,
    fontWeight: 800 as const,
    lineHeight: 1.38,
  },
} as const;

// ============================================================================
// 2. VERTICAL ANCHORS & ZERO DEAD SPACE ZONES (1080 × 1920)
// ============================================================================
export const MOBILE_LAYOUT = {
  width: 1080,
  height: 1920,
  
  // Safe margins
  safeMarginHorizontal: 40,
  
  // Upper Navigation & Title Zone
  headerTop: 120,
  headerHeight: 250,
  
  // Center Hero Visual Anchor (Perfectly centered in the upper-middle)
  centerAnchorY: 760,
  
  // Lower Content Zone (Pushed down appropriately to leave room for Hero)
  lowerZoneTop: 1300,
  
  // Bottom Subtitle & Platform UI Safe Zone
  subtitleBarBottom: 150,
} as const;

// ============================================================================
// 3. COLOR PALETTE
// ============================================================================
export const MOBILE_COLORS = {
  bgDark: "#030712",
  textLight: "#f8fafc",
  textMuted: "#94a3b8",
  
  gold: "#facc15",
  goldLight: "#fef08a",
  goldBorder: "#eab308",
  
  cyan: "#0284c7",
  cyanLight: "#38bdf8",
  cyanBorder: "#0369a1",
  
  emerald: "#059669",
  emeraldLight: "#34d399",
  
  red: "#dc2626",
  redLight: "#f87171",
  
  cardBg: "rgba(15, 23, 42, 0.95)",
} as const;

// ============================================================================
// 4. REUSABLE FULL-BLEED COMPONENTS
// ============================================================================

/**
 * Standard Full-Bleed Editorial Header
 */
export const StandardHeader: React.FC<{
  title: string;
  subtitle?: string;
  subColor?: string;
  accentColor?: string;
}> = ({ title, subtitle, subColor = MOBILE_COLORS.gold, accentColor }) => {
  const frame = useCurrentFrame();
  const enterY = interpolate(frame, [0, 15], [-25, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const finalSubColor = accentColor || subColor;

  return (
    <div
      style={{
        position: "absolute",
        left: MOBILE_LAYOUT.safeMarginHorizontal,
        right: MOBILE_LAYOUT.safeMarginHorizontal,
        top: MOBILE_LAYOUT.headerTop,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 60,
        opacity,
        transform: `translateY(${enterY}px)`,
      }}
    >
      <h1
        style={{
          fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
          ...MOBILE_TYPOGRAPHY.headerTitle,
          color: "#ffffff",
          textShadow: "0 5px 25px rgba(0,0,0,0.85)",
          marginBottom: 10,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
            ...MOBILE_TYPOGRAPHY.headerSubtitle,
            color: finalSubColor,
            textShadow: "0 3px 18px rgba(0,0,0,0.9)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Standard High-Contrast Subtitle Bar (Positioned above platform bottom nav)
 */
export const StandardSubtitleBar: React.FC<{
  text: string;
}> = ({ text }) => {
  if (!text || !text.trim()) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: MOBILE_LAYOUT.safeMarginHorizontal,
        right: MOBILE_LAYOUT.safeMarginHorizontal,
        bottom: MOBILE_LAYOUT.subtitleBarBottom,
        display: "flex",
        justifyContent: "center",
        zIndex: 75,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(3, 7, 18, 0.95)",
          border: "2px solid rgba(255, 255, 255, 0.25)",
          borderRadius: 24,
          padding: "18px 34px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.85)",
          maxWidth: 1000,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
            ...MOBILE_TYPOGRAPHY.subtitleBar,
            color: "#ffffff",
            textShadow: "0 3px 12px rgba(0,0,0,0.9)",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

/**
 * Standard Lower-Space Fill Card (Eliminates dead space in bottom half)
 */
export const StandardLowerCard: React.FC<{
  title?: string;
  description?: string;
  badge?: string;
  content?: string;
  accentColor?: string;
  borderColor?: string;
  badgeColor?: string;
}> = ({
  title,
  description,
  badge,
  content,
  accentColor = MOBILE_COLORS.gold,
  borderColor,
  badgeColor,
}) => {
  const displayTitle = title || badge;
  const displayDescription = description || content;
  const finalBorder = borderColor || badgeColor || accentColor || MOBILE_COLORS.goldBorder;
  const finalAccent = badgeColor || accentColor || MOBILE_COLORS.gold;

  // Zero Phantom Containers: Do not render anything if both title and description are missing
  if (!displayTitle && !displayDescription) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: MOBILE_LAYOUT.safeMarginHorizontal,
        right: MOBILE_LAYOUT.safeMarginHorizontal,
        top: MOBILE_LAYOUT.lowerZoneTop,
        background: "rgba(15, 23, 42, 0.92)",
        border: `3px solid ${finalBorder}`,
        borderRadius: 32,
        padding: "36px 40px",
        textAlign: "center",
        zIndex: 40,
        boxShadow: "0 25px 60px rgba(0,0,0,0.85)",
      }}
    >
      {displayTitle && (
        <div
          style={{
            fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
            color: finalAccent,
            ...MOBILE_TYPOGRAPHY.cardTitle,
            marginBottom: 12,
          }}
        >
          {displayTitle}
        </div>
      )}
      {displayDescription && (
        <div
          style={{
            fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
            color: "#cbd5e1",
            ...MOBILE_TYPOGRAPHY.cardBody,
          }}
        >
          {displayDescription}
        </div>
      )}
    </div>
  );
};

```

---

## File: `engines/remotion/src/shared/index.ts` <a id="file-engines-remotion-src-shared-index-ts"></a>

```typescript
export * from "./design-system";
export * from "./primitives";
export * from "./SpeechSyncedSubtitles";
export * from "./UserBrandOutro";
export * from "./CardArchetypes";
export * from "./SpatialHUDCard";
export * from "./three";

```

---

## File: `engines/remotion/src/shared/primitives.tsx` <a id="file-engines-remotion-src-shared-primitives-tsx"></a>

```tsx
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MOBILE_COLORS, MOBILE_TYPOGRAPHY } from "./design-system";

/**
 * MetricCounter: Counts up from `from` to `to` with prefix/suffix.
 */
export const MetricCounter: React.FC<{
  from?: number;
  to: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}> = ({
  from = 0,
  to,
  durationFrames = 30,
  prefix = "",
  suffix = "",
  decimals = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const current = from + (to - from) * progress;
  const formatted = current.toFixed(decimals);

  return (
    <span
      style={{
        fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
        fontSize: 48,
        fontWeight: 900,
        color: MOBILE_COLORS.gold,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/**
 * usePhysicsVibration: Generates sinusoidal vibration / wobble for tension & impact beats.
 */
export function usePhysicsVibration(
  startFrame: number = 0,
  intensity: number = 6,
  speed: number = 0.5
) {
  const frame = useCurrentFrame();
  if (frame < startFrame) return 0;
  return Math.sin((frame - startFrame) * speed) * intensity;
}

/**
 * useSpringScale: Smooth entrance scaling using Remotion spring physics.
 */
export function useSpringScale(delay: number = 0, damping: number = 12) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping },
  });
}

/**
 * HighlightBadge: Hero label / tag for categories, metrics, alerts.
 */
export const HighlightBadge: React.FC<{
  label: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}> = ({
  label,
  color = MOBILE_COLORS.gold,
  bgColor = "rgba(234, 179, 8, 0.15)",
  borderColor = MOBILE_COLORS.goldBorder,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 18px",
        borderRadius: 9999,
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        color,
        fontFamily: MOBILE_TYPOGRAPHY.fontFamily,
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  );
};

```

---

## File: `engines/remotion/src/shared/SpatialHUDCard.tsx` <a id="file-engines-remotion-src-shared-spatialhudcard-tsx"></a>

```tsx
import React from "react";
import { interpolate } from "remotion";

export interface SpatialHUDCardProps {
  children: React.ReactNode;
  frame: number;
  springVal?: number;
  staggerIndex?: number;
  accentColor?: string;
  borderColor?: string;
  background?: string;
  style?: React.CSSProperties;
  enableScanline?: boolean;
  enableBrackets?: boolean;
}

/**
 * 2.5D Spatial HUD Card Component
 * Combines 3D perspective, dynamic spatial rotations, floating physics,
 * multi-layer glassmorphism, glowing corner brackets, and animated laser scanlines.
 */
export const SpatialHUDCard: React.FC<SpatialHUDCardProps> = ({
  children,
  frame,
  springVal = 1,
  staggerIndex = 0,
  accentColor = "#38BDF8",
  borderColor,
  background,
  style = {},
  enableScanline = true,
  enableBrackets = true,
}) => {
  // 3D Entry Spatial Transformations
  const rotX = interpolate(springVal, [0, 1], [16, 0]);
  const rotY = interpolate(
    springVal,
    [0, 1],
    [staggerIndex % 2 === 0 ? -12 : 12, 0]
  );
  const transZ = interpolate(springVal, [0, 1], [-80, 0]);
  const opacity = interpolate(springVal, [0, 1], [0, 1]);

  // Subtle continuous floating physics in 3D space
  const floatY = Math.sin((frame + staggerIndex * 14) * 0.08) * 5;
  const floatRotX = Math.sin((frame + staggerIndex * 18) * 0.06) * 1.2;
  const floatRotY = Math.cos((frame + staggerIndex * 16) * 0.05) * 1.0;

  // Scanline animation across card
  const scanX = -120 + ((frame * 3 + staggerIndex * 35) % 360);

  const finalBorder = borderColor || `1.5px solid ${accentColor}55`;
  const finalBg =
    background ||
    "linear-gradient(135deg, rgba(15, 23, 42, 0.82) 0%, rgba(6, 10, 20, 0.94) 100%)";

  return (
    <div
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          background: finalBg,
          border: finalBorder,
          borderRadius: 24,
          padding: "24px 28px",
          backdropFilter: "blur(16px)",
          boxShadow: `0 20px 45px rgba(0, 0, 0, 0.65), 0 0 25px ${accentColor}25, inset 0 0 18px ${accentColor}12`,
          opacity,
          transform: `perspective(1200px) translateZ(${transZ}px) translateY(${floatY}px) rotateX(${rotX + floatRotX}deg) rotateY(${rotY + floatRotY}deg)`,
          transformOrigin: "center center",
          overflow: "hidden",
          transition: "transform 0.05s ease-out",
          ...style,
        }}
      >
        {/* Sci-Fi Corner Brackets [ ] */}
        {enableBrackets && (
          <>
            {/* Top-Left Bracket */}
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 14,
                height: 14,
                borderTop: `2px solid ${accentColor}`,
                borderLeft: `2px solid ${accentColor}`,
                borderRadius: "4px 0 0 0",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            {/* Top-Right Bracket */}
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 14,
                height: 14,
                borderTop: `2px solid ${accentColor}`,
                borderRight: `2px solid ${accentColor}`,
                borderRadius: "0 4px 0 0",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            {/* Bottom-Left Bracket */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                width: 14,
                height: 14,
                borderBottom: `2px solid ${accentColor}`,
                borderLeft: `2px solid ${accentColor}`,
                borderRadius: "0 0 0 4px",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
            {/* Bottom-Right Bracket */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 14,
                height: 14,
                borderBottom: `2px solid ${accentColor}`,
                borderRight: `2px solid ${accentColor}`,
                borderRadius: "0 0 4px 0",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${accentColor}`,
              }}
            />
          </>
        )}

        {/* Laser Sweep Scanline */}
        {enableScanline && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "35%",
              background: `linear-gradient(90deg, transparent, ${accentColor}18, transparent)`,
              transform: `translateX(${scanX}%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Card Content */}
        {children}
      </div>
    </div>
  );
};

```

---

## File: `engines/remotion/src/shared/SpeechSyncedSubtitles.tsx` <a id="file-engines-remotion-src-shared-speechsyncedsubtitles-tsx"></a>

```tsx
import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

export interface SubtitleWord {
  word: string;
  startMs: number;
  durationMs?: number;
  endMs?: number;
}

export interface SpeechSyncedSubtitlesProps {
  words: SubtitleWord[];
  fps?: number;
  positionY?: number;
  chunkSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  glow?: boolean;
}

/**
 * SpeechSyncedSubtitles — AI Video Factory V3
 *
 * Implements Hard Constraint 4:
 * 1. Speech-Synced: Highlights only the currently spoken word in active color.
 * 2. Zero Layout Shifts: Never changes scale(1.15) or font weight/size to avoid jumpy lines.
 * 3. Zero Speech = Zero Sub: Returns null when silence (activeIndex === -1).
 * 4. Mobile Safe Zone: Default position Y: 1530 (within mobile vertical safe zone).
 */
export const SpeechSyncedSubtitles: React.FC<SpeechSyncedSubtitlesProps> = ({
  words = [],
  fps = 30,
  positionY = 1530,
  chunkSize = 6,
  activeColor = "#D4AF37",
  inactiveColor = "rgba(255, 255, 255, 0.85)",
  backgroundColor = "rgba(11, 14, 20, 0.95)",
  borderColor = "rgba(212, 175, 55, 0.4)",
  fontFamily = "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
  fontSize = 34,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const currentMs = (frame / fps) * 1000;

  // Normalized words with calculated endMs
  const normalizedWords = useMemo(() => {
    return (words || []).map((w) => ({
      ...w,
      endMs: w.endMs ?? (w.startMs + (w.durationMs || 300)),
    }));
  }, [words]);

  // Find active word index directly from currentMs
  const activeIndex = normalizedWords.findIndex(
    (w) => currentMs >= w.startMs && currentMs < (w.endMs ?? (w.startMs + 300))
  );

  // Zero speech = zero sub (Hard constraint)
  if (activeIndex === -1 || normalizedWords.length === 0) return null;

  const chunkIndex = Math.floor(activeIndex / chunkSize);
  const chunkStartIdx = chunkIndex * chunkSize;
  const chunkEndIdx = Math.min(chunkStartIdx + chunkSize, normalizedWords.length);
  const chunkWords = normalizedWords.slice(chunkStartIdx, chunkEndIdx);

  return (
    <div
      style={{
        position: "absolute",
        top: positionY,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 90,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor,
          border: `1px solid ${borderColor}`,
          borderRadius: 20,
          padding: "14px 32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 12px",
          boxShadow: `0 10px 30px rgba(0,0,0,0.85)${
            glow ? `, 0 0 25px ${borderColor}` : ""
          }`,
          maxWidth: 960,
          backdropFilter: "blur(12px)",
        }}
      >
        {chunkWords.map((w, i) => {
          const globalIdx = chunkStartIdx + i;
          const isActive = globalIdx === activeIndex;

          return (
            <span
              key={globalIdx}
              style={{
                fontFamily,
                fontSize,
                fontWeight: 800,
                color: isActive ? activeColor : inactiveColor,
                textShadow:
                  isActive && glow
                    ? `0 0 16px ${activeColor}, 0 2px 8px rgba(0,0,0,0.9)`
                    : "0 2px 6px rgba(0,0,0,0.8)",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

```

---

## File: `engines/remotion/src/shared/three/Finance3DPrimitives.tsx` <a id="file-engines-remotion-src-shared-three-finance3dprimitives-tsx"></a>

```tsx
import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

// ============================================================================
// 1. CANDLESTICK 3D CHART (Biểu đồ nến Nhật 3D nổi khối phát sáng)
// ============================================================================
export interface Candlestick3DItem {
  open: number;
  close: number;
  high: number;
  low: number;
  label?: string;
}

export interface Candlestick3DChartProps {
  data?: Candlestick3DItem[];
  bullColor?: string;
  bearColor?: string;
  spacing?: number;
  staggerDelay?: number;
}

const DEFAULT_CANDLE_DATA: Candlestick3DItem[] = [
  { open: 1.2, close: 1.9, high: 2.2, low: 1.0, label: "Q1" },
  { open: 1.9, close: 1.5, high: 2.1, low: 1.3, label: "Q2" },
  { open: 1.5, close: 2.4, high: 2.7, low: 1.4, label: "Q3" },
  { open: 2.4, close: 3.2, high: 3.5, low: 2.2, label: "Q4" },
  { open: 3.2, close: 2.8, high: 3.4, low: 2.6, label: "Q5" },
];

export const Candlestick3DChart: React.FC<Candlestick3DChartProps> = ({
  data = DEFAULT_CANDLE_DATA,
  bullColor = "#22c55e",
  bearColor = "#ef4444",
  spacing = 1.0,
  staggerDelay = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalWidth = (data.length - 1) * spacing;
  const startX = -totalWidth / 2;

  // Gentle 3D presentation tilt
  const chartTiltX = 0.25 + Math.sin(frame * 0.03) * 0.04;
  const chartTiltY = -0.35 + Math.cos(frame * 0.02) * 0.05;

  return (
    <group rotation={[chartTiltX, chartTiltY, 0]}>
      {/* Floor Reference Grid Base */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[totalWidth + 3, 4, 8, 4]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.12} />
      </mesh>

      {data.map((c, idx) => {
        const isBull = c.close >= c.open;
        const color = isBull ? bullColor : bearColor;

        const bodyBottom = Math.min(c.open, c.close);
        const bodyTop = Math.max(c.open, c.close);
        const bodyHeight = Math.max(0.12, bodyTop - bodyBottom);
        const bodyCenterY = bodyBottom + bodyHeight / 2;

        const wickHeight = Math.max(0.2, c.high - c.low);
        const wickCenterY = (c.high + c.low) / 2;

        const growthSpring = spring({
          frame: Math.max(0, frame - idx * staggerDelay),
          fps,
          config: { damping: 14, stiffness: 120 },
        });

        const posX = startX + idx * spacing;

        return (
          <group
            key={idx}
            position={[posX, 0, 0]}
            scale={[1, growthSpring, 1]}
          >
            {/* Candle Wick (High to Low thin cylinder) */}
            <mesh position={[0, wickCenterY, 0]}>
              <cylinderGeometry args={[0.025, 0.025, wickHeight, 12]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Candle 3D Body */}
            <mesh position={[0, bodyCenterY, 0]}>
              <boxGeometry args={[0.48, bodyHeight, 0.48]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.15}
                metalness={0.25}
                transmission={0.2}
                emissive={color}
                emissiveIntensity={0.45}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ============================================================================
// 2. BAR RACE 3D TOWERS (Các cột trụ 3D đua chiều cao trong không gian)
// ============================================================================
export interface BarRace3DItem {
  label: string;
  value: number; // e.g. 10 to 100
  color?: string;
}

export interface BarRace3DTowersProps {
  items?: BarRace3DItem[];
  maxHeight?: number;
  spacing?: number;
  accentColor?: string;
}

const DEFAULT_BAR_ITEMS: BarRace3DItem[] = [
  { label: "Bonds", value: 35, color: "#38bdf8" },
  { label: "Real Estate", value: 55, color: "#a855f7" },
  { label: "Equities", value: 85, color: "#22c55e" },
  { label: "AI Tech", value: 100, color: "#fbbf24" },
];

export const BarRace3DTowers: React.FC<BarRace3DTowersProps> = ({
  items = DEFAULT_BAR_ITEMS,
  maxHeight = 3.6,
  spacing = 1.15,
  accentColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxValue = useMemo(() => {
    return Math.max(...items.map((it) => it.value), 1);
  }, [items]);

  const totalWidth = (items.length - 1) * spacing;
  const startX = -totalWidth / 2;

  // Cinematic isometric camera view
  const rotY = -0.45 + Math.sin(frame * 0.02) * 0.04;
  const rotX = 0.32 + Math.cos(frame * 0.02) * 0.03;

  return (
    <group rotation={[rotX, rotY, 0]}>
      {/* Ground Pedestal Slab */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[totalWidth + 2.5, 0.12, 3.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>

      {items.map((item, idx) => {
        const itemColor = item.color || accentColor;
        const targetHeight = (item.value / maxValue) * maxHeight;

        const growthSpring = spring({
          frame: Math.max(0, frame - idx * 8),
          fps,
          config: { damping: 15, stiffness: 110 },
        });

        const currentHeight = Math.max(0.08, targetHeight * growthSpring);
        const posX = startX + idx * spacing;

        return (
          <group key={idx} position={[posX, 0, 0]}>
            {/* 3D Monolith Tower Shaft */}
            <mesh position={[0, currentHeight / 2, 0]}>
              <boxGeometry args={[0.62, currentHeight, 0.62]} />
              <meshPhysicalMaterial
                color={itemColor}
                transmission={0.35}
                roughness={0.2}
                metalness={0.65}
                emissive={itemColor}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Glowing Summit Top Cap */}
            <mesh position={[0, currentHeight + 0.03, 0]}>
              <boxGeometry args={[0.66, 0.06, 0.66]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive={itemColor}
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ============================================================================
// 3. WEALTH VAULT SHIELD 3D (Khối kim cương & khiên bảo toàn vốn xoay 3D)
// ============================================================================
export interface WealthVaultShield3DProps {
  progress?: number;
  accentColor?: string;
}

export const WealthVaultShield3D: React.FC<WealthVaultShield3DProps> = ({
  progress = 1,
  accentColor = "#fbbf24", // Golden wealth standard
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = entry * progress;

  // Gimbal rotations
  const gemRotX = frame * 0.02;
  const gemRotY = frame * 0.025;
  const ring1Rot = frame * 0.03;
  const ring2Rot = -frame * 0.022;

  return (
    <group scale={scale}>
      {/* Central Precious Diamond Core */}
      <mesh rotation={[gemRotX, gemRotY, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color={accentColor}
          roughness={0.05}
          metalness={0.2}
          transmission={0.85}
          ior={2.4}
          emissive={accentColor}
          emissiveIntensity={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Gold Ring 1 (Horizontal Inclined Gimbal) */}
      <mesh rotation={[Math.PI / 4 + ring1Rot, 0, ring1Rot]}>
        <torusGeometry args={[1.85, 0.045, 16, 64]} />
        <meshStandardMaterial
          color="#fef08a"
          metalness={0.95}
          roughness={0.15}
          emissive={accentColor}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Gold Ring 2 (Vertical Perpendicular Gimbal) */}
      <mesh rotation={[0, ring2Rot, Math.PI / 3 + ring2Rot]}>
        <torusGeometry args={[2.15, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#fef08a"
          metalness={0.95}
          roughness={0.15}
          emissive={accentColor}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Satellite Node Orbs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + frame * 0.025;
        const nodeX = Math.cos(angle) * 2.5;
        const nodeZ = Math.sin(angle) * 2.5;
        const nodeY = Math.sin(frame * 0.05 + i) * 0.3;

        return (
          <mesh key={i} position={[nodeX, nodeY, nodeZ]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={accentColor}
              emissiveIntensity={1.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

```

---

## File: `engines/remotion/src/shared/three/index.ts` <a id="file-engines-remotion-src-shared-three-index-ts"></a>

```typescript
export * from "./Stage3DWrapper";
export * from "./Medical3DPrimitives";
export * from "./Finance3DPrimitives";

```

---

## File: `engines/remotion/src/shared/three/Medical3DPrimitives.tsx` <a id="file-engines-remotion-src-shared-three-medical3dprimitives-tsx"></a>

```tsx
import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { MeshDistortMaterial } from "@react-three/drei";

// ============================================================================
// 1. TỔ HỢP GIẢI PHẪU Ổ BỤNG 3D (MULTI-ORGAN ABDOMINAL HOLOGRAM ASSEMBLY)
// ============================================================================
export interface ColonHologram3DProps {
  progress?: number;
  highlightPolyp?: boolean;
  accentColor?: string;
  polypColor?: string;
  wireframeOpacity?: number;
  scaleMultiplier?: number;
  position?: [number, number, number];
  opacityMultiplier?: number;
}

export const ColonHologram3D: React.FC<ColonHologram3DProps> = ({
  progress = 1,
  highlightPolyp = true,
  accentColor = "#38BDF8",
  polypColor = "#F43F5E",
  wireframeOpacity = 0.25,
  scaleMultiplier = 0.4,
  position = [0, 0, 0],
  opacityMultiplier = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance spring
  const entry = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  // --------------------------------------------------------------------------
  // GEOMETRIES MEMOIZATION
  // --------------------------------------------------------------------------
  const {
    colonCurve,
    smallIntestineCurve,
    stomachCurve,
    polypPosition,
    rectumCurve,
  } = useMemo(() => {
    // 1. Hero Large Intestine (Ascending -> Transverse -> Descending -> Sigmoid)
    const cPoints = [
      new THREE.Vector3(-1.8, -1.8, 0),    // Cecum / Appendix base
      new THREE.Vector3(-2.0, 0.0, 0.1),   // Ascending colon
      new THREE.Vector3(-1.7, 1.4, 0.2),
      new THREE.Vector3(-1.3, 1.8, 0.2),   // Hepatic flexure
      new THREE.Vector3(-0.5, 2.0, -0.1),  // Transverse colon
      new THREE.Vector3(0.5, 1.9, -0.1),
      new THREE.Vector3(1.4, 1.7, 0.15),   // Splenic flexure
      new THREE.Vector3(1.9, 0.2, -0.1),   // Descending colon
      new THREE.Vector3(1.7, -1.2, 0.1),
      new THREE.Vector3(1.3, -1.8, 0.25),  // Sigmoid entrance
    ];
    const cCurve = new THREE.CatmullRomCurve3(cPoints);

    // Transitioning Rectum & Sigmoid section down to lesion
    const rPoints = [
      new THREE.Vector3(1.3, -1.8, 0.25),
      new THREE.Vector3(0.9, -2.1, 0.3),
      new THREE.Vector3(0.4, -2.5, 0.35),  // Rectum canal
    ];
    const rCurve = new THREE.CatmullRomCurve3(rPoints);

    // 2. Small Intestine Sinuous Core (fills the center hollow)
    const sPoints = [
      new THREE.Vector3(0.3, 1.3, 0.1),    // Duodenum exit
      new THREE.Vector3(-0.6, 1.1, 0.2),
      new THREE.Vector3(0.6, 0.8, -0.1),
      new THREE.Vector3(-0.9, 0.5, 0.15),
      new THREE.Vector3(0.8, 0.2, 0.1),
      new THREE.Vector3(-0.8, -0.1, -0.1),
      new THREE.Vector3(0.7, -0.4, 0.2),
      new THREE.Vector3(-0.7, -0.7, 0.1),
      new THREE.Vector3(0.6, -1.0, -0.15),
      new THREE.Vector3(-0.5, -1.3, 0.2),
      new THREE.Vector3(0.1, -1.5, 0.1),
      new THREE.Vector3(-1.5, -1.7, 0.1),  // Ileocecal junction
    ];
    const sCurve = new THREE.CatmullRomCurve3(sPoints);

    // 3. Stomach J-Curve
    const stomPoints = [
      new THREE.Vector3(0.1, 3.0, -0.1),   // Cardia / Esophagus
      new THREE.Vector3(0.8, 2.9, 0.1),    // Fundus
      new THREE.Vector3(1.2, 2.3, 0.0),    // Body
      new THREE.Vector3(0.8, 1.7, 0.1),    // Antrum
      new THREE.Vector3(0.3, 1.4, 0.0),    // Pylorus
    ];
    const stomCurve = new THREE.CatmullRomCurve3(stomPoints);

    return {
      colonCurve: cCurve,
      rectumCurve: rCurve,
      smallIntestineCurve: sCurve,
      stomachCurve: stomCurve,
      polypPosition: [0.4, -2.5, 0.4] as [number, number, number],
    };
  }, []);

  // Continuous subtle 3D rotational float
  const rotY = frame * 0.012 * entry;
  const rotX = Math.sin(frame * 0.03) * 0.06;
  const currentScale = scaleMultiplier * entry * Math.min(progress, 1);

  // Polyp pulsation
  const polypPulse = 1 + (highlightPolyp ? Math.sin(frame * 0.22) * 0.18 : 0);
  const polypEmissiveIntensity = highlightPolyp
    ? (1.8 + Math.sin(frame * 0.22) * 0.9) * opacityMultiplier
    : 0.3 * opacityMultiplier;

  return (
    <group
      position={position}
      scale={currentScale}
      rotation={[rotX, rotY, 0]}
    >
      {/* ==================================================================== */}
      {/* LỚP 3 - KHUNG LƯỚI CƠ THỂ & CỘT SỐNG (TORSO WIREFRAME & SPINE)       */}
      {/* ==================================================================== */}
      {/* 3A. Hologram Torso Contour Cage */}
      <mesh position={[0, 0.2, -0.3]} scale={[1.15, 1, 0.75]}>
        <cylinderGeometry args={[2.8, 2.5, 6.6, 24, 8, true]} />
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.07 * opacityMultiplier}
        />
      </mesh>

      {/* 3B. Vertebral Spine Axis behind abdominal cavity */}
      <group position={[0, 0.2, -1.4]}>
        {Array.from({ length: 9 }).map((_, idx) => (
          <mesh key={idx} position={[0, (idx - 4) * 0.65, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.24, 16]} />
            <meshStandardMaterial
              color="#334155"
              emissive="#1E293B"
              emissiveIntensity={0.2 * opacityMultiplier}
              transparent
              opacity={0.22 * opacityMultiplier}
            />
          </mesh>
        ))}
      </group>

      {/* ==================================================================== */}
      {/* LỚP 2 - GAN & DẠ DÀY PHÍA TRÊN (UPPER ORGANS: LIVER & STOMACH)       */}
      {/* ==================================================================== */}
      {/* 2A. Liver (Gan - Bên phải giải phẫu / Trái màn hình) */}
      <group position={[-1.35, 2.35, -0.2]} rotation={[0.15, 0.1, -0.25]}>
        <mesh scale={[1.6, 0.95, 0.9]}>
          <sphereGeometry args={[0.85, 32, 24]} />
          <MeshDistortMaterial
            color="#0D9488"
            emissive="#042F2E"
            emissiveIntensity={0.4 * opacityMultiplier}
            distort={0.15}
            speed={0}
            roughness={0.35}
            transparent
            opacity={0.3 * opacityMultiplier}
          />
        </mesh>
        {/* Liver outer subtle wireframe grid */}
        <mesh scale={[1.63, 0.98, 0.93]}>
          <sphereGeometry args={[0.85, 16, 12]} />
          <meshBasicMaterial
            color="#0D9488"
            wireframe
            transparent
            opacity={0.12 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* 2B. Stomach (Dạ dày - Bên trái giải phẫu / Phải màn hình, chữ J phình) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[stomachCurve, 48, 0.32, 16, false]} />
          <meshPhysicalMaterial
            color="#0284C7"
            transmission={0.65}
            roughness={0.25}
            metalness={0.1}
            emissive="#0369A1"
            emissiveIntensity={0.25 * opacityMultiplier}
            transparent
            opacity={0.32 * opacityMultiplier}
          />
        </mesh>
        <mesh>
          <tubeGeometry args={[stomachCurve, 48, 0.32, 10, false]} />
          <meshBasicMaterial
            color="#38BDF8"
            wireframe
            transparent
            opacity={0.12 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* LỚP 1 - RUỘT NON CUỘN XOẮN Ở TRUNG TÂM (SMALL INTESTINE CORE)         */}
      {/* ==================================================================== */}
      <group position={[0, 0, 0]}>
        {/* Physical translucent small intestine meanders */}
        <mesh>
          <tubeGeometry args={[smallIntestineCurve, 120, 0.16, 14, false]} />
          <meshPhysicalMaterial
            color="#0284C7"
            transmission={0.7}
            roughness={0.2}
            metalness={0.1}
            emissive="#0369A1"
            emissiveIntensity={0.35 * opacityMultiplier}
            transparent
            opacity={0.38 * opacityMultiplier}
          />
        </mesh>
        {/* Fine wireframe mesh layer */}
        <mesh>
          <tubeGeometry args={[smallIntestineCurve, 120, 0.165, 8, false]} />
          <meshBasicMaterial
            color="#00F0FF"
            wireframe
            transparent
            opacity={0.16 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* ==================================================================== */}
      {/* LỚP 4 - ĐẠI TRỰC TRÀNG & KHỐI U (HERO HIGHLIGHTED ORGAN)             */}
      {/* ==================================================================== */}
      {/* 4A. Colon Ascending, Transverse, Descending */}
      <group position={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[colonCurve, 84, 0.34, 18, false]} />
          <meshPhysicalMaterial
            color={accentColor}
            transmission={0.6}
            roughness={0.12}
            metalness={0.15}
            emissive={accentColor}
            emissiveIntensity={0.8 * opacityMultiplier}
            transparent
            opacity={0.85 * opacityMultiplier}
          />
        </mesh>
        {/* Outer Sci-Fi Wireframe Scan Grid */}
        <mesh>
          <tubeGeometry args={[colonCurve, 84, 0.35, 12, false]} />
          <meshBasicMaterial
            color={accentColor}
            wireframe
            transparent
            opacity={wireframeOpacity * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* 4B. Sigmoid & Rectum (Transitions to warning red-rose #F43F5E) */}
      <group position={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[rectumCurve, 32, 0.32, 18, false]} />
          <meshPhysicalMaterial
            color="#F43F5E"
            transmission={0.55}
            roughness={0.15}
            metalness={0.2}
            emissive="#E11D48"
            emissiveIntensity={1.0 * opacityMultiplier}
            transparent
            opacity={0.88 * opacityMultiplier}
          />
        </mesh>
        <mesh>
          <tubeGeometry args={[rectumCurve, 32, 0.33, 12, false]} />
          <meshBasicMaterial
            color="#F43F5E"
            wireframe
            transparent
            opacity={0.4 * opacityMultiplier}
          />
        </mesh>
      </group>

      {/* 4C. Pulsating Warning Tumor Lesion at Rectum */}
      <group position={polypPosition} scale={polypPulse}>
        <mesh>
          <sphereGeometry args={[0.26, 32, 32]} />
          <MeshDistortMaterial
            color={polypColor}
            emissive={polypColor}
            emissiveIntensity={polypEmissiveIntensity}
            distort={0.38}
            speed={0}
            roughness={0.18}
          />
        </mesh>

        {/* Pulsing Warning Halo Ring */}
        {highlightPolyp && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.34, 0.44, 32]} />
            <meshBasicMaterial
              color={polypColor}
              transparent
              opacity={(0.7 + Math.sin(frame * 0.22) * 0.3) * opacityMultiplier}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

// ============================================================================
// 2. ENDOSCOPY SIMULATION 3D (Mô phỏng nội soi cắt polyp bằng laser)
// ============================================================================
export interface EndoscopySimulation3DProps {
  cutProgress?: number; // 0 to 1
  accentColor?: string;
  scale?: number;
}

export const EndoscopySimulation3D: React.FC<EndoscopySimulation3DProps> = ({
  cutProgress = 0,
  accentColor = "#00f0ff",
  scale = 0.42,
}) => {
  const frame = useCurrentFrame();

  // Mucosal gut wall background curve
  const wallGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(3.2, 3.2, 6, 32, 1, true, -Math.PI / 2, Math.PI);
  }, []);

  // Endoscope probe translation towards target
  const probeZ = interpolate(cutProgress, [0, 0.4, 1], [-3.8, -1.8, -1.8], {
    extrapolateRight: "clamp",
  });

  // Laser activation: active between cutProgress 0.25 and 0.85
  const isLaserActive = cutProgress >= 0.2 && cutProgress <= 0.85;
  const laserOpacity = isLaserActive
    ? 0.75 + Math.sin(frame * 0.6) * 0.25
    : 0;

  // Polyp detachment: capped at max 0.7 units so it never breaches upper HUD cards
  const polypLiftY = interpolate(cutProgress, [0.5, 1], [0, 0.7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const polypScale = interpolate(cutProgress, [0.5, 1], [1, 0.4], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <group scale={scale} rotation={[0.15, 0, 0]}>
      {/* Organic Intestinal Mucosal Wall */}
      <mesh geometry={wallGeometry} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhysicalMaterial
          color="#be185d"
          roughness={0.45}
          metalness={0.05}
          transmission={0.15}
          emissive="#831843"
          emissiveIntensity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Target Polyp Tissue on Mucosa (Max lift capped at 0.7) */}
      <group position={[0, -0.6 + polypLiftY, -0.2]} scale={polypScale}>
        <mesh>
          <sphereGeometry args={[0.38, 32, 32]} />
          <MeshDistortMaterial
            color={cutProgress > 0.5 ? "#fbbf24" : "#ef4444"}
            emissive={cutProgress > 0.5 ? "#f59e0b" : "#dc2626"}
            emissiveIntensity={isLaserActive ? 1.6 : 0.4}
            distort={0.35}
            speed={0}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Endoscope Tube & Camera Head */}
      <group position={[0, -0.6, probeZ]}>
        {/* Metal Endoscope Shaft */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 3.5, 24]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Optical Tip Ring */}
        <mesh position={[0, 0, 1.76]}>
          <ringGeometry args={[0.16, 0.24, 24]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>

        {/* 3D Cyan Surgical Laser Beam */}
        {isLaserActive && (
          <mesh position={[0, 0, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 16]} />
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={laserOpacity}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

// ============================================================================
// 3. BIO SHIELD 3D (Khiên bảo vệ y tế đa diện 2 lớp)
// ============================================================================
export interface BioShield3DProps {
  progress?: number;
  accentColor?: string;
  radius?: number;
  scaleMultiplier?: number;
}

export const BioShield3D: React.FC<BioShield3DProps> = ({
  progress = 1,
  accentColor = "#38bdf8",
  radius = 1.4,
  scaleMultiplier = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const scale = entry * progress * scaleMultiplier;

  // Counter-rotating dual layers
  const innerRotX = frame * 0.015;
  const innerRotY = frame * 0.02;
  const outerRotX = -frame * 0.018;
  const outerRotY = -frame * 0.015;

  return (
    <group scale={scale}>
      {/* Inner Faceted Holographic Core */}
      <mesh rotation={[innerRotX, innerRotY, 0]}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshPhysicalMaterial
          color={accentColor}
          transmission={0.72}
          roughness={0.1}
          metalness={0.15}
          emissive={accentColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer Protective Glowing Wireframe Cage */}
      <mesh rotation={[outerRotX, outerRotY, 0]}>
        <icosahedronGeometry args={[radius * 1.22, 1]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Equatorial Energy Ring */}
      <mesh rotation={[Math.PI / 3, frame * 0.025, 0]}>
        <torusGeometry args={[radius * 1.38, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={accentColor}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
};

// ============================================================================
// 4. DNA STRAND 3D (Chuỗi xoắn kép DNA 3D tham số hóa)
// ============================================================================
export interface DNAStrand3DProps {
  rungsCount?: number;
  radius?: number;
  heightStep?: number;
  accentColor?: string;
  secondaryColor?: string;
}

export const DNAStrand3D: React.FC<DNAStrand3DProps> = ({
  rungsCount = 18,
  radius = 1.1,
  heightStep = 0.22,
  accentColor = "#38bdf8",
  secondaryColor = "#ec4899",
}) => {
  const frame = useCurrentFrame();

  const rungs = useMemo(() => {
    return Array.from({ length: rungsCount }).map((_, i) => {
      const baseY = (i - rungsCount / 2) * heightStep;
      const baseAngle = i * 0.38;
      return { id: i, baseY, baseAngle };
    });
  }, [rungsCount, heightStep]);

  return (
    <group>
      {rungs.map((r) => {
        const theta = r.baseAngle + frame * 0.025;
        const x1 = Math.cos(theta) * radius;
        const z1 = Math.sin(theta) * radius;
        const x2 = -x1;
        const z2 = -z1;
        const y = r.baseY;

        return (
          <group key={r.id}>
            {/* Nucleotide Node 1 */}
            <mesh position={[x1, y, z1]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>

            {/* Connecting Base Pair Rung */}
            <mesh position={[0, y, 0]} rotation={[0, -theta, Math.PI / 2]}>
              <cylinderGeometry args={[0.028, 0.028, radius * 2, 12]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>

            {/* Nucleotide Node 2 */}
            <mesh position={[x2, y, z2]}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// ============================================================================
// 5. BLOOD CELL STREAM 3D (Dòng chảy hồng cầu 3D trong không gian)
// ============================================================================
export interface BloodCellStream3DProps {
  count?: number;
  flowSpeed?: number;
  cellColor?: string;
}

export const BloodCellStream3D: React.FC<BloodCellStream3DProps> = ({
  count = 18,
  flowSpeed = 0.035,
  cellColor = "#dc2626",
}) => {
  const frame = useCurrentFrame();

  const cells = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed = i + 1;
      const posX = ((seed * 73) % 40) / 10 - 2.0;
      const posZ = ((seed * 47) % 30) / 10 - 1.5;
      const initialY = ((seed * 91) % 60) / 10 - 3.0;
      const rotSpeedX = 0.02 + ((seed * 13) % 20) * 0.001;
      const rotSpeedY = 0.015 + ((seed * 29) % 20) * 0.001;
      const scale = 0.75 + ((seed * 37) % 30) * 0.01;
      return { id: i, posX, posZ, initialY, rotSpeedX, rotSpeedY, scale };
    });
  }, [count]);

  return (
    <group>
      {cells.map((c) => {
        const range = 7.0;
        const currentY = ((c.initialY + frame * flowSpeed + 3.5) % range) - 3.5;
        const rotX = frame * c.rotSpeedX;
        const rotY = frame * c.rotSpeedY;

        return (
          <group
            key={c.id}
            position={[c.posX, currentY, c.posZ]}
            rotation={[rotX, rotY, 0]}
            scale={[c.scale, c.scale * 0.35, c.scale]}
          >
            <mesh>
              <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
              <meshStandardMaterial
                color={cellColor}
                emissive="#7f1d1d"
                emissiveIntensity={0.3}
                roughness={0.25}
                metalness={0.1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

```

---

## File: `engines/remotion/src/shared/three/Stage3DWrapper.tsx` <a id="file-engines-remotion-src-shared-three-stage3dwrapper-tsx"></a>

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export type CameraMode = "orbit" | "dolly-in" | "fly-through" | "breathing";

export interface Stage3DWrapperProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  cameraMode?: CameraMode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  cameraTarget?: [number, number, number];
  sparklesCount?: number;
  sparklesScale?: number | [number, number, number];
  sparklesColor?: string;
  enableSparkles?: boolean;
  enableBloom?: boolean;
  bloomIntensity?: number;
  bloomLuminanceThreshold?: number;
  ambientIntensity?: number;
  dirLightIntensity?: number;
  dirLightPosition?: [number, number, number];
  style?: React.CSSProperties;
}

const CameraRig: React.FC<{
  cameraMode: CameraMode;
  basePosition: [number, number, number];
  target: [number, number, number];
}> = ({ cameraMode, basePosition, target }) => {
  const { camera } = useThree();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame / fps;

  let posX = basePosition[0];
  let posY = basePosition[1];
  let posZ = basePosition[2];

  if (cameraMode === "orbit") {
    const radius = Math.sqrt(basePosition[0] ** 2 + basePosition[2] ** 2) || 11.5;
    const angle = t * 0.35;
    posX = Math.sin(angle) * radius;
    posZ = Math.cos(angle) * radius;
    posY = basePosition[1] + Math.sin(t * 0.2) * 0.5;
  } else if (cameraMode === "dolly-in") {
    const dollyProgress = interpolate(frame, [0, fps * 4], [0, 1], {
      extrapolateRight: "clamp",
    });
    posZ = basePosition[2] - dollyProgress * (basePosition[2] * 0.35);
    posY = basePosition[1] + Math.sin(t * 0.3) * 0.2;
  } else if (cameraMode === "fly-through") {
    const flyProgress = frame * 0.04;
    posX = basePosition[0] + Math.sin(flyProgress * 0.5) * 1.5;
    posY = basePosition[1] + Math.cos(flyProgress * 0.3) * 0.8;
    posZ = basePosition[2] - ((frame * 0.05) % (basePosition[2] * 0.7));
  } else if (cameraMode === "breathing") {
    posX = basePosition[0] + Math.sin(t * 0.8) * 0.25;
    posY = basePosition[1] + Math.cos(t * 0.6) * 0.2;
    posZ = basePosition[2] + Math.sin(t * 0.4) * 0.15;
  }

  camera.position.set(posX, posY, posZ);
  camera.lookAt(target[0], target[1], target[2]);
  camera.updateProjectionMatrix();

  return null;
};

export const Stage3DWrapper: React.FC<Stage3DWrapperProps> = ({
  children,
  width,
  height,
  cameraMode = "breathing",
  cameraPosition = [0, 0, 11.5],
  cameraFov = 42,
  cameraTarget = [0, 0, 0],
  sparklesCount = 50,
  sparklesScale = [10, 10, 10],
  sparklesColor = "#38bdf8",
  enableSparkles = true,
  enableBloom = true,
  bloomIntensity = 0.7,
  bloomLuminanceThreshold = 0.35,
  ambientIntensity = 0.6,
  dirLightIntensity = 1.2,
  dirLightPosition = [5, 8, 5],
  style = {},
}) => {
  const videoConfig = useVideoConfig();
  const canvasWidth = width ?? videoConfig.width;
  const canvasHeight = height ?? videoConfig.height;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    >
      <ThreeCanvas
        width={canvasWidth}
        height={canvasHeight}
        camera={{ position: cameraPosition, fov: cameraFov }}
      >
        <CameraRig
          cameraMode={cameraMode}
          basePosition={cameraPosition}
          target={cameraTarget}
        />

        {/* Cinematic Lighting System */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={dirLightPosition} intensity={dirLightIntensity} />
        <pointLight position={[-4, -3, 3]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[4, 4, 2]} intensity={0.6} color="#818cf8" />

        {/* Ambient Environment Particles */}
        {enableSparkles && (
          <Sparkles
            count={sparklesCount}
            scale={sparklesScale}
            size={2.5}
            speed={0.3}
            color={sparklesColor}
            opacity={0.6}
          />
        )}

        {/* User 3D Content */}
        {children}

        {/* Cinematic Post-Processing Bloom */}
        {enableBloom && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={bloomLuminanceThreshold}
              intensity={bloomIntensity}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </ThreeCanvas>
    </div>
  );
};

```

---

## File: `engines/remotion/src/shared/UserBrandOutro.tsx` <a id="file-engines-remotion-src-shared-userbrandoutro-tsx"></a>

```tsx
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import userBrandDefault from "../../../../brand/user-brand.json";

export interface UserBrandConfig {
  creatorName?: string;
  brandName?: string;
  tagline?: string;
  cta?: string;
  handle?: string;
  disclaimer?: string;
}

export interface UserBrandOutroProps {
  brand?: UserBrandConfig;
  headline?: string;
  highlightText?: string;
  accentColor?: string;
  secondaryAccent?: string;
  backgroundColor?: string;
  cardBackground?: string;
  progress?: number;
}

/**
 * UserBrandOutro — AI Video Factory V3
 *
 * Implements Brand Isolation Mandate:
 * 1. 100% Brand Isolation: Never uses sample video channels or author watermarks.
 * 2. Injects User Brand Identity (brand/user-brand.json).
 * 3. Mobile Layout 1080x1920 with high-contrast typography, CTA & legal disclaimer.
 */
export const UserBrandOutro: React.FC<UserBrandOutroProps> = ({
  brand = userBrandDefault,
  headline = "THEO DÕI ĐỂ KHÔNG BỎ LỠ",
  highlightText,
  accentColor = "#D4AF37",
  secondaryAccent = "#38BDF8",
  backgroundColor = "transparent",
  cardBackground = "rgba(15, 23, 42, 0.94)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  const creatorName = brand.creatorName || "Tiến Dương";
  const brandName = brand.brandName || "TÀI CHÍNH THỰC CHIẾN";
  const tagline = brand.tagline || "HOẠCH ĐỊNH TÀI CHÍNH · ĐẦU TƯ BỀN VỮNG";
  const cta = brand.cta || "Bình luận ý kiến của bạn bên dưới 👇";
  const handle = brand.handle || "@tienduong";
  const disclaimer = brand.disclaimer || "Số liệu mang tính chất tham khảo · Không phải khuyến nghị đầu tư";

  // Initials for avatar monogram
  const initials = creatorName
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  const finalHighlight = highlightText || brandName;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 56px",
        backgroundColor,
        zIndex: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: cardBackground,
          border: `2px solid ${accentColor}40`,
          borderRadius: 36,
          padding: "54px 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: `0 25px 70px rgba(0,0,0,0.85), 0 0 40px ${accentColor}25`,
          backdropFilter: "blur(20px)",
          transform: `scale(${0.9 + entrance * 0.1})`,
          opacity: entrance,
        }}
      >
        {/* Creator Emblem Monogram */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accentColor}, ${secondaryAccent})`,
            padding: 4,
            boxShadow: `0 0 40px ${accentColor}60`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#06090F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54,
              fontWeight: 900,
              color: accentColor,
              fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            }}
          >
            {initials}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.2,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {headline}
          <br />
          <span style={{ color: accentColor }}>{finalHighlight}</span>
        </div>

        {/* Creator Identity */}
        <h2
          style={{
            fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            margin: "8px 0 0 0",
          }}
        >
          {creatorName}
        </h2>

        <div
          style={{
            fontFamily: "'Barlow Condensed', 'Be Vietnam Pro', sans-serif",
            fontSize: 30,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          {brandName}
        </div>

        <div
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: "#94A3B8",
            marginTop: 8,
            maxWidth: 720,
          }}
        >
          {tagline}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            marginTop: 32,
            backgroundColor: `${accentColor}20`,
            border: `2px solid ${accentColor}`,
            borderRadius: 999,
            padding: "16px 36px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: `0 0 25px ${accentColor}30`,
          }}
        >
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            {cta}
          </span>
        </div>

        {/* Handle */}
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            fontWeight: 700,
            color: "#64748B",
            letterSpacing: "1px",
          }}
        >
          {handle}
        </div>

        {/* Legal Disclaimer */}
        <div
          style={{
            marginTop: 20,
            fontSize: 16,
            fontWeight: 500,
            color: "#475569",
            maxWidth: 680,
            lineHeight: 1.4,
          }}
        >
          {disclaimer}
        </div>
      </div>
    </div>
  );
};

```

---
