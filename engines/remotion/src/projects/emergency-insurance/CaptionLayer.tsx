import {createTikTokStyleCaptions} from "@remotion/captions";
import type {Caption, TikTokPage} from "@remotion/captions";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import {COLORS, FONT} from "./shared";

const SWITCH_CAPTIONS_EVERY_MS = 1180;

const CaptionPage: React.FC<{page: TikTokPage}> = ({page}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;
  const visibleTokens = page.tokens.filter(
    (token) => token.fromMs <= page.startMs + SWITCH_CAPTIONS_EVERY_MS + 80,
  );

  return (
    <AbsoluteFill style={{justifyContent: "flex-end", alignItems: "center", paddingBottom: 108, pointerEvents: "none"}}>
      <div
        style={{
          maxWidth: 900,
          minHeight: 96,
          padding: "20px 30px 22px",
          borderRadius: 27,
          backgroundColor: "#102A20EE",
          border: "1px solid #FFFFFF20",
          boxShadow: "0 22px 60px #07160F40",
          fontFamily: FONT,
          fontSize: 47,
          fontWeight: 600,
          lineHeight: 1.23,
          textAlign: "center",
          color: COLORS.paper,
          whiteSpace: "pre-wrap",
        }}
      >
        {visibleTokens.map((token) => {
          const active = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
          return (
            <span key={`${token.fromMs}-${token.toMs}`} style={{color: active ? COLORS.lime : COLORS.paper}}>
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const CaptionLayer: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender("Loading emergency-insurance captions"));
  const {fps, durationInFrames} = useVideoConfig();

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile("captions/emergency-insurance.json"));
      if (!response.ok) {
        throw new Error(`Caption request failed: ${response.status}`);
      }
      const data = (await response.json()) as Caption[];
      setCaptions(data);
      continueRender(handle);
    } catch (error) {
      cancelRender(error instanceof Error ? error : new Error(String(error)));
    }
  }, [cancelRender, continueRender, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const pages = useMemo(() => {
    if (!captions) {
      return [];
    }
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions]);

  if (!captions) {
    return null;
  }

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.max(0, Math.round((page.startMs / 1000) * fps));
        const requestedEndFrame = Math.round(
          Math.min(
            nextPage ? (nextPage.startMs / 1000) * fps : durationInFrames,
            startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps,
          ),
        );
        const endFrame = Math.min(durationInFrames, Math.max(startFrame + 1, requestedEndFrame));

        return (
          <Sequence
            key={`${page.startMs}-${index}`}
            from={startFrame}
            durationInFrames={endFrame - startFrame}
            premountFor={fps}
            name={`Caption ${index + 1}`}
          >
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
