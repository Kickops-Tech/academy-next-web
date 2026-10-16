import type { SebraeTrainingData } from "@features/sebrae/models/sebrae-training";
import { isCheckoutReady } from "@features/sebrae/utils/is-checkout-ready";
import { ArrowRight, BadgeCheck, LockKeyhole } from "lucide-react";

type SebraeOfferProps = {
  offer: SebraeTrainingData["offer"];
};

export function SebraeOffer({ offer }: SebraeOfferProps) {
  const checkoutReady = isCheckoutReady(offer.checkoutUrl);

  return (
    <section
      id="oferta"
      aria-labelledby="oferta-title"
      className="relative scroll-mt-6 overflow-hidden bg-[#460A8C] px-5 py-20 text-white md:px-10 md:py-28 xl:px-16"
    >
      <div aria-hidden className="sebrae-offer-orbit absolute -top-36 -right-36 size-[32rem] rounded-full border border-[#D7FA00]/35" />
      <div aria-hidden className="sebrae-offer-orbit absolute -right-16 bottom-[-11rem] size-[24rem] rounded-full border border-[#14F596]/30 [animation-delay:-4s]" />

      <div className="relative mx-auto grid w-full max-w-[120rem] gap-12 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-center xl:gap-24">
        <div>
          <p className="font-dm-mono text-[10px] tracking-[0.2em] text-[#D7FA00] uppercase">
            {offer.eyebrow}
          </p>
          <h2
            id="oferta-title"
            className="mt-6 max-w-5xl font-league-gothic text-[clamp(3.6rem,8vw,7.5rem)] leading-[0.9] font-black uppercase"
          >
            {offer.title}
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {offer.description}
          </p>
        </div>

        <div className="relative border border-white/25 bg-white p-6 text-[#121212] shadow-[18px_18px_0_#D7FA00] md:p-8">
          <div className="flex items-center gap-3 border-b border-[#121212]/15 pb-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-[#14F596]">
              <BadgeCheck aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-dm-mono text-[9px] tracking-[0.16em] text-[#460A8C] uppercase">
                Acesso reconhecido
              </p>
              <p className="mt-1 font-bold">{offer.conditionLabel}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-[#121212]/65">
            {offer.conditionDescription}
          </p>

          {checkoutReady ? (
            <a
              href={offer.checkoutUrl}
              className="group mt-7 flex w-full items-center justify-between bg-[#FF2C63] px-5 py-4 font-bold text-white transition-colors hover:bg-[#460A8C]"
            >
              {offer.ctaLabel}
              <ArrowRight
                aria-hidden
                className="size-5 transition-transform group-hover:translate-x-1"
              />
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Preencha offer.checkoutUrl em src/assets/data/sebrae-training.json"
              className="mt-7 flex w-full cursor-not-allowed items-center justify-between bg-[#121212]/15 px-5 py-4 font-bold text-[#121212]/50"
            >
              {offer.pendingLabel}
              <LockKeyhole aria-hidden className="size-5" />
            </span>
          )}

          <div className="mt-5 space-y-2 font-dm-mono text-[9px] leading-relaxed tracking-[0.08em] text-[#121212]/45 uppercase">
            <p className="flex gap-2">
              <LockKeyhole aria-hidden className="mt-0.5 size-3 shrink-0" />
              {offer.securityNote}
            </p>
            <p>{offer.supportNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
