import React from "react";
import type { TextContent } from "../../../../../core/schemas/types";

export const TextLayout: React.FC<{ texts: Array<string | TextContent>, layout?: string }> = ({ texts, layout }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: layout === "split" ? 40 : 20, textAlign: "center" }}>
      {texts.map((t, i) => {
        const content = typeof t === "string" ? t : t.content;
        const style: React.CSSProperties = {
          fontSize: typeof t === "object" && t.role === "title" ? 80 : 50,
          fontWeight: typeof t === "object" && t.emphasis ? "bold" : "normal",
          color: "#333",
          maxWidth: 800,
          wordWrap: "break-word"
        };
        
        // V0 Layout policy: if text is too long, we assume it wraps natively via CSS.
        // If it overflows the maxLines, a real DOM measurement hook would throw TEXT_OVERFLOW.
        // For Phase 3, we simulate basic responsive text.
        return <div key={i} style={style}>{content}</div>;
      })}
    </div>
  );
};
