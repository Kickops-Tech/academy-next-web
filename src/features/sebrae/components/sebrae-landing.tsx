import { SiteFooter } from "@core/components/site-footer";
import { SebraeHero } from "@features/sebrae/components/sebrae-hero";
import { SebraeOffer } from "@features/sebrae/components/sebrae-offer";
import { SEBRAE_TRAINING } from "@features/sebrae/utils/sebrae-training";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

export function SebraeLanding() {
  const { event, hero, training, offer } = SEBRAE_TRAINING;

  return (
    <main className="bg-[#f2f1ed] text-kickops-gray">
      <SebraeHero event={event} hero={hero} offer={offer} />

      <section className="bg-[#D7FA00] px-5 py-5 text-[#460A8C] md:px-10 xl:px-16">
        <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-3 font-dm-mono text-[10px] tracking-[0.12em] uppercase md:flex-row md:items-center md:justify-between md:text-xs">
          <p className="font-bold">
            {event.name} • {event.dates} • {event.hours}
          </p>
          <a
            href={event.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-65"
          >
            Site oficial da feira
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      </section>

      <section
        id="treinamento"
        aria-labelledby="sebrae-intro-title"
        className="scroll-mt-6 px-5 py-20 md:px-10 md:py-28 xl:px-16"
      >
        <div className="mx-auto grid w-full max-w-[120rem] gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start xl:gap-24">
          <div>
            <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
              {training.introEyebrow}
            </p>
            <h2
              id="sebrae-intro-title"
              className="mt-5 max-w-5xl font-abril-fatface text-3xl leading-[1.08] md:text-5xl xl:text-6xl"
            >
              {training.introTitle}
            </h2>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-kickops-gray/70 md:text-lg">
              {training.introDescription}
            </p>
          </div>

          <aside className="border-t-4 border-[#FF2C63] bg-white p-7 shadow-[10px_10px_0_#460A8C] md:p-8">
            <p className="font-dm-mono text-[10px] tracking-[0.16em] text-[#460A8C] uppercase">
              Para quem
            </p>
            <p className="mt-4 text-lg leading-relaxed font-bold">
              {training.audience}
            </p>
            <dl className="mt-7 divide-y divide-kickops-gray/15 border-t border-kickops-gray/15">
              {training.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-4 py-4 text-sm"
                >
                  <dt className="text-kickops-gray/50">{fact.label}</dt>
                  <dd className="text-right font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="sebrae-outcomes-title"
        className="bg-kickops-gray px-5 py-20 text-white md:px-10 md:py-28 xl:px-16"
      >
        <div className="mx-auto w-full max-w-[120rem]">
          <p className="font-dm-mono text-[10px] tracking-[0.18em] text-[#14F596] uppercase">
            {training.outcomesEyebrow}
          </p>
          <h2
            id="sebrae-outcomes-title"
            className="mt-5 max-w-5xl font-league-gothic text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-black uppercase"
          >
            {training.outcomesTitle}
          </h2>

          <div className="mt-12 grid gap-px bg-white/20 md:grid-cols-2 xl:grid-cols-4">
            {training.outcomes.map((outcome) => (
              <article
                key={outcome.number}
                className="group relative min-h-80 overflow-hidden bg-kickops-gray p-7 md:p-8"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -bottom-16 size-40 rounded-full opacity-15 transition-transform duration-500 group-hover:scale-150"
                  style={{ backgroundColor: outcome.accent }}
                />
                <p
                  className="font-dm-mono text-xs"
                  style={{ color: outcome.accent }}
                >
                  {outcome.number}
                </p>
                <h3 className="mt-16 font-league-gothic text-4xl leading-[0.95] font-black uppercase">
                  {outcome.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/60">
                  {outcome.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sebrae-program-title"
        className="px-5 py-20 md:px-10 md:py-28 xl:px-16"
      >
        <div className="mx-auto w-full max-w-[120rem]">
          <div className="grid gap-8 border-b border-kickops-gray/20 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
                {training.programEyebrow}
              </p>
              <h2
                id="sebrae-program-title"
                className="mt-5 font-league-gothic text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-black uppercase"
              >
                {training.programTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-kickops-gray/65 lg:justify-self-end">
              {training.programDescription}
            </p>
          </div>

          <ol>
            {training.program.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-4 border-b border-kickops-gray/20 py-7 md:grid-cols-[4rem_minmax(14rem,0.7fr)_1fr] md:items-start md:gap-8 md:py-9"
              >
                <span className="font-dm-mono text-xs text-[#5A14C8]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-kickops-gray/65 md:text-base">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10 md:py-24 xl:px-16">
        <div className="mx-auto grid w-full max-w-[120rem] gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center xl:gap-20">
          <div>
            <span className="flex size-12 items-center justify-center bg-[#D7FA00] text-[#460A8C]">
              <Sparkles aria-hidden className="size-6" />
            </span>
            <p className="mt-7 font-dm-mono text-[10px] tracking-[0.18em] text-[#5A14C8] uppercase">
              {training.deliverablesEyebrow}
            </p>
            <h2 className="mt-5 font-abril-fatface text-4xl leading-tight md:text-6xl">
              {training.deliverablesTitle}
            </h2>
          </div>
          <ul className="border-t border-kickops-gray/20">
            {training.deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="flex items-center gap-4 border-b border-kickops-gray/20 py-5 text-base font-bold md:text-lg"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#14F596]">
                  <Check aria-hidden className="size-4" />
                </span>
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SebraeOffer offer={offer} />
      <SiteFooter />
    </main>
  );
}
