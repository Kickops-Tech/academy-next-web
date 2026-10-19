const STORAGE_KEY = "kickops-fe26-checkout-source";

export const GOLDEN_TICKET_SOURCE = "kickops-golden-ticket";

const GOLDEN_TICKET_DISCOUNT_RATE = 0.15;

export function goldenTicketPrice(price: number): number {
  return Math.round(price * (1 - GOLDEN_TICKET_DISCOUNT_RATE) * 100) / 100;
}

/**
 * Remembers a Golden Ticket arrival for this tab and drops `from` from the
 * current history entry. Other query params stay.
 */
export function rememberGoldenTicketSource(): boolean {
  const params = new URLSearchParams(window.location.search);
  let active = false;
  try {
    active = sessionStorage.getItem(STORAGE_KEY) === GOLDEN_TICKET_SOURCE;
  } catch {
    /* The URL param still selects the checkout for this page view. */
  }

  if (params.get("from") !== GOLDEN_TICKET_SOURCE) return active;

  active = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, GOLDEN_TICKET_SOURCE);
  } catch {
    /* Storage is optional; this view still uses the Golden Ticket URL. */
  }

  params.delete("from");
  const search = params.toString();
  const next = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", next);
  return active;
}
