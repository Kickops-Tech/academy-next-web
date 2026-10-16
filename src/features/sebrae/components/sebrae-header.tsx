import { KickopsLogo } from "@core/components/kickops-logo";
import { isCheckoutReady } from "@features/sebrae/utils/is-checkout-ready";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type SebraeHeaderProps = {
  checkoutUrl: string;
  ctaLabel: string;
  fallbackCtaLabel: string;
};

export function SebraeHeader({
  checkoutUrl,
  ctaLabel,
  fallbackCtaLabel,
}: SebraeHeaderProps) {
  const checkoutReady = isCheckoutReady(checkoutUrl);

  return (
    <header className="relative z-30 w-full text-white">
      <div className="mx-auto flex h-20 w-full max-w-[120rem] items-center justify-between px-5 md:h-24 md:px-10 xl:px-16">
        <Link
          href="/"
          aria-label="Kickops Academy — início"
          className="flex items-center gap-3"
        >
          <KickopsLogo className="h-6 w-auto md:h-7" />
          <span className="border-l border-white/30 pl-3 font-dm-mono text-[10px] tracking-[0.2em] uppercase md:text-xs">
            Academy
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <span className="font-dm-mono text-[10px] tracking-[0.18em] text-[#D7FA00] uppercase md:text-xs">
            Especial FE26
          </span>
          <a
            href={checkoutReady ? checkoutUrl : "#oferta"}
            className="hidden items-center gap-2 border border-white/30 px-4 py-2 text-xs font-bold transition-colors hover:border-[#D7FA00] hover:bg-[#D7FA00] hover:text-[#460A8C] sm:flex"
          >
            {checkoutReady ? ctaLabel : fallbackCtaLabel}
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
