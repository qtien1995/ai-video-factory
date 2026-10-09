# Video Factory V2 Changelog

## 2026-10-04 — Rules System Refactor & Learning Candidates Consolidation

- **Dọn dẹp mâu thuẫn trong Candidates (`learning/candidates/`)**:
  - Di chuyển các candidate đã promote hoặc bị superseded (`giant-mobile-typography`, `dynamic-full-bleed`, `tasteful-mobile-typography`, `vox-hybrid-video-generation`) vào `learning/archive/`.
  - Triệt tiêu mâu thuẫn về kích thước font hardcoded (`BAN < 32px`) và hiệu ứng phóng to từ active (`scale(1.15)`) — thống nhất chuẩn hiển thị phụ đề highlight màu tĩnh theo `rules/visual-storytelling.md`.
  - Giữ thư mục `learning/candidates/` chỉ dùng cho các đề xuất đang thử nghiệm mới.
- **Tinh gọn và xóa trùng lặp trong `AGENTS.md`**:
  - Giảm thiểu các đoạn văn trùng lặp nguyên văn với `rules/visual-storytelling.md`.
  - Giữ vững 100% các rào chắn kiểm soát chất lượng (Hard Constraints): Dual-Mode, 4 Gates kiểm duyệt, CIT Voice Studio Master timeline, chuẩn âm thanh EBU R128 (-12.5 LUFS), cấm cắt chữ (`overflow: hidden`/`line-clamp`), phụ đề ẩn khi im lặng, và cam kết 1 file final MP4 duy nhất.
  - Bổ sung chỉ dẫn bắt buộc Agent phải gọi tool `view_file` đọc [`rules/visual-storytelling.md`](file:///d:/AI/VIDEO%20AI/rules/visual-storytelling.md) và [`rules/card-archetypes.md`](file:///d:/AI/VIDEO%20AI/rules/card-archetypes.md) trước khi code composition.

## 2026-09-23 — Full-Bleed Visual Layout, Typography Scale & EBU R128 Audio Standards

- **Full-Bleed Vertical Layout & Zero Dead Space**:
  - Chuẩn hóa việc phân bổ chiều dọc 1080×1920: trục đối tượng chính (xe cộ, mặt đất, bục) hạ xuống `y: 1150 – 1250` để vừa tạo không gian rộng phía trên cho thẻ nội dung lớn, vừa tận dụng nửa dưới (`y: 1250 – 1650`) cho thẻ cảnh báo, breakdown số liệu hoặc tầng móng an sinh.
  - Loại bỏ hoàn toàn khoảng đen vô nghĩa dưới đáy khung hình.
- **Mobile Typography Scale (Quy chuẩn kích thước chữ)**:
  - Header Title: `60px – 74px` (in hoa, đậm 900).
  - Subtitle / Tagline: `34px – 42px` (đậm 800).
  - Card Body / Breakdown: `24px – 32px` (đậm 700–800).
  - Subtitle Bar: `32px – 36px` (đậm 800, cách đáy 100–130px).
  - Nghiêm cấm dùng cỡ chữ < 22px trên video 1080×1920.
- **Hero-Sized Visual Elements**:
  - Đối tượng thị giác chính (xe, nhân vật, token, icon) phóng to 1.4x – 1.6x, viền đậm, có đổ bóng/glow.
- **EBU R128 Dynamic Audio Normalization**:
  - Chuẩn hóa âm thanh narration qua ffmpeg loudnorm: Integrated Loudness `-14 đến -12 LUFS` (chuẩn `-12.5 LUFS`), Loudness Range `LRA < 8 LU` (chống hụt tiếng giữa các câu), True Peak `< -1.0 dBFS`.
- **System Rules Promotion**:
  - Cập nhật đồng bộ vào `AGENTS.md`, `rules/visual-storytelling.md`, và `.agents/skills/gen-video/SKILL.md`.

## 2026-09-22 — V2 foundation

- HyperFrames là engine chính; Remotion là fallback và giữ nguyên project cũ.
- Tách Story Pass khỏi Creative Pass.
- Dùng Motion DNA để học reference theo creative grammar.
- Thêm learning loop Failure → Candidate Rule → Promote.
