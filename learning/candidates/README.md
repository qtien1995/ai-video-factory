# Learning Candidates

Thư mục này chứa các quy tắc đang trong giai đoạn thử nghiệm (Candidate Rules) sinh ra từ quy trình:
`Failure → Root cause → Candidate rule → Test → Promote`

## Quy tắc quản lý:
1. **Chỉ chứa các candidate đang active/thử nghiệm**: Không lưu trữ vĩnh viễn tại đây để tránh gây mâu thuẫn (conflicts) với rules chính thức trong `AGENTS.md` và `rules/`.
2. **Khi thử nghiệm thành công**: Promote nội dung cốt lõi vào `AGENTS.md` hoặc `rules/visual-storytelling.md`, sau đó di chuyển file candidate vào `learning/archive/`.
3. **Khi bị bác bỏ hoặc thay thế (Superseded)**: Di chuyển vào `learning/archive/` kèm ghi chú lý do.
