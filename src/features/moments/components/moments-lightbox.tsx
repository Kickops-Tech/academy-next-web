"use client";

import { MOMENT_PHOTOS } from "@features/moments/constants/moments";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type MomentsLightboxProps = {
  index: number;
  onClose: () => void;
  onStep: (dir: number) => void;
};

export function MomentsLightbox({
  index,
  onClose,
  onStep,
}: MomentsLightboxProps) {
  const photo = MOMENT_PHOTOS[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        onStep(-1);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        onStep(1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onStep]);

  if (!photo) {
    return null;
  }

  return createPortal(
    <div
      className="moments-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="moments-lightbox-close"
        aria-label="Fechar foto"
        onClick={onClose}
      >
        <span>×</span>
      </button>
      <figure
        className="moments-lightbox-frame"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={photo.src} alt={photo.alt} />
      </figure>
      <div
        className="moments-lightbox-nav"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" aria-label="Foto anterior" onClick={() => onStep(-1)}>
          ←
        </button>
        <button type="button" aria-label="Próxima foto" onClick={() => onStep(1)}>
          →
        </button>
      </div>
    </div>,
    document.body,
  );
}
