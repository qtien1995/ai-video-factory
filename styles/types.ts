export interface StyleMeta {
  id: string;
  version: string;
  name: string;
  purpose: string;
  category: "finance" | "tech" | "insurance" | "social" | "editorial" | "kinetic" | "whiteboard" | "map" | "showcase" | "custom";
  bestFor: string[];
  notIdealFor: string[];
  tags: string[];
  sourceDna?: string;
  previewImage?: string;
}

export interface ColorPalette {
  background: string;
  backgroundGradient?: string;
  surface: string;
  surfaceGlass: string;
  border: string;
  borderActive?: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  positive: string;
  negative: string;
  warning: string;
}

export interface TextStyleSpec {
  fontSize: number;
  fontWeight: number | string;
  lineHeight?: number;
  letterSpacing?: string;
  textTransform?: "uppercase" | "none" | "capitalize" | "lowercase";
}

export interface TypographyScale {
  fontFamily: string;
  monoFontFamily?: string;
  headline: TextStyleSpec;
  subheadline: TextStyleSpec;
  cardTitle: TextStyleSpec;
  cardBody: TextStyleSpec;
  metricNumber: TextStyleSpec;
  badgeText: TextStyleSpec;
  caption: TextStyleSpec;
}

export interface SubtitleStyle {
  positionY: number; // e.g., 1450 - 1650
  activeWordColor: string;
  inactiveWordColor: string;
  backgroundColor: string;
  borderRadius: number;
  padding: string;
  fontSize: number;
  fontWeight: number | string;
  glow?: string;
}

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

export interface SpringConfigs {
  snappy: SpringConfig;
  gentle: SpringConfig;
  bounce: SpringConfig;
  slow: SpringConfig;
}

export interface MotionSpecs {
  pacingVelocity: "FAST / HIGH ADRENALINE" | "DYNAMIC EXPLAINER" | "CALM / DOCUMENTARY";
  avgCutIntervalSec: number;
  targetWpm: number;
  entranceMotion: string;
  continuousMotion: string;
}

export interface StyleTheme {
  meta: StyleMeta;
  colors: ColorPalette;
  typography: TypographyScale;
  subtitles: SubtitleStyle;
  springs: SpringConfigs;
  motion: MotionSpecs;
  safeZone: {
    top: number;
    bottom: number;
    paddingX: number;
  };
}
