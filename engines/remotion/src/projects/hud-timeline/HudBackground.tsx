import React from "react";

export const HudBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#080c10] overflow-hidden pointer-events-none">
      {/* Subtle Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Cross markers at grid intersections */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="crosses" width="144" height="144" patternUnits="userSpaceOnUse">
            <path d="M -6 0 L 6 0 M 0 -6 L 0 6" stroke="#38bdf8" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crosses)" />
      </svg>

      {/* Soft Radial Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-20 blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(249, 115, 22, 0.15) 50%, transparent 80%)",
        }}
      />
    </div>
  );
};
