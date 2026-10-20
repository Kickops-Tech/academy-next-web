import { KickopsLogo } from "@core/components/kickops-logo";
import { TrainingsNavCatalogLink } from "@features/trainings/components/trainings-nav-catalog-link";
import {
  getCatalogContactHref,
  getCatalogHref,
} from "@features/trainings/utils/trainings";
import { cn } from "@shadcn/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type TrainingsHeaderProps = {
  current?: "catalog" | "empresas";
  className?: string;
};

export function TrainingsHeader({
  current,
  className,
}: TrainingsHeaderProps) {
  return (
    <header className={cn("relative z-20 w-full text-white", className)}>
      <div className="mx-auto flex h-24 w-full max-w-[120rem] items-center justify-between gap-3 px-5 md:h-28 md:px-10 xl:px-16">
        <Link
          href={getCatalogHref()}
          aria-label="Kickops Academy — início"
          className="flex shrink-0 items-center gap-3.5"
        >
          <KickopsLogo className="h-8 w-auto md:h-10" />
          <span className="border-l border-white/30 pl-3.5 font-dm-mono text-xs tracking-[0.22em] uppercase md:text-sm">
            Academy
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-4 md:gap-8"
        >
          <Link
            href="/para-empresas"
            aria-current={current === "empresas" ? "page" : undefined}
            className={cn(
              "px-3 py-1.5 font-dm-mono text-xs tracking-[0.14em] uppercase transition-colors md:px-3.5 md:py-2 md:text-sm",
              current === "empresas"
                ? "bg-white text-kickops-gray"
                : "bg-kickops-yellow text-kickops-gray hover:bg-white",
            )}
          >
            Para empresas
          </Link>
          <TrainingsNavCatalogLink current={current} />
          <a
            href={getCatalogContactHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 font-dm-mono text-xs tracking-[0.14em] text-white uppercase transition-colors hover:text-kickops-yellow sm:flex md:text-sm"
          >
            Fale com a gente
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
