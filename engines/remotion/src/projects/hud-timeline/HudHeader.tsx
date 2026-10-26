import React from "react";
import { useCurrentFrame } from "remotion";

interface HudHeaderProps {
  eyebrow: string;
  counter: string;
  title: string;
  subtitle: string;
  extraIcon?: "skills" | "design" | "animate" | "build2d" | "build3d" | "sound" | "none";
}

export const HudHeader: React.FC<HudHeaderProps> = ({
  eyebrow,
  counter,
  title,
  subtitle,
  extraIcon = "none",
}) => {
  const frame = useCurrentFrame();

  return (
    <div className="w-full px-12 pt-20 pb-4 relative z-10 flex flex-col justify-start">
      {/* Top Eyebrow Row */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-mono text-[26px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
            {eyebrow}
          </span>
        </div>
        <span className="font-mono text-[34px] font-extrabold text-orange-500 tracking-wider">
          {counter}
        </span>
      </div>

      {/* Main Title Row with Visual Graphic Icon */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-[76px] font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
            {title}
          </h1>
          <p className="text-[28px] text-slate-400 font-medium mt-2">
            {subtitle}
          </p>
        </div>

        {/* Section Visual Graphic */}
        {extraIcon === "animate" && (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full bg-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.8)]"
              style={{
                transform: `translateY(${Math.sin(frame * 0.2) * 12}px) scale(${1 + Math.sin(frame * 0.2) * 0.08})`,
              }}
            />
          </div>
        )}

        {extraIcon === "build3d" && (
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Isometric wireframe cube rotated via SVG */}
            <svg
              className="w-20 h-20"
              viewBox="0 0 100 100"
              style={{
                transform: `rotate(${frame * 1.5}deg)`,
              }}
            >
              <polygon
                points="50,15 85,35 85,75 50,95 15,75 15,35"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              <line x1="50" y1="15" x2="50" y2="55" stroke="#f97316" strokeWidth="2.5" />
              <line x1="15" y1="35" x2="50" y2="55" stroke="#38bdf8" strokeWidth="2" />
              <line x1="85" y1="35" x2="50" y2="55" stroke="#38bdf8" strokeWidth="2" />
              <line x1="50" y1="55" x2="50" y2="95" stroke="#f97316" strokeWidth="2.5" />
            </svg>
          </div>
        )}

        {extraIcon === "sound" && (
          <div className="flex items-center gap-1.5 h-16 px-2">
            {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3].map((heightMul, i) => {
              const h = 18 + Math.abs(Math.sin((frame + i * 15) * 0.15)) * 42 * heightMul;
              return (
                <div
                  key={i}
                  className="w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                  style={{ height: `${h}px` }}
                />
              );
            })}
          </div>
        )}

        {extraIcon === "build2d" && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-10 rounded border-2 border-sky-400/80 bg-sky-950/40" />
            <div className="w-10 h-12 rounded border-2 border-sky-400 bg-sky-500/20 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />
            <div className="w-8 h-10 rounded border-2 border-sky-400/60 bg-sky-950/30" />
          </div>
        )}

        {extraIcon === "design" && (
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-14 h-14" viewBox="0 0 40 40" fill="none">
              <path
                d="M 5 35 Q 20 5 35 25"
                stroke="#38bdf8"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="5" cy="35" r="3.5" fill="#f97316" />
              <circle cx="20" cy="15" r="3" fill="#38bdf8" />
              <circle cx="35" cy="25" r="3.5" fill="#f97316" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
