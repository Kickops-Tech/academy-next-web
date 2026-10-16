export function isCheckoutReady(checkoutUrl: string): boolean {
  return checkoutUrl.startsWith("https://") || checkoutUrl.startsWith("http://");
}
