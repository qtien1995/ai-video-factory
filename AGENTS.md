# AGENTS.md — AI VIDEO FACTORY V3 (STREAMLINED & AUTONOMOUS)

## Mục tiêu

Đây là workspace sản xuất video social tối ưu bằng Codex/Antigravity. Mục tiêu là video hoàn chỉnh, visual storytelling cuốn hút, thiết kế chuẩn mobile 9:16 (kiểm tra trên viewport 360×640).

- **Engine chính duy nhất**: **Remotion** (React, TypeScript, Tailwind/CSS).
- **Voiceover**: Bắt buộc tạo giọng đọc qua **CIT Voice Studio** (VieNeu-TTS local AI `:8001`, mặc định: "Hải Đăng" 48kHz studio, trích xuất timing word thật).
- **Chiến lược phát triển tối thượng**: **Copy & Clone DNA từ Video Mẫu Chuyên Nghiệp 100% (Zero-Media, 100% Code-Ready)**. Bóc tách từng mili-giây, từng chuyển động, layout và nhịp điệu của các video viral để tái hiện hoàn hảo bằng code.
- **An toàn dữ liệu**: Không xóa, di chuyển hoặc làm hỏng các project video cũ trong `projects/` hoặc bản xuất trong `renders/`.

---

## QUY TRÌNH BÓC TÁCH & CLONE DNA "ZERO-MEDIA, 100% CODE-READY"

Khi người dùng cung cấp một video mẫu (file `.mp4`, đường dẫn, hoặc link video):

```text
VIDEO MẪU (MP4 / ĐƯỜNG DẪN)
➔ BƯỚC 1: BÓC TÁCH THÔNG SỐ TRONG BỘ NHỚ (`npm run dna -- analyze <path> [--name <style-name>]`)
  ├─ Trích xuất Technical Specs (Resolution, FPS, Codec, Duration) bằng FFprobe
  ├─ Bắt Scene Cuts chính xác (mili-giây) bằng FFmpeg select filter vào mảng `cutTimestampsMs`
  ├─ Đo đạc âm thanh EBU R128 thực tế (Integrated LUFS, True Peak, LRA)
  └─ ZERO-MEDIA MANDATE: Tuyệt đối KHÔNG lưu file video, audio (.wav/.mp3), frame ảnh hay contact sheet vào đĩa
➔ BƯỚC 2: XUẤT 3 FILE LẬP TRÌNH DUY NHẤT VÀO `dna-vault/<id>/`
  ├─ 1. `dna.json`: Thông số đo đạc thực tế (`metadata`, `rhythmAndPacing` với `cutTimestampsMs`) + design tokens
  ├─ 2. `README.md`: Báo cáo giải phẫu 5 tầng DNA & bí quyết giữ chân người xem (Retention Secrets)
  └─ 3. `replication-prompt.md`: Cẩm nang hướng dẫn kỹ thuật cho Dev & AI tái tạo 100% phong cách bằng code Remotion
➔ BƯỚC 3: TỰ ĐỘNG ĐỒNG BỘ VÀO THƯ VIỆN STYLE TẬP TRUNG (`styles/<style-name>/`)
  ├─ Tự động sinh `style.json` (chuẩn schema) + `theme.ts` (TypeScript dùng ngay cho Remotion)
  └─ Tự động đăng ký vào `styles/registry.json` và export qua alias `@styles`
```

> [!CAUTION]
> **LUẬT CÁCH LY THƯƠNG HIỆU & OUTRO BẮT BUỘC (BRAND ISOLATION MANDATE)**:
> 1. **Mọi video đều cần có Outro Thương hiệu**: Tạo điểm dừng kết thúc chuyên nghiệp, kêu gọi hành động (CTA), ghi nhớ thương hiệu và tuân thủ pháp lý/disclaimer.
> 2. **CẤM 100% giữ lại thương hiệu của video mẫu**: Khi bóc tách video tham khảo, tuyệt đối KHÔNG mang tên kênh, logo, slogan, watermark hay hotline của tác giả gốc (như HODL.VN, Cường IT...) vào code sản phẩm.
> 3. **Tự động thay thế bằng Thương hiệu của User**: Toàn bộ Outro, Eyebrow và Watermark bắt buộc nạp thông tin nhận diện của User (được định cấu hình tại `brand/user-brand.json`).

---

## CƠ CHẾ TỔNG ĐẠO DIỄN TỰ ĐỘNG PHỐI HỢP 10 SKILLS (AUTONOMOUS MULTI-SKILL ORCHESTRATION)

Hệ thống sở hữu 10 Skills tinh gọn trong `.agents/skills/`. Khi làm việc với User, Agent đóng vai **Master AI Director**, tự động điều phối các skill theo 2 ngữ cảnh:

### 1. KHI USER CUNG CẤP VIDEO MẪU VÀ YÊU CẦU HỌC / PHÂN TÍCH DNA:
- **Bước 1**: Chạy `npm run dna -- analyze <video> [--name <style-name>]` để trích xuất bộ khung số liệu kỹ thuật vào `dna-vault/<id>/`.
- **Bước 2**: Tự động dùng tri thức chuyên gia của Agent (tổng hợp từ `motion-ai-kit`, `gsap-skills`, `remotion-explainer`, `reels-scripting`) để phân tích sâu, hoàn thiện bảng màu thực tế, cấu trúc `visualComponents`, `sceneTimelineBlueprint` vào `dna.json` và hoàn thiện `replication-prompt.md` mà không lưu lại bất kỳ file media hay ảnh cắt frame nào trên đĩa.

### 2. KHI USER CUNG CẤP NỘI DUNG / Ý TƯỞNG VÀ YÊU CẦU LÀM VIDEO:
Agent **BẮT BUỘC** đóng vai **Master AI Director**, tự động lập **Bản Kế Hoạch Đạo Diễn (Director's Blueprint)** trình bày rõ cho User biết các Skill sẽ phối hợp với nhau theo 4 chặng:

```text
BẢN KẾ HOẠCH ĐẠO DIỄN (DIRECTOR'S BLUEPRINT)
────────────────────────────────────────────────────────────────────────────────
➔ CHẶNG 1: TIỀN KỲ & KỊCH BẢN (PRE-PRODUCTION & SCRIPTING)
  ├─ [prompts-chat]     : Kích hoạt Persona chuyên gia & ẩn dụ thị giác (Visual Metaphor) cho Hook mở đầu.
  ├─ [reels-scripting]  : Phân rã cấu trúc Scene chuẩn nhịp cắt DNA, viết Hook 3s đầu giữ chân (High Retention).
  └─ [humanizer]        : Viết lại toàn bộ lời thoại sang ngôn ngữ nói tự nhiên của người Việt, khử giọng AI robot.

➔ CHẶNG 2: GIỌNG ĐỌC & ĐỒNG BỘ THỜI GIAN THỰC (VOICEOVER & TIMING)
  └─ [cit-voice-studio] : Gọi VieNeu-TTS local (:8001, giọng Hải Đăng studio 48kHz), trích xuất timing chuẩn từng từ.

➔ CHẶNG 3: PHỐI TRỘN DNA & LẬP TRÌNH THỊ GIÁC (VISUAL CODE & DNA MIXING)
  ├─ Tự động Mix & Match tokens từ `dna-vault/` và `styles/` phù hợp với nội dung.
  ├─ [remotion-explainer]        : Dựng thẻ 2.5D Spatial Glass HUD hoặc 3D ThreeCanvas trung tâm.
  ├─ [gsap-skills]               : Diễn hoạt biểu đồ đua tài sản, nến TradingView, số liệu nhảy hoặc đường cong SVG.
  ├─ [motion-ai-kit]             : Tính toán thông số Spring physics (damping, stiffness, mass) theo cảm xúc từng cảnh.
  ├─ [remotion-markup & best-practices] : Lập trình React component / spec tuân thủ Safe Zone 9:16 và tối ưu render.
  └─ [auto-footage]              : (Chỉ kích hoạt nếu đầu vào là video quay sẵn talking-head để jump-cut & chèn overlay).

➔ CHẶNG 4: RENDER, CHUẨN HÓA EBU R128 & KIỂM ĐỊNH (RENDER & QUALITY GATE)
  ├─ Render trực tiếp Final MP4 qua Remotion CLI với props động `inputProps.json`.
  ├─ Chuẩn hóa âm lượng EBU R128: -12.5 LUFS, True Peak < -1.0 dBFS.
  └─ Chạy kiểm thử E2E 4-Tier: `npm run verify -- --project <dir>`.
```

---

## 2 Chế Độ Thực Hiện Khi Sản Xuất Video

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
   - Đối với các dự án y sinh/công nghệ: Dùng `@remotion/three` (`<ThreeCanvas>`), `@react-three/fiber` cho vật thể trung tâm kết hợp thẻ `SpatialHUDCard` (2.5D Spatial Glass HUD) với perspective 3D, 4 góc brackets `[ ]` và tia quét laser.
   - CẤM HOÀN TOÀN việc vẽ minh họa trung tâm bằng hình học `<svg>` 2D phẳng đơn giản.

---

## Bảng Tra Cứu 10 Skills & Vai Trò Trong Xưởng

| STT | Tên Skill | Chức năng trong Factory |
| :--- | :--- | :--- |
| 1 | `prompts-chat` | Khai thác thư viện 1.100+ prompt và Role-Playing Personas để nhập vai chuyên gia, gợi mở visual metaphors và hook độc đáo. |
| 2 | `reels-scripting` | Cấu trúc hóa kịch bản video ngắn giữ chân cao (3s Hook, Problem, Solution, CTA) theo nhịp timecode chính xác. |
| 3 | `humanizer` | Khử văn phong máy móc của AI, tinh chỉnh câu từ tự nhiên, ấm áp như người thật nói chuyện. |
| 4 | `cit-voice-studio` | Tạo giọng đọc AI chất lượng studio 48kHz (VieNeu-TTS local `:8001`) và trích xuất timing từng từ. |
| 5 | `remotion-explainer` | Thiết kế không gian 3D WebGL và thẻ 2.5D Spatial Glass HUD cho video explainer dọc 9:16. |
| 6 | `gsap-skills` | Diễn hoạt biểu đồ đua tài sản (Bar Chart Race), nến chứng khoán, vẽ đồ thị SVG và timeline tweening phức tạp. |
| 7 | `motion-ai-kit` | Tính toán cấu hình Spring physics (damping, stiffness, mass), hàm linear() và audit MotionScore. |
| 8 | `remotion-markup` | Quy chuẩn JSX/TSX layout an toàn mobile, trigger animation theo frame và tối ưu luồng hiển thị text. |
| 9 | `remotion-best-practices` | Tiêu chuẩn kỹ thuật Remotion, Rules of Hooks, dynamic metadata, composition props và hiệu năng render. |
| 10 | `auto-footage` | Tự động jump-cut khoảng lặng và chèn motion graphic overlays cho video quay sẵn (talking-head). |

---

## Factory CLI & Lệnh Tắt Nhanh

- `npm run check`: **Kiểm tra toàn diện sức khỏe hệ thống (Voice Studio, Remotion, FFmpeg, Dung lượng)**.
- `npm run start`: **Khởi động dịch vụ giọng đọc AI ngầm (CIT Voice Studio VieNeu-TTS `:8001`)**.
- `npm run studio`: **Mở giao diện xem trước Remotion Studio trực quan**.
- `npm run make -- --project <tên_folder>`: **Lệnh 1 chạm: Tạo giọng TTS -> Render MP4 -> Kiểm định EBU R128 -> Đóng gói**.
- `npm run dna -- analyze <video-file> [--name <style-name>]`: **Bóc tách video mẫu Zero-Media, sinh 3 file: `dna.json`, `README.md`, `replication-prompt.md`**.
- `npm run dna -- list`: **Xem danh mục toàn bộ DNA Profiles trong `dna-vault/`**.
- `npm run dna -- prompt <id>`: **Xem cẩm nang kỹ thuật `replication-prompt.md` của một DNA Profile**.
- `npm run style -- list`: **Xem danh mục toàn bộ Style trong `styles/`**.
- `npm run clean`: **Dọn dẹp nhanh các file rác tạm sinh ra sau render**.
- `npm run verify -- --project <dir>`: **Chạy bộ kiểm thử E2E 4-Tier kiểm tra file MP4 xuất xưởng**.
