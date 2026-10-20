"use client";

import { subscribeScrollRaf } from "@core/lib/subscribe-scroll-raf";
import {
  TRAINING_CARD_PARALLAX,
  TRAINING_CARD_PARALLAX_CSS,
} from "@features/trainings/constants/training-card-parallax";
import type { TrainingVisualId } from "@features/trainings/models/training";
import { useLayoutEffect, type RefObject } from "react";

function roundPx(px: number) {
  return `${Math.round(px * 2) / 2}px`;
}

/**
 * Vertical scroll parallax on the card art only. Writes a CSS var — no re-render.
 * Amplitude and direction come from the visual so neighbors stay irregular.
 */
export function useTrainingCardArtParallax(
  cardRef: RefObject<HTMLElement | null>,
  artRef: RefObject<HTMLElement | null>,
  visual: TrainingVisualId,
) {
  useLayoutEffect(() => {
    const card = cardRef.current;
    const art = artRef.current;
    if (!card || !art) {
      return;
    }

    const motion = TRAINING_CARD_PARALLAX[visual];
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let lastKey = "";

    const update = () => {
      if (reducedMotion) {
        if (lastKey !== "rm") {
          lastKey = "rm";
          art.style.setProperty(TRAINING_CARD_PARALLAX_CSS.y, "0px");
        }
        return;
      }

      const viewportHeight = window.innerHeight;
      const rect = card.getBoundingClientRect();
      if (rect.bottom < -40 || rect.top > viewportHeight + 40) {
        return;
      }

      const center = rect.top + rect.height / 2;
      const progress = (center - viewportHeight * 0.5) / viewportHeight;
      const y = progress * motion.y;
      const key = roundPx(y);
      if (key === lastKey) {
        return;
      }
      lastKey = key;
      art.style.setProperty(TRAINING_CARD_PARALLAX_CSS.y, key);
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      lastKey = "";
      update();
    };

    const unsubscribe = subscribeScrollRaf(update);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      unsubscribe();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [artRef, cardRef, visual]);
}
