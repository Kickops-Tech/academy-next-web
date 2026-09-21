import { NextResponse } from "next/server";

import { contactProxyBodySchema } from "@features/contact/dto/contact-email.dto";
import { sendContactEmail } from "@features/contact/server/send-contact-email";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactProxyBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = await sendContactEmail(parsed.data);
  if (result.ok === false) {
    return NextResponse.json(
      { error: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true });
}
