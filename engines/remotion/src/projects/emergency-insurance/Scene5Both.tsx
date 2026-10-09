import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {COLORS, Enter, FadeAtEdges, FundJar, Kicker, SceneCanvas, ShieldIcon, SoftCard, clamp} from "./shared";

export const Scene5Both: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const flow = interpolate(frame, [fps * 1.7, fps * 5.1], [0, 1], clamp);

  return (
    <FadeAtEdges>
      <SceneCanvas scene="05" chapter="KỊCH BẢN B">
        <Enter delay={4} style={{position: "absolute", top: 225, left: 82, right: 82}}>
          <Kicker>QUỸ DỰ PHÒNG + BẢO HIỂM</Kicker>
        </Enter>
        <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
          <div style={{fontSize: 80, lineHeight: 1.03, fontWeight: 700}}>
            Hai công cụ,
            <br />
            <span style={{color: COLORS.green}}>hai phần việc.</span>
          </div>
        </Enter>

        <div style={{position: "absolute", top: 630, left: 82, right: 82, height: 700}}>
          <Enter delay={24} from="left" style={{position: "absolute", left: 0, top: 20, width: 410}}>
            <SoftCard style={{height: 570, padding: "40px 34px", textAlign: "center"}}>
              <div style={{fontSize: 28, fontWeight: 700, letterSpacing: 1.3, color: COLORS.green}}>TRƯỚC MẮT</div>
              <div style={{display: "flex", justifyContent: "center", marginTop: 32}}>
                <FundJar size={245} level={0.68} />
              </div>
              <div style={{fontSize: 41, fontWeight: 700, color: COLORS.deepGreen, marginTop: 22}}>Quỹ dự phòng</div>
              <div style={{fontSize: 28, lineHeight: 1.25, color: COLORS.muted, marginTop: 14}}>Xử lý nhu cầu cần tiền ngay</div>
            </SoftCard>
          </Enter>

          <Enter delay={46} from="right" style={{position: "absolute", right: 0, top: 20, width: 410}}>
            <SoftCard style={{height: 570, padding: "40px 34px", textAlign: "center", backgroundColor: COLORS.deepGreen}}>
              <div style={{fontSize: 28, fontWeight: 700, letterSpacing: 1.3, color: COLORS.lime}}>RỦI RO ĐƯỢC BẢO HIỂM</div>
              <div style={{display: "flex", justifyContent: "center", marginTop: 28}}>
                <ShieldIcon size={245} fill={COLORS.green} />
              </div>
              <div style={{fontSize: 41, fontWeight: 700, color: COLORS.paper, marginTop: 16}}>Bảo hiểm</div>
              <div style={{fontSize: 28, lineHeight: 1.25, color: "#CCE1D4", marginTop: 14}}>Chia sẻ gánh nặng theo hợp đồng</div>
            </SoftCard>
          </Enter>

          <div
            style={{
              position: "absolute",
              left: 410,
              top: 280,
              width: 96,
              height: 12,
              borderRadius: 999,
              backgroundColor: COLORS.green,
              scale: `${flow} 1`,
              transformOrigin: "left center",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 439,
              top: 245,
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: COLORS.lime,
              color: COLORS.deepGreen,
              fontSize: 44,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: flow,
              scale: interpolate(flow, [0, 1], [0.5, 1], {...clamp, output: "perceptual-scale"}),
            }}
          >
            +
          </div>
        </div>

        <Enter delay={132} style={{position: "absolute", top: 1342, left: 82, right: 82}}>
          <div
            style={{
              padding: "25px 32px",
              borderRadius: 24,
              backgroundColor: "#FFF5E7",
              border: `1px solid ${COLORS.amber}`,
              color: COLORS.ink,
              fontSize: 32,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Theo phạm vi và điều khoản hợp đồng
          </div>
        </Enter>
      </SceneCanvas>
    </FadeAtEdges>
  );
};

