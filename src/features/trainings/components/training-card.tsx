"use client";

import arrowUpRight from "@assets/trainings/arrow-up-right.svg";
import { TRAINING_ART } from "@features/trainings/components/training-art";
import { TRAINING_CARD_PARALLAX_CSS } from "@features/trainings/constants/training-card-parallax";
import { useTrainingCardArtParallax } from "@features/trainings/hooks/use-training-card-art-parallax";
import type { TrainingVisualId } from "@features/trainings/models/training";
import { cn } from "@shadcn/lib/utils";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";

export type TrainingCardModel = {
  title: string;
  titleLines: readonly string[];
  shortDescription: string;
  category: string;
  accent: string;
  href: string;
  visual: TrainingVisualId;
};

type TrainingCardProps = {
  training: TrainingCardModel;
};

const ART_PARALLAX_STYLE: CSSProperties = {
  transform: `translate3d(0, var(${TRAINING_CARD_PARALLAX_CSS.y}, 0px), 0)`,
};

export function TrainingCard({ training }: TrainingCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const art = TRAINING_ART[training.visual];
  useTrainingCardArtParallax(cardRef, artRef, training.visual);

  return (
    <article
      ref={cardRef}
      className={cn(
        "relative h-[578px] overflow-hidden",
        training.visual === "sebrae" ? "text-white" : "text-black",
      )}
      style={{ backgroundColor: training.accent }}
    >
      <Link
        href={training.href}
        aria-label={`Conhecer o treinamento ${training.title}`}
        className="absolute inset-0 z-10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-black"
      />

      <div
        ref={artRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        style={ART_PARALLAX_STYLE}
      >
        <div className={art.cardFrameClassName}>
          <img
            src={art.card.src}
            alt=""
            width={art.card.width}
            height={art.card.height}
            className={art.cardClassName}
          />
        </div>
      </div>

      <span className="absolute top-10 right-10 z-0 bg-[#121212] p-2.5">
        <img src={arrowUpRight.src} alt="" width={40} height={40} />
      </span>

      <div className="absolute inset-x-10 bottom-10 z-0 flex flex-col">
        <p className="font-inter text-sm font-medium tracking-normal uppercase">
          {training.category}
        </p>
        <h3 className="mt-[13px] font-league-gothic text-[46px] leading-[0.9] font-black uppercase">
          {training.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p
          className={cn(
            "font-inter mt-4 text-base leading-[1.4]",
            training.visual === "sebrae" && "text-white/85",
          )}
        >
          {training.shortDescription}
        </p>
      </div>
    </article>
  );
}
