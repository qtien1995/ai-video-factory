# TEST_READY.md — E2E Test Suite Readiness & Execution Guide

## Status: TEST SUITE READY & VERIFIED 🚀

The End-to-End (E2E) verification test harness for the deliverable `projects/flow-stories/CNT-20261005-AO-TUONG-BHYT-THE-TU/output/final.mp4` has been implemented, validated via self-testing fixtures (22/22 passing assertions), and is ready for execution by the orchestrator and CI.

---

## 1. Quick Execution Command

To run the complete 4-tier verification suite against the production deliverable:

```bash
node tests/e2e/test_final_video.cjs
```

To verify the test harness itself using an automated synthetic conforming fixture:

```bash
node tests/e2e/test_final_video.cjs --self-test
```

Exit Code Behavior:
- **`0`**: All 22 assertions passed cleanly. Delivery contract fulfilled.
- **`1`**: One or more assertions failed (e.g. missing deliverable, loudness out of spec, freeze detected).

---

## 2. Test Coverage Checklist

### Tier 1: Feature Coverage (Container, Codecs, Geometry, Duration)
- [x] **T1.1_FILE_EXISTENCE**: Target MP4 exists and size >= 5MB.
- [x] **T1.2_CONTAINER_FORMAT**: Container format is valid MP4 (`mov,mp4,m4a`).
- [x] **T1.3_STREAM_COMPOSITION**: Contains at least 1 video stream and 1 audio stream.
- [x] **T1.4_RESOLUTION_PORTRAIT**: Strict 1080×1920 portrait resolution (9:16).
- [x] **T1.5_VIDEO_CODEC**: Codec H.264 (AVC) with 8-bit YUV 4:2:0 pixel format.
- [x] **T1.6_FRAME_RATE**: Frame rate calibrated to 30.0 fps (±0.05).
- [x] **T1.7_DURATION_BOUNDS**: Total duration between 70.0s and 85.0s.
- [x] **T1.8_AUDIO_CODEC**: Audio codec is AAC with valid channel layout.
- [x] **T1.9_SAMPLE_RATE_48K**: Sample rate matches CIT Voice Studio 48,000 Hz.

### Tier 2: Boundary & Corner Cases (EBU R128 Loudness, Freezes, Blackouts)
- [x] **T2.1_EBU_R128_INTEGRATED**: Integrated loudness in [-14.0, -12.0] LUFS (target -13.0 LUFS).
- [x] **T2.2_EBU_R128_LRA**: Loudness Range (LRA) < 8.0 LU.
- [x] **T2.3_TRUE_PEAK_HEADROOM**: True Peak strictly < -1.0 dBFS.
- [x] **T2.4_FREEZE_FRAME_DETECTION**: 0 video freeze periods > 3.0 consecutive seconds.
- [x] **T2.5_BLACK_FRAME_DETECTION**: 0 video black screen dropouts > 1.5 seconds.

### Tier 3: Cross-Feature Combinations (A/V Synchronization & Subtitle Sync)
- [x] **T3.1_AV_DURATION_DRIFT**: Audio vs Video stream duration drift <= 0.5s.
- [x] **T3.2_NARRATION_TIMELINE_ALIGNMENT**: Video encloses narration without truncation (tail pad <= 2.5s).
- [x] **T3.3_SUBTITLE_TIMELINE_COVERAGE**: Subtitles cover active dialogue across all 6 scenes.

### Tier 4: Real-World Scenarios (Bitstream Decode, Sampling, Packaging)
- [x] **T4.1_BITSTREAM_DECODE_INTEGRITY**: Full bitstream decode with 0 errors via FFmpeg.
- [x] **T4.2_VISUAL_SCENE_SAMPLING**: Non-empty keyframe extraction across all 6 scenes.
- [x] **T4.3_OUTRO_BRANDING_ASSETS**: Outro CTA personal branding assets (QR / card) verified.
- [x] **T4.4_GATE3_QC_SIGNOFF**: Gate 3 inspection audit log (`qc.md`) verified.
- [x] **T4.5_SINGLE_DELIVERABLE_CONTRACT**: Exactly one deliverable `output/final.mp4` (no stray previews/v001).

---

## 3. Options & Flags

| Flag | Purpose | Example |
|---|---|---|
| `--target <path>` | Override target MP4 file path | `node tests/e2e/test_final_video.cjs --target renders/test.mp4` |
| `--project <dir>` | Override project root directory | `node tests/e2e/test_final_video.cjs --project projects/flow-stories/...` |
| `--tier <1\|2\|3\|4\|all>` | Run only a specific tier | `node tests/e2e/test_final_video.cjs --tier 2` |
| `--self-test` | Run harness verification against synthetic fixture | `node tests/e2e/test_final_video.cjs --self-test` |
| `--json` | Output results in JSON for automated CI parsing | `node tests/e2e/test_final_video.cjs --json` |

---

## 4. Verification Record

- **Test Harness Script**: `tests/e2e/test_final_video.cjs`
- **Infrastructure Docs**: `TEST_INFRA.md`
- **Self-Test Result**: `22 / 22 assertions passed (exit code 0)`
- **Execution Date**: 2026-10-05
