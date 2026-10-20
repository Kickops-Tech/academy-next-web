import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Fe26TrainingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
