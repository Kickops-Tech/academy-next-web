"use client";

import {
  HERO_INTRO_COPY_AFTER_TITLE_MS,
  HERO_INTRO_LOADER,
  HERO_INTRO_TITLE_GAP_MS,
} from "@features/hero/constants/hero-intro";
import { useSiteIntro } from "@features/hero/contexts/site-intro-context";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroBustIntroMode = "fade" | "instant";

export interface HeroIntroSequence {
  titleActive: boolean;
  copyActive: boolean;
  bustIntroMode: HeroBustIntroMode;
  onBustIntroReady: () => void;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hero title/copy after the global Lottie (or the bust-fade path when the
 * curtain already played or was skipped).
 */
export function useHeroIntroSequence(): HeroIntroSequence {
  const { phase } = useSiteIntro();

  const [titleActive, setTitleActive] = useState(false);
  const [copyActive, setCopyActive] = useState(false);
  const [bustReady, setBustReady] = useState(false);
  const [bindToCurtain] = useState(
    () => phase !== "skipped" && phase !== "done",
  );

  const revealedRef = useRef(false);
  const baffleDelayTimerRef = useRef<number | null>(null);

  const activateTitle = useCallback(() => {
    if (revealedRef.current) {
      return;
    }
    revealedRef.current = true;
    setTitleActive(true);
  }, []);

  const scheduleTitleAfterReveal = useCallback(() => {
    if (revealedRef.current || baffleDelayTimerRef.current !== null) {
      return;
    }
    baffleDelayTimerRef.current = window.setTimeout(() => {
      baffleDelayTimerRef.current = null;
      activateTitle();
    }, HERO_INTRO_LOADER.baffleDelayMs);
  }, [activateTitle]);

  const startFadeTitle = useCallback(() => {
    if (revealedRef.current) {
      return;
    }

    if (prefersReducedMotion()) {
      setCopyActive(true);
      activateTitle();
      return;
    }

    const timer = window.setTimeout(activateTitle, HERO_INTRO_TITLE_GAP_MS);
    return () => window.clearTimeout(timer);
  }, [activateTitle]);

  const onBustIntroReady = useCallback(() => {
    setBustReady(true);
  }, []);

  useEffect(() => {
    if (titleActive) {
      return;
    }

    if (phase === "revealed") {
      scheduleTitleAfterReveal();
      return;
    }

    if (phase === "done" && bindToCurtain && !revealedRef.current) {
      scheduleTitleAfterReveal();
      return;
    }

    if (phase === "done" && !bindToCurtain && bustReady) {
      return startFadeTitle();
    }

    if (phase === "skipped" && bustReady) {
      return startFadeTitle();
    }
  }, [
    bindToCurtain,
    bustReady,
    phase,
    scheduleTitleAfterReveal,
    startFadeTitle,
    titleActive,
  ]);

  useEffect(() => {
    return () => {
      if (baffleDelayTimerRef.current !== null) {
        window.clearTimeout(baffleDelayTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!titleActive || copyActive) {
      return;
    }

    if (prefersReducedMotion()) {
      setCopyActive(true);
      return;
    }

    const timer = window.setTimeout(
      () => setCopyActive(true),
      HERO_INTRO_COPY_AFTER_TITLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [titleActive, copyActive]);

  return {
    titleActive,
    copyActive,
    bustIntroMode: bindToCurtain ? "instant" : "fade",
    onBustIntroReady,
  };
}
