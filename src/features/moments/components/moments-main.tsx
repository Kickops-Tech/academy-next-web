"use client";

import { LANDING_SECTION_ID } from "@core/constants/landing-sections";
import { useSectionHeadingParallax } from "@core/hooks/use-section-heading-parallax";
import { SECTION_HEADING_SECTION_STYLE } from "@core/utils/section-heading-parallax-style";
import { MomentsSection } from "@features/moments/components/moments-section";
import { cn } from "@shadcn/lib/utils";
import { useRef } from "react";

export function MomentsMain() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionHeadingParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      id={LANDING_SECTION_ID.moments}
      aria-label="Prática ao vivo"
      style={SECTION_HEADING_SECTION_STYLE}
      className={cn(
        "moments-fold relative z-[2] flex w-full flex-col overflow-clip",
        "bg-white text-kickops-gray",
      )}
    >
      <MomentsSection />
    </section>
  );
}
