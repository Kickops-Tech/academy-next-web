export function isCheckoutReady(checkoutUrl: string): boolean {
  try {
    const url = new URL(checkoutUrl);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
