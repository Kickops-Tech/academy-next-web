import { HeroParallaxSection } from "@features/hero/components/hero-parallax-section";
import type { ReactNode } from "react";

/**
 * Landing Hero: first-viewport message and CTA for Kickops Academy.
 *
 * Scroll parallax + differentiated fade live in {@link HeroParallaxSection}.
 */
export function HeroMain({ children }: { children?: ReactNode }) {
  return <HeroParallaxSection>{children}</HeroParallaxSection>;
}
