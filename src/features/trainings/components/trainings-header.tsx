import { KickopsLogo } from "@core/components/kickops-logo";
import { getCatalogContactHref } from "@features/trainings/utils/trainings";
import { cn } from "@shadcn/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type TrainingsHeaderProps = {
  current?: "catalog";
  className?: string;
};

export function TrainingsHeader({
  current,
  className,
}: TrainingsHeaderProps) {
  return (
    <header className={cn("relative z-20 w-full text-white", className)}>
      <div className="mx-auto flex h-20 w-full max-w-[120rem] items-center justify-between px-5 md:h-24 md:px-10 xl:px-16">
        <Link
          href="/"
          aria-label="Kickops Academy — início"
          className="flex items-center gap-3"
        >
          <KickopsLogo className="h-6 w-auto md:h-7" />
          <span className="border-l border-white/30 pl-3 font-dm-mono text-[10px] tracking-[0.22em] uppercase md:text-xs">
            Academy
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-5 md:gap-8">
          <Link
            href="/treinamentos"
            aria-current={current === "catalog" ? "page" : undefined}
            className={cn(
              "font-dm-mono text-[10px] tracking-[0.14em] uppercase transition-colors md:text-xs",
              current === "catalog"
                ? "text-kickops-yellow"
                : "text-white hover:text-kickops-yellow",
            )}
          >
            Treinamentos
          </Link>
          <a
            href={getCatalogContactHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 font-dm-mono text-xs tracking-[0.14em] text-white uppercase transition-colors hover:text-kickops-yellow sm:flex"
          >
            Fale com a gente
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
