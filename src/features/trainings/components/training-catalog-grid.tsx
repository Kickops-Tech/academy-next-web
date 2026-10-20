"use client";

import { InViewReveal } from "@core/components/in-view-reveal";
import { TrainingCard } from "@features/trainings/components/training-card";
import { SEBRAE_CATALOG_CARD } from "@features/trainings/constants/sebrae-catalog";
import { useSebraeCatalogOrigin } from "@features/trainings/hooks/use-sebrae-catalog-origin";
import type { Training } from "@features/trainings/models/training";
import { getTrainingHref } from "@features/trainings/utils/trainings";

const CATALOG_REVEAL_STAGGER_MS = 40;
const CATALOG_REVEAL_WAVE = 3;

type TrainingCatalogGridProps = {
  trainings: Training[];
  showSebraeCard?: boolean;
};

export function TrainingCatalogGrid({
  trainings,
  showSebraeCard = false,
}: TrainingCatalogGridProps) {
  const showExtra = useSebraeCatalogOrigin(showSebraeCard);

  return (
    <div className="mt-9 grid gap-5 md:grid-cols-2 @min-[940px]:grid-cols-3">
      {showExtra ? (
        <InViewReveal
          index={0}
          staggerMs={CATALOG_REVEAL_STAGGER_MS}
          className="relative z-0 pointer-fine:hover:z-10 pointer-fine:focus-within:z-10"
        >
          <TrainingCard
            key={SEBRAE_CATALOG_CARD.href}
            training={SEBRAE_CATALOG_CARD}
          />
        </InViewReveal>
      ) : null}
      {trainings.map((training, index) => (
        <InViewReveal
          key={training.slug}
          index={(index + (showExtra ? 1 : 0)) % CATALOG_REVEAL_WAVE}
          staggerMs={CATALOG_REVEAL_STAGGER_MS}
          className="relative z-0 pointer-fine:hover:z-10 pointer-fine:focus-within:z-10"
        >
          <TrainingCard
            training={{
              title: training.title,
              titleLines: training.titleLines,
              shortDescription: training.shortDescription,
              category: training.category,
              accent: training.accent,
              href: getTrainingHref(training.slug),
              visual: training.visual,
            }}
          />
        </InViewReveal>
      ))}
    </div>
  );
}
