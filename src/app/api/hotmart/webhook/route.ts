import { NextResponse } from "next/server";

import { authorizeHotmartWebhook } from "@features/checkout/server/handle-hotmart-webhook";
import { recordHotmartPurchase } from "@features/checkout/server/record-hotmart-purchase";

export async function POST(request: Request) {
  const auth = authorizeHotmartWebhook(request.headers.get("x-hotmart-hottok"));

  if (auth.ok === false) {
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

  const recorded = await recordHotmartPurchase(body);

  if (recorded.httpStatus === 500) {
    return NextResponse.json({ error: "Failed to record purchase" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
