import { KickopsLogo } from "@core/components/kickops-logo";
import { SebraeCta } from "./sebrae-cta";
import type { SebraeTrainingData } from "../models/sebrae-training";
import Link from "next/link";

export function SebraeHeader({ data }: { data: SebraeTrainingData }) {
  return (
    <header className="sticky top-0 z-40 h-[var(--sebrae-header-height)] border-b border-white/15 bg-kickops-gray text-white">
      <div className="mx-auto flex h-full max-w-[94.5rem] items-center justify-between gap-5 px-5 md:px-10 xl:px-16">
        <Link
          href="/"
          aria-label="Kickops Academy — início"
          className="flex items-center gap-3"
        >
          <KickopsLogo />
          <span className="border-l border-white/30 pl-3 font-dm-mono text-[10px] tracking-[0.2em] uppercase">
            Academy
          </span>
        </Link>
        <nav
          aria-label="Navegação da imersão"
          className="hidden items-center gap-5 text-xs xl:flex"
        >
          {data.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 hover:text-fe26-lime"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span className="font-dm-mono text-[10px] tracking-widest text-fe26-lime md:hidden">
          {data.badge}
        </span>
        <div className="hidden md:block">
          <SebraeCta offer={data.offer} placement="nav" />
        </div>
      </div>
    </header>
  );
}
