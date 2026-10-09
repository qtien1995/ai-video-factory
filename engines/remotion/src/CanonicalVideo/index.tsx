import { AbsoluteFill, Sequence } from "remotion";
import { SceneWrapper } from "./components/SceneWrapper";
import type { CanonicalVideoSpec } from "../../../../core/schemas/types";

export const CanonicalVideo: React.FC<{ spec: CanonicalVideoSpec | null }> = ({ spec }) => {
  if (!spec || !spec.script || !spec.script.scenes) {
    return <AbsoluteFill style={{ backgroundColor: "red" }}>INVALID SPEC</AbsoluteFill>;
  }

  let nextFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {spec.script.scenes.map((scene) => {
        const fps = spec.format.fps || spec.format.fpsPreference || 30;
        const startFrame = scene.startFrame ?? (scene.startMs == null ? nextFrame : Math.ceil(scene.startMs / 1000 * fps));
        const durationFrames = scene.durationFrames ?? Math.ceil(scene.durationMs / 1000 * fps);
        nextFrame = startFrame + durationFrames;
        return (
          <Sequence
            key={scene.id}
            from={startFrame}
            durationInFrames={durationFrames}
          >
            <SceneWrapper scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
