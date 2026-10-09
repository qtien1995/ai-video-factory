import {Audio} from "@remotion/media";
import {AbsoluteFill, interpolate, Sequence, staticFile} from "remotion";
import {RedesignedScene1, RedesignedScene2, RedesignedScene3, RedesignedScene4, RedesignedScene5, RedesignedScene6, RedesignedScene7, RedesignedScene8} from "./RedesignedScenes";

export const IncomeProtectionVideo: React.FC = () => <AbsoluteFill>
  <Audio src={staticFile("audio/ambient-bed.wav")} volume={(frame) => interpolate(frame, [0, 30, 1410, 1470], [0, 0.13, 0.13, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})} />
  <Sequence durationInFrames={150} name="01 Hook"><RedesignedScene1 /><Audio src={staticFile("audio/voiceover/scene-01.mp3")} volume={1} /></Sequence>
  <Sequence from={150} durationInFrames={150} name="02 Income stops"><RedesignedScene2 /><Audio src={staticFile("audio/voiceover/scene-02.mp3")} volume={1} /></Sequence>
  <Sequence from={300} durationInFrames={180} name="03 Expenses"><RedesignedScene3 /><Audio src={staticFile("audio/voiceover/scene-03.mp3")} volume={1} /></Sequence>
  <Sequence from={480} durationInFrames={210} name="04 Six-month timeline"><RedesignedScene4 /><Audio src={staticFile("audio/voiceover/scene-04.mp3")} volume={1} /></Sequence>
  <Sequence from={690} durationInFrames={180} name="05 Pressure"><RedesignedScene5 /><Audio src={staticFile("audio/voiceover/scene-05.mp3")} volume={1} /></Sequence>
  <Sequence from={870} durationInFrames={210} name="06 Reframe"><RedesignedScene6 /><Audio src={staticFile("audio/voiceover/scene-06.mp3")} volume={1} /></Sequence>
  <Sequence from={1080} durationInFrames={150} name="07 Question"><RedesignedScene7 /><Audio src={staticFile("audio/voiceover/scene-07.mp3")} volume={1} /></Sequence>
  <Sequence from={1230} durationInFrames={240} name="08 CTA"><RedesignedScene8 /><Audio src={staticFile("audio/voiceover/scene-08.mp3")} volume={1} /></Sequence>
</AbsoluteFill>;
