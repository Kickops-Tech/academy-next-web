export const PURCHASE_EMAIL_EVENTS = [
  "PURCHASE_APPROVED",
  "PURCHASE_COMPLETE",
  "PURCHASE_BILLET_PRINTED",
  "PURCHASE_DELAYED",
  "PURCHASE_EXPIRED",
  "PURCHASE_CANCELED",
  "PURCHASE_REFUNDED",
  "PURCHASE_PROTEST",
  "PURCHASE_CHARGEBACK",
] as const;

export type PurchaseEmailEvent = (typeof PURCHASE_EMAIL_EVENTS)[number];

export function isPurchaseEmailEvent(event: string | undefined): event is PurchaseEmailEvent {
  return PURCHASE_EMAIL_EVENTS.some((known) => known === event);
}
