import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FONT, SceneCanvas} from "./shared";

export const Scene4Timeline: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const progress = interpolate(frame, [fps * 0.45, fps * 6.9], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <SceneCanvas dark label="6 THÁNG">
    <div style={{position: "absolute", top: 276, left: 82, right: 82, color: COLORS.cream, fontFamily: FONT, fontSize: 74, fontWeight: 800, lineHeight: 1.04}}>Tháng một có thể còn xoay xở.</div><div style={{position: "absolute", top: 486, left: 82, right: 82, color: "#BBD1D8", fontFamily: FONT, fontSize: 47, fontWeight: 600, lineHeight: 1.2}}>Nhưng áp lực thường không dừng ở tháng một.</div>
    <div style={{position: "absolute", top: 770, left: 128, right: 128}}><div style={{height: 16, backgroundColor: "#335A67", borderRadius: 20}}><div style={{height: "100%", width: `${progress * 100}%`, backgroundColor: COLORS.lime, borderRadius: 20}} /></div><div style={{display: "flex", justifyContent: "space-between", marginTop: 30}}>{[1,2,3,4,5,6].map((month,index) => {const active = progress >= index / 5; return <div key={month} style={{width: 95, height: 95, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 36, fontWeight: 800, backgroundColor: active ? COLORS.lime : "#244B5A", color: active ? COLORS.navy : "#A9C1C7", scale: active ? 1 : 0.86}}>T{month}</div>;})}</div></div>
    <div style={{position: "absolute", top: 1080, left: 82, right: 82, padding: 46, borderRadius: 40, backgroundColor: "#FFFFFF10", border: "1px solid #FFFFFF30"}}><div style={{fontFamily: FONT, color: COLORS.lime, fontSize: 28, letterSpacing: 2, fontWeight: 800}}>KHOẢNG TRỐNG DÒNG TIỀN</div><div style={{fontFamily: FONT, color: COLORS.cream, fontSize: 69, fontWeight: 800, lineHeight: 1.06, marginTop: 20}}>Càng kéo dài,<br />càng cần phương án.</div></div>
    <Caption dark>Hãy hình dung việc này theo tháng, không chỉ theo một ngày bất ngờ.</Caption>
  </SceneCanvas>;
};
