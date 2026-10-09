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

export const BhytChiPhiChimVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Master Timing: 1932 frames (64.368s at 30fps)
  // Scene 1: 0 - 318 (0.00s - 10.60s)
  // Scene 2: 318 - 580 (10.60s - 19.35s)
  // Scene 3: 580 - 1026 (19.35s - 34.20s)
  // Scene 4: 1026 - 1371 (34.20s - 45.70s)
  // Scene 5: 1371 - 1719 (45.70s - 57.30s)
  // Scene 6: 1719 - 1932 (57.30s - 64.37s)

  const isScene1 = frame < 318;
  const isScene2 = frame >= 318 && frame < 580;
  const isScene3 = frame >= 580 && frame < 1026;
  const isScene4 = frame >= 1026 && frame < 1371;
  const isScene5 = frame >= 1371 && frame < 1719;
  const isScene6 = frame >= 1719;

  // Header dynamic configuration
  let badge = "ĐIỀU KIỆN 5 NĂM";
  let title = "15 TRIỆU BHYT LÀ ĐỦ XONG?";
  let badgeColor = "#38bdf8";
  let badgeBg = "rgba(56, 189, 248, 0.15)";
  let theme: "dark" | "hospital" | "warning" | "emerald" = "dark";
  let fileRef = "DOC #VN-BHYT-ART22";

  if (isScene2) {
    badge = "XÁC NHẬN AN SINH";
    title = "BHYT LÀ MÓNG NHÀ VỮNG CHẮC";
    badgeColor = "#10b981";
    badgeBg = "rgba(16, 185, 129, 0.15)";
    theme = "emerald";
    fileRef = "DOC #AN-SINH-2026";
  } else if (isScene3) {
    badge = "ĐIỀU KHOẢN LOẠI TRỪ";
    title = "THUỐC ĐÍCH NGOÀI DANH MỤC";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "hospital";
    fileRef = "DOC #LOAI-TRU-BHYT";
  } else if (isScene4) {
    badge = "ĐỨT GÃY DÒNG TIỀN";
    title = "AI TRẢ TIỀN LƯƠNG CHO BẠN?";
    badgeColor = "#f59e0b";
    badgeBg = "rgba(245, 158, 11, 0.15)";
    theme = "warning";
    fileRef = "DOC #CASHFLOW-GAP";
  } else if (isScene5) {
    badge = "CẤU TRÚC PHÒNG VỆ";
    title = "HỆ THỐNG PHÒNG THỦ 3 LỚP";
    badgeColor = "#38bdf8";
    badgeBg = "rgba(56, 189, 248, 0.15)";
    theme = "emerald";
    fileRef = "DOC #3-TIER-DEFENSE";
  } else if (isScene6) {
    badge = "KẾT LUẬN KIỂM TOÁN";
    title = "ĐỪNG CHẠY TRẦN VỚI MỖI BHYT";
    badgeColor = "#ef4444";
    badgeBg = "rgba(239, 68, 68, 0.15)";
    theme = "warning";
    fileRef = "DOC #FINAL-SUMMARY";
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Audio narration (also muxed in final post-process) */}
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

      {/* Synced Word-By-Word Subtitles */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
