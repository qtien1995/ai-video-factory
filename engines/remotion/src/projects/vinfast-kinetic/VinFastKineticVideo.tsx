import React, { useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, useCurrentFrame } from "remotion";
import {
  KineticBackdrop,
  TelemetryOverlay,
  Scene1Intro,
  Scene2CountIn,
  Scene3Slam,
  Scene4BuildUp,
  Scene5DropEnergy,
  Scene6Chorus,
  Scene7EndCard,
} from "./VinFastScenes";

export const VinFastKineticVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Font loading barrier for Vietnamese typography
  const [fontHandle] = useState(() => delayRender("Wait for Vietnamese fonts"));
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => continueRender(fontHandle))
        .catch(() => continueRender(fontHandle));
    } else {
      continueRender(fontHandle);
    }
  }, [fontHandle]);

  // Frame timing boundaries
  const isScene1 = frame < 60;
  const isScene2 = frame >= 60 && frame < 240;
  const isScene3 = frame >= 240 && frame < 330;
  const isScene4 = frame >= 330 && frame < 510;
  const isScene5 = frame >= 510 && frame < 660;
  const isScene6 = frame >= 660 && frame < 810;
  const isScene7 = frame >= 810;

  // Active theme color and model tracking for HUD
  let activeTheme: "blue" | "green" | "red" = "blue";
  let activeModelIdx = 0;

  if (isScene2) {
    activeModelIdx = Math.min(Math.floor((frame - 60) / 30), 5);
  } else if (isScene4) {
    const cardIdx = Math.min(Math.floor((frame - 330) / 45), 3);
    activeModelIdx = cardIdx; // VF 3, 5, 6, 7
  } else if (isScene5) {
    activeTheme = "red";
    activeModelIdx = 3;
  } else if (isScene6) {
    activeTheme = "green";
    activeModelIdx = 5;
  } else if (isScene7) {
    activeTheme = "green";
    activeModelIdx = 5;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05070D",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background with Laser Horizon and 3D Perspective Grid */}
      <KineticBackdrop activeTheme={activeTheme} />

      {/* Persistent HUD & Telemetry */}
      <TelemetryOverlay activeModelIndex={activeModelIdx} />

      {/* SCENE 1: INTRO (0s - 2s) */}
      {isScene1 && <Scene1Intro />}

      {/* SCENE 2: STACCATO COUNT-IN (2s - 8s) */}
      {isScene2 && <Scene2CountIn subFrame={frame - 60} />}

      {/* SCENE 3: SLAM LOGO (8s - 11s) */}
      {isScene3 && <Scene3Slam subFrame={frame - 240} />}

      {/* SCENE 4: BUILD-UP CARDS (11s - 17s) */}
      {isScene4 && <Scene4BuildUp subFrame={frame - 330} />}

      {/* SCENE 5: DROP ENERGY (17s - 22s) */}
      {isScene5 && <Scene5DropEnergy subFrame={frame - 510} />}

      {/* SCENE 6: CHORUS GREEN MODE (22s - 27s) */}
      {isScene6 && <Scene6Chorus subFrame={frame - 660} />}

      {/* SCENE 7: END CARD & SHOWROOM (27s - 33s) */}
      {isScene7 && <Scene7EndCard subFrame={frame - 810} />}
    </AbsoluteFill>
  );
};
