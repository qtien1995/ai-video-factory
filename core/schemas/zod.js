import { z } from "zod";
import { MOTION_INTENTS } from "./registry.js";

const AssetReferenceSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "audio", "video", "vector", "font"]),
  path: z.string()
});

const MotionIntentSchema = z.object({
  type: z.string().refine((val) => Object.keys(MOTION_INTENTS).includes(val), {
    message: "Unknown motionIntent.type. Must be registered in Motion Intent Registry."
  }),
  subject: z.string(),
  emphasis: z.string().optional()
});

const VisualIntentSchema = z.object({
  description: z.string(),
  layout: z.enum(["split", "centered", "overlay", "grid"]).optional(),
  focalPoint: z.string().optional()
});

// Added text semantics as requested
const TextContentSchema = z.object({
  content: z.string(),
  role: z.enum(["title", "subtitle", "body", "caption", "label"]).optional(),
  emphasis: z.boolean().optional(),
  maxLines: z.number().int().optional(),
  priority: z.number().int().optional()
});

const SceneSpecSchema = z.object({
  id: z.string(),
  purpose: z.string(),
  narration: z.string(),
  startMs: z.number().nonnegative().optional(),
  durationMs: z.number().nonnegative(),
  endMs: z.number().nonnegative().optional(),
  text: z.array(z.union([z.string(), TextContentSchema])).optional(),
  visualIntent: VisualIntentSchema,
  motionIntent: z.array(MotionIntentSchema),
  transitionIntent: z.string().optional(),
  assets: z.array(AssetReferenceSchema)
});

export const CanonicalVideoSpecSchema = z.object({
  schemaVersion: z.string(),
  project: z.object({
    id: z.string(),
    title: z.string(),
    version: z.number()
  }),
  format: z.object({
    aspectRatio: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    fpsPreference: z.number().int().positive().optional(),
    targetDurationMs: z.number().nonnegative().optional()
  }),
  content: z.object({
    coreMessage: z.string(),
    audience: z.string(),
    tone: z.string(),
    language: z.string()
  }),
  script: z.object({
    narration: z.string(),
    scenes: z.array(SceneSpecSchema)
  }),
  engineRouting: z.object({
    suggestedEngine: z.enum(["HYPERFRAMES", "REMOTION", "AUTO"]).optional(),
    reason: z.string().optional()
  }).optional()
});

export function validateSpec(spec) {
  const result = CanonicalVideoSpecSchema.safeParse(spec);
  if (result.success) {
    return { valid: true, data: result.data, errors: [] };
  } else {
    const formattedErrors = result.error.issues.map(err => ({
      path: err.path.join("."),
      message: err.message,
      code: err.code
    }));
    return { valid: false, errors: formattedErrors };
  }
}
