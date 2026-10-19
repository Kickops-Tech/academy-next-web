import arrowUpRight from "@assets/trainings/arrow-up-right.svg";
import { TRAINING_ART } from "@features/trainings/components/training-art";
import type { Training } from "@features/trainings/models/training";
import { getTrainingHref } from "@features/trainings/utils/trainings";
import Link from "next/link";

type TrainingCardProps = {
  training: Training;
};

export function TrainingCard({ training }: TrainingCardProps) {
  const art = TRAINING_ART[training.visual];

  return (
    <article
      className="relative h-[578px] overflow-hidden text-black"
      style={{ backgroundColor: training.accent }}
    >
      <Link
        href={getTrainingHref(training.slug)}
        aria-label={`Conhecer o treinamento ${training.title}`}
        className="absolute inset-0 z-10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-black"
      />

      <div className={art.cardFrameClassName}>
        <img
          src={art.card.src}
          alt=""
          width={art.card.width}
          height={art.card.height}
          className={art.cardClassName}
        />
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
        <p className="font-inter mt-4 text-base leading-[1.4]">{training.shortDescription}</p>
      </div>
    </article>
  );
}
