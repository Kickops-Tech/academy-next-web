export type SebraeTrainingData = {
  event: {
    name: string;
    shortName: string;
    organizer: string;
    dates: string;
    hours: string;
    location: string;
    websiteUrl: string;
  };
  hero: {
    eyebrow: string;
    titlePrimary: string;
    titleSecondary: string;
    description: string;
    badge: string;
    ctaLabel: string;
    fallbackCtaLabel: string;
  };
  training: {
    introEyebrow: string;
    introTitle: string;
    introDescription: string;
    audience: string;
    facts: Array<{ label: string; value: string }>;
    outcomesEyebrow: string;
    outcomesTitle: string;
    outcomes: Array<{
      number: string;
      title: string;
      description: string;
      accent: string;
    }>;
    programEyebrow: string;
    programTitle: string;
    programDescription: string;
    program: Array<{ title: string; description: string }>;
    deliverablesEyebrow: string;
    deliverablesTitle: string;
    deliverables: string[];
  };
  offer: {
    eyebrow: string;
    title: string;
    description: string;
    conditionLabel: string;
    conditionDescription: string;
    checkoutUrl: string;
    ctaLabel: string;
    pendingLabel: string;
    securityNote: string;
    supportNote: string;
  };
};
