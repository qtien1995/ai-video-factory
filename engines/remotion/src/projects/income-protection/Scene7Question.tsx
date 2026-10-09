import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {Caption, COLORS, FamilyMark, FONT, SceneCanvas} from "./shared";

export const Scene7Question: React.FC = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneCanvas label="KHOẢNG LẶNG">
    <div style={{position: "absolute", top: 290, left: 82, right: 82, color: COLORS.muted, fontFamily: FONT, fontSize: 34, fontWeight: 800, letterSpacing: 2}}>NẾU ĐIỀU ĐÓ XẢY RA...</div><div style={{position: "absolute", top: 420, left: 82, right: 82, color: COLORS.navy, fontFamily: FONT, fontSize: 91, fontWeight: 800, lineHeight: 1.02}}>Gia đình mình sẽ sống bằng gì?</div>
    <div style={{position: "absolute", top: 980, left: 82, right: 82, borderRadius: 46, padding: 50, backgroundColor: COLORS.mint, opacity: interpolate(frame, [fps * 1.2, fps * 2.1], [0, 1], {extrapolateRight: "clamp"})}}><div style={{fontFamily: FONT, fontSize: 32, color: COLORS.green, fontWeight: 800, letterSpacing: 2}}>MỘT CÂU HỎI ĐÁNG NGHĨ</div><div style={{fontFamily: FONT, fontSize: 55, color: COLORS.navy, fontWeight: 750, lineHeight: 1.14, marginTop: 18}}>Không cần trả lời ngay.<br />Nhưng nên có một câu trả lời.</div></div>
    <div style={{position: "absolute", right: 75, top: 1300, opacity: 0.21, scale: interpolate(frame, [0, fps * 4.5], [0.82, 1.08], {extrapolateRight: "clamp"})}}><FamilyMark size={1.35} color={COLORS.green} /></div>
    <Caption>Đôi khi, bước đầu tiên chỉ là ngồi xuống và tính lại.</Caption>
  </SceneCanvas>;
};
