import { getCheckoutSupabase } from "@features/checkout/server/checkout-supabase";
import {
  GOLDEN_TICKET_TRAINING_NAME,
  GOLDEN_TICKET_TRAINING_SLUG,
} from "@features/sebrae/constants/golden-ticket";
import type { GoldenTicketBody } from "@features/sebrae/dto/golden-ticket.dto";
import { enqueueGoldenTicketEmail } from "@features/sebrae/server/enqueue-golden-ticket-email";
import { formatBrazilMobile } from "@features/trainings/utils/brazil-mobile";

const TABLE = "academy_contact_training_interest";

export type RecordGoldenTicketResult =
  | { ok: true }
  | { ok: false; status: 400 | 409 | 500 | 502 };

export async function recordGoldenTicket(
  body: GoldenTicketBody,
): Promise<RecordGoldenTicketResult> {
  const phone = formatBrazilMobile(body.phone);
  if (!phone) {
    return { ok: false, status: 400 };
  }

  const supabase = getCheckoutSupabase();
  if (!supabase) {
    console.info("golden-ticket status=store-unconfigured");
    return { ok: false, status: 500 };
  }

  const { data: existing, error: lookupError } = await supabase
    .from(TABLE)
    .select("id")
    .eq("training_slug", GOLDEN_TICKET_TRAINING_SLUG)
    .eq("email", body.email)
    .limit(1);

  if (lookupError) {
    console.info("golden-ticket status=lookup-failed");
    return { ok: false, status: 500 };
  }

  if (existing && existing.length > 0) {
    console.info("golden-ticket status=duplicate");
    return { ok: false, status: 409 };
  }

  const { error } = await supabase.from(TABLE).insert({
    training_slug: GOLDEN_TICKET_TRAINING_SLUG,
    training_name: GOLDEN_TICKET_TRAINING_NAME,
    name: body.name,
    email: body.email,
    phone,
  });

  if (error) {
    console.info("golden-ticket status=failed");
    return { ok: false, status: 500 };
  }

  const enqueued = await enqueueGoldenTicketEmail({
    name: body.name,
    email: body.email,
    phone,
    trainingName: GOLDEN_TICKET_TRAINING_NAME,
  });

  console.info(`golden-ticket status=${enqueued.detail}`);
  if (enqueued.ok) {
    return { ok: true };
  }

  return { ok: false, status: 502 };
}
