# Story Pass Rule

Story Pass produces `script.md` and `beats.json` (or `beats.md`) before Gate 1. `script.md` contains:

1. **Core Message**: The primary takeaway.
2. **Target Audience**: Who is watching.
3. **Angle**: The emotional or logical hook.
4. **Narration**: The actual spoken text.
5. **Beats**: Rough breakdown of the pacing.
6. **Target Duration**: Estimated duration (e.g., 15 seconds).

Save the files as `projects/<id>/script.md` and `projects/<id>/beats.json`. Every beat needs `meaning` and `visualAction`.
Record both: `node core/scripts/factory/index.js record --project <id> --stage SCRIPT`, then the same command with `--stage BEATS`.

## The Gate
Present Script + Beats together. After explicit user approval, run `node core/scripts/factory/index.js approve --project <id> --gate GATE1 --evidence "<approval message>"`. Do not start Creative Pass before Gate 1.
