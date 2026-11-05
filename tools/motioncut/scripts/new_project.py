#!/usr/bin/env python3
"""Tạo dự án motioncut mới từ một mẫu.
  python3 new_project.py <thư_mục_mới> --template 9x16        # mẫu dọc "Tự học" (TikTok/Reels/Shorts)
  python3 new_project.py <thư_mục_mới> --template 16x9        # mẫu ngang "Tư duy ngược" (YouTube/Facebook)
  python3 new_project.py <thư_mục_mới> --template 16x9-3d     # mẫu ngang có VẬT 3D (three.js) + phụ đề Anh — cần voice có sẵn (align_voice.py)
Chép index.html + script.json + project.json của mẫu, cùng gsap.min.js, three.min.js, fonts.css và thư mục font (F/).
Sau đó: sửa script.json (lời thoại) và index.html (chữ, cảnh) theo chủ đề mới — xem SKILL.md."""
import argparse, os, shutil, sys

SKILL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES = {'9x16': 'tu-hoc-9x16', '16x9': 'tu-duy-nguoc-16x9', '16x9-3d': 'phan-du-chu-y-3d-16x9'}

ap = argparse.ArgumentParser()
ap.add_argument('dest'); ap.add_argument('--template', choices=TEMPLATES, default='9x16')
a = ap.parse_args()
if os.path.exists(a.dest) and os.listdir(a.dest): sys.exit(f'{a.dest} đã có nội dung')
src = os.path.join(SKILL, 'templates', TEMPLATES[a.template])
shutil.copytree(src, a.dest, dirs_exist_ok=True)
shutil.copy(os.path.join(SKILL, 'assets', 'gsap.min.js'), a.dest)
shutil.copy(os.path.join(SKILL, 'assets', 'three.min.js'), a.dest)
shutil.copy(os.path.join(SKILL, 'assets', 'fonts.css'), a.dest)
shutil.copytree(os.path.join(SKILL, 'assets', 'fonts'), os.path.join(a.dest, 'F'), dirs_exist_ok=True)
print(f'✔ {a.dest}\n  1) sửa script.json + index.html   2) python3 {SKILL}/scripts/build.py {a.dest} --preview 2,10,30\n  3) python3 {SKILL}/scripts/build.py {a.dest}')
