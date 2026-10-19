import { getCheckoutSupabase } from "@features/checkout/server/checkout-supabase";
import type { TrainingInterestBody } from "@features/trainings/dto/training-interest.dto";
import { enqueueTrainingInterestEmail } from "@features/trainings/server/enqueue-training-interest-email";
import { formatBrazilMobile } from "@features/trainings/utils/brazil-mobile";
import { getTrainingBySlug } from "@features/trainings/utils/trainings";

const TABLE = "academy_contact_training_interest";

export type RecordTrainingInterestResult =
  | { ok: true }
  | { ok: false; status: 400 | 500 | 502 };

export async function recordTrainingInterest(
  body: TrainingInterestBody,
): Promise<RecordTrainingInterestResult> {
  const training = getTrainingBySlug(body.slug);
  const phone = formatBrazilMobile(body.phone);
  if (!training || !phone) {
    return { ok: false, status: 400 };
  }

  const supabase = getCheckoutSupabase();
  if (!supabase) {
    console.info(`training.interest slug=${training.slug} status=store-unconfigured`);
    return { ok: false, status: 500 };
  }

  const { error } = await supabase.from(TABLE).insert({
    training_slug: training.slug,
    training_name: training.title,
    name: body.name,
    email: body.email,
    phone,
  });

  if (error) {
    console.info(`training.interest slug=${training.slug} status=failed`);
    return { ok: false, status: 500 };
  }

  const enqueued = await enqueueTrainingInterestEmail({
    name: body.name,
    email: body.email,
    phone,
    trainingName: training.title,
  });

  console.info(`training.interest slug=${training.slug} status=${enqueued.detail}`);
  if (enqueued.ok) {
    return { ok: true };
  }

  return { ok: false, status: 502 };
}
