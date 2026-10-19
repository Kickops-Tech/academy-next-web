import { SiteFooter } from "@core/components/site-footer";
import arrowLeft from "@assets/trainings/arrow-left.svg";
import clockIcon from "@assets/trainings/clock.svg";
import presentationIcon from "@assets/trainings/presentation.svg";
import { TRAINING_ART } from "@features/trainings/components/training-art";
import { TrainingInterestForm } from "@features/trainings/components/training-interest-form";
import { TrainingsHeader } from "@features/trainings/components/trainings-header";
import type { Training } from "@features/trainings/models/training";
import { getNextTraining, getTrainingHref } from "@features/trainings/utils/trainings";
import { ArrowRight, Check } from "lucide-react";
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
      <TrainingInterestForm slug={training.slug} label={training.cta.label} />
    </aside>
  );
}

function formatTrainingMeta(value: string): string {
  if (value.toLowerCase() === "sob medida") return "Sob Medida";
  if (value.toLowerCase() === "presencial ou online") return "Presencial ou Online";
  return value;
}

export function TrainingDetail({ training }: TrainingDetailProps) {
  const nextTraining = getNextTraining(training);

  const art = TRAINING_ART[training.visual];

  return (
    <main className="bg-[#f2f1ed] text-kickops-gray">
      <div className="bg-kickops-gray">
        <TrainingsHeader />
      </div>

      <section
        className="relative overflow-hidden text-black"
        style={{ backgroundColor: training.accent }}
      >
        <img
          src={art.hero.src}
          alt=""
          width={art.hero.width}
          height={art.hero.height}
          className={`${art.heroClassName} hidden md:block`}
        />

        <div className="relative mx-auto flex min-h-[640px] w-full max-w-[120rem] flex-col px-5 py-16 md:px-20 md:py-20">
          <Link
            href="/treinamentos"
            aria-label="Voltar para todos os treinamentos"
            className="inline-flex w-fit bg-[#121212] p-2.5"
          >
            <img src={arrowLeft.src} alt="" width={40} height={40} />
          </Link>

          <p className="font-inter mt-12 text-xl font-medium uppercase md:mt-[52px]">
            {training.category}
          </p>
          <h1 className="mt-4 font-league-gothic text-[56px] leading-[0.9] font-black uppercase md:text-[76px]">
            {training.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4 md:mt-16">
            <span className="font-inter flex items-center gap-3 text-base font-medium">
              <img src={clockIcon.src} alt="" width={28} height={28} />
              {formatTrainingMeta(training.duration)}
            </span>
            <span className="font-inter flex items-center gap-3 text-base font-medium">
              <img src={presentationIcon.src} alt="" width={28} height={28} />
              {formatTrainingMeta(training.format)}
            </span>
          </div>

          <img
            src={art.hero.src}
            alt=""
            width={art.hero.width}
            height={art.hero.height}
            className="mt-10 h-auto w-full max-w-md md:hidden"
          />
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
