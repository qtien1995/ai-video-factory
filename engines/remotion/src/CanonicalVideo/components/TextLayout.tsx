import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SpatialHUDCard } from "../../shared/SpatialHUDCard";
import type { TextContent } from "../../../../../core/schemas/types";

export interface TextLayoutProps {
  texts: Array<string | TextContent>;
  layout?: string;
  accentColor?: string;
}

export const TextLayout: React.FC<TextLayoutProps> = ({
  texts = [],
  layout,
  accentColor = "#38bdf8",
}) => {
  if (!texts || texts.length === 0) return null;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springVal = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <SpatialHUDCard
      frame={frame}
      springVal={springVal}
      accentColor={accentColor}
      style={{
        maxWidth: 880,
        padding: "36px 36px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: layout === "split" ? 28 : 18,
          textAlign: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {texts.map((t, i) => {
          const content = typeof t === "string" ? t : t.content;
          if (!content) return null;

          const isTitle = typeof t === "object" && t.role === "title";
          const isSubtitle = typeof t === "object" && t.role === "subtitle";
          const isEmphasis = typeof t === "object" && t.emphasis;

          const fontSize = isTitle ? 64 : isSubtitle ? 40 : 32;
          const fontWeight = isTitle ? 900 : isEmphasis ? 800 : 600;
          const color = isTitle ? "#ffffff" : isEmphasis ? accentColor : "#e2e8f0";
          const letterSpacing = isTitle ? "-0.5px" : "normal";

          return (
            <div
              key={i}
              style={{
                fontSize,
                fontWeight,
                color,
                lineHeight: 1.35,
                maxWidth: 820,
                letterSpacing,
                textTransform: isTitle ? "uppercase" : "none",
                textShadow: isTitle ? `0 0 20px ${accentColor}44` : "none",
              }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </SpatialHUDCard>
  );
};
