import { TrainingDetail } from "@features/trainings/components/training-detail";
import {
  getTrainingBySlug,
  TRAINING_CATALOG,
} from "@features/trainings/utils/trainings";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type TrainingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return TRAINING_CATALOG.trainings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TrainingDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);

  if (!training) {
    return {};
  }

  return {
    title: `${training.title}${training.subtitle ? `: ${training.subtitle}` : ""} | Kickops Academy`,
    description: training.shortDescription,
  };
}

export default async function TrainingDetailPage({
  params,
}: TrainingDetailPageProps) {
  const { slug } = await params;
  const training = getTrainingBySlug(slug);

  if (!training) {
    notFound();
  }

  return <TrainingDetail training={training} />;
}
