"use client";

import {
  WIREFRAME_GLOBE_DPR_CAP_DESKTOP,
  WIREFRAME_GLOBE_DPR_CAP_MOBILE,
  WIREFRAME_GLOBE_MOBILE_MAX_WIDTH,
} from "@core/constants/wireframe-globe";
import type { WireframeGlobeHandle } from "@core/lib/wireframe-globe/create-wireframe-globe";
import { cn } from "@shadcn/lib/utils";
import { useLayoutEffect, useRef } from "react";

function resolveDpr() {
  const mobile = window.innerWidth < WIREFRAME_GLOBE_MOBILE_MAX_WIDTH;
  const cap = mobile
    ? WIREFRAME_GLOBE_DPR_CAP_MOBILE
    : WIREFRAME_GLOBE_DPR_CAP_DESKTOP;
  return Math.min(window.devicePixelRatio || 1, cap);
}

type WireframeGlobeBackdropProps = {
  className?: string;
};

/**
 * Viewport-bound wireframe globe for a single dark fold (catalog + B2B hero).
 * The scrolling theme band below the B2B hero is {@link WireframeGlobeBand}.
 */
export function WireframeGlobeBackdrop({
  className,
}: WireframeGlobeBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let cancelled = false;
    let globe: WireframeGlobeHandle | null = null;
    let raf = 0;
    let lastTs = 0;
    let visible = true;
    let reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const syncSize = () => {
      globe?.setSize(canvas.clientWidth, canvas.clientHeight, resolveDpr());
    };

    const frame = (ts: number) => {
      raf = 0;
      if (cancelled || !globe || !visible) {
        lastTs = 0;
        return;
      }
      const dt = lastTs === 0 ? 0 : Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      globe.tick(reducedMotion ? 0 : dt);
      if (!reducedMotion) {
        raf = window.requestAnimationFrame(frame);
      }
    };

    const ensureLoop = () => {
      if (cancelled || raf !== 0 || !visible || reducedMotion) {
        return;
      }
      lastTs = 0;
      raf = window.requestAnimationFrame(frame);
    };

    const stopLoop = () => {
      if (raf !== 0) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
      lastTs = 0;
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stopLoop();
        globe?.tick(0);
        return;
      }
      ensureLoop();
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (visible) {
          ensureLoop();
          return;
        }
        stopLoop();
      },
      { threshold: 0.01 },
    );
    visibility.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
    });
    resizeObserver.observe(canvas);

    void import("@core/lib/wireframe-globe/create-wireframe-globe").then(
      ({ createWireframeGlobe }) => {
        if (cancelled) {
          return;
        }
        globe = createWireframeGlobe(canvas);
        globe.setLineColor("#b5cdba", 0.14);
        syncSize();
        globe.tick(0);
        motionQuery.addEventListener("change", onMotionChange);
        ensureLoop();
      },
    );

    return () => {
      cancelled = true;
      stopLoop();
      visibility.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      globe?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        className,
      )}
    />
  );
}
