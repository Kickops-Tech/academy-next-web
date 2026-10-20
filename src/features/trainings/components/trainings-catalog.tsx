import { SiteFooter } from "@core/components/site-footer";
import catalogGrid from "@assets/trainings/catalog-grid.svg";
import { TrainingCatalogGrid } from "@features/trainings/components/training-catalog-grid";
import { TrainingsHero } from "@features/trainings/components/trainings-hero";
import { CATALOG_SECTION_ID } from "@features/trainings/utils/scroll-to-catalog";
import {
  getOrderedCatalogTrainings,
  TRAINING_CATALOG,
} from "@features/trainings/utils/trainings";

type TrainingsCatalogProps = {
  showSebraeCard?: boolean;
};

export function TrainingsCatalog({
  showSebraeCard = false,
}: TrainingsCatalogProps) {
  const { catalog } = TRAINING_CATALOG;
  const trainings = getOrderedCatalogTrainings();

  return (
    <main className="bg-[#f2f1ed] text-kickops-gray">
      <TrainingsHero catalog={catalog} />

      <section
        id={CATALOG_SECTION_ID}
        className="relative scroll-mt-8 overflow-hidden px-5 py-16 md:px-10 md:py-20 xl:px-16"
      >
        <img
          src={catalogGrid.src}
          alt=""
          width={2469}
          height={2260}
          className="pointer-events-none absolute top-1/2 -left-[479px] h-[2260px] w-[2469px] max-w-none -translate-y-[42%]"
        />

        <div className="@container relative mx-auto w-full max-w-[1111px]">
          <h2 className="font-league-gothic text-[clamp(3rem,8vw,80px)] leading-none font-black uppercase">
            {catalog.sectionTitle}
          </h2>

          {/* 3 columns once each card is ~300px (3×300 + gaps). Portrait iPad stays at 2. */}
          <TrainingCatalogGrid
            trainings={trainings}
            showSebraeCard={showSebraeCard}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
