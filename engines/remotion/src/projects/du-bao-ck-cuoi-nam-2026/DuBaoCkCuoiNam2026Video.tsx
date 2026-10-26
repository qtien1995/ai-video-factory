import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame } from "remotion";
import {
  GlobalBackdrop,
  HeaderBar,
  Scene1Hook,
  Scene2Coordinates,
  Scene3BaseCase,
  Scene4Comparison,
  Scene5ActionMatrix,
  Scene6Outro,
  SyncedCaptions
} from "./Scenes";

export const DuBaoCkCuoiNam2026Video: React.FC = () => {
  const frame = useCurrentFrame();

  // Font loading barrier: Ensure Chromium never captures frame before local fonts are ready
  const [fontHandle] = useState(() => delayRender("Wait for Vietnamese fonts"));
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => continueRender(fontHandle))
        .catch(() => continueRender(fontHandle));
    } else {
      continueRender(fontHandle);
    }
  }, [fontHandle]);

  // Frame timing boundaries
  const isScene1 = frame < 234;
  const isScene2 = frame >= 234 && frame < 489;
  const isScene3 = frame >= 489 && frame < 885;
  const isScene4 = frame >= 885 && frame < 1344;
  const isScene5 = frame >= 1344 && frame < 1731;
  const isScene6 = frame >= 1731;

  // Header dynamic configuration
  let badge = "CẢNH BÁO VĨ MÔ";
  let title = "VN-INDEX: 1,691 ĐIỂM QUÁ BÁN";
  let badgeColor = "#ef4444";
  let badgeBg = "rgba(239, 68, 68, 0.15)";
  let theme: "gold" | "red" | "green" | "blue" = "red";

  if (isScene2) {
    badge = "TỌA ĐỘ THỰC TẾ";
    title = "3 CHỈ BÁO VĨ MÔ KIỂM SOÁT";
    badgeColor = "#38bdf8";
    badgeBg = "rgba(56, 189, 248, 0.15)";
    theme = "blue";
  } else if (isScene3) {
    badge = "KỊCH BẢN CƠ SỞ (65%)";
    title = "TẠO ĐÁY 1,680 & SÓNG TẾT 1,830Đ";
    badgeColor = "#d4af37";
    badgeBg = "rgba(212, 175, 55, 0.15)";
    theme = "gold";
  } else if (isScene4) {
    badge = "SO SÁNH 2 NHÁNH";
    title = "BÙNG NỔ 20% VS THẬN TRỌNG 15%";
    badgeColor = "#10b981";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "green";
  } else if (isScene5) {
    badge = "HÀNH ĐỘNG DỨT KHOÁT";
    title = "3 BẬC QUẢN TRỊ TỶ TRỌNG VỐN";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "gold";
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0e14",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Voiceover Audio from CIT Voice Studio (Hải Đăng 48kHz) */}
      <Audio src={staticFile("audio/du-bao-ck-cuoi-nam-2026/narration.mp3")} />

      {/* Global Backdrop with dynamic ambient lighting */}
      <GlobalBackdrop theme={theme} />

      {/* Dynamic Header Bar (Scenes 1-5) */}
      {!isScene6 && (
        <HeaderBar badge={badge} title={title} badgeColor={badgeColor} badgeBg={badgeBg} />
      )}

      {/* 6 Visual Scenes */}
      {isScene1 && <Scene1Hook />}
      {isScene2 && <Scene2Coordinates />}
      {isScene3 && <Scene3BaseCase />}
      {isScene4 && <Scene4Comparison />}
      {isScene5 && <Scene5ActionMatrix />}
      {isScene6 && <Scene6Outro />}

      {/* Speech-Synced Subtitles */}
      {!isScene6 && <SyncedCaptions />}
    </AbsoluteFill>
  );
};
