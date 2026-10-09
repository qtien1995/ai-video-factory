import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FamilyMark, FONT, SceneCanvas} from "./shared";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneCanvas dark label="BÀI TEST NHỎ">
    <div style={{position: "absolute", top: 270, left: 82, right: 82, color: COLORS.cream, fontFamily: FONT, fontSize: 66, fontWeight: 700, lineHeight: 1.08}}>Nếu thu nhập chính dừng lại...</div>
    <div style={{position: "absolute", top: 505, left: 70, right: 70, display: "flex", alignItems: "center", justifyContent: "center", scale: interpolate(frame, [0, fps * 0.8], [0.78, 1], {extrapolateRight: "clamp"})}}><div style={{fontFamily: FONT, color: COLORS.lime, fontSize: 306, fontWeight: 800, letterSpacing: -16, lineHeight: 0.9}}>6</div><div style={{fontFamily: FONT, color: COLORS.cream, fontSize: 82, fontWeight: 700, lineHeight: 0.92, marginLeft: 26}}>THÁNG</div></div>
    <div style={{position: "absolute", top: 905, left: 82, right: 82, color: "#B8D1DA", fontFamily: FONT, fontSize: 54, fontWeight: 600, lineHeight: 1.17}}>Gia đình bạn trụ được đến tháng thứ mấy?</div>
    <div style={{position: "absolute", top: 1240, right: 88, opacity: interpolate(frame, [fps, fps * 2], [0, 1], {extrapolateRight: "clamp"})}}><FamilyMark size={1.13} color={COLORS.green} /></div>
    <Caption dark>Đây là một tình huống giả định để tự rà soát kế hoạch tài chính gia đình.</Caption>
  </SceneCanvas>;
};
