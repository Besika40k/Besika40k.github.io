import type { BrandIconName } from '@/lib/brandIcons';

export type Locale = 'en' | 'ka';

/** Text in every supported language. */
export type Localized = Record<Locale, string>;

/** Year-month, e.g. "2025-10". */
export type YearMonth = `${number}-${number}`;

export interface Experience {
  id: string;
  role: Localized;
  org: Localized;
  place: Localized;
  start: YearMonth;
  /** null = current position */
  end: YearMonth | null;
  points: Localized[];
}

export type ProjectCategory = 'frontend' | 'ml' | 'backend' | 'misc';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year?: string;
  summary: Localized;
  overview?: Localized;
  role?: Localized;
  highlights?: Localized[];
  stack: string[];
  repo?: string;
  demo?: string;
  /** Code isn't public (shown instead of a repo link). */
  closedSource?: boolean;
  /** Shown in the left column's pinned list. */
  pinned?: boolean;
  /** simple-icons key used as the pinned thumbnail, e.g. "siNextdotjs". */
  icon?: BrandIconName;
  /** Image under /public, e.g. "/projects/bandersnatch.png". */
  image?: string;
  /** Stand-in entry waiting for real content. */
  placeholder?: boolean;
}

export interface Education {
  id: string;
  title: Localized;
  org: Localized;
  start?: YearMonth;
  end?: YearMonth | null;
}

export interface SkillGroup {
  id: string;
  label: Localized;
  items: string[];
}

export interface SpokenLanguage {
  name: Localized;
  level: Localized;
}

export interface Achievement {
  id: string;
  title: Localized;
  detail: Localized;
  date?: YearMonth;
  placeholder?: boolean;
}
