# AGENTS.md — AI VIDEO FACTORY V2

## Mục tiêu

Đây là workspace sản xuất video social bằng Codex. Mục tiêu là video hoàn chỉnh, dễ xem trên điện thoại và có visual storytelling; không tối ưu chỉ để code đẹp.

Engine chính: **Remotion** (React, TypeScript, CSS). HyperFrames (HTML, SVG, JS, GSAP) được dùng làm phương án thay thế nhẹ tải hoặc khi bài toán tối ưu riêng cho vector GSAP.

Không xóa, di chuyển hoặc làm hỏng các project video cũ. Khi yêu cầu chỉ cập nhật quy tắc/hướng dẫn, chỉ áp dụng cho video tạo mới; không sửa hay render lại video đã làm.

## Pipeline chuẩn & Chốt chặn kiểm duyệt (Gates)

```text
INPUT (Ý tưởng / URL / Tài liệu)
→ XÁC ĐỊNH ĐỊNH DẠNG VIDEO (BẮT BUỘC hỏi người dùng chọn loại video: Auto Footage, Vox Style, Remotion Explainer, Whiteboard Video...)
→ STORY & CREATIVE PASS
→ GATE 1: Duyệt Kịch bản & Định hướng hình ảnh (DỪNG LẠI CHỜ DUYỆT)
→ CHUẨN BỊ MEDIA & PROMPT (Chạy song song)
  ├─ Voice: BẮT BUỘC dùng /cit-voice-studio (Hải Đăng 48kHz, trích xuất timing word thật)
  └─ TẠO PROMPT: Xuất file `production_prompts.md` (Image, Video, Chaining Guide) cho Flow/Vox.
→ GATE 2: Asset Handoff (DỪNG LẠI CHỜ DUYỆT - Bỏ qua nếu là Auto Footage/Remotion). User tự tạo video trên Google Flow và nạp vào thư mục `assets/clips/`.
→ Hậu kỳ & Code Composition (Cắt ghép khớp Voice / Remotion / FFmpeg)
→ QA, Tự sửa lỗi & PACKAGE (Sinh Thumbnail, Caption, SEO metadata)
→ GATE 3: Báo cáo QA & Xác nhận duyệt Render Final + Đăng tải (DỪNG LẠI CHỜ DUYỆT)
→ Final video MP4 hoàn chỉnh
→ Feedback → Failure → Candidate Rule → Promote
```

> [!IMPORTANT]
> **NGUYÊN TẮC BẮT BUỘC VỀ CHỐT CHẶN (GATES) & CHẾ ĐỘ SẢN XUẤT (DUAL-MODE)**:
> 1. **Bắt buộc hỏi loại video ngay từ đầu**: Khi nhận ý tưởng/brief, Agent **phải hỏi người dùng muốn sản xuất video theo định dạng nào** trước khi triển khai.
> 2. **Chế độ sản xuất (Dual-Mode)**:
>    - **Strict Mode (Mặc định)**: Dành cho video quan trọng, phóng sự chuyên sâu, video thương hiệu. Agent bắt buộc dừng lại ở từng chốt chặn (**Gate 1 ➔ Gate 2 ➔ Gate 3**) để người dùng trực tiếp kiểm duyệt và phản hồi.
>    - **Fast-Track Mode (`fast-track`)**: Dành cho video social tin tức ngắn, review hoặc template đã chuẩn hóa (`remotion-template`, `auto-footage`). Tự động duyệt qua Gate 1 & 2 theo template và chỉ dừng lại duy nhất ở **Gate 3 (Báo cáo QA & Duyệt Render Final)**.
> 3. **Bắt buộc kiểm tra sức khỏe trước khi chạy (`doctor`)**: Luôn chạy `node core/scripts/factory/index.js doctor` trước khi bắt đầu để đảm bảo CIT Voice Studio (:8001) và FFmpeg sẵn sàng. (FlowKit CLI có thể dùng cho tasks phụ nhưng media generation là manual).
> 4. **Bắt buộc dùng `/cit-voice-studio` cho tất cả video**: Mọi video sản xuất trong workspace bắt buộc tạo giọng đọc qua **CIT Voice Studio** (`http://127.0.0.1:8001`, giọng mặc định: "Hải Đăng" 48kHz studio hoặc các giọng trong danh sách CIT). Giọng đọc là Master Timeline duy nhất — không dựng hình khi chưa có narration và timing thật.

## 4 Workflows sản xuất chính

Tùy theo loại nội dung đầu vào được người dùng chọn, hệ thống điều hướng vào 4 luồng tinh gọn:
1. **Auto Video / Footage (`auto-footage`)**:
   - **Đầu vào**: Video quay sẵn (talking-head, review clip, podcast).
   - **Xử lý**: Tự cắt khoảng lặng (jump-cut) ➔ Tạo phụ đề động (word/chunked) ➔ Chèn motion graphic overlays (`component-library/overlays/` như breaking-news, stat-callout, split-screen, quote-card).
   - **Lưu trữ**: `projects/auto-cuts/CNT-[YYYYMMDD]-[TEN-DU-AN]`.
2. **Vox Style (`vox-director`)**:
   - **Đầu vào**: Chủ đề phóng sự, tài chính, điều tra, lịch sử.
   - **Xử lý**: Lên kịch bản beat & Hướng hình ảnh ➔ Duyệt Gate 1 ➔ Xuất file `production_prompts.md` (gồm Video Prompt, Image Prompt, Chaining Guide) ➔ User tự tạo clip trên Google Flow và gắp file vào `assets/clips/` (Gate 2) ➔ Ghép giọng CIT Voice Studio Hải Đăng ➔ Agent tự động đo timing clip, cắt xén (retime) khớp voice + Phụ đề ASS Glassmorphism highlight từng từ + EBU R128 + Final MP4.
   - **Lưu trữ**: `projects/vox-style/CNT-[YYYYMMDD]-[TEN-DU-AN]`.
3. **Remotion Template (`remotion-template`)**:
   - **Đầu vào**: Kịch bản giải thích kiến thức ngắn 45–60 giây.
   - **Xử lý**: Áp dụng khung 6 cảnh chuẩn Cường IT (`templates/cuongit-explainer/` gồm Hook, Pain Point, Solution, Workflow, Benefits, Outro) kết hợp 6 Card Archetypes (`rules/card-archetypes.md`) ➔ Ghép giọng CIT Voice Studio Hải Đăng ➔ Chạy trực tiếp trên động cơ `engines/remotion` dùng chung ➔ Render Final MP4.
   - **Lưu trữ**: `projects/social-shorts/CNT-[YYYYMMDD]-[TEN-DU-AN]` hoặc `projects/financial-insurance/`.
4. **Whiteboard Video (`whiteboard-video`)**:
   - **Đầu vào**: Kịch bản phân cảnh vẽ tay, bài giảng, giải thích logic.
   - **Xử lý**: Sử dụng Python và FFmpeg để render hiệu ứng bàn tay vẽ (drawing hand) bám theo path SVG/ảnh PNG mask. Tự động sinh giọng đọc TTS ➔ Đồng bộ nét vẽ theo Audio ➔ Ghép bàn tay chuyển động ➔ Xuất Final MP4.
   - **Lưu trữ**: `projects/explainers/CNT-[YYYYMMDD]-[TEN-DU-AN]` (hoặc thư mục mới tuỳ thuộc logic dự án).

## Factory CLI

Chạy từ thư mục `D:\VIDEO AI`: `node core/scripts/factory/index.js <lệnh> --project <id>`.
- `doctor`: Kiểm tra sức khỏe hệ thống (CIT Voice Studio, FlowKit, FFmpeg, Workspace).
- `status` và `next`: Chỉ đọc trạng thái quy trình.
- `fast-track`: Tự động duyệt qua Gate 1 & Gate 2 cho các template chuẩn.
- `record --stage <STAGE> [--artifact <file>]`: Ghi nhận hoàn thành một stage sau khi kiểm tra file.
- `approve --gate GATE1|GATE2|GATE3 --evidence "lời duyệt của người dùng"`: Phê duyệt chốt chặn.
- `tts`: Tạo voice và đo lại timing thật bằng FFprobe.
- `render --kind preview|final`: Chạy engine, ghép narration, đo loudness EBU R128 và tạo contact sheet.
- `package`: Tự động trích xuất 3 thumbnails (hook, climax, outro), sinh metadata SEO/social và caption sẵn sàng đăng tải vào `output/dist/`.
- `check`: Phát hiện lệch state/file; `dirty --stage <STAGE>`: Mở lại bước đã đổi và các bước sau.

Thứ tự điều phối: `SCRIPT → CREATIVE_DIRECTION → GATE1 → PROMPTS_GENERATION → GATE2 → TTS & POST_PRODUCTION → FINAL_QA & PACKAGE → GATE3 → FINAL_RENDER → DONE`.
Ghi `POST_PRODUCTION` sau khi spec/engine sẵn sàng; ghi `FINAL_QA` với `--artifact qc.md --reviewed` sau khi xem contact sheet/video.
State cũ cần kiểm tra lại; không suy từ file cũ rằng người dùng đã duyệt. Chỉ dùng `projects/<id>/output/` cho video do CLI mới xuất.

## STORY & CREATIVE PASS (Gate 1)

- **STORY PASS**: Nghiên cứu nguồn, tách FACT (có nguồn) và INSIGHT (suy luận). Core message, full narration, beats. Mỗi beat bắt buộc có `meaning` và `visualAction`. Lưu nguồn vào `sources.md`. Đầu ra: `script.md`, `beats.json`.
- **CREATIVE PASS**: Đề xuất tối đa 3 phương án thực sự khác nhau (hook visual, visual state changes, camera grammar). Ưu tiên continuous transformation. Tránh kiến trúc `beat → ảnh → zoom → ảnh tiếp`.
- **GATE 1 (PRE-PRODUCTION)**: Người dùng duyệt chung Script + Beats + Creative Direction. Khóa Story + Concept, không tự ý thay đổi Big Idea hoặc fact sau gate này.

## PRODUCTION PROMPTS & ASSET HANDOFF (Gate 2)

> [!IMPORTANT]
> **QUY TRÌNH MANUAL FLOW CHO VOX**:
> Đối với các video dùng AI sinh cảnh (Google Flow), Agent đóng vai trò **Đạo diễn**:
> 1. Xuất tài liệu `production_prompts.md` cho người dùng.
> 2. Tài liệu bắt buộc có: **Image Prompt**, **Video Prompt**, và **Chaining Guide** (hướng dẫn thao tác để 2 cảnh nối tiếp mượt mà, VD: "Dùng ảnh cuối cảnh 1 làm first frame của cảnh 2" hoặc "Morph/Pan right").
> 3. **Dừng lại (Gate 2)** chờ User tải video từ Google Flow về, đổi tên theo đúng số thứ tự cảnh (VD: `01_hook.mp4`, `02_problem.mp4`) và thả vào thư mục `projects/<id>/assets/clips/`. Không được tiến hành Hậu kỳ khi chưa có đủ file.

## VISUAL STORYTELLING & HẬU KỲ

> [!IMPORTANT]
> **BẮT BUỘC ĐỌC TÀI LIỆU THIẾT KẾ CHI TIẾT TRƯỚC KHI CODE**:
> Trước khi dựng cảnh hoặc viết code Remotion/HyperFrames, Agent **BẮT BUỘC** dùng tool `view_file` đọc:
> 1. [`rules/visual-storytelling.md`](file:///d:/AI/VIDEO%20AI/rules/visual-storytelling.md) — Chi tiết thiết kế thẻ, ngắt dòng, phân bổ dọc, phụ đề và kiểm tra thực tế trên 360×640.
> 2. [`rules/card-archetypes.md`](file:///d:/AI/VIDEO%20AI/rules/card-archetypes.md) — 6 bố cục thẻ mẫu chuẩn (Hero Metric, Comparison, Feature Grid, Step Flow, Checklist, Quote).

### Hàng rào an toàn thị giác bắt buộc (Hard Constraints):
1. **Thiết kế riêng từng thẻ**: Một ý chính rõ ràng, phân cấp tiêu đề / nội dung / số liệu / điều kiện. Font size và token chỉ là điểm thử, tiêu chí tối thượng là khả năng đọc rõ ràng trên mobile viewport 360×640.
2. **CẤM cắt chữ**: Nghiêm cấm dùng `overflow: hidden`, `text-overflow: ellipsis`, hoặc `-webkit-line-clamp` để giấu chữ thừa. Cấm tự co chữ (shrink-to-fit) làm nát layout. Khi chật: chỉnh lại lượng chữ (đối chiếu voice), ngắt dòng, chia nhịp hoặc tăng diện tích trước khi giảm cỡ chữ.
3. **CẤM render khung rỗng**: Khi title/description/content rỗng hoặc undefined, component phải `return null`, tuyệt đối không render wrapper có viền/nền trống.
4. **Phụ đề theo từ (Speech-Synced Subtitles)**:
   - Chuẩn bị cụm ngắn trước theo nghĩa và dấu câu. Hiện sẵn toàn bộ cụm khi bắt đầu đọc cụm.
   - **Chỉ từ đang đọc đổi màu highlight**. CẤM đổi cỡ chữ, độ đậm, scale (không dùng `scale(1.15)`) hoặc vị trí làm nhảy dòng/rung chữ.
   - **Zero Speech = Zero Sub**: Khi im lặng (`activeIndex === -1`), ẩn hoàn toàn cả chữ lẫn khung nền phụ đề (`return null`).
5. **Visual Action có nghĩa**: Mỗi beat bắt buộc có visual action cụ thể (`grow`, `draw`, `flow`, `fill`, `stack`, `split`, `merge`, `morph`, `expand`, `focus`, `reveal`, `highlight`...).
6. **Mobile Safe Zones**: Phân bố thị giác cân đối dọc theo khung 9:16 (trải từ `y: 260` đến `y: 1550`), tránh dồn cục ở nửa trên bỏ trống nửa dưới. Chừa an toàn cho UI nền tảng và thanh phụ đề.

## RESEARCH & NỘI DUNG NHẠY CẢM

- Ưu tiên nguồn chính thức, cơ quan nhà nước, tài liệu gốc, báo cáo ngành. Tuyệt đối không bịa số liệu, điều khoản luật, lãi suất, quyền lợi bảo hiểm hay phát biểu.
- Với bảo hiểm: Không fear-mongering, không brochure narration, không hàm ý cam kết chung; claim sản phẩm phải dựa vào tài liệu chính thức hiện hành.

## QA, PACKAGE & TIÊU CHUẨN XUẤT XƯỞNG (Gate 3)

Trước khi báo duyệt hoàn tất:
1. **Thực hiện bước Package**: Sinh Thumbnail (từ hook, climax, outro), sinh SEO Metadata và Caption đăng tải.
2. **Visual & Layout QA**:
   - Render frame tại thời điểm toàn bộ chữ của từng cảnh/thẻ đã xuất hiện ổn định (kiểm tra cả ảnh gốc và bản thu nhỏ 360×640).
   - Kiểm tra không tràn lề, không cắt chữ, không đè phụ đề. Tự sửa và render lại đến khi đạt; ghi frame/time và kết quả thực tế vào `qc.md`.
3. **Audio & Loudness (EBU R128 Bắt buộc)**:
   - `Integrated Loudness`: **-14 đến -12 LUFS** (chuẩn **-12.5 LUFS** cho TikTok/Reels/Shorts).
   - `Loudness Range (LRA)`: **< 8 LU** (chống tình trạng câu to câu nhỏ giữa các beat).
   - `True Peak`: **< -1.0 dBFS** (chống méo tiếng / digital clipping).
4. **Kỹ thuật & Delivery Contract**:
   - Codec H.264/AAC, 1080×1920, 30fps, khớp thời lượng voice 100%.
   - Dùng FFprobe kiểm tra trực tiếp file MP4 xuất xưởng; FFmpeg trích frame từ chính MP4 đó để kiểm tra; exit code hoặc lint không chứng minh hình ảnh đạt.
   - **Duy nhất 1 file MP4 bàn giao**: Xuất và cập nhật chính file `projects/<id>/output/final.mp4`. Cấm giao preview/v001/v002.

## Learning Loop

Feedback/lỗi lặp lại ghi theo: `Failure → Root cause → Candidate rule → Test → Promote`.
- Candidate đang thử nghiệm lưu tại `learning/candidates/`.
- Sau khi kiểm chứng thành công qua thực tế, promote vào `AGENTS.md` / `rules/` và di chuyển candidate vào `learning/archive/`.
