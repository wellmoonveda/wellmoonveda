export type SectionVariant =
  | "minimal"
  | "floating-points"
  | "energy-grid"
  | "timeline"
  | "immersive"
  | "gentle-note"
  | "journey";

export type HealingPoint =
  | string
  | {
    text: string;
    icon?: string;
  };

export interface HealingSection {
  title: string;
  content?: string;
  points?: HealingPoint[];
  variant?: SectionVariant;

  media?: {
    type: "video";
    src: string;
  };
}

export interface HealingTheme {
  colors: {
    heading: string;
    body: string;
    accent: string;
    muted: string;
  };

  background: {
    type: "image" | "video";
    src: string;
  };
}

export interface HealingPathVideo {
  slug: string;
  title: string;
  shortDescription: string;
  videoSrc: string;

  theme?: HealingTheme;

  intro: string;
  sections: HealingSection[];
}

export interface Condition {
  name: string;
}

export interface ConditionMudra {
  conditions: Condition | null;
}

export interface MudraFromDB {
  id: string;
  title: string;
  image: string;
  instructions: string;
  benefits?: string;
  condition_mudras?: ConditionMudra[];
}

export interface Mudra {
  id: string;
  title: string;
  image: string;
  instructions: string;
  benefits?: string;
  conditions: string[];
}

export type VideoSession = {
  id: string;
  title: string;
  description?: string | null;
  video_url: string;
};

export type HealingPath = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
  created_at: string;
  intro_content: {
    text: string;
  } | null;
};
