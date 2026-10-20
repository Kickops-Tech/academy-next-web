import { SebraeLanding } from "@features/sebrae/components/sebrae-landing";
import { SEBRAE_TRAINING } from "@features/sebrae/utils/sebrae-training";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SEBRAE_TRAINING.seo.title,
  description: SEBRAE_TRAINING.seo.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: SEBRAE_TRAINING.seo.title,
    description: SEBRAE_TRAINING.seo.description,
    type: "website",
    locale: "pt_BR",
  },
};

export default function Fe26TrainingPage() {
  const checkoutUrl =
    process.env.NEXT_PUBLIC_CHECKOUT_URL || SEBRAE_TRAINING.offer.checkoutUrl;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: SEBRAE_TRAINING.name,
    description: SEBRAE_TRAINING.seo.description,
    inLanguage: "pt-BR",
    timeRequired: "PT5H",
    provider: { "@type": "Organization", name: "Kickops Academy" },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <SebraeLanding checkoutUrl={checkoutUrl} />
    </>
  );
}
