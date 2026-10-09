import { CanonicalVideoSpec } from "../schemas/types";

export interface EngineRenderOptions {
  outputPath: string;
  quality?: "draft" | "high" | "production";
  headless?: boolean;
}

export interface EngineValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface EngineAdapter {
  /**
   * Identifies the engine this adapter is for (e.g., "HYPERFRAMES", "REMOTION")
   */
  engineId: string;

  /**
   * Checks if this engine can theoretically render the given spec based on intents.
   */
  supports(spec: CanonicalVideoSpec): boolean;

  /**
   * Validates the spec against the specific engine's constraints.
   */
  validate(spec: CanonicalVideoSpec): EngineValidationResult;

  /**
   * Transforms the CanonicalVideoSpec into an engine-specific input format 
   * (e.g., mapping logical assets to absolute paths, ms to frames, semantic intents to GSAP/React props).
   */
  transform(spec: CanonicalVideoSpec): any;

  /**
   * Triggers the actual render process using the transformed input.
   */
  render(transformedInput: any, options: EngineRenderOptions): Promise<void>;
}
