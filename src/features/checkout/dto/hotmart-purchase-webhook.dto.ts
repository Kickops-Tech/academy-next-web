import { z } from "zod";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined),
  z.string().optional(),
);

/** Purchase webhook 2.0.0. Extra fields are ignored so buyer data is never logged. */
export const hotmartPurchaseWebhookSchema = z.object({
  id: optionalText,
  event: optionalText,
  data: z
    .object({
      product: z
        .object({
          ucode: optionalText,
        })
        .optional(),
      purchase: z
        .object({
          transaction: optionalText,
          status: optionalText,
        })
        .optional(),
    })
    .optional(),
});

export type HotmartPurchaseWebhook = z.infer<typeof hotmartPurchaseWebhookSchema>;

/** Fields forwarded to the mailer. Not used by the log. */
export const hotmartPurchaseEmailFieldsSchema = z.object({
  event: optionalText,
  data: z
    .object({
      buyer: z
        .object({
          email: optionalText,
          name: optionalText,
        })
        .optional(),
      product: z
        .object({
          name: optionalText,
        })
        .optional(),
      purchase: z
        .object({
          transaction: optionalText,
        })
        .optional(),
    })
    .optional(),
});

export type HotmartPurchaseEmailFields = z.infer<typeof hotmartPurchaseEmailFieldsSchema>;
