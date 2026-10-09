import React from "react";
import { AbsoluteFill, Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { StandardHeader } from "../../shared/design-system";
import {
  OfficeMedicalBackdrop,
  HospitalTapScene,
  UmbrellaBorrowScene,
  PreExistingTensionScene,
  ExclusionConsequenceScene,
  TwoTierShieldStrategyScene,
  TakeawayCloseScene,
  SyncedCaptions,
} from "./Scenes";

import timingData from "../../../public/audio/bhsk-congty-du-muon/timing.json";

export const BhskCongTyDuMuonVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Total Duration: 2631 frames (87.672s at 30fps)
  // S1 (Hook): 0 - 306 (0.00s - 10.20s)
  // S2 (Reality): 306 - 780 (10.20s - 26.00s)
  // S3 (Tension): 780 - 1374 (26.00s - 45.80s)
  // S4 (Consequence): 1374 - 1818 (45.80s - 60.60s)
  // S5 (Strategy): 1818 - 2301 (60.60s - 76.70s)
  // S6 (Takeaway): 2301 - 2631 (76.70s - 87.67s)

  const isScene1 = frame < 306;
  const isScene2 = frame >= 306 && frame < 780;
  const isScene3 = frame >= 780 && frame < 1374;
  const isScene4 = frame >= 1374 && frame < 1818;
  const isScene5 = frame >= 1818 && frame < 2301;
  const isScene6 = frame >= 2301;

  // Scene entrance spring animations
  const scene1Progress = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const scene2Progress = spring({ frame: Math.max(0, frame - 306), fps, config: { damping: 14, stiffness: 110 } });
  const scene3Progress = spring({ frame: Math.max(0, frame - 780), fps, config: { damping: 14, stiffness: 110 } });
  const scene4Progress = spring({ frame: Math.max(0, frame - 1374), fps, config: { damping: 14, stiffness: 110 } });
  const scene5Progress = spring({ frame: Math.max(0, frame - 1818), fps, config: { damping: 14, stiffness: 110 } });
  const scene6Progress = spring({ frame: Math.max(0, frame - 2301), fps, config: { damping: 14, stiffness: 110 } });

  // Mobile Header configuration per scene
  let headerTitle = "ĐI VIỆN TƯ 0 ĐỒNG?";
  let headerSubtitle = "CHIẾC THẺ NÀY THỰC SỰ CỦA AI?";
  let headerColor = "#38bdf8";

  if (isScene2) {
    headerTitle = "17:00 NGHỈ VIỆC ➔ 17:01 HẾT BẢO VỆ";
    headerSubtitle = "CHIẾC DÙ MƯỢN CỦA DOANH NGHIỆP";
    headerColor = "#f59e0b";
  } else if (isScene3) {
    headerTitle = "CÀY CUỐC ➔ TÍCH LŨY BỆNH ÁN";
    headerSubtitle = "HỒ SƠ BỆNH CÓ SẴN ĐI THEO BẠN";
    headerColor = "#f43f5e";
  } else if (isScene4) {
    headerTitle = "LOẠI TRỪ VĨNH VIỄN";
    headerSubtitle = "55 TUỔI NGHỈ HƯU: TỰ MÓC TIỀN TÚI";
    headerColor = "#dc2626";
  } else if (isScene5) {
    headerTitle = "CHIẾN LƯỢC KẸP 2 THẺ";
    headerSubtitle = "TUYẾN ĐẦU KHÁM VẶT • LÕI BẢO VỆ 75 TUỔI";
    headerColor = "#10b981";
  } else if (isScene6) {
    headerTitle = "SỨC KHỎE LÀ CỦA BẠN";
    headerSubtitle = "ĐỪNG ĐỂ TRÊN BẢNG CHẤM CÔNG NGƯỜI KHÁC";
    headerColor = "#38bdf8";
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Background audio narration */}
      <Audio src={staticFile("audio/bhsk-congty-du-muon/narration.mp3")} />

      {/* Global Background */}
      <OfficeMedicalBackdrop />

      {/* Standardized Header */}
      <StandardHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        subColor={headerColor}
      />

      {/* Active Scene Content */}
      {isScene1 && <HospitalTapScene progress={scene1Progress} />}
      {isScene2 && <UmbrellaBorrowScene progress={scene2Progress} />}
      {isScene3 && <PreExistingTensionScene progress={scene3Progress} />}
      {isScene4 && <ExclusionConsequenceScene progress={scene4Progress} />}
      {isScene5 && <TwoTierShieldStrategyScene progress={scene5Progress} />}
      {isScene6 && <TakeawayCloseScene progress={scene6Progress} />}

      {/* Word-by-Word Captions */}
      <SyncedCaptions />
    </AbsoluteFill>
  );
};
