# CANDIDATE RULE: Tasteful Mobile Typography & Single Final Render Pipeline

## Context
1. **The "Too Big" Anti-Pattern (Text Wrapping & Visual Clutter):**
   When pushing for "mobile-first giant typography" without taste guardrails, font sizes for explanatory sentences were increased to 38px–44px. This caused Vietnamese text to wrap awkwardly across 3–4 lines ("chữ bị chạy nhiều và gây mất thẩm mỹ"), making cards look congested and bloated like unstyled raw text.
2. **Duplicate Rendering Inefficiency:**
   Rendering both `preview` and `final` sequentially resulted in rendering the exact same 1080x1920 Remotion composition twice (3450 frames total), wasting 6–8 minutes when the user only requires the final deliverable.

## Root Causes
1. Ignoring typographic hierarchy and line-length constraints. Vietnamese requires slightly more horizontal space per syllable; explanatory text must be kept concise and sized appropriately (28px–32px) so it stays within 1–2 clean lines.
2. Rigid pipeline state machine requiring separate preview render even when the user explicitly chooses direct final export.

## The Rules

### 1. Tasteful Mobile Typography Scale (1080 × 1920)
Applying agency-level design taste (`high-end-visual-design`, `gpt-taste`):
- **Header Title (Fixed Top):** `68px – 74px` (IN HOA, font-weight 900, tight tracking `-0.5px`). Must stay on 1 line.
- **Header Subtitle:** `36px – 40px` (font-weight 800, vibrant accent). 1 line.
- **Hero Figures & Numbers:** `64px – 74px` (bold 900, glow shadow; units e.g. "TRIỆU / NĂM" at `30px – 34px` for high-end typographic contrast).
- **Card Titles & Section Heads:** `36px – 42px` (font-weight 800–900).
- **Body & Explanatory Text:** `28px – 32px` (font-weight 600–700, line-height 1.45).
  - **STRICT WRAP RULE:** Body text must NEVER wrap more than 2 lines. Write concise, punchy editorial copy rather than paragraph walls.
- **Eyebrow Tags & Badges:** `22px – 26px` (uppercase, letter-spacing `1.5px`, pill shape `px-4 py-1.5`, distinct border & backdrop).
- **Subtitle Bar (Karaoke Sub):** `34px – 36px` (active word `38px` bold 900 `#facc15` with `scale(1.12)`).
  - Must fit on a **single horizontal line** inside the floating pill (no multi-line subtitle wrapping).
  - When silent or between phrases: `return null` (clean, zero distraction).

### 2. Double-Bezel & Haptic Card Aesthetics
- Cards must use Machined Double-Bezel architecture: subtle outer border (`border: 1px solid rgba(255, 255, 255, 0.15)` or `2px` hairline accent), glass backdrop (`backdrop-blur-2xl bg-slate-900/85`), soft diffused ambient shadow (`boxShadow: 0 20px 50px rgba(0,0,0,0.5)`), and generous padding (`30px 38px`).
- Card width: `920px – 940px` (centered), giving a balanced 70px–80px margin for high-end editorial breathing room.

### 3. Single Final Render Mode ("Chốt chỉ xuất final để tối ưu thời gian")
- Do NOT force 2 duplicate renders (preview + final) when producing video for delivery.
- Run `node core/scripts/factory/index.js render --project <id> --kind final` directly. The factory engine renders the full final MP4 once, synchronizes preview artifacts and Gate 3 evidence automatically, and advances directly to `FINAL_QA`.
- Saves 50% CPU/GPU time and cuts turnaround time in half.
