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
