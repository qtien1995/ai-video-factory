import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * AI VIDEO FACTORY V3 — SMART VERTICAL ZONE LAYOUT ENGINE (1080 × 1920)
 *
 * Implements the Strict 4-Zone Vertical Architecture:
 * - ZONE 1: Top Header & Title      (y: 80px  -> 420px, height: 340px)
 * - ZONE 2: Hero Visual Stage       (y: 440px -> 1180px, height: 740px) [Collision Guard]
 * - ZONE 3: Data Cards & Bento Dock (y: 1200px -> 1620px, height: 420px) [Dead Space Killer]
 * - ZONE 4: Subtitle Dock           (y: 1660px -> 1840px, height: 180px)
 */

export const SMART_ZONES = {
  width: 1080,
  height: 1920,
  safeMarginX: 48,

  // Zone 1: Top Header & Title
  zone1: {
    top: 80,
    bottom: 420,
    height: 340,
    zIndex: 30,
  },

  // Zone 2: Hero Visual Stage (Exclusive for 3D WebGL / X-Ray Hologram / Chart Race)
  zone2: {
    top: 440,
    bottom: 1180,
    height: 740,
    zIndex: 10,
  },

  // Zone 3: Data Cards & Bento Dock (Pushed down into lower half to eliminate dead space)
  zone3: {
    top: 1200,
    bottom: 1620,
    height: 420,
    zIndex: 25,
  },

  // Zone 4: Speech-Synced Subtitle Dock (Right above bottom platform UI)
  zone4: {
    top: 1660,
    bottom: 1840,
    height: 180,
    zIndex: 40,
  },
} as const;

export interface SmartSceneLayoutProps {
  /** Background elements (gradient, particle field, ECG pulse wave) */
  background?: React.ReactNode;
  /** Zone 1: Eyebrow badge, Title, Subtitle, Warning pill */
  header?: React.ReactNode;
  /** Zone 2: 3D Hologram, Center Stage Visual, Chart Race (Guarded against card collisions) */
  visual?: React.ReactNode;
  /** Zone 3: Hero Metric Cards, Bento Grid, Compare Cards (Max height 420px) */
  cards?: React.ReactNode;
  /** Zone 4: Speech-synced subtitles pill */
  subtitles?: React.ReactNode;
  /** Optional floating Callout annotations inside Zone 2 */
  callouts?: React.ReactNode;
  /** Custom container style overrides */
  style?: React.CSSProperties;
}

export const SmartSceneLayout: React.FC<SmartSceneLayoutProps> = ({
  background,
  header,
  visual,
  cards,
  subtitles,
  callouts,
  style,
}) => {
  return (
    <AbsoluteFill
      style={{
        width: SMART_ZONES.width,
        height: SMART_ZONES.height,
        backgroundColor: "#060A14",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Layer 0: Global Background */}
      {background}

      {/* Layer 1: ZONE 2 — HERO VISUAL STAGE (Exclusive 740px height) */}
      {visual && (
        <div
          style={{
            position: "absolute",
            top: SMART_ZONES.zone2.top,
            left: 0,
            right: 0,
            height: SMART_ZONES.zone2.height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: SMART_ZONES.zone2.zIndex,
            pointerEvents: "none",
          }}
        >
          {visual}
        </div>
      )}

      {/* Layer 2: Optional Callouts inside Zone 2 */}
      {callouts && (
        <div
          style={{
            position: "absolute",
            top: SMART_ZONES.zone2.top,
            left: SMART_ZONES.safeMarginX,
            right: SMART_ZONES.safeMarginX,
            height: SMART_ZONES.zone2.height,
            zIndex: SMART_ZONES.zone2.zIndex + 5,
            pointerEvents: "none",
          }}
        >
          {callouts}
        </div>
      )}

      {/* Layer 3: ZONE 1 — TOP HEADER & TITLE (y: 80 -> 420) */}
      {header && (
        <div
          style={{
            position: "absolute",
            top: SMART_ZONES.zone1.top,
            left: SMART_ZONES.safeMarginX,
            right: SMART_ZONES.safeMarginX,
            height: SMART_ZONES.zone1.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            zIndex: SMART_ZONES.zone1.zIndex,
          }}
        >
          {header}
        </div>
      )}

      {/* Layer 4: ZONE 3 — DATA CARDS & BENTO DOCK (y: 1200 -> 1620) */}
      {cards && (
        <div
          style={{
            position: "absolute",
            top: SMART_ZONES.zone3.top,
            left: SMART_ZONES.safeMarginX,
            right: SMART_ZONES.safeMarginX,
            height: SMART_ZONES.zone3.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: SMART_ZONES.zone3.zIndex,
          }}
        >
          {cards}
        </div>
      )}

      {/* Layer 5: ZONE 4 — SUBTITLE DOCK (y: 1660 -> 1840) */}
      {subtitles && (
        <div
          style={{
            position: "absolute",
            top: SMART_ZONES.zone4.top,
            left: SMART_ZONES.safeMarginX,
            right: SMART_ZONES.safeMarginX,
            height: SMART_ZONES.zone4.height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: SMART_ZONES.zone4.zIndex,
            pointerEvents: "none",
          }}
        >
          {subtitles}
        </div>
      )}
    </AbsoluteFill>
  );
};
