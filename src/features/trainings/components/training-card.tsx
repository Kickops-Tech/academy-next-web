import { TrainingVisual } from "@features/trainings/components/training-visual";
import type { Training } from "@features/trainings/models/training";
import { getTrainingHref } from "@features/trainings/utils/trainings";
import { cn } from "@shadcn/lib/utils";
import { ArrowRight, Clock3, MonitorUp } from "lucide-react";
import Link from "next/link";

type TrainingCardProps = {
  training: Training;
};

export function TrainingCard({ training }: TrainingCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden border border-kickops-gray/20 bg-white",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
        training.featured && "lg:col-span-2 lg:grid lg:grid-cols-2",
      )}
    >
      <Link
        href={getTrainingHref(training.slug)}
        aria-label={`Conhecer o treinamento ${training.title}${training.subtitle ? `: ${training.subtitle}` : ""}`}
        className="absolute inset-0 z-10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-kickops-gray"
      />

      <TrainingVisual training={training} compact />

      <div className="flex min-h-[21rem] flex-col p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-dm-mono text-[10px] tracking-[0.16em] text-kickops-gray/60 uppercase">
            {training.category}
          </span>
          <span className="font-dm-mono text-xs text-kickops-gray/45">
            {training.number}
          </span>
        </div>

        <h3 className="mt-8 max-w-xl font-league-gothic text-[2.65rem] leading-[0.93] font-black uppercase md:text-5xl">
          {training.title}
        </h3>
        {training.subtitle ? (
          <p className="mt-2 font-abril-fatface text-xl leading-tight text-kickops-gray/65">
            {training.subtitle}
          </p>
        ) : null}
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-kickops-gray/70 md:text-base">
          {training.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-9">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-kickops-gray/60">
            <span className="flex items-center gap-1.5">
              <Clock3 aria-hidden className="size-3.5" />
              {training.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MonitorUp aria-hidden className="size-3.5" />
              {training.format}
            </span>
          </div>
          <span
            className="flex size-11 items-center justify-center bg-kickops-gray text-white transition-colors group-hover:bg-kickops-yellow group-hover:text-kickops-gray"
            aria-hidden="true"
          >
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
