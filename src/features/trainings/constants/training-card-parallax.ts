import type { TrainingVisualId } from "@features/trainings/models/training";

export const TRAINING_CARD_PARALLAX_CSS = {
  y: "--training-card-art-y",
} as const;

/**
 * Per-visual vertical travel so neighboring cards do not lock-step.
 * Positive Y follows the scroll (image rises faster); negative lags.
 */
export const TRAINING_CARD_PARALLAX = {
  brain: { y: 32 },
  remote: { y: -18 },
  management: { y: 38 },
  architecture: { y: 20 },
  rag: { y: -14 },
  design: { y: 28 },
  steps: { y: -24 },
  business: { y: 22 },
  sebrae: { y: 26 },
} as const satisfies Record<TrainingVisualId, { y: number }>;
