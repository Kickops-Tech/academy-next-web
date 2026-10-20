"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const COLORS = ["#ffd700", "#f5c542", "#e6b422", "#ffe27a", "#c9a227", "#fff3b0"];
const PIECE_COUNT = 480;
const DURATION_MS = 4200;

type Piece = {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  spin: number;
  color: string;
};

type SebraeGoldenTicketConfettiProps = {
  onDone: () => void;
};

function createPieces(width: number, height: number): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, index) => ({
    x: Math.random() * width,
    y: -40 - Math.random() * height * 0.45,
    width: index % 4 === 0 ? 26 : 12,
    height: index % 7 === 0 ? 10 : 5,
    velocityX: (Math.random() - 0.5) * 220,
    velocityY: 240 + Math.random() * 520,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 10,
    color: COLORS[index % COLORS.length] ?? COLORS[0],
  }));
}

export function SebraeGoldenTicketConfetti({
  onDone,
}: SebraeGoldenTicketConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      onDoneRef.current();
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      onDoneRef.current();
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const pieces = createPieces(width, height);
    const startedAt = performance.now();
    let previous = startedAt;
    let frame = 0;

    function draw(now: number) {
      const elapsed = now - startedAt;
      const step = Math.min(32, now - previous) / 1000;
      previous = now;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const fade = progress < 0.62 ? 1 : 1 - (progress - 0.62) / 0.38;

      context.clearRect(0, 0, width, height);
      context.globalAlpha = fade;

      for (const piece of pieces) {
        piece.x += piece.velocityX * step;
        piece.y += piece.velocityY * step;
        piece.rotation += piece.spin * step;
        if (piece.y > height + 24) {
          piece.y = -24;
          piece.x = Math.random() * width;
        }
        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        context.fillRect(
          -piece.width / 2,
          -piece.height / 2,
          piece.width,
          piece.height,
        );
        context.restore();
      }

      context.globalAlpha = 1;

      if (progress < 1) {
        frame = requestAnimationFrame(draw);
        return;
      }

      onDoneRef.current();
    }

    draw(performance.now());
    return () => cancelAnimationFrame(frame);
  }, []);

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] h-screen w-screen"
    />,
    document.body,
  );
}
