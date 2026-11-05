#!/usr/bin/env python3
"""Kiểm tra môi trường + tải giọng đọc tiếng Việt (Piper) cho motioncut.
  python3 setup.py            # kiểm tra, thiếu giọng thì tải (~67 MB từ github.com) về $MOTIONCUT_HOME/voices
Cần: ffmpeg, Node ≥ 18 + playwright (có Chromium), Python 3 + numpy + Pillow + piper-tts (pip install piper-tts)."""
import os, shutil, subprocess, sys, tarfile, urllib.request

HOME = os.path.expanduser(os.environ.get('MOTIONCUT_HOME', '~/.cache/motioncut'))
URL = 'https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-vi_VN-vais1000-medium.tar.bz2'
ok = True


def check(name, good, hint=''):
    global ok
    print(('✔ ' if good else '✘ ') + name + ('' if good else f'  → {hint}'))
    ok = ok and good


check('ffmpeg', bool(shutil.which('ffmpeg')), 'cài ffmpeg (≥ 5)')
check('node', bool(shutil.which('node')), 'cài Node ≥ 18')
if shutil.which('node'):
    r = subprocess.run(['node', '-e', "require('playwright').chromium.launch().then(b=>b.close())"], capture_output=True, text=True)
    check('playwright + Chromium', r.returncode == 0, 'npm i -g playwright && npx playwright install chromium (đặt NODE_PATH tới thư mục node_modules toàn cục)')
for mod, pipname in [('numpy', 'numpy'), ('PIL', 'Pillow'), ('piper', 'piper-tts')]:
    try: __import__(mod); check(f'python: {pipname}', True)
    except Exception: check(f'python: {pipname}', False, f'pip install {pipname}')

voice_dir = os.path.join(HOME, 'voices')
model = os.path.join(voice_dir, 'vits-piper-vi_VN-vais1000-medium', 'vi_VN-vais1000-medium.onnx')
if os.path.exists(model):
    check('giọng đọc vi_VN-vais1000', True)
else:
    print(f'… tải giọng đọc (~67 MB) về {voice_dir}')
    os.makedirs(voice_dir, exist_ok=True)
    tgz = os.path.join(voice_dir, 'vi.tar.bz2')
    try:
        urllib.request.urlretrieve(URL, tgz)
        with tarfile.open(tgz) as t: t.extractall(voice_dir)
        os.remove(tgz)
        check('giọng đọc vi_VN-vais1000', os.path.exists(model), 'giải nén lỗi')
    except Exception as e:
        check('giọng đọc vi_VN-vais1000', False, f'không tải được ({e}). Máy chặn mạng? Cho phép github.com rồi chạy lại, hoặc tải tay {URL}')
sys.exit(0 if ok else 1)
