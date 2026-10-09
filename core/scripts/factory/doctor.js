import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawnSync } from "node:child_process";
import { ROOT } from "./state.js";

function pingHttp(url, timeoutMs = 2500) {
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
        let body = "";
        res.on("data", chunk => { body += chunk; });
        res.on("end", () => {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, statusCode: res.statusCode, body });
        });
      });
      req.on("error", (err) => resolve({ ok: false, error: err.message }));
      req.on("timeout", () => { req.destroy(); resolve({ ok: false, error: "timeout" }); });
      req.end();
    } catch (err) {
      resolve({ ok: false, error: err.message });
    }
  });
}

function checkFfmpeg() {
  const candidates = [
    path.join(ROOT, ".tools", "ffmpeg", "ffmpeg-9.0.2-full_build", "bin", "ffmpeg.exe"),
    path.join(ROOT, "engines", "remotion", "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe"),
    path.join(ROOT, "projects", "remotion-factory", "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe"),
    "ffmpeg"
  ];
  for (const candidate of candidates) {
    if (candidate === "ffmpeg" || fs.existsSync(candidate)) {
      const res = spawnSync(candidate, ["-version"], { encoding: "utf8", timeout: 5000 });
      if (res.status === 0) {
        const firstLine = (res.stdout || "").split("\n")[0].trim();
        return { ok: true, path: candidate, version: firstLine };
      }
    }
  }
  return { ok: false, error: "FFmpeg not found in standard paths" };
}

export async function runDoctor() {
  console.log("==================================================");
  console.log("   AI VIDEO FACTORY V2 — PRE-FLIGHT HEALTH CHECK  ");
  console.log("==================================================\n");

  const results = {
    citVoice: { name: "CIT Voice Studio (VieNeu-TTS :8001)", status: "checking" },
    flowkit: { name: "FlowKit Backend (FastAPI :8100)", status: "checking" },
    ffmpeg: { name: "FFmpeg & Media Pipeline", status: "checking" },
    workspace: { name: "Workspace Storage & Node.js", status: "checking" }
  };

  // 1. CIT Voice Studio
  const citRes = await pingHttp("http://127.0.0.1:8001");
  if (citRes.ok || citRes.statusCode === 404 || citRes.statusCode === 200) {
    results.citVoice.status = "PASS";
    results.citVoice.detail = "Online at http://127.0.0.1:8001 (Ready for Hải Đăng 48kHz)";
  } else {
    results.citVoice.status = "OFFLINE";
    results.citVoice.detail = "Server not reachable. Start via CIT Voice Studio app before running TTS.";
    results.citVoice.guide = "Run: python C:\\Users\\DELL\\.agents\\skills\\cit-voice-studio\\scripts\\cit_tts.py health";
  }

  // 2. FlowKit
  const flowRes = await pingHttp("http://127.0.0.1:8100/health");
  if (flowRes.ok) {
    try {
      const data = JSON.parse(flowRes.body);
      results.flowkit.status = "PASS";
      results.flowkit.detail = `FastAPI Online (Chrome Extension Connected: ${data.extension_connected ? "YES" : "NO"})`;
      if (!data.extension_connected) {
        results.flowkit.status = "WARN";
        results.flowkit.detail += " -> Open Chrome with flow.google.com tab to enable video generation.";
      }
    } catch {
      results.flowkit.status = "PASS";
      results.flowkit.detail = "FastAPI Online at http://127.0.0.1:8100";
    }
  } else {
    results.flowkit.status = "OFFLINE";
    results.flowkit.detail = "FastAPI backend not running at :8100 (Required for Vox/FlowKit).";
    results.flowkit.guide = "Run: & 'D:\\AI\\VIDEO AI\\.tools\\flowkit\\venv\\Scripts\\python.exe' -m agent.main";
  }

  // 3. FFmpeg
  const ffRes = checkFfmpeg();
  if (ffRes.ok) {
    results.ffmpeg.status = "PASS";
    results.ffmpeg.detail = `${ffRes.version} (${ffRes.path})`;
  } else {
    results.ffmpeg.status = "FAIL";
    results.ffmpeg.detail = ffRes.error;
  }

  // 4. Node & Workspace
  results.workspace.status = "PASS";
  results.workspace.detail = `Node ${process.version} on ${process.platform} (${ROOT})`;

  // Display report
  let allPass = true;
  for (const [key, item] of Object.entries(results)) {
    const icon = item.status === "PASS" ? "✅" : item.status === "WARN" ? "⚠️" : "❌";
    console.log(`${icon} [${item.status}] ${item.name}`);
    console.log(`   └─ ${item.detail}`);
    if (item.guide) console.log(`   └─ Action: ${item.guide}`);
    if (item.status === "FAIL" || item.status === "OFFLINE") allPass = false;
    console.log("");
  }

  console.log("--------------------------------------------------");
  if (allPass) {
    console.log("Status: ALL CORE SYSTEMS OPERATIONAL 🚀");
  } else {
    console.log("Status: SYSTEM HAS OFFLINE SERVICES (Check notes above before production)");
  }
  console.log("==================================================\n");

  return results;
}
