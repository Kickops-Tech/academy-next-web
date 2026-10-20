export type GoldenTicketEmail = {
  name: string;
  email: string;
  phone: string;
  trainingName: string;
};

const DEFAULT_MAILER_GOLDEN_TICKET_URL =
  "https://mailer.kickops.dev/kickops/academy/golden-ticket";

export type EnqueueGoldenTicketResult = {
  ok: boolean;
  detail: string;
};

export async function enqueueGoldenTicketEmail(
  fields: GoldenTicketEmail,
): Promise<EnqueueGoldenTicketResult> {
  const mailerUrl =
    process.env.MAILER_GOLDEN_TICKET_URL || DEFAULT_MAILER_GOLDEN_TICKET_URL;

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
