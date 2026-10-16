"use client";

import { HeroBaffleText } from "@features/hero/components/hero-baffle-text";
import { HeroBust } from "@features/hero/components/hero-bust";
import { HERO_SCROLL_CSS } from "@features/hero/constants/hero-scroll-parallax";
import { useHeroScrollParallax } from "@features/hero/hooks/use-hero-scroll-parallax";
import { SebraeHeader } from "@features/sebrae/components/sebrae-header";
import type { SebraeTrainingData } from "@features/sebrae/models/sebrae-training";
import { isCheckoutReady } from "@features/sebrae/utils/is-checkout-ready";
import { cn } from "@shadcn/lib/utils";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";

type SebraeHeroProps = Pick<SebraeTrainingData, "hero" | "offer" | "event">;

function layerStyle(yVar: string, opacityVar: string): CSSProperties {
  return {
    transform: `translate3d(0, var(${yVar}, 0px), 0)`,
    opacity: `var(${opacityVar}, 1)`,
  };
}

const BUST_LAYER_STYLE = layerStyle(
  HERO_SCROLL_CSS.bustY,
  HERO_SCROLL_CSS.bustOpacity,
);
const TITLE_LAYER_STYLE = layerStyle(
  HERO_SCROLL_CSS.titleY,
  HERO_SCROLL_CSS.titleOpacity,
);
const COPY_LAYER_STYLE = layerStyle(
  HERO_SCROLL_CSS.copyY,
  HERO_SCROLL_CSS.copyOpacity,
);

export function SebraeHero({ hero, offer, event }: SebraeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const checkoutReady = isCheckoutReady(offer.checkoutUrl);
  useHeroScrollParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sebrae-hero-title"
      className="relative flex min-h-fold w-full flex-col overflow-hidden bg-[#121212] text-white"
    >
      <div aria-hidden="true" className="sebrae-hero-atmosphere absolute inset-0" />
      <div aria-hidden="true" className="sebrae-hero-grid absolute inset-0 z-0" />

      <SebraeHeader
        checkoutUrl={offer.checkoutUrl}
        ctaLabel={hero.ctaLabel}
        fallbackCtaLabel={hero.fallbackCtaLabel}
      />

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center lg:justify-end lg:pr-[7vw]">
        <div
          className="flex h-full items-center justify-center pb-[20%] lg:pb-0"
          style={BUST_LAYER_STYLE}
        >
          <HeroBust
            introMode="fade"
            className={cn(
              "h-[min(78svh,39rem)] w-auto max-w-[min(100vw,28rem)] select-none",
              "md:h-[min(96svh,60rem)] md:max-w-none",
              "xl:h-[min(106svh,68rem)] 3xl:h-[min(104svh,78rem)]",
              "-translate-y-[2vh] lg:translate-y-[2vh]",
            )}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent via-[#121212]/25 to-[#121212] lg:bg-linear-to-r lg:from-[#121212] lg:via-[#121212]/72 lg:to-transparent"
      />

      <div className="relative z-20 mx-auto flex w-full max-w-[120rem] flex-1 items-end px-5 pt-[43svh] pb-9 md:px-10 md:pt-[44svh] md:pb-14 xl:px-16 xl:pt-20 xl:pb-16">
        <div className="w-full max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-dm-mono text-[9px] tracking-[0.18em] text-[#14F596] uppercase md:text-xs">
              {hero.eyebrow}
            </p>
            <span className="bg-[#D7FA00] px-2 py-1 font-dm-mono text-[8px] tracking-[0.14em] text-[#460A8C] uppercase md:text-[10px]">
              {hero.badge}
            </span>
          </div>

          <h1
            id="sebrae-hero-title"
            className="mt-5 flex flex-col items-start leading-none"
            style={TITLE_LAYER_STYLE}
          >
            <HeroBaffleText
              text={hero.titlePrimary}
              delay={100}
              duration={1300}
              className="font-abril-fatface text-[clamp(2.7rem,8vw,7rem)] tracking-tight text-white"
            />
            <HeroBaffleText
              text={hero.titleSecondary}
              delay={320}
              duration={1550}
              className="-mt-[0.02em] font-league-gothic text-[clamp(5.2rem,15vw,12rem)] font-black tracking-[-0.01em] text-[#D7FA00] uppercase"
            />
          </h1>

          <div style={COPY_LAYER_STYLE}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base xl:text-lg">
              {hero.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={checkoutReady ? offer.checkoutUrl : "#oferta"}
                className="group inline-flex items-center gap-8 bg-[#FF2C63] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#460A8C] md:text-base"
              >
                {checkoutReady ? hero.ctaLabel : hero.fallbackCtaLabel}
                <ArrowRight
                  aria-hidden
                  className="size-5 transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#treinamento"
                className="inline-flex items-center gap-2 px-2 py-3 font-dm-mono text-[10px] tracking-[0.12em] text-white/60 uppercase transition-colors hover:text-white"
              >
                Ver o treinamento
                <ArrowDownRight aria-hidden className="size-4" />
              </a>
            </div>
          </div>

          <p className="mt-9 font-dm-mono text-[9px] tracking-[0.14em] text-white/40 uppercase md:text-[10px]">
            {event.shortName} • {event.dates} • {event.location}
          </p>
        </div>
      </div>
    </section>
  );
}
