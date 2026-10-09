import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {COLORS, Enter, FadeAtEdges, FundJar, Kicker, SceneCanvas, SoftCard, clamp} from "./shared";

const timeline = ["BẮT ĐẦU", "TIẾP DIỄN", "KÉO DÀI", "ÁP LỰC"];

export const Scene4Drain: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = interpolate(frame, [fps * 0.8, fps * 5.4], [0, 1], clamp);
  const level = interpolate(frame, [fps * 0.8, fps * 5.4], [0.82, 0.22], clamp);

  return (
    <FadeAtEdges>
      <SceneCanvas scene="04" chapter="GIỚI HẠN" tone="green">
        <Enter delay={4} style={{position: "absolute", top: 225, left: 82, right: 82}}>
          <Kicker tone="dark">KHI CHI PHÍ KÉO DÀI</Kicker>
        </Enter>
        <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
          <div style={{fontSize: 82, lineHeight: 1.03, fontWeight: 700, color: COLORS.paper}}>
            Khoản dự phòng
            <br />
            <span style={{color: COLORS.lime}}>có thể vơi nhanh.</span>
          </div>
        </Enter>

        <div style={{position: "absolute", top: 650, left: 82, right: 82, height: 620}}>
          <div style={{position: "absolute", left: 48, top: 105}}>
            <FundJar size={330} level={level} dark />
          </div>
          <SoftCard dark style={{position: "absolute", right: 0, top: 50, width: 470, height: 420, padding: 42}}>
            <div style={{fontSize: 27, letterSpacing: 1.8, fontWeight: 700, color: "#CBE4D5"}}>SỨC CHỊU DÒNG TIỀN</div>
            <div style={{fontSize: 72, lineHeight: 1, fontWeight: 700, color: COLORS.paper, marginTop: 26}}>
              Càng dài,
              <br />
              <span style={{color: COLORS.lime}}>càng mỏng.</span>
            </div>
            <div style={{height: 25, borderRadius: 999, backgroundColor: "#FFFFFF18", marginTop: 48, overflow: "hidden"}}>
              <div
                style={{
                  height: "100%",
                  width: `${interpolate(progress, [0, 1], [92, 24], clamp)}%`,
                  borderRadius: 999,
                  backgroundColor: COLORS.lime,
                }}
              />
            </div>
          </SoftCard>
        </div>

        <div style={{position: "absolute", top: 1270, left: 108, right: 108}}>
          <div style={{height: 12, borderRadius: 999, backgroundColor: "#FFFFFF20"}}>
            <div style={{height: "100%", width: `${progress * 100}%`, borderRadius: 999, backgroundColor: COLORS.lime}} />
          </div>
          <div style={{display: "flex", justifyContent: "space-between", marginTop: 27}}>
            {timeline.map((label, index) => {
              const active = progress >= index / (timeline.length - 1);
              return (
                <div key={label} style={{width: 205, textAlign: "center"}}>
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      margin: "0 auto",
                      borderRadius: "50%",
                      backgroundColor: active ? COLORS.lime : "#FFFFFF18",
                      border: `3px solid ${active ? COLORS.lime : "#FFFFFF34"}`,
                      color: COLORS.deepGreen,
                      fontWeight: 700,
                      fontSize: 25,
                      lineHeight: "58px",
                      scale: active ? 1 : 0.82,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{fontSize: 21, color: active ? COLORS.paper : "#FFFFFF70", marginTop: 14, fontWeight: 700}}>{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </SceneCanvas>
    </FadeAtEdges>
  );
};

