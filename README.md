# AI VIDEO FACTORY V2

Workspace tạo video social theo luồng **nội dung đúng trước, hình thức đúng sau**.

```text
Input → Story Pass → duyệt Script + Beats → Creative Pass → chọn hướng
→ Voice + timing thật → Remotion → Preview/QA → duyệt render → Final
```

Remotion là engine chính. HyperFrames được dùng làm phương án thay thế nhẹ tải hoặc tối ưu GSAP.

## Nơi quan trọng

- `AGENTS.md`: luật vận hành chính.
- `prompts/story-director.md`: tạo script + beats.
- `prompts/creative-director.md`: chọn visual story sau khi script duyệt.
- `prompts/reference-analyzer.md`: rút Motion DNA từ video mẫu.
- `prompts/production-agent.md`: production theo voice timing.
- `creative-library/`: pattern, primitives, visual skin và reference grammar.
- `rules/`: các rule đã được promote.
- `learning/`: lỗi, candidate rule, changelog.
- `projects/`: video thực tế; không xóa project cũ.

## Điều phối một project

Từ thư mục workspace, chạy `node core/scripts/factory/index.js status --project <id>` để xem bước hiện tại; dùng `next` để lấy bước cần làm tiếp. Sau khi tạo Script và Beats, ghi từng bước bằng `record`, rồi chỉ ghi Gate 1 qua `approve` khi người dùng đã duyệt cả hai. Tương tự, Gate 2 khóa creative direction và Gate 3 cho phép render final sau preview/QA.

Lệnh `tts` đo audio thật; `render --kind preview` tạo `output/preview.mp4`, báo cáo QA và contact sheet. Chạy `render --kind final` sau Gate 3 để tạo `output/final.mp4`. `check` báo state hoặc file đã lỗi thời. Xem [START_HERE.md](START_HERE.md) để có ví dụ lệnh.

## Quy tắc cốt lõi

Mỗi beat cần một visual action có ý nghĩa. Text hỗ trợ visual, không thay visual. Voice là master timeline.
