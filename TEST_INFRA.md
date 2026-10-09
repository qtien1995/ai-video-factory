# TEST_INFRA.md — E2E Verification Test Infrastructure

## 1. Overview & Test Philosophy

This document defines the End-to-End (E2E) verification architecture and test harness for the AI Video Factory V2 pipeline, specifically tailored to the production of the 9:16 social video:
**"Ảo tưởng: BHYT nhà nước lo hết rồi, cần gì mua thêm thẻ tư?"**  
Deliverable Path: `projects/flow-stories/CNT-20261005-AO-TUONG-BHYT-THE-TU/output/final.mp4`.

### Core Testing Principles
1. **Opaque-Box Physical Media Verification**:  
   We do not rely on mock objects or compiler exit codes to assume media quality. The test harness inspects the final output MP4 bitstream, container headers, video/audio stream packets, loudness metrics, and visual keyframes directly using native FFmpeg/FFprobe binaries.
2. **Authoritative Specification Derivation**:  
   Expected values are derived directly from the project contracts in `ORIGINAL_REQUEST.md`, `PROJECT.md`, and `AGENTS.md`.
3. **Progressive Testability & Isolation**:  
   The test harness is completely standalone and zero-dependency, running on native Node.js (`node tests/e2e/test_final_video.cjs`). It includes a `--self-test` fixture generation mode allowing the test harness itself to be independently validated and proved 100% passing prior to final production rendering.
4. **Adversarial & Boundary Verification**:  
   Enforces strict broadcast standards: EBU R128 loudness gating, True Peak headroom, freeze detection, black frame dropout detection, audio/video duration drift limits, and single-file delivery constraints.

---

## 2. Feature Inventory Coverage Matrix

| Feature ID | Feature Name | Mapped E2E Test ID | Test Assertion & Threshold |
|---|---|---|---|
| **F1** | Consistent AI Host Entity | `T4.2_VISUAL_SCENE_SAMPLING` | Keyframe extraction across 6 scenes verifies non-blank visual content and character presence. |
| **F2** | Character Wardrobe Progression | `T4.2_VISUAL_SCENE_SAMPLING` | Sampling timestamps cover opening (Scenes 1–2), middle (Scenes 3–4), and climax (Scenes 5–6). |
| **F3** | 6-Scene Narrative & Beats | `T1.7_DURATION_BOUNDS`, `T4.2` | Duration bounded strictly within 70.0s – 85.0s, matching the 6-beat narrative arc. |
| **F4** | Studio Voiceover & Master Timeline | `T1.8_AUDIO_CODEC`, `T1.9_SAMPLE_RATE_48K`, `T3.2_NARRATION_TIMELINE_ALIGNMENT` | Audio stream is AAC, 48000 Hz, with final video enclosing narration within [0.0s, 2.5s] tail buffer. |
| **F5** | FlowKit Video Generation | `T1.4_RESOLUTION_PORTRAIT`, `T1.5_VIDEO_CODEC`, `T1.6_FRAME_RATE`, `T2.4_FREEZE_FRAME_DETECTION` | Resolution 1080×1920 (9:16), H.264, 30.0 fps, zero freeze periods > 3.0s. |
| **F6** | ASS Glassmorphism Subtitles | `T3.3_SUBTITLE_TIMELINE_COVERAGE` | Subtitle dialogue lines or word timings cover speech duration without dropping words. |
| **F7** | Broadcast Audio Mastering | `T2.1_EBU_R128_INTEGRATED`, `T2.2_EBU_R128_LRA`, `T2.3_TRUE_PEAK_HEADROOM` | Integrated loudness within [-14.0, -12.0] LUFS (target -13.0 LUFS), LRA < 8.0 LU, True Peak < -1.0 dBFS. |
| **F8** | Outro CTA Personal Branding | `T4.3_OUTRO_BRANDING_ASSETS` | Personal branding card / QR assets verified in `assets/branding/`. |
| **F9** | Final QA & Delivery Contract | `T1.1_FILE_EXISTENCE`, `T4.1_BITSTREAM_DECODE_INTEGRITY`, `T4.4_GATE3_QC_SIGNOFF`, `T4.5_SINGLE_DELIVERABLE_CONTRACT` | Single deliverable `output/final.mp4` exists (>= 5MB), decodes cleanly, with Gate 3 `qc.md` signed off. |

---

## 3. Systematic 4-Tier Test Architecture

The test suite evaluates 22 distinct assertions organized into 4 hierarchical tiers:

```
┌─────────────────────────────────────────────────────────────┐
│                    4-TIER TEST ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────┤
│ TIER 1: Feature Coverage (Container, Codecs, Geometry, FPS) │
│   ├─ File Existence & Size (>= 5MB)                         │
│   ├─ MP4/MOV Container Format Check                         │
│   ├─ Dual-Stream Verification (Video + Audio)               │
│   ├─ Resolution 1080x1920 Portrait (9:16)                   │
│   ├─ Video Codec: H.264 (AVC) YUV 4:2:0                     │
│   ├─ Calibrated 30.0 FPS                                    │
│   ├─ Social Duration Bounds (70.0s – 85.0s)                 │
│   ├─ Audio Codec: AAC                                       │
│   └─ Audio Sample Rate: 48,000 Hz                           │
├─────────────────────────────────────────────────────────────┤
│ TIER 2: Boundary & Corner Cases (EBU R128, Freeze, Blackout)│
│   ├─ EBU R128 Integrated Loudness (-14.0 to -12.0 LUFS)     │
│   ├─ Loudness Range LRA (< 8.0 LU)                          │
│   ├─ True Peak Headroom (< -1.0 dBFS)                       │
│   ├─ Video Freeze Detection (No freeze > 3.0s)              │
│   └─ Blackout Detection (No black screen > 1.5s)            │
├─────────────────────────────────────────────────────────────┤
│ TIER 3: Cross-Feature Combinations (A/V Sync, Subtitles)    │
│   ├─ Audio vs Video Duration Drift (<= 0.5s)                │
│   ├─ Master Narration Timeline Alignment                    │
│   └─ Subtitle Dialogue Timeline Coverage                    │
├─────────────────────────────────────────────────────────────┤
│ TIER 4: Real-World Scenarios (Decode, Contact Sheet, Gate 3)│
│   ├─ Full Bitstream Playback & Error-Free Decode            │
│   ├─ Visual Scene Keyframe Sampling (6 Scenes)              │
│   ├─ Outro CTA Branding Assets Check                        │
│   ├─ Gate 3 Audit Log Sign-Off (qc.md)                      │
│   └─ Single Deliverable Packaging Contract                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Test Harness Specifications & Thresholds

| Metric / Parameter | Inspection Tool | Exact Command / Filter | Acceptable Threshold | Unit |
|---|---|---|---|---|
| **Container** | FFprobe | `-show_format -of json` | `mov,mp4,m4a,3gp,3g2,mj2` | format name |
| **Video Resolution** | FFprobe | `-show_streams -select_streams v` | `width=1080, height=1920` | pixels |
| **Video Codec** | FFprobe | `-show_streams -select_streams v` | `h264`, `yuv420p` | codec / pix_fmt |
| **Frame Rate** | FFprobe | `avg_frame_rate` | `30.0 ± 0.05` | fps |
| **Video Duration** | FFprobe | `format.duration` | `[70.0, 85.0]` | seconds |
| **Audio Codec** | FFprobe | `-show_streams -select_streams a` | `aac` | codec |
| **Sample Rate** | FFprobe | `stream.sample_rate` | `48000` | Hz |
| **Integrated Loudness** | FFmpeg | `-af loudnorm=...:print_format=json` | `[-14.0, -12.0]` (Target: -13.0) | LUFS |
| **Loudness Range (LRA)**| FFmpeg | `-af loudnorm=...:print_format=json` | `< 8.0` | LU |
| **True Peak** | FFmpeg | `-af loudnorm=...:print_format=json` | `< -1.0` | dBFS |
| **Freeze Frame** | FFmpeg | `-vf freezedetect=n=-60dB:d=3.0` | `0` events > 3.0s | count |
| **Black Frame** | FFmpeg | `-vf blackdetect=d=1.5:pic_th=0.98` | `0` events > 1.5s | count |
| **A/V Drift** | FFprobe | `abs(duration_v - duration_a)` | `<= 0.50` | seconds |
| **Full Decode** | FFmpeg | `-v error -i <file> -f null -` | `0` errors | exit code / stderr |
| **Packaging Contract** | File System | `readdirSync(output/)` | Exactly 1 `.mp4` named `final.mp4` | files |

---

## 5. Execution & Verification Instructions

### 1. Self-Test Mode (Harness Validation)
Generates a temporary synthetic media fixture meeting all delivery specifications, executes all 22 assertions, and verifies 100% PASS:
```bash
node tests/e2e/test_final_video.cjs --self-test
```

### 2. Verify Delivery Target
Executes the full test suite against the target project deliverable:
```bash
node tests/e2e/test_final_video.cjs
```

### 3. Verify Custom Target Path
```bash
node tests/e2e/test_final_video.cjs --target path/to/video.mp4 --project path/to/project
```

### 4. Execute Specific Tier
```bash
node tests/e2e/test_final_video.cjs --tier 1
node tests/e2e/test_final_video.cjs --tier 2
node tests/e2e/test_final_video.cjs --tier 3
node tests/e2e/test_final_video.cjs --tier 4
```

### 5. Machine-Readable JSON Output
```bash
node tests/e2e/test_final_video.cjs --json
```
