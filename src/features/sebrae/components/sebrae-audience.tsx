import { ArrowUpRight, Check, Minus } from "lucide-react";
import type { SebraeTrainingData } from "../models/sebrae-training";
import { SebraeSection } from "./sebrae-section";
import { SebraeCta } from "./sebrae-cta";

export function SebraeAudience({
  audience,
  offer,
}: {
  audience: SebraeTrainingData["audience"];
  offer: SebraeTrainingData["offer"];
}) {
  return (
    <SebraeSection
      id="publico"
      eyebrow={audience.eyebrow}
      title={audience.title}
      className="bg-fe26-purple text-white"
    >
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {audience.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 border border-white/20 bg-white/5 p-5 md:p-6"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-fe26-lime text-fe26-purple">
                  <Check aria-hidden className="size-4" />
                </span>
                <p className="text-base leading-relaxed font-medium">{item}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <SebraeCta offer={offer} placement="audience" />
          </div>
        </div>
        <aside className="border-t border-white/25 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <ArrowUpRight aria-hidden className="mb-6 size-9 text-fe26-mint" />
          <h3 className="max-w-xs text-xl font-bold">{audience.notTitle}</h3>
          <ul className="mt-6 space-y-5">
            {audience.notItems.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-white/75"
              >
                <Minus aria-hidden className="mt-1 size-4 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SebraeSection>
  );
}
