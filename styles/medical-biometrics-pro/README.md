# Medical Biometrics & Clinical Editorial (`medical-biometrics-pro`)

Phong cách y khoa công nghệ cao tối tân đạt chuẩn phát thanh quốc tế, vận hành trên kiến trúc **Hybrid 3D WebGL + 2.5D Spatial Glass HUD**.

## Tiêu Chuẩn Thị Giác Bắt Buộc (Mandatory Visual Standard)
* **Vật thể Trung tâm (Hero Metaphor):** **BẮT BUỘC** dùng `@remotion/three` (`<ThreeCanvas>`), `@react-three/fiber`, `@react-three/drei` và `@react-three/postprocessing` (`<EffectComposer><Bloom /></EffectComposer>`).
  - Dùng vật liệu `meshPhysicalMaterial` (bán trong suốt, transmission, emissive) kết hợp wireframe holographic.
  - Tổn thương / khối u dùng `MeshDistortMaterial` biến dạng đập nhịp đỏ rực.
  - Hạt phân tử trôi nổi trong không gian sâu bằng `<Sparkles>`.
  - Camera 3D di chuyển dolly / orbit mượt mà theo `useCurrentFrame()`.
  - **CẤM HOÀN TOÀN** vẽ minh họa trung tâm bằng hình học `<svg>` 2D phẳng đơn giản.
* **Thẻ Dữ liệu (Information & Metric Cards):** **BẮT BUỘC** sử dụng component `SpatialHUDCard` (2.5D Spatial HUD):
  - Khung nhìn không gian 3D: `perspective: "1200px"`, `transformStyle: "preserve-3d"`.
  - Chuyển động không gian: Xoay nghiêng 3D khi xuất hiện (`rotateX`, `rotateY`, `translateZ`) và liên tục dao động lơ lửng (`floatY`, `floatRot`).
  - Chất liệu kính mờ đa tầng: `backdropFilter: "blur(16px)"`, viền neon `boxShadow`, 4 góc brackets kỹ thuật `[ ]` và tia laser quét bề mặt.

## 5 Trụ cột Sáng tạo Độc bản
1. **Sân khấu 3D WebGL Thời gian thực (3D Realtime Stage):** Tái hiện giải phẫu và can thiệp nội soi bằng mô hình 3D thực thể thay vì đồ họa phẳng.
2. **2.5D Spatial Glass HUD Cards:** Thẻ dữ liệu nổi trong không gian 3D với góc nghiêng thị sai và phản quang chân thực.
3. **Camera Motion & Parallax Breathing:** Camera toàn cục zoom theo nhịp thở `scale: 1.00 -> 1.03` và góc nghiêng vi mô `0.15°`.
4. **Dòng chảy Y sinh Liền mạch (Continuous Telemetry ECG Wave):** Dải sóng điện tim chạy tuần hoàn ở cạnh dưới màn hình kết nối các cảnh.
5. **Lớp Sound Design Đa tầng (Layered Audio):** Voiceover + Nhạc nền Ambient Tech + 5 Cues SFX vi mô (whoosh, sub-bass impact, ping, chime) chuẩn hóa EBU R128 (-12.5 LUFS).
