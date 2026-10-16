import { SebraeLanding } from "@features/sebrae/components/sebrae-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como Empreender na Era da IA | Kickops Academy",
  description:
    "Treinamento especial da Kickops Academy para participantes da Feira do Empreendedor do Sebrae: use inteligência artificial para ampliar seu negócio.",
};

export default function SebraePage() {
  return <SebraeLanding />;
}
