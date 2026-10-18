import Image from "next/image";
import type { SebraeTrainingData } from "../models/sebrae-training";

export function SebraeMentor({
  mentor,
}: {
  mentor: SebraeTrainingData["mentor"];
}) {
  return (
    <section
      id="mentor"
      aria-labelledby="mentor-title"
      className="sebrae-section overflow-hidden bg-[#f2f1ed] px-5 py-16 md:px-10 md:py-24 xl:px-16"
    >
      <div className="mx-auto max-w-[86.5rem]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-20">
          <div
            data-sebrae-reveal
            className="relative mx-auto w-full max-w-lg pr-4 pb-4 lg:mx-0"
          >
            <div
              aria-hidden
              className="absolute inset-0 top-8 left-8 bg-fe26-purple"
            />
            <div className="sebrae-portrait relative aspect-[4/5] overflow-hidden bg-kickops-gray">
              <Image
                src={mentor.imageSrc}
                alt={mentor.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 512px, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/85 to-transparent"
              />
              <p className="absolute right-6 bottom-6 left-6 border-l-2 border-fe26-lime pl-4 font-dm-mono text-xs leading-relaxed text-white">
                {mentor.role}
              </p>
            </div>
          </div>
          <div data-sebrae-reveal="120">
            <p className="font-dm-mono text-[10px] tracking-[0.18em] text-fe26-purple uppercase">
              {mentor.eyebrow}
            </p>
            <h2 id="mentor-title" className="mt-4">
              <span className="block text-xl md:text-2xl">{mentor.title}</span>
              <span className="mt-3 block font-league-gothic text-[clamp(4rem,8vw,7rem)] leading-none uppercase">
                {mentor.name}
              </span>
            </h2>
            <div className="mt-7 max-w-2xl space-y-5 text-sm leading-relaxed text-kickops-lightgray md:text-base">
              {mentor.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-kickops-gray/20 pt-6 sm:grid-cols-4">
              {mentor.credentials.map((credential) => (
                <div key={credential.title}>
                  <dt className="text-sm font-bold text-fe26-purple">
                    {credential.title}
                  </dt>
                  <dd className="mt-2 text-xs leading-relaxed">
                    {credential.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-12 border-t border-kickops-gray/20 pt-7 lg:mt-16">
          <p className="font-dm-mono text-[10px] tracking-widest text-kickops-lightgray uppercase">
            {mentor.experienceLabel}
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4 text-xl font-bold text-kickops-gray md:justify-between md:text-2xl">
            {mentor.companies.map((company) => (
              <li key={company}>{company}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
