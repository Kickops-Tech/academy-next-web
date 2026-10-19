import { z } from "zod";

import { formatBrazilMobile } from "@features/trainings/utils/brazil-mobile";

export const trainingInterestBodySchema = z.object({
  slug: z.string().trim().min(1),
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().refine((value) => formatBrazilMobile(value) !== undefined),
});

export type TrainingInterestBody = z.infer<typeof trainingInterestBodySchema>;
