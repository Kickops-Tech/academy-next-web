export type TrainingVisualId =
  | "brain"
  | "remote"
  | "management"
  | "architecture"
  | "rag"
  | "design"
  | "steps"
  | "business";

export type TrainingOutcome = {
  title: string;
  description: string;
};

export type TrainingProgramItem = {
  title: string;
  description: string;
};

export type Training = {
  number: string;
  slug: string;
  title: string;
  titleLines: string[];
  subtitle?: string;
  shortDescription: string;
  description: string;
  category: string;
  level: string;
  format: string;
  duration: string;
  accent: string;
  visual: TrainingVisualId;
  featured: boolean;
  audience: string;
  outcomes: TrainingOutcome[];
  program: TrainingProgramItem[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    message: string;
  };
};

export type TrainingCatalog = {
  catalog: {
    eyebrow: string;
    heroTitlePrimary: string;
    heroTitleSecondary: string;
    title: string;
    description: string;
    sectionTitle: string;
    sectionDescription: string;
    whatsappNumber: string;
    contactMessage: string;
  };
  trainings: Training[];
};
