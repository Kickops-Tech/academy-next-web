import { timingSafeEqual } from "node:crypto";

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
