---
name: motioncut
description: Dựng video motion graphics TIẾNG VIỆT từ MỘT CHỦ ĐỀ (không cần video gốc, không có người nói trước camera) — tự viết lời thoại, tạo giọng đọc offline (Piper), dựng cảnh động tông xanh nước biển bằng HTML/GSAP + vật 3D three.js (ô chat gõ chữ, thẻ kính lật 3D, biểu đồ vẽ dần, ảnh minh hoạ vector, con trỏ bấm nút), phụ đề chạy theo lời, nhạc nền + hiệu ứng âm thanh tự tổng hợp, rồi xuất MP4 dọc 9:16 (TikTok/Reels/Shorts) hoặc ngang 16:9. Dùng khi người dùng nói "motioncut", muốn "làm video giọng đọc + hình động như video mẫu", "video truyền động lực / tư duy / tự học", "làm kênh TikTok thuần video kiểu này", "video 60–90 giây có voice và CTA cuối", hoặc gửi một video motion-graphics mẫu và hỏi có làm được không. Có người nói trước camera cần dựng lại thì dùng luancut / seecut.
---

# motioncut · video chủ đề → lời thoại + giọng + hình động + âm thanh → MP4

Một chủ đề đi vào, một MP4 đi ra: **kịch bản → giọng đọc → cảnh HTML/GSAP → chụp từng khung hình → trộn âm → ghép**. Không cần video gốc. Cùng phong cách "tông xanh nước + chữ Playfair nghiêng" của luancut nhưng cho video **không có người nói**.

`$MC` = thư mục skill này (thường `~/.claude/skills/motioncut`). Mọi lệnh gọi `python3` (Windows: `python -X utf8`).

## 0 · Chuẩn bị (một lần)
```
python3 $MC/scripts/setup.py
```
Kiểm tra ffmpeg, Node + playwright (Chromium), numpy/Pillow/piper-tts và **tải giọng đọc tiếng Việt** (~67 MB từ github.com) về `$MOTIONCUT_HOME/voices` (mặc định `~/.cache/motioncut`). Thiếu gì script báo đúng lệnh cài. Máy chặn mạng → xin người dùng cho phép `github.com` rồi chạy lại.

## 1 · Hỏi trước khi làm (gộp trong một câu)
1. **Chủ đề + góc nói** (truyền động lực? giải thích? kể chuyện?). 2. **Khung 9:16 hay 16:9** (kênh TikTok/Reels/Shorts → 9:16). 3. **Độ dài** (mặc định 60–90 s) và **giọng văn** (mặc định trung tính-ấm; "cọc cằn / xưng mày" nếu người dùng muốn thúc ép). 4. **CTA cuối** là gì (đi làm việc gì, follow, lưu/chia sẻ…) và **tên kênh/logo** nếu có. *Không tự thêm "comment để…" nếu người dùng không yêu cầu.* 5. Có ảnh thật của họ không? Không có thì dùng ảnh minh hoạ vector (mặc định).

## 2 · Viết kịch bản → `script.json`
Đọc `references/kich-ban.md` (công thức hook → vấn đề → bằng chứng → cơ chế → các bước → CTA, giọng văn, độ dài, **kiểm chứng số liệu/trích dẫn**, quy tắc viết cho giọng đọc). Định dạng:
```json
[["a1","Câu 1"],["a2","Câu 2"],["b1","Câu 3 (cảnh mới → chữ cái đầu đổi)"], ...]
```
id = `<chữ cái cảnh><số>`; đổi chữ cái → thêm khoảng nghỉ giữa cảnh. Một câu ≤ ~12 từ cho dễ đọc, ~30 câu ≈ 90 s.

## 2b · Người dùng đã có voice (ElevenLabs, thu âm…) — KHÔNG dùng giọng máy
```
python3 $MC/scripts/new_project.py <dự_án> --template 9x16
(đặt kịch bản vào <dự_án>/script.json — thêm câu hook nếu voice đọc cả câu hook; mỗi câu một mục [id, text])
python3 -X utf8 $MC/scripts/align_voice.py <dự_án> <voice.mp3>
```
`align_voice.py` nhận dạng giọng offline rồi **canh từng câu và từng từ của script vào đúng giây trong voice** (in bảng câu → giây + % khớp; câu < 50 % = voice nói khác script → hỏi lại người dùng). Nó ghi `voice.wav`, `timing.json`, `timing.js` (kèm `words` từng câu) và đặt `external_voice: true` trong `project.json` để `build.py` không tạo giọng Piper. Trong `index.html` dùng `at(id, từ)` lấy mốc **từ thật** (không còn ước lượng theo ký tự). Số/ký hiệu/từ tiếng Anh nhận dạng khác chữ được nội suy từ các từ khớp lân cận. Lỗi chính tả trong kịch bản của người dùng (vd. "bỏ bé" → "bỏ bẵng") sửa và báo lại.

## 3 · Tạo dự án từ mẫu
```
python3 $MC/scripts/new_project.py <thư_mục> --template 9x16     # hoặc 16x9
```
Mẫu (`templates/`): **`tu-hoc-9x16`** (dọc, giọng cọc cằn + CTA đồng hồ/follow, 7 cảnh), **`tu-duy-nguoc-16x9`** (ngang, giọng ấm, 7 cảnh) và **`phan-du-chu-y-3d-16x9`** (`--template 16x9-3d`: ngang, **vật 3D three.js** khớp theo lời, phụ đề Việt + phụ đề Anh nhỏ, dòng chữ chạy góc trên trái, tông xanh dương + nhiều màu phụ — xem mục 3b). Chọn mẫu gần nhất rồi **viết lại `script.json` và phần cảnh trong `index.html`** theo chủ đề mới.

## 3b · Mẫu 3D (`16x9-3d`) — video tâm lý học kiểu "Hook → khái niệm → ví dụ hai người → khái niệm liên quan → lời khuyên → CTA"
Mẫu này **cần voice có sẵn** (ElevenLabs/thu âm) vì `at(id, từ)` đọc mốc từng từ do `align_voice.py` sinh ra (cần `pip install sherpa-onnx`; mô hình nhận dạng ~26 MB tự tải lần đầu). Quy trình:
```
python3 $MC/scripts/new_project.py <dự_án> --template 16x9-3d
(viết <dự_án>/script.json: câu hook = a0, rồi a1.., b1.., c1.. … g1 = câu Follow)
python3 -X utf8 $MC/scripts/align_voice.py <dự_án> <voice.mp3>
(sửa index.html: ENG, build3d(), build() — giữ nguyên phần còn lại)
python3 $MC/scripts/build.py <dự_án> --preview 2,8,15,25,40,60,80,100
python3 $MC/scripts/build.py <dự_án>
```
Cấu trúc `index.html` (sửa đúng 3 chỗ, phần khác dùng chung):
- **`const ENG = {...}`** — phụ đề tiếng Anh cho từng id câu, mỗi dòng **≤ ~120 ký tự** (dài hơn bị tràn khung).
- **`function build3d()`** — mỗi vật: `prop(group, t0, t1, upd, base)` hoặc `mkProp(obj, x, y, t0, t1, (t, obj, g) => …, base)`; `pop(o, t, t0)` bật từng phần; `ease/eio/back`; `makeCurveTube` + `drawTube` vẽ đường cong dần. Vật dựng sẵn: Phone, Eye, Book, Clock, Bell, Calendar, Note, Pencil, Tab, Balance (cân), Gem, Trophy, Target + Arrow, Flag, Mountain, Runner/Figure, Tunnel, Moon, Sun, Heart, Gear, Cards, Clipboard, Dumbbell, Cup, Headphones… Vật liệu: CY, ICE, NAVY, DARK, GREY, SNOW, GOLD, RED, PURPLE, GREEN, ORANGE, PINK.
- **`function build()`** — chữ DOM theo cảnh A–G (`PILL`, `CTR`, `wordsEl` + `reveal/revealAt`, `typer`, `enter/leave`, `glowTo` đổi màu nền: glow/glowB xanh, glowH cam, glowP tím, glowG lục) và âm thanh `fx(t, kind)`.
- Dòng chữ chạy góc trên trái: tìm `Nội dung được thiết kế bởi` trong phần `drive` để đổi tên kênh/tác giả.

Quy tắc đã rút ra (đừng bỏ):
- 1 đơn vị 3D = 100 px, (0,0) = tâm khung. **Vùng an toàn cho vật 3D: y từ −2.5 đến +2.6** (≈ px 280–790), |x| ≤ 8.6. Chữ/pill đặt ở **top 110–330 px**; phụ đề Việt ở 916 px, Anh ở 1002 px — vật không được đè lên chữ.
- **Không để quãng trống không có vật 3D** (kể cả 0.3–1 s giữa hai câu): cho vật cảnh trước tắt ở `st(câu_kế) - .1` và vật cảnh sau bật cùng lúc.
- Vật chính phải **đủ to, rõ** (base 1.0–1.6); vật nhỏ quan trọng thì phóng to. Cảnh CTA: vật lớn đặt **hai bên (|x| ≈ 7.5) và phía trên (y ≈ 3.5)**, không đè thẻ chữ và nút Follow, không chạm mép.
- Nhãn chữ trên vật 3D dùng `textLabel(...)` (canvas, có đủ dấu tiếng Việt). Tránh ký tự lạ như `~` (font có thể vẽ sai) — viết "khoảng 50%".
- Màu **đậm, không nhạt**: giữ emissive thấp như bộ vật liệu sẵn có; tông chính xanh dương, thêm màu phụ theo nghĩa (đỏ = sai/mất, lục = đúng/lợi, vàng = giá trị, tím = tâm trí).
- `at(id, từ)` tìm theo chuỗi con, chữ thường — từ phải có trong câu, cẩn thận từ ngắn ('ba' khớp nhiều chỗ); sai là trang báo lỗi "không thấy từ".
- Dựng ~2 phút video mất ~10 phút trên 4 nhân CPU.

## 4 · Sửa `index.html` (cốt lõi của skill)
Đọc `references/ky-thuat.md` trước. Tóm tắt hợp đồng:
- Trang phải có `window.READY=true`, `seek(t)`, `window.DURATION`, `window.SFX` — `render.mjs` chụp từng khung bằng cách gọi `seek(i/fps)`.
- `timing.js` (do bước giọng sinh ra) đặt `TIMING` = từng câu `{id,text,start,end}`. Trong `build()` canh mọi chuyển động theo lời: `st('c2')`, `en('c2')`, `at('c2','nghỉ')` (giây ước lượng khi từ đó được nói, theo tỉ lệ ký tự — **từ phải có thật trong câu**, tìm theo chuỗi con nên cẩn thận 'mà' ⊂ 'mày').
- Hàm sẵn có: `scene(sel,a,b)` bật/tắt cảnh · `enter/leave` · `reveal(sel,t0,t1)` hiện từng từ `.w` · `typer(el,text,hl,t0,dur)` gõ chữ (tự thêm tiếng gõ) · `fx(t,kind,gain)` hẹn hiệu ứng âm thanh (loại: whoosh, whoosh_fast, whoosh_long, tick, click, pop, ding, bell_lo, shimmer, impact, scratch, outro) · `drive(t)` cho thứ chạy liên tục (dải sáng nền, quả địa cầu xoay, phụ đề chạy theo lời).
- Thư viện cảnh có trong mẫu: ô chat gõ chữ, hàng pill + con trỏ bấm, thẻ kính lật 3D 2 mặt, thanh/biểu đồ vẽ dần (có số đếm), chồng khối, thẻ nhân vật + chân dung vector, kệ sách, quả địa cầu, điện thoại + app, đồng hồ vòng đếm ngược, thẻ Follow, logo + chữ bay vào.
- **Ảnh minh hoạ = vector tự vẽ trong SVG** (máy thường chặn trang ảnh). Có ảnh thật thì đặt vào dự án và dùng `<img>`/`<image>`; chỉ dùng ảnh người dùng gửi hoặc nguồn có giấy phép rõ ràng.

## 5 · Xem trước rồi mới dựng
```
python3 $MC/scripts/build.py <dự_án> --preview 2,10,25,40,60,70     # → preview/sheet.png (đọc ảnh, soi chữ bị chìm/đè/thiếu dấu)
python3 $MC/scripts/build.py <dự_án> --limit-sec 8 --out thu.mp4     # thử âm thanh + ghép (tuỳ chọn)
python3 $MC/scripts/build.py <dự_án>                                  # → <dự_án>/out.mp4
```
Dựng đủ 90 s mất ~6–7 phút (chụp khung song song theo số nhân CPU). Gửi file cho người dùng bằng `SendUserFile`.

## 6 · Kiểm tra trước khi giao
- Mọi cảnh: chữ **không chìm vào dải sáng** (đã có viền tối + lớp `#dim` — giữ nguyên), không tràn khung, đủ dấu tiếng Việt.
- Cuối video có **CTA rõ** đúng yêu cầu; câu cuối không bị cắt (tail ≥ 3 s).
- Nói thật với người dùng: **chưa nghe được giọng đọc** (không có thiết bị nghe) → nhờ họ nghe thử; thời điểm từng chữ trong phụ đề là ước lượng, có thể lệch vài trăm ms.
- Giọng Piper vẫn hơi "máy". Có giọng thật/ElevenLabs/FPT.AI thì thay `voice.wav`, nhưng `timing.json` phải khớp theo câu (xem `references/ky-thuat.md` mục "đổi giọng").

## Giấy phép — nhắc người dùng khi định kiếm tiền
Mô hình giọng `vi_VN-vais1000` (Piper) **chưa được xác minh giấy phép dùng thương mại** — kiểm tra trước khi dùng cho kênh có quảng cáo/bán hàng, hoặc thay bằng giọng có giấy phép rõ. GSAP và font: xem `NOTICE`.
