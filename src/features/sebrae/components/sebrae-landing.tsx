import { SiteFooter } from "@core/components/site-footer";
import { ArrowUpRight } from "lucide-react";
import { SebraeHero } from "./sebrae-hero";
import { SebraeHeader } from "./sebrae-header";
import { SebraeOffer } from "./sebrae-offer";
import { SebraeProgram } from "./sebrae-program";
import { SebraeResults } from "./sebrae-results";
import { SebraeSection } from "./sebrae-section";
import { SebraeAcademy } from "./sebrae-academy";
import { SebraeAudience } from "./sebrae-audience";
import { SebraeMentor } from "./sebrae-mentor";
import { SebraeInteractions } from "./sebrae-interactions";
import { SEBRAE_TRAINING } from "../utils/sebrae-training";
import type { SebraeTrainingData } from "../models/sebrae-training";

export function SebraeLanding({
  checkoutUrl,
  goldenTicketCheckoutUrl,
}: {
  checkoutUrl: string;
  goldenTicketCheckoutUrl: string;
}) {
  const data: SebraeTrainingData = {
    ...SEBRAE_TRAINING,
    offer: { ...SEBRAE_TRAINING.offer, checkoutUrl },
  };
  const { principles, format, faq } = data;
  return (
    <div className="sebrae-landing bg-[#f2f1ed] text-kickops-gray">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:block focus:bg-fe26-lime focus:p-4"
      >
        Pular para o conteúdo
      </a>
      <SebraeHeader data={data} />
      <main id="conteudo">
        <SebraeHero data={data} />
        <SebraeResults results={data.results} />
        <SebraeSection
          id="principios"
          eyebrow={principles.eyebrow}
          title={principles.title}
          className="bg-kickops-gray text-white"
        >
          <div className="grid gap-px bg-white/20 md:grid-cols-3">
            {principles.items.map((item, index) => (
              <article
                key={item.title}
                data-sebrae-reveal={index * 80}
                className="sebrae-lift relative overflow-hidden bg-kickops-gray p-7"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -bottom-16 size-40 rounded-full bg-fe26-purple/35"
                />
                <p className="font-dm-mono text-xs text-fe26-mint">
                  0{index + 1}
                </p>
                <h3 className="relative mt-10 font-league-gothic text-4xl leading-none uppercase">
                  {item.title}
                </h3>
                <p className="relative mt-5 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </SebraeSection>
        <SebraeProgram program={data.program} />
        <SebraeSection
          id="formato"
          eyebrow={format.eyebrow}
          title={format.title}
          className="bg-white"
        >
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {format.items.map((item, index) => (
              <article
                key={item.title}
                data-sebrae-reveal={(index % 3) * 70}
                className="border-t border-kickops-gray/20 pt-6"
              >
                <p className="font-dm-mono text-xs text-fe26-purple">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </SebraeSection>
        <SebraeAudience audience={data.audience} offer={data.offer} />
        <SebraeMentor mentor={data.mentor} />
        <SebraeOffer data={data} />
        <SebraeSection id="faq" eyebrow={faq.eyebrow} title={faq.title}>
          <div className="max-w-4xl divide-y divide-kickops-gray/20 border-y border-kickops-gray/20">
            {faq.items.map((item) => (
              <details
                key={item.question}
                data-faq={item.question}
                className="py-2"
              >
                <summary className="min-h-12 py-4 text-lg font-bold">
                  {item.question}
                </summary>
                <p className="max-w-3xl pb-6 leading-relaxed text-kickops-lightgray">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <a
            href={data.schedule.supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-fe26-purple underline underline-offset-4"
          >
            {data.schedule.supportLabel}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </SebraeSection>
        <SebraeAcademy academy={data.academy} />
      </main>
      <div className="bg-kickops-lightgray pb-24 md:pb-0">
        <SiteFooter whatsappUrl={data.schedule.supportUrl} />
      </div>
      <SebraeInteractions
        offer={data.offer}
        goldenTicketCheckoutUrl={goldenTicketCheckoutUrl}
      />
    </div>
  );
}
