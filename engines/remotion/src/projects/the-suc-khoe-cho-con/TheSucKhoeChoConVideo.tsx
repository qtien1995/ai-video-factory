import React from "react";
import { AbsoluteFill, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MOBILE_LAYOUT, StandardHeader } from "../../shared/design-system";
import {
  MedicalBackdrop,
  KidsHealthCard,
  TwoMetricGauges,
  SplitCardComparison,
  HospitalPortal,
  RealBillAndFactors,
  ThreeTierPodium,
  PerfectFitTakeaway,
  SyncedCaptions,
} from "./Scenes";

import timingData from "../../../public/audio/the-suc-khoe-cho-con/timing.json";

export const TheSucKhoeChoConVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Master Timing: 1725 frames (57.48s at 30fps)
  // S1 (Hook): 0 - 216 (0.00s - 7.20s)
  // S2 (Tension): 216 - 405 (7.20s - 13.50s)
  // S3 (Reframe): 405 - 681 (13.50s - 22.70s)
  // S4 (Key Factors): 681 - 969 (22.70s - 32.30s)
  // S5 (Product Bridge): 969 - 1491 (32.30s - 49.70s)
  // S6 (Takeaway): 1491 - 1725 (49.70s - 57.48s)

  const isScene1 = frame < 216;
  const isScene2 = frame >= 216 && frame < 405;
  const isScene3 = frame >= 405 && frame < 681;
  const isScene4 = frame >= 681 && frame < 969;
  const isScene5 = frame >= 969 && frame < 1491;
  const isScene6 = frame >= 1491;

  // Scene 1 animations
  const scene1CardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const scene1GaugeProgress = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Scene 2 animations
  const scene2Frame = frame - 216;
  const scene2Progress = spring({
    frame: scene2Frame,
    fps,
    config: { damping: 13, stiffness: 110 },
  });
  const highlightPull = scene2Frame >= 60;

  // Scene 3 animations
  const scene3Frame = frame - 405;
  const scene3Progress = spring({
    frame: scene3Frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Scene 4 animations
  const scene4Frame = frame - 681;
  const scene4Progress = spring({
    frame: scene4Frame,
    fps,
    config: { damping: 14, stiffness: 115 },
  });

  // Scene 5 animations (3 Tiers step)
  const scene5Frame = frame - 969;
  let activeStep = 1;
  if (scene5Frame >= 160) activeStep = 2;
  if (scene5Frame >= 320) activeStep = 3;

  // Scene 6 animations
  const scene6Frame = frame - 1491;
  const scene6Progress = spring({
    frame: scene6Frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Dynamic Header Titles per beat
  let headerTitle = "MUA THẺ CHO CON";
  let headerSubtitle = "2 CÂU HỎI ĐẦU TIÊN CỦA BỐ MẸ";
  let headerColor = "#38bdf8";

  if (isScene2) {
    headerTitle = "250 TRIỆU VS 500 TRIỆU";
    headerSubtitle = "CỐ THÊM CHÚT CHO CHẮC?";
    headerColor = "#f59e0b";
  } else if (isScene3) {
    headerTitle = "KHI CON NẰM VIỆN...";
    headerSubtitle = "ĐIỀU TRỊ Ở BỆNH VIỆN NÀO?";
    headerColor = "#38bdf8";
  } else if (isScene4) {
    headerTitle = "3 CON SỐ THỰC TẾ";
    headerSubtitle = "TIỀN PHÒNG • ĐỒNG CHI TRẢ • NGOẠI TRÚ";
    headerColor = "#f43f5e";
  } else if (isScene5) {
    headerTitle = "BẠC • TITAN • VÀNG";
    headerSubtitle = "KHỚP ĐÚNG PHÂN KHÚC BỆNH VIỆN";
    headerColor = "#facc15";
  } else if (isScene6) {
    headerTitle = "CHỌN THẺ VỪA VẶN";
    headerSubtitle = "KHỚP NHU CẦU & BỆNH VIỆN CỦA CON";
    headerColor = "#10b981";
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 1. Global Backdrop */}
      <MedicalBackdrop />

      {/* 4. Top Header Bar (Fixed Zone) */}
      <StandardHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        accentColor={headerColor}
      />

      {/* 5. Central Dynamic Visual Stages */}
      {isScene1 && (
        <>
          <KidsHealthCard progress={scene1CardSpring} />
          <TwoMetricGauges progress={scene1GaugeProgress} />
        </>
      )}

      {isScene2 && (
        <SplitCardComparison progress={scene2Progress} highlightPull={highlightPull} />
      )}

      {isScene3 && (
        <HospitalPortal progress={scene3Progress} />
      )}

      {isScene4 && (
        <RealBillAndFactors progress={scene4Progress} />
      )}

      {isScene5 && (
        <ThreeTierPodium activeStep={activeStep} />
      )}

      {isScene6 && (
        <PerfectFitTakeaway progress={scene6Progress} />
      )}

      {/* 6. Synced Karaoke Captions Bar ("Đọc đến đâu chạy đến đó, không đọc thì không hiện sub") */}
      <SyncedCaptions timingWords={timingData.words} />
    </AbsoluteFill>
  );
};
