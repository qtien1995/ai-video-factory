// Chụp từng khung hình của trang HTML (Chromium ẩn) → ffmpeg. Trang phải có: window.READY, seek(t), DURATION, SFX.
// node render.mjs <html> <out> --size 1080x1920 [--fps 30] [--from f --to f]   → mp4 một đoạn khung hình [f, to)
// node render.mjs <html> <out_prefix> --size 1080x1920 --stills 1.5,6,20     → ảnh PNG tại các giây đã chọn
// node render.mjs <html> <ignored> --size 1080x1920 --sfx sfx_events.json     → chỉ xuất danh sách hiệu ứng âm thanh (+ in DURATION)
import { createRequire } from 'module';
import { spawn } from 'child_process';
import fs from 'fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const [,, html, out, ...rest] = process.argv;
const opt = {};
for (let i = 0; i < rest.length; i += 2) opt[rest[i].slice(2)] = rest[i + 1];
const [W, H] = (opt.size || '1920x1080').split('x').map(Number);
const FPS = +(opt.fps || 30);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H } });
p.on('pageerror', e => { console.error('PAGE ERROR', e.message); process.exit(1); });
await p.goto('file://' + html);
await p.waitForFunction(() => window.READY, null, { timeout: 60000 });
const DUR = await p.evaluate(() => DURATION);

if (opt.sfx) fs.writeFileSync(opt.sfx, JSON.stringify(await p.evaluate(() => SFX)));
if (opt.stills) {
  for (const t of opt.stills.split(',')) { await p.evaluate(t => seek(+t), t); await p.screenshot({ path: `${out}_${t}.png` }); }
} else if (opt.from !== undefined) {
  const N = Math.ceil(DUR * FPS);
  const f0 = +opt.from, f1 = Math.min(+opt.to, N);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', '' + FPS, '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = f0; i < f1; i++) {
    await p.evaluate(t => seek(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
} else {
  console.log('DURATION', DUR);
}
await b.close();
