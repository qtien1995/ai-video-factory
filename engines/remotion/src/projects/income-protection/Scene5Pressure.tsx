import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FONT, SceneCanvas} from "./shared";

export const Scene5Pressure: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const level = interpolate(frame, [fps * 0.3, fps * 5.3], [0.18, 0.91], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <SceneCanvas label="ÁP LỰC">
    <div style={{position: "absolute", top: 280, left: 82, right: 82, color: COLORS.navy, fontFamily: FONT, fontSize: 76, fontWeight: 800, lineHeight: 1.04}}>Áp lực tăng lên theo từng khoản cần thanh toán.</div>
    <div style={{position: "absolute", top: 690, left: 132, right: 132, height: 445, borderRadius: 52, backgroundColor: "#FFFFFF", boxShadow: "0 25px 60px rgba(8,39,63,0.11)", padding: 48}}><div style={{fontFamily: FONT, color: COLORS.muted, fontSize: 28, fontWeight: 800, letterSpacing: 2}}>MÔ PHỎNG ÁP LỰC</div><div style={{position: "absolute", bottom: 62, left: 48, right: 48, height: 195, borderRadius: 28, backgroundColor: "#F2F4F1", overflow: "hidden", display: "flex", alignItems: "flex-end"}}><div style={{height: `${level * 100}%`, width: "100%", borderRadius: 28, background: `linear-gradient(180deg, ${COLORS.lime}, ${COLORS.green} 55%, ${COLORS.coral})`}} /></div><div style={{position: "absolute", right: 48, bottom: 285, fontFamily: FONT, color: COLORS.navy, fontSize: 43, fontWeight: 800}}>TĂNG DẦN</div></div>
    <div style={{position: "absolute", top: 1230, left: 82, right: 82, display: "flex", gap: 16, alignItems: "center"}}><div style={{width: 18, height: 18, borderRadius: "50%", backgroundColor: COLORS.coral}} /><div style={{fontFamily: FONT, color: COLORS.muted, fontSize: 34, fontWeight: 650}}>Không cần hoảng sợ — chỉ cần nhìn thấy sớm.</div></div>
    <Caption>Rà soát sớm giúp bạn có thêm lựa chọn, thay vì chỉ xoay xở.</Caption>
  </SceneCanvas>;
};
