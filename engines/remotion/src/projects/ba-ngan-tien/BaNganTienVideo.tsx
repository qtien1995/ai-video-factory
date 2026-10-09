import {Audio} from "@remotion/media";
import type {Caption} from "@remotion/captions";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import captionData from "./captions.json";

const BEAT_FRAMES = 90;
const ASSET = "assets/jobs/ba-ngan-tien-ngay-nhan-luong";
const AUDIO = "audio/jobs/ba-ngan-tien-ngay-nhan-luong";
const FONT = '"Segoe UI Video", "Segoe UI", sans-serif';
const captions = captionData as Caption[];

const C = {
  navy: "#071B35",
  ivory: "#F6F0E2",
  emerald: "#167C5B",
  orange: "#E98935",
  sky: "#74C6DD",
  ink: "#09223D",
  white: "#FFFFFF",
};

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const flowBeats = new Set([0, 3, 5, 6, 8, 11, 16, 19]);
const tokenSeeds = [
  [0.08, 0.68, 0.2], [0.2, 0.51, 0.55], [0.32, 0.77, 0.05], [0.54, 0.62, 0.38],
  [0.68, 0.43, 0.7], [0.84, 0.7, 0.14], [0.9, 0.53, 0.48], [0.44, 0.32, 0.82],
] as const;

const phases = [
  {from: 0, to: 6, name: "NHÌN LẠI", color: C.ivory},
  {from: 6, to: 12, name: "BA NGĂN", color: C.emerald},
  {from: 12, to: 20, name: "QUYỀN CHỦ ĐỘNG", color: C.sky},
] as const;

const beatInfo = [
  {tag: "TIỀN ĐẦU THÁNG", color: C.orange}, {tag: "VẤN ĐỀ", color: C.orange},
  {tag: "KHI CHƯA PHÂN VAI", color: C.orange}, {tag: "MỘT CHỖ, NHIỀU ƯU TIÊN", color: C.orange},
  {tag: "CUỐI THÁNG", color: C.orange}, {tag: "BẮT ĐẦU LẠI", color: C.emerald},
  {tag: "NGĂN SỐ 1", color: C.emerald}, {tag: "GIỮ NHỊP SỐNG", color: C.emerald},
  {tag: "NGĂN SỐ 2", color: C.orange}, {tag: "KHI LỆCH NHỊP", color: C.orange},
  {tag: "CÓ KHOẢNG ĐỆM", color: C.orange}, {tag: "NGĂN SỐ 3", color: C.sky},
  {tag: "ĐIỀU MUỐN XÂY", color: C.sky}, {tag: "KHÔNG CẦN BẰNG NHAU", color: C.sky},
  {tag: "KHÔNG CẦN HOÀN HẢO", color: C.sky}, {tag: "MỖI ĐỒNG CÓ ĐỊA CHỈ", color: C.emerald},
  {tag: "TRƯỚC KHI CHI", color: C.emerald}, {tag: "ĐỪNG BỎ HẾT NIỀM VUI", color: C.orange},
  {tag: "QUYỀN LỰA CHỌN", color: C.sky}, {tag: "LÀM NGAY HÔM NAY", color: C.ivory},
] as const;

const ImageLayer: React.FC<{index: number; localFrame: number}> = ({index, localFrame}) => {
  const drift = index % 2 === 0 ? 1 : -1;
  const scale = interpolate(localFrame, [0, BEAT_FRAMES], [1.008, 1.05], clamp);
  const y = interpolate(localFrame, [0, BEAT_FRAMES], [0, drift * -24], clamp);
  const rotate = interpolate(localFrame, [0, BEAT_FRAMES], [drift * -0.25, drift * 0.3], clamp);
  return (
    <Img
      src={staticFile(`${ASSET}/B${String(index + 1).padStart(3, "0")}.png`)}
      style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", scale, translate: `0 ${y}px`, rotate: `${rotate}deg`}}
    />
  );
};

const TokenField: React.FC<{active: boolean; frame: number; color: string}> = ({active, frame, color}) => {
  if (!active) return null;
  return (
    <>
      {tokenSeeds.map(([x, y, delay], index) => {
        const progress = interpolate(frame - delay * 26, [0, 54], [0, 1], clamp);
        const left = x * 1080 + interpolate(progress, [0, 1], [-55, index % 2 === 0 ? 155 : -125]);
        const top = y * 1920 - progress * (125 + (index % 3) * 42);
        const size = 24 + (index % 3) * 8;
        return (
          <div
            key={index}
            style={{
              position: "absolute", left, top, width: size, height: size, borderRadius: 99,
              backgroundColor: index % 3 === 0 ? color : index % 3 === 1 ? C.orange : C.ivory,
              border: "3px solid rgba(7,27,53,0.55)", boxShadow: "0 10px 20px rgba(0,0,0,0.24)",
              opacity: interpolate(progress, [0, 0.16, 0.84, 1], [0, 1, 1, 0], clamp),
              rotate: `${progress * (240 + index * 21)}deg`, zIndex: 11,
            }}
          />
        );
      })}
    </>
  );
};

const RouteTrace: React.FC<{active: boolean; frame: number; color: string}> = ({active, frame, color}) => {
  if (!active) return null;
  const draw = interpolate(frame, [5, 54], [730, 0], clamp);
  const tokenX = interpolate(frame, [15, 70], [145, 935], clamp);
  const tokenY = 980 - Math.sin(interpolate(frame, [15, 70], [0, Math.PI], clamp)) * 150;
  return (
    <svg viewBox="0 0 1080 1920" style={{position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 12, pointerEvents: "none"}}>
      <path d="M 105 1110 C 315 850, 460 1230, 662 965 S 900 870, 1000 670" fill="none" stroke="rgba(246,240,226,0.48)" strokeWidth="12" strokeLinecap="round" strokeDasharray="730" strokeDashoffset={draw} />
      <path d="M 105 1110 C 315 850, 460 1230, 662 965 S 900 870, 1000 670" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray="730" strokeDashoffset={draw} />
      <circle cx={tokenX} cy={tokenY} r="18" fill={C.orange} stroke={C.ivory} strokeWidth="5" opacity={interpolate(frame, [12, 18, 72, 86], [0, 1, 1, 0], clamp)} />
    </svg>
  );
};

const KineticCaption: React.FC<{text: string; frame: number; color: string}> = ({text, frame, color}) => {
  const words = text.split(" ");
  return (
    <div style={{display: "flex", flexWrap: "wrap", gap: "0 17px", alignItems: "baseline"}}>
      {words.map((word, index) => {
        const enter = spring({frame: frame - 5 - index * 3, fps: 30, config: {damping: 190, stiffness: 210}});
        const exit = interpolate(frame, [73, 89], [1, 0], clamp);
        return (
          <span key={`${word}-${index}`} style={{color: index === 0 ? color : C.ivory, opacity: enter * exit, translate: `0 ${(1 - enter) * 38}px`, scale: 0.88 + enter * 0.12, whiteSpace: "nowrap"}}>{word}</span>
        );
      })}
    </div>
  );
};

const Progress: React.FC<{index: number}> = ({index}) => (
  <div style={{position: "absolute", left: 58, right: 58, top: 74, zIndex: 30, display: "flex", gap: 8}}>
    {Array.from({length: 20}, (_, itemIndex) => <div key={itemIndex} style={{height: 8, flex: 1, borderRadius: 8, backgroundColor: itemIndex < index ? "rgba(255,255,255,0.72)" : itemIndex === index ? "#FFFFFF" : "rgba(255,255,255,0.20)"}} />)}
  </div>
);

export const BaNganTienVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const index = Math.min(19, Math.floor(frame / BEAT_FRAMES));
  const localFrame = frame - index * BEAT_FRAMES;
  const nextIndex = Math.min(19, index + 1);
  const wipe = index === 19 ? 0 : interpolate(localFrame, [68, 89], [0, 100], { ...clamp, easing: Easing.bezier(0.7, 0, 0.3, 1)});
  const caption = captions[index];
  const info = beatInfo[index];
  const phase = phases.find((item) => index >= item.from && index < item.to) ?? phases[2];
  const kickerIn = spring({frame: localFrame - 2, fps, config: {damping: 180, stiffness: 170}});
  const activeFlow = flowBeats.has(index);

  return (
    <AbsoluteFill style={{backgroundColor: C.navy, overflow: "hidden"}}>
      <ImageLayer index={index} localFrame={localFrame} />
      {nextIndex !== index ? (
        <AbsoluteFill style={{clipPath: `inset(0 ${100 - wipe}% 0 0)`}}>
          <ImageLayer index={nextIndex} localFrame={0} />
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(3,17,37,0.58) 0%, rgba(3,17,37,0.03) 36%, rgba(3,17,37,0.2) 56%, rgba(3,17,37,0.93) 100%)"}} />
      <AbsoluteFill style={{backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px", opacity: 0.38, translate: `${interpolate(localFrame, [0, 89], [0, -18], clamp)}px 0`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at ${30 + (index % 4) * 18}% ${35 + (index % 3) * 12}%, ${info.color}36 0%, transparent 38%)`, opacity: interpolate(localFrame, [0, 20, 70, 89], [0, 0.45, 0.25, 0], clamp)}} />
      <RouteTrace active={activeFlow} frame={localFrame} color={info.color} />
      <TokenField active={activeFlow} frame={localFrame} color={info.color} />

      <Progress index={index} />
      <div style={{position: "absolute", left: 58, top: 116, zIndex: 30, display: "flex", alignItems: "center", gap: 14, color: C.white, fontFamily: FONT, fontSize: 25, fontWeight: 800, letterSpacing: 3.1, opacity: kickerIn, translate: `${(1 - kickerIn) * -46}px 0`}}>
        <div style={{width: 13, height: 13, borderRadius: 99, backgroundColor: phase.color}} />{phase.name}
      </div>

      <div style={{position: "absolute", left: 58, right: 58, bottom: 94, zIndex: 30}}>
        <div style={{display: "inline-flex", padding: "12px 19px", borderRadius: 999, backgroundColor: info.color, color: C.ink, fontFamily: FONT, fontSize: 23, fontWeight: 900, letterSpacing: 2.1, opacity: kickerIn, scale: 0.85 + kickerIn * 0.15}}>{info.tag}</div>
        <div style={{marginTop: 18, color: C.white, fontFamily: FONT, fontSize: caption.text.length > 23 ? 62 : 75, fontWeight: 800, lineHeight: 0.96, letterSpacing: -2.4, textShadow: "0 5px 24px rgba(0,0,0,0.48)"}}>
          <KineticCaption text={caption.text} frame={localFrame} color={info.color} />
        </div>
        <div style={{marginTop: 21, width: `${interpolate(localFrame, [8, 51], [0, 28 + (index % 4) * 12], clamp)}%`, height: 10, borderRadius: 20, backgroundColor: info.color}} />
      </div>
      <div style={{position: "absolute", right: 58, bottom: 56, zIndex: 30, fontFamily: FONT, color: "rgba(255,255,255,0.76)", fontSize: 23, fontWeight: 750, letterSpacing: 1.6}}>{String(index + 1).padStart(2, "0")} / 20</div>
      <Audio src={staticFile(`${AUDIO}/voiceover.mp3`)} volume={1} />
    </AbsoluteFill>
  );
};
