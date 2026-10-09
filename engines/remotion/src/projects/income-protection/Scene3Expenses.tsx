import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FONT, SceneCanvas} from "./shared";
const expenses = [["⌂", "Nhà ở"], ["▣", "Ăn uống"], ["✦", "Học phí"], ["ϟ", "Hóa đơn"]];

export const Scene3Expenses: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneCanvas label="CHI PHÍ">
    <div style={{position: "absolute", top: 272, left: 82, right: 82, color: COLORS.navy, fontFamily: FONT, fontSize: 78, fontWeight: 800, lineHeight: 1.03}}>Nhưng các khoản chi vẫn đến đúng hẹn.</div>
    <div style={{position: "absolute", top: 625, left: 82, right: 82, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28}}>{expenses.map(([icon, label], index) => {const delay = fps * (0.25 + index * 0.33); return <div key={label} style={{height: 220, borderRadius: 36, backgroundColor: "#ffffff", boxShadow: "0 18px 40px rgba(8,39,63,0.09)", padding: 30, opacity: interpolate(frame, [delay, delay + 12], [0, 1], {extrapolateRight: "clamp"}), translate: `0 ${interpolate(frame, [delay, delay + 15], [90, 0], {extrapolateRight: "clamp"})}px`}}><div style={{fontFamily: FONT, fontSize: 51, color: COLORS.green, fontWeight: 800}}>{icon}</div><div style={{fontFamily: FONT, fontSize: 38, color: COLORS.navy, fontWeight: 750, marginTop: 22}}>{label}</div></div>;})}</div>
    <div style={{position: "absolute", top: 1215, left: 82, right: 82, padding: "32px 34px", borderLeft: `9px solid ${COLORS.lime}`, backgroundColor: "#FFFFFFA8", color: COLORS.navy, fontFamily: FONT, fontSize: 43, fontWeight: 700, lineHeight: 1.25}}>Thu nhập có thể tạm dừng.<br />Chi phí thường không.</div>
    <Caption>Có những khoản không thể chỉ “để tháng sau tính”.</Caption>
  </SceneCanvas>;
};
