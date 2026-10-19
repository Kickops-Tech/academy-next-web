export type TrainingInterestEmail = {
  name: string;
  email: string;
  phone: string;
  trainingName: string;
};

const DEFAULT_MAILER_TRAINING_INTEREST_URL =
  "https://mailer.kickops.dev/kickops/academy/training-interest";

export type EnqueueTrainingInterestResult = {
  ok: boolean;
  detail: string;
};

export async function enqueueTrainingInterestEmail(
  fields: TrainingInterestEmail,
): Promise<EnqueueTrainingInterestResult> {
  const mailerUrl =
    process.env.MAILER_TRAINING_INTEREST_URL || DEFAULT_MAILER_TRAINING_INTEREST_URL;

  let response: Response;
  try {
    response = await fetch(mailerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
  } catch {
    return { ok: false, detail: "unreachable" };
  }

  if (!response.ok) {
    return { ok: false, detail: `rejected http=${response.status}` };
  }

  return { ok: true, detail: "queued" };
}
