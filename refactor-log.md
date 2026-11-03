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
