import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import {
  GlobalBackdrop,
  HeaderBar,
  Scene1Queues,
  Scene2Hospital,
  Scene3Doctor,
  Scene4Bill,
  Scene5Dilemma,
  Scene6Comparison,
  Scene7PeaceOfMind,
  SyncedCaptions,
} from "./Scenes";

export const HangChoThuocNgoaiVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Master Timing: 2428 frames (80.904s at 30fps)
  // Scene 1: 0 - 367 (0.00s - 12.23s)
  // Scene 2: 367 - 609 (12.23s - 20.31s)
  // Scene 3: 609 - 990 (20.31s - 32.99s)
  // Scene 4: 990 - 1460 (32.99s - 48.64s)
  // Scene 5: 1460 - 1854 (48.64s - 61.77s)
  // Scene 6: 1854 - 2140 (61.77s - 71.30s)
  // Scene 7: 2140 - 2428 (71.30s - 80.90s)

  const isScene1 = frame < 367;
  const isScene2 = frame >= 367 && frame < 609;
  const isScene3 = frame >= 609 && frame < 990;
  const isScene4 = frame >= 990 && frame < 1460;
  const isScene5 = frame >= 1460 && frame < 1854;
  const isScene6 = frame >= 1854 && frame < 2140;
  const isScene7 = frame >= 2140;

  // Header content per scene
  let badge = "GÓC NHÌN XÃ HỘI";
  let title = "NHỮNG HÀNG CHỜ CUỘC ĐỜI";
  let badgeColor = "#f59e0b";
  let badgeBg = "rgba(245, 158, 11, 0.15)";
  let theme: "dark" | "hospital" | "gold" | "warm" = "gold";

  if (isScene2) {
    badge = "LỜI CẢNH TỈNH";
    title = "HÀNG CHỜ KHÔNG BAO GIỜ DỨT";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "hospital";
  } else if (isScene3) {
    badge = "TÌNH HUỐNG THỰC TẾ";
    title = "CÂU HỎI TRONG PHÒNG KHÁM";
    badgeColor = "#38bdf8";
    badgeBg = "rgba(56, 189, 248, 0.15)";
    theme = "hospital";
  } else if (isScene4) {
    badge = "SỰ THẬT TÀI CHÍNH";
    title = "LẰN RANH: THUỐC NGOÀI DANH MỤC";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "dark";
  } else if (isScene5) {
    badge = "NỖI ĐAU CỦA CHA MẸ";
    title = "SỨC KHỎE CỦA CON HAY CHIẾC VÍ?";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "dark";
  } else if (isScene6) {
    badge = "SO SÁNH BẢN CHẤT";
    title = "QUYỀN CHỮA BỆNH VS QUYỀN LỰA CHỌN";
    badgeColor = "#34d399";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "warm";
  } else if (isScene7) {
    badge = "AN TÂM TRỌN VẸN";
    title = "ĐỂ CHA MẸ LUÔN THANH THẢN";
    badgeColor = "#10b981";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "warm";
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Real Narration Audio */}
      <Audio src={staticFile("assets/audio/narration.mp3")} />

      {/* Dynamic Background */}
      <GlobalBackdrop theme={theme} />

      {/* Pinned Standard Mobile Header */}
      <HeaderBar badge={badge} title={title} badgeColor={badgeColor} badgeBg={badgeBg} />

      {/* Visual Scenes */}
      {isScene1 && <Scene1Queues />}
      {isScene2 && <Scene2Hospital />}
      {isScene3 && <Scene3Doctor />}
      {isScene4 && <Scene4Bill />}
      {isScene5 && <Scene5Dilemma />}
      {isScene6 && <Scene6Comparison />}
      {isScene7 && <Scene7PeaceOfMind />}

      {/* Word-by-word Synchronized Captions */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
