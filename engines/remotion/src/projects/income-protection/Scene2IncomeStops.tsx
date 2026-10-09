import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FONT, MoneyIcon, SceneCanvas} from "./shared";

export const Scene2IncomeStops: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const drain = interpolate(frame, [fps * 2.5, fps * 3.9], [100, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <SceneCanvas label="DÒNG TIỀN">
    <div style={{position: "absolute", top: 285, left: 82, right: 82, color: COLORS.navy, fontFamily: FONT, fontSize: 77, fontWeight: 800, lineHeight: 1.05}}>Ngày mai, dòng tiền chính tạm dừng.</div>
    <div style={{position: "absolute", top: 645, left: 82, right: 82, height: 220, borderRadius: 42, backgroundColor: "#ffffff", boxShadow: "0 25px 65px rgba(8,39,63,0.12)", display: "flex", alignItems: "center", padding: "0 46px", gap: 30, translate: `${interpolate(frame, [fps * 0.2, fps * 1.2], [-460, 0], {extrapolateRight: "clamp"})}px 0`}}><MoneyIcon /><div><div style={{fontFamily: FONT, color: COLORS.muted, fontSize: 31, fontWeight: 700, letterSpacing: 1}}>THU NHẬP CHÍNH</div><div style={{fontFamily: FONT, color: COLORS.navy, fontSize: 57, fontWeight: 800, marginTop: 12}}>Đang vận hành</div></div></div>
    <div style={{position: "absolute", top: 930, left: 82, right: 82}}><div style={{display: "flex", justifyContent: "space-between", marginBottom: 22, fontFamily: FONT, color: COLORS.muted, fontSize: 30, fontWeight: 700}}><span>TRẠNG THÁI DÒNG TIỀN</span><span style={{color: drain > 8 ? COLORS.green : COLORS.coral}}>{Math.round(drain)}%</span></div><div style={{height: 42, borderRadius: 24, backgroundColor: "#DDE7E1", overflow: "hidden"}}><div style={{width: `${drain}%`, height: "100%", borderRadius: 24, backgroundColor: drain > 8 ? COLORS.green : COLORS.coral}} /></div></div>
    <div style={{position: "absolute", top: 1100, left: 82, right: 82, padding: 36, borderRadius: 30, backgroundColor: drain < 8 ? "#FDECEA" : COLORS.mint, opacity: interpolate(frame, [fps * 2.8, fps * 3.4], [0, 1], {extrapolateRight: "clamp"})}}><div style={{fontFamily: FONT, fontWeight: 800, color: drain < 8 ? COLORS.coral : COLORS.green, fontSize: 42}}>{drain < 8 ? "THU NHẬP: TẠM DỪNG" : "DÒNG TIỀN ĐANG CHẠY"}</div></div>
    <Caption>Điều quan trọng là chuẩn bị cho khoảng trống dòng tiền, không phải chờ nó xuất hiện.</Caption>
  </SceneCanvas>;
};
