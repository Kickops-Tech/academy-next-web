import { SiteFooter } from "@core/components/site-footer";
import { CheckoutHeader } from "@features/checkout/components/checkout-header";
import { CHECKOUT_STATUSES } from "@features/checkout/constants/checkout-status";
import type { CheckoutStatus } from "@features/checkout/constants/checkout-status";
import type { CheckoutBuyerDetails } from "@features/checkout/models/checkout-buyer-details";

type CheckoutThankYouProps = {
  status: CheckoutStatus;
  details: CheckoutBuyerDetails;
};

export function CheckoutThankYou({ status, details }: CheckoutThankYouProps) {
  const copy = CHECKOUT_STATUSES[status];
  const hasPurchaseDetails = Boolean(details.email || details.transaction);

  return (
    <main className="flex min-h-dvh flex-col bg-[#f2f1ed] text-kickops-gray">
      <CheckoutHeader />

      <section className="mx-auto flex w-full max-w-[120rem] flex-1 flex-col px-5 py-20 md:px-10 md:py-28 xl:px-16">
        <div aria-hidden className="h-1 w-12 bg-kickops-yellow" />
        <p className="mt-6 font-dm-mono text-[10px] tracking-[0.18em] uppercase">
          Kickops Academy
        </p>
        <h1 className="mt-4 max-w-4xl font-league-gothic text-5xl leading-none font-black uppercase md:text-7xl">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-kickops-gray/65 md:text-base">
          {copy.body}
        </p>

        {details.name ? (
          <p className="mt-8 text-base font-medium md:text-lg">Olá, {details.name}</p>
        ) : null}

        {hasPurchaseDetails ? (
          <dl className="mt-8 grid max-w-xl gap-4 border-t border-kickops-gray/20 pt-8">
            {details.email ? (
              <div>
                <dt className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
                  E-mail
                </dt>
                <dd className="mt-1 text-sm md:text-base">{details.email}</dd>
              </div>
            ) : null}
            {details.transaction ? (
              <div>
                <dt className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
                  Transação
                </dt>
                <dd className="mt-1 text-sm md:text-base">{details.transaction}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </section>

      <SiteFooter />
    </main>
  );
}
