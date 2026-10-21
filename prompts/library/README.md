# THƯ VIỆN PROMPTS.CHAT OFFLINE CHO AI VIDEO FACTORY

Kho lưu trữ hơn 1.100+ prompt và system instructions chuẩn quốc tế từ cộng đồng [prompts.chat](https://prompts.chat/) (nguyên bản từ *Awesome ChatGPT Prompts*), được tích hợp trực tiếp vào AI Video Factory để phục vụ xây dựng kịch bản, nhập vai chuyên gia (Role-Playing Personas), tạo visual prompts và tối ưu hóa chuyển động.

---

## 1. Cấu trúc thư mục

```text
prompts/
├── library/
│   ├── prompts.csv        # 1.121 prompt định dạng CSV nguyên bản
│   ├── prompts.json       # 1.121 prompt định dạng JSON có đánh chỉ mục
│   ├── categories.json    # Phân loại theo 6 nhóm sản xuất video
│   └── README.md          # Hướng dẫn này
├── video-personas.md      # Bộ tuyển chọn các Role tối ưu cho làm video
├── hook-crafter.md        # Bộ công thức sinh Hook 3s đầu viral
├── story-director.md      # Prompt Đạo diễn kịch bản (đã tích hợp Persona)
├── creative-director.md   # Prompt Đạo diễn hình ảnh & Metaphor
├── reference-analyzer.md  # Phân tích Motion DNA từ video tham chiếu
└── production-agent.md    # Dựng video khớp voice timeline
```

---

## 2. Các nhóm ngành chính phục vụ Video AI

Dữ liệu được lập chỉ mục thành 6 nhóm chủ đề chuyên biệt trong `categories.json`:

1. **`storytelling_entertainment`** (253 prompts): Biên kịch (`Screenwriter`), Kể chuyện (`Storyteller`), Tiểu thuyết (`Novelist`), Hài độc thoại (`Stand-up Comedian`), Nhà phê bình phim (`Movie Critic`), Rapper, Thi sĩ (`Poet`).
2. **`finance_business`** (91 prompts): Chuyên viên tài chính (`Financial Analyst`), Kế toán (`Accountant`), Bất động sản (`Real Estate Agent`), Cố vấn đầu tư, Kinh tế học.
3. **`tech_engineering`** (458 prompts): Kiến trúc sư phần mềm, AI Explainer, An ninh mạng (`Cyber Security Specialist`), Lập trình viên, Thiết kế UX/UI.
4. **`education_science`** (49 prompts): Giảng viên triết học, Giáo viên toán/khoa học, Bác sĩ/Tư vấn y tế, Nhà ngôn ngữ học (`Etymologist`), Sử gia.
5. **`marketing_viral_hooks`** (49 prompts): Nhà quảng cáo (`Advertiser`), Copywriter, Chuyên gia tranh biện (`Debater`), Diễn giả truyền cảm hứng (`Motivational Speaker`).
6. **`lifestyle_wellness`** (47 prompts): Huấn luyện viên cuộc sống (`Life Coach`), Chuyên gia tâm lý, Huấn luyện viên thể hình.

---

## 3. Cách tra cứu và sử dụng

### Qua công cụ CLI:
```bash
# Tìm kiếm prompt theo từ khóa
node core/scripts/prompts/index.js search "financial"

# Tìm kiếm prompt trong một danh mục
node core/scripts/prompts/index.js search "story" --category storytelling_entertainment

# Xem chi tiết một prompt theo tên Role
node core/scripts/prompts/index.js get "Screenwriter"

# Liệt kê các danh mục có sẵn
node core/scripts/prompts/index.js list-categories
```

### Sử dụng trực tiếp trong Agent / LLM:
Khi bắt đầu một dự án video mới, Story Director có thể tra cứu và kích hoạt Persona tương ứng:
- Làm video giải thích bảo hiểm / lạm phát: Kích hoạt persona `Financial Analyst` hoặc `Accountant`.
- Làm video giải thích kiến trúc vi xử lý: Kích hoạt persona `Tech Reviewer` hoặc `Software Architect`.
- Làm video phóng sự điều tra Vox: Kích hoạt persona `Debater` hoặc `Investigative Journalist`.
