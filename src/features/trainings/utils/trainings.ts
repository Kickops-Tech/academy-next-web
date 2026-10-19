import trainingCatalogData from "@assets/data/trainings.json";
import type {
  Training,
  TrainingCatalog,
} from "@features/trainings/models/training";

export const TRAINING_CATALOG = trainingCatalogData as TrainingCatalog;

export function getTrainingBySlug(slug: string): Training | undefined {
  return TRAINING_CATALOG.trainings.find((training) => training.slug === slug);
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
