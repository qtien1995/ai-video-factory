import {loadFont} from "@remotion/fonts";
import {staticFile} from "remotion";

export const FONT_FAMILY = "Segoe UI Infographic";

loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/SegoeUI-Regular.ttf"),
  weight: "400",
});
loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/SegoeUI-Semibold.ttf"),
  weight: "600",
});
loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/SegoeUI-Bold.ttf"),
  weight: "700",
});
