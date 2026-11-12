export type ContentsTopicId = "past" | "inflection" | "now" | "future";

export type ContentsTopic = {
  id: ContentsTopicId;
  label: string;
  title: string;
  description: string;
  iconSrc: string;
};

export const CONTENTS_TOPICS: readonly ContentsTopic[] = [
  {
    id: "past",
    label: "01 · CONTEXTO",
    title: "O desafio vem primeiro",
    description:
      "Conversamos sobre os objetivos, os processos e a familiaridade do time com IA. Esse entendimento orienta o treinamento.",
    iconSrc: "/img/contents/icon-past.svg",
  },
  {
    id: "inflection",
    label: "02 · PREPARAÇÃO",
    title: "Conteúdo do seu negócio",
    description:
      "Selecionamos os temas e adaptamos os exemplos à realidade da empresa. O conteúdo considera as prioridades e as restrições de vocês.",
    iconSrc: "/img/contents/icon-inflection.svg",
  },
  {
    id: "now",
    label: "03 · TREINAMENTO",
    title: "Aprender e discutir juntos",
    description:
      "Presencial ou online, conectamos os conceitos de IA aos desafios do time, com espaço para perguntas e discussão de aplicações.",
    iconSrc: "/img/contents/icon-now.svg",
  },
  {
    id: "future",
    label: "04 · ACOMPANHAMENTO",
    title: "Retomar a aplicação",
    description:
      "Voltamos para uma sessão de acompanhamento: esclarecer dúvidas, discutir a aplicação no dia a dia e revisar os próximos passos.",
    iconSrc: "/img/contents/icon-future.svg",
  },
] as const;
