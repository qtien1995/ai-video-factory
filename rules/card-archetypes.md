# Card Design Archetypes — Thư viện Bố cục Thẻ chuẩn trên Mobile (9:16)

Tài liệu này cung cấp 6 Bố cục thẻ chuẩn (Card Archetypes) được thiết kế tối ưu hóa cho màn hình điện thoại (1080×1920, hiển thị rõ nét trên viewport 360×640), tuân thủ nghiêm ngặt `rules/visual-storytelling.md`.

Các component trong Remotion hoặc HyperFrames khi dựng cảnh nên kế thừa trực tiếp từ 6 Archetypes này thay vì tự căn chỉnh CSS từ đầu.

---

## 1. ARCHETYPE 1: HERO METRIC & FOOTNOTE (Con số chủ lực & Chú thích)
- **Ứng dụng:** Thống kê tài chính, kỷ lục, phần trăm tăng trưởng, số tiền bồi thường/lợi nhuận.
- **Nguyên tắc thị giác:** Con số là Focal Point lớn nhất (Hero), đơn vị tách biệt rõ ràng, điều kiện/chú thích pháp lý đặt ở đáy thẻ với độ tương phản vừa đủ.

```tsx
// Remotion / React snippet
export const HeroMetricCard: React.FC<{
  category: string;
  number: string;
  unit: string;
  description: string;
  footnote?: string;
}> = ({ category, number, unit, description, footnote }) => (
  <div style={{
    background: "rgba(23, 23, 23, 0.85)",
    border: "2px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 28,
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backdropFilter: "blur(16px)",
    width: "100%",
    maxWidth: 920
  }}>
    <div style={{
      display: "inline-flex",
      alignSelf: "flex-start",
      padding: "6px 16px",
      borderRadius: 100,
      background: "rgba(251, 191, 36, 0.15)",
      color: "#fbbf24",
      fontSize: 22,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.2
    }}>
      {category}
    </div>

    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <span style={{ fontSize: 96, fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>{number}</span>
      <span style={{ fontSize: 36, fontWeight: 700, color: "#fbbf24" }}>{unit}</span>
    </div>

    <p style={{ fontSize: 28, color: "#e5e5e5", lineHeight: 1.4, margin: 0, fontWeight: 500 }}>
      {description}
    </p>

    {footnote && (
      <div style={{
        marginTop: 8,
        paddingTop: 14,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        fontSize: 20,
        color: "#a3a3a3",
        lineHeight: 1.3
      }}>
        * {footnote}
      </div>
    )}
  </div>
);
```

---

## 2. ARCHETYPE 2: SIDE-BY-SIDE COMPARISON (So sánh 2 Vế Đối lập)
- **Ứng dụng:** Trước vs Sau, Nên vs Không nên, Bản truyền thống vs Bản AI, Gói Cơ bản vs Nâng cao.
- **Nguyên tắc thị giác:** Chia 2 cột tỷ lệ 50-50, dùng màu chỉ báo (Xanh lá / Đỏ hoặc Xám / Vàng), có badge trạng thái rõ ràng ở đầu mỗi cột.

```tsx
export const ComparisonCard: React.FC<{
  left: { title: string; badge: string; points: string[]; isNegative?: boolean };
  right: { title: string; badge: string; points: string[]; isPositive?: boolean };
}> = ({ left, right }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%", maxWidth: 960 }}>
    {/* Left Column */}
    <div style={{
      background: left.isNegative ? "rgba(239, 68, 68, 0.08)" : "rgba(30, 30, 30, 0.8)",
      border: `2px solid ${left.isNegative ? "rgba(239, 68, 68, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
      borderRadius: 24,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }}>
      <span style={{
        fontSize: 18,
        fontWeight: 700,
        color: left.isNegative ? "#f87171" : "#d4d4d4",
        background: left.isNegative ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.1)",
        padding: "4px 12px",
        borderRadius: 8,
        alignSelf: "flex-start"
      }}>{left.badge}</span>
      <h4 style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", margin: 0 }}>{left.title}</h4>
      <ul style={{ margin: 0, paddingLeft: 20, color: "#d4d4d4", fontSize: 22, lineHeight: 1.5 }}>
        {left.points.map((pt, i) => <li key={i}>{pt}</li>)}
      </ul>
    </div>

    {/* Right Column */}
    <div style={{
      background: right.isPositive ? "rgba(34, 197, 94, 0.1)" : "rgba(30, 30, 30, 0.8)",
      border: `2px solid ${right.isPositive ? "rgba(34, 197, 94, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
      borderRadius: 24,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }}>
      <span style={{
        fontSize: 18,
        fontWeight: 700,
        color: right.isPositive ? "#4ade80" : "#fbbf24",
        background: right.isPositive ? "rgba(34, 197, 94, 0.2)" : "rgba(251, 191, 36, 0.15)",
        padding: "4px 12px",
        borderRadius: 8,
        alignSelf: "flex-start"
      }}>{right.badge}</span>
      <h4 style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", margin: 0 }}>{right.title}</h4>
      <ul style={{ margin: 0, paddingLeft: 20, color: "#ffffff", fontSize: 22, lineHeight: 1.5, fontWeight: 500 }}>
        {right.points.map((pt, i) => <li key={i}>{pt}</li>)}
      </ul>
    </div>
  </div>
);
```

---

## 3. ARCHETYPE 3: 3-COLUMN FEATURE GRID (Bộ 3 Giá trị Cốt lõi)
- **Ứng dụng:** 3 tính năng mới, 3 bí quyết, 3 lưu ý hàng đầu.
- **Nguyên tắc thị giác:** Xếp 3 cột cân đối trên màn hình dọc, icon nổi bật trên nền bo tròn, tiêu đề ngắn gọn (dưới 3 từ), nội dung giải thích tối đa 2 dòng.

```tsx
export const FeatureGridCard: React.FC<{
  items: Array<{ icon: string; title: string; desc: string }>;
}> = ({ items }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, width: "100%", maxWidth: 960 }}>
    {items.map((item, idx) => (
      <div key={idx} style={{
        background: "rgba(25, 25, 25, 0.8)",
        border: "1.5px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        padding: "24px 16px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(251, 191, 36, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          color: "#fbbf24"
        }}>
          {item.icon}
        </div>
        <h4 style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", margin: 0 }}>{item.title}</h4>
        <p style={{ fontSize: 18, color: "#a3a3a3", margin: 0, lineHeight: 1.35 }}>{item.desc}</p>
      </div>
    ))}
  </div>
);
```

---

## 4. ARCHETYPE 4: SEQUENTIAL STEP FLOW (Quy trình Từng bước)
- **Ứng dụng:** Hướng dẫn 3-4 bước thực hiện, luồng dữ liệu xử lý, lộ trình phát triển.
- **Nguyên tắc thị giác:** Số thứ tự to bản (`01`, `02`, `03`) tạo nhịp dẫn hướng mắt người xem từ trên xuống dưới, có đường kết nối giữa các bước.

```tsx
export const StepFlowCard: React.FC<{
  steps: Array<{ stepNumber: string; title: string; detail: string; active?: boolean }>;
}> = ({ steps }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 920 }}>
    {steps.map((st, idx) => (
      <div key={idx} style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: st.active ? "rgba(251, 191, 36, 0.1)" : "rgba(20, 20, 20, 0.7)",
        border: `2px solid ${st.active ? "#fbbf24" : "rgba(255, 255, 255, 0.08)"}`,
        borderRadius: 20,
        padding: "20px 24px"
      }}>
        <span style={{
          fontSize: 32,
          fontWeight: 900,
          color: st.active ? "#fbbf24" : "#737373",
          fontFamily: "monospace"
        }}>
          {st.stepNumber}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h4 style={{ fontSize: 24, fontWeight: 700, color: "#ffffff", margin: 0 }}>{st.title}</h4>
          <p style={{ fontSize: 20, color: "#a3a3a3", margin: 0 }}>{st.detail}</p>
        </div>
      </div>
    ))}
  </div>
);
```

---

## 5. ARCHETYPE 5: CHECKLIST & STATUS BADGE (Điều kiện & Cảnh báo)
- **Ứng dụng:** Điều kiện áp dụng, danh sách quyền lợi, cảnh báo rủi ro loại trừ.
- **Nguyên tắc thị giác:** Huy hiệu trạng thái (Status Badge) như `BẮT BUỘC`, `MIỄN PHÍ`, `LƯU Ý` nằm góc trên, các gạch đầu dòng có dấu tick hoặc chấm tròn tương phản cao.

```tsx
export const ChecklistCard: React.FC<{
  title: string;
  badge: { text: string; color: "green" | "yellow" | "red" };
  items: string[];
}> = ({ title, badge, items }) => {
  const badgeColors = {
    green: { bg: "rgba(34, 197, 94, 0.2)", text: "#4ade80", border: "#22c55e" },
    yellow: { bg: "rgba(251, 191, 36, 0.2)", text: "#fbbf24", border: "#f59e0b" },
    red: { bg: "rgba(239, 68, 68, 0.2)", text: "#f87171", border: "#ef4444" }
  }[badge.color];

  return (
    <div style={{
      background: "rgba(24, 24, 27, 0.9)",
      border: "2px solid rgba(255, 255, 255, 0.12)",
      borderRadius: 24,
      padding: "32px 28px",
      width: "100%",
      maxWidth: 920,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", margin: 0 }}>{title}</h3>
        <span style={{
          fontSize: 18,
          fontWeight: 700,
          background: badgeColors.bg,
          color: badgeColors.text,
          border: `1px solid ${badgeColors.border}`,
          padding: "4px 14px",
          borderRadius: 100
        }}>
          {badge.text}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: "#fbbf24", fontSize: 24, lineHeight: 1 }}>✔</span>
            <span style={{ fontSize: 22, color: "#e4e4e7", lineHeight: 1.4 }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 6. ARCHETYPE 6: QUOTE & OFFICIAL STATEMENT (Trích dẫn & Uy tín)
- **Ứng dụng:** Trích lời chuyên gia, trích dẫn số hiệu văn bản pháp lý, kết luận nghiên cứu khoa học.
- **Nguyên tắc thị giác:** Icon dấu ngoặc kép lớn làm điểm nhấn nền (Watermark), chữ trích dẫn in nghiêng thanh lịch, avatar/logo kèm tên và chức danh chính thức ở chân thẻ.

```tsx
export const QuoteCard: React.FC<{
  quote: string;
  author: string;
  role: string;
  source?: string;
}> = ({ quote, author, role, source }) => (
  <div style={{
    position: "relative",
    background: "rgba(20, 20, 25, 0.85)",
    border: "2px solid rgba(255, 255, 255, 0.14)",
    borderRadius: 28,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 920,
    display: "flex",
    flexDirection: "column",
    gap: 20
  }}>
    <span style={{
      position: "absolute",
      top: 16,
      left: 24,
      fontSize: 80,
      color: "rgba(251, 191, 36, 0.15)",
      fontFamily: "Georgia, serif",
      lineHeight: 1
    }}>
      “
    </span>
    <p style={{
      fontSize: 26,
      fontStyle: "italic",
      color: "#ffffff",
      lineHeight: 1.5,
      margin: 0,
      zIndex: 1
    }}>
      "{quote}"
    </p>
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: 16,
      marginTop: 8
    }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fbbf24" }}>{author}</div>
        <div style={{ fontSize: 18, color: "#a1a1aa" }}>{role}</div>
      </div>
      {source && (
        <span style={{ fontSize: 16, color: "#71717a", background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: 6 }}>
          Nguồn: {source}
        </span>
      )}
    </div>
  </div>
);
```
