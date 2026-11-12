const outcomes = [
  {
    title: "Enxergar oportunidades reais",
    description:
      "Entender possibilidades e limites da IA para avaliar onde ela pode apoiar o negócio — e onde o julgamento humano continua essencial.",
  },
  {
    title: "Rever antes de automatizar",
    description:
      "Olhar para os processos do time, reconhecer desperdícios e discutir o que simplificar antes de adicionar mais uma ferramenta.",
  },
  {
    title: "Dar direção aos próximos passos",
    description:
      "Criar critérios para escolher o que vale testar e alinhar a liderança em torno de problemas concretos, em vez de iniciativas isoladas.",
  },
];

export function OutcomesMain() {
  return (
    <section aria-labelledby="outcomes-title" className="bg-kickops-green text-kickops-gray">
      <div className="mx-auto max-w-[100rem] px-5 py-16 md:px-10 md:py-24 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="font-dm-mono text-xs tracking-[0.16em] uppercase">O que seu time desenvolve</p>
            <h2 id="outcomes-title" className="mt-4 max-w-xl text-balance font-league-gothic text-5xl leading-none uppercase md:text-7xl">
              Da curiosidade à decisão.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed md:text-lg">
            Para sócios, gestores e lideranças que precisam orientar o uso de IA
            na empresa. A proposta é construir repertório e critério para conectar
            tecnologia, pessoas e decisões de negócio.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {outcomes.map((outcome, index) => (
            <li key={outcome.title} className="border-t border-kickops-gray/30 pt-5">
              <span className="font-dm-mono text-sm">0{index + 1}</span>
              <h3 className="mt-6 text-xl font-bold md:text-2xl">{outcome.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-kickops-gray/80">{outcome.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-4 border-t border-kickops-gray/30 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="leading-relaxed">
            <strong>Condução de Guilherme Rey</strong>
            <span className="mt-1 block text-kickops-gray/80">
              CEO da Kickops · Mestre em Tecnologia Nuclear pelo IPEN/USP
            </span>
          </p>
          <a href="#quem-conduz" className="w-fit py-2 font-bold underline underline-offset-4">
            Conheça sua trajetória <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
