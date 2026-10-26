export interface DataPoint {
  date: string; // "YYYY" or "YYYY-MM"
  year: number;
  month: number;
  flex: number; // in millions VND
  savings: number; // in millions VND
  event?: string;
  subtitle?: {
    text: string;
    highlight: string;
  };
}

export const ASSETS_META = [
  {
    id: "flex",
    name: "Xanh Phú Quý Flex",
    code: "FLEX",
    color: "#10b981",
    logoBg: "#059669",
    tagline: "Quỹ Tăng Trưởng + Khiên 1,5 Tỷ",
    isLeaderAtEnd: true
  },
  {
    id: "savings",
    name: "Gửi tiết kiệm ngân hàng",
    code: "GTK",
    color: "#94a3b8",
    logoBg: "#475569",
    tagline: "Lãi suất 5.5%/năm",
    isBenchmark: true
  }
];

export const TIMELINE_DATA: DataPoint[] = [
  {
    date: "2026-01",
    year: 2026,
    month: 1,
    flex: 9,
    savings: 32,
    subtitle: {
      text: "Mỗi năm tích lũy 30 triệu đồng",
      highlight: "30 triệu đồng"
    }
  },
  {
    date: "2027-01",
    year: 2027,
    month: 1,
    flex: 30,
    savings: 65,
    subtitle: {
      text: "Năm thứ 2: Sổ tiết kiệm tạm thời dẫn trước",
      highlight: "dẫn trước"
    }
  },
  {
    date: "2028-01",
    year: 2028,
    month: 1,
    flex: 60,
    savings: 100,
    event: "Khiên 1.5 Tỷ",
    subtitle: {
      text: "Năm 3: Tiết kiệm đạt 100 triệu, nhưng Flex bật khiên 1,5 tỷ",
      highlight: "khiên 1,5 tỷ"
    }
  },
  {
    date: "2030-01",
    year: 2030,
    month: 1,
    flex: 140,
    savings: 177,
    event: "Gieo mầm",
    subtitle: {
      text: "Năm 5: Hết phí ban đầu, Flex tiệm cận vốn gốc",
      highlight: "tiệm cận vốn gốc"
    }
  },
  {
    date: "2032-01",
    year: 2032,
    month: 1,
    flex: 235,
    savings: 261,
    subtitle: {
      text: "Khoảng cách giữa hai kênh dần được thu hẹp",
      highlight: "thu hẹp"
    }
  },
  {
    date: "2035-01",
    year: 2035,
    month: 1,
    flex: 415,
    savings: 408,
    event: "Đổi ngôi 415 tr",
    subtitle: {
      text: "Năm 10: Thưởng duy trì giúp Flex vượt lên 415 triệu!",
      highlight: "vượt lên 415 triệu!"
    }
  },
  {
    date: "2037-01",
    year: 2037,
    month: 1,
    flex: 580,
    savings: 518,
    subtitle: {
      text: "Lãi kép quỹ cổ phiếu bắt đầu phát huy sức mạnh",
      highlight: "Lãi kép"
    }
  },
  {
    date: "2040-01",
    year: 2040,
    month: 1,
    flex: 920,
    savings: 710,
    event: "Vươn tán 920 tr",
    subtitle: {
      text: "Năm 15: Flex bứt phá 920 triệu, bỏ xa tiết kiệm 210 triệu",
      highlight: "920 triệu"
    }
  },
  {
    date: "2043-01",
    year: 2043,
    month: 1,
    flex: 1350,
    savings: 935,
    subtitle: {
      text: "Gia sản hưu trí tăng tốc thần kỳ",
      highlight: "tăng tốc"
    }
  },
  {
    date: "2045-12",
    year: 2045,
    month: 12,
    flex: 1750,
    savings: 1110,
    event: "Đích 20 Năm",
    subtitle: {
      text: "Sau 20 năm: Flex đạt 1,75 tỷ, vượt trội hơn 640 triệu đồng!",
      highlight: "1,75 tỷ"
    }
  }
];

export const FINAL_RANKINGS = [
  {
    rank: 1,
    code: "FLEX",
    name: "Xanh Phú Quý Flex",
    subtitle: "Quỹ Cổ Phiếu + Khiên bảo vệ",
    total: "1,75 Tỷ",
    multiplier: "x2.9 vốn",
    protection: "1,5 TỶ ĐỒNG",
    color: "#10b981",
    logoBg: "#059669"
  },
  {
    rank: 2,
    code: "GTK",
    name: "Gửi tiết kiệm ngân hàng",
    subtitle: "Lãi kép 5.5%/năm",
    total: "1,11 Tỷ",
    multiplier: "x1.8 vốn",
    protection: "0 ĐỒNG",
    color: "#94a3b8",
    logoBg: "#475569",
    isBenchmark: true
  }
];

export const RISK_SCENARIO_DATA = {
  title: "NẾU CÓ RỦI RO LỚN Ở NĂM THỨ 3 (VỐN ĐÓNG 90 TRIỆU)",
  savingsReturn: "100 Triệu (Rút vốn + lãi)",
  flexReturn: "1,56 Tỷ (Đền bù 1,5 Tỷ + 60tr GTTK)",
  gap: "Gấp 15,6 lần"
};
