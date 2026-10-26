import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface TimelineScrubberProps {
  startFrame?: number;
  durationFrames?: number;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  startFrame = 0,
  durationFrames = 150,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // Playhead moves horizontally from 0% to 100% across the ruler
  const playheadPercent = interpolate(
    relativeFrame,
    [0, durationFrames],
    [3, 97],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div className="w-full px-12 my-3 relative z-10">
      {/* Time tick labels */}
      <div className="flex justify-between font-mono text-[18px] text-slate-500 tracking-wider mb-1.5 px-1">
        <span>00:00</span>
        <span>00:05</span>
        <span>00:10</span>
        <span>00:15</span>
        <span>00:20</span>
      </div>

      {/* Ruler ticks container */}
      <div className="relative w-full h-8 flex items-center">
        {/* Horizontal baseline line */}
        <div className="w-full h-[1px] bg-slate-800" />

        {/* Vertical tick marks */}
        <div className="absolute inset-x-0 top-0 h-4 flex justify-between px-1">
          {Array.from({ length: 41 }).map((_, i) => (
            <div
              key={i}
              className={`w-[1px] ${
                i % 10 === 0
                  ? "h-4 bg-slate-500"
                  : i % 5 === 0
                  ? "h-2.5 bg-slate-600"
                  : "h-1.5 bg-slate-800"
              }`}
            />
          ))}
        </div>

        {/* Orange Playhead Scrubber needle */}
        <div
          className="absolute top-0 bottom-[-560px] pointer-events-none transition-transform z-20 flex flex-col items-center"
          style={{
            left: `${playheadPercent}%`,
          }}
        >
          {/* Orange top pin dot */}
          <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)] -translate-y-1" />
          {/* Glowing vertical needle line cutting through all cards */}
          <div className="w-[2px] flex-1 bg-gradient-to-b from-orange-500 via-orange-400 to-transparent opacity-80" />
        </div>
      </div>
    </div>
  );
};
