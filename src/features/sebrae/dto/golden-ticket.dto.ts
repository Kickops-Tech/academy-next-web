import { z } from "zod";

import { formatBrazilMobile } from "@features/trainings/utils/brazil-mobile";

export const goldenTicketBodySchema = z.object({
  name: z.string().trim().min(1),
  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),
  phone: z.string().refine((value) => formatBrazilMobile(value) !== undefined),
});

export type GoldenTicketBody = z.infer<typeof goldenTicketBodySchema>;
