import architectureArt from "@assets/trainings/org-chart.png";
import blocksArt from "@assets/trainings/blocks.png";
import bookArt from "@assets/trainings/book.png";
import brainArt from "@assets/trainings/brain.png";
import brainHeroArt from "@assets/trainings/brain-hero.png";
import penArt from "@assets/trainings/pen.png";
import wifiArt from "@assets/trainings/wifi.png";
import type { TrainingVisualId } from "@features/trainings/models/training";
import type { StaticImageData } from "next/image";

type TrainingArt = {
  card: StaticImageData;
  hero: StaticImageData;
  cardClassName: string;
  heroClassName: string;
};

export const TRAINING_ART: Record<TrainingVisualId, TrainingArt> = {
  brain: {
    card: brainArt,
    hero: brainHeroArt,
    cardClassName: "absolute -top-[136px] -left-[191px] size-[486px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-12%] right-[-8%] w-[min(72%,920px)] max-w-none",
  },
  remote: {
    card: wifiArt,
    hero: wifiArt,
    cardClassName: "absolute -top-10 -left-20 size-[328px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-18%] right-[-6%] w-[min(58%,640px)] max-w-none",
  },
  management: {
    card: blocksArt,
    hero: blocksArt,
    cardClassName: "absolute -top-[73px] -left-[226px] h-[362px] w-[543px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-8%] right-[-12%] w-[min(68%,760px)] max-w-none",
  },
  architecture: {
    card: architectureArt,
    hero: architectureArt,
    cardClassName: "absolute -top-[54px] -left-10 h-[326px] w-[490px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-6%] right-[-4%] w-[min(62%,700px)] max-w-none",
  },
  rag: {
    card: bookArt,
    hero: bookArt,
    cardClassName: "absolute -top-[50px] -left-[212px] h-[338px] w-[507px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-10%] right-[-10%] w-[min(66%,740px)] max-w-none",
  },
  design: {
    card: penArt,
    hero: penArt,
    cardClassName:
      "absolute -top-[58px] -left-16 h-[331px] w-[496px] max-w-none -scale-x-100",
    heroClassName:
      "pointer-events-none absolute top-[-14%] right-[-8%] w-[min(64%,720px)] max-w-none -scale-x-100",
  },
};
