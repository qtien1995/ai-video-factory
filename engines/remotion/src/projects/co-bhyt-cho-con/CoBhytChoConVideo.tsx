import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { MOBILE_LAYOUT, StandardHeader, StandardLowerCard } from "../../shared/design-system";
import {
  BhytCard,
  FamilyBackdrop,
  FamilyCashflowSystem,
  HeroQuestionCard,
  HospitalInvoice,
  SevenDayBadge,
  SyncedCaptions,
  ThreeLayersFoundation,
} from "./Scenes";

// Timing data
import timingData from "../../../public/audio/co-bhyt-cho-con/timing.json";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const CoBhytChoConVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Master Timing (measured from timing.json & narration.mp3)
  // Total frames: 1723 (~57.41s)
  // B001 (Hook): 0 - 195 (0.00s - 6.50s)
  // B002 (Reframe): 195 - 495 (6.50s - 16.50s)
  // B003 (Hidden Gap): 495 - 915 (16.50s - 30.50s)
  // B004 (3 Layers): 915 - 1485 (30.50s - 49.50s)
  // B005 (Hero Close): 1485 - 1723 (49.50s - 57.41s)

  // 1. Scene Interpolations
  const isScene1 = frame < 195;
  const isScene2 = frame >= 195 && frame < 495;
  const isScene3 = frame >= 495 && frame < 915;
  const isScene4 = frame >= 915 && frame < 1485;
  const isScene5 = frame >= 1485;

  // Scene 1 animations
  const scene1CardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const scene1BadgeProgress = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Scene 2 animations (Invoice & Stamp)
  const scene2Frame = frame - 195;
  const stampProgress = spring({
    frame: Math.max(0, scene2Frame - 45),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Scene 3 animations (Valve constriction)
  const scene3Frame = frame - 495;
  const valveClosed = scene3Frame >= 90;

  // Scene 4 animations (3 Foundation layers snap-in)
  const scene4Frame = frame - 915;
  let layerProgress = 0;
  if (scene4Frame >= 0) layerProgress = 1;
  if (scene4Frame >= 150) layerProgress = 2;
  if (scene4Frame >= 330) layerProgress = 3;

  // Scene 5 animations (Hero Question pop-in)
  const scene5Frame = frame - 1485;
  const heroProgress = spring({
    frame: scene5Frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Dynamic Header Titles per beat
  let headerTitle = "CON CÓ BHYT RỒI";
  let headerSubtitle = "NẰM VIỆN 7 NGÀY, CẦN THÊM BAO NHIÊU TIỀN?";
  let headerColor = "#38bdf8";

  if (isScene2) {
    headerTitle = "BHYT ĐÃ CHI TRẢ";
    headerSubtitle = "PHẦN LỚN CHI PHÍ TRONG DANH MỤC";
    headerColor = "#10b981";
  } else if (isScene3) {
    headerTitle = "VIỆN PHÍ CHỈ LÀ 1 DÒNG";
    headerSubtitle = "BỐ MẸ NGHỈ LÀM + CHI PHÍ PHÁT SINH";
    headerColor = "#f59e0b";
  } else if (isScene4) {
    headerTitle = "3 LỚP TIỀN — 3 NHIỆM VỤ";
    headerSubtitle = "BHYT • QUỸ DỰ PHÒNG • BẢO HIỂM BỔ SUNG";
    headerColor = "#38bdf8";
  } else if (isScene5) {
    headerTitle = "BẢO VỆ DÒNG TIỀN GIA ĐÌNH";
    headerSubtitle = "CHỦ ĐỘNG TRƯỚC MỌI TÌNH HUỐNG SỨC KHỎE";
    headerColor = "#facc15";
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* 1. Global Ambient Audio Bed */}
      <Audio
        src={staticFile("audio/ambient-bed.wav")}
        volume={(f) =>
          interpolate(f, [0, 45, 1680, 1723], [0, 0.08, 0.08, 0], clamp)
        }
      />

      {/* 2. Main Narration Voiceover */}
      <Audio
        src={staticFile("audio/co-bhyt-cho-con/narration.mp3")}
        volume={1}
      />

      {/* 3. Backdrop */}
      <FamilyBackdrop />

      {/* 4. Upper Header Zone */}
      <StandardHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        subColor={headerColor}
      />

      {/* 5. Center Dynamic Content per Scene */}
      {isScene1 && (
        <>
          <SevenDayBadge progress={scene1BadgeProgress} />
          <BhytCard progress={scene1CardSpring} scale={scene1CardSpring} />
          <StandardLowerCard
            title="ĐIỂM TỰA AN SINH QUAN TRỌNG"
            description="BHYT chi trả viện phí rất tốt, nhưng khi con nằm viện 7 ngày, bài toán tài chính của gia đình còn nhiều chi phí khác."
            accentColor="#10b981"
          />
        </>
      )}

      {isScene2 && (
        <>
          <HospitalInvoice stampProgress={stampProgress} />
          <StandardLowerCard
            title="GIÁ TRỊ THỰC TẾ CỦA BHYT"
            description="BHYT gánh vác phần lớn chi phí điều trị trong danh mục. Tuy nhiên, viện phí mới chỉ là một nửa câu chuyện."
            accentColor="#10b981"
          />
        </>
      )}

      {isScene3 && (
        <>
          <FamilyCashflowSystem zoomProgress={1} valveClosed={valveClosed} />
          <StandardLowerCard
            title="KHOẢNG TRỐNG DÒNG TIỀN"
            description="Khi bố mẹ phải nghỉ làm chăm con, thu nhập bị ngắt quãng trong khi sinh hoạt phí và chi phí ngoài viện vẫn chạy đều."
            accentColor="#ef4444"
          />
        </>
      )}

      {isScene4 && (
        <>
          <div
            style={{
              position: "absolute",
              top: MOBILE_LAYOUT.centerAnchorY - 380,
              left: "50%",
              transform: "translateX(-50%)",
              width: 320,
              height: 260,
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
              border: "4px solid #38bdf8",
              borderRadius: 32,
              boxShadow: "0 20px 60px rgba(56, 189, 248, 0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 90 }}>🏠</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#f8fafc", marginTop: 8 }}>
              GIA ĐÌNH BÌNH YÊN
            </div>
          </div>
          <ThreeLayersFoundation layerProgress={layerProgress} />
        </>
      )}

      {isScene5 && (
        <>
          <HeroQuestionCard progress={heroProgress} />
          <ThreeLayersFoundation layerProgress={3} activeCirculation />
        </>
      )}

      {/* 6. Synced Captions (Karaoke highlight) */}
      <SyncedCaptions timingWords={timingData.words} />
    </AbsoluteFill>
  );
};
