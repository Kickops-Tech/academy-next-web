"use client";

import { MomentsGrid } from "@features/moments/components/moments-grid";
import { MomentsLightbox } from "@features/moments/components/moments-lightbox";
import {
  cinemaLoop,
  MOMENT_PHOTOS,
} from "@features/moments/constants/moments";
import { useMomentsCinema } from "@features/moments/hooks/use-moments-cinema";
import { useCallback, useRef, useState } from "react";

const PANELS = cinemaLoop(MOMENT_PHOTOS);

export function MomentsCinema() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openPhoto = useCallback((index: number) => {
    if (index >= 0 && index < MOMENT_PHOTOS.length) {
      setOpenIndex(index);
    }
  }, []);
  const closePhoto = useCallback(() => {
    setOpenIndex(null);
  }, []);
  const stepPhoto = useCallback((dir: number) => {
    setOpenIndex((current) => {
      if (current === null) {
        return current;
      }
      const count = MOMENT_PHOTOS.length;
      return (current + dir + count) % count;
    });
  }, []);
  useMomentsCinema(rootRef, openPhoto);

  return (
    <>
      <MomentsGrid onOpen={openPhoto} />
      <div
        ref={rootRef}
        className="moments-cinema"
        aria-label="Fotos da Introspecção"
      >
        <div className="moments-cinema-letterbox" data-cinema-stage>
          <div className="moments-cinema-scaler" data-cinema-scaler>
            <div className="moments-cinema-viewport" data-cinema-viewport>
              <div className="moments-cinema-ring" data-cinema-ring>
                {PANELS.map((photo, index) => (
                  <figure
                    key={`${photo.id}-${index}`}
                    className="moments-cinema-card"
                    data-cinema-card=""
                    data-index={String(index % MOMENT_PHOTOS.length)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      draggable={false}
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="moments-cinema-nav">
          <button type="button" data-cinema-prev aria-label="Foto anterior">
            ←
          </button>
          <button type="button" data-cinema-next aria-label="Próxima foto">
            →
          </button>
        </div>
      </div>
      {openIndex !== null ? (
        <MomentsLightbox
          index={openIndex}
          onClose={closePhoto}
          onStep={stepPhoto}
        />
      ) : null}
    </>
  );
}
