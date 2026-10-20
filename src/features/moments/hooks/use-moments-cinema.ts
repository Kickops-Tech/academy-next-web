"use client";

import {
  CINEMA_ASPECT,
  CINEMA_CLICK_PX,
  CINEMA_COAST,
  CINEMA_DRAG_GAIN,
  CINEMA_MAX_CENTER_VW,
  CINEMA_MAX_LEFTOVER,
  CINEMA_MQ,
  CINEMA_PERSPECTIVE_PX,
  CINEMA_SNAP_MS,
  CINEMA_VISIBLE_ARC_DEG,
  CINEMA_WHEEL_GAIN,
  CINEMA_WHEEL_SNAP_MS,
} from "@features/moments/constants/moments-cinema";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

type OpenPhoto = (index: number) => void;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type CinemaApi = {
  layout: () => void;
  dispose: () => void;
};

function createCinema(
  root: HTMLElement,
  onOpenPhotoRef: RefObject<OpenPhoto | undefined>,
): CinemaApi | null {
  function currentCards() {
    return Array.from(
      root.querySelectorAll<HTMLElement>("[data-cinema-card]"),
    );
  }

  const cards = currentCards();
  const ring = root.querySelector<HTMLElement>("[data-cinema-ring]");
  const stage = root.querySelector<HTMLElement>("[data-cinema-stage]");
  const btnPrev = root.querySelector<HTMLElement>("[data-cinema-prev]");
  const btnNext = root.querySelector<HTMLElement>("[data-cinema-next]");
  const viewport = root.querySelector<HTMLElement>("[data-cinema-viewport]");
  const scaler = root.querySelector<HTMLElement>("[data-cinema-scaler]");
  if (!cards.length || !ring || !viewport) {
    return null;
  }

  const panelCount = cards.length;
  const step = 360 / panelCount;

  let radius = 480;
  let activePanel = 0;
  let rotation = 0;
  let dragging = false;
  let dragX = 0;
  let dragT = 0;
  let dragMoved = 0;
  let velocity = 0;
  let snapRaf = 0;
  let wheelSnapTimer = 0;

  function nearestPanel(rot: number) {
    const idx = Math.round(-rot / step);
    return ((idx % panelCount) + panelCount) % panelCount;
  }

  function chromeHeight() {
    const fold = root.closest("section");
    const inner = fold?.querySelector("[data-moments-stage]");
    const heading = fold?.querySelector("h2");
    const nav = root.querySelector(".moments-cinema-nav");
    const innerStyle = inner ? getComputedStyle(inner) : null;
    const navStyle = nav ? getComputedStyle(nav) : null;
    const pad = innerStyle
      ? parseFloat(innerStyle.paddingTop) + parseFloat(innerStyle.paddingBottom)
      : 0;
    const navGap = navStyle
      ? parseFloat(navStyle.marginTop) + parseFloat(navStyle.marginBottom)
      : 0;
    return (
      (heading?.getBoundingClientRect().height ?? 0) +
      (nav?.getBoundingClientRect().height ?? 0) +
      pad +
      navGap
    );
  }

  function measureRing() {
    const fold = root.closest("section");
    const foldH = fold?.clientHeight || window.innerHeight;
    const leftover = Math.max(160, foldH - chromeHeight());
    const foldW = fold?.clientWidth || window.innerWidth;
    const visualH = Math.min(
      leftover * CINEMA_MAX_LEFTOVER,
      (foldW * CINEMA_MAX_CENTER_VW) / CINEMA_ASPECT,
    );
    const cardH = visualH;
    const cardW = cardH * CINEMA_ASPECT;
    radius = cardW / (2 * Math.tan(Math.PI / Math.max(panelCount, 3)));
    const perspScale =
      CINEMA_PERSPECTIVE_PX / (CINEMA_PERSPECTIVE_PX + radius);
    const boost = 1 / Math.max(perspScale, 0.2);
    if (stage) {
      stage.style.height = `${visualH}px`;
    }
    viewport.style.height = `${visualH}px`;
    if (scaler) {
      scaler.style.transform = `scale(${boost})`;
    }
    return { cardW, cardH };
  }

  function cardTransform(i: number) {
    return `rotateY(${i * step}deg) translateZ(${-radius}px)`;
  }

  function applyRing(rot: number) {
    ring.style.transform = `rotateY(${rot}deg)`;
  }

  function paintFocus() {
    activePanel = nearestPanel(rotation);
    currentCards().forEach((card, i) => {
      const world = ((((i * step + rotation) % 360) + 540) % 360) - 180;
      const abs = Math.abs(world);
      const show = abs <= CINEMA_VISIBLE_ARC_DEG;
      card.style.opacity = show ? "1" : "0";
      card.style.visibility = show ? "visible" : "hidden";
      card.style.zIndex = String(Math.round(100 + abs));
      card.style.transform = cardTransform(i);
      card.classList.toggle("is-active", i === activePanel);
    });
  }

  function placeCards() {
    const m = measureRing();
    applyRing(rotation);
    currentCards().forEach((card, i) => {
      card.style.width = `${m.cardW}px`;
      card.style.height = `${m.cardH}px`;
      card.style.marginLeft = `${-m.cardW / 2}px`;
      card.style.marginTop = `${-m.cardH / 2}px`;
      card.style.transform = cardTransform(i);
    });
    paintFocus();
  }

  function stopSnap() {
    if (snapRaf !== 0) {
      window.cancelAnimationFrame(snapRaf);
      snapRaf = 0;
    }
    if (wheelSnapTimer !== 0) {
      window.clearTimeout(wheelSnapTimer);
      wheelSnapTimer = 0;
    }
  }

  function goToPanel(panelIdx: number, instant = false) {
    const currentPanel = nearestPanel(rotation);
    let delta = panelIdx - currentPanel;
    if (delta > panelCount / 2) {
      delta -= panelCount;
    } else if (delta < -panelCount / 2) {
      delta += panelCount;
    }
    const targetUnwrapped = -(currentPanel + delta) * step;
    const turns = Math.round((rotation - targetUnwrapped) / 360);
    const target = targetUnwrapped + turns * 360;
    stopSnap();
    if (prefersReducedMotion() || instant) {
      rotation = target;
      applyRing(rotation);
      paintFocus();
      return;
    }
    const from = rotation;
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / CINEMA_SNAP_MS);
      rotation = from + (target - from) * easeOutCubic(t);
      applyRing(rotation);
      paintFocus();
      if (t < 1) {
        snapRaf = window.requestAnimationFrame(tick);
        return;
      }
      snapRaf = 0;
    };
    snapRaf = window.requestAnimationFrame(tick);
  }

  function stepDir(dir: number) {
    goToPanel(activePanel + dir);
  }

  function onPrev() {
    stepDir(-1);
  }
  function onNext() {
    stepDir(1);
  }
  btnPrev?.addEventListener("click", onPrev);
  btnNext?.addEventListener("click", onNext);

  const surface = stage || root;

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    dragging = true;
    dragX = event.clientX;
    dragT = performance.now();
    dragMoved = 0;
    velocity = 0;
    stopSnap();
    surface.setPointerCapture(event.pointerId);
    surface.classList.add("is-dragging");
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) {
      return;
    }
    const now = performance.now();
    const dx = event.clientX - dragX;
    const dt = Math.max(8, now - dragT);
    velocity = dx / dt;
    dragMoved += Math.abs(dx);
    dragX = event.clientX;
    dragT = now;
    rotation -= dx * CINEMA_DRAG_GAIN;
    applyRing(rotation);
    paintFocus();
  }

  function endDrag() {
    if (!dragging) {
      return;
    }
    dragging = false;
    surface.classList.remove("is-dragging");
    const targetRot = rotation - velocity * CINEMA_COAST;
    goToPanel(nearestPanel(targetRot));
    velocity = 0;
  }

  function onPointerUp() {
    const tap = dragMoved < CINEMA_CLICK_PX;
    const index = Number(currentCards()[activePanel]?.dataset.index);
    endDrag();
    if (!tap || !Number.isInteger(index) || index < 0) {
      return;
    }
    onOpenPhotoRef.current?.(index);
  }

  function onWheel(event: WheelEvent) {
    const dx = event.deltaX;
    const dy = event.deltaY;
    const shifted = event.shiftKey && Math.abs(dy) >= Math.abs(dx);
    if (!shifted && Math.abs(dx) <= Math.abs(dy)) {
      return;
    }
    event.preventDefault();
    if (snapRaf !== 0) {
      window.cancelAnimationFrame(snapRaf);
      snapRaf = 0;
    }
    rotation += (shifted ? dy : dx) * CINEMA_WHEEL_GAIN;
    applyRing(rotation);
    paintFocus();
    if (wheelSnapTimer !== 0) {
      window.clearTimeout(wheelSnapTimer);
    }
    wheelSnapTimer = window.setTimeout(() => {
      wheelSnapTimer = 0;
      goToPanel(nearestPanel(rotation));
    }, CINEMA_WHEEL_SNAP_MS);
  }

  surface.addEventListener("pointerdown", onPointerDown);
  surface.addEventListener("pointermove", onPointerMove);
  surface.addEventListener("pointerup", onPointerUp);
  surface.addEventListener("pointercancel", endDrag);
  surface.addEventListener("wheel", onWheel, { passive: false });

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      stepDir(-1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      stepDir(1);
    }
  }
  root.addEventListener("keydown", onKeyDown);

  function onResize() {
    placeCards();
    goToPanel(activePanel, true);
  }
  const resize = new ResizeObserver(onResize);
  const fold = root.closest("section");
  if (fold) {
    resize.observe(fold);
  }
  window.addEventListener("resize", onResize, { passive: true });

  root.classList.add("is-ready");
  root.tabIndex = 0;
  placeCards();
  goToPanel(0, true);

  return {
    layout: placeCards,
    dispose() {
      stopSnap();
      btnPrev?.removeEventListener("click", onPrev);
      btnNext?.removeEventListener("click", onNext);
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", onPointerUp);
      surface.removeEventListener("pointercancel", endDrag);
      surface.removeEventListener("wheel", onWheel);
      root.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      resize.disconnect();
    },
  };
}

/**
 * Ports Fibra Cinemascope: concave 16:9 cylinder, drag + arrows, snap.
 * Re-applies layout after React commits so parent re-renders cannot wipe
 * the card transforms.
 */
export function useMomentsCinema(
  rootRef: RefObject<HTMLElement | null>,
  onOpenPhoto?: OpenPhoto,
) {
  const apiRef = useRef<CinemaApi | null>(null);
  const onOpenPhotoRef = useRef(onOpenPhoto);
  onOpenPhotoRef.current = onOpenPhoto;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia(CINEMA_MQ).matches) {
      return;
    }
    if (!apiRef.current) {
      apiRef.current = createCinema(root, onOpenPhotoRef);
    }
    apiRef.current?.layout();
  });

  useEffect(() => {
    const mq = window.matchMedia(CINEMA_MQ);

    function syncCinema() {
      if (mq.matches) {
        const root = rootRef.current;
        if (root && !apiRef.current) {
          apiRef.current = createCinema(root, onOpenPhotoRef);
          apiRef.current.layout();
        }
        return;
      }
      apiRef.current?.dispose();
      apiRef.current = null;
    }

    mq.addEventListener("change", syncCinema);
    return () => {
      mq.removeEventListener("change", syncCinema);
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, [rootRef]);
}
