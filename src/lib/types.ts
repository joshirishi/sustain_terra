export type Stat = {
  id: string;
  headline: string;
  figure: string;
  body: string;
  source: string | null;
  sort_order: number;
};

export type CoreValue = {
  id: string;
  name: string;
  tagline: string;
  body: string;
  icon: string;
  sort_order: number;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  icon: string;
  sort_order: number;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  modules: string[];
  audience: string;
  level: string;
  duration: string | null;
  sort_order: number;
  is_active: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  prior_orgs: string[];
  photo_url?: string | null;
  linkedin_url?: string | null;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  title: string | null;
  quote: string;
  sort_order: number;
};

export type Differentiator = {
  id: string;
  title: string;
  body: string;
  icon: string;
  sort_order: number;
};

export type Policy = {
  id: string;
  slug: string;
  title: string;
  body_md: string;
  effective_date: string | null;
  scope: string | null;
};

export type PolicyFaq = {
  id: string;
  policy_slug: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type Content = {
  stats: Stat[];
  core_values: CoreValue[];
  services: Service[];
  programs: Program[];
  team_members: TeamMember[];
  testimonials: Testimonial[];
  differentiators: Differentiator[];
  policies: Policy[];
  policy_faqs: PolicyFaq[];
};
