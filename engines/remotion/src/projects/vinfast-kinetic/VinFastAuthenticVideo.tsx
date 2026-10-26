import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const VinFastAuthenticVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const [fontHandle] = useState(() => delayRender("Wait for assets"));
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => continueRender(fontHandle))
        .catch(() => continueRender(fontHandle));
    } else {
      continueRender(fontHandle);
    }
  }, [fontHandle]);

  // Scene breakdown accurately aligned to the 38.4s audio track at 30fps (1152 frames total)
  const scenes = [
    { start: 0, end: 36, img: "image2.jpg", name: "Intro Cánh chim V Chrome 3D" },
    { start: 36, end: 90, img: "image3.jpg", name: "Count-in Staccato VF 3" },
    { start: 90, end: 144, img: "image4.jpg", name: "Count-in Staccato VF 9" },
    { start: 144, end: 165, img: "image5.jpg", name: "Slam Wordmark VINFAST" },
    { start: 165, end: 270, img: "image6.jpg", name: "Build-up VF 3 Phố đông luồn lách" },
    { start: 270, end: 378, img: "image7.jpg", name: "Build-up VF 7 Phi cơ cất cánh" },
    { start: 378, end: 420, img: "image8.jpg", name: "Bật nguồn khởi động" },
    { start: 420, end: 465, img: "image9.jpg", name: "Cắm súng sạc 100%" },
    { start: 465, end: 504, img: "image10.jpg", name: "Xe vút êm bứt tốc đồng hồ quét" },
    { start: 504, end: 534, img: "image11.jpg", name: "Nhịp bứt phá 1-2-3 bùng nổ" },
    { start: 534, end: 624, img: "image12.jpg", name: "Đội hình 6 xe hội tụ 2 hàng" },
    { start: 624, end: 675, img: "image13.jpg", name: "VF 8 Vững chãi đường dài" },
    { start: 675, end: 735, img: "image14.jpg", name: "Lướt êm ru không khói bụi" },
    { start: 735, end: 786, img: "image15.jpg", name: "Bật chế độ xanh lan tỏa sóng ngọc" },
    { start: 786, end: 837, img: "image16.jpg", name: "VinFast dẫn đầu - VF 8 trắng bứt tốc" },
    { start: 837, end: 876, img: "image17.jpg", name: "Go Green hiệu ứng sóng nước" },
    { start: 876, end: 894, img: "image19.jpg", name: "Đóng dấu STOP viền đỏ dứt khoát" },
    { start: 894, end: 1152, img: "image20.jpg", name: "End Card showroom hoàn chỉnh đối xứng 6 xe" },
  ];

  // Find active scene
  const activeScene = scenes.find((s) => frame >= s.start && frame < s.end) || scenes[scenes.length - 1];
  const localFrame = frame - activeScene.start;
  const sceneDuration = activeScene.end - activeScene.start;

  // Kinetic camera zoom & punch
  const scale = interpolate(localFrame, [0, 6, sceneDuration], [1.08, 1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  // Staccato chromatic flash at scene start
  const flashOpacity = interpolate(localFrame, [0, 3], [0.35, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      {/* Master 1920x1080 Real High-Res Asset Frame */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(`assets/vinfast/${activeScene.img}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Kinetic Flash on Beat */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#1464F4",
            opacity: flashOpacity,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
