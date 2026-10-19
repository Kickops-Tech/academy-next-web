import { HeroBaffleText } from "@features/hero/components/hero-baffle-text";
import { CalendarDays } from "lucide-react";
import type { SebraeTrainingData } from "../models/sebrae-training";
import { SebraeCta } from "./sebrae-cta";
import { SebraeHeroStage } from "./sebrae-hero-stage";

export function SebraeHero({ data }: { data: SebraeTrainingData }) {
  return (
    <SebraeHeroStage>
      <div className="sebrae-hero-content mx-auto flex w-full max-w-[94.5rem] flex-1 items-center px-5 md:px-10 xl:px-16">
        <div className="w-full lg:w-[62%]">
          <p className="font-dm-mono text-[9px] leading-relaxed tracking-[0.12em] text-fe26-mint uppercase md:text-[10px]">
            {data.hero.eyebrow}
          </p>
          <h1
            id="sebrae-hero-title"
            aria-label={data.name}
            className="mt-4 flex flex-col items-start leading-none"
          >
            <HeroBaffleText
              text={data.hero.titleLead}
              duration={1300}
              className="sebrae-hero-title-lead font-abril-fatface text-white"
            />
            <span className="sr-only"> </span>
            <HeroBaffleText
              text={data.hero.titleDisplay}
              delay={150}
              duration={1300}
              className="sebrae-hero-title-display font-league-gothic text-fe26-lime uppercase"
            />
          </h1>
          <p className="sebrae-hero-subtitle mt-4 max-w-xl font-bold leading-tight">
            <span className="md:hidden">{data.hero.mobileSubtitle}</span>
            <span className="hidden md:inline">{data.hero.subtitle}</span>
          </p>
          <p className="mt-4 hidden max-w-xl text-[13px] leading-relaxed text-white/80 md:block md:text-sm lg:text-base">
            {data.hero.description}
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs text-white/70 md:text-sm">
            <CalendarDays aria-hidden className="size-4 shrink-0 text-white/50" />
            {data.schedule.summary}
          </p>
          <div className="mt-4">
            <SebraeCta offer={data.offer} placement="hero" />
          </div>
        </div>
      </div>
      <ul className="relative grid grid-cols-2 gap-x-5 gap-y-3 border-t border-fe26-lime/25 bg-kickops-gray/90 px-5 py-4 text-[11px] text-white/85 md:flex md:flex-wrap md:justify-center md:gap-x-10 md:py-5 md:text-xs">
        {data.hero.highlights.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span aria-hidden className="size-1 shrink-0 bg-fe26-mint" />
            {item}
          </li>
        ))}
      </ul>
    </SebraeHeroStage>
  );
}
