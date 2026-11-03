# Cinematic Product & 3D Spatial Craft (`cinematic-saas-craft`)

Style sản xuất video quảng bá sản phẩm, SaaS & công nghệ mang chuẩn điện ảnh (Cinematic Motion Design), tối ưu hoàn hảo cho màn hình di động dọc 9:16 (`1080×1920`).

---

## 3 Core Motion Components (9:16 Ready)

### 1. `<ExplodedView3D />`
- **Mô tả**: Tách lớp giao diện & kiến trúc phần mềm 3D theo trục Z (`translateZ` isometric), camera nghiêng trục `rotateX(40deg)` và `rotateZ(-15deg)` tạo chiều sâu thị giác.
- **Tính năng**: Staggered spring, đường chỉ dẫn (leader callout lines), hiệu ứng rơi tự do và khóa va chạm (shadow clamp lock).

### 2. `<GrazeFaceTour3D />`
- **Mô tả**: Camera lướt nghiêng góc hẹp (low-flyby) cận cảnh các bề mặt thẻ thông số, kiểm tra từng module.
- **Tính năng**: Chuyển động 2.5D float, đổ bóng mềm đồng hình (soft contact shadow) thu hẹp khi phần tử tiếp đất, tia quét laser lướt qua bề mặt.

### 3. `<ProgressiveCardAssemble />`
- **Mô tả**: Lắp ráp thẻ Hero & Metric từng phần tự động với spring physics.
- **Tính năng**: Biến đổi số liệu (gạch bỏ giá/chỉ số cũ, nhảy vọt chỉ số mới bằng spring), quét dạ quang bullet list, nút CTA đổ màu từ trái sang phải.

---

## Tích hợp Sound Design (149 SFX)
Sử dụng trực tiếp các presets từ `assets/audio/sfx/index.ts` để đồng bộ âm thanh khi chuyển cảnh hoặc tiếp đất.
