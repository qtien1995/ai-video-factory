#!/usr/bin/env python3
"""Dựng video từ một thư mục dự án motioncut: giọng → hiệu ứng âm thanh → chụp khung hình song song → trộn tiếng → ghép.
  python3 build.py <dự_án> --preview 1,6,20,40      # chỉ chụp vài khung + bảng xem nhanh → <dự_án>/preview/sheet.png (nên làm trước)
  python3 build.py <dự_án>                          # dựng đủ → <dự_án>/out.mp4
  python3 build.py <dự_án> --voice                  # bắt buộc tạo lại giọng (tự làm nếu script.json mới hơn timing.json)
  python3 build.py <dự_án> --limit-sec 8 --out thu.mp4   # chỉ dựng 8 giây đầu để thử
  --parts N (mặc định = số nhân CPU, tối đa 6) · --fps 30"""
import argparse, glob, json, math, os, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))


def run(cmd, **kw):
    r = subprocess.run(cmd, **kw)
    if r.returncode: sys.exit(f'Lỗi ở bước: {" ".join(map(str, cmd))[:160]}')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('project')
    ap.add_argument('--preview'); ap.add_argument('--voice', action='store_true')
    ap.add_argument('--limit-sec', type=float); ap.add_argument('--out', default='out.mp4')
    ap.add_argument('--parts', type=int); ap.add_argument('--fps', type=int)
    a = ap.parse_args()
    P = os.path.abspath(a.project)
    cfg = json.load(open(f'{P}/project.json', encoding='utf-8'))
    W, H = cfg['size']; fps = a.fps or cfg.get('fps', 30)
    html = f'{P}/index.html'; size = f'{W}x{H}'

    t_json = f'{P}/timing.json'
    if not cfg.get('external_voice') and (a.voice or not os.path.exists(t_json) or os.path.getmtime(f'{P}/script.json') > os.path.getmtime(t_json)):   # external_voice: voice của người dùng đã canh bằng align_voice.py
        print('▸ giọng đọc'); run([sys.executable, f'{HERE}/gen_voice.py', P])
    total = json.load(open(t_json))['total']

    if a.preview:
        os.makedirs(f'{P}/preview', exist_ok=True)
        run(['node', f'{HERE}/render.mjs', html, f'{P}/preview/s', '--size', size, '--stills', a.preview])
        from PIL import Image, ImageDraw
        ts = a.preview.split(','); tw = 360; th = int(tw * H / W)
        cols = min(len(ts), max(1, 1800 // tw)); rows = math.ceil(len(ts) / cols)
        sheet = Image.new('RGB', (cols * tw, rows * th))
        for i, t in enumerate(ts):
            im = Image.open(f'{P}/preview/s_{t}.png').resize((tw, th)); ImageDraw.Draw(im).text((8, 8), t + 's', fill='yellow')
            sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
        sheet.save(f'{P}/preview/sheet.png'); print(f'✔ {P}/preview/sheet.png'); return

    print('▸ danh sách hiệu ứng âm thanh')
    run(['node', f'{HERE}/render.mjs', html, 'x', '--size', size, '--sfx', f'{P}/sfx_events.json'])
    dur = min(total, a.limit_sec) if a.limit_sec else total
    N = math.ceil(dur * fps); parts = a.parts or min(6, os.cpu_count() or 2)
    q = math.ceil(N / parts); t0 = time.time()
    print(f'▸ chụp {N} khung ({size}, {fps}fps) trên {parts} tiến trình')
    procs = [subprocess.Popen(['node', f'{HERE}/render.mjs', html, f'{P}/part{i}.mp4', '--size', size, '--fps', str(fps),
                               '--from', str(i * q), '--to', str(min((i + 1) * q, N))]) for i in range(parts) if i * q < N]
    if any(p.wait() for p in procs): sys.exit('Một tiến trình chụp khung bị lỗi')
    print(f'  xong sau {time.time() - t0:.0f}s')
    print('▸ trộn giọng + nhạc + hiệu ứng')
    run([sys.executable, f'{HERE}/mix.py'], cwd=P)
    with open(f'{P}/parts.txt', 'w') as f:
        for i in range(len(procs)): f.write(f"file 'part{i}.mp4'\n")
    run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'{P}/parts.txt', '-i', f'{P}/mix.wav',
         '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', f'{P}/{a.out}'])
    for f in glob.glob(f'{P}/part*.mp4'): os.remove(f)
    print(f'✔ {P}/{a.out}')


if __name__ == '__main__':
    main()
