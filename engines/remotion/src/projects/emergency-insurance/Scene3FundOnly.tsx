import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {COLORS, Enter, ExpenseChip, FadeAtEdges, FundJar, Kicker, SceneCanvas, SoftCard, clamp} from "./shared";

const expenses = ["Sửa chữa", "Y tế", "Sinh hoạt"];

export const Scene3FundOnly: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const level = interpolate(frame, [fps * 1.2, fps * 6.4], [0.9, 0.56], clamp);

  return (
    <FadeAtEdges>
      <SceneCanvas scene="03" chapter="KỊCH BẢN A">
        <Enter delay={4} style={{position: "absolute", top: 225, left: 82, right: 82}}>
          <Kicker>QUỸ DỰ PHÒNG</Kicker>
        </Enter>
        <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
          <div style={{fontSize: 82, fontWeight: 700, lineHeight: 1.03}}>
            Có tiền dùng ngay
            <br />
            <span style={{color: COLORS.green}}>cho khoản cấp thiết.</span>
          </div>
        </Enter>

        <SoftCard style={{position: "absolute", top: 650, left: 82, right: 82, height: 610, padding: 48}}>
          <div style={{position: "absolute", left: 72, top: 110}}>
            <FundJar size={300} level={level} />
          </div>
          <div style={{position: "absolute", right: 54, top: 82, width: 370, display: "flex", flexDirection: "column", gap: 22}}>
            {expenses.map((expense, index) => (
              <Enter key={expense} delay={34 + index * 18} from="right">
                <ExpenseChip label={expense} />
              </Enter>
            ))}
          </div>
          <div style={{position: "absolute", left: 70, right: 70, bottom: 62}}>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: 27, fontWeight: 700, color: COLORS.muted}}>
              <span>SỐ DƯ DỰ PHÒNG</span>
              <span>DÙNG ĐƯỢC NGAY</span>
            </div>
            <div style={{height: 24, borderRadius: 999, backgroundColor: "#DFE7E2", marginTop: 18, overflow: "hidden"}}>
              <div
                style={{
                  height: "100%",
                  width: `${interpolate(frame, [fps * 1.2, fps * 6.4], [88, 56], clamp)}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.lime})`,
                }}
              />
            </div>
          </div>
        </SoftCard>

        <Enter delay={90} style={{position: "absolute", top: 1340, left: 82, right: 82}}>
          <div style={{fontSize: 47, lineHeight: 1.16, fontWeight: 600, color: COLORS.deepGreen, textAlign: "center"}}>
            Giảm nguy cơ phải <span style={{fontWeight: 700}}>vay gấp.</span>
          </div>
        </Enter>
      </SceneCanvas>
    </FadeAtEdges>
  );
};

