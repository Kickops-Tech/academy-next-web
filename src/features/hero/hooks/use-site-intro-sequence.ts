"use client";

import type { SiteIntroPhase } from "@features/hero/contexts/site-intro-context";
import {
  HERO_INTRO_LOADER,
  HERO_INTRO_LOADER_ENABLED,
} from "@features/hero/constants/hero-intro";
import {
  hasSeenSiteIntro,
  hideSiteIntroCurtain,
  isSiteIntroSkipPath,
  lockSiteIntroScroll,
  markSiteIntroSeen,
  SITE_INTRO_SCROLL_LOCK_CLASS,
  unlockSiteIntroScroll,
} from "@features/hero/utils/site-intro";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export interface SiteIntroSequence {
  phase: SiteIntroPhase;
  loaderMounted: boolean;
  pageReady: boolean;
  showBackdrop: boolean;
  onPlayerReady: () => void;
  onReveal: () => void;
  onFinish: () => void;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Plays the Kickops Lottie once per tab on first load. Checkout, `/sebrae`,
 * reduced motion, and a seen session skip the curtain.
 */
export function useSiteIntroSequence(): SiteIntroSequence {
  const pathname = usePathname();
  const enabled = HERO_INTRO_LOADER_ENABLED;

  const [phase, setPhase] = useState<SiteIntroPhase>("boot");
  const [loaderMounted, setLoaderMounted] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(enabled);
  const [fontsReady, setFontsReady] = useState(false);
  const [readyTimedOut, setReadyTimedOut] = useState(false);

  const finishedRef = useRef(false);
  const safetyTimerRef = useRef<number | null>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const pageReady = readyTimedOut || fontsReady;

  const clearSafetyTimer = useCallback(() => {
    if (safetyTimerRef.current !== null) {
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  const skipIntro = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    clearSafetyTimer();
    setLoaderMounted(false);
    setShowBackdrop(false);
    setPhase("skipped");
    hideSiteIntroCurtain();
    document.documentElement.classList.remove(SITE_INTRO_SCROLL_LOCK_CLASS);
  }, [clearSafetyTimer]);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) {
      return;
    }
    finishedRef.current = true;
    clearSafetyTimer();
    setLoaderMounted(false);
    setShowBackdrop(false);
    setPhase("done");
    markSiteIntroSeen();
    unlockSiteIntroScroll();
  }, [clearSafetyTimer]);

  const onPlayerReady = useCallback(() => {
    setShowBackdrop(false);
  }, []);

  const onReveal = useCallback(() => {
    setPhase((current) => (current === "playing" ? "revealed" : current));
  }, []);

  const onFinish = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  useEffect(() => {
    if (finishedRef.current) {
      return;
    }

    if (!enabled) {
      skipIntro();
      return;
    }

    const path = pathnameRef.current;

    if (prefersReducedMotion() || hasSeenSiteIntro()) {
      markSiteIntroSeen();
      skipIntro();
      return;
    }

    if (isSiteIntroSkipPath(path)) {
      skipIntro();
      return;
    }

    lockSiteIntroScroll();
    setLoaderMounted(true);
    setPhase("playing");

    let cancelled = false;
    const fonts = document.fonts;
    if (fonts?.ready) {
      void fonts.ready.then(() => {
        if (!cancelled) {
          setFontsReady(true);
        }
      });
    } else {
      setFontsReady(true);
    }

    const readyTimer = window.setTimeout(() => {
      setReadyTimedOut(true);
    }, HERO_INTRO_LOADER.readyTimeoutMs);

    safetyTimerRef.current = window.setTimeout(() => {
      safetyTimerRef.current = null;
      finishIntro();
    }, HERO_INTRO_LOADER.backdropSafetyMs);

    return () => {
      cancelled = true;
      window.clearTimeout(readyTimer);
      clearSafetyTimer();
      document.documentElement.classList.remove(SITE_INTRO_SCROLL_LOCK_CLASS);
    };
    // First document load only — later client navigations keep the finished phase.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- first load only
  }, []);

  return {
    phase,
    loaderMounted,
    pageReady,
    showBackdrop,
    onPlayerReady,
    onReveal,
    onFinish,
  };
}
