import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import {
  GlobalBackdrop,
  HeaderBar,
  Scene1Hook,
  Scene2Setup,
  Scene3Tension1,
  Scene4Tension2,
  Scene5Solution,
  Scene6Outro,
  SyncedCaptions,
} from "./Scenes";

export const DieuKhoanLoaiTruVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Master Timing: 1756 frames (58.512s at 30fps)
  // Scene 1: 0 - 340 (0.00s - 11.31s)
  // Scene 2: 340 - 605 (11.31s - 20.14s)
  // Scene 3: 605 - 1093 (20.14s - 36.40s)
  // Scene 4: 1093 - 1450 (36.40s - 48.28s)
  // Scene 5: 1450 - 1653 (48.28s - 55.02s)
  // Scene 6: 1653 - 1756 (55.02s - 58.51s)

  const isScene1 = frame < 340;
  const isScene2 = frame >= 340 && frame < 605;
  const isScene3 = frame >= 605 && frame < 1093;
  const isScene4 = frame >= 1093 && frame < 1450;
  const isScene5 = frame >= 1450 && frame < 1653;
  const isScene6 = frame >= 1653;

  // Header dynamic configuration
  let badge = "NỖI ĐAU KHÁCH HÀNG";
  let title = "VÌ SAO BỊ TỪ CHỐI VIỆN PHÍ?";
  let badgeColor = "#ef4444";
  let badgeBg = "rgba(239, 68, 68, 0.15)";
  let theme: "dark" | "alert" | "mint" | "amber" = "dark";
  let fileRef = "DOC #EXCLUSION-HOOK";

  if (isScene2) {
    badge = "BẢN CHẤT QUỸ BẢO HIỂM";
    title = "LOẠI TRÙ ĐỂ GIỮ PHÍ RẺ";
    badgeColor = "#10b981";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "mint";
    fileRef = "DOC #CORE-LOGIC";
  } else if (isScene3) {
    badge = "NHÓM 1 RỦI RO CAO NHẤT";
    title = "BỆNH CÓ SẴN & MỐC CHỜ";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "amber";
    fileRef = "DOC #WAITING-PERIOD";
  } else if (isScene4) {
    badge = "NHÓM 2 & 3: TỰ CHI TRẢ";
    title = "DANH MỤC LOẠI TRỪ TUYỆT ĐỐI";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "alert";
    fileRef = "DOC #HARD-EXCLUSIONS";
  } else if (isScene5) {
    badge = "GIẢI PHÁP PHÒNG NGỪA";
    title = "3 NGUYÊN TẮC BỒI THƯỜNG 100%";
    badgeColor = "#fbbf24";
    badgeBg = "rgba(251, 191, 36, 0.15)";
    theme = "amber";
    fileRef = "DOC #3-GOLDEN-KEYS";
  } else if (isScene6) {
    badge = "KẾT LUẬN & HÀNH ĐỘNG";
    title = "RÀ SOÁT LẠI HỢP ĐỒNG NGAY";
    badgeColor = "#10b981";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "mint";
    fileRef = "DOC #FINAL-ADVICE";
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Audio narration */}
      <Audio src={staticFile("assets/audio/narration.mp3")} />

      {/* Dynamic Background */}
      <GlobalBackdrop theme={theme} />

      {/* Pinned Mobile Top Header */}
      <HeaderBar
        badge={badge}
        title={title}
        badgeColor={badgeColor}
        badgeBg={badgeBg}
        fileRef={fileRef}
      />

      {/* Visual Scenes */}
      {isScene1 && <Scene1Hook />}
      {isScene2 && <Scene2Setup />}
      {isScene3 && <Scene3Tension1 />}
      {isScene4 && <Scene4Tension2 />}
      {isScene5 && <Scene5Solution />}
      {isScene6 && <Scene6Outro />}

      {/* Speech-Synced Subtitles */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
