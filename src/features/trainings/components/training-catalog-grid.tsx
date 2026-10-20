"use client";

import { TrainingCard } from "@features/trainings/components/training-card";
import { SEBRAE_CATALOG_CARD } from "@features/trainings/constants/sebrae-catalog";
import type { Training } from "@features/trainings/models/training";
import { rememberSebraeCatalogOrigin } from "@features/trainings/utils/sebrae-catalog-origin";
import { getTrainingHref } from "@features/trainings/utils/trainings";
import { useLayoutEffect, useState } from "react";

type TrainingCatalogGridProps = {
  trainings: Training[];
  showSebraeCard?: boolean;
};

export function TrainingCatalogGrid({
  trainings,
  showSebraeCard = false,
}: TrainingCatalogGridProps) {
  const [showExtra, setShowExtra] = useState(showSebraeCard);

  useLayoutEffect(() => {
    setShowExtra(rememberSebraeCatalogOrigin(showSebraeCard));
  }, [showSebraeCard]);

  return (
    <div className="mt-9 grid gap-5 md:grid-cols-2 @min-[940px]:grid-cols-3">
      {showExtra ? (
        <TrainingCard key={SEBRAE_CATALOG_CARD.href} training={SEBRAE_CATALOG_CARD} />
      ) : null}
      {trainings.map((training) => (
        <TrainingCard
          key={training.slug}
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
      ))}
    </div>
  );
}
