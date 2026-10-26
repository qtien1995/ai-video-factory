import React from "react";

// ============================================================================
// ARCHETYPE 1: HERO METRIC & FOOTNOTE
// ============================================================================
export interface HeroMetricCardProps {
  category: string;
  number: string;
  unit: string;
  description: string;
  footnote?: string;
  accentColor?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export const HeroMetricCard: React.FC<HeroMetricCardProps> = ({
  category,
  number,
  unit,
  description,
  footnote,
  accentColor = "#fbbf24",
  backgroundColor = "rgba(23, 23, 23, 0.88)",
  borderColor = "rgba(255, 255, 255, 0.14)",
}) => {
  if (!number && !description) return null;

  return (
    <div
      style={{
        background: backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 28,
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        backdropFilter: "blur(16px)",
        width: "100%",
        maxWidth: 920,
        boxShadow: "0 20px 50px rgba(0,0,0,0.85)",
      }}
    >
      {category && (
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "6px 16px",
            borderRadius: 100,
            background: `${accentColor}25`,
            color: accentColor,
            fontSize: 22,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1.2,
          }}
        >
          {category}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-1px",
          }}
        >
          {number}
        </span>
        <span style={{ fontSize: 36, fontWeight: 800, color: accentColor }}>
          {unit}
        </span>
      </div>

      <p
        style={{
          fontSize: 28,
          color: "#e5e5e5",
          lineHeight: 1.4,
          margin: 0,
          fontWeight: 600,
        }}
      >
        {description}
      </p>

      {footnote && (
        <div
          style={{
            marginTop: 8,
            paddingTop: 14,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: 20,
            color: "#a3a3a3",
            lineHeight: 1.3,
          }}
        >
          * {footnote}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ARCHETYPE 2: SIDE-BY-SIDE COMPARISON
// ============================================================================
export interface ComparisonCardProps {
  left: { title: string; badge: string; points: string[]; isNegative?: boolean };
  right: { title: string; badge: string; points: string[]; isPositive?: boolean };
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ left, right }) => {
  if (!left && !right) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        width: "100%",
        maxWidth: 960,
      }}
    >
      {/* Left Column */}
      <div
        style={{
          background: left.isNegative ? "rgba(239, 68, 68, 0.12)" : "rgba(30, 30, 30, 0.85)",
          border: `2px solid ${
            left.isNegative ? "rgba(239, 68, 68, 0.4)" : "rgba(255, 255, 255, 0.12)"
          }`,
          borderRadius: 24,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: left.isNegative ? "#f87171" : "#d4d4d4",
            background: left.isNegative ? "rgba(239, 68, 68, 0.25)" : "rgba(255, 255, 255, 0.12)",
            padding: "6px 14px",
            borderRadius: 8,
            alignSelf: "flex-start",
            textTransform: "uppercase",
          }}
        >
          {left.badge}
        </span>
        <h4 style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", margin: 0 }}>
          {left.title}
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            color: "#d4d4d4",
            fontSize: 22,
            lineHeight: 1.5,
          }}
        >
          {left.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div
        style={{
          background: right.isPositive ? "rgba(34, 197, 94, 0.14)" : "rgba(30, 30, 30, 0.85)",
          border: `2px solid ${
            right.isPositive ? "rgba(34, 197, 94, 0.45)" : "rgba(255, 255, 255, 0.12)"
          }`,
          borderRadius: 24,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: right.isPositive ? "#4ade80" : "#fbbf24",
            background: right.isPositive ? "rgba(34, 197, 94, 0.25)" : "rgba(251, 191, 36, 0.2)",
            padding: "6px 14px",
            borderRadius: 8,
            alignSelf: "flex-start",
            textTransform: "uppercase",
          }}
        >
          {right.badge}
        </span>
        <h4 style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", margin: 0 }}>
          {right.title}
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            color: "#ffffff",
            fontSize: 22,
            lineHeight: 1.5,
            fontWeight: 600,
          }}
        >
          {right.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ============================================================================
// ARCHETYPE 3: 3-COLUMN FEATURE GRID
// ============================================================================
export interface FeatureGridCardProps {
  items: Array<{ icon: string; title: string; desc: string }>;
  accentColor?: string;
}

export const FeatureGridCard: React.FC<FeatureGridCardProps> = ({
  items = [],
  accentColor = "#fbbf24",
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`,
        gap: 16,
        width: "100%",
        maxWidth: 960,
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "rgba(25, 25, 25, 0.88)",
            border: "1.5px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 20,
            padding: "24px 16px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: `${accentColor}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              color: accentColor,
            }}
          >
            {item.icon}
          </div>
          <h4 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", margin: 0 }}>
            {item.title}
          </h4>
          <p style={{ fontSize: 18, color: "#a3a3a3", margin: 0, lineHeight: 1.35 }}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// ARCHETYPE 4: SEQUENTIAL STEP FLOW
// ============================================================================
export interface StepFlowCardProps {
  steps: Array<{ stepNumber: string; title: string; detail: string; active?: boolean }>;
  accentColor?: string;
}

export const StepFlowCard: React.FC<StepFlowCardProps> = ({
  steps = [],
  accentColor = "#fbbf24",
}) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        maxWidth: 920,
      }}
    >
      {steps.map((st, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            background: st.active ? `${accentColor}18` : "rgba(20, 20, 20, 0.8)",
            border: `2px solid ${st.active ? accentColor : "rgba(255, 255, 255, 0.1)"}`,
            borderRadius: 20,
            padding: "20px 24px",
            backdropFilter: "blur(10px)",
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: st.active ? accentColor : "#737373",
              fontFamily: "monospace",
            }}
          >
            {st.stepNumber}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h4 style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", margin: 0 }}>
              {st.title}
            </h4>
            <p style={{ fontSize: 20, color: "#a3a3a3", margin: 0, lineHeight: 1.3 }}>
              {st.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// ARCHETYPE 5: CHECKLIST & STATUS BADGE
// ============================================================================
export interface ChecklistCardProps {
  title: string;
  badge: { text: string; color: "green" | "yellow" | "red" };
  items: string[];
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  title,
  badge,
  items = [],
}) => {
  if (!title && items.length === 0) return null;

  const badgeColors = {
    green: { bg: "rgba(34, 197, 94, 0.2)", text: "#4ade80", border: "#22c55e" },
    yellow: { bg: "rgba(251, 191, 36, 0.2)", text: "#fbbf24", border: "#f59e0b" },
    red: { bg: "rgba(239, 68, 68, 0.2)", text: "#f87171", border: "#ef4444" },
  }[badge?.color || "yellow"];

  return (
    <div
      style={{
        background: "rgba(24, 24, 27, 0.92)",
        border: "2px solid rgba(255, 255, 255, 0.14)",
        borderRadius: 24,
        padding: "32px 28px",
        width: "100%",
        maxWidth: 920,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        backdropFilter: "blur(14px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", margin: 0 }}>
          {title}
        </h3>
        {badge && (
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              background: badgeColors.bg,
              color: badgeColors.text,
              border: `1px solid ${badgeColors.border}`,
              padding: "5px 14px",
              borderRadius: 100,
            }}
          >
            {badge.text}
          </span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <span style={{ color: badgeColors.text, fontSize: 24, lineHeight: 1 }}>✔</span>
            <span style={{ fontSize: 22, color: "#e4e4e7", lineHeight: 1.4, fontWeight: 500 }}>
              {it}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ARCHETYPE 6: QUOTE & STATEMENT CARD
// ============================================================================
export interface QuoteCardProps {
  quote: string;
  author: string;
  role: string;
  source?: string;
  accentColor?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  role,
  source,
  accentColor = "#fbbf24",
}) => {
  if (!quote) return null;

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(20, 20, 25, 0.88)",
        border: "2px solid rgba(255, 255, 255, 0.14)",
        borderRadius: 28,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 920,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        backdropFilter: "blur(16px)",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 16,
          left: 24,
          fontSize: 80,
          color: `${accentColor}25`,
          fontFamily: "Georgia, serif",
          lineHeight: 1,
        }}
      >
        “
      </span>
      <p
        style={{
          fontSize: 26,
          fontStyle: "italic",
          color: "#ffffff",
          lineHeight: 1.5,
          margin: 0,
          zIndex: 1,
          fontWeight: 500,
        }}
      >
        "{quote}"
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: 16,
          marginTop: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: accentColor }}>
            {author}
          </div>
          <div style={{ fontSize: 18, color: "#a1a1aa", marginTop: 2 }}>{role}</div>
        </div>
        {source && (
          <span
            style={{
              fontSize: 16,
              color: "#94a3b8",
              background: "rgba(255, 255, 255, 0.08)",
              padding: "4px 12px",
              borderRadius: 6,
            }}
          >
            Nguồn: {source}
          </span>
        )}
      </div>
    </div>
  );
};
