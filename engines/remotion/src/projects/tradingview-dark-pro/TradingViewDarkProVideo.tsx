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
} from "./TradingViewScenes";

export const TradingViewDarkProVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Font loading barrier
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
  let badge = "TRADINGVIEW PRO · VN-INDEX";
  let title = "1,738.67Đ: CHÂN SÓNG HAY BẪY BULL TRAP?";
  let badgeColor = "#00F5A0";
  let badgeBg = "rgba(0, 245, 160, 0.12)";
  let theme: "green" | "purple" | "red" | "gold" = "green";

  if (isScene2) {
    badge = "BÓC TÁCH ORDER FLOW";
    title = "BỘ 3 HỌ VIN GÁNH 17.8 ĐIỂM";
    badgeColor = "#c084fc";
    badgeBg = "rgba(192, 132, 252, 0.15)";
    theme = "purple";
  } else if (isScene3) {
    badge = "TỌA ĐỘ RỦI RO KỸ THUẬT";
    title = "10 PHIÊN PHÂN PHỐI & CẢN SMA200";
    badgeColor = "#f23645";
    badgeBg = "rgba(242, 54, 69, 0.15)";
    theme = "red";
  } else if (isScene4) {
    badge = "DỰ PHÓNG ĐỊNH LƯỢNG";
    title = "55% TÍCH LŨY VS 20% BẪY GÃY";
    badgeColor = "#d4af37";
    badgeBg = "rgba(212, 175, 55, 0.15)";
    theme = "gold";
  } else if (isScene5) {
    badge = "KẾ HOẠCH HÀNH ĐỘNG";
    title = "CHIẾN LƯỢC QUẢN TRỊ 2 VỊ THẾ";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "gold";
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080b11",
        fontFamily: "'Be Vietnam Pro', sans-serif",
        overflow: "hidden"
      }}
    >
      {/* Dark Coordinate Backdrop with Ambient Glow */}
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

      {/* Speech-Synced Captions */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
