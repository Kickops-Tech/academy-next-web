import { TrainingsCatalog } from "@features/trainings/components/trainings-catalog";
import { SEBRAE_CATALOG_FROM } from "@features/trainings/constants/sebrae-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinamentos | Kickops Academy",
  description:
    "Treinamentos da Kickops Academy sobre inteligência artificial, produto, design, engenharia e novas formas de trabalho.",
};

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const from = typeof params.from === "string" ? params.from : undefined;

  return <TrainingsCatalog showSebraeCard={from === SEBRAE_CATALOG_FROM} />;
}
