"use client";

import { SiteIntroContext } from "@features/hero/contexts/site-intro-context";
import type { HeroIntroLoaderProps } from "@features/hero/components/hero-intro-loader";
import { HERO_INTRO_LOADER_ENABLED } from "@features/hero/constants/hero-intro";
import { useSiteIntroSequence } from "@features/hero/hooks/use-site-intro-sequence";
import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";

/**
 * Lazy Lottie player. Import lives only here so the kill-switch never pulls
 * `lottie_light` / JSON into the root chunk. Failed chunk → onFinish release.
 */
const HeroIntroLoader = HERO_INTRO_LOADER_ENABLED
  ? dynamic(
      () =>
        import("@features/hero/components/hero-intro-loader").catch(() => ({
          default: function HeroIntroLoaderFailed({
            onFinish,
          }: HeroIntroLoaderProps) {
            useEffect(() => {
              onFinish();
            }, [onFinish]);
            return null;
          },
        })),
      { ssr: false },
    )
  : null;

/**
 * Global first-load curtain: Lottie once per tab, then children.
 */
export function SiteIntroRoot({ children }: { children: ReactNode }) {
  const intro = useSiteIntroSequence();

  return (
    <SiteIntroContext.Provider value={{ phase: intro.phase }}>
      {intro.showBackdrop ? (
        <div className="hero-intro-backdrop" aria-hidden={true} />
      ) : null}

      {intro.loaderMounted && HeroIntroLoader ? (
        <HeroIntroLoader
          pageReady={intro.pageReady}
          onPlayerReady={intro.onPlayerReady}
          onReveal={intro.onReveal}
          onFinish={intro.onFinish}
        />
      ) : null}

      {children}
    </SiteIntroContext.Provider>
  );
}
