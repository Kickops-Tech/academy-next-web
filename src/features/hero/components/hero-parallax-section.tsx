"use client";

import { WireframeGlobeBackdrop } from "@core/components/wireframe-globe-backdrop";
import { LANDING_SECTION_ID } from "@core/constants/landing-sections";
import {
  COMPANY_CONTACT_HREF,
  COMPANY_CONTACT_LABEL,
} from "@features/contact/constants/company-contact";
import { HeroBust } from "@features/hero/components/hero-bust";
import { HERO_SCROLL_CSS } from "@features/hero/constants/hero-scroll-parallax";
import { useHeroScrollParallax } from "@features/hero/hooks/use-hero-scroll-parallax";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

export function HeroParallaxSection({ children }: { children?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroScrollParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="empresas-title"
      className="hero-empresas-atmosphere relative isolate flex min-h-svh flex-col overflow-hidden text-white"
    >
      {children}
      <WireframeGlobeBackdrop className="opacity-35" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-[2%] -z-10 hidden w-[44%] items-center justify-center lg:flex xl:right-0"
        style={{
          transform: `translate3d(0, var(${HERO_SCROLL_CSS.bustY}, 0px), 0)`,
          opacity: `var(${HERO_SCROLL_CSS.bustOpacity}, 1)`,
        }}
      >
        <HeroBust
          introMode="instant"
          className="h-[min(116svh,72rem)] w-auto max-w-none shrink-0 translate-y-12 xl:h-[min(140svh,88rem)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-kickops-gray via-kickops-gray/85 to-transparent lg:via-40% lg:to-65%"
      />

      <div className="relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center px-5 py-12 md:px-10 md:py-16 xl:px-16">
        <div className="max-w-3xl lg:max-w-[62%]">
          <p className="font-dm-mono text-xs leading-relaxed tracking-[0.16em] text-kickops-green uppercase md:text-sm">
            Treinamento in company, feito sob medida
          </p>
          <h1
            id="empresas-title"
            className="mt-6 text-balance font-league-gothic text-[clamp(3.75rem,7.5vw,8rem)] leading-[0.95] uppercase"
          >
            Sua liderança, <span className="text-kickops-yellow">pensando e navegando com a IA</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 md:text-xl">
            Capacite seu time para identificar onde a IA faz sentido, rever
            processos e escolher o que testar primeiro. Um treinamento construído
            a partir dos desafios da sua empresa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
            <a
              href={COMPANY_CONTACT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-kickops-yellow px-6 py-4 text-center font-bold text-kickops-gray transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kickops-yellow"
            >
              {COMPANY_CONTACT_LABEL}
              <ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
            </a>
            <a
              href={`#${LANDING_SECTION_ID.contents}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm underline decoration-white/40 underline-offset-4 hover:text-kickops-yellow"
            >
              Entender como funciona
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-white/65">
            Conte seu desafio pelo WhatsApp. A conversa começa pelo seu contexto.
          </p>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-5 text-sm text-kickops-green">
            <li>Presencial ou online</li>
            <li>Conteúdo personalizado</li>
            <li>Sessão de acompanhamento</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
