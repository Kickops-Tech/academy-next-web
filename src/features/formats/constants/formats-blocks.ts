export type FormatsBlockId = "formato" | "conteudo" | "investimento";

export type FormatsParagraph = {
  text: string;
  accent?: boolean;
};

export type FormatsBlock = {
  id: FormatsBlockId;
  eyebrow: string;
  title: string;
  paragraphs: FormatsParagraph[];
};

/** Block copy — Figma 918:286 (D) / 721:2099 (M). */
export const FORMATS_BLOCKS: FormatsBlock[] = [
  {
    id: "formato",
    eyebrow: "FORMATO",
    title: "Presencial ou online",
    paragraphs: [
      {
        text: "Reúna sua liderança no formato que funciona para a empresa: presencial ou online.",
      },
      {
        text: "A duração e a dinâmica são alinhadas aos objetivos e à disponibilidade do time.",
      },
      {
        text: "Precisa de um local? Converse com a nossa equipe.",
        accent: true,
      },
    ],
  },
  {
    id: "conteudo",
    eyebrow: "CONTEÚDO",
    title: "O contexto é de vocês",
    paragraphs: [
      {
        text: "Os exemplos e as discussões partem dos processos, desafios e prioridades da empresa.",
      },
      {
        text: "A profundidade do conteúdo acompanha a familiaridade do grupo com IA e as decisões que precisa tomar.",
      },
    ],
  },
  {
    id: "investimento",
    eyebrow: "INVESTIMENTO",
    title: "Proposta sob medida",
    paragraphs: [
      {
        text: "O investimento considera o escopo, o número de participantes e o formato do treinamento.",
      },
      {
        text: "Conte seu desafio. Alinhamos os objetivos e apresentamos uma proposta para o seu time.",
      },
    ],
  },
];
