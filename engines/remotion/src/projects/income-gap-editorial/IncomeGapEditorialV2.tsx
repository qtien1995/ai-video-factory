import {Audio} from "@remotion/media";
import type {Caption} from "@remotion/captions";
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
import captionData from "./captions.json";

const C = {
  paper: "#F4F0E6",
  paper2: "#E8E2D5",
  ink: "#092C3D",
  navy: "#062536",
  blue: "#135A75",
  green: "#00A758",
  lime: "#C8F15B",
  coral: "#F46155",
  white: "#FFFFFF",
  muted: "#7C887F",
};

const FONT = '"Segoe UI Video", "Segoe UI", sans-serif';
const ASSET = "assets/jobs/income-gap-editorial-v2";
const AUDIO = "audio/jobs/income-gap-editorial-v2";
const VOICE_AUDIO = "audio/jobs/income-gap-editorial-v3";
const captions = captionData as Caption[];
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const rise = (frame: number, from = 0, duration = 16) =>
  interpolate(frame, [from, from + duration], [44, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const fade = (frame: number, from = 0, duration = 12) =>
  interpolate(frame, [from, from + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const PaperTexture: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? C.navy : C.paper,
      backgroundImage: dark
        ? "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.055) 0 1px, transparent 1.5px), linear-gradient(115deg, rgba(255,255,255,0.025), transparent 45%)"
        : "radial-gradient(circle at 18% 17%, rgba(9,44,61,0.075) 0 1px, transparent 1.5px), linear-gradient(115deg, rgba(255,255,255,0.45), transparent 45%)",
      backgroundSize: "15px 15px, 100% 100%",
    }}
  />
);

const Photo: React.FC<{
  src: string;
  position?: string;
  scaleFrom?: number;
  scaleTo?: number;
  shade?: number;
}> = ({src, position = "center", scaleFrom = 1.03, scaleTo = 1.1, shade = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <>
      <Img
        src={staticFile(`${ASSET}/${src}`)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          scale: interpolate(frame, [0, durationInFrames], [scaleFrom, scaleTo], clamp),
        }}
      />
      {shade > 0 ? (
        <AbsoluteFill style={{backgroundColor: `rgba(4,25,35,${shade})`}} />
      ) : null}
    </>
  );
};

const EditorialCaption: React.FC<{captionIndex: number; dark?: boolean}> = ({
  captionIndex,
  dark = false,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        bottom: 66,
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        gap: 18,
        opacity: interpolate(
          frame,
          [6, 16, durationInFrames - 10, durationInFrames - 1],
          [0, 1, 1, 0],
          clamp,
        ),
      }}
    >
      <div style={{width: 7, height: 58, backgroundColor: C.lime, flexShrink: 0}} />
      <div
        style={{
          color: dark ? C.white : C.ink,
          fontFamily: FONT,
          fontSize: 37,
          fontWeight: 650,
          lineHeight: 1.2,
          textShadow: dark ? "0 3px 18px rgba(0,0,0,0.75)" : "none",
        }}
      >
        {captions[captionIndex]?.text}
      </div>
    </div>
  );
};

const Kicker: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark}) => (
  <div
    style={{
      position: "absolute",
      top: 70,
      left: 62,
      zIndex: 40,
      fontFamily: FONT,
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: 3.2,
      color: dark ? "rgba(255,255,255,0.77)" : C.green,
    }}
  >
    {children}
  </div>
);

const MarkerLine: React.FC<{
  top: number;
  left: number;
  width: number;
  color?: string;
  delay?: number;
  rotate?: number;
}> = ({top, left, width, color = C.coral, delay = 0, rotate = -2}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: `${interpolate(frame, [delay, delay + 18], [0, width], clamp)}px`,
        height: 10,
        borderRadius: 10,
        backgroundColor: color,
        rotate: `${rotate}deg`,
        zIndex: 45,
      }}
    />
  );
};

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = interpolate(frame, [70, 94], [0, 100], clamp);
  return (
    <AbsoluteFill style={{backgroundColor: C.navy}}>
      <Photo src="morning-0630.png" position="52% center" shade={0.16} />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(3,24,34,0.05) 10%, rgba(3,24,34,0.74) 88%)",
        }}
      />
      <Kicker dark>MỘT NGÀY VẪN CHẠY</Kicker>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 245,
          zIndex: 20,
          color: C.white,
          fontFamily: FONT,
          opacity: fade(frame, 4),
          translate: `0 ${rise(frame, 4)}px`,
        }}
      >
        <div style={{fontSize: 214, fontWeight: 800, lineHeight: 0.85, letterSpacing: -13}}>06:30</div>
        <div style={{fontSize: 54, fontWeight: 650, marginTop: 27}}>Căn nhà bắt đầu chuyển động.</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `${cut}%`,
          overflow: "hidden",
          clipPath: "polygon(0 16%, 100% 0, 100% 100%, 0 100%)",
          opacity: 0.34,
        }}
      >
        <Photo src="morning-0630.png" position="40% center" scaleFrom={1.18} scaleTo={1.24} />
      </div>
      <MarkerLine top={548} left={60} width={540} color={C.lime} delay={24} rotate={-1} />
      <EditorialCaption dark captionIndex={0} />
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [18, 95], [0, 800], clamp);
  const stop = fade(frame, 78, 8);
  const split = interpolate(frame, [70, 112], [0, 48], clamp);
  return (
    <AbsoluteFill style={{backgroundColor: C.paper}}>
      <Photo src="income-earner-doorway.png" position="47% center" shade={0.08} />
      <AbsoluteFill style={{background: "linear-gradient(90deg, rgba(4,24,34,0.78), transparent 64%)"}} />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: `${split}%`,
          backgroundColor: "rgba(244,240,230,0.88)",
          borderLeft: `10px solid ${C.lime}`,
        }}
      />
      <Kicker dark>NGUỒN THU NHẬP</Kicker>
      <div
        style={{
          position: "absolute",
          left: 62,
          top: 310,
          zIndex: 20,
          width: 650,
          color: C.white,
          fontFamily: FONT,
          fontSize: 82,
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: -2.5,
          opacity: fade(frame, 4),
          translate: `${rise(frame, 4)}px 0`,
        }}
      >
        MỘT NGƯỜI<br />BƯỚC RA.
      </div>
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 62,
          width: line,
          height: 18,
          borderRadius: 20,
          backgroundColor: C.green,
          boxShadow: "0 0 0 8px rgba(255,255,255,0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 828,
          width: 88,
          height: 88,
          borderRadius: "50%",
          backgroundColor: C.coral,
          color: C.white,
          fontFamily: FONT,
          fontSize: 46,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: stop,
          scale: interpolate(frame, [78, 92], [0.4, 1], {...clamp, easing: Easing.out(Easing.back(1.8))}),
        }}
      >
        ×
      </div>
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 60,
          padding: "14px 24px",
          backgroundColor: C.coral,
          color: C.white,
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 800,
          rotate: "-2deg",
          opacity: stop,
        }}
      >
        DÒNG TIỀN DỪNG
      </div>
      <EditorialCaption dark captionIndex={1} />
    </AbsoluteFill>
  );
};

type CropCardProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  position: string;
  rotate: number;
  delay: number;
  label: string;
};

const CropCard: React.FC<CropCardProps> = ({x, y, w, h, position, rotate, delay, label}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        backgroundColor: C.white,
        padding: 13,
        boxShadow: "0 24px 55px rgba(9,44,61,0.22)",
        rotate: `${rotate}deg`,
        opacity: fade(frame, delay, 12),
        translate: `0 ${rise(frame, delay, 18)}px`,
      }}
    >
      <div style={{position: "relative", width: "100%", height: "calc(100% - 58px)", overflow: "hidden"}}>
        <Img
          src={staticFile(`${ASSET}/expense-table.png`)}
          style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: position, scale: 1.16}}
        />
      </div>
      <div style={{fontFamily: FONT, color: C.ink, fontSize: 30, fontWeight: 800, padding: "12px 8px 0"}}>{label}</div>
    </div>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <PaperTexture />
      <Kicker>CHI PHÍ KHÔNG DỪNG</Kicker>
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 62,
          right: 62,
          color: C.ink,
          fontFamily: FONT,
          fontSize: 77,
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: -2,
          opacity: fade(frame, 0),
        }}
      >
        NHỮNG KHOẢN<br />KHÔNG BIẾT CHỜ.
      </div>
      <CropCard x={58} y={470} w={440} h={410} position="15% 68%" rotate={-3} delay={10} label="NHÀ Ở" />
      <CropCard x={536} y={430} w={470} h={455} position="3% 22%" rotate={2.5} delay={24} label="HỌC PHÍ" />
      <CropCard x={95} y={950} w={430} h={420} position="86% 18%" rotate={2} delay={40} label="THỰC PHẨM" />
      <CropCard x={555} y={930} w={450} h={450} position="58% 60%" rotate={-2} delay={54} label="HÓA ĐƠN" />
      <MarkerLine top={370} left={62} width={650} delay={18} />
      <EditorialCaption captionIndex={2} />
    </AbsoluteFill>
  );
};

const mosaic = [
  {src: "groceries-v3.png", label: "ĂN UỐNG", color: C.lime, x: 35, y: 180, w: 620, h: 500, rotate: -2.5},
  {src: "electricity-v3.png", label: "ĐIỆN", color: "#9DDDE6", x: 625, y: 245, w: 390, h: 430, rotate: 3},
  {src: "water-v3.png", label: "NƯỚC", color: "#82C9E8", x: 70, y: 760, w: 420, h: 440, rotate: 2.4},
  {src: "budget-v3.png", label: "CHI TIÊU", color: "#F1B8A8", x: 455, y: 790, w: 560, h: 520, rotate: -2},
];

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      <Kicker dark>VẪN TIẾP TỤC</Kicker>
      <div style={{position: "absolute", inset: 0}}>
        {mosaic.map((item, index) => (
          <div
            key={item.label}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              width: item.w,
              height: item.h,
              overflow: "hidden",
              padding: 12,
              backgroundColor: C.paper,
              boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
              rotate: `${item.rotate}deg`,
              opacity: fade(frame, index * 14, 10),
              scale: interpolate(frame, [index * 14, index * 14 + 18], [0.92, 1], clamp),
            }}
          >
            <Img
              src={staticFile(`${ASSET}/${item.src}`)}
              style={{width: "100%", height: "100%", objectFit: "cover"}}
            />
            <div style={{position: "absolute", left: 20, bottom: 22, padding: "9px 16px", backgroundColor: item.color, color: C.ink, fontFamily: FONT, fontSize: 28, fontWeight: 900}}>{item.label}</div>
          </div>
        ))}
      </div>
      <EditorialCaption dark captionIndex={3} />
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const day = Math.min(30, Math.max(1, Math.floor(interpolate(frame, [12, 120], [1, 31], clamp))));
  return (
    <AbsoluteFill>
      <Photo src="expense-table.png" position="15% 68%" shade={0.46} scaleFrom={1.15} scaleTo={1.23} />
      <Kicker dark>THỜI GIAN KHÔNG DỪNG</Kicker>
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 235,
          width: 560,
          height: 710,
          backgroundColor: C.paper,
          boxShadow: "0 28px 70px rgba(0,0,0,0.32)",
          rotate: "-3deg",
          padding: "44px 42px",
          fontFamily: FONT,
          color: C.ink,
        }}
      >
        <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 3}}>THÁNG NÀY</div>
        <div style={{fontSize: 330, fontWeight: 800, lineHeight: 0.92, letterSpacing: -22, color: day >= 24 ? C.coral : C.ink}}>{String(day).padStart(2, "0")}</div>
        <div style={{height: 12, width: `${(day / 30) * 100}%`, backgroundColor: day >= 24 ? C.coral : C.green, marginTop: 25}} />
        <div style={{fontSize: 45, fontWeight: 750, lineHeight: 1.05, marginTop: 42}}>Ngày vẫn trôi.<br />Chi phí vẫn tới.</div>
      </div>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            right: 58 + index * 14,
            top: 430 + index * 220,
            width: 360,
            height: 160,
            padding: 24,
            backgroundColor: C.white,
            rotate: `${2 - index * 2}deg`,
            boxShadow: "0 18px 42px rgba(0,0,0,0.24)",
            opacity: fade(frame, 36 + index * 20, 10),
            translate: `${rise(frame, 36 + index * 20, 14)}px 0`,
            fontFamily: FONT,
            color: C.ink,
          }}
        >
          <div style={{fontSize: 20, fontWeight: 800, color: C.coral}}>ĐẾN HẠN</div>
          <div style={{fontSize: 38, fontWeight: 800, marginTop: 13}}>{["NHÀ Ở", "HỌC PHÍ", "SINH HOẠT"][index]}</div>
          <div style={{height: 7, backgroundColor: C.paper2, marginTop: 18}}><div style={{width: `${55 + index * 18}%`, height: "100%", backgroundColor: C.green}} /></div>
        </div>
      ))}
      <EditorialCaption dark captionIndex={4} />
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const chart = interpolate(frame, [10, 140], [0, 1], clamp);
  const incomeEnd = 180 + Math.min(chart, 0.45) / 0.45 * 340;
  const expenseEnd = 180 + chart * 760;
  return (
    <AbsoluteFill>
      <PaperTexture />
      <Kicker>KHOẢNG TRỐNG</Kicker>
      <div style={{position: "absolute", top: 165, left: 60, right: 60, fontFamily: FONT, color: C.ink}}>
        <div style={{fontSize: 78, lineHeight: 0.98, fontWeight: 850, letterSpacing: -3}}>MỘT ĐƯỜNG DỪNG.</div>
        <div style={{fontSize: 78, lineHeight: 0.98, fontWeight: 850, letterSpacing: -3, color: C.coral}}>MỘT ĐƯỜNG TIẾP TỤC.</div>
      </div>
      <div style={{position: "absolute", left: 58, right: 58, top: 500, height: 730, borderLeft: `3px solid ${C.ink}`, borderBottom: `3px solid ${C.ink}`, backgroundImage: "linear-gradient(rgba(9,44,61,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(9,44,61,0.08) 1px, transparent 1px)", backgroundSize: "82px 82px"}}>
        <div style={{position: "absolute", left: 0, top: 182, width: incomeEnd, height: 18, backgroundColor: C.green, borderRadius: 20}} />
        <div style={{position: "absolute", left: incomeEnd - 16, top: 164, width: 50, height: 50, borderRadius: "50%", backgroundColor: C.green}} />
        <div style={{position: "absolute", left: 0, top: 470, width: expenseEnd, height: 18, backgroundColor: C.coral, borderRadius: 20}} />
        <div style={{position: "absolute", left: expenseEnd - 16, top: 452, width: 50, height: 50, borderRadius: "50%", backgroundColor: C.coral}} />
        <div style={{position: "absolute", left: Math.min(incomeEnd + 8, 530), top: 205, width: Math.max(0, expenseEnd - incomeEnd - 25), height: 245, opacity: interpolate(chart, [0.48, 0.72], [0, 1], clamp), backgroundImage: "repeating-linear-gradient(135deg, rgba(244,97,85,0.35) 0 12px, transparent 12px 26px)", border: `3px dashed ${C.coral}`}} />
        <div style={{position: "absolute", left: 20, top: 115, fontFamily: FONT, fontSize: 28, fontWeight: 800, color: C.green}}>THU NHẬP</div>
        <div style={{position: "absolute", left: 20, top: 405, fontFamily: FONT, fontSize: 28, fontWeight: 800, color: C.coral}}>CHI PHÍ</div>
        <div style={{position: "absolute", right: 24, top: 268, padding: "14px 20px", backgroundColor: C.coral, color: C.white, fontFamily: FONT, fontSize: 31, fontWeight: 850, rotate: "-2deg", opacity: interpolate(chart, [0.72, 0.86], [0, 1], clamp)}}>KHOẢNG TRỐNG</div>
      </div>
      <EditorialCaption captionIndex={5} />
    </AbsoluteFill>
  );
};

const questions = [
  ["01", "Mỗi tháng cần bao nhiêu?"],
  ["02", "Dự phòng đủ mấy tháng?"],
  ["03", "Khi nguồn thu nghỉ, kế hoạch nào tiếp tục?"],
];

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = Math.min(2, Math.floor(frame / 120));
  const positions = ["50% 16%", "50% 42%", "50% 70%"];
  return (
    <AbsoluteFill style={{backgroundColor: C.navy}}>
      <Photo src="family-planning-evening.png" position={positions[cut]} scaleFrom={1.07} scaleTo={1.15} shade={0.28} />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(4,28,40,0.10), rgba(4,28,40,0.92) 78%)"}} />
      <Kicker dark>BA CÂU CẦN TRẢ LỜI</Kicker>
      <div style={{position: "absolute", left: 58, right: 58, top: 245, fontFamily: FONT, color: C.white, fontSize: 77, fontWeight: 850, lineHeight: 1, letterSpacing: -2}}>CHỦ ĐỘNG<br />BẮT ĐẦU TỪ ĐÂY.</div>
      <div style={{position: "absolute", left: 58, right: 58, top: 770, display: "flex", flexDirection: "column", gap: 22}}>
        {questions.map(([number, question], index) => (
          <div
            key={number}
            style={{
              minHeight: 150,
              padding: "24px 28px",
              display: "grid",
              gridTemplateColumns: "95px 1fr",
              alignItems: "center",
              backgroundColor: index === 2 ? C.lime : "rgba(255,255,255,0.92)",
              color: C.ink,
              borderLeft: `10px solid ${index === 2 ? C.green : C.coral}`,
              opacity: fade(frame, 18 + index * 88, 14),
              translate: `${rise(frame, 18 + index * 88, 18)}px 0`,
              boxShadow: "0 18px 50px rgba(0,0,0,0.20)",
            }}
          >
            <div style={{fontFamily: FONT, fontSize: 54, fontWeight: 900, color: index === 2 ? C.green : C.coral}}>{number}</div>
            <div style={{fontFamily: FONT, fontSize: index === 2 ? 38 : 43, lineHeight: 1.08, fontWeight: 800}}>{question}</div>
          </div>
        ))}
      </div>
      <EditorialCaption dark captionIndex={6} />
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = spring({frame, fps: 30, config: {damping: 180, stiffness: 120}});
  return (
    <AbsoluteFill style={{backgroundColor: C.navy}}>
      <Photo src="family-planning-evening.png" position="50% 28%" shade={0.52} scaleFrom={1.08} scaleTo={1.12} />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(4,28,40,0.08), rgba(4,28,40,0.96) 76%)"}} />
      <div style={{position: "absolute", left: 60, right: 60, top: 610, color: C.white, fontFamily: FONT, opacity: settle, translate: `0 ${(1 - settle) * 50}px`}}>
        <div style={{fontSize: 33, fontWeight: 800, color: C.lime, letterSpacing: 2.6}}>RÀ SOÁT SỚM</div>
        <div style={{fontSize: 94, fontWeight: 850, lineHeight: 0.98, letterSpacing: -4, marginTop: 25}}>KHÔNG PHẢI<br />ĐỂ LO SỢ.</div>
        <div style={{fontSize: 62, fontWeight: 750, lineHeight: 1.02, marginTop: 38}}>Mà để chủ động.</div>
      </div>
      <MarkerLine top={1110} left={60} width={610} color={C.lime} delay={28} rotate={-1} />
      <div style={{position: "absolute", left: 60, right: 60, bottom: 88, display: "flex", alignItems: "center", justifyContent: "space-between", opacity: fade(frame, 45, 18)}}>
        <Img src={staticFile(`${ASSET}/manulife-logo.png`)} style={{width: 310, height: "auto", objectFit: "contain"}} />
        <div style={{textAlign: "right", color: C.white, fontFamily: FONT}}>
          <div style={{fontSize: 23, letterSpacing: 2.5, opacity: 0.68}}>NỘI DUNG GIÁO DỤC</div>
          <div style={{fontSize: 39, fontWeight: 800, marginTop: 8}}>Tiến Dương</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const scenes = [
  {from: 0, duration: 150, component: Scene1, name: "01 Morning"},
  {from: 150, duration: 180, component: Scene2, name: "02 Income stops"},
  {from: 330, duration: 150, component: Scene3, name: "03 Fixed expenses"},
  {from: 480, duration: 120, component: Scene4, name: "04 Daily expenses"},
  {from: 600, duration: 150, component: Scene5, name: "05 Calendar"},
  {from: 750, duration: 180, component: Scene6, name: "06 Gap chart"},
  {from: 930, duration: 360, component: Scene7, name: "07 Questions"},
  {from: 1290, duration: 150, component: Scene8, name: "08 Outro"},
] as const;

const voiceClips = [
  {file: "p01.mp3", from: 9, duration: 44},
  {file: "p02.mp3", from: 63, duration: 46},
  {file: "p03.mp3", from: 156, duration: 92},
  {file: "p04.mp3", from: 255, duration: 77},
  {file: "p05.mp3", from: 336, duration: 52},
  {file: "p06.mp3", from: 402, duration: 50},
  {file: "p07.mp3", from: 492, duration: 77},
  {file: "p08.mp3", from: 618, duration: 35},
  {file: "p09.mp3", from: 666, duration: 49},
  {file: "p10.mp3", from: 762, duration: 86},
  {file: "p11.mp3", from: 855, duration: 83},
  {file: "p12.mp3", from: 939, duration: 94},
  {file: "p13.mp3", from: 1044, duration: 56},
  {file: "p14.mp3", from: 1110, duration: 70},
  {file: "p15.mp3", from: 1191, duration: 71},
  {file: "p16.mp3", from: 1296, duration: 81},
  {file: "p17.mp3", from: 1386, duration: 43},
] as const;

export const IncomeGapEditorialV2: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.navy}}>
    <Audio
      src={staticFile(`${AUDIO}/editorial-bed.wav`)}
      volume={(frame) =>
        interpolate(frame, [0, 25, 720, 980, 1380, 1440], [0, 0.075, 0.075, 0.045, 0.065, 0], clamp)
      }
    />
    {scenes.map((scene) => {
      const Component = scene.component;
      return (
        <Sequence key={scene.name} from={scene.from} durationInFrames={scene.duration} name={scene.name}>
          <Component />
        </Sequence>
      );
    })}
    {voiceClips.map((clip) => (
      <Sequence key={clip.file} from={clip.from} durationInFrames={clip.duration} name={`Voice ${clip.file}`}>
        <Audio src={staticFile(`${VOICE_AUDIO}/${clip.file}`)} volume={1} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
