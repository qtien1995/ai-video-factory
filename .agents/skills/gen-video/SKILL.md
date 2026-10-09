---
name: gen-video
description: Orchestrates the Video AI VNext Pipeline from user input to final MP4 output.
---

# Gen-Video Workflow

You are the main orchestrator for the `D:\VIDEO AI` video production system.
Use the workspace factory CLI to guide user inputs through one canonical pipeline.

## Stages and gates
PRE-FLIGHT: `factory doctor` (health check for CIT Voice Studio, FlowKit, FFmpeg)
INPUT / RESEARCH / ANGLE (Story Pass)
SCRIPT → BEATS → GATE1 (user approves both, or fast-track auto-approves)
CREATIVE_DIRECTION → GATE2 (user selects direction, or fast-track auto-selects)
TTS → STORYBOARD → VIDEO_SPEC → VALIDATION → PRODUCTION
PREVIEW → PREVIEW_QA → GATE3 (user approves final render)
FINAL_RENDER → FINAL_QA → PACKAGE → DONE

## Responsibilities

0. **Pre-flight Health Check**: Run `node core/scripts/factory/index.js doctor` before starting production to verify CIT Voice Studio (:8001), FlowKit (:8100), and FFmpeg.
1. **Resume & Dual-Mode**: `node core/scripts/factory/index.js status --project <id>`; `next` reports next stage. Supports **Dual-Mode**: Strict Mode (default) vs Fast-Track Mode (`node core/scripts/factory/index.js fast-track --project <id>`) for standard templates.
2. **Record artifacts**: `record --project <id> --stage <STAGE> [--artifact <relative-file>]`. Use `dirty --stage <STAGE>` when deliberately revising a completed stage. The CLI also detects changed or missing files.
3. **Approvals**: `approve --project <id> --gate GATE1|GATE2|GATE3 --evidence "user's approval"` only after the user has approved that exact gate. Gate 1 requires Script + Beats; Gate 2 requires the chosen creative direction; Gate 3 requires preview and reviewed QA.
4. **Voice and render**: `tts --project <id>` measures actual audio; `render --project <id> --kind preview|final` handles technical QA. Final requires Gate 3. Cache hits skip repeated work.
5. **Packaging**: `node core/scripts/factory/index.js package --project <id>` automatically creates 3 thumbnails (hook, climax, outro), metadata.json, and ready-to-paste caption in `output/dist/`.
6. **Visual QA & Layout Archetypes**:
   - **Bố cục thẻ chuẩn**: Áp dụng 6 Card Archetypes (`rules/card-archetypes.md`: Metric Hero, Comparison 2 vế, 3-Column Grid, Sequential Step Flow, Checklist & Status Badge, Quote Card).
   - Inspect the preview/contact sheet, fix clear issues, then `record --stage PREVIEW_QA --artifact qc.md --reviewed`. After final render, inspect again and record `FINAL_QA`, then `DONE`.
7. **QA & Validation Standards**:
   - **Thiết kế từng thẻ**: Đọc `D:/VIDEO AI/rules/visual-storytelling.md`. Tự chọn thứ bậc, hàng/cột, chiều cao, padding, khoảng cách, ngắt dòng, icon/badge theo nội dung và không gian cảnh. Giữ khoảng thở có chủ đích, không thêm thẻ chỉ để lấp chỗ trống.
   - **Mobile Typography**: Token/cỡ chữ chỉ là điểm thử. Không tăng đồng loạt, ép một cỡ hoặc tự co chữ. Cân lại lượng chữ, ngắt dòng, icon/badge, cột hoặc chia nhịp trước khi chỉnh cỡ; giữ số liệu/điều kiện, đối chiếu voice và nguồn khi biên tập có thể đổi nghĩa. Không cắt/giấu chữ hay thu nhỏ cả thẻ.
   - **Phụ đề**: Hiện cả cụm ngắn khi bắt đầu đọc; chỉ từ đang đọc đổi màu, các từ khác cùng màu thường. Chia cụm theo nghĩa/dấu câu/khoảng nghỉ/chiều rộng thật; cố định khung/dòng/cỡ/độ đậm, ẩn khi im lặng. Không tô theo từ khóa.
   - **Visual QA**: Render từng trạng thái đủ chữ, xem ảnh gốc và khoảng 360×640, tự sửa và render lại; ghi bằng chứng trong qc.md. Không tự sửa video cũ khi yêu cầu chỉ cập nhật quy tắc. Video hoàn chỉnh chỉ bàn giao một MP4 tại output chuẩn, không giao preview/v001/v002.
   - **EBU R128 Audio Normalization**: Track âm thanh narration bắt buộc qua chuẩn hóa động: Integrated Loudness `-14 đến -12 LUFS` (chuẩn `-12.5 LUFS`), Loudness Range `LRA < 8 LU` (chống tiếng to tiếng nhỏ), True Peak `< -1.0 dBFS`.
   - Validate output exists, verify duration parity, and generate `output/<kind>-contact-sheet.svg` for visual inspection before sign-off.

## Sub-Rules
Read these rules for detailed instructions on specific stages:
- `rules/workflow.md`
- `../../../rules/visual-storytelling.md`
- `rules/caching.md`
- `rules/story.md`
- `rules/storyboard.md`
- `rules/engine-selection.md`
- `rules/qa.md`
