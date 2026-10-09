import {COLORS, CheckDot, Enter, FadeAtEdges, Kicker, SceneCanvas, SoftCard} from "./shared";

const checks = ["Tiền sẵn có?", "Phạm vi phù hợp?", "Hiểu điều khoản?"];

export const Scene7Takeaway: React.FC = () => (
  <FadeAtEdges>
    <SceneCanvas scene="07" chapter="TỰ RÀ SOÁT">
      <Enter delay={4} style={{position: "absolute", top: 225, left: 82, right: 82}}>
        <Kicker>2 CÔNG CỤ • 2 VAI TRÒ</Kicker>
      </Enter>
      <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
        <div style={{fontSize: 86, lineHeight: 1.01, fontWeight: 700}}>
          Một kế hoạch
          <br />
          <span style={{color: COLORS.green}}>chủ động hơn.</span>
        </div>
      </Enter>

      <div style={{position: "absolute", top: 650, left: 82, right: 82, display: "flex", justifyContent: "center", gap: 22}}>
        {[
          {number: "2", label: "CÔNG CỤ", color: COLORS.green},
          {number: "2", label: "VAI TRÒ", color: COLORS.deepGreen},
          {number: "1", label: "KẾ HOẠCH", color: COLORS.amber},
        ].map((item, index) => (
          <Enter key={item.label} delay={28 + index * 14} from="scale" style={{width: 290}}>
            <SoftCard style={{height: 285, padding: "28px 24px", textAlign: "center"}}>
              <div style={{fontSize: 130, lineHeight: 1, fontWeight: 700, color: item.color}}>{item.number}</div>
              <div style={{fontSize: 26, letterSpacing: 1.5, fontWeight: 700, color: COLORS.muted, marginTop: 20}}>{item.label}</div>
            </SoftCard>
          </Enter>
        ))}
      </div>

      <div style={{position: "absolute", top: 1030, left: 142, right: 142, display: "flex", flexDirection: "column", gap: 20}}>
        {checks.map((check, index) => (
          <Enter key={check} delay={74 + index * 13} from="left">
            <div
              style={{
                minHeight: 112,
                padding: "22px 30px",
                borderRadius: 28,
                backgroundColor: index === 2 ? COLORS.deepGreen : COLORS.paper,
                color: index === 2 ? COLORS.paper : COLORS.ink,
                display: "flex",
                alignItems: "center",
                gap: 25,
                border: `1px solid ${index === 2 ? COLORS.deepGreen : COLORS.line}`,
                boxShadow: "0 18px 50px #17352912",
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              <CheckDot />
              {check}
            </div>
          </Enter>
        ))}
      </div>
    </SceneCanvas>
  </FadeAtEdges>
);

