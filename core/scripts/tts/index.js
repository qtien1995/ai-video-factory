import * as fs from "fs";
import * as path from "path";
import minimist from "minimist";
import { IsomorphicCommunicate } from "edge-tts-universal";

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

async function run() {
  const argv = minimist(process.argv.slice(2));
  const projectId = argv.project;
  const text = argv.text;
  const voice = argv.voice || "vi-VN-HoaiMyNeural";
  const rate = argv.rate || "+10%";
  const pitch = argv.pitch || "+0Hz";
  const volume = argv.volume || "+0%";
  
  if (!projectId || !text) {
    console.error("Usage: node index.js --project <project-id> --text \"<narration>\" [--voice <voice>] [--rate <rate>]");
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

  console.log(`Generating TTS for project ${projectId}...`);
  
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
          words.push({ word: chunk.text, startMs: Math.round(Number(chunk.offset) / 10000),
            durationMs: Math.round(Number(chunk.duration) / 10000) });
        }
      }
      
      const audioBuffer = Buffer.concat(chunks);
      if (audioBuffer.length === 0) throw new Error("No audio bytes received");
      
      fs.writeFileSync(outputPath, audioBuffer);
      
      const durationSec = estimateMp3Duration(audioBuffer);
      const durationMs = Math.round(durationSec * 1000);
      const durationFrames = Math.ceil(durationSec * 30); // for Remotion
      
      const timingData = {
        durationSec,
        durationMs,
        durationFrames,
        fps: 30,
        words
      };
      
      fs.writeFileSync(timingPath, JSON.stringify(timingData, null, 2));
      
      console.log(`Success! Saved to ${outputPath}`);
      console.log(`Timing: ${durationSec.toFixed(2)}s (${durationMs}ms) / ${durationFrames} frames`);
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
