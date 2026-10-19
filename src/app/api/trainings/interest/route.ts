import { NextResponse } from "next/server";

import { trainingInterestBodySchema } from "@features/trainings/dto/training-interest.dto";
import { recordTrainingInterest } from "@features/trainings/server/record-training-interest";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = trainingInterestBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = await recordTrainingInterest(parsed.data);
  if (result.ok === false) {
    return NextResponse.json({ error: "Rejected" }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
