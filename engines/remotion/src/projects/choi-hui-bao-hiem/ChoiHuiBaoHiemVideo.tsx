import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import {
  GlobalBackdrop,
  HeaderBar,
  Scene1FiveQuestions,
  Scene2PiggyBank,
  Scene3RealityCheck,
  Scene4TwoProgressBars,
  Scene5ThreeColumnsYear2,
  Scene6EmotionalClosure,
  SyncedCaptions,
} from "./Scenes";

export const ChoiHuiBaoHiemVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Master Timing: 2469 frames (82.272s at 30fps)
  // Scene 1: 0 - 437 (0.00s - 14.55s)
  // Scene 2: 437 - 734 (14.55s - 24.45s)
  // Scene 3: 734 - 1101 (24.45s - 36.70s)
  // Scene 4: 1101 - 1525 (36.70s - 50.85s)
  // Scene 5: 1525 - 1922 (50.85s - 64.08s)
  // Scene 6: 1922 - 2469 (64.08s - 82.27s)

  const isScene1 = frame < 437;
  const isScene2 = frame >= 437 && frame < 734;
  const isScene3 = frame >= 734 && frame < 1101;
  const isScene4 = frame >= 1101 && frame < 1525;
  const isScene5 = frame >= 1525 && frame < 1922;
  const isScene6 = frame >= 1922;

  // Header dynamic configuration
  let badge = "BĂN KHOĂN KINH ĐIỂN";
  let title = "5 CÂU HỎI KIỂU CHƠI HỤI";
  let badgeColor = "#38bdf8";
  let badgeBg = "rgba(56, 189, 248, 0.15)";
  let theme: "dark" | "hospital" | "gold" | "warm" = "dark";

  if (isScene2) {
    badge = "MÔ HÌNH TRỰC GIÁC";
    title = "TÂM LÝ: 'CHƠI' BẢO HIỂM";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "gold";
  } else if (isScene3) {
    badge = "CÚ BẺ LÁI THỰC TẾ";
    title = "BẢO HIỂM KHÔNG ĐỂ LÀM GIÀU";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "hospital";
  } else if (isScene4) {
    badge = "ĐỐI LẬP HOÀN TOÀN CƠ CHẾ";
    title = "10 NĂM GOM GÓP VS KHÓA NGAY 2 TỶ";
    badgeColor = "#10b981";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "warm";
  } else if (isScene5) {
    badge = "BÀI TEST BIẾN CỐ NĂM THỨ 2";
    title = "RỦI RO GÕ CỬA: TIỀN ĐI VỀ ĐÂU?";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "hospital";
  } else if (isScene6) {
    badge = "TRÁCH NHIỆM NGƯỜI TRỤ CỘT";
    title = "AI SẼ MANG 2 TỶ VỀ CHO CON?";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "warm";
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Audio narration (also muxed in final post-process) */}
      <Audio src={staticFile("assets/audio/narration.mp3")} />

      {/* Dynamic Background */}
      <GlobalBackdrop theme={theme} />

      {/* Pinned Mobile Top Header */}
      <HeaderBar badge={badge} title={title} badgeColor={badgeColor} badgeBg={badgeBg} />

      {/* Visual Scenes */}
      {isScene1 && <Scene1FiveQuestions />}
      {isScene2 && <Scene2PiggyBank />}
      {isScene3 && <Scene3RealityCheck />}
      {isScene4 && <Scene4TwoProgressBars />}
      {isScene5 && <Scene5ThreeColumnsYear2 />}
      {isScene6 && <Scene6EmotionalClosure />}

      {/* Synced Word-By-Word Subtitles */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
