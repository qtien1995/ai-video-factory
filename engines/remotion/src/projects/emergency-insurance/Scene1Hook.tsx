import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {COLORS, Enter, FadeAtEdges, FundJar, Kicker, SceneCanvas, ShieldIcon, clamp} from "./shared";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <FadeAtEdges>
      <SceneCanvas scene="01" chapter="CÂU HỎI">
        <Enter delay={4} style={{position: "absolute", top: 225, left: 82, right: 82}}>
          <Kicker>QUỸ DỰ PHÒNG HAY BẢO HIỂM?</Kicker>
        </Enter>
        <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
          <div style={{fontSize: 82, fontWeight: 700, lineHeight: 1.03, letterSpacing: -2.2}}>
            Có quỹ dự phòng rồi,
            <br />
            <span style={{color: COLORS.green}}>còn cần bảo hiểm?</span>
          </div>
        </Enter>

        <div style={{position: "absolute", top: 720, left: 74, right: 74, height: 500}}>
          <Enter
            delay={18}
            from="left"
            style={{position: "absolute", left: 15, top: 84, width: 330, textAlign: "center"}}
          >
            <FundJar size={275} level={0.78} />
            <div style={{fontSize: 31, fontWeight: 700, color: COLORS.deepGreen, marginTop: 18}}>TIỀN SẴN CÓ</div>
          </Enter>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 170,
              width: 126,
              height: 126,
              marginLeft: -63,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.ink,
              color: COLORS.lime,
              fontSize: 78,
              fontWeight: 700,
              scale: interpolate(frame, [fps * 0.7, fps * 1.45], [0.55, 1], {
                ...clamp,
                output: "perceptual-scale",
              }),
              rotate: interpolate(frame, [fps * 0.7, fps * 1.45], ["-18deg", "0deg"], clamp),
              boxShadow: "0 24px 50px #10251D25",
            }}
          >
            ?
          </div>
          <Enter
            delay={18}
            from="right"
            style={{position: "absolute", right: 15, top: 70, width: 330, textAlign: "center"}}
          >
            <ShieldIcon size={295} />
            <div style={{fontSize: 31, fontWeight: 700, color: COLORS.deepGreen, marginTop: 5}}>CHIA SẺ RỦI RO</div>
          </Enter>
        </div>

        <Enter delay={55} style={{position: "absolute", top: 1340, left: 82, right: 82}}>
          <div
            style={{
              padding: "31px 36px",
              borderRadius: 28,
              backgroundColor: COLORS.deepGreen,
              color: COLORS.paper,
              fontSize: 40,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Cùng xem <span style={{color: COLORS.lime}}>hai kịch bản.</span>
          </div>
        </Enter>
      </SceneCanvas>
    </FadeAtEdges>
  );
};

