import { NextResponse } from "next/server";

import { goldenTicketBodySchema } from "@features/sebrae/dto/golden-ticket.dto";
import { recordGoldenTicket } from "@features/sebrae/server/record-golden-ticket";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = goldenTicketBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = await recordGoldenTicket(parsed.data);
  if (result.ok === false) {
    if (result.status === 409) {
      return NextResponse.json({ error: "Duplicate" }, { status: 409 });
    }
    return NextResponse.json({ error: "Rejected" }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
