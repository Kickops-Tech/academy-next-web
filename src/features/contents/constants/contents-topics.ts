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
    label: "O SEU NEGÓCIO",
    title: "Entendemos primeiro",
    description:
      "Qual é o desafio de verdade? A gente senta, escuta e entende o negócio — reuniões para chegar no contexto, não no pacote pronto.",
    iconSrc: "/img/contents/icon-past.svg",
  },
  {
    id: "inflection",
    label: "SOB MEDIDA",
    title: "Feito no seu contexto",
    description:
      "A partir do que ouvimos, criamos o treinamento no idioma do seu time: casos, processos e restrições de vocês.",
    iconSrc: "/img/contents/icon-inflection.svg",
  },
  {
    id: "now",
    label: "O ENCONTRO",
    title: "Presencial ou online",
    description:
      "Realizamos o treinamento onde o time estiver. Na sala ou na tela — o importante é estar no mesmo lugar.",
    iconSrc: "/img/contents/icon-now.svg",
  },
  {
    id: "future",
    label: "ACOMPANHAMENTO",
    title: "Faz sentido?",
    description:
      "Depois, voltamos para uma sessão: o que fizemos juntos está fazendo sentido no dia a dia?",
    iconSrc: "/img/contents/icon-future.svg",
  },
] as const;
