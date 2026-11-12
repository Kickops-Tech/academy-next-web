import { MomentsCinema } from "@features/moments/components/moments-cinema";
import { MomentsHeading } from "@features/moments/components/moments-heading";

export function MomentsSection() {
  return (
    <div
      data-moments-stage
      className="@container relative flex min-h-0 w-full flex-1 flex-col justify-center py-10"
    >
      <MomentsHeading />
      <p className="relative z-30 mx-auto max-w-2xl px-6 py-5 text-center text-base leading-relaxed text-kickops-gray/75">
        Um encontro real da Kickops Academy: espaço para trocar experiências,
        fazer perguntas e discutir a tecnologia a partir dos desafios de quem participa.
      </p>
      <MomentsCinema />
    </div>
  );
}
