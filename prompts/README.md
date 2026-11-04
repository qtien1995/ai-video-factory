# HỆ THỐNG PROMPTS ĐẠO DIỄN & SẢN XUẤT VIDEO (AI VIDEO FACTORY V4 - BESPOKE)

Hệ thống prompt tiêu chuẩn của AI Video Factory V4, định hình vai trò các Agent sản xuất video độc bản (Bespoke), triệt tiêu hoàn toàn khuôn mẫu và đảm bảo chất lượng hình ảnh - âm thanh đạt chuẩn phát sóng.

---

## 1. Cấu trúc thư mục Prompts

```text
prompts/
├── story-director.md      # Đạo diễn Kịch bản: Nghiên cứu, chọn Persona, Hook 3s, Narration, Beats (Gate 1)
├── creative-director.md   # Đạo diễn Hình ảnh: Ẩn dụ thị giác (Metaphor), Sơ đồ sống, Motion Grammar (Gate 2)
├── video-personas.md      # Danh mục Role-Playing Personas chuyên sâu cho từng thể loại video
├── hook-crafter.md        # 5 Công thức chế tác Hook 3s đầu viral giữ chân người xem
├── production-agent.md    # Kỹ sư Sản xuất: Dựng Remotion/HyperCanvasPlate khớp voice timeline (Gate 2 & 3)
└── reference-analyzer.md  # Chuyên viên phân tích Motion DNA (nhịp cắt, LUFS) từ video mẫu (không sinh style)
```

---

## 2. Quy trình ứng dụng trong Pipeline Sản xuất (3 Gates Bắt Buộc)

```text
1. Ý tưởng / Đề tài từ người dùng
   ↓
2. Story Director (prompts/story-director.md)
   ├─ Chọn Persona chuyên môn phù hợp từ: prompts/video-personas.md
   ├─ Chế tác 2-3 phương án Hook 3s: prompts/hook-crafter.md
   └─ Xuất script.md & beats.json (Chờ User phê duyệt: GATE 1)
   ↓
3. Creative Director (prompts/creative-director.md)
   ├─ Đề xuất Ẩn dụ thị giác độc bản (Chuẩn A) hoặc Sơ đồ sống (Chuẩn B)
   ├─ Định nghĩa Palette & Nhịp điệu chuyển động riêng cho kịch bản
   └─ Xuất art-direction.md (Chờ User phê duyệt: GATE 2 - CẤM FAST-TRACK)
   ↓
4. Voice Studio & Timing
   ├─ Tạo giọng đọc thương hiệu CIT Voice Studio (Hải Đăng 48kHz, trích xuất timing từng từ)
   └─ Chốt duration và timeline thực tế
   ↓
5. Production Agent (prompts/production-agent.md)
   ├─ Dựng code Remotion TSX trong projects/<id>/, kết hợp HyperCanvasPlate khi cần
   ├─ Kiểm tra frame tĩnh từng cảnh (chống tràn chữ, che chữ, khoảng trống chết)
   ├─ Chạy npm run make -- --project <id>
   └─ Kiểm định E2E QC (-14 đến -12 LUFS, Freeze <= 3s) ➔ Nghiệm thu FINAL (GATE 3)
```
