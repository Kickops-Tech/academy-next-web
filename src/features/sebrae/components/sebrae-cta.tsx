import type { SebraeTrainingData } from "@features/sebrae/models/sebrae-training";
import { isCheckoutReady } from "@features/sebrae/utils/is-checkout-ready";
import { ArrowUpRight } from "lucide-react";

export function SebraeCta({
  offer,
  placement,
}: {
  offer: SebraeTrainingData["offer"];
  placement: string;
}) {
  const className =
    "sebrae-button inline-flex min-h-12 w-full items-center justify-center gap-3 bg-fe26-pink px-5 py-4 text-center text-sm font-bold text-kickops-gray transition-colors hover:bg-fe26-lime disabled:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:w-auto";
  const checkoutReady = isCheckoutReady(offer.checkoutUrl);
  if (!checkoutReady && placement === "offer") {
    return (
      <button disabled className={className}>
        {offer.ctaLabel}
      </button>
    );
  }
  return (
    <a
      href={checkoutReady ? offer.checkoutUrl : "#oferta"}
      data-checkout={checkoutReady ? placement : undefined}
      className={className}
    >
      {offer.ctaLabel}
      <ArrowUpRight aria-hidden className="size-4 shrink-0" />
    </a>
  );
}
