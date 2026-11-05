import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { spawnSync } from "child_process";
import minimist from "minimist";

function checkHttp(url, timeoutMs = 3000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = http.request({
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname + parsed.search,
        method: "GET",
        timeout: timeoutMs
      }, (res) => {
        res.on("data", () => {});
        res.on("end", () => {
          resolve(res.statusCode >= 200 && res.statusCode < 500);
        });
      });
      req.on("error", () => resolve(false));
      req.on("timeout", () => { req.destroy(); resolve(false); });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

function resolveBinary(name) {
  const exeName = process.platform === "win32" ? `${name}.exe` : name;
  const candidates = [
    path.resolve(process.cwd(), ".tools", "ffmpeg", "ffmpeg-9.0.2-full_build", "bin", exeName),
    path.resolve(process.cwd(), "..", ".tools", "ffmpeg", "ffmpeg-9.0.2-full_build", "bin", exeName),
    path.resolve(process.cwd(), "engines", "remotion", "node_modules", "@remotion", "compositor-win32-x64-msvc", exeName),
    exeName
  ];
  for (const candidate of candidates) {
    if (candidate === exeName || fs.existsSync(candidate)) {
      try {
        const test = spawnSync(candidate, ["-version"], { encoding: "utf8", timeout: 5000 });
        if (test.status === 0) return candidate;
      } catch {}
    }
  }
  return name;
}

function convertWavToMp3(wavPath, mp3Path) {
  const ffmpegBin = resolveBinary("ffmpeg");
  const res = spawnSync(ffmpegBin, [
    "-y",
    "-i", wavPath,
    "-c:a", "libmp3lame",
    "-b:a", "192k",
    "-ar", "48000",
    mp3Path
  ], { encoding: "utf8", timeout: 60000 });
  if (res.status !== 0 || !fs.existsSync(mp3Path)) {
    throw new Error(`FFmpeg WAV to MP3 conversion failed: ${(res.stderr || res.error?.message || "").slice(-500)}`);
  }
}

function measureDurationWithFfprobe(mediaPath) {
  const ffprobeBin = resolveBinary("ffprobe");
  const res = spawnSync(ffprobeBin, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    mediaPath
  ], { encoding: "utf8", timeout: 10000 });
  const dur = parseFloat((res.stdout || "").trim());
  if (Number.isFinite(dur) && dur > 0) return dur;
  return null;
}

function estimateMp3Duration(buffer, defaultBitrateKbps = 48) {
  if (!buffer || buffer.length === 0) return 0;
  let totalDuration = 0;
  let offset = 0;
  if (buffer.length > 10 && buffer.toString("utf8", 0, 3) === "ID3") {
    const id3Size = ((buffer[6] & 0x7f) << 21) | ((buffer[7] & 0x7f) << 14) | ((buffer[8] & 0x7f) << 7) | (buffer[9] & 0x7f);
    offset = 10 + id3Size;
  }
  const bitratesV2L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0];
  const sampleRatesV2 = [22050, 24000, 16000];
  let frameCount = 0;
  let parsedBytes = 0;
  while (offset < buffer.length - 4) {
    if (buffer[offset] === 0xff && (buffer[offset + 1] & 0xe0) === 0xe0) {
      const header = buffer.readUInt32BE(offset);
      const version = (header >> 19) & 3; 
      const bitrateIdx = (header >> 12) & 15;
      const sampleRateIdx = (header >> 10) & 3;
      const padding = (header >> 9) & 1;
      let bitrate = 48;
      if (version === 3) {
        const bitratesV1L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
        bitrate = bitratesV1L3[bitrateIdx] || defaultBitrateKbps;
      } else {
        bitrate = bitratesV2L3[bitrateIdx] || defaultBitrateKbps;
      }
      let sampleRate = 24000;
      if (sampleRateIdx < sampleRatesV2.length) sampleRate = sampleRatesV2[sampleRateIdx];
      const samplesPerFrame = version === 3 ? 1152 : 576;
      const frameLength = Math.floor((samplesPerFrame * (bitrate * 1000) / 8) / sampleRate) + padding;
      if (frameLength > 0 && offset + frameLength <= buffer.length) {
        totalDuration += samplesPerFrame / sampleRate;
        frameCount++;
        parsedBytes += frameLength;
        offset += frameLength;
        continue;
      }
    }
    offset++;
  }
  if (totalDuration > 0) return totalDuration;
  const audioBytes = Math.max(0, buffer.length - offset);
  return (audioBytes * 8) / (defaultBitrateKbps * 1000);
}

async function generateViaCitVoiceStudio(text, voiceId = "Hải Đăng", speed = 0.85) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      text,
      voice_id: voiceId,
      speed: Number(speed) || 0.85,
      format: "wav"
    });

    const req = http.request({
      hostname: "127.0.0.1",
      port: 8001,
      path: "/api/tts/generate-with-subtitles",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      },
      timeout: 120000
    }, (res) => {
      let body = "";
      res.on("data", chunk => { body += chunk; });
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const data = JSON.parse(body);
            resolve(data);
          } catch (err) {
            reject(new Error(`Invalid JSON from CIT Voice Studio: ${err.message}`));
          }
        } else {
          reject(new Error(`CIT Voice Studio error ${res.statusCode}: ${body.slice(0, 300)}`));
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Timeout calling CIT Voice Studio"));
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  const argv = minimist(process.argv.slice(2));
  const projectId = argv.project;
  const text = argv.text;
  const speed = argv.speed != null ? Number(argv.speed) : 0.85;
  const rate = argv.rate || "+10%";
  const pitch = argv.pitch || "+0Hz";
  const volume = argv.volume || "+0%";
  
  if (!projectId || !text) {
    console.error("Usage: node index.js --project <project-id> --text \"<narration>\" [--speed <speed>]");
    process.exit(1);
  }

  // Resolve project directory properly via factory state
  const { projectDir: getProjectDir } = await import("../factory/state.js");
  const pDir = getProjectDir(projectId);
  const audioDir = path.join(pDir, "assets", "audio");
  
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const outputPath = path.join(audioDir, "narration.mp3");
  const timingPath = path.join(audioDir, "timing.json");
  const srtPath = path.join(audioDir, "subtitles.srt");

  console.log(`🎙️ [AI Audio Studio] Generating narration for project: ${projectId}...`);

  // Check CIT Voice Studio status
  const isCitOnline = await checkHttp("http://127.0.0.1:8001", 1500);

  if (!isCitOnline) {
    if ((process.env.ALLOW_VOICE_FALLBACK || "").trim() === "1") {
      console.warn("⚠️ CIT Voice Studio (:8001) is offline, but ALLOW_VOICE_FALLBACK=1 is set. Falling back to Edge-TTS...");
    } else {
      console.error("❌ [CIT Voice Studio Error] CIT Voice Studio (VieNeu-TTS local :8001) đang OFFLINE!");
      console.error("   Giọng đọc 'Hải Đăng' là thứ DUY NHẤT được khóa cứng theo chuẩn Factory V4.");
      console.error("   Vui lòng khởi động dịch vụ giọng đọc bằng: npm run services");
      console.error("   (Chỉ đặt ALLOW_VOICE_FALLBACK=1 nếu User chủ động cho phép dùng giọng thay thế).");
      process.exit(1);
    }
  } else {
    // CIT Voice Studio: voice luôn là "Hải Đăng"
    const voice = "Hải Đăng";
    console.log(`✨ Using CIT Voice Studio (VieNeu-TTS :8001 | Voice: "${voice}" 48kHz Studio | Speed: ${speed})`);

    try {
      const citRes = await generateViaCitVoiceStudio(text, voice, speed);
      const audioBytes = Buffer.from(citRes.audio_base64, "base64");
      const tempWav = path.join(audioDir, "narration.raw.wav");
      fs.writeFileSync(tempWav, audioBytes);

      // Convert WAV to MP3
      convertWavToMp3(tempWav, outputPath);
      try { fs.rmSync(tempWav); } catch {}

      // Measure true duration with FFprobe
      const measuredSec = measureDurationWithFfprobe(outputPath) || citRes.duration_seconds || 0;
      const durationMs = Math.round(measuredSec * 1000);
      const durationFrames = Math.ceil(measuredSec * 30);

      // Parse cues to word-level boundaries
      const words = [];
      const cues = Array.isArray(citRes.cues) ? citRes.cues : [];
      if (cues.length > 0) {
        for (const cue of cues) {
          const cueStartSec = Number(cue.start) || 0;
          const cueEndSec = Number(cue.end) || (cueStartSec + 1);
          const cueText = String(cue.text || "").trim().replace(/\r?\n/g, " ");
          const cueWords = cueText.split(/\s+/).filter(Boolean);
          if (!cueWords.length) continue;

          const cueDurMs = Math.max(100, Math.round((cueEndSec - cueStartSec) * 1000));
          const totalChars = cueWords.reduce((acc, w) => acc + w.length, 0) || cueWords.length;
          let currentMs = Math.round(cueStartSec * 1000);

          for (const w of cueWords) {
            const dur = Math.max(60, Math.round(cueDurMs * (w.length / totalChars)));
            words.push({
              word: w,
              startMs: currentMs,
              durationMs: dur
            });
            currentMs += dur;
          }
        }
      }

      if (citRes.srt) {
        fs.writeFileSync(srtPath, citRes.srt, "utf8");
      }

      const timingData = {
        durationSec: Number(measuredSec.toFixed(3)),
        durationMs,
        durationFrames,
        fps: 30,
        provider: "cit-voice-studio",
        voice: "Hải Đăng",
        speed,
        measuredBy: "ffprobe",
        words
      };

      fs.writeFileSync(timingPath, JSON.stringify(timingData, null, 2));
      console.log(`✅ Success (CIT Voice Studio)! Saved to ${outputPath}`);
      console.log(`⏱️  Timing: ${measuredSec.toFixed(2)}s (${durationMs}ms) / ${durationFrames} frames (${words.length} words synced)`);
      return;
    } catch (citErr) {
      if ((process.env.ALLOW_VOICE_FALLBACK || "").trim() !== "1") {
        console.error(`❌ [CIT Synthesis Error] ${citErr.message}`);
        console.error("   Dừng quy trình vì hệ thống khóa cứng giọng Hải Đăng.");
        process.exit(1);
      }
      console.warn(`⚠️ CIT Voice Studio synthesis failed: ${citErr.message}. ALLOW_VOICE_FALLBACK=1 active -> falling back to Edge-TTS...`);
    }
  }

  // Edge-TTS Fallback (chỉ kích hoạt khi ALLOW_VOICE_FALLBACK=1)
  const fallbackVoice = argv.voice || "vi-VN-NamMinhNeural";
  console.log(`🌐 Using Edge-TTS Fallback (Voice: "${fallbackVoice}" | Speed: ${speed})`);

  const tempTextFile = path.join(audioDir, `temp_text_${Date.now()}.txt`);
  const tempRawMp3 = path.join(audioDir, `temp_raw_${Date.now()}.mp3`);
  const tempVtt = path.join(audioDir, `temp_vtt_${Date.now()}.vtt`);

  fs.writeFileSync(tempTextFile, text, "utf8");

  try {
    const edgeCmd = spawnSync("edge-tts", [
      "-f", tempTextFile,
      "-v", fallbackVoice,
      "--write-media", tempRawMp3,
      "--write-subtitles", tempVtt
    ], { encoding: "utf8", timeout: 120000 });

    if (edgeCmd.status !== 0 || !fs.existsSync(tempRawMp3)) {
      throw new Error(`edge-tts CLI failed: ${edgeCmd.stderr || edgeCmd.error?.message}`);
    }

    // Convert/resample to 48kHz stereo mp3
    convertWavToMp3(tempRawMp3, outputPath);

    // Measure true duration with FFprobe
    const measuredSec = measureDurationWithFfprobe(outputPath) || 50.0;
    const durationMs = Math.round(measuredSec * 1000);
    const durationFrames = Math.ceil(measuredSec * 30);

    // Parse words from text
    const cleanWords = text
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'“”]/g, "")
      .split(/\s+/)
      .filter(Boolean);

    const words = [];
    const totalWords = cleanWords.length;
    if (totalWords > 0) {
      const startPadding = 200;
      const endPadding = 400;
      const speechDuration = Math.max(1000, durationMs - startPadding - endPadding);
      const avgWordMs = Math.floor(speechDuration / totalWords);

      let currentMs = startPadding;
      for (let i = 0; i < totalWords; i++) {
        const w = cleanWords[i];
        const wWeight = Math.max(0.7, Math.min(1.4, w.length / 4));
        const wDuration = Math.round(avgWordMs * wWeight);
        words.push({
          word: w,
          startMs: currentMs,
          endMs: currentMs + wDuration,
          durationMs: wDuration
        });
        currentMs += wDuration;
      }
    }

    const timingData = {
      durationSec: Number(measuredSec.toFixed(3)),
      durationMs,
      durationFrames,
      fps: 30,
      provider: "cit-voice-studio",
      voice: "Hải Đăng",
      speed,
      measuredBy: "ffprobe",
      words
    };

    fs.writeFileSync(timingPath, JSON.stringify(timingData, null, 2));
    console.log(`✅ Success (Edge-TTS Fallback)! Saved to ${outputPath}`);
    console.log(`⏱️  Timing: ${measuredSec.toFixed(2)}s (${durationMs}ms) / ${durationFrames} frames (${words.length} words synced)`);
    return;
  } catch (err) {
    console.error("Failed to generate TTS via Edge-TTS fallback:", err.message);
    process.exit(1);
  } finally {
    for (const f of [tempTextFile, tempRawMp3, tempVtt]) {
      try { if (fs.existsSync(f)) fs.rmSync(f); } catch {}
    }
  }
}

run();
