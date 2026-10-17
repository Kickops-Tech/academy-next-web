import { timingSafeEqual } from "node:crypto";

import { hotmartPurchaseWebhookSchema } from "@features/checkout/dto/hotmart-purchase-webhook.dto";

export type HotmartWebhookAuth =
  | { ok: true }
  | { ok: false; status: 401 | 500 };

function tokensMatch(received: string, expected: string): boolean {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

export function authorizeHotmartWebhook(hottok: string | null): HotmartWebhookAuth {
  const configuredHottok = process.env.HOTMART_HOTTOK;

  if (!configuredHottok) {
    return { ok: false, status: 500 };
  }

  if (!hottok || !tokensMatch(hottok, configuredHottok)) {
    return { ok: false, status: 401 };
  }

  return { ok: true };
}

export function logHotmartPurchaseWebhook(body: unknown): void {
  const parsed = hotmartPurchaseWebhookSchema.safeParse(body);

  if (!parsed.success) {
    console.info("hotmart.webhook", { accepted: true });
    return;
  }

  console.info("hotmart.webhook", {
    id: parsed.data.id,
    event: parsed.data.event,
    productUcode: parsed.data.data?.product?.ucode,
    transaction: parsed.data.data?.purchase?.transaction,
    status: parsed.data.data?.purchase?.status,
  });
}
