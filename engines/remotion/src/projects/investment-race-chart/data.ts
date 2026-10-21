export interface DataPoint {
  date: string; // "YYYY-MM"
  year: number;
  month: number;
  lpb: number; // in millions VND
  hdb: number;
  vpb: number;
  vib: number;
  tcb: number;
  savings: number;
  event?: string;
  subtitle?: {
    text: string;
    highlight: string;
  };
}

export const STOCKS_META = [
  { id: "lpb", name: "LPBank", code: "LPB", color: "#c084fc", logoBg: "#7e22ce" },
  { id: "hdb", name: "HDBank", code: "HDB", color: "#f97316", logoBg: "#ea580c" },
  { id: "vpb", name: "VPBank", code: "VPB", color: "#22c55e", logoBg: "#16a34a" },
  { id: "vib", name: "VIB", code: "VIB", color: "#38bdf8", logoBg: "#0284c7" },
  { id: "tcb", name: "Techcombank", code: "TCB", color: "#ef4444", logoBg: "#dc2626" },
  { id: "savings", name: "Gửi tiết kiệm", code: "GTK", color: "#e2e8f0", isBenchmark: true }
];

export const TIMELINE_DATA: DataPoint[] = [
  { date: "2019-01", year: 2019, month: 1, lpb: 100, hdb: 100, vpb: 100, vib: 100, tcb: 100, savings: 100, subtitle: { text: "100 triệu đầu tư vào 5 ngân hàng tư nhân", highlight: "100 triệu" } },
  { date: "2019-06", year: 2019, month: 6, lpb: 92, hdb: 98, vpb: 101, vib: 110, tcb: 88, savings: 103, subtitle: { text: "Cùng xem biến động giá trị qua các năm.", highlight: "biến động giá trị" } },
  { date: "2019-12", year: 2019, month: 12, lpb: 95, hdb: 103, vpb: 105, vib: 119, tcb: 85, savings: 106, subtitle: { text: "100 triệu đầu tư năm 2019 bắt đầu phân hóa", highlight: "2019" } },
  { date: "2020-03", year: 2020, month: 3, lpb: 68, hdb: 63, vpb: 87, vib: 88, tcb: 59, savings: 106, event: "Covid", subtitle: { text: "Tháng 03/2020: Covid ập đến, TCB lỗ nhiều nhất còn 59 triệu", highlight: "Covid" } },
  { date: "2020-12", year: 2020, month: 12, lpb: 123, hdb: 139, vpb: 164, vib: 268, tcb: 109, savings: 110, subtitle: { text: "Cuối 2020 hồi phục mạnh, cổ phiếu VIB dẫn đầu đạt 268 triệu", highlight: "VIB dẫn đầu" } },
  { date: "2021-06", year: 2021, month: 6, lpb: 210, hdb: 180, vpb: 290, vib: 450, tcb: 185, savings: 113, subtitle: { text: "Sóng thần chứng khoán bùng nổ toàn diện", highlight: "Sóng thần" } },
  { date: "2021-12", year: 2021, month: 12, lpb: 225, hdb: 195, vpb: 331, vib: 545, tcb: 173, savings: 116, subtitle: { text: "100 triệu ban đầu tại VIB đã vọt lên 545 triệu", highlight: "545 triệu" } },
  { date: "2022-06", year: 2022, month: 6, lpb: 180, hdb: 150, vpb: 274, vib: 360, tcb: 141, savings: 118, subtitle: { text: "Thị trường bắt đầu rung lắc dữ dội", highlight: "rung lắc dữ dội" } },
  { date: "2022-10", year: 2022, month: 10, lpb: 146, hdb: 125, vpb: 227, vib: 306, tcb: 96, savings: 120, event: "Sập 2022", subtitle: { text: "Cú sập lịch sử 2022 kéo tài sản sụt giảm mạnh", highlight: "Sập 2022" } },
  { date: "2022-12", year: 2022, month: 12, lpb: 146, hdb: 131, vpb: 248, vib: 297, tcb: 101, savings: 121, subtitle: { text: "TCB chạm đáy 96-101 triệu, VIB vẫn giữ 297 triệu", highlight: "297 triệu" } },
  { date: "2023-06", year: 2023, month: 6, lpb: 195, hdb: 187, vpb: 300, vib: 408, tcb: 131, savings: 125, subtitle: { text: "Giai đoạn tích lũy và hồi phục trở lại", highlight: "hồi phục" } },
  { date: "2023-12", year: 2023, month: 12, lpb: 225, hdb: 200, vpb: 280, vib: 384, tcb: 124, savings: 128, subtitle: { text: "Dòng tiền thông minh bắt đầu dịch chuyển sang LPB", highlight: "dịch chuyển sang LPB" } },
  { date: "2024-04", year: 2024, month: 4, lpb: 509, hdb: 271, vpb: 261, vib: 449, tcb: 182, savings: 131, event: "Đổi ngôi", subtitle: { text: "Tháng 4/2024: Đổi ngôi ngoạn mục, LPB vọt lên 509 triệu!", highlight: "Đổi ngôi ngoạn mục" } },
  { date: "2025-01", year: 2025, month: 1, lpb: 1020, hdb: 514, vpb: 313, vib: 291, tcb: 199, savings: 134, subtitle: { text: "Đầu 2025: LPB chính thức cán mốc 1 tỷ đồng!", highlight: "cán mốc 1 tỷ đồng" } },
  { date: "2025-06", year: 2025, month: 6, lpb: 1280, hdb: 532, vpb: 452, vib: 523, tcb: 289, savings: 137, subtitle: { text: "Tài sản liên tục lập đỉnh mới", highlight: "lập đỉnh mới" } },
  { date: "2026-05", year: 2026, month: 5, lpb: 1600, hdb: 502, vpb: 469, vib: 429, tcb: 278, savings: 139, subtitle: { text: "Đỉnh điểm 100 triệu tại LPB biến thành 1,60 tỷ đồng", highlight: "1,60 tỷ đồng" } },
  { date: "2026-10", year: 2026, month: 10, lpb: 1392, hdb: 503, vpb: 466, vib: 456, tcb: 274, savings: 140, subtitle: { text: "Kết quả sau gần 8 năm: LPB đạt 1,392 tỷ đồng", highlight: "1,392 tỷ đồng" } }
];

export const FINAL_RANKINGS = [
  { rank: 1, code: "LPB", name: "LPBank", total: "1.392 triệu", multiplier: "x13.9", color: "#c084fc", logoBg: "#7e22ce" },
  { rank: 2, code: "HDB", name: "HDBank", total: "503 triệu", multiplier: "x5.0", color: "#f97316", logoBg: "#ea580c" },
  { rank: 3, code: "VPB", name: "VPBank", total: "466 triệu", multiplier: "x4.7", color: "#22c55e", logoBg: "#16a34a" },
  { rank: 4, code: "VIB", name: "VIB", total: "456 triệu", multiplier: "x4.6", color: "#38bdf8", logoBg: "#0284c7" },
  { rank: 5, code: "TCB", name: "Techcombank", total: "274 triệu", multiplier: "x2.7", color: "#ef4444", logoBg: "#dc2626" },
  { rank: 6, code: "GTK", name: "Gửi tiết kiệm", total: "140 triệu", multiplier: "x1.4", color: "#94a3b8", isBenchmark: true }
];
