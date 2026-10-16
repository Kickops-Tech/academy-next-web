import { TrainingsCatalog } from "@features/trainings/components/trainings-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinamentos | Kickops Academy",
  description:
    "Treinamentos da Kickops Academy sobre inteligência artificial, produto, design, engenharia e novas formas de trabalho.",
};

export default function TrainingsPage() {
  return <TrainingsCatalog />;
}
