import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

export const COLORS = {navy: "#08273F", green: "#00A758", lime: "#C5E86C", cream: "#F5F7F2", mint: "#DDF3E7", ink: "#10242F", muted: "#6E7E86", coral: "#E86456"};
export const FONT = "Arial, Helvetica, sans-serif";

export const BrandLockup: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <div style={{position: "absolute", top: 94, left: 82, display: "flex", alignItems: "center", gap: 12, fontFamily: FONT, fontWeight: 800, fontSize: 27, letterSpacing: 0.6, color: dark ? COLORS.cream : COLORS.navy}}>
    <div style={{width: 10, height: 29, borderRadius: 8, backgroundColor: COLORS.green}} />
    MANULIFE
  </div>
);

export const SceneCanvas: React.FC<{children: React.ReactNode; dark?: boolean; label?: string}> = ({children, dark = false, label}) => (
  <AbsoluteFill style={{background: dark ? "radial-gradient(circle at 78% 10%, #1b5062 0, #08273F 45%, #061925 100%)" : "linear-gradient(145deg, #ffffff 0%, #F5F7F2 54%, #E4F3EB 100%)", overflow: "hidden"}}>
    <BrandLockup dark={dark} />
    {label ? <div style={{position: "absolute", top: 100, right: 82, fontFamily: FONT, fontSize: 25, fontWeight: 700, letterSpacing: 2.5, color: dark ? "#A8C1CC" : COLORS.muted}}>{label}</div> : null}
    {children}
  </AbsoluteFill>
);

export const Caption: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  return <div style={{position: "absolute", bottom: 112, left: 82, right: 82, color: dark ? COLORS.cream : COLORS.ink, fontFamily: FONT, fontSize: 44, fontWeight: 600, lineHeight: 1.28, textAlign: "center", opacity: interpolate(frame, [7, 18, durationInFrames - fps * 0.35, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)}), translate: `0 ${interpolate(frame, [7, 20], [24, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px`}}>{children}</div>;
};

export const FamilyMark: React.FC<{size?: number; color?: string; opacity?: number}> = ({size = 1, color = COLORS.green, opacity = 1}) => (
  <div style={{position: "relative", width: 270 * size, height: 250 * size, opacity}}>
    <div style={{position: "absolute", left: 16 * size, top: 11 * size, width: 66 * size, height: 66 * size, borderRadius: "50%", backgroundColor: color}} /><div style={{position: "absolute", left: 99 * size, width: 84 * size, height: 84 * size, borderRadius: "50%", backgroundColor: color}} /><div style={{position: "absolute", left: 200 * size, top: 20 * size, width: 54 * size, height: 54 * size, borderRadius: "50%", backgroundColor: color}} />
    <div style={{position: "absolute", top: 84 * size, width: 102 * size, height: 140 * size, borderRadius: `${56 * size}px ${56 * size}px ${20 * size}px ${20 * size}px`, backgroundColor: color}} /><div style={{position: "absolute", left: 77 * size, top: 92 * size, width: 130 * size, height: 150 * size, borderRadius: `${70 * size}px ${70 * size}px ${20 * size}px ${20 * size}px`, backgroundColor: color}} /><div style={{position: "absolute", left: 186 * size, top: 76 * size, width: 84 * size, height: 124 * size, borderRadius: `${48 * size}px ${48 * size}px ${20 * size}px ${20 * size}px`, backgroundColor: color}} />
  </div>
);

export const MoneyIcon: React.FC<{color?: string; size?: number}> = ({color = COLORS.green, size = 82}) => <div style={{width: size, height: size * 0.66, border: `${Math.max(4, size / 15)}px solid ${color}`, borderRadius: size * 0.1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: size * 0.38, fontWeight: 800, color}}>₫</div>;
export const CheckIcon: React.FC = () => <div style={{width: 43, height: 43, borderRadius: "50%", backgroundColor: COLORS.green, color: "white", fontSize: 28, fontWeight: 900, lineHeight: "43px", textAlign: "center"}}>✓</div>;
