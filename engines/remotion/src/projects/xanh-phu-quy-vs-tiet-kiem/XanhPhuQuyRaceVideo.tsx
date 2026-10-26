import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame
} from "remotion";
import { TIMELINE_DATA } from "./data";
import { FixedHeader, RaceLineChart } from "./ChartComponents";
import { LeaderboardTable } from "./LeaderboardTable";
import { OutroCard } from "./OutroCard";

export const XanhPhuQuyRaceVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Ensure Chromium waits until fonts load before rendering frames
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

  // TIMELINE SEGMENTS (Total 1711 frames = 57.03s at 30fps)
  // 1. Race Chart Stage: 0 to 1120 frames (0.0s - 37.3s)
  // 2. Leaderboard Table Stage: 1100 to 1520 frames (36.6s - 50.6s)
  // 3. Outro Card Stage: 1500 to 1711 frames (50.0s - 57.03s)

  // Chart progress from 0 to 1 across frames 0 to 1060
  const chartProgress = interpolate(frame, [0, 1060], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Fade out chart when transitioning to Leaderboard
  const chartOpacity = interpolate(frame, [1080, 1120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Leaderboard entrance & exit
  const leaderboardOpacity = interpolate(frame, [1100, 1130, 1490, 1520], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Outro entrance
  const outroOpacity = interpolate(frame, [1500, 1530], [0, 1], {
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
      {/* 0. Studio Voiceover Audio Track */}
      <Audio src={staticFile("audio/xanh-phu-quy-vs-tiet-kiem/narration.mp3")} />

      {/* 1. RACE CHART & FIXED HEADER SCENE */}
      {frame < 1125 && (
        <div style={{ opacity: chartOpacity }}>
          <FixedHeader
            eyebrow="TÀI CHÍNH THỰC CHIẾN · SO SÁNH 30 TRIỆU/NĂM"
            title="Đường đua tích lũy 20 năm"
            subtitle="Xanh Phú Quý Flex vs Gửi tiết kiệm ngân hàng"
          />
          <RaceLineChart progress={chartProgress} timeline={TIMELINE_DATA} />
        </div>
      )}

      {/* 2. SUMMARY LEADERBOARD TABLE */}
      {frame >= 1100 && frame < 1525 && (
        <LeaderboardTable opacity={leaderboardOpacity} />
      )}

      {/* 3. OUTRO BRANDING CARD */}
      {frame >= 1500 && (
        <OutroCard opacity={outroOpacity} />
      )}
    </AbsoluteFill>
  );
};
