# Visual Storytelling Rules — Thiết Kế Chuẩn Mobile 9:16 (1080 × 1920)

## Phạm vi

Áp dụng cho mọi video sản xuất bằng Remotion Engine. Mục tiêu tối thượng là trải nghiệm thị giác điện ảnh, giữ chân người xem (retention) cao độ trên thiết bị di động (kiểm tra chuẩn xác trên viewport 360×640).

---

## NGUYÊN TẮC CỐT LÕI: KHÔNG STYLE CỐ ĐỊNH — PHỐI TRỘN SÁNG TẠO [THỊ GIÁC] × [CHUYỂN ĐỘNG]

> [!IMPORTANT]
> 1. **KHÔNG CÓ STYLE CỐ ĐỊNH (ZERO FIXED TEMPLATES)**: Nghiêm cấm rập khuôn hay đóng khung video vào một style mặc định duy nhất. Mỗi sản phẩm phải là sự sáng tạo độc bản, tạo dấu ấn thị giác mạnh mẽ.
> 2. **CÔNG THỨC BẮT BUỘC [THỊ GIÁC] × [CHUYỂN ĐỘNG]**:
>    - **Phong cách Thị giác**: Xác lập không gian thẩm mỹ, bảng màu, chất liệu (3D vô cực, OLED đen sâu, neon cyber, editorial báo chí...) và typography tương phản cao.
>    - **Ngôn ngữ Chuyển động**: Xác lập động lực học vật lý (Spring physics đầm hoặc nảy), góc máy 3D (graze-tour, exploded-view), diễn hoạt biểu đồ SVG, kinetic text slam và âm thanh tối giản (BGM dịu êm, TUYỆT ĐỐI CẤM SFX).
> 3. **CHUYỂN ĐỘNG HOÀN HẢO 100%**: Easing mượt mà, triệt tiêu giật lag, đồng bộ chuẩn xác từng từ với giọng đọc AI.
> 4. **KIẾN TRÚC PHÂN CẢNH ĐỘNG — CẤM FIX CỨNG 6 CẢNH (ZERO FIXED 6-SCENE CONSTRAINT)**:
>    - Tuyệt đối không ép mọi video vào khuôn mẫu 6 cảnh (`Hook -> Problem -> Solution -> Workflow -> Benefits -> Outro`). Rập khuôn 6 cảnh sẽ làm video nghèo nàn, dễ đoán và bỏ lỡ các ý sâu của chủ đề.
>    - Số cảnh ($N$ cảnh) phải linh hoạt theo chiều sâu ý tưởng và thời lượng (3-4 cảnh cho Micro-Explainer 30s, 4-5 cảnh cho Myth-Busting, 6-9 cảnh cho Case Study/Deep Dive, hoặc $N$ cảnh cho Step-by-Step).
>    - Nguyên tắc: "Ý nào cảnh đó — Chuyển ý là chuyển cảnh". Không neo cảnh quá lâu (>12-15s), không cắt nhỏ máy móc.

---

## KIẾN TRÚC 4 TẦNG KHÔNG GIAN BẮT BUỘC (STRICT 4-ZONE VERTICAL ARCHITECTURE)

Để triệt tiêu vĩnh viễn hiện tượng **đè hình (collision)** và **khoảng trống thừa (dead space)**, toàn bộ khung hình 1080×1920 BẮT BUỘC tuân thủ phân tầng nghiêm ngặt thông qua component chuẩn `<SmartSceneLayout />`:

```text
┌────────────────────────────────────────────────────────┐ y: 0
│                   SAFE TOP MARGIN                      │
├────────────────────────────────────────────────────────┤ y: 80
│ ZONE 1: TOP HEADER & TITLE (Cao: 340px)                │
│ • Eyebrow Badge: Chuyên mục, cảnh báo, mốc năm         │
│ • Headline chính: Chữ lớn 64-96px, tương phản mạnh     │
│ • Subheadline: Dòng diễn giải phụ 32-38px              │
├────────────────────────────────────────────────────────┤ y: 420 (Ranh giới Zone 1)
│                   Khoảng đệm an toàn                   │
├────────────────────────────────────────────────────────┤ y: 440 (Bắt đầu Zone 2)
│ ZONE 2: HERO VISUAL STAGE (Cao: 740px)                 │
│ • VÙNG ĐỘC QUYỀN: 3D Hologram, X-Ray Canvas, Chart Race│
│ • COLLISION GUARD: CẤM TUYỆT ĐỐI các thẻ dữ liệu tràn  │
│   vào vùng này làm che khuất vật thể trung tâm         │
│ • Chỉ cho phép các nhãn Callout nhỏ có đường dóng trỏ  │
├────────────────────────────────────────────────────────┤ y: 1180 (Kết thúc Zone 2)
│                   Khoảng đệm an toàn                   │
├────────────────────────────────────────────────────────┤ y: 1200 (Bắt đầu Zone 3)
│ ZONE 3: DATA CARDS & BENTO DOCK (Cao: 420px)           │
│ • Đặt các thẻ số liệu Hero Metric, Bento, So sánh      │
│ • Chiều cao tối đa: 420px (y: 1200 -> 1620)            │
│ • Tận dụng trọn vẹn nửa dưới để triệt tiêu dead space  │
├────────────────────────────────────────────────────────┤ y: 1620 (Kết thúc Zone 3)
│                   Khoảng đệm an toàn                   │
├────────────────────────────────────────────────────────┤ y: 1660 (Bắt đầu Zone 4)
│ ZONE 4: SUBTITLE DOCK (Cao: 180px)                     │
│ • Khung phụ đề kính mờ đồng bộ từng từ (y: 1660->1840) │
│ • Nằm an toàn trên thanh điều hướng UI của TikTok/Reels│
├────────────────────────────────────────────────────────┤ y: 1840
│                   SAFE BOTTOM MARGIN                   │
└────────────────────────────────────────────────────────┘ y: 1920
```

> [!CAUTION]
> **QUY TẮC BẢO VỆ TẦNG NHÌN (COLLISION GUARD MANDATE)**:
> - **Tuyệt đối cấm** đặt thẻ dữ liệu đè lên Zone 2 (`y: 440 -> 1180`). Mọi thẻ số liệu, thẻ so sánh, bảng biểu phải được hạ xuống **Zone 3 (`y: 1200 -> 1620`)**.
> - Không dùng `marginTop` tùy tiện đẩy thẻ lên nửa trên màn hình gây che khuất mô hình 3D.

---

## TIÊU CHUẨN ĐỒ HỌA Y SINH & CÔNG NGHỆ (X-RAY MEDICAL HOLOGRAM)

Đối với các dự án y tế, sinh học, giải phẫu người hoặc cơ chế kỹ thuật phức tạp:

1. **LỆNH CẤM KHỐI HÌNH HỌC THÔ SƠ (ANTI-CRUDE-GEOMETRY)**:
   - **CẤM HOÀN TOÀN** việc dùng các khối hình học cơ bản của Three.js (Cylinder, Torus, Tube uốn lượn lò xo) để tự vẽ cơ thể người, tim, phổi, dạ dày, ruột hay các cơ quan nội tạng. Cách làm này tạo ra các mô hình trông giống "ống nước nhựa", thô kệch, phản cảm và phi y khoa.
   - Các khối Cylinder/Box/Torus chỉ được phép dùng làm biểu đồ trụ, hạt phân tử (particles), lưới không gian hoặc chi tiết máy móc nhân tạo.
2. **CHUẨN MỰC X-RAY MEDICAL HOLOGRAM**:
   - Mọi cơ quan nội tạng, cơ thể người hoặc vật thể sinh học phức tạp phải sử dụng component chuẩn **`<XRayDigestiveHologram />`** hoặc kỹ thuật **Multi-Layer Anatomical Vector/Asset**:
     * **Bóng dáng cơ thể (Torso Silhouette)**: Bán trong suốt, có lồng ngực (ribcage) và cột sống (spine) thanh thoát phát sáng xanh Fresnel cyan (`#00f0ff` / `#38bdf8`).
     * **Cơ quan giải phẫu chính xác**: Có cấu trúc tự nhiên chuẩn y khoa (ví dụ: dạ dày chữ J có nếp gấp niêm mạc, đại tràng có các rãnh múi phình haustra đặc trưng, ruột non uốn lượn mềm mại).
     * **Pulsing Lesion Hotspot**: Điểm tổn thương / khối u ung thư phát xung nhịp đỏ rực (`#ef4444`) kèm vòng tròn radar sóng âm và đường dóng Callout chỉ dẫn chi tiết.
     * **Tia quét Laser X-Ray**: Dải sáng phẳng cyan quét tuần hoàn từ trên xuống mô phỏng máy chụp cắt lớp CT/MRI thời gian thực.

---

## 5 Trụ Cột Sáng Tạo Đột Phá — Chuẩn Hybrid 3D WebGL & 2.5D Spatial HUD

Khi sản xuất video giải thích hoặc phóng sự công nghệ, tài chính, y khoa, bắt buộc áp dụng:

1. **3D Realtime WebGL & 2.5D Hologram Stage**:
   - Sử dụng `@remotion/three` (`<ThreeCanvas>`) kết hợp `<XRayDigestiveHologram>` cho sân khấu trung tâm Zone 2.
   - Vật liệu phát quang sinh học bán trong suốt, kết hợp ánh sáng Fresnel cyan và các hạt phân tử trôi nổi bằng `<Sparkles>`.
2. **2.5D Spatial Glass HUD Cards (Thẻ số liệu không gian 2.5D)**:
   - Mọi thẻ thông tin tại Zone 3 sử dụng `SpatialHUDCard` với container `perspective: "1200px"`, viền phát quang neon, 4 góc brackets `[ ]` kỹ thuật và tia laser quét bề mặt.
3. **Micro-Simulation & Visual Metaphors (Mô phỏng vi phẫu & Ẩn dụ thị giác)**:
   - Dựng trực quan cơ chế can thiệp (ví dụ: nội soi ESD bóc tách polyp, tia laser triệt tiêu tế bào ác tính).
4. **Dynamic Camera Breathing & Parallax**:
   - Khung hình luôn có nhịp thở điện ảnh chậm: `scale` từ 1.00 -> 1.025, micro-tilt xoay `0.3deg`, kết hợp nền đo nhịp tim (telemetry / ECG wave) chạy tuần hoàn.
5. **Speech-Synced Subtitles Chuẩn Mực**:
   - Hiện sẵn cụm từ ngắn trong khung kính mờ. **Chỉ từ đang đọc đổi màu highlight**. CẤM đổi cỡ chữ hoặc scale làm nhảy dòng rung chữ. Zero Speech = Zero Sub.

---

## QUY ĐỊNH BẮT BUỘC VỀ TYPOGRAPHY & FONT TIẾNG VIỆT (VIETNAMESE TYPOGRAPHY MANDATE)

1. **Font Bản Ngữ Tiếng Việt Chuẩn Xác 100%**:
   - Sử dụng ưu tiên số 1: `Be Vietnam Pro`, `Montserrat`, `Segoe UI`.
   - Nghiêm cấm sử dụng các font chỉ hỗ trợ Latin cơ bản (như Inter bản thiếu dấu, Roboto gốc) gây lỗi "Font Fallback Mismatch" (hiện tượng chữ nhảy lò cò: chữ không dấu dùng font này, chữ có dấu dùng font khác khiến nét chữ to nhỏ lệch lạc, dấu bị méo hoặc thụt lệch).

2. **Cơ Chế Nhúng & Nạp Font Tuyệt Đối An Toàn**:
   - **Khi render SVG / Storyboard HTML**: Bắt buộc nhúng `@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap');` vào thẻ `<defs><style>` của SVG và `<head>` của HTML.
   - **Khi render Remotion**: Nạp font thông qua `@remotion/fonts` hoặc Google Fonts kết hợp barrier `delayRender()` / `continueRender()`. Đảm bảo font sẵn sàng 100% trước khi xuất frame video.

3. **Kỷ Luật CSS Typography Tiếng Việt**:
   - Chỉ dùng `font-weight` hợp lệ theo thang chuẩn CSS: `400`, `500`, `600`, `700`, `800`, `900` (tuyệt đối cấm các số tùy tiện như 950).
   - Nghiêm cấm co hẹp khoảng cách chữ âm (`letter-spacing: -1px` hoặc âm) trên văn bản tiếng Việt vì sẽ khiến các dấu thanh (sắc, huyền, hỏi, ngã, nặng, ơ, ư) bị đè dính vào nhau.

---

## TIÊU CHUẨN ÂM THANH: ZERO-SFX & BROADCAST BGM (NO SFX MANDATE)

> [!IMPORTANT]
> **LỆNH CẤM SFX HOÀN TOÀN TRÊN TOÀN BỘ VIDEO**:
> - Người dùng cấm 100% việc chèn hiệu ứng âm thanh vi mô (SFX: whoosh, click, impact, pop, laser, glitch, beep, chime...).
> - Toàn bộ audio chỉ gồm đúng 2 tầng:
>   1. **Voiceover**: Giọng đọc AI chính (VieNeu-TTS Hải Đăng 48kHz), trong trẻo, tự nhiên, âm lượng chủ đạo.
>   2. **Nhạc nền BGM**: Âm lượng êm dịu, nép sau giọng đọc (volume ~ 0.10 - 0.13, khoảng -18dB đến -22dB).
> - Chuẩn EBU R128: Integrated Loudness từ **-14.0 đến -12.0 LUFS** (chuẩn **-12.5 LUFS**), True Peak `< -1.0 dBFS`, LRA `< 8.0 LU`.

---

## QA Bằng Hình Ảnh Thực Tế

1. **Kiểm tra 4 Zones**:
   - Chụp frame tĩnh kiểm tra: Zone 1 không đè Zone 2, Zone 2 không bị thẻ Zone 3 che khuất, Zone 3 tận dụng trọn vẹn nửa dưới, Zone 4 hiển thị phụ đề rõ ràng.
2. **Kiểm tra trên Viewport 360×640**:
   - Đảm bảo toàn bộ chữ số liệu tại Zone 3 đọc sắc nét trên màn hình điện thoại thực tế.
3. **Bàn giao duy nhất 1 file Final MP4**:
   - Bỏ hẳn khâu preview, chỉ xuất trực tiếp `projects/<id>/output/final.mp4` chuẩn EBU R128 (-12.5 LUFS).
