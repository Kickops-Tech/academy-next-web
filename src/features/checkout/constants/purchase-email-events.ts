export const PURCHASE_EMAIL_EVENTS = ["PURCHASE_APPROVED"] as const;

export type PurchaseEmailEvent = (typeof PURCHASE_EMAIL_EVENTS)[number];

export function isPurchaseEmailEvent(event: string | undefined): event is PurchaseEmailEvent {
  return event === "PURCHASE_APPROVED";
}
