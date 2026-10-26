# DNA Profile: HUD Developer Timeline (20 Repos / Opus 5.5 Explainer)

## 1. Thông tin chung
- **Nguồn video tham chiếu**: [TikTok @hieu.modoro - 20 REPO TẠO VIDEO VỚI OPUS 5.5](https://www.tiktok.com/@hieu.modoro/video/7698585488512519431)
- **Tác giả**: Hiếu học code (@hieu.modoro)
- **Độ phân giải**: 1080 × 1920 (9:16 Vertical Shorts/Reels/TikTok)
- **Tốc độ khung hình (FPS)**: 30 fps
- **Thời lượng**: 60.07 giây (1802 frames)
- **Thể loại Archetype**: Developer HUD NLE Multi-Track Timeline Explainer

---

## 2. Giải phẫu 5 Tầng DNA (5-Layer Deep Breakdown)

### Tầng 1: Hook 3s đầu
- **Visual Hook**: Giao diện bàn dựng timeline tối tân (HUD Dark Mode) phong cách Final Cut / DaVinci kết hợp Cyberpunk Grid.
- **Verbal Hook**: "20 repo để Opus 5.5 tự dựng video từ A đến Z".
- **Text Hook**: Tiêu đề H1 trắng đậm nổi bật trên nền lưới tối, đính kèm số đếm phân tầng `00/20` màu cam neon.

### Tầng 2: Layout & Bảng màu (Palette)
- **Background**: Nền `#080c10` (Deep obsidian black) phủ lưới tọa độ mờ `72px x 72px` kèm dấu thập (`+`) tại giao điểm.
- **Surface**: Card kính mờ `rgba(12, 22, 38, 0.75)` với viền cyan neon `rgba(56, 189, 248, 0.25)` và `backdrop-blur-md`.
- **Accent Colors**:
  - Cam neon `#f97316`: Kim playhead scrubber, số đếm phân tầng, tiêu đề track đang chọn.
  - Xanh sky `#38bdf8`: Highlight thanh tiến trình, block timeline clip, viền card.
  - Trắng `#ffffff`: Tiêu đề chính H1, tên repo.
  - Xám slate `#94a3b8`: Mô tả phụ đề và nhãn ruler timecode.

### Tầng 3: Typography & Nhận diện
- **Font chính**: Sans-serif hiện đại (Inter / SF Pro Display) cho tiêu đề và nội dung.
- **Font kỹ thuật**: Monospace (`JetBrains Mono` / `Fira Code`) cho timecode `00:00 - 00:20`, số đếm `03/20`, mã badge `#01` và code editor snippet.

### Tầng 4: Motion & Spring Physics
- **Kim Timeline Scrubber**: Chạy ngang mượt mà từ trái qua phải theo thời gian thực (00:00 -> 00:20).
- **Card Slide-In**: Hiệu ứng trượt từ dưới lên với độ nảy vật lý `spring({ damping: 16, stiffness: 140, mass: 0.8 })`.
- **DAW Multi-Track Bar**: 6 track xếp chồng dọc ở đáy màn hình; các block clip tự động phát sáng màu xanh sky khi hoàn thành từng chặng.

### Tầng 5: Sound Design & Audio
- **BGM**: Nhạc nền Tech Lo-Fi nhịp điệu nhanh, hiện đại, năng lượng tích cực.
- **SFX**: Tiếng click cơ học, tiếng bíp HUD khi mỗi thẻ xuất hiện và tiếng quét playhead.
- **Audio Spec**: Chuẩn hóa âm lượng EBU R128 (-12.5 LUFS cho TikTok/Reels).

---

## 3. Danh mục 20 Repo & Công nghệ chính thức

| STT | Tên Repo / Thư viện | GitHub Repo Chính Chủ | Trạng thái tích hợp Workspace |
| :--- | :--- | :--- | :--- |
| **#01** | Remotion Skills | [remotion-dev/skills](https://github.com/remotion-dev/skills) | Đã cài vào `.agents/skills/remotion-best-practices` |
| **#02** | Motion AI Kit | [motiondivision/ai-kit](https://github.com/motiondivision/ai-kit) | Đã cài vào `.agents/skills/motion-ai-kit` |
| **#03** | GSAP Skills | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | Đã cài vào `.agents/skills/gsap-skills` |
| **#04** | SVGO | [svg/svgo](https://github.com/svg/svgo) | Đã cài qua npm: `svgo` |
| **#05** | Satori | [vercel/satori](https://github.com/vercel/satori) | Đã cài qua npm: `satori` |
| **#06** | GSAP | [greensock/GSAP](https://github.com/greensock/GSAP) | Đã cài qua npm: `gsap` |
| **#07** | Anime.js | [juliangarnier/anime](https://github.com/juliangarnier/anime) | Đã cài qua npm: `animejs` |
| **#08** | Motion | [motiondivision/motion](https://github.com/motiondivision/motion) | Đã cài qua npm: `motion` |
| **#09** | Rive | [rive-app/rive-wasm](https://github.com/rive-app/rive-wasm) | Đã cài qua npm: `@rive-app/react-canvas` |
| **#10** | Lottie | [Gamote/lottie-react](https://github.com/Gamote/lottie-react) | Đã cài qua npm: `lottie-react` |
| **#11** | Remotion | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | Engine gốc sẵn có trong `engines/remotion` |
| **#12** | Motion Canvas | [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas) | Đã cài qua npm: `@motion-canvas/core`, `@motion-canvas/2d` |
| **#13** | three.js | [mrdoob/three.js](https://github.com/mrdoob/three.js) | Đã cài qua npm: `three`, `@types/three` |
| **#14** | React Three Fiber | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | Đã cài qua npm: `@react-three/fiber` |
| **#15** | Drei | [pmndrs/drei](https://github.com/pmndrs/drei) | Đã cài qua npm: `@react-three/drei` |
| **#16** | Rapier | [pmndrs/react-three-rapier](https://github.com/pmndrs/react-three-rapier) | Đã cài qua npm: `@react-three/rapier` |
| **#17** | Postprocessing | [pmndrs/react-postprocessing](https://github.com/pmndrs/react-postprocessing) | Đã cài qua npm: `@react-three/postprocessing` |
| **#18** | Howler.js | [goldfire/howler.js](https://github.com/goldfire/howler.js) | Đã cài qua npm: `howler` |
| **#19** | Mediabunny | [Vanilagy/mediabunny](https://github.com/Vanilagy/mediabunny) | Đã cài qua npm: `mediabunny` |
| **#20** | FFmpeg | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | Binary FFmpeg v8.0.1 đã tích hợp sẵn trong máy |
