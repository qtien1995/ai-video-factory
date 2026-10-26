import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface HudCardProps {
  id: string;
  name: string;
  desc: string;
  delayFrames?: number;
}

export const HudCard: React.FC<HudCardProps> = ({
  id,
  name,
  desc,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: {
      damping: 16,
      stiffness: 140,
      mass: 0.8,
    },
  });

  if (frame < delayFrames) {
    return null;
  }

  const translateY = (1 - progress) * 35;
  const opacity = Math.min(1, Math.max(0, progress));

  return (
    <div
      className="w-full relative rounded-2xl p-5 mb-3.5 border transition-all overflow-hidden"
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        backgroundColor: "rgba(12, 22, 38, 0.75)",
        borderColor: "rgba(56, 189, 248, 0.25)",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Subtle top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

      <div className="flex items-center justify-between w-full">
        <div>
          <h3 className="text-[34px] font-bold text-white tracking-tight leading-none mb-2">
            {name}
          </h3>
          <p className="text-[22px] text-sky-200/80 font-normal leading-tight">
            {desc}
          </p>
        </div>

        {/* Monospace Badge #xx */}
        <div className="flex items-center justify-center px-3 py-1 rounded-md bg-slate-900/60 border border-slate-700/50">
          <span className="font-mono text-[22px] font-bold text-slate-400">
            #{id}
          </span>
        </div>
      </div>
    </div>
  );
};
