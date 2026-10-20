import { MOMENT_PHOTOS } from "@features/moments/constants/moments";

type MomentsGridProps = {
  onOpen: (index: number) => void;
};

export function MomentsGrid({ onOpen }: MomentsGridProps) {
  return (
    <ul className="moments-grid" aria-label="Fotos da Introspecção">
      {MOMENT_PHOTOS.map((photo, index) => (
        <li key={photo.id}>
          <button type="button" onClick={() => onOpen(index)}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        </li>
      ))}
    </ul>
  );
}
