import { AbsoluteFill } from "remotion";
import { TextLayout } from "./TextLayout";
import { Flow, Interrupt, Drain, ProgressiveBuild, FadeIn } from "./MotionComponents";
import type { SceneSpec } from "../../../../../core/schemas/types";

export const SceneWrapper: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  // Map semantic intents to React logic
  const motionTypes = scene.motionIntent?.map((intent) => intent.type) || [];
  
  // Wrap content inside requested motions
  let content = (
    <AbsoluteFill style={{ padding: 80, justifyContent: "center", alignItems: "center" }}>
      {scene.text && <TextLayout texts={scene.text} layout={scene.visualIntent?.layout} />}
      {/* Visual content based on intents would go here */}
    </AbsoluteFill>
  );

  // V0 Implementation of generic wrappers
  if (motionTypes.includes("fade-in")) {
    content = <FadeIn>{content}</FadeIn>;
  }
  if (motionTypes.includes("flow")) {
    content = <Flow>{content}</Flow>;
  }
  if (motionTypes.includes("progressive-build")) {
    content = <ProgressiveBuild>{content}</ProgressiveBuild>;
  }
  if (motionTypes.includes("drain")) {
    content = <Drain>{content}</Drain>;
  }
  if (motionTypes.includes("interrupt")) {
    content = <Interrupt>{content}</Interrupt>;
  }

  return content;
};
