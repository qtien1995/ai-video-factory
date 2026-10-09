import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {FONT_FAMILY} from "./fonts";

export const COLORS = {
  canvas: "#F4F5EE",
  paper: "#FFFFFF",
  green: "#00A758",
  deepGreen: "#0A3D2A",
  ink: "#13251D",
  muted: "#66766E",
  mint: "#DDF2E6",
  lime: "#CBEA75",
  amber: "#F0B55A",
  coral: "#E66C5B",
  line: "#C8D5CE",
  charcoal: "#183128",
};

export const FONT = FONT_FAMILY;

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const SceneCanvas: React.FC<{
  children: React.ReactNode;
  scene: string;
  chapter: string;
  tone?: "light" | "green";
}> = ({children, scene, chapter, tone = "light"}) => (
  <AbsoluteFill
    style={{
      background:
        tone === "green"
          ? "radial-gradient(circle at 80% 10%, #176044 0%, #0A3D2A 42%, #082D20 100%)"
          : "radial-gradient(circle at 84% 8%, #E0F2E7 0%, #F7F7F1 42%, #F0F2EA 100%)",
      color: tone === "green" ? COLORS.paper : COLORS.ink,
      fontFamily: FONT,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: tone === "green" ? 0.1 : 0.22,
        backgroundImage:
          "linear-gradient(#7DA08E22 1px, transparent 1px), linear-gradient(90deg, #7DA08E22 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: -180,
        right: -210,
        width: 620,
        height: 620,
        borderRadius: "50%",
        border: `90px solid ${tone === "green" ? "#FFFFFF10" : "#BFE5CF55"}`,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 86,
        left: 82,
        right: 82,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 23,
        letterSpacing: 2.2,
        fontWeight: 700,
        color: tone === "green" ? "#D9F1E3" : COLORS.muted,
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 13}}>
        <div
          style={{
            width: 12,
            height: 34,
            borderRadius: 999,
            backgroundColor: tone === "green" ? COLORS.lime : COLORS.green,
          }}
        />
        TÀI CHÍNH CÁ NHÂN
      </div>
      <div>{chapter}</div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 150,
        left: 82,
        right: 82,
        height: 2,
        backgroundColor: tone === "green" ? "#FFFFFF24" : "#1831281A",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 82,
        bottom: 330,
        fontSize: 22,
        letterSpacing: 2,
        fontWeight: 700,
        color: tone === "green" ? "#C7E5D3AA" : "#66766E88",
      }}
    >
      {scene}/07
    </div>
    {children}
  </AbsoluteFill>
);

export const Enter: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  from?: "bottom" | "left" | "right" | "scale";
}> = ({children, delay = 0, style, from = "bottom"}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({
    fps,
    frame: frame - delay,
    config: {damping: 200, stiffness: 160, mass: 0.7},
  });
  const translate = from === "left" ? "-70px 0px" : from === "right" ? "70px 0px" : "0px 42px";

  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1], clamp),
        translate: from === "scale" ? "0px 0px" : interpolate(progress, [0, 1], [translate, "0px 0px"], clamp),
        scale: from === "scale" ? interpolate(progress, [0, 1], [0.76, 1], {...clamp, output: "perceptual-scale"}) : 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode; tone?: "light" | "dark"}> = ({
  children,
  tone = "light",
}) => (
  <div
    style={{
      display: "inline-flex",
      padding: "12px 20px",
      borderRadius: 999,
      backgroundColor: tone === "dark" ? "#FFFFFF18" : COLORS.mint,
      color: tone === "dark" ? COLORS.lime : COLORS.deepGreen,
      fontSize: 27,
      fontWeight: 700,
      letterSpacing: 1.4,
    }}
  >
    {children}
  </div>
);

export const ShieldIcon: React.FC<{size?: number; fill?: string; accent?: string}> = ({
  size = 260,
  fill = COLORS.green,
  accent = COLORS.paper,
}) => (
  <svg width={size} height={size} viewBox="0 0 260 260" fill="none">
    <path
      d="M130 18C164 42 197 48 225 52V119C225 177 188 220 130 242C72 220 35 177 35 119V52C63 48 96 42 130 18Z"
      fill={fill}
    />
    <path
      d="M92 132L118 158L174 101"
      stroke={accent}
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FundJar: React.FC<{size?: number; level?: number; dark?: boolean}> = ({
  size = 250,
  level = 0.7,
  dark = false,
}) => (
  <div style={{position: "relative", width: size, height: size * 1.03}}>
    <div
      style={{
        position: "absolute",
        top: size * 0.03,
        left: size * 0.22,
        width: size * 0.56,
        height: size * 0.12,
        borderRadius: 999,
        backgroundColor: dark ? COLORS.lime : COLORS.deepGreen,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: size * 0.13,
        left: size * 0.12,
        width: size * 0.76,
        height: size * 0.77,
        border: `${Math.max(8, size * 0.045)}px solid ${dark ? "#E8F4EC" : COLORS.deepGreen}`,
        borderRadius: `${size * 0.13}px ${size * 0.13}px ${size * 0.24}px ${size * 0.24}px`,
        overflow: "hidden",
        backgroundColor: dark ? "#FFFFFF10" : COLORS.paper,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `${Math.max(0, Math.min(1, level)) * 100}%`,
          background: dark
            ? "linear-gradient(180deg, #CBEA75, #89C94A)"
            : "linear-gradient(180deg, #B9E9CD, #00A758)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.28,
          fontWeight: 700,
          color: dark ? COLORS.deepGreen : COLORS.paper,
        }}
      >
        ₫
      </div>
    </div>
  </div>
);

export const ExpenseChip: React.FC<{label: string; color?: string}> = ({
  label,
  color = COLORS.paper,
}) => (
  <div
    style={{
      minWidth: 245,
      padding: "22px 28px",
      borderRadius: 24,
      backgroundColor: color,
      boxShadow: "0 18px 45px #17352912",
      border: `1px solid ${COLORS.line}`,
      fontSize: 34,
      fontWeight: 700,
      textAlign: "center",
      color: COLORS.ink,
    }}
  >
    {label}
  </div>
);

export const CheckDot: React.FC = () => (
  <div
    style={{
      width: 46,
      height: 46,
      flex: "0 0 46px",
      borderRadius: "50%",
      backgroundColor: COLORS.green,
      color: COLORS.paper,
      fontSize: 30,
      fontWeight: 700,
      lineHeight: "46px",
      textAlign: "center",
    }}
  >
    ✓
  </div>
);

export const SoftCard: React.FC<{children: React.ReactNode; dark?: boolean; style?: React.CSSProperties}> = ({
  children,
  dark = false,
  style,
}) => (
  <div
    style={{
      borderRadius: 36,
      backgroundColor: dark ? "#FFFFFF10" : COLORS.paper,
      border: `1px solid ${dark ? "#FFFFFF24" : COLORS.line}`,
      boxShadow: dark ? "none" : "0 24px 70px #17352912",
      ...style,
    }}
  >
    {children}
  </div>
);

export const FadeAtEdges: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(
          frame,
          [0, Math.min(10, durationInFrames / 5), durationInFrames - fps * 0.22, durationInFrames],
          [0, 1, 1, 0],
          {
            ...clamp,
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.7, 0, 0.84, 0)],
          },
        ),
      }}
    >
      {children}
    </div>
  );
};
