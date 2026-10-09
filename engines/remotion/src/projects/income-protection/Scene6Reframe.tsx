import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FONT, SceneCanvas} from "./shared";

export const Scene6Reframe: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneCanvas dark label="ĐỔI CÂU HỎI">
    <div style={{position: "absolute", top: 345, left: 82, right: 82, color: "#AFC6D0", fontFamily: FONT, fontSize: 43, fontWeight: 700, letterSpacing: 1}}>CÂU HỎI KHÔNG PHẢI LÀ</div>
    <div style={{position: "absolute", top: 480, left: 82, right: 82, color: COLORS.cream, fontFamily: FONT, fontSize: 86, fontWeight: 800, lineHeight: 1.04, opacity: interpolate(frame, [4, 18], [0, 1], {extrapolateRight: "clamp"})}}>“Liệu có chuyện gì xảy ra không?”</div>
    <div style={{position: "absolute", top: 875, left: 82, right: 82, height: 3, backgroundColor: "#47707C", scale: interpolate(frame, [fps * 2.6, fps * 3.7], [0, 1], {extrapolateRight: "clamp"}), transformOrigin: "left"}} />
    <div style={{position: "absolute", top: 1000, left: 82, right: 82, color: COLORS.lime, fontFamily: FONT, fontSize: 42, fontWeight: 800, letterSpacing: 1.2}}>MÀ LÀ</div><div style={{position: "absolute", top: 1110, left: 82, right: 82, color: COLORS.cream, fontFamily: FONT, fontSize: 74, fontWeight: 800, lineHeight: 1.08}}>“Nếu có, mình đã chuẩn bị thế nào?”</div>
    <Caption dark>Bảo vệ thu nhập là một phần của kế hoạch tài chính, không phải nỗi sợ.</Caption>
  </SceneCanvas>;
};
