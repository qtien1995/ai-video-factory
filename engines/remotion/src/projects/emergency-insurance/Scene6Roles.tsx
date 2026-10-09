import {COLORS, Enter, FadeAtEdges, FundJar, Kicker, SceneCanvas, ShieldIcon, SoftCard} from "./shared";

export const Scene6Roles: React.FC = () => (
  <FadeAtEdges>
    <SceneCanvas scene="06" chapter="KẾT LUẬN" tone="green">
      <Enter delay={4} style={{position: "absolute", top: 225, left: 82, right: 82}}>
        <Kicker tone="dark">KHÔNG THAY THẾ NHAU</Kicker>
      </Enter>
      <Enter delay={10} style={{position: "absolute", top: 330, left: 82, right: 82}}>
        <div style={{fontSize: 82, lineHeight: 1.03, fontWeight: 700, color: COLORS.paper}}>
          Mỗi công cụ
          <br />
          <span style={{color: COLORS.lime}}>có một vai trò.</span>
        </div>
      </Enter>

      <div style={{position: "absolute", top: 660, left: 82, right: 82, display: "flex", gap: 34}}>
        <Enter delay={28} from="left" style={{width: 441}}>
          <SoftCard dark style={{height: 620, padding: "44px 36px", textAlign: "center"}}>
            <div style={{height: 270, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <FundJar size={250} level={0.73} dark />
            </div>
            <div style={{fontSize: 44, fontWeight: 700, color: COLORS.paper, marginTop: 22}}>Tiền sẵn có</div>
            <div style={{fontSize: 29, lineHeight: 1.32, color: "#CBE1D4", marginTop: 22}}>Chủ động xử lý nhu cầu trước mắt</div>
          </SoftCard>
        </Enter>
        <Enter delay={44} from="right" style={{width: 441}}>
          <SoftCard dark style={{height: 620, padding: "44px 36px", textAlign: "center"}}>
            <div style={{height: 270, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <ShieldIcon size={250} fill={COLORS.lime} accent={COLORS.deepGreen} />
            </div>
            <div style={{fontSize: 44, fontWeight: 700, color: COLORS.paper, marginTop: 22}}>Chia sẻ rủi ro</div>
            <div style={{fontSize: 29, lineHeight: 1.32, color: "#CBE1D4", marginTop: 22}}>Theo phạm vi của hợp đồng bảo hiểm</div>
          </SoftCard>
        </Enter>
      </div>

      <Enter delay={90} from="scale" style={{position: "absolute", top: 1350, left: 260, right: 260}}>
        <div
          style={{
            padding: "27px 30px",
            borderRadius: 999,
            backgroundColor: COLORS.lime,
            color: COLORS.deepGreen,
            fontSize: 39,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Cần cả hai lớp phù hợp
        </div>
      </Enter>
    </SceneCanvas>
  </FadeAtEdges>
);

