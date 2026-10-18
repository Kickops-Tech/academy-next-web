import type { ReactNode } from "react";

export function SebraeSection({
  id,
  eyebrow,
  title,
  children,
  className = "",
  titleClassName = "font-league-gothic uppercase",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`sebrae-section px-5 py-16 md:px-10 md:py-24 xl:px-16 ${className}`}
    >
      <div className="relative mx-auto max-w-[86.5rem]">
        <p className="font-dm-mono text-[10px] tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
        <h2
          data-sebrae-reveal
          id={`${id}-title`}
          className={`mt-5 max-w-4xl text-[clamp(2.8rem,6vw,6rem)] leading-[0.98] ${titleClassName}`}
        >
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
