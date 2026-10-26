import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, useCurrentFrame } from "remotion";
import {
  GlobalBackdrop,
  HeaderBar,
  Scene1Hook,
  Scene2VinBreakdown,
  Scene3RiskMatrix,
  Scene4Scenarios,
  Scene5ActionPlan,
  Scene6Outro,
  SyncedCaptions
} from "./Scenes";

export const VnIndexBullTrapVideo: React.FC = () => {
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
  const isScene1 = frame < 242;
  const isScene2 = frame >= 242 && frame < 568;
  const isScene3 = frame >= 568 && frame < 899;
  const isScene4 = frame >= 899 && frame < 1319;
  const isScene5 = frame >= 1319 && frame < 1671;
  const isScene6 = frame >= 1671;

  // Header dynamic configuration
  let badge = "CẢNH BÁO TỌA ĐỘ";
  let title = "VN-INDEX: 1,738.67 ĐIỂM BÙNG NỔ";
  let badgeColor = "#10b981";
  let badgeBg = "rgba(16, 185, 129, 0.15)";
  let theme: "gold" | "red" | "green" | "purple" | "blue" = "green";

  if (isScene2) {
    badge = "BÓC TÁCH SỰ THẬT";
    title = "BỘ 3 HỌ VIN GÁNH ~18 ĐIỂM";
    badgeColor = "#c084fc";
    badgeBg = "rgba(192, 132, 252, 0.15)";
    theme = "purple";
  } else if (isScene3) {
    badge = "TỌA ĐỘ RỦI RO";
    title = "3 ÁP LỰC ĐÈ NẶNG CHỈ SỐ";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "red";
  } else if (isScene4) {
    badge = "ĐỊNH LƯỢNG KỊCH BẢN";
    title = "55% CƠ SỞ VS 20% BẪY GÃY";
    badgeColor = "#d4af37";
    badgeBg = "rgba(212, 175, 55, 0.15)";
    theme = "gold";
  } else if (isScene5) {
    badge = "KẾ HOẠCH HÀNH ĐỘNG";
    title = "QUẢN TRỊ VỐN THEO VỊ THẾ";
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
      {/* Background with Ambient Glow */}
      <GlobalBackdrop theme={theme} />

      {/* Header bar (Scenes 1 - 5) */}
      {!isScene6 && <HeaderBar badge={badge} title={title} badgeColor={badgeColor} badgeBg={badgeBg} />}

      {/* Scene Renderers */}
      {isScene1 && <Scene1Hook />}
      {isScene2 && <Scene2VinBreakdown />}
      {isScene3 && <Scene3RiskMatrix />}
      {isScene4 && <Scene4Scenarios />}
      {isScene5 && <Scene5ActionPlan />}
      {isScene6 && <Scene6Outro />}

      {/* Speech-Synced Captions (Always mounted on top) */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
