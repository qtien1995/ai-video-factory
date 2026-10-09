# Motion & Visual Primitives Library

Các primitive được chuẩn hóa cho định dạng dọc 9:16 (1080x1920) theo quy chuẩn của `AGENTS.md` và `rules/visual-storytelling.md`.

Mã nguồn triển khai tại: [engines/remotion/src/shared/primitives.tsx](file:///D:/VIDEO%20AI/engines/remotion/src/shared/primitives.tsx)

## 1. MetricCounter
Component đếm số tự động theo thời lượng khung hình (tabular-nums chống giật chữ, hỗ trợ prefix, suffix, số thập phân):
```tsx
import { MetricCounter } from "../shared";

<MetricCounter from={0} to={1300000000} prefix="Vay: " suffix=" VNĐ" durationFrames={45} />
```

## 2. usePhysicsVibration
Hook tạo độ rung / chấn động / bão gió mô phỏng vật lý chân thực (sinusoidal wobble), cực kỳ hữu hiệu cho các beat giật mình, cảnh báo, sập bẫy chi phí:
```tsx
import { usePhysicsVibration } from "../shared";

const wobble = usePhysicsVibration(startFrame, intensity, speed);
```

## 3. useSpringScale
Hook tạo hiệu ứng pop-in / entrance tự nhiên theo vật lý lò xo Remotion (chống cứng đơ, giảm xóc mượt mà):
```tsx
import { useSpringScale } from "../shared";

const scale = useSpringScale(15, 12);
```

## 4. HighlightBadge
Badge danh mục, nhãn cảnh báo hoặc phân loại thông tin chuẩn tỷ lệ mobile:
```tsx
import { HighlightBadge } from "../shared";

<HighlightBadge label="ĐỀ XUẤT MỚI" color="#facc15" />
```
