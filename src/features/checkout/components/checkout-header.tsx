import { KickopsLogo } from "@core/components/kickops-logo";
import Link from "next/link";

export function CheckoutHeader() {
  return (
    <header className="w-full bg-[#121212] text-white">
      <div className="mx-auto flex h-20 w-full max-w-[120rem] items-center px-5 md:h-24 md:px-10 xl:px-16">
        <Link
          href="/"
          aria-label="Kickops Academy — início"
          className="flex items-center gap-3"
        >
          <KickopsLogo className="h-6 w-auto md:h-7" />
          <span className="border-l border-white/30 pl-3 font-dm-mono text-[10px] tracking-[0.2em] uppercase md:text-xs">
            Academy
          </span>
        </Link>
      </div>
    </header>
  );
}
