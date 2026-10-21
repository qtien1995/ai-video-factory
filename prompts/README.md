# HỆ THỐNG PROMPTS ĐẠO DIỄN & SẢN XUẤT VIDEO (AI VIDEO FACTORY)

Hệ thống prompt tiêu chuẩn của AI Video Factory V2, tích hợp toàn diện kho dữ liệu và kỹ thuật từ [prompts.chat](https://prompts.chat/) (1.100+ community prompts) nhằm tối ưu hóa toàn bộ quy trình sản xuất video từ ý tưởng đến video thành phẩm.

---

## 1. Cấu trúc thư mục Prompts

```text
prompts/
├── story-director.md      # Đạo diễn Kịch bản: Nghiên cứu, chọn Persona, Hook, Narration, Beats (Gate 1)
├── creative-director.md   # Đạo diễn Hình ảnh: Ẩn dụ thị giác (Metaphor), Motion Grammar, Card Archetypes
├── video-personas.md      # Danh mục Role-Playing Personas chọn lọc từ prompts.chat chuyên cho Video
├── hook-crafter.md        # 5 Công thức chế tác Hook 3s đầu viral giữ chân người xem
├── production-agent.md    # Kỹ sư Sản xuất: Dựng Remotion/HyperFrames khớp voice timeline (Gate 2 & 3)
├── reference-analyzer.md  # Chuyên viên phân tích Motion DNA từ video mẫu
└── library/               # Kho lưu trữ prompts.chat offline đầy đủ
    ├── prompts.csv        # 1.121 prompt CSV gốc
    ├── prompts.json       # 1.121 prompt JSON có đánh index
    ├── categories.json    # Phân loại theo 6 nhóm sản xuất video
    └── README.md          # Hướng dẫn chi tiết thư viện
```

---

## 2. Quy trình ứng dụng trong Pipeline Sản xuất

```text
1. Ý tưởng / Đề tài từ người dùng
   ↓
2. Story Director (prompts/story-director.md)
   ├─ Tra cứu Persona phù hợp: node core/scripts/prompts/index.js search "<lĩnh vực>"
   ├─ Áp dụng Persona từ: prompts/video-personas.md
   ├─ Chế tác 2-3 phương án Hook 3s: prompts/hook-crafter.md
   └─ Xuất script.md & beats.json (Dừng duyệt Gate 1)
   ↓
3. Creative Director (prompts/creative-director.md)
   ├─ Đề xuất tối đa 3 hướng Ẩn dụ thị giác (Metaphor)
   ├─ Ánh xạ chuyển động theo rules/card-archetypes.md & visual-storytelling.md
   └─ Thống nhất định hướng chuyển động
   ↓
4. Voice Studio & Media Prompts
   ├─ Tạo giọng đọc CIT Voice Studio (Hải Đăng 48kHz, timing từ thật)
   └─ Nếu là Vox/Flow: Xuất production_prompts.md theo cấu trúc chuẩn
   ↓
5. Production Agent (prompts/production-agent.md)
   └─ Dựng code Remotion, đo EBU R128 (-12.5 LUFS), QA 360×640 và xuất final.mp4
```

---

## 3. Lệnh tra cứu nhanh Prompt CLI

Bạn có thể tra cứu và kích hoạt prompt trực tiếp từ terminal:

```bash
# Tìm kiếm prompt theo từ khóa
npm run prompts search "investor"

# Hoặc qua factory CLI
node core/scripts/factory/index.js prompts search "doctor"

# Xem chi tiết một prompt
npm run prompts get "Screenwriter"

# Xuất Persona ra file markdown
npm run prompts export-persona "Accountant"
```
