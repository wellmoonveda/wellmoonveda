export interface HealingPathVideo {
  slug: string;
  title: string;
  shortDescription: string;
  videoSrc: string;

  intro: string;
  dos: string[];
  donts: string[];
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
};
