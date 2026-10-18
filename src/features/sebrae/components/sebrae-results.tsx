import { ArrowUpRight } from "lucide-react";
import type { SebraeTrainingData } from "../models/sebrae-training";
import { SebraeSection } from "./sebrae-section";

export function SebraeResults({
  results,
}: {
  results: SebraeTrainingData["results"];
}) {
  return (
    <SebraeSection
      id="resultados"
      eyebrow={results.eyebrow}
      title={results.title}
      className="bg-white [&_h2]:text-4xl md:[&_h2]:text-6xl"
    >
      <p className="max-w-3xl text-base leading-relaxed text-kickops-lightgray">
        {results.description}
      </p>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.items.map((item, index) => (
          <li
            key={item}
            data-sebrae-reveal={index * 70}
            className="border-t-2 border-fe26-purple pt-4"
          >
            <span className="font-dm-mono text-xs text-fe26-purple">
              0{index + 1}
            </span>
            <h3 className="mt-3 max-w-xs text-lg font-bold">{item}</h3>
          </li>
        ))}
      </ol>
      <p className="mt-7 max-w-3xl text-sm leading-relaxed text-kickops-lightgray">
        {results.note}
      </p>
      <a
        href="#oferta"
        className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-fe26-purple underline underline-offset-4"
      >
        {results.ctaLabel}
        <ArrowUpRight aria-hidden className="size-4" />
      </a>
    </SebraeSection>
  );
}
