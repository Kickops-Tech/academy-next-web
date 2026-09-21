import { z } from "zod";

import {
  CONTACT_EMPLOYEE_COUNT_VALUES,
  CONTACT_SOURCE_IDS,
} from "@features/contact/constants/contact-form";

/** Body accepted by the Next.js contact proxy (no subject — derived server-side). */
export const contactProxyBodySchema = z.object({
  name: z.string().trim().min(2),
  phone: z
    .string()
    .trim()
    .min(8)
    .regex(/^[\d\s()+-]+$/),
  email: z.email(),
  company: z.string().trim(),
  employeeCount: z.union([
    z.enum(CONTACT_EMPLOYEE_COUNT_VALUES),
    z.literal(""),
  ]),
  message: z.string().trim(),
  audienceId: z.enum(CONTACT_SOURCE_IDS),
});

export type ContactProxyBody = z.infer<typeof contactProxyBodySchema>;

/** Payload forwarded to the Kickops mailer. */
export const contactEmailPayloadSchema = z.object({
  subject: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),
  company: z.string(),
  employeeCount: z.string(),
  message: z.string(),
});

export type ContactEmailPayload = z.infer<typeof contactEmailPayloadSchema>;
