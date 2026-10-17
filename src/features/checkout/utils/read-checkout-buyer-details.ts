import type { CheckoutBuyerDetails } from "@features/checkout/models/checkout-buyer-details";

type SearchParams = Record<string, string | string[] | undefined>;

const MAX_LENGTH = 200;

function firstValue(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return undefined;
  }

  const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, MAX_LENGTH);
  return cleaned || undefined;
}

function readName(searchParams: SearchParams): string | undefined {
  const direct = firstValue(searchParams.name) ?? firstValue(searchParams.nome);
  if (direct) {
    return direct;
  }

  const parts = [
    firstValue(searchParams.first_name),
    firstValue(searchParams.last_name),
  ].filter((part) => part !== undefined);

  if (parts.length === 0) {
    return undefined;
  }

  return parts.join(" ").slice(0, MAX_LENGTH);
}

export function readCheckoutBuyerDetails(
  searchParams: SearchParams,
): CheckoutBuyerDetails {
  return {
    name: readName(searchParams),
    email: firstValue(searchParams.email),
    transaction: firstValue(searchParams.transaction),
  };
}
