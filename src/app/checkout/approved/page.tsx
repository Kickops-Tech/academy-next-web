import { CheckoutThankYou } from "@features/checkout/components/checkout-thank-you";
import { CHECKOUT_STATUSES } from "@features/checkout/constants/checkout-status";
import { readCheckoutBuyerDetails } from "@features/checkout/utils/read-checkout-buyer-details";
import type { Metadata } from "next";

const copy = CHECKOUT_STATUSES.approved;

export const metadata: Metadata = {
  title: `${copy.title} | Kickops Academy`,
  description: copy.description,
  robots: { index: false, follow: false },
};

type ApprovedCheckoutPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ApprovedCheckoutPage({
  searchParams,
}: ApprovedCheckoutPageProps) {
  const details = readCheckoutBuyerDetails(await searchParams);

  return <CheckoutThankYou status="approved" details={details} />;
}
