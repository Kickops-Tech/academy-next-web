export type TrainingInterestEmail = {
  name: string;
  email: string;
  phone: string;
  trainingName: string;
};

export type EnqueueTrainingInterestResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "rejected" | "unreachable" };

export async function enqueueTrainingInterestEmail(
  fields: TrainingInterestEmail,
): Promise<EnqueueTrainingInterestResult> {
  const mailerUrl = process.env.MAILER_TRAINING_INTEREST_URL;
  if (!mailerUrl) {
    return { ok: false, reason: "not-configured" };
  }

  let response: Response;
  try {
    response = await fetch(mailerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
  } catch {
    return { ok: false, reason: "unreachable" };
  }

  if (!response.ok) {
    return { ok: false, reason: "rejected" };
  }

  return { ok: true };
}
