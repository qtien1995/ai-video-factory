# Candidate Rule: Vox Hybrid Video Generation Flow (Google Flow / Video AI Integration)

## 1. Failure
Video hoàn thiện từ ảnh tĩnh kết hợp zoompan Ken Burns (chỉ lia/zoom camera cơ bản) bị đơn điệu, thiếu chuyển động hoạt họa nội tại của các thành phần cắt dán (ví dụ: khói không bốc lên, mũi tên không tự vẽ, mác giá không đập xuống, thỏi vàng không chuyển động).

## 2. Root Cause
- Phong cách Vox / Johnny Harris sống động nhờ **Living Poster & Element Animation** (các mảnh ghép giấy tương tác, chuyển động theo vật lý 2D).
- Khi môi trường cục bộ không có API key sinh video tự động (Atlas Cloud), việc fallback sang zoompan tĩnh là chưa đủ thỏa mãn tiêu chuẩn thị giác cao cấp.
- Cần mở rộng quy trình để hỗ trợ người dùng kết hợp với các công cụ tạo video AI tiên tiến bên ngoài như **Google Flow**, **Veo**, **Kling**, **Runway**, v.v.

## 3. Candidate Rule (Quy tắc bổ sung cho Vox Workflow)
Từ nay, quy trình sản xuất **Vox Style (`vox-director`)** hỗ trợ 2 nhánh Motion Animation sau khi duyệt Gate 2.5:

### Nhánh 1: Tự động hoàn toàn (Automated API)
- Áp dụng khi có API key cấu hình sẵn.
- Tự động gọi mô hình Image-to-Video để sinh chuyển động.

### Nhánh 2: Studio Hybrid Flow (Google Flow / External Video AI)
1. **Sau Gate 2.5:** Hệ thống tự động trích xuất bộ **Motion Prompts** chuẩn hóa cho từng poster (tuân thủ công thức 5 trục: Goal, Camera, Movement, Aesthetic, Pacing).
2. **Human Animation Pass:** Người dùng sử dụng các poster tĩnh đã duyệt làm Start Frame trên Google Flow / Video AI, nhập prompt tương ứng để tạo clip chuyển động hoạt họa thật (5s–10s).
3. **Smart Ingest & Auto-Assembly:**
   - Người dùng lưu các file clip vào thư mục `clips/` của project.
   - Script lắp ráp `assemble.py` tự động đọc các clip mới, tự động khớp tốc độ (speed retiming) theo đúng Master Timeline của Voiceover, áp dụng ducking âm thanh, gắn phụ đề typography và chuẩn hóa EBU R128 (-13.4 LUFS) để xuất `final.mp4`.

## 4. Test & Verification
- Dự án áp dụng thử nghiệm: `CNT-20261003-LAM-PHAT-BAO-HIEM`.
- Sau khi người dùng đưa các clip từ Google Flow về, kiểm tra khả năng auto-assembly và nghiệm thu video cuối cùng.
