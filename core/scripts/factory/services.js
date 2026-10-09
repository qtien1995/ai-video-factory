import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn } from "node:child_process";
import { ROOT } from "./state.js";

function checkHttp(url, timeoutMs = 1500) {
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
        resolve(res.statusCode >= 200 && res.statusCode < 500);
      });
      req.on("error", () => resolve(false));
      req.on("timeout", () => { req.destroy(); resolve(false); });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function ensureFlowKit(timeoutMs = 10000) {
  const isOnline = await checkHttp("http://127.0.0.1:8100/health", 1000);
  if (isOnline) return true;

  console.log("⚡ [Auto-Service] FlowKit Backend (:8100) chưa bật. Đang tự động kích hoạt...");
  const pythonExe = path.join(ROOT, ".tools", "flowkit", "venv", "Scripts", "python.exe");
  const flowDir = path.join(ROOT, ".tools", "flowkit");

  if (fs.existsSync(pythonExe)) {
    try {
      const child = spawn(pythonExe, ["-m", "agent.main"], {
        cwd: flowDir,
        detached: true,
        stdio: "ignore",
        windowsHide: true
      });
      child.unref();

      // Open Chrome tab for Google Flow extension to connect
      const browserChild = spawn("powershell.exe", ["-NoProfile", "-Command", "Start-Process 'https://flow.google.com/'"], {
        detached: true,
        stdio: "ignore",
        windowsHide: true
      });
      browserChild.unref();

      // Poll until online
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        await sleep(1000);
        if (await checkHttp("http://127.0.0.1:8100/health", 1000)) {
          console.log("✅ [Auto-Service] FlowKit Backend và Google Flow đã sẵn sàng! (:8100)");
          return true;
        }
      }
    } catch (err) {
      console.warn(`⚠️ [Auto-Service] Không thể tự mở FlowKit: ${err.message}`);
    }
  }
  return false;
}

export async function ensureCitVoiceStudio(timeoutMs = 15000) {
  const isOnline = await checkHttp("http://127.0.0.1:8001", 1000);
  if (isOnline) return true;

  console.log("⚡ [Auto-Service] CIT Voice Studio (:8001) chưa bật. Đang tự động kích hoạt...");

  const psCommand = `
    $exes = @(
      "$env:LOCALAPPDATA\\Programs\\CIT Voice Studio\\CIT Voice Studio.exe",
      "$env:ProgramFiles\\CIT Voice Studio\\CIT Voice Studio.exe",
      "D:\\AI\\CIT-Voice-Studio-v1.0.3-win-x86_64.exe"
    )
    foreach ($e in $exes) {
      if (Test-Path $e) {
        Start-Process -FilePath $e
        break
      }
    }
  `;

  try {
    const child = spawn("powershell.exe", ["-NoProfile", "-Command", psCommand], {
      detached: true,
      stdio: "ignore",
      windowsHide: true
    });
    child.unref();

    // Poll until online
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      await sleep(1500);
      if (await checkHttp("http://127.0.0.1:8001", 1000)) {
        console.log("✅ [Auto-Service] CIT Voice Studio đã sẵn sàng! (:8001)");
        return true;
      }
    }
  } catch (err) {
    console.warn(`⚠️ [Auto-Service] Không thể tự gọi CIT Voice Studio: ${err.message}`);
  }

  console.log("ℹ️ [Auto-Service] Đã gửi lệnh khởi động CIT Voice Studio. Nếu ứng dụng chưa mở, vui lòng nhấp đúp biểu tượng CIT Voice Studio trên màn hình Desktop.");
  return false;
}

export async function ensureServices(options = { tts: true, flowkit: false }) {
  const promises = [];
  if (options.tts) promises.push(ensureCitVoiceStudio());
  if (options.flowkit) promises.push(ensureFlowKit());
  await Promise.all(promises);
}
