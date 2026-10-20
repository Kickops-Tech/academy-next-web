"use client";

import { WireframeGlobeBackdrop } from "@core/components/wireframe-globe-backdrop";
import { HeroBaffleText } from "@features/hero/components/hero-baffle-text";
import { HeroBust } from "@features/hero/components/hero-bust";
import { HERO_SCROLL_CSS } from "@features/hero/constants/hero-scroll-parallax";
import { useHeroScrollParallax } from "@features/hero/hooks/use-hero-scroll-parallax";
import { TrainingsHeader } from "@features/trainings/components/trainings-header";
import type { TrainingCatalog } from "@features/trainings/models/training";
import {
  CATALOG_SECTION_ID,
  scrollToCatalog,
} from "@features/trainings/utils/scroll-to-catalog";
import { cn } from "@shadcn/lib/utils";
import { ArrowDown } from "lucide-react";
import { useRef, type CSSProperties } from "react";

type TrainingsHeroProps = {
  catalog: TrainingCatalog["catalog"];
};

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

export function TrainingsHero({ catalog }: TrainingsHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroScrollParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trainings-hero-title"
      className={cn(
        "relative flex w-full min-h-fold flex-col items-center overflow-hidden",
        "md:h-fold md:max-h-fold",
        "bg-kickops-gray text-white",
        "bg-radial from-kickops-lightgray to-kickops-gray",
      )}
    >
      <TrainingsHeader current="catalog" className="shrink-0" />

      <WireframeGlobeBackdrop />

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="flex h-full w-full items-center justify-center pb-[26%] md:pb-0"
          style={BUST_LAYER_STYLE}
        >
          <HeroBust
            introMode="fade"
            className={cn(
              "h-[min(86svh,44rem)] w-auto max-w-[min(100vw,30rem)] select-none",
              "md:h-[min(92svh,58rem)] md:max-w-none",
              "2xl:h-[min(90svh,64rem)] 3xl:h-[min(88svh,70rem)]",
              "-translate-y-[min(2vh,1rem)] md:-translate-y-[min(12vh,5.5rem)]",
            )}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10",
          "h-[62%] md:h-[54%]",
          "bg-linear-to-b from-transparent via-kickops-gray/60 to-kickops-gray",
        )}
      />

      <div className="relative z-20 mx-auto flex w-full max-w-[120rem] flex-1 flex-col items-center justify-end px-3 pt-[36svh] pb-8 text-center md:px-8 md:pt-0 md:pb-10 3xl:pb-14">
        <p className="font-dm-mono text-[9px] tracking-[0.2em] text-kickops-green uppercase md:w-fit md:border md:border-white/20 md:bg-black/35 md:px-2.5 md:py-0.5 md:text-sm md:tracking-[0.16em] md:text-white md:backdrop-blur-md">
          {catalog.eyebrow}
        </p>

        <h1
          id="trainings-hero-title"
          className="mt-3 flex w-full flex-col items-center overflow-visible leading-none"
          style={TITLE_LAYER_STYLE}
        >
          <HeroBaffleText
            text={catalog.heroTitlePrimary}
            delay={100}
            duration={1200}
            className={cn(
              "font-abril-fatface tracking-tight",
              "bg-linear-to-b from-white to-[#f5f5f5] bg-clip-text text-transparent",
              "text-[clamp(3.75rem,8vw,8.5rem)] 3xl:text-[9.5rem]",
            )}
          />
          <HeroBaffleText
            text={catalog.heroTitleSecondary}
            delay={320}
            duration={1450}
            className={cn(
              "-mt-[0.06em] font-league-gothic font-black tracking-normal text-kickops-green uppercase",
              "text-[clamp(6rem,12vw,13rem)] 3xl:text-[15rem]",
            )}
          />
        </h1>

        <div style={COPY_LAYER_STYLE} className="flex flex-col items-center">
          <p className="mt-3 max-w-[21rem] text-sm leading-[1.4] text-white md:max-w-[45rem] md:text-base 3xl:max-w-[52rem] 3xl:text-lg">
            <strong className="font-bold">{catalog.title}</strong>{" "}
            <span className="text-white/70">{catalog.description}</span>
          </p>
          <a
            href={`#${CATALOG_SECTION_ID}`}
            aria-label="Ir para o catálogo de treinamentos"
            onClick={scrollToCatalog}
            className="mt-5 flex size-11 items-center justify-center border border-white/35 text-white transition-colors hover:border-kickops-yellow hover:bg-kickops-yellow hover:text-kickops-gray md:mt-6 md:size-12"
          >
            <ArrowDown aria-hidden className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
