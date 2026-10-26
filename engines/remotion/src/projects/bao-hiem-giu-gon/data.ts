export interface SceneMeta {
  id: string;
  startFrame: number;
  endFrame: number;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: "s1_hook",
    startFrame: 0,
    endFrame: 255,
    eyebrow: "KỲ VỌNG VS THỰC TẾ",
    title: "TÂM LÝ SAI LẦM PHỔ BIẾN",
    subtitle: "Mua bảo hiểm với tư duy đi gửi tiết kiệm",
  },
  {
    id: "s2_problem",
    startFrame: 255,
    endFrame: 480,
    eyebrow: "CÚ SỐC HUỀ VỐN",
    title: "SỰ THẬT BỊ MẬP MỜ",
    subtitle: "Cứ đóng 10 năm rồi rút cả gốc lẫn lãi?",
  },
  {
    id: "s3_solution",
    startFrame: 480,
    endFrame: 985,
    eyebrow: "QUY LUẬT NỀN TẢNG",
    title: "KHÔNG CÓ BỮA TRƯA MIỄN PHÍ",
    subtitle: "Bảo lãnh viện phí & sinh mạng tiền tỷ không bao giờ miễn phí",
  },
  {
    id: "s4_workflow",
    startFrame: 985,
    endFrame: 1545,
    eyebrow: "CƠ CHẾ DÒNG TIỀN",
    title: "BÓC TÁCH 100 ĐỒNG PHÍ NỘP VÀO",
    subtitle: "Chi phí rủi ro thuê vệ sĩ 24/7 vs Quỹ tích lũy đầu tư",
  },
  {
    id: "s5_benefits",
    startFrame: 1545,
    endFrame: 1885,
    eyebrow: "CHIẾN LƯỢC TÀI CHÍNH",
    title: "TẤN CÔNG VS PHÒNG THỦ",
    subtitle: "Làm giàu bằng ngân hàng & bảo vệ chống nghèo bằng bảo hiểm",
  },
  {
    id: "s6_outro",
    startFrame: 1885,
    endFrame: 2100,
    eyebrow: "ĐÚC KẾT GIA SẢN",
    title: "GIỮ GÔN — KHÔNG GHI BÀN",
    subtitle: "Nhiệm vụ cốt lõi của bảo hiểm là bảo vệ khung thành",
  },
];
