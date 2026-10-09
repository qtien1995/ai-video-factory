import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {COLORS, Enter, ExpenseChip, FadeAtEdges, Kicker, SceneCanvas, clamp} from "./shared";

export const Scene2Fork: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const branchProgress = interpolate(frame, [fps * 1.25, fps * 2.55], [0, 1], clamp);

  return (
    <FadeAtEdges>
      <SceneCanvas scene="02" chapter="TÌNH HUỐNG">
        <Enter delay={5} style={{position: "absolute", top: 225, left: 82, right: 82}}>
          <Kicker>CÙNG MỘT BIẾN CỐ</Kicker>
        </Enter>
        <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
          <div style={{fontSize: 78, lineHeight: 1.04, fontWeight: 700}}>
            Dòng tiền gia đình
            <br />
            <span style={{color: COLORS.coral}}>bị xáo trộn.</span>
          </div>
        </Enter>

        <div
          style={{
            position: "absolute",
            top: 650,
            left: 310,
            right: 310,
            opacity: interpolate(frame, [12, 28], [0, 1], clamp),
            translate: `0 ${interpolate(frame, [12, 42], [-90, 0], clamp)}px`,
          }}
        >
          <ExpenseChip label="CHI PHÍ BẤT NGỜ" color="#FFF4EA" />
        </div>

        <svg
          viewBox="0 0 916 520"
          style={{position: "absolute", top: 815, left: 82, width: 916, height: 520, overflow: "visible"}}
        >
          <path
            d="M458 0V135C458 185 230 175 230 260V335"
            fill="none"
            stroke={COLORS.green}
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - branchProgress}
          />
          <path
            d="M458 0V135C458 185 686 175 686 260V335"
            fill="none"
            stroke={COLORS.deepGreen}
            strokeWidth="14"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - branchProgress}
          />
          <circle cx="458" cy="8" r="18" fill={COLORS.amber} />
        </svg>

        <Enter delay={82} from="left" style={{position: "absolute", top: 1138, left: 82, width: 390}}>
          <div
            style={{
              padding: "30px 26px",
              borderRadius: 30,
              backgroundColor: COLORS.mint,
              border: `2px solid ${COLORS.green}`,
              textAlign: "center",
            }}
          >
            <div style={{fontSize: 28, fontWeight: 700, color: COLORS.green}}>KỊCH BẢN A</div>
            <div style={{fontSize: 42, fontWeight: 700, marginTop: 8}}>Chỉ có quỹ</div>
          </div>
        </Enter>
        <Enter delay={82} from="right" style={{position: "absolute", top: 1138, right: 82, width: 390}}>
          <div
            style={{
              padding: "30px 26px",
              borderRadius: 30,
              backgroundColor: COLORS.deepGreen,
              border: `2px solid ${COLORS.deepGreen}`,
              color: COLORS.paper,
              textAlign: "center",
            }}
          >
            <div style={{fontSize: 28, fontWeight: 700, color: COLORS.lime}}>KỊCH BẢN B</div>
            <div style={{fontSize: 42, fontWeight: 700, marginTop: 8}}>Có cả hai</div>
          </div>
        </Enter>
      </SceneCanvas>
    </FadeAtEdges>
  );
};

