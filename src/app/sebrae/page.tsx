import { GOLDEN_TICKET_SOURCE } from "@features/sebrae/utils/golden-ticket-checkout";
import {
  FE26_TRAINING_HREF,
  SEBRAE_CATALOG_FROM,
} from "@features/trainings/constants/sebrae-catalog";
import { redirect } from "next/navigation";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type SebraeGatePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstString(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function SebraeGatePage({
  searchParams,
}: SebraeGatePageProps) {
  const params = await searchParams;
  const next = new URLSearchParams();

  for (const key of UTM_KEYS) {
    const value = firstString(params[key]);
    if (value) {
      next.set(key, value);
    }
  }

  if (firstString(params.from) === GOLDEN_TICKET_SOURCE) {
    next.set("from", GOLDEN_TICKET_SOURCE);
    const query = next.toString();
    redirect(`${FE26_TRAINING_HREF}${query ? `?${query}` : ""}`);
  }

  next.set("from", SEBRAE_CATALOG_FROM);
  redirect(`/?${next.toString()}`);
}
