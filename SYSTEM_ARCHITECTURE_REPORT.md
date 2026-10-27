# BÁO CÁO KIẾN TRÚC HỆ THỐNG — AI VIDEO FACTORY V3

> **Dự án**: AI Video Factory V3 (Streamlined Social Video Production Workspace)  
> **Kiến trúc sư hệ thống**: Senior Staff Engineer  
> **Thời gian xuất báo cáo**: 26/10/2026  
> **Mục đích**: Báo cáo tổng quan kiến trúc và cơ chế kỹ thuật để chuyển giao/phân tích chuyên gia.

---

## 1. Tech Stack & Packages

Hệ thống được tổ chức theo kiến trúc monorepo tinh gọn với bộ điều phối trung tâm bằng Node.js & Python kết hợp engine dựng video chuyên dụng Remotion.

* **Điều phối & Công cụ hệ thống (Orchestrator & Host):**
  * Node.js (ESM), Python 3 (`edge-tts`, `asyncio`, `subprocess`).
  * FFmpeg & FFprobe 9.0.2 standalone build tại `.tools/ffmpeg/`.
* **Engine video chính:**
  * **Remotion 4.0.519** kết hợp **React 19.2.3**, **Tailwind CSS v4.0.0**, **TypeScript 5.9.3**.
  * Hỗ trợ đồ họa vector, 3D và animation phức hợp: Three.js/R3F, Motion Canvas 2D, GSAP, Anime.js, Motion (Framer Motion).

### Toàn bộ `dependencies` và `devDependencies` trong `engines/remotion/package.json`

```json
{
  "dependencies": {
    "@motion-canvas/2d": "^3.17.2",
    "@motion-canvas/core": "^3.17.2",
    "@react-three/drei": "^10.7.9",
    "@react-three/fiber": "^9.8.2",
    "@react-three/postprocessing": "^3.2.2",
    "@react-three/rapier": "^2.2.0",
    "@remotion/captions": "4.0.519",
    "@remotion/cli": "4.0.519",
    "@remotion/fonts": "4.0.519",
    "@remotion/media": "4.0.519",
    "@remotion/tailwind-v4": "4.0.519",
    "@remotion/transitions": "4.0.519",
    "@remotion/zod-types": "4.0.519",
    "@rive-app/react-canvas": "^4.37.1",
    "@types/animejs": "^3.1.13",
    "@types/howler": "^2.2.13",
    "@types/three": "^0.186.0",
    "animejs": "^4.5.0",
    "dotenv": "^17.4.2",
    "edge-tts-universal": "^1.4.0",
    "gsap": "^3.15.0",
    "howler": "^2.2.4",
    "lottie-react": "^3.1.2",
    "mediabunny": "^1.62.1",
    "motion": "^14.6.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "remotion": "4.0.519",
    "satori": "^0.63.2",
    "svgo": "^4.1.0",
    "tailwindcss": "4.0.0",
    "three": "^0.186.1",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@remotion/eslint-config-flat": "4.0.519",
    "@types/react": "19.2.7",
    "@types/web": "0.0.166",
    "eslint": "9.19.0",
    "prettier": "3.8.1",
    "tsx": "^4.23.13",
    "typescript": "5.9.3"
  }
}
```

*(Gói bổ trợ điều phối tại `core/package.json` gồm: `edge-tts-universal: ^1.4.0`, `minimist: ^1.2.8`, `zod: ^4.6.5`)*.

---

## 2. Cấu trúc thư mục (Directory Tree)

*(Đã lược bỏ `node_modules`, `.git`, `dist`, `build`, `.archive`)*

```text
D:\AI\VIDEO AI\
├── core/                                # Bộ điều phối trung tâm (CLI, Audio, Validation, DNA)
│   ├── contracts/                       # Interface định nghĩa chuẩn dữ liệu
│   ├── schemas/                         # Zod schema kiểm thực kịch bản, style, storyboard
│   └── scripts/                         # Pipeline scripts: factory, tts, render, dna, style
├── engines/
│   └── remotion/                        # Engine render chính (Remotion 4 + React 19)
│       ├── public/                      # Assets tĩnh dùng chung (audio, fonts, images)
│       └── src/
│           ├── CanonicalVideo/          # Layout & Motion wrapper chuẩn
│           ├── projects/                # Mã nguồn render của từng video
│           │   ├── ung-thu-dai-truc-trang-top-3/  # Project y khoa mẫu (Scenes.tsx, subtitles.json...)
│           │   ├── tradingview-dark-pro/
│           │   ├── vnindex-bull-trap/
│           │   └── ...
│           ├── shared/                  # Thư viện dùng chung (CardArchetypes, Subtitles, Outro)
│           └── Root.tsx                 # Đăng ký các Composition của Remotion
├── projects/                            # Không gian lưu trữ dữ liệu sản xuất thực tế
│   ├── financial-insurance/             # Video ngành Tài chính - Bảo hiểm - Sức khỏe
│   │   └── CNT-20261025-UNG-THU-DAI-TRUC-TRANG-TOP-3/
│   │       ├── assets/audio/            # Narration, BGM, SFX
│   │       ├── output/                  # Chứa duy nhất final.mp4, thumbnails
│   │       ├── generate_audio.py        # TTS + trích xuất timing word & scene
│   │       ├── render_final.py          # Master audio EBU R128 + Render final MP4
│   │       ├── script.md                # Kịch bản chi tiết
│   │       └── storyboard.json          # Phân rã khung hình
│   ├── social-shorts/                   # Video ngắn mạng xã hội
│   └── auto-cuts/                       # Video footage cắt ghép tự động
├── styles/                              # Thư viện Style DNA (bảng màu, font, physics)
│   ├── clean-explainer/
│   ├── finance-data-pro/
│   └── medical-biometrics-pro/
├── dna-vault/                           # Hồ sơ bóc tách từ video tham khảo
├── .tools/                              # Công cụ độc lập cục bộ (ffmpeg, flowkit)
└── .agents/                             # Kỹ năng và quy tắc chuyên biệt của AI Agent
```

---

## 3. Luồng hoạt động (Pipeline / Workflow)

Hệ thống hoạt động theo mô hình **Audio-First Driven**, đảm bảo mọi hiệu ứng thị giác và nhịp chuyển cảnh đều khớp chính xác từng mili-giây theo giọng đọc:

```text
Kịch bản (Script) 
   │
   ▼
1. TỔNG HỢP AUDIO & ĐO ĐẠC TIMING (generate_audio.py)
   ├── Dùng TTS (Edge-TTS hoặc CIT Voice Studio) sinh file âm thanh cho từng câu.
   ├── Chạy FFprobe đọc thời lượng mili-giây (ms) thực tế từng file voice.
   ├── Tính toán frame theo chuẩn 30fps: `frame = (ms / 1000) * 30`.
   └── Phân rã từng từ (token) gắn timestamp `startMs`, `endMs` ➔ xuất `subtitles.json` & `scenes.json`.
   │
   ▼
2. ÁNH XẠ KHUNG HÌNH REMOTION (UngThuDaiTrucTrangVideo.tsx)
   ├── Đọc `scenes.json`: Lồng từng Scene vào component `<Sequence from={startFrame} durationInFrames={durationFrames}>`.
   ├── Thiết lập camera breathing toàn cục: `scale` & `rotate` nhẹ dao động theo frame (`Math.sin(frame * ...)`).
   │
   ▼
3. ĐỒNG BỘ CHỮ & HIỆU ỨNG THỜI GIAN THỰC
   ├── Phụ đề (`SpeechSyncedSubtitles`): Lấy `currentMs = (frame / 30) * 1000`. So khớp từ đang đọc (`activeIndex`), tự động đổi màu highlight và phóng to từ khóa quan trọng (Word Punching).
   ├── Hiệu ứng đồ họa: Sử dụng toán học chuyển động `interpolate(frame, [start, end], [val1, val2])` và `spring({frame, fps, config})`.
   │
   ▼
4. MASTER ÂM THANH & RENDER RA MP4 (render_final.py)
   ├── Trộn đa kênh bằng FFmpeg: Voiceover + BGM (volume thấp) + SFX (đặt đúng delay ms) ➔ chuẩn hóa phát thanh EBU R128 (`-12.5 LUFS`, True Peak `-1.5 dBFS`) ra `mastered_audio.wav`.
   ├── Remotion CLI render video thô câm tiếng: `npx remotion render ... temp_video.mp4 --muted --gl=angle`.
   └── FFmpeg ghép `temp_video.mp4` với `mastered_audio.wav` (AAC 192k 48kHz) ➔ Xuất ra duy nhất file `final.mp4`.
```

---

## 4. Cơ chế dựng hình hiện tại

Đối với các minh họa kỹ thuật/y khoa như **khung đại tràng** và **thao tác cắt polyp**:

* **Công nghệ dựng:** **100% SVG thuần (Scalable Vector Graphics) lồng trực tiếp trong TSX (React Component)**, được tạo hình thủ công theo dạng tọa độ toán học; hoàn toàn **không** dùng ảnh tĩnh (PNG/JPG) hay Canvas 2D bên ngoài.
* **Chi tiết cấu tạo:**
  * **Khung đại tràng (`ColonAnatomyIllustration`):** Sử dụng các thẻ `<path d="M 130 390 C 120 310..." />` (đường cong Bézier bậc ba). Ứng dụng `<linearGradient>` và bộ lọc phát sáng neon `<filter id="neonBlur"><feGaussianBlur stdDeviation="10" />`. Hiệu ứng quét tia/nét vẽ neon động được kích hoạt bằng cách điều khiển `strokeDasharray` và `strokeDashoffset` dựa trên biến `progress` tính từ frame hiện tại (`strokeDashoffset = totalLength * (1 - progress)`).
  * **Mô phỏng nội soi cắt polyp (`EndoscopyESDMicroAnimation`):**
    * Nền HUD vi phẫu: Giao diện giả lập kính hiển vi phóng đại 10X.
    * Lớp đáy cơ & niêm mạc ruột: Vẽ bằng `<rect>` và `<path>`.
    * Cục polyp lồi: Vẽ bằng đường cong Bézier khép kín `<path d="M 285 75 C 285 30... Z" fill="#E11D48" />`.
    * Ống soi & thanh cắt: Ống nội soi bằng `<rect>`, đầu dao cắt bằng `<polygon>`, tia năng lượng laser bằng `<circle>` có hiệu ứng đập nhịp `beamPulse = Math.sin(frame * 0.4) * 0.2 + 0.8`.
    * Chuyển động bóc tách: Sử dụng `interpolate(frame, [30, 80], [0, 1])` để tịnh tiến đầu dao (`translate`), nâng polyp lên khi tách rời (`translate(0, ${polypLift})`) và làm mờ dần polyp khi đã cắt xong (`opacity={polypOpacity}`).

---

## 5. Cấu trúc 1 Scene mẫu (Trích xuất nguyên vẹn)

Dưới đây là nguyên văn đoạn mã của phân cảnh **Scene 4** (`Scene4Solution` kết hợp `EndoscopyESDMicroAnimation`) trong file `engines/remotion/src/projects/ung-thu-dai-truc-trang-top-3/Scenes.tsx`:

```tsx
// ============================================================================
// ANIMATED ENDOSCOPY ESD MICROSURGERY SIMULATION (Scene 4 Visual Metaphor)
// ============================================================================
export const EndoscopyESDMicroAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  // Knife / snare cut progress from frame 30 to 80
  const cutProgress = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const polypLift = interpolate(cutProgress, [0.7, 1], [0, -35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const polypOpacity = interpolate(cutProgress, [0.85, 1], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beamPulse = Math.sin(frame * 0.4) * 0.2 + 0.8;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 920,
        height: 240,
        backgroundColor: "rgba(11, 19, 36, 0.85)",
        border: "2px solid rgba(16, 185, 129, 0.5)",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Header bar of microscope HUD */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 10px #10B981",
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 800, color: "#34D399", letterSpacing: 1.5 }}>
            MÔ PHỎNG NỘI SOI CẮT TÁCH NIÊM MẠC (ESD)
          </span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#94A3B8", fontFamily: "monospace" }}>
          MAG: 10X · HD ENDOSCOPY
        </span>
      </div>

      {/* SVG Cross-section Animation */}
      <div style={{ flex: 1, position: "relative" }}>
        <svg viewBox="0 0 700 170" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="mucosaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E11D48" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Deep Muscular Layer (Lớp cơ đáy được bảo tồn nguyên vẹn) */}
          <rect x="0" y="115" width="700" height="55" fill="url(#muscleGrad)" />
          <line x1="0" y1="115" x2="700" y2="115" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="20" y="145" fill="#64748B" fontSize="13" fontWeight="700">
            LỚP CƠ THÀNH RUỘT (ĐƯỢC BẢO TỒN NGUYÊN VẸN 100%)
          </text>

          {/* Mucosa Tissue Base */}
          <path
            d="M 0 115 L 0 75 Q 180 75, 270 75 Q 350 75, 430 75 L 700 75 L 700 115 Z"
            fill="url(#mucosaGrad)"
          />

          {/* Polyp lesion being detached */}
          <g transform={`translate(0, ${polypLift})`} opacity={polypOpacity}>
            {/* The elevated polyp dome */}
            <path
              d="M 285 75 C 285 30, 320 18, 350 18 C 380 18, 415 30, 415 75 Z"
              fill="#E11D48"
              stroke="#FDA4AF"
              strokeWidth="2.5"
            />
            {/* Target label inside polyp */}
            <text x="350" y="52" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle">
              POLYP TIỀN UNG THƯ
            </text>
          </g>

          {/* Endoscopic Probe Catheter coming from the left */}
          <g transform={`translate(${interpolate(cutProgress, [0, 1], [-20, 110])}, 0)`}>
            {/* Probe body */}
            <rect x="120" y="65" width="160" height="12" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Knife tip */}
            <polygon points="280,71 292,67 292,75" fill="#38BDF8" />

            {/* Laser energy arc cutting under the polyp */}
            {cutProgress > 0.1 && cutProgress < 0.9 && (
              <circle
                cx="292"
                cy="71"
                r={9 * beamPulse}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
              />
            )}
          </g>

          {/* Separation Clean Cut Line */}
          {cutProgress > 0.3 && (
            <path
              d={`M 290 75 L ${290 + cutProgress * 120} 75`}
              stroke="#34D399"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          )}

          {/* Success Callout Badge when cut finishes */}
          {cutProgress >= 0.8 && (
            <g transform="translate(480, 40)">
              <rect x="0" y="0" width="200" height="34" rx="8" fill="rgba(16, 185, 129, 0.9)" />
              <text x="100" y="22" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">
                ✓ ĐÃ BÓC TÁCH TRIỆT ĐỂ
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 4: ĐỘT PHÁ ĐIỀU TRỊ & MÔ PHỎNG NỘI SOI ESD (910 -> 1179 frames)
// ============================================================================
export const Scene4Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 16, stiffness: 120 },
  });

  const sp1 = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 130 } });
  const sp2 = spring({ frame: frame - 35, fps, config: { damping: 16, stiffness: 130 } });

  const countBaoTon = countUp(frame, 15, 45, 100);
  const countHoiPhuc = countUp(frame, 20, 35, 24);
  const countKhoangCach = (interpolate(frame, [40, 75], [0.5, 2.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        paddingLeft: 48,
        paddingRight: 48,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          backgroundColor: "rgba(16, 185, 129, 0.18)",
          border: "1px solid rgba(16, 185, 129, 0.5)",
          borderRadius: 100,
          padding: "8px 24px",
          marginBottom: 16,
        }}
      >
        <span style={{ color: "#34D399", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
          ĐỘT PHÁ ĐIỀU TRỊ
        </span>
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 950,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        PHÁT HIỆN SỚM: ĐỔI MỚI CỤC DIỆN
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: "#38BDF8",
          textAlign: "center",
          maxWidth: 860,
          marginBottom: 20,
        }}
      >
        Can thiệp khi tổn thương còn nông ➔ Tránh hoàn toàn cuộc mổ mở lớn
      </div>

      {/* Feature #3: Animated Endoscopy ESD Simulation Diagram */}
      <div style={{ width: "100%", maxWidth: 920, marginBottom: 20 }}>
        <EndoscopyESDMicroAnimation />
      </div>

      {/* 2 Medical Tech Specs Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          width: "100%",
          maxWidth: 920,
        }}
      >
        {/* Card 1: ESD Tech Stats */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: 22,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: sp1,
            transform: `translateX(${interpolate(sp1, [0, 1], [-40, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 900, color: "#34D399" }}>
            NỘI SOI ESD
          </span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 38, fontWeight: 950, color: "#10B981", fontFamily: "monospace" }}>
              {countBaoTon}%
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Bảo tồn ruột</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 38, fontWeight: 950, color: "#38BDF8", fontFamily: "monospace" }}>
              {countHoiPhuc}H
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Xuất viện</span>
          </div>
        </div>

        {/* Card 2: Da Vinci Robot */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: "2px solid rgba(56, 189, 248, 0.6)",
            borderRadius: 22,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: sp2,
            transform: `translateX(${interpolate(sp2, [0, 1], [40, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 900, color: "#38BDF8" }}>
            ROBOT DA VINCI XI
          </span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 38, fontWeight: 950, color: "#38BDF8", fontFamily: "monospace" }}>
              {countKhoangCach} CM
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Cách rìa hậu môn</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 32, fontWeight: 950, color: "#34D399", fontFamily: "monospace" }}>
              TRIỆT CĂN
            </span>
            <span style={{ fontSize: 16, color: "#E2E8F0" }}>Giữ chất lượng sống</span>
          </div>
        </div>
      </div>
    </div>
  );
};
```
