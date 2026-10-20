import trainingCatalogData from "@assets/data/trainings.json";
import { CATALOG_ORDER } from "@features/trainings/constants/catalog-order";
import type {
  Training,
  TrainingCatalog,
} from "@features/trainings/models/training";

export const TRAINING_CATALOG = trainingCatalogData as TrainingCatalog;

export function getTrainingBySlug(slug: string): Training | undefined {
  return TRAINING_CATALOG.trainings.find((training) => training.slug === slug);
}

/** Home grid only. Slugs missing from `CATALOG_ORDER` append in JSON order. */
export function getOrderedCatalogTrainings(
  trainings: readonly Training[] = TRAINING_CATALOG.trainings,
): Training[] {
  const remaining = new Map(
    trainings.map((training) => [training.slug, training]),
  );
  const ordered: Training[] = [];

  for (const slug of CATALOG_ORDER) {
    const training = remaining.get(slug);
    if (!training) {
      continue;
    }
    ordered.push(training);
    remaining.delete(slug);
  }

  for (const training of remaining.values()) {
    ordered.push(training);
  }

  return ordered;
}

export function getCatalogHref(): string {
  return "/";
}

export function getTrainingHref(slug: string): string {
  return `/treinamentos/${slug}`;
}

export function getCatalogContactHref(): string {
  const { whatsappNumber, contactMessage } = TRAINING_CATALOG.catalog;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactMessage)}`;
}

export function getNextTraining(training: Training): Training {
  const currentIndex = TRAINING_CATALOG.trainings.findIndex(
    (item) => item.slug === training.slug,
  );
  const nextIndex = (currentIndex + 1) % TRAINING_CATALOG.trainings.length;

  return TRAINING_CATALOG.trainings[nextIndex];
}
