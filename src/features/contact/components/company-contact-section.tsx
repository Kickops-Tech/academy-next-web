import {
  COMPANY_CONTACT_HREF,
  COMPANY_CONTACT_LABEL,
} from "@features/contact/constants/company-contact";
import { ArrowUpRight } from "lucide-react";

const questions = [
  {
    question: "O treinamento serve para uma liderança não técnica?",
    answer:
      "O foco é a decisão de negócio. Na conversa inicial, entendemos a familiaridade do grupo com IA e ajustamos a linguagem, os exemplos e a profundidade do conteúdo.",
  },
  {
    question: "Qual é a duração e o investimento?",
    answer:
      "A proposta é definida a partir do objetivo, do perfil e número de participantes e do formato escolhido. A duração, o escopo e o investimento são alinhados antes da contratação.",
  },
  {
    question: "Pode ser presencial ou online?",
    answer:
      "Sim. Os dois formatos estão disponíveis. Na conversa inicial, alinhamos o que funciona melhor para reunir o seu time e, se necessário, discutimos o apoio na escolha do local.",
  },
  {
    question: "O que acontece depois do treinamento?",
    answer:
      "Há uma sessão de acompanhamento para conversar sobre a aplicação no dia a dia, esclarecer dúvidas e revisar os próximos passos. O formato desse retorno faz parte do alinhamento da proposta.",
  },
];

export function CompanyContactSection() {
  return (
    <section id="conversa" aria-labelledby="company-contact-title" className="bg-kickops-yellow text-kickops-gray">
      <div className="mx-auto grid max-w-[100rem] gap-14 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-20 xl:px-16">
        <div>
          <p className="font-dm-mono text-xs tracking-[0.16em] uppercase">Vamos começar pelo seu contexto</p>
          <h2 id="company-contact-title" className="mt-5 max-w-xl text-balance font-league-gothic text-5xl leading-none uppercase md:text-7xl">
            Que decisão sobre IA seu time precisa tomar?
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">
            Conte o desafio da empresa, quem vai participar e o que vocês querem
            desenvolver. A partir daí, conversamos sobre o treinamento que faz
            sentido para o seu time.
          </p>
          <a
            href={COMPANY_CONTACT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 bg-kickops-gray px-6 py-4 text-center font-bold text-white transition-colors hover:bg-kickops-lightgray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kickops-gray"
          >
            {COMPANY_CONTACT_LABEL}
            <ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
          </a>
          <p className="mt-3 text-sm text-kickops-gray/75">Conversa com a equipe Kickops pelo WhatsApp.</p>
        </div>
        <div>
          <h3 className="mb-5 text-xl font-bold">Antes de conversar</h3>
          {questions.map(({ question, answer }) => (
            <details key={question} className="border-t border-kickops-gray/25 py-5 last:border-b">
              <summary className="cursor-pointer pr-3 text-base font-bold leading-relaxed">{question}</summary>
              <p className="mt-4 text-base leading-relaxed text-kickops-gray/80">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
