import React from "react";
import {
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { HudBackground } from "./HudBackground";
import { HudHeader } from "./HudHeader";
import { TimelineScrubber } from "./TimelineScrubber";
import { HudCard } from "./HudCard";
import { HudBottomTracks } from "./HudBottomTracks";

export const HudTimelineVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div className="w-[1080px] h-[1920px] bg-[#080c10] text-white flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background Cyber Grid */}
      <HudBackground />

      {/* =========================================================================
          SCENE 0: HOOK / INTRO (0s - 5s, frames 0 - 150)
      ========================================================================= */}
      <Sequence durationInFrames={150}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="00 · OPUS 5.5"
            counter="00/20"
            title="20 repo để Opus 5.5"
            subtitle="tự dựng video từ A đến Z"
          />
          <TimelineScrubber startFrame={0} durationFrames={150} />

          <div className="px-12 flex-1 flex flex-col justify-center items-center">
            <div className="w-full p-8 rounded-3xl bg-slate-900/60 border border-sky-500/20 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-orange-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h2 className="text-[44px] font-extrabold text-white mb-3">
                Full-Stack Video Pipeline
              </h2>
              <p className="text-[26px] text-slate-400 font-mono">
                Code React • SVG • Canvas • 3D • FFmpeg
              </p>
            </div>
          </div>

          <HudBottomTracks activeLayerIndex={-1} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 1: SKILLS (5s - 13s, frames 150 - 240)
      ========================================================================= */}
      <Sequence from={150} durationInFrames={240}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="01 · SKILLS"
            counter="03/20"
            title="Nạp skill"
            subtitle="Để Opus 5.5 biết cách dựng video"
            extraIcon="skills"
          />
          <TimelineScrubber startFrame={0} durationFrames={240} />

          <div className="px-12 flex-1 flex flex-col justify-start pt-4">
            <HudCard
              id="01"
              name="Remotion Skills"
              desc="Dạy Claude viết video Remotion chuẩn"
              delayFrames={10}
            />
            <HudCard
              id="02"
              name="Motion AI Kit"
              desc="Giúp AI dùng thư viện Motion đúng"
              delayFrames={40}
            />
            <HudCard
              id="03"
              name="GSAP Skills"
              desc="Skill để AI viết animation GSAP"
              delayFrames={70}
            />
          </div>

          <HudBottomTracks activeLayerIndex={0} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 2: DESIGN (13s - 20s, frames 390 - 210)
      ========================================================================= */}
      <Sequence from={390} durationInFrames={210}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="02 · DESIGN"
            counter="05/20"
            title="Thiết kế"
            subtitle="SVG sạch, tiêu đề từ JSX"
            extraIcon="design"
          />
          <TimelineScrubber startFrame={0} durationFrames={210} />

          <div className="px-12 flex-1 flex flex-col justify-start pt-4">
            <HudCard
              id="04"
              name="SVGO"
              desc="Nén, tối ưu file SVG"
              delayFrames={10}
            />
            <HudCard
              id="05"
              name="Satori"
              desc="Biến HTML và JSX thành SVG"
              delayFrames={40}
            />
          </div>

          <HudBottomTracks activeLayerIndex={1} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 3: ANIMATE (20s - 31s, frames 600 - 330)
      ========================================================================= */}
      <Sequence from={600} durationInFrames={330}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="03 · ANIMATE"
            counter="10/20"
            title="Hoạt ảnh"
            subtitle="Năm thư viện, mỗi thứ một việc"
            extraIcon="animate"
          />
          <TimelineScrubber startFrame={0} durationFrames={330} />

          <div className="px-12 flex-1 flex flex-col justify-start pt-2">
            <HudCard
              id="06"
              name="GSAP"
              desc="Timeline animation mạnh, mượt"
              delayFrames={10}
            />
            <HudCard
              id="07"
              name="Anime.js"
              desc="Animation JavaScript nhẹ, linh hoạt"
              delayFrames={35}
            />
            <HudCard
              id="08"
              name="Motion"
              desc="Animation cho React và JavaScript"
              delayFrames={60}
            />
            <HudCard
              id="09"
              name="Rive"
              desc="Animation tương tác có state machine"
              delayFrames={85}
            />
            <HudCard
              id="10"
              name="Lottie"
              desc="Phát animation xuất từ After Effects"
              delayFrames={110}
            />
          </div>

          <HudBottomTracks activeLayerIndex={2} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 4: BUILD 2D (31s - 40s, frames 930 - 270)
      ========================================================================= */}
      <Sequence from={930} durationInFrames={270}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="04 · BUILD 2D"
            counter="12/20"
            title="Dựng 2D"
            subtitle={`Code React thành từng khung hình  frame 0${Math.floor(
              interpolate(frame - 930, [0, 270], [71, 360])
            )}`}
            extraIcon="build2d"
          />
          <TimelineScrubber startFrame={0} durationFrames={270} />

          <div className="px-12 flex-1 flex flex-col justify-start pt-4">
            <HudCard
              id="11"
              name="Remotion"
              desc="Dựng video bằng React, xuất MP4"
              delayFrames={10}
            />
            <HudCard
              id="12"
              name="Motion Canvas"
              desc="Animation bằng TypeScript, hợp video giải thích"
              delayFrames={40}
            />

            {/* Code Terminal Box */}
            <div className="w-full mt-3 rounded-2xl bg-black/60 border border-slate-700/60 p-5 font-mono text-[22px] text-sky-300">
              <div className="text-slate-500 text-[18px] mb-2 font-sans font-semibold">
                src/Root.tsx
              </div>
              <p className="text-slate-300 font-mono">
                {"<"}
                <span className="text-sky-400 font-bold">Composition</span>
                {" fps={"}
                <span className="text-orange-400 font-bold">60</span>
                {"} width={"}
                <span className="text-orange-400 font-bold">1080</span>
                {"} height={"}
                <span className="text-orange-400 font-bold">1920</span>
                {"} />"}
              </p>
            </div>
          </div>

          <HudBottomTracks activeLayerIndex={3} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 5: BUILD 3D (40s - 49s, frames 1200 - 270)
      ========================================================================= */}
      <Sequence from={1200} durationInFrames={270}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="05 · BUILD 3D"
            counter="17/20"
            title="Dựng 3D"
            subtitle="Khối, ánh sáng, vật lý, hiệu ứng"
            extraIcon="build3d"
          />
          <TimelineScrubber startFrame={0} durationFrames={270} />

          <div className="px-12 flex-1 flex flex-col justify-start pt-2">
            <HudCard
              id="13"
              name="three.js"
              desc="Đồ họa 3D ngay trên web"
              delayFrames={10}
            />
            <HudCard
              id="14"
              name="React Three Fiber"
              desc="Viết three.js bằng React"
              delayFrames={35}
            />
            <HudCard
              id="15"
              name="Drei"
              desc="Bộ helper dựng sẵn cho R3F"
              delayFrames={60}
            />
            <HudCard
              id="16"
              name="Rapier"
              desc="Vật lý: rơi, va chạm"
              delayFrames={85}
            />
            <HudCard
              id="17"
              name="Postprocessing"
              desc="Bloom, depth of field, hiệu ứng ảnh"
              delayFrames={110}
            />
          </div>

          <HudBottomTracks activeLayerIndex={4} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 6: SOUND & RENDER (49s - 54s, frames 1470 - 150)
      ========================================================================= */}
      <Sequence from={1470} durationInFrames={150}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="06 · SOUND · RENDER"
            counter="20/20"
            title="Âm thanh"
            subtitle="Nhạc nền, encode, xuất MP4"
            extraIcon="sound"
          />
          <TimelineScrubber startFrame={0} durationFrames={150} />

          <div className="px-12 flex-1 flex flex-col justify-start pt-4">
            <HudCard
              id="18"
              name="Howler.js"
              desc="Phát nhạc nền và hiệu ứng âm thanh"
              delayFrames={10}
            />
            <HudCard
              id="19"
              name="Mediabunny"
              desc="Encode video ngay trong trình duyệt"
              delayFrames={35}
            />
            <HudCard
              id="20"
              name="FFmpeg"
              desc="Ghép, chuyển đổi, xuất video"
              delayFrames={60}
            />

            {/* Live Render Progress Box */}
            <div className="w-full mt-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[28px] text-white">Xuất video</span>
                <span className="font-mono text-[28px] font-bold text-orange-400">100%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-3">
                <div className="h-full bg-sky-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)] w-full" />
              </div>
              <p className="font-mono text-[22px] text-slate-400">
                ✓ 1080×1920 • sẵn sàng đăng
              </p>
            </div>
          </div>

          <HudBottomTracks activeLayerIndex={5} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 7: SUMMARY / TOÀN BỘ TIMELINE (54s - 57s, frames 1620 - 90)
      ========================================================================= */}
      <Sequence from={1620} durationInFrames={90}>
        <div className="flex-1 flex flex-col justify-between h-full relative z-10">
          <HudHeader
            eyebrow="TOÀN BỘ TIMELINE"
            counter="20/20"
            title="Đủ 20/20"
            subtitle="Opus 5.5 ghép tất cả thành một video"
          />
          <TimelineScrubber startFrame={0} durationFrames={90} />

          <div className="px-12 flex-1 flex flex-col justify-center">
            {/* Bento Grid Summary */}
            <div className="w-full p-6 rounded-3xl bg-slate-950/70 border border-sky-500/30 backdrop-blur-md grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-mono text-orange-400 text-sm font-bold">01 · SKILLS</div>
                <div className="text-xl font-bold text-white mt-1">RS • MAK • GS</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-mono text-sky-400 text-sm font-bold">02 · DESIGN</div>
                <div className="text-xl font-bold text-white mt-1">SVGO • Satori</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-mono text-orange-400 text-sm font-bold">03 · ANIMATE</div>
                <div className="text-xl font-bold text-white mt-1">GSAP • Anime • Motion • Rive • Lottie</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-mono text-sky-400 text-sm font-bold">04 · BUILD 2D</div>
                <div className="text-xl font-bold text-white mt-1">Remotion • Motion Canvas</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-mono text-orange-400 text-sm font-bold">05 · BUILD 3D</div>
                <div className="text-xl font-bold text-white mt-1">three.js • R3F • Drei • Rapier • PP</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="font-mono text-sky-400 text-sm font-bold">06 · SOUND & RENDER</div>
                <div className="text-xl font-bold text-white mt-1">Howler • Mediabunny • FFmpeg</div>
              </div>
            </div>
          </div>

          <HudBottomTracks activeLayerIndex={5} />
        </div>
      </Sequence>

      {/* =========================================================================
          SCENE 8: OUTRO CTA (57s - 60s, frames 1710 - 92)
      ========================================================================= */}
      <Sequence from={1710} durationInFrames={92}>
        <div className="flex-1 flex flex-col justify-center items-center h-full relative z-10 px-12 text-center">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-orange-500 to-sky-400 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(249,115,22,0.6)]">
            <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h1 className="text-[100px] font-black text-white tracking-tight mb-4 drop-shadow-lg">
            Lưu lại
          </h1>
          <p className="text-[34px] text-slate-300 font-semibold mb-12">
            Bạn muốn Opus 5.5 dựng video gì?
          </p>

          {/* Glowing Animated Wave Bar */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-3 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                style={{
                  height: `${14 + Math.sin((frame + i * 10) * 0.2) * 24}px`,
                }}
              />
            ))}
          </div>
        </div>
      </Sequence>
    </div>
  );
};
