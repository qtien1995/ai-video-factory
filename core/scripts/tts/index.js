import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { spawnSync } from "child_process";
import minimist from "minimist";
import { IsomorphicCommunicate } from "edge-tts-universal";

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
  let provider = (argv.provider || "auto").toLowerCase();
  let voice = argv.voice;
  const rate = argv.rate || "+10%";
  const speed = argv.speed || 0.85;
  const pitch = argv.pitch || "+0Hz";
  const volume = argv.volume || "+0%";
  
  if (!projectId || !text) {
    console.error("Usage: node index.js --project <project-id> --text \"<narration>\" [--voice <voice>] [--speed <speed>] [--provider <cit|edge-tts|auto>]");
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

  // Auto-detect provider if "auto" or "cit"
  let useCit = false;
  if (provider === "cit" || provider === "cit-voice-studio" || provider === "auto") {
    const isCitOnline = await checkHttp("http://127.0.0.1:8001", 1500);
    if (isCitOnline) {
      useCit = true;
      if (!voice || voice === "vi-VN-HoaiMyNeural") voice = "Hải Đăng";
      console.log(`✨ Using CIT Voice Studio (VieNeu-TTS :8001 | Voice: "${voice}" 48kHz Studio)`);
    } else if (provider === "cit" || provider === "cit-voice-studio") {
      console.warn("⚠️ CIT Voice Studio requested but port :8001 is offline. Falling back to Edge-TTS...");
    }
  }

  // 1. Try CIT Voice Studio if active
  if (useCit) {
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
        voice,
        measuredBy: "ffprobe",
        words
      };

      fs.writeFileSync(timingPath, JSON.stringify(timingData, null, 2));
      console.log(`✅ Success (CIT Voice Studio)! Saved to ${outputPath}`);
      console.log(`⏱️  Timing: ${measuredSec.toFixed(2)}s (${durationMs}ms) / ${durationFrames} frames (${words.length} words synced)`);
      return;
    } catch (citErr) {
      console.warn(`⚠️ CIT Voice Studio synthesis failed: ${citErr.message}. Falling back to Edge-TTS...`);
    }
  }

  // 2. Edge-TTS Fallback
  if (!voice || voice === "Hải Đăng") voice = "vi-VN-HoaiMyNeural";
  console.log(`🌐 Using Edge-TTS Universal (Voice: "${voice}" | Rate: ${rate})`);

  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const chunks = [];
      const words = [];
      const communicate = new IsomorphicCommunicate(text, { voice, rate, pitch, volume });
      
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
      if (audioBuffer.length === 0) throw new Error("No audio bytes received");
      
      fs.writeFileSync(outputPath, audioBuffer);
      
      const measuredSec = measureDurationWithFfprobe(outputPath) || estimateMp3Duration(audioBuffer);
      const durationMs = Math.round(measuredSec * 1000);
      const durationFrames = Math.ceil(measuredSec * 30);
      
      const timingData = {
        durationSec: Number(measuredSec.toFixed(3)),
        durationMs,
        durationFrames,
        fps: 30,
        provider: "edge-tts-universal",
        voice,
        measuredBy: "ffprobe",
        words
      };
      
      fs.writeFileSync(timingPath, JSON.stringify(timingData, null, 2));
      
      console.log(`✅ Success (Edge-TTS)! Saved to ${outputPath}`);
      console.log(`⏱️  Timing: ${measuredSec.toFixed(2)}s (${durationMs}ms) / ${durationFrames} frames (${words.length} words synced)`);
      return;
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt} failed, retrying...`, err.message);
      await new Promise(r => setTimeout(r, 1500));
    }
  }
  
  console.error("Failed to generate TTS:", lastError);
  process.exit(1);
}

run();
