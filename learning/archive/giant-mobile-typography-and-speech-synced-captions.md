# CANDIDATE RULE: Giant Mobile Typography & Dynamic Speech-Synced Captions

## Context
In vertical mobile social videos (9:16, 1080×1920) on platforms like TikTok, Reels, and Shorts, users hold their phones at arm's length and scroll rapidly. 
Two recurring defects were detected in production:
1. **Component Interface Mismatch & Phantom Containers:** Separate lower-zone cards received misaligned props (e.g. `badge`/`content` instead of `title`/`description`), leaving empty containers rendered with fallback borders (e.g. yellow border `#eab308`), appearing as broken empty boxes.
2. **Static/Dangling Subtitle Bar:** Subtitle bars previously displayed static 8-word chunks that remained visible with container borders even during pauses or before speech began, causing viewer distraction.
3. **Sub-30px Micro-Text & Cramped Layouts:** Using desktop-scale fonts (20px–26px) and narrow containers (e.g. width 460px) caused text to look tiny and left large empty gaps, failing the "effortless mobile legibility" test.

## Root Causes
1. Rendering wrappers with borders/backgrounds before verifying that inner text content is defined and non-empty.
2. Subtitle logic defaulting `chunkIndex = 0` when `activeIndex === -1` (silence/pause), instead of hiding the component completely.
3. Designers under-scaling typography and nesting too many small cards instead of expanding visual elements to full-bleed (width ≥ 960px).

## The Rules

### 1. Giant Mobile Typography Standards (1080 × 1920)
- **Header Title:** `76px – 86px` (ALL-CAPS, font-weight 900, tight line-height 1.15).
- **Header Subtitle:** `40px – 48px` (font-weight 800).
- **Key Callout / Large Figures:** `60px – 84px` (font-weight 900, glow shadow).
- **Card Titles & Section Heads:** `48px – 58px` (font-weight 900).
- **Card Body & Explanations:** `36px – 44px` (font-weight 700–800, line-height 1.35–1.45).
- **Subtitle Bar (Karaoke Sub):** `42px – 48px` (font-weight 900 for active word, 700 for others).
- **STRICT ENFORCEMENT:** BAN any text `< 32px` anywhere in the composition.

### 2. Dynamic Speech-Synced Captions ("Đọc đến đâu chạy đến đó, không đọc thì không hiện sub")
- **Zero Speech = Zero Sub:** When `activeIndex === -1` (pauses between sentences, silence > 150ms, or video start/end), the caption component MUST return `null`. Never render an empty pill box, border, or static text during silence.
- **Dynamic Reveal:** Display short natural phrases (4–6 words max). Highlight the active spoken word with gold color (`#facc15`), bold 900, `scale(1.15)`, and bright text glow. Unspoken words in the phrase remain dimmed or appear progressively with speech.

### 3. Full-Bleed Screen Coverage & Zero Phantom Containers
- Hero content cards MUST span `960px – 1000px` (leaving 40px–60px side margins) and vertically distribute from `y: 280` to `y: 1620`.
- Eliminate redundant mini "lower cards" if they compete with or duplicate the main visual story.
- If reusable card components are used, they MUST guard against empty content: `if (!title && !description) return null;`. Never render an empty container with a border.

## Validation
- Inspect SVG contact sheets to ensure zero empty bordered boxes.
- Verify playback in silence gaps to ensure the caption bar vanishes cleanly.
- Check font size metrics: Header ≥ 76px, Body ≥ 36px, Key Numbers ≥ 60px.
