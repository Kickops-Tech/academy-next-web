import { BadgeCheck, CalendarDays, Check, LockKeyhole } from "lucide-react";
import type { SebraeTrainingData } from "../models/sebrae-training";
import { SebraeCta } from "./sebrae-cta";

export function SebraeOffer({ data }: { data: SebraeTrainingData }) {
  const { offer } = data;
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: offer.currency,
  });
  return (
    <section
      id="oferta"
      aria-labelledby="oferta-title"
      className="sebrae-section relative isolate overflow-hidden bg-fe26-purple px-5 py-20 text-white md:px-10 md:py-28 xl:px-16"
    >
      <div
        aria-hidden
        className="sebrae-offer-orbit absolute -top-36 -right-36 -z-10 size-[32rem] rounded-full border border-fe26-lime/35"
      />
      <div
        aria-hidden
        className="sebrae-offer-orbit absolute -right-16 -bottom-44 -z-10 size-96 rounded-full border border-fe26-mint/30 [animation-delay:-4s]"
      />
      <div className="mx-auto grid max-w-[86.5rem] gap-12 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-center xl:gap-24">
        <div data-sebrae-reveal>
          <p className="font-dm-mono text-[10px] tracking-[0.18em] text-fe26-lime uppercase">
            {offer.eyebrow}
          </p>
          <h2
            id="oferta-title"
            className="mt-6 max-w-3xl font-league-gothic text-[clamp(3.6rem,8vw,7rem)] leading-[0.9] uppercase"
          >
            {offer.title}
          </h2>
          <p className="mt-7 text-lg text-white/85">{offer.description}</p>
          <div className="mt-8 max-w-xl border-l-2 border-fe26-lime pl-5">
            <p className="flex items-center gap-3 text-lg font-bold text-fe26-lime md:text-2xl">
              <CalendarDays aria-hidden className="size-6 shrink-0" />
              {data.schedule.summary}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {data.schedule.details}
            </p>
            <a
              href={data.schedule.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-fe26-lime underline underline-offset-4 hover:text-white"
            >
              {data.schedule.supportLabel}
            </a>
          </div>
        </div>
        <div
          data-sebrae-reveal="120"
          className="mr-3 bg-white p-6 text-kickops-gray shadow-[12px_12px_0_var(--color-fe26-lime)] md:p-8"
        >
          <div className="flex items-center gap-3 border-b border-kickops-gray/15 pb-6">
            <BadgeCheck
              aria-hidden
              className="size-10 shrink-0 text-fe26-purple"
            />
            <h3 className="text-xl font-bold">{data.name}</h3>
          </div>
          <p className="mt-6 font-dm-mono text-[10px] tracking-widest text-fe26-purple uppercase">
            {offer.summaryLabel}
          </p>
          <ul className="mt-4 space-y-3 border-b border-kickops-gray/15 pb-6 text-sm">
            {offer.includes.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-fe26-mint">
                  <Check aria-hidden className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-dm-mono text-[10px] tracking-widest text-fe26-purple uppercase">
            {offer.eyebrow}
          </p>
          <p className="my-3 font-league-gothic text-7xl leading-none text-fe26-purple">
            {money.format(offer.price)}
          </p>
          <p className="mb-7 text-sm leading-relaxed text-kickops-lightgray">
            {offer.note}
          </p>
          <SebraeCta offer={offer} placement="offer" />
          <p className="mt-4 text-xs leading-relaxed text-kickops-lightgray">
            {offer.paymentNote}
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-kickops-lightgray">
            <LockKeyhole aria-hidden className="size-3 shrink-0" />
            {offer.securityNote}
          </p>
        </div>
      </div>
    </section>
  );
}
