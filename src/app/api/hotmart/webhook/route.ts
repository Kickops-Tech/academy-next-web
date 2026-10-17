import { NextResponse } from "next/server";

import {
  authorizeHotmartWebhook,
  logHotmartPurchaseWebhook,
} from "@features/checkout/server/handle-hotmart-webhook";

export async function POST(request: Request) {
  const auth = authorizeHotmartWebhook(request.headers.get("x-hotmart-hottok"));

  if (!auth.ok) {
    const message =
      auth.status === 500 ? "Webhook is not configured" : "Unauthorized";

    return NextResponse.json({ error: message }, { status: auth.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  logHotmartPurchaseWebhook(body);

  return NextResponse.json({ ok: true });
}
