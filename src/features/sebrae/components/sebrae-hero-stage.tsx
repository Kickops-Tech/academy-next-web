"use client";

import { HeroBust } from "@features/hero/components/hero-bust";
import { HERO_SCROLL_CSS } from "@features/hero/constants/hero-scroll-parallax";
import { useHeroScrollParallax } from "@features/hero/hooks/use-hero-scroll-parallax";
import { useRef, type ReactNode } from "react";

export function SebraeHeroStage({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroScrollParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="sebrae-hero"
      aria-labelledby="sebrae-hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--sebrae-header-height))] flex-col overflow-hidden bg-kickops-gray text-white"
    >
      <div
        aria-hidden
        className="sebrae-hero-atmosphere absolute inset-0 -z-20"
      />
      <div aria-hidden className="sebrae-hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-0 -z-10 flex justify-end lg:inset-y-0 lg:right-[3%] lg:w-[48%] lg:items-center"
        style={{
          transform: `translate3d(0, var(${HERO_SCROLL_CSS.bustY}, 0px), 0)`,
          opacity: `var(${HERO_SCROLL_CSS.bustOpacity}, 1)`,
        }}
      >
        <HeroBust className="h-[clamp(17rem,45svh,27rem)] w-auto max-w-none select-none lg:h-[min(105svh,64rem)]" />
      </div>
      <div
        aria-hidden
        className="sebrae-hero-scrim pointer-events-none absolute inset-0 -z-10"
      />
      {children}
    </section>
  );
}
