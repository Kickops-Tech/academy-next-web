import { SEBRAE_CATALOG_SEAL } from "@features/trainings/constants/sebrae-catalog";
import {
  CATALOG_SECTION_ID,
  scrollToCatalog,
} from "@features/trainings/utils/scroll-to-catalog";
import { cn } from "@shadcn/lib/utils";
import { ArrowDown } from "lucide-react";

export function TrainingsSebraeSeal() {
  return (
    <a
      href={`#${CATALOG_SECTION_ID}`}
      onClick={scrollToCatalog}
      className={cn(
        "mt-5 inline-flex min-h-11 max-w-[20rem] items-center justify-center gap-3 bg-fe26-purple px-5 py-3 text-fe26-lime",
        "font-dm-mono text-[10px] leading-snug tracking-[0.08em] uppercase md:min-h-12 md:max-w-none md:px-6 md:text-xs",
        "transition-colors hover:bg-fe26-lime hover:text-fe26-purple",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fe26-lime",
      )}
    >
      {SEBRAE_CATALOG_SEAL.label}
      <ArrowDown aria-hidden className="size-4 shrink-0" />
    </a>
  );
}
