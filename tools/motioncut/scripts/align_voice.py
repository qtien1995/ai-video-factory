#!/usr/bin/env python3
"""Dùng VOICE CÓ SẴN của người dùng (mp3/wav/m4a — ElevenLabs, thu âm…) thay cho giọng máy: canh từng câu của script.json vào đúng thời điểm trong file voice.
Dùng: python -X utf8 align_voice.py <thư_mục_dự_án> <voice.mp3> [--tail 3.0]
Làm:  1) nhận dạng tiếng Việt offline (sherpa-onnx zipformer, tải ~26 MB từ github.com lần đầu) → từng âm tiết + mốc giây
      2) căn chỉnh chuỗi (Needleman–Wunsch trên âm tiết bỏ dấu) giữa lời trong script.json và lời nhận dạng được → mốc bắt đầu/kết thúc từng CÂU và từng TỪ
         (số, ký hiệu, từ tiếng Anh nhận dạng khác chữ → bị bỏ qua, mốc nội suy từ các từ khớp lân cận)
      3) ghi voice.wav (22,05 kHz mono, để mix.py dùng), timing.json, timing.js (kèm "words" theo từng câu để at(id,từ) chính xác theo từ)
Ra màn hình: bảng câu → giây + độ phủ khớp. Câu nào khớp < 50 % in cảnh báo (voice nói khác script?).
Khác gen_voice.py (Piper): thời gian lấy từ voice thật nên KHÔNG có khoảng nghỉ nhân tạo; total = độ dài voice + tail."""
import json, os, re, subprocess, sys, tarfile, unicodedata, urllib.request
import numpy as np

HOME = os.path.expanduser(os.environ.get('MOTIONCUT_HOME', '~/.cache/motioncut'))
MODELS = [('sherpa-onnx-zipformer-vi-30M-int8-2026-02-09', 'encoder.int8.onnx', 'decoder.onnx', 'joiner.int8.onnx'),
          ('sherpa-onnx-zipformer-vi-int8-2025-04-20', 'encoder-epoch-12-avg-8.int8.onnx', 'decoder-epoch-12-avg-8.onnx', 'joiner-epoch-12-avg-8.int8.onnx')]
BASE = 'https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/'


def model_dir():
    for name, *files in MODELS:
        d = os.path.join(HOME, 'asr', name)
        if all(os.path.exists(os.path.join(d, f)) for f in files + ['tokens.txt']): return d, files
    name, *files = MODELS[0]; os.makedirs(os.path.join(HOME, 'asr'), exist_ok=True)
    tgz = os.path.join(HOME, 'asr', 'vi.tar.bz2'); print('… tải mô hình nhận dạng (~26 MB)', file=sys.stderr)
    urllib.request.urlretrieve(BASE + name + '.tar.bz2', tgz)
    with tarfile.open(tgz) as t: t.extractall(os.path.join(HOME, 'asr'))
    os.remove(tgz); return os.path.join(HOME, 'asr', name), files


def asr(path, chunk=20.0):
    import sherpa_onnx
    d, (enc, dec, joi) = model_dir()
    rec = sherpa_onnx.OfflineRecognizer.from_transducer(encoder=f'{d}/{enc}', decoder=f'{d}/{dec}', joiner=f'{d}/{joi}', tokens=f'{d}/tokens.txt',
                                                        num_threads=os.cpu_count() or 4, sample_rate=16000, feature_dim=80, decoding_method='greedy_search')
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-vn', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32); sr = 16000
    pts, pos = [0], 0
    while len(x) - pos > (chunk + 3) * sr:                      # cắt ở chỗ lặng nhất quanh mỗi mốc `chunk` giây
        lo, hi = pos + int((chunk - 3) * sr), pos + int((chunk + 3) * sr)
        k = int(0.1 * sr); e = np.convolve(np.abs(x[lo:hi]), np.ones(k) / k, 'valid'); pos = lo + int(np.argmin(e)) + k // 2; pts.append(pos)
    pts.append(len(x)); words = []
    for i in range(len(pts) - 1):
        st = rec.create_stream(); st.accept_waveform(sr, x[pts[i]:pts[i + 1]]); rec.decode_stream(st); r = st.result; off = pts[i] / sr; cur = None
        for tok, ts in zip(r.tokens, r.timestamps):
            if tok.startswith(' ') or cur is None:
                if cur: words.append(cur)
                cur = {'w': tok.strip(), 's': off + ts}
            else: cur['w'] += tok
        if cur: words.append(cur)
        print(f'  nhận dạng {off:.0f}–{pts[i + 1] / sr:.0f}s', file=sys.stderr)
    words = [w for w in words if w['w']]
    for k, w in enumerate(words):                               # kết thúc = trước từ kế (tối đa 0.6 s)
        nxt = words[k + 1]['s'] if k + 1 < len(words) else w['s'] + 0.4
        w['e'] = min(max(w['s'] + 0.08, nxt - 0.02), w['s'] + 0.6)
    return words, len(x) / sr


def norm(s):
    s = unicodedata.normalize('NFD', s.lower().replace('đ', 'd'))
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in s if unicodedata.category(c) != 'Mn'))


def tokens(text):
    return [t for t in re.split(r'[\s\-–—/·]+', text) if norm(t)]


def align(a, b):
    """Needleman–Wunsch: a (script, N) vs b (ASR, M) → map[i] = j hoặc -1"""
    N, M = len(a), len(b); G = -1.0
    def sc(x, y):
        if x == y: return 2.0
        if len(x) > 2 and len(y) > 2 and (x.startswith(y) or y.startswith(x)): return 1.0
        return -1.0
    S = np.zeros((N + 1, M + 1)); S[:, 0] = np.arange(N + 1) * G; S[0, :] = np.arange(M + 1) * G
    for i in range(1, N + 1):
        for j in range(1, M + 1):
            S[i, j] = max(S[i - 1, j - 1] + sc(a[i - 1], b[j - 1]), S[i - 1, j] + G, S[i, j - 1] + G)
    i, j, mp = N, M, [-1] * N
    while i > 0 and j > 0:
        if S[i, j] == S[i - 1, j - 1] + sc(a[i - 1], b[j - 1]):
            if a[i - 1] == b[j - 1] or sc(a[i - 1], b[j - 1]) > 0: mp[i - 1] = j - 1
            i -= 1; j -= 1
        elif S[i, j] == S[i - 1, j] + G: i -= 1
        else: j -= 1
    return mp


def main():
    a = sys.argv[1:]
    if len(a) < 2: print(__doc__); sys.exit(2)
    proj, voice = a[0], os.path.abspath(a[1]); tail = float(a[a.index('--tail') + 1]) if '--tail' in a else 3.0
    os.chdir(proj)
    lines = json.load(open('script.json', encoding='utf-8'))
    words, dur = asr(voice)
    stoks = []; owner = []                                      # token script + câu sở hữu
    for si, (sid, text) in enumerate(lines):
        for t in tokens(text): stoks.append(t); owner.append(si)
    mp = align([norm(t) for t in stoks], [norm(w['w']) for w in words])
    ts = [(words[j]['s'], words[j]['e']) if j >= 0 else None for j in mp]
    # nội suy mốc cho token không khớp (đơn điệu)
    known = [k for k, v in enumerate(ts) if v]
    if not known: sys.exit('Không khớp được từ nào giữa script và voice — đúng file voice chưa?')
    for k in range(len(ts)):
        if ts[k]: continue
        l = max((q for q in known if q < k), default=None); r = min((q for q in known if q > k), default=None)
        if l is None: ts[k] = (max(0, ts[r][0] - 0.25 * (r - k)), ts[r][0] - 0.25 * (r - k - 1))
        elif r is None: ts[k] = (ts[l][1] + 0.25 * (k - l - 1), ts[l][1] + 0.25 * (k - l))
        else:
            f0 = (k - l) / (r - l + 0.0001); f1 = (k - l + 1) / (r - l + 0.0001); a0, b0 = ts[l][1], ts[r][0]
            ts[k] = (a0 + (b0 - a0) * f0, a0 + (b0 - a0) * min(1, f1))
    segs = []; matched = {}
    for k, si in enumerate(owner): matched.setdefault(si, []).append(mp[k] >= 0)
    for si, (sid, text) in enumerate(lines):
        idx = [k for k, o in enumerate(owner) if o == si]
        wl = [{'w': stoks[k], 's': round(ts[k][0], 3), 'e': round(ts[k][1], 3)} for k in idx]
        segs.append(dict(id=sid, text=text, start=wl[0]['s'], end=wl[-1]['e'], words=wl))
    for i, s in enumerate(segs):                                # đơn điệu, không chồng nhau
        if i and s['start'] < segs[i - 1]['end']:
            m = (s['start'] + segs[i - 1]['end']) / 2; segs[i - 1]['end'] = round(m, 3); s['start'] = round(m, 3)
    total = round(dur + tail, 3)
    out = dict(total=total, segs=segs)
    json.dump(out, open('timing.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open('timing.js', 'w', encoding='utf-8').write('window.TIMING=' + json.dumps(out, ensure_ascii=False) + ';')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', voice, '-ac', '1', '-ar', '22050', '-c:a', 'pcm_s16le', 'voice.wav'], check=True)
    cfg = json.load(open('project.json', encoding='utf-8')) if os.path.exists('project.json') else {}
    cfg['external_voice'] = True; json.dump(cfg, open('project.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)   # build.py không tạo lại giọng máy
    print(f'voice {dur:.1f}s · {len(lines)} câu · total {total}s')
    for si, s in enumerate(segs):
        cov = sum(matched[si]) / len(matched[si])
        print(f"  {s['id']:<4}{s['start']:>7.2f} → {s['end']:>6.2f}  khớp {cov * 100:3.0f}%  {s['text'][:70]}" + ('   ⚠ khớp thấp' if cov < 0.5 else ''))


if __name__ == '__main__':
    main()
