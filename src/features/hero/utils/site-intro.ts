import {
  SITE_INTRO_SEEN_STYLE_ID,
  SITE_INTRO_SKIP_PATHS,
  SITE_INTRO_SKIP_PREFIXES,
  SITE_INTRO_STORAGE_KEY,
} from "@features/hero/constants/hero-intro";

const CURTAIN_HIDE_CSS = ".hero-intro-backdrop{display:none!important}";

export const SITE_INTRO_SCROLL_LOCK_CLASS = "hero-intro-locked";

/** True when this route should never play the Kickops Lottie curtain. */
export function isSiteIntroSkipPath(pathname: string): boolean {
  if ((SITE_INTRO_SKIP_PATHS as readonly string[]).includes(pathname)) {
    return true;
  }
  return SITE_INTRO_SKIP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function hasSeenSiteIntro(): boolean {
  try {
    return sessionStorage.getItem(SITE_INTRO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function hideSiteIntroCurtain(): void {
  if (document.getElementById(SITE_INTRO_SEEN_STYLE_ID)) {
    return;
  }
  const style = document.createElement("style");
  style.id = SITE_INTRO_SEEN_STYLE_ID;
  style.textContent = CURTAIN_HIDE_CSS;
  document.head.appendChild(style);
}

export function markSiteIntroSeen(): void {
  try {
    sessionStorage.setItem(SITE_INTRO_STORAGE_KEY, "1");
  } catch {
    /* Private mode still hides the curtain via the injected style. */
  }
  hideSiteIntroCurtain();
}

export function lockSiteIntroScroll(): void {
  document.documentElement.classList.add(SITE_INTRO_SCROLL_LOCK_CLASS);
}

/**
 * Drop the intro scroll lock. Only `scrollTo(0, 0)` when still locked
 * and already at the top — never yank a user who already scrolled.
 */
export function unlockSiteIntroScroll(): void {
  const wasLocked = document.documentElement.classList.contains(
    SITE_INTRO_SCROLL_LOCK_CLASS,
  );
  document.documentElement.classList.remove(SITE_INTRO_SCROLL_LOCK_CLASS);
  if (!wasLocked || window.scrollY > 0) {
    return;
  }
  window.scrollTo(0, 0);
}

/** Inline script: hide the SSR curtain before paint when this tab already saw it. */
export function siteIntroSeenInlineScript(): string {
  const paths = SITE_INTRO_SKIP_PATHS.map((path) => JSON.stringify(path)).join(
    ",",
  );
  const prefixes = SITE_INTRO_SKIP_PREFIXES.map((path) =>
    JSON.stringify(path),
  ).join(",");
  return `try{var p=location.pathname,s=[${paths}],x=[${prefixes}];if(sessionStorage.getItem(${JSON.stringify(SITE_INTRO_STORAGE_KEY)})==="1"||s.indexOf(p)!==-1||x.some(function(k){return p===k||p.indexOf(k+"/")===0})){var el=document.createElement("style");el.id=${JSON.stringify(SITE_INTRO_SEEN_STYLE_ID)};el.textContent=${JSON.stringify(CURTAIN_HIDE_CSS)};document.head.appendChild(el)}}catch(e){}`;
}
