export type Lang = 'id' | 'en';

export type Localized = { id: string; en: string };

export type Project = {
  id: string;
  number: string;
  name: string;
  kind: Localized;
  year: number;
  role: Localized;
  tagline: Localized;
  problem: Localized;
  solution: Localized;
  highlight: Localized;
  contribution: Localized;
  flow: Localized[];
  evidence: Localized;
  evidenceLink: string;
  stack: string[];
  image: string;
  imageAlt: Localized;
  link: string;
};

export type OtherProject = {
  name: string;
  description: Localized;
  stack: string[];
  link: string;
};

export type TimelineItem = {
  period: Localized;
  title: Localized;
  role: Localized;
  text?: Localized;
  details?: Localized[];
  points?: Localized[]; // bulleted achievements, all of equal weight
};

export type Certification = {
  name: string; // always in English
  issuer: string;
  date: Localized;
  description?: Localized;
  verifyUrl?: string;
};

// Google Skills completion badges, grouped by theme. The verify link is built from badgeId.
export type CloudCourse = {
  name: string; // always in English
  date: Localized;
  badgeId: string;
};

export type CloudCourseGroup = {
  name: string; // always in English
  courses: CloudCourse[];
};

export type SkillGroup = {
  name: Localized;
  description: Localized;
  items: string[];
};

export type Fact = {
  value: Localized;
  label: Localized;
};

export type SectionHead = {
  id: string;
  label: Localized;
  title: Localized;
  purpose: Localized;
};

export type Profile = {
  name: string;
  photo: string;
  cv: Localized; // file path per language
  location: string;
  hero: {
    greeting: Localized;
    role: string;
    intro: Localized;
    openTo: Localized;
  };
  about: {
    paragraphs: Localized[];
    cardRole: string;
    facts: Fact[];
    focus: string[];
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    instagram: string;
    note: Localized;
  };
};
