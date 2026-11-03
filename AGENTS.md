# AGENTS.md — AI VIDEO FACTORY V4 (BESPOKE)

## Mục tiêu

Workspace sản xuất video social bằng Codex/Antigravity theo triết lý **độc bản (bespoke)**: mỗi video là một tác phẩm được may đo riêng cho nội dung của nó. `styles/` và `dna-vault/` được giữ lại với tư cách **ngân hàng nguyên liệu tham khảo** — kho ý tưởng để sáng tạo, không phải khuôn để áp dụng. Các template và thư viện prompt mẫu của bên thứ ba đã bị loại bỏ. Thứ được chuẩn hoá chỉ gồm: hạ tầng kỹ thuật, quy trình, và cổng chất lượng.

- **Engine duy nhất**: Remotion (React, TypeScript) qua composition `BespokeVideo`.
- **Voiceover**: CIT Voice Studio (VieNeu-TTS local `:8001`, giọng "Hải Đăng" 48kHz, trích xuất timing từng từ).

## THỨ ĐƯỢC KHÓA — CHỈ 3 NHÓM NÀY, NGOÀI RA KHÔNG KHÓA GÌ HẾT

1. **Giọng đọc "Hải Đăng"** — giọng thương hiệu duy nhất. Không cấu hình nào được đổi giọng; CIT Voice Studio offline thì DỪNG và báo lỗi, cấm tự thay giọng khác (chỉ khi User cho phép rõ ràng mới dùng giọng thay thế). Tốc độ đọc KHÔNG khóa: chọn theo nội dung từng video qua trường `ttsSpeed` trong inputProps của project.
2. **Brand của User** (`brand/`: Tiến Dương / Manulife) — nạp cho mọi video, cấm brand của video mẫu/người khác.
3. **Cổng QC kỹ thuật** ở mục dưới — đó là chuẩn kỹ thuật, không phải khuôn sáng tạo.

Mọi mặc định còn lại (thang chữ trong design-system, cụm phụ đề 6 từ, vị trí phụ đề, palette gợi ý...) chỉ là điểm khởi đầu an toàn: **Art Direction Sheet có quyền ghi đè tất cả cho từng video**. Cấm chôn thêm bất kỳ thông số sáng tạo nào vào code dưới dạng hằng số bắt buộc.
- **An toàn dữ liệu**: Không xoá/di chuyển/hỏng dữ liệu trong `projects/` và `renders/`. Brand của User nằm ở `brand/` (user-brand.json, manulife/) — mọi video đều nạp brand này, cấm giữ brand của bất kỳ video mẫu/người khác nào.

---

## ⚖️ LUẬT TỐI CAO: SÁNG TẠO ĐỘC BẢN — CẤM KHUÔN

> Luật này cao hơn mọi hướng dẫn khác. Mâu thuẫn thì luật này thắng.

**ĐIỀU 1 — KHÔNG ÁP KHUÔN; NGUYÊN LIỆU THÌ ĐƯỢC MƯỢN, PHẢI BIẾN ĐỔI:**
- `styles/` và `dna-vault/` là tài liệu tham khảo sáng tạo: agent ĐƯỢC đọc để lấy ý — palette, nhịp cắt, kỹ thuật chuyển động, số liệu đo, cấu trúc giữ chân người xem.
- Cấm tuyệt đối: (a) import code từ `styles/` vào engine hay project (không còn registry, không còn alias `@styles`, không còn cơ chế áp style bằng máy); (b) áp nguyên một style hoặc một DNA profile vào video; (c) clone bố cục của video mẫu. Mượn ý tưởng là bắt buộc phải biến đổi: phong cách cuối cùng của mỗi video là một bản TỔNG HỢP MỚI, sinh ra từ kịch bản của chính video đó.
- Art Direction Sheet của mỗi video phải ghi rõ: đã mượn nguyên liệu gì từ kho tham khảo, và đã biến đổi nó như thế nào cho nội dung này.
- Cấm bố cục "thẻ/hộp chứa 1 icon đứng giữa khung + chữ chạy bên dưới" làm bố cục chính. Thẻ chỉ được dùng khi nội dung là bảng số liệu/so sánh, Director ghi lý do trong Blueprint, và tổng thời lượng cảnh dạng thẻ ≤ 30% video.
- Code dựng cảnh của mỗi video sống trong thư mục project của video đó (`projects/<id>/`). **Cấm đưa bố cục của một video vào `engines/remotion/src/shared/` để tái sử dụng cho video khác** — đó là cách khuôn tái sinh.

**ĐIỀU 2 — ART DIRECTION SHEET TRƯỚC KHI CODE:**
Mỗi video, trước khi viết code, Director bắt buộc xuất Art Direction Sheet (mẫu trong `rules/bespoke-creativity.md`) gồm: (1) Ẩn dụ thị giác sinh ra từ nội dung; (2) Ngôn ngữ hình ảnh chủ đạo; (3) Palette & chất liệu theo cảm xúc chủ đề; (4) Ngôn ngữ chuyển động riêng. Chưa được User duyệt = không code.

**ĐIỀU 3 — HÌNH PHẢI TỰ KỂ ĐƯỢC CÂU CHUYỆN:**
Chuẩn chất lượng để soi (mô tả chuẩn, không phải template để copy):
- **Chuẩn A — Ẩn dụ tiến hoá liên tục:** một hình tượng trung tâm biến đổi/tăng trưởng xuyên suốt video, đi cùng mạch nội dung (ví dụ: cái cây lớn dần theo các cột mốc của một kế hoạch tài chính dài hạn).
- **Chuẩn B — Sơ đồ sống:** các sơ đồ/sơ đồ cơ chế tự vận động để giải thích (rẽ nhánh kịch bản, mức quỹ vơi dần theo thời gian...), chữ chỉ đóng vai trò chú thích.
Một cảnh mà tắt tiếng vẫn không hiểu hình đang nói gì = cảnh hỏng, làm lại.

**ĐIỀU 4 — KẾT HỢP ÍT NHẤT 3 KỸ THUẬT:** animated chart, kinetic typography, SVG diagram/path animation, 3D stage, map, timeline, particles... tuỳ nội dung. Cấm dùng 1 loại component lặp cho toàn video. Danh mục khả năng xem ở `config/component-index.json` — đó là danh mục *công cụ*, không phải danh mục phong cách.

**ĐIỀU 5 — KIỂM TRA CHỐNG RẬP KHUÔN TRƯỚC RENDER:**
- Bố cục giống video trước → làm lại Art Direction.
- Trên 50% cảnh là bố cục thẻ/hộp → làm lại Art Direction.
- Cảnh nào chỉ có 1 phần tử đứng yên giữa khung quá 3 giây → làm lại cảnh đó.

---

## QUY TRÌNH SẢN XUẤT (7 bước, không nhảy bước ở chế độ duyệt)

1. **Brief**: 1 video = 1 ý chính. Nội dung quá tải thì tách thành nhiều video, không nén.
2. **Art Direction Sheet** → chờ User duyệt (Điều 2). **Cấm fast-track dưới mọi hình thức**: Gate 1 (kịch bản) và Gate 2 (Art Direction) phải do User duyệt thật qua lệnh `approve`; `make` sẽ dừng nếu chưa duyệt. Không tồn tại cơ chế tự duyệt hay "hướng standard" nào trong nhà máy này.
3. **Kịch bản**: số cảnh N do nội dung quyết định (cấm fix cứng số cảnh); mỗi cảnh 4-12 giây; hook phải nằm trong 3 giây đầu; viết bằng giọng nói tự nhiên (skill `humanizer`, `reels-scripting`).
4. **Voice & Timing**: CIT Voice Studio, lấy timing từng từ; chừa nhịp nghỉ giữa các cảnh.
5. **Dựng cảnh**: code riêng trong `projects/<id>/`, dùng composition `BespokeVideo` làm sân khấu (nền + phụ đề đồng bộ + brand outro + tiến trình). Dùng toolbox ở `engines/remotion/src/shared/` (primitives, 3D stage, finance primitives) và các skill khả năng (`gsap-skills`, `motion-ai-kit`, `remotion-markup`, `remotion-best-practices`).
6. **Kiểm tra frame tĩnh từng cảnh** (tràn chữ, che chữ, khoảng trống chết) trước khi render final.
7. **Render + QC cứng** (mục dưới). Pass mới có file final.

Đầu vào là video quay sẵn (talking-head): dùng skill `auto-footage` (jump-cut + overlay), vẫn áp dụng Luật Tối Cao cho phần overlay.
Đầu vào là video mẫu để học: dùng `npm run dna -- analyze <video>` để đo (nhịp cắt, LUFS, mật độ) và lưu kết quả vào `dna-vault/` làm tài liệu tham khảo, hoặc đo nhanh không lưu bằng `core/scripts/validate/reference.js`. Chỉ học *nhịp và số liệu*, cấm copy bố cục, và phân tích DNA **không bao giờ** tự sinh style.

---

## CỔNG CHẤT LƯỢNG (HARD GATES — fail là dừng, không xuất final)

Bộ kiểm định: `tests/e2e/test_final_video.cjs`, chạy bắt buộc trong `npm run make`.

- Khổ hình 1080×1920 (9:16) trừ khi brief ghi khác; 30fps; H.264 + AAC stereo 48kHz.
- Thời lượng theo brief (mặc định 45-90 giây).
- **Âm lượng: Integrated Loudness -14 đến -12 LUFS; True Peak < -1.0 dBFS; LRA < 8 LU.**
- **Freeze: không đoạn đứng hình nào quá 3 giây.** Không blackout.
- Phụ đề khớp timing giọng đọc; chỉ từ đang đọc được highlight; không SFX (chỉ giọng đọc + BGM nền -18..-22dB nếu có).
- Font tiếng Việt chuẩn (Be Vietnam Pro ưu tiên); cấm cắt chữ, cấm co chữ, cấm render khung rỗng.
- Video phải có Brand Outro của User.

---

## BẢNG SKILLS & VAI TRÒ

| Skill | Vai trò |
| :--- | :--- |
| `reels-scripting` | Cấu trúc kịch bản ngắn, hook 3 giây, nhịp theo timecode |
| `humanizer` | Khử giọng AI, lời thoại tự nhiên như người nói |
| `remotion-explainer` | Quy trình dựng bespoke trong Remotion (đã viết lại theo file này) |
| `gsap-skills` | Diễn hoạt biểu đồ, đồ thị SVG, timeline phức tạp |
| `motion-ai-kit` | Spring physics, easing, audit chuyển động |
| `remotion-markup` | Quy chuẩn JSX/TSX, layout mobile an toàn |
| `remotion-best-practices` | Chuẩn kỹ thuật Remotion, hiệu năng render |
| `auto-footage` | Jump-cut + overlay cho video quay sẵn |

Prompt lõi dùng khi sản xuất (chỉ các file này): `prompts/story-director.md`, `prompts/creative-director.md`, `prompts/hook-crafter.md`, `prompts/production-agent.md`, `prompts/reference-analyzer.md`, `prompts/video-personas.md`.

## LỆNH THƯỜNG DÙNG

- `npm run doctor` — kiểm tra sức khoẻ hệ thống (Voice Studio, Remotion, FFmpeg).
- `npm run services` — khởi động CIT Voice Studio.
- `npm run studio` — mở Remotion Studio.
- `npm run make -- --project <id>` — kiểm tra Gate 1/2 đã duyệt → TTS → render → verify (fail QC = dừng, không final).
- `npm run verify -- --target <file.mp4>` — chạy bộ kiểm định độc lập.
- `npm run dna -- analyze <video.mp4>` — đo video mẫu và lưu vào dna-vault làm tài liệu tham khảo (không sinh style).
- `node core/scripts/validate/reference.js <video.mp4>` — đo thông số video mẫu (JSON, không lưu gì).
- `npm test`, `npm run typecheck`, `npm run lint` — kiểm tra code.
