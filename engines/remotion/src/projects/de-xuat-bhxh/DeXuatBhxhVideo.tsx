import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { BRIDGE_Y, C, CanyonBackdrop, DeliveryRider, FONT, FoundationLayers, SuspensionCable, TextHeader } from "./Scenes";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const DeXuatBhxhVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Master Timing (exact frames from beats.json & narration.mp3)
  // B001: 0 - 294 (0.00s - 9.81s)
  // B002: 294 - 550 (9.81s - 18.35s)
  // B003: 550 - 754 (18.35s - 25.14s)
  // B004: 754 - 1170 (25.14s - 39.01s)
  // B005: 1170 - 1411 (39.01s - 47.05s)
  // B006: 1411 - 1669 (47.05s - 55.63s)

  // 1. Suspension Cable Sag & Vibration Logic
  let sag = 18;
  let yVib = 0;
  let xOffset = 0;
  let riderStopped = false;
  let hasTruss = false;
  let hasStrands = false;
  let hasRoadway = false;
  let foundationProgress = 0;

  if (frame < 294) {
    // Beat 1: Rider moves in, smooth cruising
    const cruiseProg = interpolate(frame, [0, 180], [-220, 0], clamp);
    xOffset = cruiseProg;

    if (frame >= 195) {
      // Question drops -> cable dips & vibrates
      const dipProg = interpolate(frame, [195, 230, 294], [18, 65, 35], clamp);
      sag = dipProg;
      yVib = Math.sin((frame - 195) * 1.5) * 10 * interpolate(frame, [195, 294], [1, 0.3], clamp);
    } else {
      sag = 20 + Math.sin(frame * 0.1) * 3;
      yVib = Math.sin(frame * 0.4) * 2;
    }
  } else if (frame < 550) {
    // Beat 2: News proposal - Left truss extends out
    hasTruss = true;
    sag = 28;
    yVib = Math.sin(frame * 0.2) * 1.5;
    xOffset = 15;
  } else if (frame < 754) {
    // Beat 3: Reframe / Comparison
    sag = 38;
    yVib = Math.sin(frame * 0.3) * 3;
    xOffset = 20;
  } else if (frame < 1170) {
    // Beat 4: Financial Tension (wind & storm)
    const stormWobble = Math.sin(frame * 0.6) * 6;
    sag = 45 + Math.sin(frame * 0.15) * 8;
    yVib = stormWobble;
    xOffset = 20;
  } else if (frame < 1411) {
    // Beat 5: 4 Foundation Layers snap into place!
    hasTruss = true;
    hasStrands = true;
    hasRoadway = true;

    // Sequential layer locking
    if (frame >= 1180) foundationProgress = 1;
    if (frame >= 1235) foundationProgress = 2;
    if (frame >= 1290) foundationProgress = 3;
    if (frame >= 1345) foundationProgress = 4;

    sag = interpolate(frame, [1170, 1260], [38, 0], clamp);
    yVib = interpolate(frame, [1170, 1260], [3, 0], clamp);
    xOffset = interpolate(frame, [1170, 1411], [20, 50], clamp);
  } else {
    // Beat 6: Hero Close - Sunrise aura, solid bridge, rider resting
    hasTruss = true;
    hasStrands = true;
    hasRoadway = true;
    foundationProgress = 4;
    sag = 0;
    yVib = 0;
    xOffset = 50;
    riderStopped = true;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: C.bgDeep, overflow: "hidden", fontFamily: FONT }}>
      {/* Master Audio Track */}
      <Audio src={staticFile("audio/de-xuat-bhxh/narration.mp3")} volume={1} />

      {/* Global Canyon Backdrop */}
      <CanyonBackdrop />

      {/* Suspension Bridge & Cable System at BRIDGE_Y = 1220 */}
      <SuspensionCable
        sag={sag}
        hasTruss={hasTruss}
        hasStrands={hasStrands}
        hasRoadway={hasRoadway}
        baseY={BRIDGE_Y}
      />

      {/* Under-bridge Foundation Layers (Visible in Beat 5 & Beat 6) */}
      {foundationProgress > 0 && <FoundationLayers progress={foundationProgress} baseY={BRIDGE_Y + 28} />}

      {/* Delivery Rider Vehicle (Upscaled, Hero presence) */}
      <DeliveryRider xOffset={xOffset} yVibration={yVib} stopped={riderStopped} baseY={BRIDGE_Y} />

      {/* ============================================================== */}
      {/* SCENE 1: HOOK (Frames 0 - 294)                                 */}
      {/* ============================================================== */}
      {frame >= 0 && frame < 294 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Header */}
          <TextHeader
            title="LƯƠNG KHÔNG CẦN CÔNG TY TRẢ"
            subtitle="Tự do thu nhập — Tự làm chủ công việc"
            subColor={C.gold}
          />

          {/* Floating Job Badges (Upper Area: y: 320 to 580) */}
          {frame < 210 && (
            <div style={{ opacity: interpolate(frame, [185, 195], [1, 0], clamp) }}>
              <div style={{ position: "absolute", left: 50, right: 50, top: 310, display: "flex", justifyContent: "center", gap: 24 }}>
                {/* Grab / Be Badge */}
                {(() => {
                  const sp1 = spring({ frame: frame - 10, fps, config: { damping: 14 } });
                  return (
                    <div
                      style={{
                        opacity: interpolate(sp1, [0, 1], [0, 1], clamp),
                        transform: `translateY(${interpolate(sp1, [0, 1], [40, 0])}px) scale(${interpolate(sp1, [0, 1], [0.85, 1])})`,
                        background: "rgba(15, 23, 42, 0.92)",
                        border: "3px solid #22c55e",
                        borderRadius: 24,
                        padding: "16px 28px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        boxShadow: "0 15px 35px rgba(34, 197, 94, 0.35)",
                      }}
                    >
                      <span style={{ fontSize: 44 }}>🛵</span>
                      <div>
                        <div style={{ color: "#22c55e", fontWeight: 900, fontSize: 30 }}>TÀI XẾ CÔNG NGHỆ</div>
                        <div style={{ color: "#cbd5e1", fontSize: 22, marginTop: 2 }}>Grab • Be • ShopeeFood</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Shopee / TikTok Shop Badge */}
                {(() => {
                  const sp2 = spring({ frame: frame - 40, fps, config: { damping: 14 } });
                  return (
                    <div
                      style={{
                        opacity: interpolate(sp2, [0, 1], [0, 1], clamp),
                        transform: `translateY(${interpolate(sp2, [0, 1], [40, 0])}px) scale(${interpolate(sp2, [0, 1], [0.85, 1])})`,
                        background: "rgba(15, 23, 42, 0.92)",
                        border: "3px solid #f97316",
                        borderRadius: 24,
                        padding: "16px 28px",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        boxShadow: "0 15px 35px rgba(249, 115, 22, 0.35)",
                      }}
                    >
                      <span style={{ fontSize: 44 }}>📦</span>
                      <div>
                        <div style={{ color: "#f97316", fontWeight: 900, fontSize: 30 }}>SELLER ONLINE</div>
                        <div style={{ color: "#cbd5e1", fontSize: 22, marginTop: 2 }}>Shopee • TikTok Shop</div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Third Badge: Freelancer */}
              {(() => {
                const sp3 = spring({ frame: frame - 70, fps, config: { damping: 14 } });
                return (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 460,
                      transform: `translateX(-50%) translateY(${interpolate(sp3, [0, 1], [30, 0])}px) scale(${interpolate(sp3, [0, 1], [0.85, 1])})`,
                      opacity: interpolate(sp3, [0, 1], [0, 1], clamp),
                      background: "rgba(15, 23, 42, 0.92)",
                      border: "3px solid #06b6d4",
                      borderRadius: 24,
                      padding: "16px 40px",
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      whiteSpace: "nowrap",
                      boxShadow: "0 15px 35px rgba(6, 182, 212, 0.35)",
                    }}
                  >
                    <span style={{ fontSize: 40 }}>💻</span>
                    <span style={{ color: "#38bdf8", fontWeight: 900, fontSize: 30, whiteSpace: "nowrap" }}>
                      FREELANCER • KINH DOANH TỰ DO
                    </span>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Gold Coin Particles into Rider's Cargo Box */}
          {frame < 195 &&
            [0, 1, 2, 3].map((i) => {
              const particleFrame = (frame + i * 22) % 60;
              const pX = interpolate(particleFrame, [0, 60], [280 + i * 150, 540], clamp);
              const pY = interpolate(particleFrame, [0, 60], [580, 1160], clamp);
              const pOp = interpolate(particleFrame, [0, 10, 50, 60], [0, 1, 1, 0], clamp);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: pX,
                    top: pY,
                    opacity: pOp,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #fef08a 25%, #f59e0b 90%)",
                    border: "3px solid #fff",
                    boxShadow: "0 0 20px rgba(250, 204, 21, 0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#78350f",
                    zIndex: 48,
                  }}
                >
                  ₫
                </div>
              );
            })}

          {/* Hook Question Drop at frame 195 (Upper-Middle Area: y: 480 to 760) */}
          {frame >= 195 && (
            <div
              style={{
                position: "absolute",
                left: 60,
                right: 60,
                top: 480,
                padding: "36px 36px",
                borderRadius: 32,
                background: "linear-gradient(135deg, rgba(220, 38, 38, 0.98), rgba(153, 27, 27, 0.98))",
                border: "4px solid #fecaca",
                boxShadow: "0 25px 60px rgba(239, 68, 68, 0.7)",
                textAlign: "center",
                transform: `scale(${spring({ frame: frame - 195, fps, config: { damping: 10 } })})`,
                zIndex: 65,
              }}
            >
              <div style={{ color: "#fef08a", fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: 2 }}>
                ⚠️ CÂU HỎI ĐẶT RA:
              </div>
              <div style={{ color: "#ffffff", fontSize: 46, fontWeight: 900, lineHeight: 1.25 }}>
                LÚC KHÔNG KIẾM ĐƯỢC TIỀN THÌ SAO?
              </div>
            </div>
          )}

          {/* Lower Canyon Tension Banner (Filling space under bridge: y: 1320 to 1540) */}
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 1320,
              background: "rgba(15, 23, 42, 0.85)",
              border: "2px dashed #f59e0b",
              borderRadius: 24,
              padding: "24px 32px",
              textAlign: "center",
              zIndex: 35,
              boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
            }}
          >
            <div style={{ color: "#facc15", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
              ⚡ CẢNH BÁO KHOẢNG TRỐNG AN TOÀN
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 24, fontWeight: 600, lineHeight: 1.4 }}>
              Dưới dây cáp hiện tại là vực thẳm — hoàn toàn chưa có lưới đỡ hay bảo hiểm mặc định!
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 2: NEWS TRIGGER (Frames 294 - 550)                       */}
      {/* ============================================================== */}
      {frame >= 294 && frame < 550 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Header */}
          <TextHeader
            title="ĐỀ XUẤT MỞ RỘNG AN SINH"
            subtitle="(Đang nghiên cứu — chưa phải quy định áp dụng)"
            subColor={C.cyanLight}
          />

          {/* Upper News Trigger Card (y: 310 to 760) */}
          {(() => {
            const relFrame = frame - 294;
            const enterScale = spring({ frame: relFrame, fps, config: { damping: 12 } });
            return (
              <div
                style={{
                  position: "absolute",
                  left: 60,
                  right: 60,
                  top: 320,
                  transform: `scale(${enterScale})`,
                  background: "linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(30, 41, 59, 0.97))",
                  border: "4px solid #38bdf8",
                  borderRadius: 32,
                  padding: "36px 36px",
                  boxShadow: "0 30px 70px rgba(6, 182, 212, 0.4)",
                  zIndex: 65,
                }}
              >
                {/* Official Tag */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div
                    style={{
                      background: "rgba(56, 189, 248, 0.25)",
                      border: "2px solid #38bdf8",
                      borderRadius: 14,
                      padding: "8px 20px",
                      color: "#38bdf8",
                      fontSize: 24,
                      fontWeight: 900,
                      letterSpacing: 1.5,
                    }}
                  >
                    🏛️ TIN CHÍNH SÁCH MỚI
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 24, fontWeight: 700 }}>22/09/2026</div>
                </div>

                {/* Main Content */}
                <div style={{ color: "#ffffff", fontSize: 38, fontWeight: 900, lineHeight: 1.35, marginBottom: 22 }}>
                  Đề xuất nghiên cứu đưa{" "}
                  <span style={{ color: "#facc15" }}>Tài xế công nghệ</span> &amp;{" "}
                  <span style={{ color: "#38bdf8" }}>Seller sàn TMĐT</span> vào diện BHXH, BHYT bắt buộc.
                </div>

                {/* Status Notice */}
                <div
                  style={{
                    background: "rgba(245, 158, 11, 0.18)",
                    borderLeft: "6px solid #f59e0b",
                    padding: "16px 20px",
                    borderRadius: "0 16px 16px 0",
                    color: "#fde68a",
                    fontSize: 24,
                    fontWeight: 800,
                    lineHeight: 1.35,
                  }}
                >
                  📌 Giai đoạn: Nghiên cứu, lấy ý kiến chuyên môn hoàn thiện khung pháp lý (Chưa ban hành áp dụng chính thức).
                </div>
              </div>
            );
          })()}

          {/* Left Cliff Truss Label */}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 1080,
              color: "#38bdf8",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2,
              background: "rgba(3, 7, 18, 0.95)",
              padding: "10px 22px",
              borderRadius: 16,
              border: "2px solid #0284c7",
              boxShadow: "0 10px 25px rgba(0,0,0,0.85)",
              zIndex: 50,
            }}
          >
            TRỤ NEO: AN SINH XÃ HỘI ➔
          </div>

          {/* Lower Audience Scope Breakdown (Filling space under bridge: y: 1300 to 1540) */}
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 1300,
              background: "rgba(15, 23, 42, 0.92)",
              border: "2px solid #0284c7",
              borderRadius: 24,
              padding: "24px 30px",
              zIndex: 35,
              boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: 26, fontWeight: 900, marginBottom: 10 }}>
              🎯 NHÓM LAO ĐỘNG ĐƯỢC ĐỀ XUẤT NGHIÊN CỨU:
            </div>
            <div style={{ color: "#f8fafc", fontSize: 23, lineHeight: 1.5, display: "flex", flexDirection: "column", gap: 6 }}>
              <div>• <strong>Tài xế công nghệ:</strong> Grab, Be, ShopeeFood, Gojek...</div>
              <div>• <strong>Chủ shop online:</strong> Kinh doanh trên sàn Shopee, TikTok Shop...</div>
              <div>• <strong>Lao động tự do:</strong> Người tự tạo thu nhập ngoài mô hình doanh nghiệp</div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 3: REFRAME / COMPARISON (Frames 550 - 754)               */}
      {/* ============================================================== */}
      {frame >= 550 && frame < 754 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Header */}
          <TextHeader
            title="TỰ DO THU NHẬP ➔ TỰ LO NHIỀU HƠN"
            subtitle="Chạm vào bài toán cốt lõi của người làm tự do"
            subColor={C.gold}
          />

          {/* Upper Comparison Columns (y: 330 to 880) */}
          <div style={{ position: "absolute", left: 50, right: 50, top: 330, display: "flex", gap: 24, zIndex: 65 }}>
            {/* Left: Làm Công Ty */}
            <div
              style={{
                flex: 1,
                background: "linear-gradient(180deg, rgba(30, 41, 59, 0.97), rgba(15, 23, 42, 0.97))",
                border: "3px solid #3b82f6",
                borderRadius: 28,
                padding: "32px 24px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65)",
              }}
            >
              <div style={{ color: "#60a5fa", fontSize: 32, fontWeight: 900, marginBottom: 18, textAlign: "center" }}>
                🏢 LÀM CÔNG TY
              </div>
              <div style={{ color: "#f8fafc", fontSize: 24, lineHeight: 1.55, display: "flex", flexDirection: "column", gap: 14 }}>
                <div>✅ Tự động trích nộp BHXH &amp; BHYT</div>
                <div>✅ Có chế độ ốm đau, thai sản, tai nạn</div>
                <div>✅ Có công đoàn &amp; quy chế đỡ đòn rủi ro</div>
              </div>
              <div
                style={{
                  marginTop: 24,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(59, 130, 246, 0.25)",
                  color: "#93c5fd",
                  fontSize: 22,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                Cầu kiên cố — Có sẵn rào chắn
              </div>
            </div>

            {/* Right: Làm Tự Do */}
            <div
              style={{
                flex: 1,
                background: "linear-gradient(180deg, rgba(55, 30, 15, 0.97), rgba(20, 10, 5, 0.97))",
                border: "3px solid #f59e0b",
                borderRadius: 28,
                padding: "32px 24px",
                boxShadow: "0 20px 50px rgba(245, 158, 11, 0.3)",
              }}
            >
              <div style={{ color: "#facc15", fontSize: 32, fontWeight: 900, marginBottom: 18, textAlign: "center" }}>
                ⚡ LÀM TỰ DO
              </div>
              <div style={{ color: "#fef08a", fontSize: 24, lineHeight: 1.55, display: "flex", flexDirection: "column", gap: 14 }}>
                <div>✨ Tiền về tay trọn vẹn 100% tài khoản</div>
                <div>⚠️ KHÔNG có sẵn lưới đỡ tự động</div>
                <div>⚠️ Tự chịu trách nhiệm 100% viện phí, nghỉ việc</div>
              </div>
              <div
                style={{
                  marginTop: 24,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(245, 158, 11, 0.25)",
                  color: "#fde68a",
                  fontSize: 22,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                Tự bước đi trên sợi dây cáp
              </div>
            </div>
          </div>

          {/* Lower Abyss Risk Warning (Filling space under bridge: y: 1300 to 1540) */}
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 1300,
              background: "linear-gradient(135deg, rgba(30, 10, 10, 0.95), rgba(15, 23, 42, 0.95))",
              border: "3px solid #ef4444",
              borderRadius: 26,
              padding: "24px 32px",
              textAlign: "center",
              zIndex: 35,
              boxShadow: "0 20px 45px rgba(239, 68, 68, 0.35)",
            }}
          >
            <div style={{ color: "#ef4444", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
              ⚠️ KHOẢNG TRỐNG TỰ LO 100%
            </div>
            <div style={{ color: "#fca5a5", fontSize: 24, fontWeight: 700, lineHeight: 1.4 }}>
              Khi ốm đau, sự cố xe cộ hay sàn siết chính sách… bạn có phương án dự phòng nào chưa?
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 4: FINANCIAL TENSION (Frames 754 - 1170)                  */}
      {/* ============================================================== */}
      {frame >= 754 && frame < 1170 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Header */}
          <TextHeader
            title="TIỀN VỀ MÌNH 100%"
            subtitle="AN SINH CŨNG PHẢI TỰ LO"
            subColor={C.amber}
          />

          {/* Wind gust lines */}
          {[0, 1, 2, 3].map((w) => {
            const windPos = ((frame * 28 + w * 280) % 1600) - 200;
            return (
              <div
                key={w}
                style={{
                  position: "absolute",
                  left: windPos,
                  top: 920 + w * 80,
                  width: 380,
                  height: 4,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                  borderRadius: 2,
                  zIndex: 38,
                }}
              />
            );
          })}

          {/* Upper 4 Carabiners Stack (y: 290 to 860) */}
          <div
            style={{
              position: "absolute",
              left: 50,
              right: 50,
              top: 290,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              zIndex: 65,
            }}
          >
            {[
              { label: "1. Quỹ dự phòng khẩn cấp", desc: "Tối thiểu 3–6 tháng chi phí sinh hoạt tối thiểu", icon: "🛡️" },
              { label: "2. Bảo hiểm y tế & Sức khỏe", desc: "Chi trả viện phí lớn, không phải rút vốn làm ăn", icon: "🏥" },
              { label: "3. Gián đoạn công việc", desc: "Lúc ốm đau, hỏng phương tiện, sàn giảm đơn", icon: "⚙️" },
              { label: "4. Quỹ hưu trí & Tuổi già", desc: "Tích lũy dài hạn tự chủ cho tương lai", icon: "🌱" },
            ].map((item, idx) => {
              const itemRelFrame = frame - 754 - idx * 45;
              const isRevealed = itemRelFrame > 0;
              const spItem = spring({ frame: Math.max(0, itemRelFrame), fps, config: { damping: 14 } });

              return (
                <div
                  key={idx}
                  style={{
                    opacity: isRevealed ? interpolate(spItem, [0, 1], [0, 1], clamp) : 0,
                    transform: isRevealed
                      ? `translateX(${interpolate(spItem, [0, 1], [-40, 0])}px)`
                      : "translateX(-40px)",
                    background: "rgba(15, 23, 42, 0.96)",
                    border: "3px solid #ef4444",
                    borderRadius: 22,
                    padding: "16px 26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 12px 35px rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <span style={{ fontSize: 38 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 900 }}>{item.label}</div>
                      <div style={{ color: "#cbd5e1", fontSize: 22, marginTop: 3 }}>{item.desc}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.25)",
                      border: "2px solid #ef4444",
                      borderRadius: 12,
                      padding: "8px 16px",
                      color: "#fecaca",
                      fontSize: 20,
                      fontWeight: 900,
                      letterSpacing: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    PHẢI TỰ TÍNH
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Tension Alert Card (Filling space under bridge: y: 1300 to 1540) */}
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 1300,
              textAlign: "center",
              background: "rgba(0,0,0,0.92)",
              border: "3px solid #f59e0b",
              borderRadius: 24,
              padding: "24px 32px",
              boxShadow: "0 15px 40px rgba(245, 158, 11, 0.35)",
              zIndex: 60,
            }}
          >
            <div style={{ color: "#facc15", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>
              ⚠️ CƠN LỐC CHI PHÍ KHÔNG BÁO TRƯỚC:
            </div>
            <div style={{ color: "#fde68a", fontSize: 24, fontWeight: 700, lineHeight: 1.4 }}>
              Tiền về 100% nếu không trích trước vào các chốt an toàn, khi gặp biến cố sẽ rất dễ hụt chân!
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 5: CORE INSIGHT & BRIDGE TRANSFORMATION (1170 - 1411)    */}
      {/* ============================================================== */}
      {frame >= 1170 && frame < 1411 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Header */}
          <TextHeader
            title="TỰ DO HƠN ≠ ÍT TRÁCH NHIỆM HƠN"
            subtitle="Tự do thực sự là tự chủ xây hệ thống bảo vệ"
            subColor={C.greenLight}
          />

          {/* Transformation Announcement Card (y: 320 to 540) */}
          <div
            style={{
              position: "absolute",
              left: 50,
              right: 50,
              top: 320,
              background: "linear-gradient(135deg, rgba(6, 78, 59, 0.98), rgba(15, 23, 42, 0.98))",
              border: "4px solid #10b981",
              borderRadius: 32,
              padding: "36px 36px",
              textAlign: "center",
              boxShadow: "0 25px 60px rgba(16, 185, 129, 0.45)",
              zIndex: 65,
            }}
          >
            <div style={{ color: "#6ee7b7", fontSize: 26, fontWeight: 900, letterSpacing: 2, marginBottom: 12 }}>
              ✨ BƯỚC CHUYỂN TƯ DUY:
            </div>
            <div style={{ color: "#ffffff", fontSize: 42, fontWeight: 900, lineHeight: 1.3 }}>
              Biến sợi dây cáp chông chênh thành{" "}
              <span style={{ color: "#facc15" }}>Cây Cầu Treo An Sinh Vững Chắc</span>
            </div>
          </div>

          {/* Progress Status Bar (y: 570 to 670) */}
          <div
            style={{
              position: "absolute",
              left: 60,
              right: 60,
              top: 570,
              background: "rgba(15, 23, 42, 0.94)",
              border: "3px solid #38bdf8",
              borderRadius: 24,
              padding: "20px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 65,
              boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: 26, fontWeight: 900 }}>
              🔩 KHÓA CHỐT 4 TẦNG AN SINH DƯỚI SÀN CẦU:
            </div>
            <div style={{ color: "#facc15", fontSize: 26, fontWeight: 900 }}>
              {foundationProgress === 0 && "BẮT ĐẦU..."}
              {foundationProgress === 1 && "TẦNG 1: DỰ PHÒNG 🔒"}
              {foundationProgress === 2 && "TẦNG 2: BHYT/BHXH 🔒"}
              {foundationProgress === 3 && "TẦNG 3: BẢO VỆ 🔒"}
              {foundationProgress === 4 && "HOÀN THÀNH 4 TẦNG 🔒"}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 6: HERO CLOSE (Frames 1411 - 1669)                        */}
      {/* ============================================================== */}
      {frame >= 1411 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Hero Main Card (Upper Area: y: 180 to 760) */}
          {(() => {
            const relFrame = frame - 1411;
            const heroSpring = spring({ frame: relFrame, fps, config: { damping: 13 } });
            return (
              <div
                style={{
                  position: "absolute",
                  left: 50,
                  right: 50,
                  top: 180,
                  transform: `scale(${heroSpring})`,
                  background: "linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)",
                  border: "5px solid #facc15",
                  borderRadius: 36,
                  padding: "44px 38px",
                  boxShadow: "0 35px 90px rgba(250, 204, 21, 0.4)",
                  textAlign: "center",
                  zIndex: 65,
                }}
              >
                {/* Header Tag */}
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(250, 204, 21, 0.25)",
                    border: "2px solid #facc15",
                    borderRadius: 16,
                    padding: "8px 26px",
                    color: "#facc15",
                    fontSize: 26,
                    fontWeight: 900,
                    letterSpacing: 2,
                    marginBottom: 24,
                  }}
                >
                  💡 CÂU HỎI TRỌNG TÂM
                </div>

                {/* Big Core Question */}
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: 48,
                    fontWeight: 900,
                    lineHeight: 1.25,
                    letterSpacing: "-1px",
                    marginBottom: 28,
                  }}
                >
                  NẾU CÓ VÀI THÁNG KHÔNG KIẾM ĐƯỢC TIỀN…
                  <br />
                  <span style={{ color: "#38bdf8", textShadow: "0 0 30px rgba(56, 189, 248, 0.7)" }}>
                    HỆ THỐNG CỦA MÌNH CHỊU ĐƯỢC BAO LÂU?
                  </span>
                </div>

                {/* Core Takeaway */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 20,
                    padding: "20px 26px",
                    color: "#f8fafc",
                    fontSize: 28,
                    fontWeight: 800,
                    lineHeight: 1.45,
                  }}
                >
                  Tự do bền vững không chỉ là kiếm được bao nhiêu mỗi tháng.
                  <br />
                  <span style={{ color: "#fef08a" }}>
                    Mà là chủ động tạo lưới an sinh để đứng vững trước mọi biến cố.
                  </span>
                </div>

                {/* Call to Reflection */}
                <div
                  style={{
                    marginTop: 24,
                    color: "#94a3b8",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  CHỦ ĐỘNG TÌM HIỂU &amp; THIẾT LẬP KẾ HOẠCH AN SINH CHO CHÍNH BẠN
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ============================================================== */}
      {/* PERSISTENT SUBTITLE BAR (Bottom Safe Zone: y: 1630 - 1770)      */}
      {/* ============================================================== */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 110,
          display: "flex",
          justifyContent: "center",
          zIndex: 70,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(3, 7, 18, 0.95)",
            border: "2px solid rgba(255, 255, 255, 0.25)",
            borderRadius: 24,
            padding: "20px 36px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.85)",
            maxWidth: 1000,
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.38,
              textShadow: "0 3px 12px rgba(0,0,0,0.9)",
            }}
          >
            {frame < 294 && "Lương không cần công ty trả nữa. Chạy Grab, bán Shopee, freelance… tự kiếm tiền vẫn được."}
            {frame >= 294 && frame < 550 && "Mới đây có đề xuất nghiên cứu đưa tài xế công nghệ, người kinh doanh online vào diện BHXH, BHYT bắt buộc."}
            {frame >= 550 && frame < 754 && "Nghe thì giống chuyện luật, nhưng nghĩ kỹ nó chạm đúng vấn đề cốt lõi của người tự kiếm tiền."}
            {frame >= 754 && frame < 1170 && "Đi làm công ty có sẵn chuẩn bị. Tự kinh doanh tiền về tay 100%, nhưng mọi rủi ro mình đều phải tự tính."}
            {frame >= 1170 && frame < 1411 && "Cái giá của tự do không chỉ là thu nhập thất thường, mà là phải tự xây luôn hệ thống an sinh cho chính mình."}
            {frame >= 1411 && "Nếu có vài tháng không kiếm được tiền… hệ thống an sinh của bạn chịu được bao lâu?"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
