"use client";

import { LANDING_SECTION_ID } from "@core/constants/landing-sections";
import { WireframeGlobeBackdrop } from "@core/components/wireframe-globe-backdrop";
import { Button } from "@shadcn/ui/button";
import { HeroArtificialText } from "@features/hero/components/hero-artificial-text";
import { HeroBaffleText } from "@features/hero/components/hero-baffle-text";
import { HeroBust } from "@features/hero/components/hero-bust";
import {
  HERO_INTRO_COPY_DURATION_MS,
  HERO_INTRO_TITLE_BAFFLE,
} from "@features/hero/constants/hero-intro";
import { HERO_SCROLL_CSS } from "@features/hero/constants/hero-scroll-parallax";
import { useHeroIntroSequence } from "@features/hero/hooks/use-hero-intro-sequence";
import { useHeroScrollParallax } from "@features/hero/hooks/use-hero-scroll-parallax";
import { cn } from "@shadcn/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRef, type CSSProperties, type ReactNode } from "react";

function scrollToSecondFold() {
  const target = document.getElementById(LANDING_SECTION_ID.contents);
  if (!target) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Supporting copy under the Hero title (Figma Home D / Home M).
 */
const HERO_DESCRIPTION =
  "Chegou a hora de capacitar seu time de liderança para, de uma vez por todas, entender como a IA funciona, enxergar os horizontes possíveis e transformar conhecimento em uso da tecnologia como amplificação estratégica de negócio.";

const HERO_CTA_LABEL = "Quero saber mais";

/**
 * Fluid mobile → stepped desktop → plateau at 3xl (1920px).
 * Atmosphere stays full-bleed; type/bust stop growing past ~2K.
 */
const HERO_TITLE_INTROSPECCAO_SIZE =
  "text-[clamp(2.75rem,1.25rem+8vw,4rem)] md:text-[4.5rem] lg:text-[5.25rem] xl:text-[6rem] 2xl:text-[6.75rem] 3xl:text-[7.5rem]";

const HERO_TITLE_IA_SIZE =
  "text-[clamp(5rem,2rem+14vw,7rem)] md:text-[7.5rem] lg:text-[8.5rem] xl:text-[9.5rem] 2xl:text-[10.5rem] 3xl:text-[12rem]";

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

/**
 * Hero section with scroll parallax: bust moves up faster and fades slower;
 * titles and copy fade out sooner with lighter vertical travel.
 *
 * Intro: global Lottie (first load) → title baffle → copy/CTA fade-in slide-up.
 */
export function HeroParallaxSection({
  children,
}: {
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroScrollParallax(sectionRef);

  const intro = useHeroIntroSequence();

  return (
    <section
      ref={sectionRef}
      aria-label={"Hero"}
      className={cn(
        "relative w-full min-h-fold overflow-hidden",
        "h-fold md:max-h-fold",
        "flex flex-col items-center",
        "hero-empresas-atmosphere text-white",
      )}
    >
      {children ? <div className="relative z-20 w-full shrink-0">{children}</div> : null}

      <WireframeGlobeBackdrop />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "flex items-center justify-center",
        )}
      >
        <div
          className={cn(
            "flex h-full w-full justify-center",
            // Mobile: lift bust so eyes/nose clear the title stack.
            "items-end pb-[36%] md:items-center md:pb-0",
          )}
          style={BUST_LAYER_STYLE}
        >
          <HeroBust
            introMode={intro.bustIntroMode}
            onIntroReady={intro.onBustIntroReady}
            className={cn(
              "select-none",
              /*
                Height-driven so aspect ratio resolves. Caps climb through 2xl/3xl
                then plateau — no pure-vw growth on 4K ultrawides.
              */
              "h-[min(90svh,44rem)] w-auto max-w-[min(100vw,30rem)]",
              // Tall enough to dominate the fold; mild translate keeps crown air.
              "md:h-[min(108svh,68rem)] md:max-w-none",
              "2xl:h-[min(106svh,74rem)]",
              "3xl:h-[min(104svh,82rem)]",
              /*
                Mild lift so eyes/nose clear “Introspecção”; keep breathing room
                at the viewport top on tall/short desktop folds.
              */
              "-translate-y-[min(4vh,1.5rem)]",
              "md:-translate-y-[min(4vh,2rem)]",
              "xl:-translate-y-[min(5vh,2.5rem)]",
              "3xl:-translate-y-[min(4vh,2.25rem)]",
            )}
          />
        </div>
      </div>

      {/*
        Readability scrim — anchored to the section, not the parallax bust layer,
        so scroll does not drag a visible color band across the composition.
      */}
      <div
        aria-hidden={true}
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10",
          "h-[42%] md:h-[38%]",
          "bg-linear-to-b from-transparent via-kickops-gray/35 to-kickops-gray/80",
        )}
      />

      <div
        data-hero-overlay=""
        className={cn(
          "relative z-20 flex w-full flex-1 flex-col items-center justify-end text-center",
          // Figma 1512 → soft grow to 1920 (3xl), then plateau for 4K.
          "max-w-[94.5rem] 3xl:max-w-[120rem]",
          // Mobile: light top pad — justify-end parks the CTA; keep titles readable.
          "px-3 pb-8 pt-4",
          "md:px-8 md:pb-10 md:pt-0",
          "3xl:pb-12",
        )}
      >
        <h1
          className={cn(
            "flex w-full max-w-full flex-col items-center overflow-visible",
            "leading-none tracking-tight",
            !intro.titleActive && "invisible",
          )}
          style={TITLE_LAYER_STYLE}
          aria-hidden={!intro.titleActive}
        >
          <span
            className={cn(
              "flex w-full items-center",
              "flex-col lg:flex-row lg:items-baseline lg:justify-center lg:gap-4",
            )}
          >
            <HeroBaffleText
              text={"Kickops"}
              enabled={intro.titleActive}
              delay={HERO_INTRO_TITLE_BAFFLE.introspeccao.delay}
              duration={HERO_INTRO_TITLE_BAFFLE.introspeccao.duration}
              className={cn(
                "font-abril-fatface",
                "bg-linear-to-b from-white to-[#f5f5f5] bg-clip-text text-transparent",
                HERO_TITLE_INTROSPECCAO_SIZE,
              )}
            />
            <HeroBaffleText
              text={"Academy"}
              enabled={intro.titleActive}
              delay={HERO_INTRO_TITLE_BAFFLE.academy.delay}
              duration={HERO_INTRO_TITLE_BAFFLE.academy.duration}
              className={cn(
                "font-abril-fatface",
                "bg-linear-to-b from-white to-[#f5f5f5] bg-clip-text text-transparent",
                HERO_TITLE_INTROSPECCAO_SIZE,
                "-mt-[0.08em] lg:mt-0",
              )}
            />
          </span>

          <span
            className={cn(
              "font-league-gothic font-black uppercase tracking-normal",
              "flex w-fit max-w-full flex-col items-center justify-center overflow-visible leading-none",
              "lg:flex-row lg:gap-[0.15em]",
              HERO_TITLE_IA_SIZE,
              "-mt-1 lg:-mt-4",
            )}
          >
            <HeroBaffleText
              text={"Para"}
              enabled={intro.titleActive}
              delay={HERO_INTRO_TITLE_BAFFLE.inteligencia.delay}
              duration={HERO_INTRO_TITLE_BAFFLE.inteligencia.duration}
              className={cn("block text-kickops-green")}
            />
            <HeroArtificialText
              text="empresas"
              enabled={intro.titleActive}
              delay={HERO_INTRO_TITLE_BAFFLE.artificial.delay}
              duration={HERO_INTRO_TITLE_BAFFLE.artificial.duration}
              className={cn("text-kickops-yellow", "-mt-[0.14em] lg:mt-0")}
            />
          </span>
        </h1>

        {/*
          Outer: scroll Y only. Opacity stays on the intro child so parallax
          vars cannot hide copy before the baffle finishes.
        */}
        <div
          style={{
            transform: `translate3d(0, var(${HERO_SCROLL_CSS.copyY}, 0px), 0)`,
            opacity: intro.copyActive
              ? `var(${HERO_SCROLL_CSS.copyOpacity}, 1)`
              : 1,
          }}
        >
          <div
            style={{
              opacity: intro.copyActive ? 1 : 0,
              transform: intro.copyActive
                ? "translateY(0)"
                : "translateY(1.25rem)",
              transition: `opacity ${HERO_INTRO_COPY_DURATION_MS}ms ease-out, transform ${HERO_INTRO_COPY_DURATION_MS}ms ease-out`,
            }}
            className={cn(
              "motion-reduce:transition-none",
              !intro.copyActive && "pointer-events-none",
            )}
          >
            <p
              className={cn(
                "mt-3 max-w-[20.5625rem] text-sm leading-[1.4] text-white",
                "md:mt-4 md:max-w-[40rem] md:text-base",
                "3xl:mt-5 3xl:max-w-[48rem] 3xl:text-lg",
              )}
            >
              {HERO_DESCRIPTION}
            </p>

            <Button
              type="button"
              onClick={scrollToSecondFold}
              className={cn(
                "group mt-5 h-auto rounded-none border-0 md:mt-6 3xl:mt-8",
                "inline-flex items-center justify-center",
                // Figma Buttom: Amarelo → Variant2 (white + arrow)
                "bg-kickops-yellow px-10 py-4 3xl:px-12 3xl:py-5",
                "text-base font-bold text-kickops-gray md:text-lg 3xl:text-xl",
                "transition-colors duration-300 ease-out",
                "hover:bg-white focus-visible:bg-white active:bg-white",
              )}
            >
              {HERO_CTA_LABEL}
              <span
                aria-hidden
                className={cn(
                  "inline-flex h-6 shrink-0 overflow-hidden text-kickops-gray 3xl:h-7",
                  "w-0 opacity-0",
                  "transition-[width,opacity,margin] duration-300 ease-out",
                  "group-hover:ml-2 group-hover:w-6 group-hover:opacity-100",
                  "group-focus-visible:ml-2 group-focus-visible:w-6 group-focus-visible:opacity-100",
                  "3xl:group-hover:w-7 3xl:group-focus-visible:w-7",
                  "motion-reduce:transition-none",
                )}
              >
                <ArrowRight
                  className={cn(
                    "size-6 shrink-0 3xl:size-7",
                    "-translate-x-2 transition-transform duration-300 ease-out",
                    "group-hover:translate-x-0 group-focus-visible:translate-x-0",
                    "motion-reduce:translate-x-0",
                  )}
                  strokeWidth={2.25}
                />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
