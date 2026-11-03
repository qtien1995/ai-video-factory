#!/usr/bin/env python3
"""
CapCut & JianYing Draft Exporter for AI Video Factory V3
Converts Remotion video projects and multi-track metadata into editable CapCut / JianYing Pro drafts.
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

try:
    import pyJianYingDraft as draft
    from pyJianYingDraft import trange
except ImportError:
    print("[Error] pyJianYingDraft is not installed. Run: pip install pyJianYingDraft")
    sys.exit(1)


def find_jianying_draft_root() -> str:
    """Detect local Windows JianYing or CapCut draft storage directory."""
    candidates = [
        os.path.expandvars(r"%LOCALAPPDATA%\JianyingPro\User Data\Projects\com.lveditor.draft"),
        os.path.expandvars(r"%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft"),
        os.path.expanduser(r"~\JianyingPro Drafts"),
        os.path.expanduser(r"~\CapCut Drafts"),
    ]
    for c in candidates:
        if os.path.isdir(c):
            return c
    return None


def run_smoke_test(target_dir: str = None) -> bool:
    """Quick verification test generating a minimal 3-track draft."""
    staging = target_dir or os.path.join(os.path.dirname(__file__), "..", "scratch", "capcut_smoke_test")
    os.makedirs(staging, exist_ok=True)
    draft_name = "factory_smoke_test"
    
    print(f"[Smoke Test] Generating 3-track test draft in {staging}...")
    folder = draft.DraftFolder(staging)
    script = folder.create_draft(draft_name, 1080, 1920, fps=30, allow_replace=True)
    script.append_track(draft.TrackSpec(draft.TrackType.video))
    script.append_track(draft.TrackSpec(draft.TrackType.text))
    
    # Add a sample text segment
    script.add_segment(draft.TextSegment(
        "AI VIDEO FACTORY V3 - CAPCUT READY",
        trange("0s", "3s"),
        style=draft.TextStyle(size=7.0, color=(0.2, 0.8, 1.0), align=1)
    ))
    script.save()
    
    result_path = os.path.join(staging, draft_name)
    content_file = os.path.join(result_path, "draft_content.json")
    if os.path.exists(content_file):
        print(f"[Smoke Test PASS] Draft successfully generated at: {result_path}")
        return True
    else:
        print("[Smoke Test FAIL] draft_content.json not found.")
        return False


def export_project(project_path: str, install_to_local: bool = False):
    project_dir = Path(project_path).resolve()
    if not project_dir.is_dir():
        print(f"[Error] Project directory not found: {project_dir}")
        sys.exit(1)

    project_name = project_dir.name
    output_dir = project_dir / "output"
    capcut_out = output_dir / "capcut_draft"
    os.makedirs(capcut_out, exist_ok=True)

    print(f"[*] Packaging CapCut / JianYing Draft for: {project_name}")

    # Look for video file
    video_file = output_dir / "final.mp4"
    if not video_file.exists():
        candidates = list(output_dir.glob("*.mp4"))
        if candidates:
            video_file = candidates[0]
        else:
            print(f"[Warning] No MP4 video file found in {output_dir}. Draft will be generated without video track.")
            video_file = None

    # Look for audio files
    narration_file = None
    bgm_file = None
    audio_candidates = [
        project_dir / "assets" / "audio" / "narration.wav",
        project_dir / "assets" / "audio" / "mastered_audio.wav",
        project_dir / "audio" / "narration.wav",
    ]
    for ac in audio_candidates:
        if ac.exists():
            narration_file = ac
            break

    bgm_candidates = [
        project_dir / "assets" / "audio" / "bgm.mp3",
        project_dir / "audio" / "bgm.mp3",
    ]
    for bc in bgm_candidates:
        if bc.exists():
            bgm_file = bc
            break

    # Look for scenes / captions
    scenes_file = project_dir / "remotion" / "scenes.json"
    scenes = []
    if scenes_file.exists():
        try:
            with open(scenes_file, encoding="utf-8") as f:
                scenes_data = json.load(f)
                if isinstance(scenes_data, list):
                    scenes = scenes_data
                elif isinstance(scenes_data, dict) and "scenes" in scenes_data:
                    scenes = scenes_data["scenes"]
        except Exception as e:
            print(f"[Warning] Could not parse scenes.json: {e}")

    # Initialize draft folder
    folder = draft.DraftFolder(str(capcut_out))
    # 9:16 Vertical canvas: 1080 x 1920 @ 30fps
    script = folder.create_draft(project_name, 1080, 1920, fps=30, allow_replace=True)

    # 1. Video Track
    if video_file and video_file.exists():
        script.append_track(draft.TrackSpec(draft.TrackType.video, name="Main_Video"))
        v_mat = draft.VideoMaterial(str(video_file))
        script.add_segment(draft.VideoSegment(str(video_file), trange(0, v_mat.duration)), track="Main_Video")
        print(f"  [+] Added video track: {video_file.name} ({v_mat.duration / 1_000_000:.1f}s)")

    # 2. Narration Track
    if narration_file and narration_file.exists():
        script.append_track(draft.TrackSpec(draft.TrackType.audio, name="Voiceover"))
        n_mat = draft.AudioMaterial(str(narration_file))
        script.add_segment(draft.AudioSegment(n_mat, trange(0, n_mat.duration), volume=1.0), track="Voiceover")
        print(f"  [+] Added narration track: {narration_file.name}")

    # 3. BGM Track
    if bgm_file and bgm_file.exists():
        script.append_track(draft.TrackSpec(draft.TrackType.audio, name="BGM"))
        b_mat = draft.AudioMaterial(str(bgm_file))
        script.add_segment(draft.AudioSegment(b_mat, trange(0, b_mat.duration), volume=0.25), track="BGM")
        print(f"  [+] Added BGM track: {bgm_file.name}")

    # 4. Text / Subtitle Track
    if scenes:
        script.append_track(draft.TrackSpec(draft.TrackType.text, name="Subtitles"))
        fps = 30
        for s in scenes:
            text = s.get("title") or s.get("voiceover") or s.get("text")
            from_f = s.get("from", s.get("fromFrame", 0))
            to_f = s.get("to", s.get("toFrame", from_f + 90))
            if text and to_f > from_f:
                start_us = int((from_f / fps) * 1_000_000)
                dur_us = int(((to_f - from_f) / fps) * 1_000_000)
                script.add_segment(draft.TextSegment(
                    str(text)[:60],
                    draft.Timerange(start_us, dur_us),
                    style=draft.TextStyle(size=5.5, color=(1.0, 1.0, 1.0), align=1)
                ), track="Subtitles")
        print(f"  [+] Added subtitle track: {len(scenes)} segments")

    script.save()
    draft_folder_path = capcut_out / project_name
    print(f"\n[Success] Draft generated successfully at:\n  {draft_folder_path}")

    # Install directly to local CapCut/JianYing if requested or found
    if install_to_local:
        local_root = find_jianying_draft_root()
        if local_root:
            dest = Path(local_root) / project_name
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(draft_folder_path, dest)
            print(f"[Installed] Copied directly to CapCut / JianYing workspace:\n  {dest}")
        else:
            print("[Notice] Local CapCut/JianYing installation folder not found. Kept in project output.")


def main():
    parser = argparse.ArgumentParser(description="Export Remotion Project to CapCut / JianYing Draft")
    parser.add_argument("--project", "-p", type=str, help="Path to project directory")
    parser.add_argument("--install", "-i", action="store_true", help="Install directly to local CapCut app directory")
    parser.add_argument("--smoke-test", action="store_true", help="Run self-test draft generation")

    args = parser.parse_args()

    if args.smoke_test:
        run_smoke_test()
    elif args.project:
        export_project(args.project, install_to_local=args.install)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
