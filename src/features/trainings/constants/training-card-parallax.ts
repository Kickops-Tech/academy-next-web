import type { TrainingVisualId } from "@features/trainings/models/training";

export const TRAINING_CARD_PARALLAX_CSS = {
  y: "--training-card-art-y",
} as const;

/**
 * Per-visual vertical travel so neighboring cards do not lock-step.
 * Positive Y follows the scroll (image rises faster); negative lags.
 */
export const TRAINING_CARD_PARALLAX = {
  brain: { y: 44 },
  remote: { y: -26 },
  management: { y: 52 },
  architecture: { y: 28 },
  rag: { y: -20 },
  design: { y: 38 },
  steps: { y: -34 },
  business: { y: 30 },
  sebrae: { y: 36 },
} as const satisfies Record<TrainingVisualId, { y: number }>;
