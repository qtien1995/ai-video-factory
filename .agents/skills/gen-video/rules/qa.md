# QA Rule

For new videos, follow `D:/VIDEO AI/rules/visual-storytelling.md`. A rules-only task must not alter or rerender old videos. Render every scene/card state after all text is visible; inspect full resolution and approximately 360×640. Fix individual cards and repeat rendering until readable, balanced, unclipped and clear of subtitles. Log scene/card, frame/time, image paths, issues and actual review results in qc.md. Check phrase onset/middle/end, phrase changes and silence; only the active word changes color and line layout stays stable.

Run lint/typecheck where supported. Inspect the actual new MP4 with FFprobe and extract frames with FFmpeg; source stills and process success alone cannot establish final QA. When a complete video is requested, deliver only the canonical output/final.mp4 and update it for feedback; do not deliver preview/v001/v002. Internal preview artifacts are not a second deliverable. A direct-final CLI path that copies preview artifacts or records gates does not prove visual review.

`render --kind preview` writes `output/preview.mp4`, `output/preview-qc.json` and a contact sheet only after technical checks pass. Inspect the actual video and contact sheet, document content/layout/motion issues in `qc.md`, then run `record --stage PREVIEW_QA --artifact qc.md --reviewed` after visual review.

After explicit Gate 3 approval, run `render --kind final`. Inspect `output/final.mp4`, its technical report and contact sheet, then `record --stage FINAL_QA --artifact qc.md --reviewed` and `record --stage DONE`. A success exit code without media and visual review is not DONE.
