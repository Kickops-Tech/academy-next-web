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
            className="border-b border-kickops-gray/25 py-6 md:py-8"
          >
            <div className="grid gap-4 md:grid-cols-[3rem_1fr_1fr] md:gap-8">
              <span className="font-dm-mono text-xs text-fe26-purple">
                0{index + 1}
              </span>
              <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
              <div>
                <p className="text-sm leading-relaxed text-kickops-lightgray">
                  {item.objective}
                </p>
                <p className="mt-3 text-sm">
                  <strong className="text-fe26-purple">Resultado:</strong>{" "}
                  {item.result}
                </p>
                <details className="group mt-4">
                  <summary className="flex min-h-11 list-none items-center gap-3 text-xs font-bold [&::-webkit-details-marker]:hidden">
                    Explorar esta etapa
                    <Plus aria-hidden className="size-4 group-open:rotate-45" />
                  </summary>
                  <ul className="mt-2 list-disc space-y-3 pl-5 text-sm leading-relaxed text-kickops-lightgray">
                    {item.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SebraeSection>
  );
}
