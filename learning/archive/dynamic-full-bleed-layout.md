# CANDIDATE RULE: Dynamic Full-Bleed Layout & Static Subtitle Chunks

## Context
When rendering Remotion videos, AI strictly relied on absolute coordinates like `top: 600` or `top: 1220` with small fixed sizes (e.g., width 760, font sizes under 24px) for hero elements, leaving massive vertical "dead space" empty in the 1080x1920 canvas. Additionally, subtitle bars used erratic sliding windows (e.g., word-by-word marquee shifting), which users found messy ("lung tung").

## Root Cause
1. Applying hardcoded UI metrics intended for web instead of full-bleed mobile typography.
2. Relying on an 8-word sliding window for `SyncedCaptions`, which shifts text continuously as each word becomes active, causing jarring reading experiences.

## The Rule
1. **Adaptive Zero Dead Space Scaling:** Hero elements (Cards, Dashboards, Invoices) MUST fill 85%-90% of the screen width (e.g., `width: 900+` on a 1080px canvas). 
2. **True Center Alignment:** Use calculated bounds like `centerAnchorY` and accurately distribute elements across the upper and lower halves. Do not cluster elements leaving `y: 300` to `y: 900` entirely blank.
3. **Chunk-based Subtitles:** Subtitle tracking must use chunk-based pagination (`chunkIndex * chunkSize`) instead of sliding window arrays (`timingWords.slice(activeIndex - 3, ...)`). The subtitle string should remain static until the entire chunk is spoken, then flip to the next chunk.

## Validation
Ensure all typography matches `MOBILE_TYPOGRAPHY` standards with fonts strictly >= 24px, and check that subtitles flip cleanly page-by-page.
