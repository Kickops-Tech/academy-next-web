"use client";

import { useEffect } from "react";

export function useSebraeMotion() {
  useEffect(() => {
    const page = document.querySelector(".sebrae-landing");
    if (!page) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealed = new WeakSet<Element>();
    const active = new Map<Element, Animation>();
    const targets = page.querySelectorAll<HTMLElement>("[data-sebrae-reveal]");

    // Content stays visible without JS; only elements entering the viewport animate.
    function reveal(element: Element, delay = 0, duration = 700) {
      active.get(element)?.cancel();
      const animation = element.animate(
        [
          { opacity: 0, transform: "translate3d(0, 24px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" },
        ],
        {
          duration,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
      active.set(element, animation);
      animation.onfinish = () => active.delete(element);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || preference.matches) continue;
          const element = entry.target as HTMLElement;
          revealed.add(element);
          observer.unobserve(element);
          reveal(element, Number(element.dataset.sebraeReveal) || 0);
        }
      },
      { threshold: 0.12 },
    );

    function syncPreference() {
      observer.disconnect();
      for (const animation of active.values()) animation.cancel();
      active.clear();
      if (preference.matches) return;
      for (const target of targets) {
        if (!revealed.has(target)) observer.observe(target);
      }
    }

    function onToggle(event: Event) {
      const detail = event.target;
      if (
        preference.matches ||
        !(detail instanceof HTMLDetailsElement) ||
        !detail.open
      )
        return;
      Array.from(detail.children)
        .filter((child) => child.tagName !== "SUMMARY")
        .forEach((child, index) => reveal(child, index * 35, 350));
    }

    function onFocus(event: Event) {
      if (!(event.target instanceof Element)) return;
      for (const [element, animation] of active) {
        if (element.contains(event.target)) animation.finish();
      }
    }

    syncPreference();
    preference.addEventListener("change", syncPreference);
    page.addEventListener("toggle", onToggle, true);
    page.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      for (const animation of active.values()) animation.cancel();
      preference.removeEventListener("change", syncPreference);
      page.removeEventListener("toggle", onToggle, true);
      page.removeEventListener("focusin", onFocus);
    };
  }, []);
}
