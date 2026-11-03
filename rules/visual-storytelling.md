# Visual Storytelling Rules — Chuẩn Thiết Kế Mobile 9:16 (1080 × 1920)

> Nguyên tắc số 1: hình phải tự kể được câu chuyện — xem AGENTS.md Luật Tối Cao và rules/bespoke-creativity.md.

---

## 1. KHUNG HÌNH AN TOÀN MOBILE 9:16 (MOBILE SAFE ZONES)

- Khổ hình chuẩn: **1080 × 1920** (tỉ lệ 9:16), kiểm tra hiển thị sắc nét trên viewport điện thoại di động 360×640.
- **Phân bổ dọc cân bằng**: Bố cục nội dung phân bố hợp lý từ `y: 200` đến `y: 1650`. Tránh dồn cục lên đỉnh hoặc bỏ trống nửa dưới màn hình.
- **Top Margin Safe Zone (`y: 0 -> 160`)**: Chừa khoảng trống an toàn cho thanh trạng thái, notch tai thỏ / dynamic island.
- **Bottom Margin Safe Zone (`y: 1720 -> 1920`)**: Chừa khoảng an toàn cho thanh điều hướng, UI tương tác của TikTok / Reels / Shorts.

---

## 2. KỶ LUẬT TYPOGRAPHY & CHỮ VIẾT (TEXT DISCIPLINE)

1. **CẤM CẮT CHỮ (NO TRUNCATION)**:
   - Tuyệt đối không dùng `overflow: hidden`, `text-overflow: ellipsis`, hay `-webkit-line-clamp` để giấu chữ thừa.
   - Nội dung chữ phải được viết gọn gàng, vừa vặn tự nhiên với khung hình.
2. **CẤM CO CHỮ (NO SHRINK-TO-FIT)**:
   - Tuyệt đối không tự động giảm cỡ chữ thu nhỏ bất thường làm vỡ tỷ lệ typography và gây khó đọc trên mobile.
3. **CẤM RENDER KHUNG RỖNG (NO EMPTY CONTAINERS)**:
   - Khi title, description hoặc nhãn rỗng (`undefined`, `null`, `""`), component phải `return null`, tuyệt đối không render wrapper hay viền nền trống trơn.

---

## 3. QUY ĐỊNH VỀ FONT TIẾNG VIỆT (VIETNAMESE TYPOGRAPHY MANDATE)

1. **Font Bản Ngữ Tiếng Việt Chuẩn Xác 100%**:
   - Ưu tiên số 1: `Be Vietnam Pro`, `Montserrat`, `Segoe UI`.
   - Nghiêm cấm dùng font Latin thiếu dấu (lỗi Font Fallback Mismatch: chữ có dấu dùng font khác khiến nét chữ to nhỏ lệch lạc, dấu bị méo hoặc thụt lệch).
2. **Cơ Chế Nạp Font An Toàn**:
   - Khi render Remotion, sử dụng `@remotion/fonts` hoặc Google Fonts kết hợp barrier `delayRender()` / `continueRender()` để đảm bảo font được nạp hoàn chỉnh trước khi xuất frame.
3. **Kỷ Luật CSS Typography Tiếng Việt**:
   - Chỉ dùng `font-weight` hợp lệ theo CSS: `400`, `500`, `600`, `700`, `800`, `900`.
   - Nghiêm cấm co hẹp khoảng cách chữ âm (`letter-spacing` âm) trên văn bản tiếng Việt vì sẽ khiến các dấu thanh bị đè dính vào nhau.

---

## 4. PHỤ ĐỀ ĐỒNG BỘ THEO TỪ (SPEECH-SYNCED SUBTITLES)

- Sử dụng `SpeechSyncedSubtitles` (`@/shared`) với timing từng từ trích xuất từ CIT Voice Studio.
- **Nguyên tắc:**
  * Hiện sẵn cụm từ ngắn theo nhịp câu (khoảng 5-8 từ).
  * **Chỉ từ đang đọc đổi màu highlight**. CẤM đổi cỡ chữ, độ đậm, hoặc scale (không dùng `scale(1.15)`) làm nhảy dòng / rung chữ.
  * **Zero Speech = Zero Sub**: Khi im lặng (`activeIndex === -1`), ẩn hoàn toàn cả chữ lẫn nền phụ đề (`return null`).
  * Vị trí hiển thị an toàn: mặc định `positionY: 1530` (nằm trên vùng điều hướng bottom).

---

## 5. TIÊU CHUẨN ÂM THANH: ZERO-SFX & EBU R128

1. **Lệnh Cấm SFX Hoàn Toàn (Zero-SFX Mandate)**:
   - Không chèn hiệu ứng âm thanh vi mô (SFX: whoosh, click, impact, pop, laser, glitch, beep, chime...).
   - Cấu trúc âm thanh CHỈ gồm 2 tầng duy nhất:
     * **Tầng 1 (Chính)**: Giọng đọc AI thuyết minh (VieNeu-TTS Hải Đăng 48kHz, to rõ, tự nhiên).
     * **Tầng 2 (Nền)**: Nhạc nền BGM (âm lượng dịu êm, nép sau giọng đọc ở mức -18dB đến -22dB).
2. **Chuẩn Đo EBU R128**:
   - `Integrated Loudness`: **-14.0 đến -12.0 LUFS** (chuẩn **-12.5 LUFS** cho TikTok/Reels/Shorts).
   - `True Peak`: **< -1.0 dBFS** (chống méo tiếng/clipping).
   - `Loudness Range (LRA)`: **< 8.0 LU**.
