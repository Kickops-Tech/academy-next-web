import { SiteFooter } from "@core/components/site-footer";
import catalogGrid from "@assets/trainings/catalog-grid.svg";
import { TrainingCard } from "@features/trainings/components/training-card";
import { TrainingsHero } from "@features/trainings/components/trainings-hero";
import { TRAINING_CATALOG } from "@features/trainings/utils/trainings";

export function TrainingsCatalog() {
  const { catalog, trainings } = TRAINING_CATALOG;

  return (
    <main className="bg-[#f2f1ed] text-kickops-gray">
      <TrainingsHero catalog={catalog} />

      <section
        id="catalogo"
        className="relative scroll-mt-8 overflow-hidden px-5 py-16 md:px-10 md:py-20 xl:px-16"
      >
        <img
          src={catalogGrid.src}
          alt=""
          width={2469}
          height={2260}
          className="pointer-events-none absolute top-1/2 -left-[479px] h-[2260px] w-[2469px] max-w-none -translate-y-[42%]"
        />

        <div className="relative mx-auto w-full max-w-[1111px]">
          <h2 className="font-league-gothic text-[clamp(3rem,8vw,80px)] leading-none font-black uppercase">
            {catalog.sectionTitle}
          </h2>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
