import React from "react";
import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const colors = {
  ink: "#062D28",
  deep: "#0A433B",
  green: "#00A758",
  mint: "#B8F3D0",
  warm: "#FFB547",
  paper: "#F7F4EE",
  white: "#FFFFFF",
  muted: "#A7C4BD",
};

const sceneText = {
  hook: "Nếu chiếc ghế này trống sáu tháng, điều gì vẫn không dừng lại?",
  costs: "Bữa cơm vẫn đến giờ. Tiền nhà, học phí và chi phí thiết yếu vẫn tiếp diễn.",
  income: "Khi một người tạm ngưng tạo thu nhập, gia đình không chỉ thiếu một con số. Họ mất một nhịp vận hành.",
  buffer: "Gia đình mình có khoảng đệm bao lâu?",
  review: "Tối nay, hãy cùng nhau ghi ba dòng.",
  outro: "Nhìn thấy khoảng trống. Chủ động chuẩn bị.",
};

const fade = (frame: number, fps: number, delay = 0, duration = 12) =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const SceneShell: React.FC<{children: React.ReactNode; label: string}> = ({children, label}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 42%, ${colors.deep} 0%, ${colors.ink} 63%)`,
      color: colors.white,
      fontFamily: "Segoe UI Video, Arial, sans-serif",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 92,
        left: 78,
        color: colors.muted,
        fontSize: 25,
        fontWeight: 700,
        letterSpacing: 2,
      }}
    >
      {label}
    </div>
    {children}
  </AbsoluteFill>
);

const Subtitle: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 126,
        left: 72,
        right: 72,
        color: colors.paper,
        fontSize: 36,
        lineHeight: 1.28,
        fontWeight: 600,
        textAlign: "center",
        opacity: fade(frame, fps, 9),
      }}
    >
      {text}
    </div>
  );
};

const Chair: React.FC<{x: number; y: number; empty?: boolean; delay?: number}> = ({x, y, empty = false, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dissolve = empty
    ? interpolate(frame, [fps * 1.2 + delay, fps * 2.6 + delay], [1, 0.08], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 116,
        height: 116,
        borderRadius: 58,
        backgroundColor: empty ? colors.mint : "#164F47",
        border: `3px solid ${empty ? colors.green : "#2D685F"}`,
        opacity: dissolve,
        boxShadow: empty ? `0 0 40px ${colors.green}` : "none",
        scale: empty ? 0.9 + dissolve * 0.1 : 1,
      }}
    />
  );
};

const Table: React.FC<{emptyChair?: boolean}> = ({emptyChair = false}) => (
  <>
    <div
      style={{
        position: "absolute",
        width: 560,
        height: 560,
        borderRadius: 280,
        top: 608,
        left: 260,
        background: `radial-gradient(circle at 42% 35%, #28685D, #0D3C35 72%)`,
        border: "10px solid #4C897B",
        boxShadow: "0 28px 70px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: 130,
          top: 140,
          left: 140,
          border: "2px solid rgba(255,255,255,0.13)",
        }}
      />
    </div>
    <Chair x={482} y={444} />
    <Chair x={740} y={830} />
    <Chair x={482} y={1218} />
    <Chair x={224} y={830} empty={emptyChair} />
  </>
);

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleOpacity = fade(frame, fps, 3);
  return (
    <SceneShell label="01 / KHOẢNG TRỐNG">
      <Table emptyChair />
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 78,
          right: 78,
          fontSize: 74,
          lineHeight: 1.02,
          fontWeight: 700,
          letterSpacing: -2.5,
          opacity: titleOpacity,
          translate: `0 ${interpolate(frame, [0, 18], [32, 0], {extrapolateRight: "clamp"})}px`,
        }}
      >
        CHIẾC GHẾ NÀY<br />TRỐNG 6 THÁNG?
      </div>
      <Subtitle text={sceneText.hook} />
    </SceneShell>
  );
};

const CostPill: React.FC<{label: string; left: number; top: number; delay: number}> = ({label, left, top, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 120}});
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        borderRadius: 40,
        padding: "19px 28px",
        backgroundColor: "rgba(255,181,71,0.16)",
        border: `2px solid ${colors.warm}`,
        color: "#FFE3AD",
        fontWeight: 700,
        fontSize: 30,
        opacity: fade(frame, fps, delay),
        scale: 0.92 + pulse * 0.08,
      }}
    >
      {label}
    </div>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const orbit = interpolate(frame, [0, 180], [0, 360], {extrapolateRight: "clamp"});
  return (
    <SceneShell label="02 / NHỊP VẪN CHẠY">
      <div
        style={{
          position: "absolute",
          width: 780,
          height: 780,
          borderRadius: 390,
          top: 502,
          left: 150,
          border: "2px dashed rgba(184,243,208,0.38)",
          rotate: `${orbit}deg`,
        }}
      />
      <Table emptyChair />
      <CostPill label="BỮA ĂN" left={92} top={440} delay={8} />
      <CostPill label="TIỀN NHÀ" left={696} top={576} delay={22} />
      <CostPill label="HỌC PHÍ" left={670} top={1190} delay={36} />
      <CostPill label="CHI PHÍ THIẾT YẾU" left={108} top={1330} delay={50} />
      <div
        style={{
          position: "absolute",
          top: 262,
          left: 78,
          right: 78,
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.08,
          opacity: fade(frame, fps, 3),
        }}
      >
        NHỮNG KHOẢN NÀY<br />VẪN TIẾP DIỄN.
      </div>
      <Subtitle text={sceneText.costs} />
    </SceneShell>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lineProgress = interpolate(frame, [10, 100], [0, 1], {extrapolateRight: "clamp"});
  const particles = interpolate(frame, [105, 200], [1, 0], {extrapolateRight: "clamp"});
  return (
    <SceneShell label="03 / DÒNG TIỀN">
      <div style={{position: "absolute", top: 330, left: 78, fontSize: 62, fontWeight: 700, lineHeight: 1.08, opacity: fade(frame, fps, 4)}}>
        THU NHẬP TẠM NGƯNG.<br />CHI PHÍ VẪN CHẠY.
      </div>
      <div style={{position: "absolute", top: 810, left: 90, right: 90, height: 22, borderRadius: 20, backgroundColor: "rgba(184,243,208,0.14)"}}>
        <div style={{height: 22, width: `${lineProgress * 52}%`, borderRadius: 20, background: `linear-gradient(90deg, ${colors.mint}, ${colors.green})`}} />
      </div>
      <div style={{position: "absolute", top: 725, left: 90, color: colors.mint, fontSize: 30, fontWeight: 700, opacity: fade(frame, fps, 9)}}>THU NHẬP</div>
      <div style={{position: "absolute", top: 868, left: 90, right: 90, height: 3, backgroundColor: "rgba(255,181,71,0.65)"}} />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            borderRadius: 9,
            top: 812 + Math.sin(index) * 34,
            left: 600 + index * 48,
            backgroundColor: colors.mint,
            opacity: particles,
            translate: `${index * 16}px ${index % 2 === 0 ? -index * 7 : index * 7}px`,
          }}
        />
      ))}
      <div style={{position: "absolute", top: 930, left: 90, color: "#FFE3AD", fontSize: 30, fontWeight: 700, opacity: fade(frame, fps, 25)}}>CÁC KHOẢN CHI</div>
      <Subtitle text={sceneText.income} />
    </SceneShell>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = interpolate(frame, [8, 170], [0, 276], {extrapolateRight: "clamp"});
  return (
    <SceneShell label="04 / KHOẢNG ĐỆM">
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 116,
          right: 116,
          textAlign: "center",
          fontSize: 72,
          lineHeight: 1.04,
          fontWeight: 700,
          opacity: fade(frame, fps, 6),
        }}
      >
        GIA ĐÌNH MÌNH CÓ<br />KHOẢNG ĐỆM BAO LÂU?
      </div>
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: 280,
          top: 715,
          left: 260,
          background: `conic-gradient(${colors.green} 0deg ${progress}deg, rgba(184,243,208,0.11) ${progress}deg 360deg)`,
          opacity: fade(frame, fps, 8),
        }}
      >
        <div style={{position: "absolute", inset: 28, borderRadius: 252, backgroundColor: colors.ink}} />
        <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: colors.mint, fontSize: 35, fontWeight: 700, textAlign: "center"}}>
          KHOẢNG ĐỆM<br />TÀI CHÍNH
        </div>
      </div>
      <Subtitle text={sceneText.buffer} />
    </SceneShell>
  );
};

const CheckRow: React.FC<{index: number; text: string}> = ({index, text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = fade(frame, fps, 14 + index * 20);
  return (
    <div style={{display: "flex", alignItems: "center", gap: 22, opacity, translate: `0 ${interpolate(frame, [14 + index * 20, 32 + index * 20], [22, 0], {extrapolateRight: "clamp"})}px`}}>
      <div style={{width: 44, height: 44, borderRadius: 22, backgroundColor: colors.green, color: colors.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26}}>✓</div>
      <div style={{fontSize: 36, lineHeight: 1.15, fontWeight: 700, color: colors.ink}}>{text}</div>
    </div>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneShell label="05 / TỰ RÀ SOÁT">
      <div style={{position: "absolute", top: 285, left: 92, right: 92, fontSize: 65, fontWeight: 700, lineHeight: 1.08, opacity: fade(frame, fps, 5)}}>
        TỐI NAY, HÃY GHI<br />BA DÒNG NÀY.
      </div>
      <div
        style={{
          position: "absolute",
          top: 662,
          left: 70,
          right: 70,
          minHeight: 590,
          borderRadius: 42,
          backgroundColor: colors.paper,
          padding: 54,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          boxShadow: "0 26px 70px rgba(0,0,0,0.28)",
          opacity: fade(frame, fps, 8),
          scale: 0.96 + spring({frame, fps, config: {damping: 18}}) * 0.04,
        }}
      >
        <CheckRow index={0} text="CHI PHÍ THIẾT YẾU" />
        <CheckRow index={1} text="QUỸ HIỆN CÓ" />
        <CheckRow index={2} text="AI CÓ THỂ GÁNH TIẾP" />
      </div>
      <Subtitle text={sceneText.review} />
    </SceneShell>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneShell label="06 / CHỦ ĐỘNG">
      <div style={{position: "absolute", top: 514, left: 100, right: 100, textAlign: "center", fontSize: 72, fontWeight: 700, lineHeight: 1.05, opacity: fade(frame, fps, 8)}}>
        NHÌN THẤY<br />KHOẢNG TRỐNG.<br /><span style={{color: colors.mint}}>CHỦ ĐỘNG CHUẨN BỊ.</span>
      </div>
      <div style={{position: "absolute", left: 0, right: 0, bottom: 280, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, opacity: fade(frame, fps, 24)}}>
        <Img src={staticFile("assets/jobs/income-gap-family-chair/logo.png")} style={{width: 330, height: "auto", objectFit: "contain"}} />
        <div style={{fontSize: 28, color: colors.muted, fontWeight: 600, letterSpacing: 1}}>Tiến Dương</div>
      </div>
      <Subtitle text={sceneText.outro} />
    </SceneShell>
  );
};

export const IncomeGapVideo: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("assets/jobs/income-gap-family-chair/audio/voiceover.mp3")} playbackRate={0.72} />
    <Sequence durationInFrames={120} name="01 Empty chair"><Scene1 /></Sequence>
    <Sequence from={120} durationInFrames={180} name="02 Costs continue"><Scene2 /></Sequence>
    <Sequence from={300} durationInFrames={240} name="03 Income gap"><Scene3 /></Sequence>
    <Sequence from={540} durationInFrames={270} name="04 Buffer question"><Scene4 /></Sequence>
    <Sequence from={810} durationInFrames={360} name="05 Self review"><Scene5 /></Sequence>
    <Sequence from={1170} durationInFrames={180} name="06 Brand outro"><Scene6 /></Sequence>
  </AbsoluteFill>
);
