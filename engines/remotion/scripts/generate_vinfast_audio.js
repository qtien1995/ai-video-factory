import fs from "fs";
import path from "path";
import { IsomorphicCommunicate } from "edge-tts-universal";

async function main() {
  const voice = "vi-VN-NamMinhNeural";
  const rate = "+15%";
  const pitch = "+2Hz";
  const volume = "+10%";

  const text = `Ba! Năm! Sáu! Bảy! Tám! Tám! Chín! Chín! Chín!
VinFast! Chạm tương lai!
VF 3! Phố đông luồn lách!
VF 5! Chạy nhanh bất chấp!
VF 6! Đẹp từng góc cạnh!
VF 7! Phi cơ cất cánh!
Bật nguồn! Cắm sạc! Vút êm! Đạp ga!
Một! Hai! Ba! Bứt phá!
VF 8! Vững chãi đường dài!
VF 9! Đẳng cấp tương lai!
Lướt êm ru! Không khói bụi!
Bật chế độ xanh! VinFast dẫn đầu!
Go Green! Chạm tương lai! STOP!
VinFast! Hệ sinh thái thuần điện thông minh toàn cầu!`;

  console.log("Synthesizing audio with voice:", voice);
  const communicate = new IsomorphicCommunicate(text, { voice, rate, pitch, volume });

  const chunks = [];
  const words = [];

  for await (const chunk of communicate.stream()) {
    if (chunk.type === "audio" && chunk.data) {
      if (Buffer.isBuffer(chunk.data)) chunks.push(chunk.data);
      else if (chunk.data instanceof Uint8Array || chunk.data instanceof ArrayBuffer) chunks.push(Buffer.from(chunk.data));
    } else if (chunk.type === "WordBoundary" && chunk.text != null) {
      words.push({
        word: chunk.text,
        startMs: Math.round(Number(chunk.offset) / 10000),
        durationMs: Math.round(Number(chunk.duration) / 10000)
      });
    }
  }

  const audioBuffer = Buffer.concat(chunks);
  const outDir = path.resolve("public/audio/vinfast");
  fs.mkdirSync(outDir, { recursive: true });

  const audioPath = path.join(outDir, "narration.mp3");
  const timingPath = path.join(outDir, "timing.json");

  fs.writeFileSync(audioPath, audioBuffer);
  fs.writeFileSync(timingPath, JSON.stringify({ words, totalWords: words.length }, null, 2));

  console.log("Successfully generated audio:", audioPath, "Bytes:", audioBuffer.length);
  console.log("Extracted words:", words.length);
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
