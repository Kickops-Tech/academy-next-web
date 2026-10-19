import architectureArt from "@assets/trainings/org-chart.png";
import blocksArt from "@assets/trainings/blocks.png";
import bookArt from "@assets/trainings/book.png";
import brainArt from "@assets/trainings/brain.png";
import brainHeroArt from "@assets/trainings/brain-hero.png";
import penArt from "@assets/trainings/pen.png";
import sneakerArt from "@assets/trainings/sneaker.png";
import storefrontArt from "@assets/trainings/storefront.png";
import wifiArt from "@assets/trainings/wifi.png";
import type { TrainingVisualId } from "@features/trainings/models/training";
import type { StaticImageData } from "next/image";

type TrainingArt = {
  card: StaticImageData;
  hero: StaticImageData;
  cardFrameClassName: string;
  cardClassName: string;
  heroClassName: string;
};

export const TRAINING_ART: Record<TrainingVisualId, TrainingArt> = {
  brain: {
    card: brainArt,
    hero: brainHeroArt,
    cardFrameClassName: "contents",
    cardClassName: "absolute -top-[136px] -left-[191px] size-[486px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-12%] right-[-8%] w-[min(72%,920px)] max-w-none",
  },
  remote: {
    card: wifiArt,
    hero: wifiArt,
    cardFrameClassName: "contents",
    cardClassName: "absolute -top-10 -left-20 size-[328px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-18%] right-[-6%] w-[min(58%,640px)] max-w-none",
  },
  management: {
    card: blocksArt,
    hero: blocksArt,
    cardFrameClassName: "contents",
    cardClassName: "absolute -top-[73px] -left-[226px] h-[362px] w-[543px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-8%] right-[-12%] w-[min(68%,760px)] max-w-none",
  },
  architecture: {
    card: architectureArt,
    hero: architectureArt,
    cardFrameClassName: "contents",
    cardClassName: "absolute -top-[54px] -left-10 h-[326px] w-[490px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-6%] right-[-4%] w-[min(62%,700px)] max-w-none",
  },
  rag: {
    card: bookArt,
    hero: bookArt,
    cardFrameClassName: "contents",
    cardClassName: "absolute top-px -left-[212px] h-[338px] w-[507px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-10%] right-[-10%] w-[min(66%,740px)] max-w-none",
  },
  design: {
    card: penArt,
    hero: penArt,
    cardFrameClassName: "contents",
    cardClassName:
      "absolute -top-[58px] -left-16 h-[331px] w-[496px] max-w-none -scale-x-100",
    heroClassName:
      "pointer-events-none absolute top-[-14%] right-[-8%] w-[min(64%,720px)] max-w-none -scale-x-100",
  },
  steps: {
    card: sneakerArt,
    hero: sneakerArt,
    cardFrameClassName:
      "absolute top-[-188px] left-[calc(50%-51px)] flex h-[486px] w-[541px] -translate-x-1/2 items-center justify-center",
    cardClassName: "h-[301px] w-[451px] max-w-none -rotate-150 -scale-y-100 object-cover",
    heroClassName:
      "pointer-events-none absolute top-[-22%] right-[-2%] w-[min(52%,620px)] max-w-none -rotate-150 -scale-y-100",
  },
  business: {
    card: storefrontArt,
    hero: storefrontArt,
    cardFrameClassName: "contents",
    cardClassName: "absolute -top-[55px] -left-[105px] size-[402px] max-w-none",
    heroClassName:
      "pointer-events-none absolute top-[-12%] right-[-6%] w-[min(48%,560px)] max-w-none",
  },
};
