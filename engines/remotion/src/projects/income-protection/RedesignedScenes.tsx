import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

const C = {navy: "#082D43", navyDeep: "#061E2D", green: "#00A758", lime: "#C8E868", cream: "#F4F7F1", white: "#FFFFFF", coral: "#EF6B61", ink: "#102C3B", muted: "#657983"};
const FONT = '"Segoe UI Video", "Segoe UI", sans-serif';

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const Brand: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <div style={{position: "absolute", top: 82, left: 72, width: 270, height: 88, overflow: "hidden", borderRadius: 18, backgroundColor: dark ? "rgba(255,255,255,0.94)" : C.white, boxShadow: "0 12px 34px rgba(6,30,45,0.10)", zIndex: 20}}>
    <Img src={staticFile("assets/manulife/parent-child.png")} style={{position: "absolute", width: 1640, height: 626, left: -64, top: -50, maxWidth: "none"}} />
  </div>
);

const Tag: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark = false}) => (
  <div style={{position: "absolute", top: 105, right: 72, color: dark ? "rgba(255,255,255,0.78)" : C.muted, fontFamily: FONT, fontSize: 25, fontWeight: 700, letterSpacing: 2.4, zIndex: 20}}>{children}</div>
);

const Subtitle: React.FC<{children: React.ReactNode; dark?: boolean}> = ({children, dark = false}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <div style={{position: "absolute", left: 80, right: 80, bottom: 105, zIndex: 30, padding: "19px 26px 22px", borderRadius: 24, backgroundColor: dark ? "rgba(4,22,33,0.80)" : "rgba(255,255,255,0.93)", color: dark ? C.white : C.ink, fontFamily: FONT, fontSize: 42, fontWeight: 600, lineHeight: 1.22, textAlign: "center", boxShadow: "0 12px 34px rgba(6,30,45,0.12)", opacity: interpolate(frame, [5, 14, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], clamp), translate: `0 ${interpolate(frame, [5, 18], [28, 0], clamp)}px`}}>{children}</div>;
};

const FullPhoto: React.FC<{src: string; position?: string; shade?: "dark" | "light"}> = ({src, position = "center", shade = "dark"}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <>
    <Img src={staticFile(src)} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position, scale: interpolate(frame, [0, durationInFrames], [1.05, 1.13], clamp)}} />
    <div style={{position: "absolute", inset: 0, background: shade === "dark" ? "linear-gradient(180deg, rgba(4,25,38,0.20) 0%, rgba(4,25,38,0.42) 36%, rgba(4,25,38,0.96) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(244,247,241,0.96) 72%)"}} />
  </>;
};

const PhotoPanel: React.FC<{src: string; top: number; height: number; position?: string; darken?: boolean}> = ({src, top, height, position = "center", darken = false}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return <div style={{position: "absolute", top, left: 56, right: 56, height, borderRadius: 44, overflow: "hidden", boxShadow: "0 28px 70px rgba(6,30,45,0.18)"}}>
    <Img src={staticFile(src)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: position, scale: interpolate(frame, [0, durationInFrames], [1.03, 1.1], clamp)}} />
    {darken ? <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 35%, rgba(4,25,38,0.72))"}} /> : null}
  </div>;
};

export const RedesignedScene1: React.FC = () => {
  const frame = useCurrentFrame();
  return <div style={{position: "absolute", inset: 0, backgroundColor: C.navy}}>
    <FullPhoto src="assets/manulife/family-home.jpg" position="58% center" />
    <Brand dark /><Tag dark>BÀI TEST TÀI CHÍNH</Tag>
    <div style={{position: "absolute", left: 78, right: 78, top: 700, zIndex: 10, color: C.white, fontFamily: FONT}}>
      <div style={{fontSize: 58, fontWeight: 600, lineHeight: 1.08, opacity: interpolate(frame, [2, 15], [0, 1], clamp)}}>Nếu thu nhập dừng lại</div>
      <div style={{display: "flex", alignItems: "baseline", gap: 24, marginTop: 22, scale: interpolate(frame, [0, 32], [0.82, 1], clamp), transformOrigin: "left center"}}><span style={{fontSize: 270, lineHeight: 0.9, fontWeight: 700, color: C.lime, letterSpacing: -14}}>6</span><span style={{fontSize: 86, fontWeight: 700}}>THÁNG</span></div>
      <div style={{fontSize: 65, fontWeight: 700, lineHeight: 1.06, marginTop: 34}}>Gia đình bạn<br />trụ được bao lâu?</div>
    </div>
    <Subtitle dark>Nếu thu nhập dừng sáu tháng, gia đình bạn trụ được bao lâu?</Subtitle>
  </div>;
};

export const RedesignedScene2: React.FC = () => {
  const frame = useCurrentFrame(); const drain = interpolate(frame, [45, 118], [100, 0], clamp);
  return <div style={{position: "absolute", inset: 0, background: `linear-gradient(160deg, ${C.white}, #E8F4EE)`}}>
    <Brand /><Tag>DÒNG TIỀN</Tag>
    <PhotoPanel src="assets/manulife/family-planning.jpg" top={230} height={660} position="50% 48%" darken />
    <div style={{position: "absolute", top: 740, left: 95, zIndex: 8, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 700, lineHeight: 1.04}}>Một gia đình.<br />Một dòng tiền chính.</div>
    <div style={{position: "absolute", top: 965, left: 72, right: 72, padding: 42, borderRadius: 40, backgroundColor: C.white, boxShadow: "0 20px 55px rgba(6,30,45,0.12)"}}>
      <div style={{display: "flex", justifyContent: "space-between", fontFamily: FONT, fontWeight: 700, fontSize: 30, color: C.muted}}><span>THU NHẬP CHÍNH</span><span style={{color: drain > 8 ? C.green : C.coral}}>{drain > 8 ? "ĐANG CHẠY" : "TẠM DỪNG"}</span></div>
      <div style={{height: 44, borderRadius: 28, backgroundColor: "#E1EAE5", marginTop: 30, overflow: "hidden"}}><div style={{height: "100%", width: `${drain}%`, borderRadius: 28, backgroundColor: drain > 8 ? C.green : C.coral}} /></div>
      <div style={{fontFamily: FONT, fontSize: 47, fontWeight: 700, color: C.navy, marginTop: 34}}>Ngày mai, dòng tiền dừng lại.</div>
    </div>
    <Subtitle>Hãy tưởng tượng: ngày mai, dòng tiền chính của gia đình tạm dừng.</Subtitle>
  </div>;
};

const expenses = [["⌂", "Nhà ở"], ["◉", "Ăn uống"], ["✦", "Học phí"], ["ϟ", "Hóa đơn"]];
export const RedesignedScene3: React.FC = () => {
  const frame = useCurrentFrame();
  return <div style={{position: "absolute", inset: 0, backgroundColor: C.cream}}>
    <FullPhoto src="assets/manulife/family-home.jpg" position="center" shade="light" />
    <Brand /><Tag>CHI PHÍ</Tag>
    <div style={{position: "absolute", top: 250, left: 72, right: 72, fontFamily: FONT, color: C.navy, fontSize: 70, fontWeight: 700, lineHeight: 1.03}}>Cuộc sống vẫn<br />tiếp tục mỗi ngày.</div>
    <div style={{position: "absolute", top: 670, left: 72, right: 72, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24}}>{expenses.map(([icon,label], index) => <div key={label} style={{height: 205, borderRadius: 34, padding: 30, backgroundColor: "rgba(255,255,255,0.94)", boxShadow: "0 18px 45px rgba(6,30,45,0.11)", opacity: interpolate(frame, [10 + index * 12, 22 + index * 12], [0,1], clamp), translate: `0 ${interpolate(frame, [10 + index * 12, 26 + index * 12], [70,0], clamp)}px`}}><div style={{color: C.green, fontFamily: FONT, fontSize: 46, fontWeight: 700}}>{icon}</div><div style={{color: C.navy, fontFamily: FONT, fontSize: 38, fontWeight: 700, marginTop: 20}}>{label}</div></div>)}</div>
    <div style={{position: "absolute", top: 1180, left: 72, right: 72, padding: "30px 36px", borderRadius: 28, backgroundColor: C.navy, color: C.white, fontFamily: FONT, fontSize: 45, fontWeight: 700}}>Chi phí không có nút “tạm dừng”.</div>
    <Subtitle>Nhưng tiền nhà, tiền ăn, học phí và hóa đơn vẫn đến đúng hẹn.</Subtitle>
  </div>;
};

export const RedesignedScene4: React.FC = () => {
  const frame = useCurrentFrame(); const progress = interpolate(frame, [12, 185], [0, 1], clamp);
  return <div style={{position: "absolute", inset: 0, backgroundColor: C.navyDeep}}>
    <PhotoPanel src="assets/manulife/parent-child.png" top={205} height={680} position="100% center" darken />
    <Brand dark /><Tag dark>6 THÁNG</Tag>
    <div style={{position: "absolute", top: 720, left: 95, right: 95, color: C.white, fontFamily: FONT, fontSize: 58, fontWeight: 700, lineHeight: 1.05}}>Tháng đầu còn<br />có thể xoay xở.</div>
    <div style={{position: "absolute", top: 980, left: 72, right: 72}}><div style={{height: 14, borderRadius: 20, backgroundColor: "#315463"}}><div style={{width: `${progress * 100}%`, height: "100%", borderRadius: 20, backgroundColor: C.lime}} /></div><div style={{display: "flex", justifyContent: "space-between", marginTop: 30}}>{[1,2,3,4,5,6].map((m,i) => <div key={m} style={{width: 88, height: 88, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: progress >= i / 5 ? C.lime : "#234454", color: progress >= i / 5 ? C.navy : "#88A4B0", fontFamily: FONT, fontSize: 32, fontWeight: 700}}>T{m}</div>)}</div></div>
    <div style={{position: "absolute", top: 1215, left: 72, right: 72, color: C.white, fontFamily: FONT, fontSize: 54, fontWeight: 700, lineHeight: 1.08}}>Khoảng trống tài chính<br /><span style={{color: C.lime}}>rõ dần theo thời gian.</span></div>
    <Subtitle dark>Tháng đầu còn có thể xoay xở. Nhưng sang tháng hai, tháng ba, khoảng trống bắt đầu rõ hơn.</Subtitle>
  </div>;
};

export const RedesignedScene5: React.FC = () => {
  const frame = useCurrentFrame(); const level = interpolate(frame, [12, 145], [18, 88], clamp);
  return <div style={{position: "absolute", inset: 0, background: `linear-gradient(180deg, ${C.white}, #E8F3ED)`}}>
    <Brand /><Tag>MÔ PHỎNG ÁP LỰC</Tag>
    <PhotoPanel src="assets/manulife/family-planning.jpg" top={220} height={625} position="center" darken />
    <div style={{position: "absolute", top: 720, left: 95, color: C.white, fontFamily: FONT, fontSize: 56, fontWeight: 700}}>Áp lực tăng dần.</div>
    <div style={{position: "absolute", top: 930, left: 72, right: 72, height: 360, padding: 40, borderRadius: 40, backgroundColor: C.white, boxShadow: "0 20px 55px rgba(6,30,45,0.12)"}}><div style={{display: "flex", justifyContent: "space-between", fontFamily: FONT, fontSize: 30, fontWeight: 700, color: C.muted}}><span>MỖI KỲ THANH TOÁN</span><span style={{color: C.coral}}>ÁP LỰC</span></div><div style={{position: "absolute", left: 40, right: 40, bottom: 48, height: 180, borderRadius: 26, backgroundColor: "#EDF1EE", overflow: "hidden", display: "flex", alignItems: "flex-end"}}><div style={{width: "100%", height: `${level}%`, background: `linear-gradient(180deg, ${C.lime}, ${C.green} 65%, ${C.coral})`, borderRadius: 26}} /></div></div>
    <Subtitle>Áp lực không đến trong một ngày. Nó tăng lên theo từng khoản cần thanh toán.</Subtitle>
  </div>;
};

export const RedesignedScene6: React.FC = () => {
  const frame = useCurrentFrame();
  return <div style={{position: "absolute", inset: 0, backgroundColor: C.navy}}>
    <FullPhoto src="assets/manulife/family-hero.gif" position="100% center" />
    <Brand dark /><Tag dark>ĐỔI CÂU HỎI</Tag>
    <div style={{position: "absolute", top: 340, left: 72, right: 72, padding: 38, borderRadius: 34, backgroundColor: "rgba(255,255,255,0.91)", opacity: interpolate(frame, [6,20], [0,1], clamp)}}><div style={{fontFamily: FONT, color: C.muted, fontSize: 28, fontWeight: 700, letterSpacing: 1.5}}>KHÔNG PHẢI</div><div style={{fontFamily: FONT, color: C.navy, fontSize: 58, fontWeight: 700, lineHeight: 1.05, marginTop: 18}}>“Liệu có chuyện gì xảy ra không?”</div></div>
    <div style={{position: "absolute", top: 820, left: 72, right: 72, padding: 38, borderRadius: 34, backgroundColor: C.lime, opacity: interpolate(frame, [70,88], [0,1], clamp), translate: `${interpolate(frame, [70,92], [70,0], clamp)}px 0`}}><div style={{fontFamily: FONT, color: C.green, fontSize: 28, fontWeight: 700, letterSpacing: 1.5}}>MÀ LÀ</div><div style={{fontFamily: FONT, color: C.navy, fontSize: 61, fontWeight: 700, lineHeight: 1.05, marginTop: 18}}>“Mình đã chuẩn bị thế nào?”</div></div>
    <Subtitle dark>Câu hỏi không phải là: liệu có chuyện gì xảy ra không. Mà là: mình đã chuẩn bị thế nào?</Subtitle>
  </div>;
};

export const RedesignedScene7: React.FC = () => <div style={{position: "absolute", inset: 0, backgroundColor: C.navy}}>
  <FullPhoto src="assets/manulife/family-home.jpg" position="55% center" />
  <Brand dark /><Tag dark>KHOẢNG LẶNG</Tag>
  <div style={{position: "absolute", top: 600, left: 76, right: 76, color: C.white, fontFamily: FONT}}><div style={{fontSize: 32, fontWeight: 700, letterSpacing: 2.1, color: C.lime}}>NẾU THU NHẬP DỪNG LẠI...</div><div style={{fontSize: 92, fontWeight: 700, lineHeight: 1.02, marginTop: 30}}>Gia đình mình sẽ sống bằng gì?</div></div>
  <Subtitle dark>Nếu thu nhập dừng lại, gia đình mình sẽ sống bằng gì?</Subtitle>
</div>;

const checks = ["Chi phí tối thiểu", "Quỹ dự phòng", "Phương án bảo vệ thu nhập"];
export const RedesignedScene8: React.FC = () => {
  const frame = useCurrentFrame();
  return <div style={{position: "absolute", inset: 0, backgroundColor: C.navyDeep}}>
    <PhotoPanel src="assets/manulife/parent-child.png" top={195} height={650} position="100% center" darken />
    <Brand dark /><Tag dark>BẮT ĐẦU HÔM NAY</Tag>
    <div style={{position: "absolute", top: 710, left: 92, color: C.white, fontFamily: FONT, fontSize: 60, fontWeight: 700}}>Rà soát 3 điều.</div>
    <div style={{position: "absolute", top: 930, left: 72, right: 72, display: "flex", flexDirection: "column", gap: 20}}>{checks.map((check,index) => <div key={check} style={{minHeight: 112, padding: "22px 28px", borderRadius: 25, display: "flex", alignItems: "center", gap: 22, backgroundColor: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", opacity: interpolate(frame, [12+index*14,24+index*14], [0,1], clamp), translate: `${interpolate(frame, [12+index*14,28+index*14], [-60,0], clamp)}px 0`}}><div style={{width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.green, color: C.white, fontFamily: FONT, fontSize: 28, fontWeight: 700}}>✓</div><div style={{fontFamily: FONT, color: C.white, fontSize: 39, fontWeight: 600}}>{check}</div></div>)}</div>
    <div style={{position: "absolute", top: 1360, left: 72, right: 72, padding: "26px 30px", borderRadius: 24, backgroundColor: C.lime, color: C.navy, fontFamily: FONT, fontSize: 38, fontWeight: 700, textAlign: "center"}}>Chủ động bắt đầu từ một phép tính rõ ràng.</div>
    <Subtitle dark>Tối nay, hãy rà soát chi phí tối thiểu, quỹ dự phòng và phương án bảo vệ thu nhập của gia đình.</Subtitle>
  </div>;
};
