import type { MouseEvent } from "react";

export const CATALOG_SECTION_ID = "catalogo";

const CATALOG_SCROLL_MS = 380;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

export function scrollToCatalog(event: MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById(CATALOG_SECTION_ID);
  if (!target) {
    return;
  }

  event.preventDefault();

  const margin =
    Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const destination = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - margin,
  );
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    window.scrollTo(0, destination);
    history.pushState(null, "", `#${CATALOG_SECTION_ID}`);
    return;
  }

  const start = window.scrollY;
  const distance = destination - start;
  const startTime = performance.now();

  function step(now: number) {
    const progress = Math.min(1, (now - startTime) / CATALOG_SCROLL_MS);
    window.scrollTo(0, start + distance * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    history.pushState(null, "", `#${CATALOG_SECTION_ID}`);
  }

  requestAnimationFrame(step);
}
