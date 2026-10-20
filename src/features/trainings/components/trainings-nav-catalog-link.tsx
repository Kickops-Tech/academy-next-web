"use client";

import {
  CATALOG_SECTION_ID,
  scrollToCatalog,
} from "@features/trainings/utils/scroll-to-catalog";
import { getCatalogHref } from "@features/trainings/utils/trainings";
import { cn } from "@shadcn/lib/utils";
import Link from "next/link";

type TrainingsNavCatalogLinkProps = {
  current?: "catalog" | "empresas";
};

export function TrainingsNavCatalogLink({
  current,
}: TrainingsNavCatalogLinkProps) {
  const onHome = current === "catalog";

  return (
    <Link
      href={onHome ? `#${CATALOG_SECTION_ID}` : getCatalogHref()}
      aria-current={onHome ? "page" : undefined}
      onClick={onHome ? scrollToCatalog : undefined}
      className={cn(
        "font-dm-mono text-xs tracking-[0.14em] uppercase transition-colors md:text-sm",
        onHome
          ? "text-kickops-yellow"
          : "text-white hover:text-kickops-yellow",
      )}
    >
      Treinamentos
    </Link>
  );
}
