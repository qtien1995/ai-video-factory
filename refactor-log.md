# REFACTOR LOG — AI VIDEO FACTORY V4 (BESPOKE)

## BƯỚC 0 — AN TOÀN
- Tạo branch: `refactor/bespoke-factory`
- Snapshot commit ban đầu: `a19c7b7 wip: snapshot before bespoke refactor`
- Tag an toàn: `before-bespoke`

## BƯỚC 1 — GIỮ STYLES/DNA LÀM THAM KHẢO, CẮT CƠ CHẾ ÁP DỤNG; XOÁ KHUNG BÊN THỨ BA
- 1.1 Cứu component bị xếp nhầm:
  - Copy `ExplodedView3D.tsx`, `GrazeFaceTour3D.tsx`, `ProgressiveCardAssemble.tsx` từ `styles/cinematic-saas-craft/components/` sang `engines/remotion/src/shared/three/`.
  - Re-export trong `engines/remotion/src/shared/three/index.ts`.
  - Cập nhật import trong `engines/remotion/src/Root.tsx`.
- 1.2 Cắt cơ chế áp style bằng máy:
  - Đã xoá `styles/index.ts`, `styles/registry.json`.
  - Đã xoá toàn bộ `core/scripts/style/` (`index.js`, `exporter.js`).
  - Đã xoá `schemas/style.schema.json`.
  - Đã xoá aliases `@styles` và `@styles/*` trong `engines/remotion/tsconfig.json`.
  - Đã xoá script `"style"` trong `package.json`.
- 1.3 Gắn hiến chương tham khảo:
  - Tạo `styles/THAM-KHAO.md`.
  - Tạo `dna-vault/THAM-KHAO.md`.
- 1.4 Xoá khung áp mẫu của bên thứ ba:
  - Đã xoá `templates/` (bao gồm `templates/cuongit-explainer`).
  - Đã xoá `prompts/library/`.
  - Đã xoá `core/scripts/prompts/`.
  - Đã xoá `.agents/skills/prompts-chat/`.
  - Đã xoá `engines/remotion/.agents/` và `engines/remotion/.claude/`.
  - Đã xoá 4 file báo cáo cũ: `V4_BLUEPRINT_CONTEXT.md`, `REFACTORING_AUDIT_REPORT.md`, `BAO_CAO_KHAO_SAT_HE_THONG.md`, `SYSTEM_ARCHITECTURE_REPORT.md`.
  - Đã gỡ script `"prompts"` khỏi `package.json`.
- 1.5 Kiểm tra:
  - Grep kiểm tra `@styles`, `styles/registry`, `scripts/style`: 0 kết quả.
  - `npm run typecheck`: PASS (0 errors).
  - `npm test`: PASS (9/9 passed).

## BƯỚC 2 — GỠ HỆ THẺ, DỰNG CANVAS TRỐNG BespokeVideo
- Danh sách 13 composition project thật (CNT-*) trong Root cũ được gỡ khỏi Studio (toàn bộ code trong `projects/` vẫn giữ nguyên):
  1. `UngThuDaiTrucTrangVideo` (`CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3`)
  2. `UngThuDaiTrucTrangHookScene` (`CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3`)
  3. `CleanYourTvVideo` (`CNT-20261026-CLEANYOURTV-DEBLOAT-AI`)
  4. `AiJobSearchVideo` (`CNT-20261026-AI-JOB-SEARCH`)
  5. `FinCopilotVideo` (`CNT-20261029-FINCOPILOT-AI-PROMO`)
  6. `BhytBiKhoaVideo` (`CNT-20261029-BHYT-BI-KHOA-VIEN-PHI`)
  7. `BhytBiKhoaVideo3D` (`CNT-20261029-BHYT-BI-KHOA-VIEN-PHI`)
  8. `ViemGanRuouVideo` (`CNT-20261029-VIEM-GAN-RUOU-BENH-LY-NGHIEM-TRONG`)
  9. `CamCumSuyTimVideo` (`CNT-20261030-CAM-CUM-HOA-SUY-TIM-CAP-RSV`)
  10. `BietBoiSaoMangPhaoVideo` (`CNT-20261030-BIET-BOI-SAO-VAN-MANG-PHAO`)
  11. `TranhBienAllInVsPhongThuVideo` (`CNT-20261102-TRANH-BIEN-ALLIN-VS-PHONG-THU`)
  12. `VanCo300TyUsdTtckVideo` (`CNT-20261102-VAN-CO-300-TY-USD-TTCK`)
  13. `SuThatNgamBaoHiemVideo` (`CNT-20261103-SU-THAT-NGAM-BAO-HIEM-RUT-VON-LO`)
- Đã xoá: `engines/remotion/src/shared/CardArchetypes.tsx`, `engines/remotion/src/shared/SpatialHUDCard.tsx`, `engines/remotion/src/shared/SmartSceneLayout.tsx`, `engines/remotion/src/CanonicalVideo/`, `engines/remotion/src/examples/`, `rules/card-archetypes.md`.
- Đã tạo: `engines/remotion/src/BespokeVideo/index.tsx` (BespokeSpec, neutral placeholder sequence, SpeechSyncedSubtitles, UserBrandOutro, segmented progress bar, calculateBespokeMetadata).
- Đã viết lại `engines/remotion/src/Root.tsx`: CHỈ còn composition `BespokeVideo`.
- Đã cập nhật `engines/remotion/src/shared/index.ts`: gỡ export của 3 file thẻ đã xoá.
- Kiểm tra:
  - Grep kiểm tra `CardArchetypes`, `SpatialHUDCard`, `SmartSceneLayout`, `CanonicalVideo` trong `engines/remotion/src`: 0 kết quả.
  - `npm run typecheck`: PASS.
  - `npm test`: PASS.
  - Render thử 450 frames của `BespokeVideo` ra file tạm: ffprobe xác nhận 1080x1920, 30fps, 450 frames, 15.00s. File tạm đã xoá.

## BƯỚC 3 — CẮT ĐƯỜNG DNA→STYLE, DỌN PHẦN CÒN LẠI, KHÓA GIỌNG HẢI ĐĂNG
- 3.1 DNA chỉ còn là đo + tham khảo:
  - Đã gỡ `exportDnaToStylePack` khỏi `core/scripts/dna/analyze.js`.
  - Kiểm chứng analyze lên video mẫu: sinh profile vào `dna-vault/`, git status xác nhận `styles/` không thay đổi.
- 3.2 Tạo `core/scripts/validate/reference.js`:
  - Đo duration, resolution, fps, LUFS + true peak (EBU R128), cut timestamps, silence > 0.7s. In JSON ra stdout, không ghi file.
- 3.3 Xoá primitive y tế:
  - Đã xoá `engines/remotion/src/shared/XRayDigestiveHologram.tsx`, `engines/remotion/src/shared/three/Medical3DPrimitives.tsx`, `engines/remotion/src/shared/three/Liver3DPrimitives.tsx`.
  - Gỡ import/export liên quan trong `shared/index.ts` và `shared/three/index.ts`.
- 3.4 Chuyển dữ liệu output cũ:
  - Tạo `projects/archive-van-co-300-ty-usd-ttck/` và git mv toàn bộ scenes từ `engines/remotion/public/van-co-300-ty-usd-ttck/` sang đó.
  - File captions `emergency-insurance.json` không thuộc video van-co nên giữ nguyên.
- 3.5 Chuẩn hoá đường dẫn config:
  - Thay thế mọi path tuyệt đối `D:\VIDEO AI` và `D:\AI\VIDEO AI` trong `config/gen-video.json` và `config/factory-config.json` thành đường dẫn tương đối (`"."`).
- 3.6 Viết lại `config/component-index.json` thành danh mục KHẢ NĂNG (chỉ giữ các components còn tồn tại).
- 3.7 Cập nhật skill `.agents/skills/remotion-explainer/SKILL.md` chuẩn V4 Bespoke với đoạn văn bắt buộc.
- 3.8 Khóa giọng Hải Đăng + mở tốc độ TTS:
  - Gán cứng `voice = "Hải Đăng"` trong nhánh CIT Voice Studio.
  - Dừng và báo lỗi khi CIT offline (chỉ fallback Edge-TTS khi `ALLOW_VOICE_FALLBACK=1`).
  - Tốc độ đọc resolution: `--speed` -> `inputProps.json` (`spec.ttsSpeed`) -> mặc định `0.85`.
- Kiểm tra cuối bước:
  - `npm run typecheck`: PASS.
  - `npm test`: PASS.

## BƯỚC 4 — LUẬT MỚI + CỔNG QC CỨNG + BỎ FAST-TRACK + TÀI LIỆU
- 4.1 Thay toàn bộ `AGENTS.md` bằng PHỤ LỤC A (nguyên văn).
- 4.2 Tạo `rules/bespoke-creativity.md` bằng PHỤ LỤC B (nguyên văn).
- 4.3 Viết lại `rules/visual-storytelling.md`: giữ typography tiếng Việt, phụ đề đồng bộ, safe-zone 9:16, kỷ luật chữ (không cắt chữ/không co chữ/không khung rỗng); xoá mọi phần thiết kế thẻ/bố cục mẫu/kiến trúc 4 vùng; thêm câu nguyên tắc số 1 ở đầu file.
- 4.4 Cổng QC cứng trong `core/scripts/factory/make.js`:
  - Sau render: (a) trích frame tĩnh tại 10/30/50/70/90% vào `output/storyboard-check/`; (b) chạy bộ kiểm định `tests/e2e/test_final_video.cjs`; (c) fail bất kỳ tiêu chuẩn nào -> đổi tên thành `final.FAILED.mp4`, exit 1. Chỉ giữ `final.mp4` khi pass 100%.
- 4.5 Bỏ hoàn toàn fast-track:
  - Gỡ lệnh fast-track khỏi `core/scripts/factory/index.js` và usage.
  - Trong `make.js`: kiểm tra cổng duyệt qua `factory next`, nếu thuộc {SCRIPT, BEATS, GATE1, CREATIVE_DIRECTION, GATE2} thì dừng ngay, cấm tự duyệt.
- 4.6 Viết lại `README.md` chuẩn V4 Bespoke (dưới 120 dòng).
- 4.7 Rút gọn `MAINTENANCE.md` còn dưới 1 trang vận hành hiện hành.
- Kiểm tra:
  - Grep "fast-track" trong `core/scripts/factory`: 0 kết quả thực thi.
  - `npm run typecheck`: PASS.
  - `npm test`: PASS.
  - Thử nghiệm make trên dự án chưa duyệt: dừng đúng cách, báo lỗi Gate Check Blocked.


## BƯỚC 5 — NGHIỆM THU BẰNG 1 VIDEO THẬT
- Tạo dự án nghiệm thu `projects/test-bespoke-01/`:
  - `art-direction.md` & `creative-direction.md`: Viết theo chuẩn PHỤ LỤC B (Bespoke Creative Direction Sheet), có mục 6 ghi rõ nguyên liệu tham khảo mượn từ `styles/` và `dna-vault/` cùng cách biến đổi cho nội dung tài chính.
  - `script.md`: Kịch bản 6 cảnh chủ đề tài chính cá nhân ("3 Lỗ Hổng Khiến Người Kiếm Trăm Triệu Vẫn Rỗng Túi"), viết theo phong cách tự nhiên (reels-scripting + humanizer).
  - `beats.json` & `storyboard.json`: Phân bổ nhịp điệu và hình ảnh chi tiết cho 6 cảnh.
  - Audio & Timing: Nạp audio giọng Hải Đăng 48kHz (`assets/audio/narration.mp3`) với 57.028s (1711 frames @ 30fps) và timing từng từ (`assets/audio/timing.json`).
  - `specs/video-spec.json`: Đặc tả kỹ thuật chuẩn VideoSpec schema (9:16, 1080x1920, 30fps, target duration 57029ms).
  - `remotion/TestBespoke01Video.tsx`: Dựng bespoke độc bản kết hợp hơn 3 kỹ thuật thị giác:
    1. Kinetic typography & dynamic SVG timeline.
    2. Dynamic comparative SVG multi-track line chart.
    3. 3D rotating shield / concentric vault rings.
    4. Dynamic audio waveform & pulsing micro-motion.
    5. Animated floating brand outro with scanning streak.
    - Tuyệt đối không import từ `styles/`, không dùng các component thẻ đã xoá.
  - Đăng ký composition `TestBespoke01` trong `engines/remotion/src/Root.tsx`.
- Pipeline Execution & Cổng QC cứng:
  - Chạy `npm run make -- --project test-bespoke-01`.
  - Tự động trích xuất 5 still frames vào `output/storyboard-check/`.
  - Tự động chạy bộ kiểm định `tests/e2e/test_final_video.cjs`.
  - Kết quả kiểm định: **22/22 assertions PASS (100%), Exit Code 0**.
  - File bàn giao duy nhất: `projects/test-bespoke-01/output/final.mp4` (25.67 MB > 5MB).
  - Đo lường thực tế:
    - Thời lượng: 57.03s (chuẩn broadcast 45-90s).
    - Integrated Loudness: -13.2 LUFS (chuẩn -14.0 đến -12.0 LUFS).
    - True Peak: -1.4 dBFS (chuẩn < -1.0 dBFS).
    - LRA: 1.0 LU (< 8.0 LU).
    - Freeze frames: 0.
    - Blackout frames: 0.
