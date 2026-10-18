import { Plus } from "lucide-react";
import type { SebraeTrainingData } from "../models/sebrae-training";
import { SebraeSection } from "./sebrae-section";

export function SebraeProgram({
  program,
}: {
  program: SebraeTrainingData["program"];
}) {
  return (
    <SebraeSection
      id="programa"
      eyebrow={program.eyebrow}
      title={program.title}
    >
      <ol className="border-t border-kickops-gray/25">
        {program.items.map((item, index) => (
          <li
            key={item.title}
            data-sebrae-reveal={index * 50}
            className="border-b border-kickops-gray/25 py-6 md:py-8"
          >
            <div className="grid gap-4 md:grid-cols-[3rem_1fr_1fr] md:gap-8">
              <span className="font-dm-mono text-xs text-fe26-purple">
                0{index + 1}
              </span>
              <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
              <div>
                <p className="text-sm leading-relaxed text-kickops-lightgray">
                  {item.summary}
                </p>
                <p className="mt-3 text-sm">
                  <strong className="text-fe26-purple">
                    {program.resultLabel}:
                  </strong>{" "}
                  {item.result}
                </p>
                <details data-program={item.title} className="group mt-4">
                  <summary className="flex min-h-11 list-none items-center gap-3 text-xs font-bold [&::-webkit-details-marker]:hidden">
                    {program.detailsLabel}
                    <Plus aria-hidden className="size-4 group-open:rotate-45" />
                  </summary>
                  <p className="my-4 text-sm leading-relaxed text-kickops-lightgray">
                    <strong>Objetivo:</strong> {item.objective}
                  </p>
                  <ul className="mt-2 list-disc space-y-3 pl-5 text-sm leading-relaxed text-kickops-lightgray">
                    {item.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                  <p className="mt-5 border-l-2 border-fe26-purple pl-4 text-sm leading-relaxed">
                    <strong>Exercício:</strong> {item.exercise}
                  </p>
                </details>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SebraeSection>
  );
}
