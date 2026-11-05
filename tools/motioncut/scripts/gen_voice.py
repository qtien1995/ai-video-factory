#!/usr/bin/env python3
"""Đọc script.json → tạo giọng đọc tiếng Việt (Piper, chạy offline) → xếp lên dòng thời gian.
Dùng: python3 gen_voice.py <thư_mục_dự_án> [--length-scale 1.15]
Ra:   voice.wav · timing.json · timing.js (window.TIMING) trong thư mục dự án.

script.json = [["a1","câu 1"],["a2","câu 2"],["b1","câu 3"],...]
  - id = <chữ cái cảnh><số>. Đổi chữ cái đầu → thêm khoảng nghỉ giữa hai cảnh (sec_gap).
Tham số nhịp lấy từ project.json → "voice": {length_scale, lead, gap, sec_gap, tail}.
  length_scale lớn = đọc chậm (1.0 nhanh, 1.15 vừa, 1.22 chậm rãi). lead = im lặng đầu video, tail = đuôi sau câu cuối.
Mô hình giọng: xem scripts/setup.py (tải về $MOTIONCUT_HOME/voices)."""
import argparse, json, os, subprocess, sys, wave
import numpy as np

HOME = os.path.expanduser(os.environ.get('MOTIONCUT_HOME', '~/.cache/motioncut'))
VOICE = os.environ.get('MOTIONCUT_VOICE', 'vits-piper-vi_VN-vais1000-medium/vi_VN-vais1000-medium')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('project')
    ap.add_argument('--length-scale', type=float)
    a = ap.parse_args()
    os.chdir(a.project)
    cfg = json.load(open('project.json', encoding='utf-8')) if os.path.exists('project.json') else {}
    v = {'length_scale': 1.15, 'lead': 0.35, 'gap': 0.42, 'sec_gap': 1.0, 'tail': 3.6, **cfg.get('voice', {})}
    if a.length_scale: v['length_scale'] = a.length_scale
    model = os.path.join(HOME, 'voices', VOICE)
    if not os.path.exists(model + '.onnx'):
        sys.exit(f'Chưa có giọng đọc ở {model}.onnx — chạy: python3 {os.path.dirname(__file__)}/setup.py')
    SR = 22050
    lines = json.load(open('script.json', encoding='utf-8'))
    segs, chunks, t, prev = [], [], v['lead'], None
    for sid, text in lines:
        if prev and prev[0] != sid[0]: t += v['sec_gap'] - v['gap']
        wav = f'v_{sid}.wav'
        subprocess.run([sys.executable, '-m', 'piper', '-m', model + '.onnx', '-c', model + '.onnx.json',
                        '--length-scale', str(v['length_scale']), '-f', wav], input=text.encode(), check=True, capture_output=True)
        w = wave.open(wav)
        x = np.frombuffer(w.readframes(w.getnframes()), '<i2').astype(np.float32) / 32768
        idx = np.where(np.abs(x) > 0.01)[0]
        x = x[max(0, idx[0] - 200):idx[-1] + 800]          # cắt im lặng đầu/cuối câu
        d = len(x) / SR
        segs.append(dict(id=sid, text=text, start=round(t, 3), end=round(t + d, 3)))
        chunks.append((t, x))
        t += d + v['gap']; prev = sid
        os.remove(wav)
    total = t - v['gap'] + v['tail']
    buf = np.zeros(int(total * SR) + 1, np.float32)
    for st, x in chunks: i = int(st * SR); buf[i:i + len(x)] += x
    buf *= 0.9 / np.abs(buf).max()
    with wave.open('voice.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((buf * 32767).astype('<i2').tobytes())
    out = dict(total=round(total, 3), segs=segs)
    json.dump(out, open('timing.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open('timing.js', 'w', encoding='utf-8').write('window.TIMING=' + json.dumps(out, ensure_ascii=False) + ';')
    print(f'total {total:.2f}s · {len(segs)} câu')
    for s in segs: print(f"  {s['id']:<4}{s['start']:>7.2f} → {s['end']:>6.2f}  {s['text']}")


if __name__ == '__main__':
    main()
