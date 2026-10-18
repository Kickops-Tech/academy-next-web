import { CheckoutThankYou } from "@features/checkout/components/checkout-thank-you";
import { CHECKOUT_STATUSES } from "@features/checkout/constants/checkout-status";
import { readCheckoutBuyerDetails } from "@features/checkout/utils/read-checkout-buyer-details";
import type { Metadata } from "next";

const copy = CHECKOUT_STATUSES["awaiting-payment"];

export const metadata: Metadata = {
  title: `${copy.title} | Kickops Academy`,
  description: copy.description,
  robots: { index: false, follow: false },
};

type AwaitingPaymentCheckoutPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AwaitingPaymentCheckoutPage({
  searchParams,
}: AwaitingPaymentCheckoutPageProps) {
  const details = readCheckoutBuyerDetails(await searchParams);

  return <CheckoutThankYou status="awaiting-payment" details={details} />;
}
