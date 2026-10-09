# Storyboard & VideoSpec Rule

1. After Gate 2, generate voice and measure real timing. Then map beats to visual states in `storyboard.json` (or `storyboard.md`).
   - Scene purpose
   - Visual idea
   - Focal point
   - Motion idea
   - Text role
   - Assets required
   - For each card: main idea, hierarchy, required figures/units/conditions, chosen layout and reason, fully revealed frame/time. Follow `D:/VIDEO AI/rules/visual-storytelling.md`; font tokens are starting points, not fixed answers or automatic fit rules.
   - Plan subtitle phrases by meaning, punctuation, pauses and measured font width. Show the whole phrase at onset, highlight only the active word, keep geometry stable and hide during silence.
2. Translate the storyboard into a Canonical VideoSpec (`specs/video-spec.json`). This JSON must conform to `core/schemas/types.ts`.
3. Run `node core/scripts/factory/index.js record --project <id> --stage VIDEO_SPEC`, then `--stage VALIDATION`. The CLI validates the spec, asset references and engine route before marking validation complete.
   - If validation fails, correct `video-spec.json` and re-run. Do NOT bypass this.
