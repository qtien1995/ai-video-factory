import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, CheckIcon, COLORS, FONT, SceneCanvas} from "./shared";
const checks = ["Chi phí tối thiểu mỗi tháng", "Quỹ dự phòng hiện có", "Phương án bảo vệ thu nhập"];

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneCanvas dark label="BẮT ĐẦU HÔM NAY">
    <div style={{position: "absolute", top: 275, left: 82, right: 82, color: COLORS.cream, fontFamily: FONT, fontSize: 76, fontWeight: 800, lineHeight: 1.05}}>Tối nay, thử rà soát 3 điều này.</div>
    <div style={{position: "absolute", top: 610, left: 82, right: 82, display: "flex", flexDirection: "column", gap: 24}}>{checks.map((check, index) => {const delay = fps * (0.35 + index * 0.42); return <div key={check} style={{minHeight: 126, padding: "25px 30px", display: "flex", alignItems: "center", gap: 24, borderRadius: 26, backgroundColor: "#FFFFFF12", border: "1px solid #FFFFFF2A", opacity: interpolate(frame, [delay, delay + 10], [0, 1], {extrapolateRight: "clamp"}), translate: `${interpolate(frame, [delay, delay + 12], [-50, 0], {extrapolateRight: "clamp"})}px 0`}}><CheckIcon /><div style={{fontFamily: FONT, color: COLORS.cream, fontSize: 37, fontWeight: 650, lineHeight: 1.14}}>{check}</div></div>;})}</div>
    <div style={{position: "absolute", top: 1195, left: 82, right: 82, padding: "30px 34px", borderRadius: 24, backgroundColor: COLORS.lime, color: COLORS.navy, fontFamily: FONT, fontSize: 39, fontWeight: 800, textAlign: "center", opacity: interpolate(frame, [fps * 2.2, fps * 2.8], [0, 1], {extrapolateRight: "clamp"})}}>Một kế hoạch rõ ràng tạo ra sự chủ động.</div>
    <Caption dark>Đây là nội dung giáo dục tài chính — hãy chọn phương án phù hợp hoàn cảnh của gia đình bạn.</Caption>
  </SceneCanvas>;
};
