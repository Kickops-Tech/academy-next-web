/**
 * First-paint intro: global Lottie curtain, then Hero baffle / copy.
 *
 * @module features/hero/constants/hero-intro
 */

/** Bust opacity fade-in once WebGL/static asset is ready. */
export const HERO_INTRO_BUST_FADE_MS = 400;

/** Beat after bust fade before the title baffle starts. */
export const HERO_INTRO_TITLE_GAP_MS = 40;

/** Baffle timings (must match HeroParallaxSection props). */
export const HERO_INTRO_TITLE_BAFFLE = {
  introspeccao: { delay: 20, duration: 700 },
  academy: { delay: 50, duration: 750 },
  inteligencia: { delay: 80, duration: 850 },
  artificial: { delay: 120, duration: 900 },
} as const;

/**
 * Copy/CTA starts this long after the title baffle begins (overlaps decode —
 * does not wait for the last line to finish).
 */
export const HERO_INTRO_COPY_AFTER_TITLE_MS = 550;

/** Copy + CTA fade / slide-up. */
export const HERO_INTRO_COPY_DURATION_MS = 350;

/**
 * Kill-switch de build: `false` = loader nunca renderiza e o chunk
 * (`lottie_light` + JSON) nunca é baixado. Rollback seguro.
 */
export const HERO_INTRO_LOADER_ENABLED = true;

/** sessionStorage: Lottie already played in this tab. */
export const SITE_INTRO_STORAGE_KEY = "kickops-intro-seen";

/** Injected style id that hides the SSR curtain (do not mutate `<html>` class). */
export const SITE_INTRO_SEEN_STYLE_ID = "site-intro-seen";

/** Exact paths that never play the brand intro (gate / redirect). */
export const SITE_INTRO_SKIP_PATHS = ["/sebrae"] as const;

/** Path prefixes that never play the brand intro (post-purchase). */
export const SITE_INTRO_SKIP_PREFIXES = ["/checkout"] as const;

/** Frames e timeouts do Lottie intro loader (`kickops-intro.json`, 60fps). */
export const HERO_INTRO_LOADER = {
  holdFrame: 120,
  revealFrame: 140,
  endFrame: 220,
  /** Beat after Lottie reveal (frame 140) before the title baffle starts. */
  baffleDelayMs: 800,
  readyTimeoutMs: 6000,
  backdropSafetyMs: 10000,
} as const;
