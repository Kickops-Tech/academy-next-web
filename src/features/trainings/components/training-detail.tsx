import { SiteFooter } from "@core/components/site-footer";
import { TrainingVisual } from "@features/trainings/components/training-visual";
import { TrainingsHeader } from "@features/trainings/components/trainings-header";
import type { Training } from "@features/trainings/models/training";
import {
  getNextTraining,
  getTrainingContactHref,
  getTrainingHref,
} from "@features/trainings/utils/trainings";
import { ArrowLeft, ArrowRight, Check, Clock3, MonitorUp } from "lucide-react";
import Link from "next/link";

type TrainingDetailProps = {
  training: Training;
};

function TrainingContactCard({ training }: TrainingDetailProps) {
  return (
    <aside className="bg-kickops-gray p-7 text-white md:p-8 lg:sticky lg:top-8">
      <p className="font-dm-mono text-[10px] tracking-[0.18em] text-kickops-green uppercase">
        {training.cta.eyebrow}
      </p>
      <h2 className="mt-5 font-league-gothic text-4xl leading-[0.95] font-black uppercase md:text-5xl">
        {training.cta.title}
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-white/65">
        {training.cta.description}
      </p>
      <a
        href={getTrainingContactHref(training)}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 flex w-full items-center justify-between bg-kickops-yellow px-5 py-4 font-bold text-kickops-gray transition-colors hover:bg-white"
      >
        {training.cta.label}
        <ArrowRight
          aria-hidden
          className="size-5 transition-transform group-hover:translate-x-1"
        />
      </a>
      <p className="mt-4 text-center font-dm-mono text-[9px] tracking-[0.12em] text-white/40 uppercase">
        Atendimento direto pelo WhatsApp
      </p>
    </aside>
  );
}

export function TrainingDetail({ training }: TrainingDetailProps) {
  const nextTraining = getNextTraining(training);

  return (
    <main className="bg-[#f2f1ed] text-kickops-gray">
      <section className="bg-kickops-gray text-white">
        <TrainingsHeader />
        <div className="mx-auto w-full max-w-[120rem] px-5 pt-7 pb-12 md:px-10 md:pt-12 md:pb-20 xl:px-16">
          <Link
            href="/treinamentos"
            className="inline-flex items-center gap-2 font-dm-mono text-[10px] tracking-[0.16em] text-white/60 uppercase transition-colors hover:text-kickops-yellow"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Todos os treinamentos
          </Link>

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] lg:items-stretch">
            <div className="flex flex-col justify-between py-1 md:py-5">
              <div>
                <div className="flex items-center gap-4 font-dm-mono text-[10px] tracking-[0.16em] text-kickops-green uppercase">
                  <span>{training.number}</span>
                  <span className="h-px w-10 bg-kickops-green/50" />
                  <span>{training.category}</span>
                </div>
                <h1 className="mt-7 max-w-5xl font-league-gothic text-[clamp(4rem,8vw,8.5rem)] leading-[0.84] font-black tracking-[-0.015em] uppercase">
                  {training.title}
                </h1>
                {training.subtitle ? (
                  <p className="mt-4 font-abril-fatface text-2xl text-kickops-yellow md:text-4xl">
                    {training.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="mt-12 grid gap-4 border-t border-white/20 pt-6 text-xs text-white/70 sm:grid-cols-3">
                <span className="flex items-center gap-2">
                  <Clock3 aria-hidden className="size-4 text-kickops-yellow" />
                  {training.duration}
                </span>
                <span className="flex items-center gap-2">
                  <MonitorUp aria-hidden className="size-4 text-kickops-yellow" />
                  {training.format}
                </span>
                <span className="font-dm-mono text-[10px] tracking-[0.1em] uppercase sm:text-right">
                  {training.level}
                </span>
              </div>
            </div>

            <TrainingVisual training={training} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[120rem] gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start xl:gap-24 xl:px-16">
        <div>
          <section aria-labelledby="sobre-o-treinamento">
            <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
              Sobre o treinamento
            </p>
            <h2
              id="sobre-o-treinamento"
              className="mt-5 max-w-4xl font-abril-fatface text-3xl leading-[1.08] md:text-5xl"
            >
              {training.shortDescription}
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-kickops-gray/70 md:text-lg">
              {training.description}
            </p>
          </section>

          <section aria-labelledby="resultados" className="mt-20 md:mt-28">
            <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
              O que você leva
            </p>
            <h2
              id="resultados"
              className="mt-4 font-league-gothic text-5xl leading-none font-black uppercase md:text-7xl"
            >
              Repertório para agir
            </h2>
            <div className="mt-8 grid border-t border-kickops-gray/20 md:grid-cols-3">
              {training.outcomes.map((outcome, index) => (
                <article
                  key={outcome.title}
                  className="border-b border-kickops-gray/20 py-7 md:border-r md:p-7 md:first:pl-0 md:last:border-r-0"
                >
                  <span
                    className="flex size-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: training.accent }}
                  >
                    <Check aria-hidden className="size-4" />
                  </span>
                  <p className="mt-8 font-dm-mono text-[10px] text-kickops-gray/40">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-bold">{outcome.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-kickops-gray/65">
                    {outcome.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="programa" className="mt-20 md:mt-28">
            <div className="grid gap-5 md:grid-cols-2 md:items-end">
              <div>
                <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
                  Conteúdo
                </p>
                <h2
                  id="programa"
                  className="mt-4 font-league-gothic text-5xl leading-none font-black uppercase md:text-7xl"
                >
                  Programa
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-kickops-gray/60 md:text-right">
                O conteúdo é adaptado ao contexto e ao repertório de cada turma.
              </p>
            </div>

            <ol className="mt-8 border-t border-kickops-gray/25">
              {training.program.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-4 border-b border-kickops-gray/25 py-7 md:grid-cols-[4rem_minmax(12rem,0.7fr)_1fr] md:items-start md:gap-7"
                >
                  <span className="font-dm-mono text-xs text-kickops-gray/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold md:text-xl">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-kickops-gray/65 md:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="para-quem"
            className="mt-20 border-l-4 p-7 md:mt-28 md:p-10"
            style={{
              borderColor: training.accent,
              backgroundColor: `${training.accent}33`,
            }}
          >
            <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
              Para quem
            </p>
            <h2
              id="para-quem"
              className="mt-4 font-league-gothic text-4xl leading-none font-black uppercase md:text-6xl"
            >
              Este encontro é para você?
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
              {training.audience}
            </p>
          </section>
        </div>

        <TrainingContactCard training={training} />
      </div>

      <section className="bg-white px-5 py-16 md:px-10 md:py-20 xl:px-16">
        <Link
          href={getTrainingHref(nextTraining.slug)}
          className="group mx-auto grid w-full max-w-[120rem] gap-8 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="font-dm-mono text-[10px] tracking-[0.18em] text-kickops-gray/50 uppercase">
              Próximo treinamento / {nextTraining.number}
            </p>
            <h2 className="mt-4 max-w-4xl font-league-gothic text-5xl leading-[0.93] font-black uppercase transition-colors group-hover:text-kickops-gray/60 md:text-7xl">
              {nextTraining.title}
            </h2>
          </div>
          <span className="flex size-14 items-center justify-center bg-kickops-gray text-white transition-colors group-hover:bg-kickops-yellow group-hover:text-kickops-gray md:size-16">
            <ArrowRight aria-hidden className="size-6" />
          </span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
