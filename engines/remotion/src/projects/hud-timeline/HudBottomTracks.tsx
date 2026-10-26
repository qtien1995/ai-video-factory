import React from "react";

interface HudBottomTracksProps {
  activeLayerIndex: number;
}

const TRACKS = [
  { name: "SKILLS", blocks: 3 },
  { name: "DESIGN", blocks: 2 },
  { name: "ANIMATE", blocks: 5 },
  { name: "BUILD 2D", blocks: 2 },
  { name: "BUILD 3D", blocks: 5 },
  { name: "SOUND · RENDER", blocks: 3 },
];

export const HudBottomTracks: React.FC<HudBottomTracksProps> = ({
  activeLayerIndex,
}) => {
  return (
    <div className="w-full px-12 pb-16 pt-6 relative z-10 flex flex-col justify-end">
      <div className="w-full flex items-start gap-8 border-t border-slate-800/80 pt-6">
        {/* Track Names Column */}
        <div className="flex flex-col gap-2.5 w-[200px] shrink-0 font-mono text-[18px] tracking-wider font-semibold">
          {TRACKS.map((track, i) => {
            const isActive = i === activeLayerIndex;
            const isCompleted = i < activeLayerIndex;

            return (
              <span
                key={track.name}
                className={`transition-colors h-[22px] flex items-center ${
                  isActive
                    ? "text-orange-400 font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                    : isCompleted
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              >
                {track.name}
              </span>
            );
          })}
        </div>

        {/* Timeline Track Blocks Column */}
        <div className="flex flex-col gap-2.5 flex-1">
          {TRACKS.map((track, i) => {
            const isActive = i === activeLayerIndex;
            const isCompleted = i < activeLayerIndex;

            return (
              <div key={track.name} className="flex items-center gap-2 h-[22px]">
                {Array.from({ length: 5 }).map((_, blockIdx) => {
                  const hasBlock = blockIdx < track.blocks;
                  if (!hasBlock) {
                    return null;
                  }

                  const isFilled = isCompleted || (isActive && blockIdx <= 4);

                  return (
                    <div
                      key={blockIdx}
                      className={`h-[18px] rounded transition-all ${
                        isFilled
                          ? "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] border border-sky-300"
                          : "bg-slate-900/40 border border-slate-800"
                      }`}
                      style={{
                        width: blockIdx === 0 && track.blocks === 2 ? "110px" : "80px",
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
