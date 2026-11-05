#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cutout AI (Video Matting) Engine for Remotion / Auto-Footage.
Tách nền người nói từ video quay sẵn, xuất chuỗi ảnh RGBA hoặc video WebM trong suốt (alpha channel)
để đưa vào Remotion hoặc ghép lớp đè lên đồ họa 3D/Motion Graphics.

Sử dụng:
  python core/scripts/footage/cutout.py input.mp4 output_dir --format webm
  python core/scripts/footage/cutout.py input.mp4 output_dir --start 0 --dur 10 --ratio 0.4
"""

import argparse
import os
import subprocess
import sys
import tempfile
import time
import urllib.request
import numpy as np
from PIL import Image

MODEL_URL = "https://github.com/PeterL1n/RobustVideoMatting/releases/download/v1.0.0/rvm_mobilenetv3_fp32.onnx"
DEFAULT_CACHE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "assets", "models")


def get_model_path():
    os.makedirs(DEFAULT_CACHE, exist_ok=True)
    p = os.path.join(DEFAULT_CACHE, "rvm_mobilenetv3_fp32.onnx")
    if not os.path.exists(p):
        print(f"[*] Đang tải mô hình tách người RVM (~15 MB) về {p}...", file=sys.stderr)
        urllib.request.urlretrieve(MODEL_URL, p)
        print("[+] Tải mô hình thành công!", file=sys.stderr)
    return p


def build_vf_chain(vf, max_side, fps):
    pre = (vf + ",") if vf else ""
    return f"{pre}scale='if(gt(iw,ih),min({max_side},iw),-2)':'if(gt(iw,ih),-2,min({max_side},ih))',scale=trunc(iw/2)*2:trunc(ih/2)*2,fps={fps}"


def get_frame_size(video, chain):
    with tempfile.TemporaryDirectory() as td:
        f = os.path.join(td, "probe.png")
        subprocess.check_call(
            ["ffmpeg", "-v", "error", "-y", "-i", video, "-vf", chain, "-frames:v", "1", f]
        )
        return Image.open(f).size


def process_frames(sess, out_dir, video, chain, w, h, t0, dur, rec_ratio, start_idx, stats, quality=90):
    cmd = (
        ["ffmpeg", "-v", "error", "-ss", f"{t0:.3f}", "-i", video]
        + (["-t", f"{dur:.3f}"] if dur else [])
        + ["-vf", chain, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    )
    pr = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    rec = [np.zeros((1, 1, 1, 1), np.float32) for _ in range(4)]
    fsz = w * h * 3
    k = 0

    while True:
        buf = pr.stdout.read(fsz)
        if len(buf) < fsz:
            break
        rgb = np.frombuffer(buf, np.uint8).reshape(h, w, 3)
        src = (rgb.astype(np.float32) / 255.0).transpose(2, 0, 1)[None]

        _, pha, *rec = sess.run(
            None,
            dict(
                zip(
                    ["src", "r1i", "r2i", "r3i", "r4i", "downsample_ratio"],
                    [src, *rec, rec_ratio],
                )
            ),
        )

        alpha = (np.clip(pha[0, 0], 0, 1) * 255).astype(np.uint8)
        rgba = Image.fromarray(np.dstack([rgb, alpha]), "RGBA")
        frame_name = f"c{start_idx + k:05d}.webp"
        rgba.save(os.path.join(out_dir, frame_name), quality=quality, method=3, alpha_quality=100)

        k += 1
        stats["n"] += 1
        if stats["n"] % 30 == 0:
            elapsed = max(1e-4, time.time() - stats["t0"])
            print(f"  -> Đã tách {stats['n']} frames ({stats['n'] / elapsed:.1f} fps)", file=sys.stderr)

    return k


def assemble_transparent_webm(frames_dir, output_webm, fps=30):
    print(f"[*] Đang đóng gói chuỗi ảnh RGBA thành WebM trong suốt: {output_webm}...", file=sys.stderr)
    cmd = [
        "ffmpeg",
        "-y",
        "-framerate", str(fps),
        "-i", os.path.join(frames_dir, "c%05d.webp"),
        "-c:v", "libvpx-vp9",
        "-pix_fmt", "yuva420p",
        "-b:v", "0",
        "-crf", "28",
        output_webm,
    ]
    subprocess.check_call(cmd)
    print(f"[+] Hoàn tất xuất WebM trong suốt: {output_webm}", file=sys.stderr)


def main():
    parser = argparse.ArgumentParser(description="Tách nền người nói (Video Matting AI)")
    parser.add_argument("video", help="Đường dẫn file video đầu vào")
    parser.add_argument("out", help="Thư mục xuất ảnh / file video")
    parser.add_argument("--format", choices=["frames", "webm", "both"], default="webm", help="Định dạng xuất")
    parser.add_argument("--fps", type=int, default=30, help="FPS xử lý")
    parser.add_argument("--max-side", type=int, default=1280, help="Kích thước tối đa chiều dài/rộng")
    parser.add_argument("--ratio", type=float, default=0.4, help="Tỉ lệ downsample nội bộ (0.25 nhanh - 0.5 nét)")
    parser.add_argument("--quality", type=int, default=90, help="Chất lượng WebP (1-100)")
    parser.add_argument("--start", type=float, default=0, help="Thời điểm bắt đầu (giây)")
    parser.add_argument("--dur", type=float, default=None, help="Thời lượng cần tách (giây)")
    parser.add_argument("--vf", default="", help="Bộ lọc ffmpeg bổ sung trước khi tách")

    args = parser.parse_args()

    try:
        import onnxruntime as ort
    except ImportError:
        print("[!] Lỗi: Chưa cài onnxruntime. Vui lòng chạy: pip install onnxruntime pillow numpy", file=sys.stderr)
        sys.exit(1)

    os.makedirs(args.out, exist_ok=True)
    chain = build_vf_chain(args.vf, args.max_side, args.fps)
    w, h = get_frame_size(args.video, chain)
    print(f"[*] Khung hình xử lý: {w}x{h} @ {args.fps}fps", file=sys.stderr)

    so = ort.SessionOptions()
    so.intra_op_num_threads = os.cpu_count() or 4
    sess = ort.InferenceSession(get_model_path(), so, providers=["CPUExecutionProvider"])
    rec_ratio = np.array([args.ratio], np.float32)

    stats = {"n": 0, "t0": time.time()}

    frames_temp_dir = args.out if args.format in ["frames", "both"] else tempfile.mkdtemp(prefix="cutout_")
    os.makedirs(frames_temp_dir, exist_ok=True)

    start_idx = round(args.start * args.fps) + 1
    total_frames = process_frames(
        sess,
        frames_temp_dir,
        args.video,
        chain,
        w,
        h,
        args.start,
        args.dur,
        rec_ratio,
        start_idx,
        stats,
        args.quality,
    )

    elapsed = max(1e-4, time.time() - stats["t0"])
    print(f"[+] Tách nền thành công {total_frames} frames ({total_frames / elapsed:.1f} fps)")

    if args.format in ["webm", "both"]:
        webm_path = os.path.join(args.out, "speaker_alpha.webm") if args.format == "both" else os.path.join(args.out if not args.out.endswith(".webm") else os.path.dirname(args.out), "speaker_alpha.webm")
        assemble_transparent_webm(frames_temp_dir, webm_path, args.fps)

    print(f"[✓] Đã hoàn thành tách nền người nói!")


if __name__ == "__main__":
    main()
