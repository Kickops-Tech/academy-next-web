import { SiteFooter } from "@core/components/site-footer";
import { CheckoutHeader } from "@features/checkout/components/checkout-header";
import type { LegalDocumentCopy } from "@features/legal/constants/legal-documents";

type LegalDocumentProps = {
  copy: LegalDocumentCopy;
};

export function LegalDocument({ copy }: LegalDocumentProps) {
  return (
    <main className="flex min-h-dvh flex-col bg-[#f2f1ed] text-kickops-gray">
      <CheckoutHeader />

      <article className="mx-auto flex w-full max-w-[120rem] flex-1 flex-col px-5 py-20 md:px-10 md:py-28 xl:px-16">
        <div aria-hidden className="h-1 w-12 bg-kickops-yellow" />
        <p className="mt-6 font-dm-mono text-[10px] tracking-[0.18em] uppercase">
          Kickops Academy
        </p>
        <h1 className="mt-4 max-w-4xl font-league-gothic text-5xl leading-none font-black uppercase md:text-7xl">
          {copy.title}
        </h1>

        <div className="mt-12 flex max-w-xl flex-col gap-10">
          {copy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-kickops-gray/80 md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
