export type Lang = "en" | "es";

export interface Position {
    year: string;
    title: string;
    description: string;
}

export interface Experience {
    year: string;
    title: string;
    company: string;
    description: string;
    skills?: string[];
    isGrouped?: boolean;
    positions?: Position[];
}

export interface Education {
    year: string;
    title: string;
    company: string;
    description: string;
}

export interface Skill {
    name: string;
    years?: string;
}

export interface Language {
    name: string;
    level: string;
    flag: string;
}

export type Localized = { en: string; es: string };

/** Where an external project link points; drives its visible label. */
export type ProjectLinkKind = "github" | "site" | "npm";

export interface ProjectLink {
    kind: ProjectLinkKind;
    href: string;
}

/** How a featured project is pictured: a real screenshot, a diagram or a terminal snippet. */
export type ProjectVisual<T = Localized> =
    | { kind: "image"; src: string; width: number; height: number; alt: T }
    | {
          kind: "diagram";
          label: T;
          entries: string[];
          modules: { name: string; planned?: boolean }[];
          store: string;
      }
    | { kind: "terminal"; filename: string; lines: { type: "input" | "prompt" | "output"; text: string }[] };

export interface FeaturedProject {
    id: string;
    title: string;
    pitch: Localized;
    problem: Localized;
    highlights: Localized[];
    stack: string[];
    links: ProjectLink[];
    /** Shown instead of (or next to) links, e.g. for private repositories. */
    status?: Localized;
    visual: ProjectVisual;
}

export interface LocalizedFeaturedProject {
    id: string;
    title: string;
    pitch: string;
    problem: string;
    highlights: string[];
    stack: string[];
    links: ProjectLink[];
    status?: string;
    visual: ProjectVisual<string>;
}

export interface ProjectSummary {
    title: string;
    summary: Localized;
    link?: ProjectLink;
}

export interface LocalizedProjectSummary {
    title: string;
    summary: string;
    link?: ProjectLink;
}


export interface CaseStudy {
    company: string;
    title: Localized;
    problem: Localized;
    decision: Localized;
    outcome: Localized;
    tags: string[];
}

export interface LocalizedCaseStudy {
    id: string;
    company: string;
    title: string;
    problem: string;
    decision: string;
    outcome: string;
    tags: string[];
}

export interface Principle {
    quote: Localized;
    explanation: Localized;
}

export interface LocalizedPrinciple {
    quote: string;
    explanation: string;
}

export interface TrajectoryStep {
    period: Localized | string;
    organization: Localized;
    headline: Localized;
    narrative: Localized;
    current?: boolean;
    parallel?: boolean;
}

export interface LocalizedTrajectoryStep {
    period: string;
    organization: string;
    headline: string;
    narrative: string;
    current: boolean;
    parallel: boolean;
}

export interface StackGroup {
    label: Localized;
    items: string[];
}

export interface LocalizedStackGroup {
    label: string;
    items: string[];
}
