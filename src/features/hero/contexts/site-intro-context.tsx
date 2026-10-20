"use client";

import { createContext, useContext } from "react";

export type SiteIntroPhase =
  | "boot"
  | "playing"
  | "revealed"
  | "done"
  | "skipped";

export interface SiteIntroContextValue {
  phase: SiteIntroPhase;
}

export const SiteIntroContext = createContext<SiteIntroContextValue>({
  phase: "boot",
});

export function useSiteIntro(): SiteIntroContextValue {
  return useContext(SiteIntroContext);
}
