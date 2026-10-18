import { LegalDocument } from "@features/legal/components/legal-document";
import { PRIVACY_POLICY } from "@features/legal/constants/legal-documents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${PRIVACY_POLICY.title} | Kickops Academy`,
  description: PRIVACY_POLICY.description,
};

export default function PrivacyPolicyPage() {
  return <LegalDocument copy={PRIVACY_POLICY} />;
}
