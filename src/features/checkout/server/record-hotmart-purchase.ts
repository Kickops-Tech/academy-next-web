import { isPurchaseEmailEvent } from "@features/checkout/constants/purchase-email-events";
import {
  hotmartPurchaseEmailFieldsSchema,
  hotmartPurchaseWebhookSchema,
} from "@features/checkout/dto/hotmart-purchase-webhook.dto";
import { getCheckoutSupabase } from "@features/checkout/server/checkout-supabase";
import { enqueuePurchaseEmail } from "@features/checkout/server/enqueue-purchase-email";

const TABLE = "hotmart_purchase_webhooks";

type EmailStatus = "pending" | "queued" | "failed" | "skipped";

export type RecordHotmartPurchaseResult = {
  httpStatus: 200 | 500;
};

function logPurchase(
  fields: {
    id?: string;
    event?: string;
    productUcode?: string;
    transaction?: string;
    status?: string;
  },
  emailStatus: EmailStatus | "missing-id" | "store-unconfigured",
) {
  console.info("hotmart.webhook", { ...fields, emailStatus });
}

async function readStatus(hotmartId: string): Promise<EmailStatus | null> {
  const supabase = getCheckoutSupabase();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("email_status")
    .eq("hotmart_id", hotmartId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data.email_status as EmailStatus;
}

async function setStatus(hotmartId: string, emailStatus: EmailStatus): Promise<boolean> {
  const supabase = getCheckoutSupabase();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase
    .from(TABLE)
    .update({
      email_status: emailStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("hotmart_id", hotmartId);

  return !error;
}

export async function recordHotmartPurchase(body: unknown): Promise<RecordHotmartPurchaseResult> {
  const parsed = hotmartPurchaseWebhookSchema.safeParse(body);
  const emailFields = hotmartPurchaseEmailFieldsSchema.safeParse(body);
  const fields = emailFields.success ? emailFields.data : {};
  const logFields = {
    id: parsed.success ? parsed.data.id : undefined,
    event: parsed.success ? parsed.data.event : fields.event,
    productUcode: parsed.success ? parsed.data.data?.product?.ucode : undefined,
    transaction:
      parsed.success
        ? parsed.data.data?.purchase?.transaction
        : fields.data?.purchase?.transaction,
    status: parsed.success ? parsed.data.data?.purchase?.status : undefined,
  };

  const hotmartId = logFields.id;
  if (!hotmartId) {
    logPurchase(logFields, "missing-id");
    return { httpStatus: 200 };
  }

  const supabase = getCheckoutSupabase();
  if (!supabase) {
    logPurchase(logFields, "store-unconfigured");
    return { httpStatus: 500 };
  }

  const { error: insertError } = await supabase.from(TABLE).insert({
    hotmart_id: hotmartId,
    event: logFields.event ?? null,
    payload: body,
    email_status: "pending",
  });

  if (insertError) {
    if (insertError.code !== "23505") {
      logPurchase(logFields, "failed");
      return { httpStatus: 500 };
    }

    const existing = await readStatus(hotmartId);
    if (existing === "queued" || existing === "skipped") {
      logPurchase(logFields, existing);
      return { httpStatus: 200 };
    }

    if (existing !== "failed") {
      logPurchase(logFields, "pending");
      return { httpStatus: 500 };
    }
  }

  const buyerEmail = fields.data?.buyer?.email;
  const shouldEmail = isPurchaseEmailEvent(fields.event) && Boolean(buyerEmail);

  if (!shouldEmail) {
    const saved = await setStatus(hotmartId, "skipped");
    logPurchase(logFields, saved ? "skipped" : "failed");
    return { httpStatus: saved ? 200 : 500 };
  }

  const enqueued = await enqueuePurchaseEmail(emailFields.success ? emailFields.data : {});
  if (!enqueued.ok) {
    await setStatus(hotmartId, "failed");
    logPurchase(logFields, "failed");
    return { httpStatus: 500 };
  }

  const queued = await setStatus(hotmartId, "queued");
  logPurchase(logFields, queued ? "queued" : "failed");
  return { httpStatus: queued ? 200 : 500 };
}
