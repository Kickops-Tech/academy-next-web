export const MOMENTS_HEADING = {
  lead: "PRÁTICA",
  display: "AO VIVO",
} as const;

export type MomentPhoto = {
  id: string;
  src: string;
  alt: string;
};

export const MOMENT_PHOTOS: readonly MomentPhoto[] = [
  {
    id: "01",
    src: "/img/introspeccao/0001.jpeg",
    alt: "Encontro da Introspecção da Kickops Academy",
  },
  {
    id: "02",
    src: "/img/introspeccao/0002.jpeg",
    alt: "Facilitador apresenta o quadro de processos de pensamento e comportamento",
  },
  {
    id: "03",
    src: "/img/introspeccao/0003.jpeg",
    alt: "Abertura da Introspecção com o desenho do busto da Kickops Academy na tela",
  },
  {
    id: "04",
    src: "/img/introspeccao/0004.jpeg",
    alt: "Facilitador demonstra um grafo na tela durante o workshop",
  },
  {
    id: "05",
    src: "/img/introspeccao/0005.jpeg",
    alt: "Participantes acompanham o encontro pela mesa",
  },
  {
    id: "06",
    src: "/img/introspeccao/0006.jpeg",
    alt: "Apresentação em pé para o grupo reunido na sala",
  },
] as const;

/** Densify the ring when there are few frames (same rule as Fibra cinema). */
export function cinemaLoop<T>(items: readonly T[]): readonly T[] {
  if (items.length > 0 && items.length < 10) {
    return [...items, ...items];
  }
  return items;
}
