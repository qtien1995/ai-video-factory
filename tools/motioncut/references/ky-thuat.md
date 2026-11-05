# Ghi chú kỹ thuật motioncut (rút từ lúc dựng thực tế)

## Hợp đồng trang `index.html`
```
window.READY = true;        // sau khi document.fonts.ready + build()
window.seek = t => { tl.seek(t, false); drive(t); };   // chụp khung: gọi seek(i / fps)
window.DURATION = TIMING.total;
window.SFX = [{t, kind, g}, ...];      // fx(t, kind, gain) gom vào đây; mix.py đọc qua sfx_events.json
```
`tl` là **một timeline GSAP duy nhất, paused**. Mọi thứ phụ thuộc thời gian phải nằm trong timeline hoặc trong `drive(t)` (hàm thuần theo t) để `seek` ngẫu nhiên cho ra đúng khung — **không dùng setTimeout/requestAnimationFrame/CSS animation**. `tl.call()` không đáng tin khi nhảy cóc; đổi class/nội dung bằng tween opacity hoặc đặt trong `drive(t)`.

## Canh theo lời
- `at(id, từ, lần=0)` = `start + (end-start) * vị_trí_ký_tự / độ_dài_câu` — ước lượng, lệch ±0,3 s. Từ không có trong câu → ném lỗi (render dừng, đỡ lặng lẽ sai). Tìm theo **chuỗi con** không phân biệt hoa/thường: `'mà'` khớp trong `'mày'`; `'đi'` khớp `'điện'`. Dùng từ dài/duy nhất hoặc tham số `lần`.
- Câu ngắn (< 1 s): đừng giấu thông tin quan trọng ở nó; cảnh vào trước 0,1–0,3 s (`st(id)-.1`).
- Đổi lời → cảnh nào dùng `at()` với từ cũ sẽ vỡ → chạy `--preview` ngay.

## Chuyển động 3D / blur
- **Không để `filter: blur()` trên phần tử `transform-style: preserve-3d`** (làm phẳng, mất lật). Blur ở lớp cha (`#scene3d`) và lật ở `#card`.
- Thẻ 2 mặt: `backface-visibility:hidden` **và** bật/tắt `visibility` theo `rotationY` trong `drive()` (thêm cho chắc khi lật).
- Con trỏ/nút dùng toạ độ `getBoundingClientRect()` đo **trước khi** tween dời phần tử (xem `pillRects` trong mẫu).

## Chữ đọc được trên nền sáng
Dải sáng cùng tông xanh với chữ xanh → chữ **chìm**. Luôn giữ: (1) `text-shadow` tối quanh chữ lớn (`.shadow/.serif/.ice`); (2) màu nhấn xanh nhạt đặc `#8ff0ff` thay vì gradient trong suốt; (3) lớp `#dim` (elip tối) bật ở cảnh chỉ có chữ lớn (`tl.to('#dim',{opacity:1,…})`). Chữ phụ đề nằm trong nền tối mờ.

## Phụ đề chạy theo lời
`drive(t)` dựng phụ đề từ `TIMING` (sáng dần theo ký tự). Tắt cho câu nào đã có chữ khổng lồ giống hệt trên hình: thêm id vào `NOCAP`. Giữ phụ đề ở vùng an toàn dưới (9:16: top ≈ 1380 px; tránh vùng nút TikTok ở mép phải/dưới ~ 250 px).

## Hiệu suất
Mỗi khung ≈ 0,5 s trên một tiến trình (đo ở bản 1080×1920). 90 s × 30 fps ≈ 2700 khung → ~6–7 phút với 4 tiến trình. `blur()` lớn, `mix-blend-mode`, nhiều `filter: drop-shadow` làm chậm; nếu quá chậm hạ `--fps 24` hoặc giảm blur.

## Giọng đọc
- Piper `vi_VN-vais1000-medium` (nữ, 22,05 kHz). `length_scale` 1.0 nhanh · 1.15 vừa · 1.22 chậm rãi (kể chuyện). Dấu câu quyết định ngắt hơi: dùng dấu chấm cho nhịp gắt.
- Cắt im lặng đầu/cuối từng câu rồi tự đặt khoảng nghỉ `gap`/`sec_gap` → hình luôn biết chính xác từng câu bắt đầu lúc nào.
- **Đổi giọng** (thu âm thật, ElevenLabs, FPT.AI…): tạo từng câu thành file riêng, thay bước synth trong `gen_voice.py` bằng việc đọc các file đó (giữ nguyên phần cắt im lặng + đặt thời gian + ghi `voice.wav/timing.*`). Muốn phụ đề khớp từng chữ thì chạy nhận dạng (faster-whisper) để lấy mốc từng từ rồi thay phần ước lượng trong `at()`/phụ đề.
- Đã thử `sherpa-onnx` với chính mô hình này nhưng báo lỗi `phoneme_codepoints is empty` → dùng `piper-tts` (chạy ổn).

## Âm thanh
`mix.py`: giọng 0,95 + nhạc pad/arpeggio (chuỗi Dm9–Bbmaj7–F–Cmaj9, tự nhỏ 55 % khi có giọng) + hiệu ứng (gain theo loại) → soft-clip → chuẩn hoá đỉnh 0,93 (≈ −12…−13 LUFS). Hiệu ứng đều tổng hợp bằng numpy, không cần thư viện âm thanh. Thêm loại mới: thêm vào `LIB` và `GAIN`.

## Mạng bị chặn
Môi trường đám mây thường chặn trang ảnh/CDN (Wikimedia, Unsplash, jsDelivr…); Trong môi trường đã thử: github.com (release), PyPI và npm mở được. Cần ảnh thật → người dùng thêm host vào Network access của môi trường (Allowed domains) rồi mới tải; luôn kiểm tra giấy phép ảnh.
