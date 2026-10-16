import { SiteFooter } from "@core/components/site-footer";
import { TrainingCard } from "@features/trainings/components/training-card";
import { TrainingsHero } from "@features/trainings/components/trainings-hero";
import { TRAINING_CATALOG } from "@features/trainings/utils/trainings";

export function TrainingsCatalog() {
  const { catalog, trainings } = TRAINING_CATALOG;

  return (
    <main className="bg-[#f2f1ed] text-kickops-gray">
      <TrainingsHero catalog={catalog} />

      <section id="catalogo" className="scroll-mt-8 px-5 py-20 md:px-10 md:py-28 xl:px-16">
        <div className="mx-auto w-full max-w-[120rem]">
          <div className="grid gap-7 border-b border-kickops-gray/20 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
                Catálogo / {String(trainings.length).padStart(2, "0")}
              </p>
              <h2 className="mt-4 max-w-2xl font-league-gothic text-5xl leading-none font-black uppercase md:text-7xl">
                {catalog.sectionTitle}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-kickops-gray/65 md:justify-self-end md:text-base">
              {catalog.sectionDescription}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trainings.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
