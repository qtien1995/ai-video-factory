import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, interpolate, useCurrentFrame } from "remotion";
import { TIMELINE_DATA } from "./data";
import { FixedHeader, RaceLineChart } from "./ChartComponents";
import { LeaderboardTable } from "./LeaderboardTable";
import { OutroCard } from "./OutroCard";

export const InvestmentRaceVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Ensure Chromium waits until all fonts are 100% loaded before rendering frames
  const [fontHandle] = useState(() => delayRender("Wait for Vietnamese fonts to load"));
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => continueRender(fontHandle))
        .catch(() => continueRender(fontHandle));
    } else {
      continueRender(fontHandle);
    }
  }, [fontHandle]);

  // TIMELINE SEGMENTS (Total 1350 frames = 45s at 30fps)
  // 1. Race Chart Stage: 0 to 900 frames (0.0s - 30.0s)
  // 2. Leaderboard Table Stage: 900 to 1200 frames (30.0s - 40.0s)
  // 3. Outro Card Stage: 1200 to 1350 frames (40.0s - 45.0s)

  // Chart progress from 0 to 1 across frames 0 to 860
  const chartProgress = interpolate(frame, [0, 860], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Fade out chart when transitioning to Leaderboard
  const chartOpacity = interpolate(frame, [880, 920], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Leaderboard entrance
  const leaderboardOpacity = interpolate(frame, [900, 930, 1180, 1200], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Outro entrance
  const outroOpacity = interpolate(frame, [1200, 1230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0e14",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        overflow: "hidden"
      }}
    >
      {/* 1. RACE CHART & FIXED HEADER SCENE */}
      {frame < 930 && (
        <div style={{ opacity: chartOpacity }}>
          <FixedHeader
            eyebrow="TÀI CHÍNH THỰC CHIẾN · 100 TRIỆU VN30"
            title="Mua ngày 02/01/2019, giữ tới nay"
            subtitle="Giữ nguyên, cổ tức mua thêm cổ phiếu"
          />
          <RaceLineChart progress={chartProgress} timeline={TIMELINE_DATA} />
        </div>
      )}

      {/* 2. SUMMARY LEADERBOARD TABLE */}
      {frame >= 900 && frame < 1210 && (
        <LeaderboardTable opacity={leaderboardOpacity} />
      )}

      {/* 3. OUTRO BRANDING CARD */}
      {frame >= 1200 && (
        <OutroCard opacity={outroOpacity} />
      )}
    </AbsoluteFill>
  );
};
