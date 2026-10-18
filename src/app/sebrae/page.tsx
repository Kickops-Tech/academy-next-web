import { SebraeLanding } from "@features/sebrae/components/sebrae-landing";
import { SEBRAE_TRAINING } from "@features/sebrae/utils/sebrae-training";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: SEBRAE_TRAINING.seo.title,
  description: SEBRAE_TRAINING.seo.description,
  openGraph: {
    title: SEBRAE_TRAINING.seo.title,
    description: SEBRAE_TRAINING.seo.description,
    type: "website",
    locale: "pt_BR",
  },
};

export default function SebraePage() {
  const checkoutUrl =
    process.env.NEXT_PUBLIC_CHECKOUT_URL || SEBRAE_TRAINING.offer.checkoutUrl;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
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
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
        </>
      ) : null}
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
