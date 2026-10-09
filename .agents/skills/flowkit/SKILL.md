---
name: flowkit
description: Automate Google Flow video and image generation via FlowKit backend (FastAPI :8100 + Chrome Extension MV3 on flow.google.com). Use whenever you need to generate AI video clips (8-10s) with Omni 1.1 Flash or Veo, maintain character consistency via reference images, or chain scene transitions.
---

# FlowKit — Google Flow Automation Skill

Sử dụng hệ thống FlowKit đã lọc gọn tại `D:\AI\VIDEO AI\.tools\flowkit` để tự động hóa sinh video trên **Google Flow** (`flow.google.com`).

## 1. Kiến trúc kết nối
- **Backend API**: `http://127.0.0.1:8100` (FastAPI)
- **Extension WebSocket**: `ws://127.0.0.1:9222` (Chrome Extension MV3 kết nối tự động)
- **Database**: `D:\AI\VIDEO AI\.tools\flowkit\flow_agent.db` (SQLite)
- **Trình duyệt**: Cửa sổ Chrome mở sẵn tab `https://flow.google.com/`

## 2. Kiểm tra trạng thái hệ thống
Trước khi gửi yêu cầu, kiểm tra sức khỏe backend và extension:
```bash
powershell -NoProfile -Command "(Invoke-RestMethod -Uri http://127.0.0.1:8100/health) | ConvertTo-Json"
```
Kết quả cần có `"status": "ok"` và `"extension_connected": true`.
Nếu server chưa chạy, khởi động qua:
```bash
& "D:\AI\VIDEO AI\.tools\flowkit\venv\Scripts\python.exe" -m agent.main
```

## 3. Quy trình chuẩn 5 bước tạo Video với Google Flow

### Bước 1: Khởi tạo Project & Entities
Gửi request tạo dự án và khai báo các đối tượng lặp lại (Nhân vật / Địa điểm) để đảm bảo đồng nhất hình ảnh:
```bash
powershell -NoProfile -Command "Invoke-RestMethod -Uri http://127.0.0.1:8100/api/projects -Method Post -ContentType 'application/json' -Body '{\"name\": \"Ten Du An\", \"story\": \"Mo ta noi dung\", \"characters\": [{\"name\": \"Nhan Vat A\", \"entity_type\": \"character\", \"description\": \"Dac diem ngoai hinh chi tiet...\"}]}'"
```

### Bước 2: Sinh ảnh tham chiếu (Reference Images)
Sinh ảnh mẫu cho nhân vật để Google Flow dùng làm khuôn mặt/trang phục gốc:
- Đảm bảo tất cả nhân vật có `media_id` hợp lệ dạng UUID.

### Bước 3: Sinh Scene Images
Tạo ảnh nền cho từng cảnh, truyền `character_names` tương ứng để Google Flow ghép nhân vật vào đúng bối cảnh.

### Bước 4: Sinh Video Clips (8–10 giây)
Gọi API tạo video từ ảnh cảnh:
- Hỗ trợ model: `omni_flash` (Omni 1.1 Flash) hoặc `veo`.
- Hỗ trợ chaining: frame cuối cảnh trước chuyển tiếp làm frame đầu cảnh sau (`chain_type`: `CONTINUATION`).

### Bước 5: Bàn giao video vào Workspace Pipeline
Khi video tải về thư mục `output/` hoặc `projects/.../clips/`:
1. Chuyển tiếp clip sang `/cit-voice-studio` (Voice "Hải Đăng" 48kHz).
2. Tự động căn chỉnh nhịp video (Retiming / Split punch-in cuts).
3. Chèn phụ đề đồng bộ từng từ (ASS Glassmorphism highlight).
4. Chuẩn hóa âm thanh EBU R128 (-13 LUFS) ➔ Xuất `final.mp4`.
