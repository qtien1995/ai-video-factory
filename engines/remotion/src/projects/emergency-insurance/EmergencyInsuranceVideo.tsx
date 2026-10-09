import {Audio} from "@remotion/media";
import {AbsoluteFill, interpolate, Sequence, staticFile} from "remotion";
import {CaptionLayer} from "./CaptionLayer";
import {Scene1Hook} from "./Scene1Hook";
import {Scene2Fork} from "./Scene2Fork";
import {Scene3FundOnly} from "./Scene3FundOnly";
import {Scene4Drain} from "./Scene4Drain";
import {Scene5Both} from "./Scene5Both";
import {Scene6Roles} from "./Scene6Roles";
import {Scene7Takeaway} from "./Scene7Takeaway";

const voicePath = (scene: number) =>
  `audio/emergency-insurance/scene-${String(scene).padStart(2, "0")}.mp3`;

export const EmergencyInsuranceVideo: React.FC = () => (
  <AbsoluteFill>
    <Audio
      src={staticFile("audio/emergency-insurance/ambient-bed.wav")}
      volume={(frame) =>
        interpolate(frame, [0, 36, 1260, 1349], [0, 0.105, 0.105, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />

    <Sequence durationInFrames={120} premountFor={30} name="01 Hook">
      <Scene1Hook />
      <Audio src={staticFile(voicePath(1))} volume={1} />
    </Sequence>
    <Sequence from={120} durationInFrames={150} premountFor={30} name="02 Một biến cố">
      <Scene2Fork />
      <Audio src={staticFile(voicePath(2))} volume={1} />
    </Sequence>
    <Sequence from={270} durationInFrames={210} premountFor={30} name="03 Chỉ có quỹ">
      <Scene3FundOnly />
      <Audio src={staticFile(voicePath(3))} volume={1} />
    </Sequence>
    <Sequence from={480} durationInFrames={180} premountFor={30} name="04 Quỹ vơi dần">
      <Scene4Drain />
      <Audio src={staticFile(voicePath(4))} volume={1} />
    </Sequence>
    <Sequence from={660} durationInFrames={300} premountFor={30} name="05 Có cả hai">
      <Scene5Both />
      <Audio src={staticFile(voicePath(5))} volume={1} />
    </Sequence>
    <Sequence from={960} durationInFrames={180} premountFor={30} name="06 Hai vai trò">
      <Scene6Roles />
      <Audio src={staticFile(voicePath(6))} volume={1} />
    </Sequence>
    <Sequence from={1140} durationInFrames={210} premountFor={30} name="07 Takeaway">
      <Scene7Takeaway />
      <Audio src={staticFile(voicePath(7))} volume={1} />
    </Sequence>

    <CaptionLayer />
  </AbsoluteFill>
);

