import { LegalDocument } from "@features/legal/components/legal-document";
import { TERMS_OF_USE } from "@features/legal/constants/legal-documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${TERMS_OF_USE.title} | Kickops Academy`,
  description: TERMS_OF_USE.description,
};

export default function TermsOfUsePage() {
  return <LegalDocument copy={TERMS_OF_USE} />;
}
