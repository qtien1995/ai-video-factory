# Mobile Visual Skins & Layout Rules

Quy chuẩn layout và typography chống khoảng chết (**Zero Dead Space**) và đảm bảo đọc rõ trên màn hình điện thoại 1080×1920:

Mã nguồn triển khai tại: [engines/remotion/src/shared/design-system.tsx](file:///D:/VIDEO%20AI/engines/remotion/src/shared/design-system.tsx)

## 1. Typography Hierarchy (Bắt buộc)
- **Header**: 60px – 74px (in hoa, đậm 900, textShadow chống chìm).
- **Subtitle**: 34px – 42px (đậm 800).
- **Card Title**: 32px (đậm 900).
- **Card/Body**: 24px – 32px (đậm 700–800).
- **Subtitle Bar (Thanh phụ đề)**: 32px – 36px (đậm 800), cách đáy 100–130px.
- *Cấm tuyệt đối cỡ chữ < 22px*.

## 2. Vertical Zones (1080 × 1920)
- **Upper Zone (y: 80 - 900)**: Chứa Header, Category Badge, Thẻ so sánh / Bối cảnh.
- **Center Hero Anchor (y: 1150 - 1250)**: Hạ trọng tâm nhân vật/phương tiện/token chính xuống để chừa chỗ cho cả thẻ trên và móng bên dưới.
- **Lower Content Zone (y: 1260 - 1650)**: Thẻ cảnh báo, móng an sinh, breakdown chi phí. **KHÔNG ĐỂ TRỐNG NỬA DƯỚI**.
- **Bottom Subtitle Bar (y: 1790 - 1820)**: Thanh phụ đề nổi bật, an toàn trước thanh điều hướng của TikTok / Reels / Shorts.
