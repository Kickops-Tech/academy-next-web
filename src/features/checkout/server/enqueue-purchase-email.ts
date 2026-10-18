import { isPurchaseEmailEvent } from "@features/checkout/constants/purchase-email-events";
import type { HotmartPurchaseEmailFields } from "@features/checkout/dto/hotmart-purchase-webhook.dto";

export type EnqueuePurchaseEmailResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "rejected" | "unreachable" };

export async function enqueuePurchaseEmail(
  fields: HotmartPurchaseEmailFields,
): Promise<EnqueuePurchaseEmailResult> {
  const event = fields.event;
  const buyerEmail = fields.data?.buyer?.email;

  if (!isPurchaseEmailEvent(event) || !buyerEmail) {
    return { ok: false, reason: "rejected" };
  }

  const mailerUrl = process.env.MAILER_PURCHASE_WEBHOOK_URL;
  if (!mailerUrl) {
    return { ok: false, reason: "not-configured" };
  }

  let response: Response;
  try {
    response = await fetch(mailerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        name: fields.data?.buyer?.name,
        email: buyerEmail,
        productName: fields.data?.product?.name,
        transaction: fields.data?.purchase?.transaction,
      }),
    });
  } catch {
    return { ok: false, reason: "unreachable" };
  }

  if (!response.ok) {
    return { ok: false, reason: "rejected" };
  }

  return { ok: true };
}
