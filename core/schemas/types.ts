export interface AssetReference {
  id: string;
  type: "image" | "audio" | "video" | "vector" | "font";
  path: string; // logical path, e.g., "assets/audio/narration.mp3"
}

export interface MotionIntent {
  type: string; // e.g., "progressive-build", "reveal", "enter-stage", "focus"
  subject: string; // The logical element being animated
  emphasis?: string; // Semantic reason/emphasis
}

export interface VisualIntent {
  description: string;
  layout?: "split" | "centered" | "overlay" | "grid";
  focalPoint?: string;
}

export interface TextContent {
  content: string;
  role?: "title" | "subtitle" | "body" | "caption" | "label";
  emphasis?: boolean;
  maxLines?: number;
  priority?: number;
}

export interface SceneSpec {
  id: string;
  purpose: string;
  narration: string;
  startMs?: number;
  durationMs: number;
  endMs?: number;
  startFrame?: number;
  durationFrames?: number;
  text?: Array<string | TextContent>;
  visualIntent: VisualIntent;
  motionIntent: MotionIntent[];
  transitionIntent?: string;
  assets: AssetReference[];
}

export interface CanonicalVideoSpec {
  schemaVersion: string;
  project: {
    id: string;
    title: string;
    version: number;
  };
  format: {
    aspectRatio: string;
    width: number;
    height: number;
    fpsPreference?: number;
    fps?: number;
    totalDurationFrames?: number;
    targetDurationMs?: number;
  };
  content: {
    coreMessage: string;
    audience: string;
    tone: string;
    language: string;
  };
  script: {
    narration: string;
    scenes: SceneSpec[];
  };
  engineRouting?: {
    suggestedEngine?: "HYPERFRAMES" | "REMOTION" | "AUTO";
    reason?: string;
  };
}
