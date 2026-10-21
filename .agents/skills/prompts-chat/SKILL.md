---
name: prompts-chat
description: Tra cứu, trích xuất và áp dụng hơn 1.100+ system prompts và Role-Playing Personas từ cộng đồng prompts.chat vào quy trình sản xuất video (Story Pass, Hook Crafter, Creative Metaphors). Sử dụng khi cần tìm prompt kịch bản, nhập vai chuyên gia cho Story Director, chế tác Hook 3s đầu viral, hoặc nâng cấp visual prompts.
---

# Prompts.chat Integration Skill — AI Video Factory

Kỹ năng này kết nối trực tiếp kho tri thức **prompts.chat** (1.100+ vetted community prompts) vào quy trình sáng tạo của **AI Video Factory V2**, giúp giải phóng sức sáng tạo kịch bản, nhập vai chuyên môn chính xác và tạo hook giữ chân người xem đỉnh cao.

---

## 1. Khi nào kích hoạt Skill này?

Agent kích hoạt skill này khi:
- Người dùng yêu cầu làm video về một chủ đề mới và cần xác định góc nhìn / phong cách kể chuyện phù hợp.
- Cần tìm kiếm Role/Persona chuyên gia (Tài chính, Y khoa, Công nghệ, Giáo dục, Pháp lý, Nghệ thuật...) để viết kịch bản có chiều sâu.
- Cần chế tác các Hook 3 giây đầu giật gân, cuốn hút cho video ngắn (TikTok, Reels, Shorts).
- Người dùng yêu cầu tra cứu hoặc tìm prompt từ kho `prompts.chat`.

---

## 2. Công cụ và Tài nguyên sẵn có trong Workspace

1. **Bộ dữ liệu Offline**:
   - `prompts/library/prompts.json` (1.121 prompts nguyên bản có index).
   - `prompts/library/categories.json` (Phân loại 6 nhóm ngành video).
   - `prompts/video-personas.md` (Tuyển tập các Role tinh hoa cho video).
   - `prompts/hook-crafter.md` (5 công thức Hook 3s đầu viral).

2. **Lệnh CLI tra cứu nhanh**:
   ```bash
   # Tìm kiếm prompt theo từ khóa
   node core/scripts/prompts/index.js search "<từ khóa>" [--category <nhóm>] [--limit 10]

   # Xem toàn văn prompt của một vai
   node core/scripts/prompts/index.js get "<tên vai hoặc ID>"

   # Liệt kê danh mục
   node core/scripts/prompts/index.js list-categories
   ```

3. **MCP Endpoint Online (Khi cần cập nhật trực tuyến)**:
   - Endpoint: `https://prompts.chat/api/mcp`

---

## 3. Quy trình áp dụng vào Story & Creative Pass

### Bước 1: Nhập vai Chuyên gia (Persona Adoption)
Khi nhận chủ đề từ người dùng:
1. Phân tích lĩnh vực trọng tâm của video.
2. Tra cứu Persona thích hợp từ `prompts/video-personas.md` hoặc dùng CLI:
   `node core/scripts/prompts/index.js search "<lĩnh vực>"`.
3. Kích hoạt vai diễn đó trong tư duy viết kịch bản của Story Director.
   *Ví dụ*:
   - Đề tài lạm phát/bảo hiểm ➔ Áp dụng vai **Financial & Insurance Strategist** (Accountant #60).
   - Đề tài phóng sự vạch trần chiêu trò lừa đảo ➔ Áp dụng vai **Investigative Journalist / Debater** (#29).
   - Đề tài thuật toán AI ➔ Áp dụng vai **Tech Architect & Code Reviewer** (#42).

### Bước 2: Chế tác Hook 3s đầu (Hook Crafting)
Áp dụng 5 công thức từ `prompts/hook-crafter.md`:
- **Phản trực giác (Counter-Intuitive)**: Bẻ gãy niềm tin cũ.
- **Nỗi đau sâu sắc (Visceral Pain)**: Đánh vào cảm xúc lo âu, bế tắc.
- **Con số gây sốc (Shocking Metric)**: Đưa ra dữ liệu thực tế chênh lệch cực lớn.
- **Kể chuyện mở vòng lặp (In Media Res)**: Bắt đầu từ tình huống ngặt nghèo nhất.
- **Châm biếm hóm hỉnh (Satirical Paradox)**: Vạch trần mâu thuẫn hành vi thường nhật.

Bắt buộc cung cấp **ít nhất 2 lựa chọn Hook** cho người dùng tại Gate 1.

### Bước 3: Đảm bảo Hàng rào An toàn (Gates)
- Tuyệt đối dừng lại tại **Gate 1** để người dùng duyệt kịch bản và Hook trước khi chuyển sang bước media/voice.
- Mọi claim hoặc số liệu từ Persona bắt buộc phải đối chiếu nguồn chính thống (`sources.md`), không bịa đặt thông tin.
