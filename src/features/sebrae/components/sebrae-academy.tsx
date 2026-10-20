import { getCatalogHref } from "@features/trainings/utils/trainings";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { SebraeTrainingData } from "../models/sebrae-training";

export function SebraeAcademy({
  academy,
}: {
  academy: SebraeTrainingData["academy"];
}) {
  return (
    <section
      id="academy"
      aria-labelledby="academy-title"
      className="sebrae-section relative isolate overflow-hidden bg-fe26-lime px-5 py-20 text-fe26-purple md:px-10 md:py-28 xl:px-16"
    >
      <div
        aria-hidden
        className="sebrae-academy-orbit pointer-events-none absolute -top-48 -right-48 -z-10 size-[40rem] rounded-full border border-fe26-purple/15"
      />
      <div className="mx-auto grid max-w-[86.5rem] items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div data-sebrae-reveal>
          <p className="font-dm-mono text-[10px] tracking-widest uppercase">
            {academy.eyebrow}
          </p>
          <h2
            id="academy-title"
            className="mt-6 max-w-3xl font-league-gothic text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] uppercase"
          >
            {academy.title}
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed">
            {academy.description}
          </p>
          <Link
            href={getCatalogHref()}
            className="sebrae-button mt-8 inline-flex min-h-14 items-center justify-center gap-6 bg-fe26-purple px-6 py-4 text-sm font-bold text-white hover:bg-kickops-gray"
          >
            {academy.ctaLabel}
            <ArrowUpRight aria-hidden className="size-5 shrink-0" />
          </Link>
        </div>
        <ul className="space-y-4">
          {academy.topics.map((topic, index) => (
            <li
              key={topic}
              data-sebrae-reveal={index * 90}
              className="sebrae-lift flex items-center gap-5 border border-fe26-purple/25 bg-white/35 px-6 py-7 md:px-8 md:py-9"
            >
              <span className="font-dm-mono text-xs">0{index + 1}</span>
              <span className="font-league-gothic text-3xl leading-none uppercase md:text-4xl">
                {topic}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
