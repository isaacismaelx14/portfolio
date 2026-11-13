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

export interface Project {
    title: string;
    description: { en: string; es: string };
    impact: { en: string; es: string };
    tags: string[];
    link: string;
    image: string;
    featured: boolean;
}

export interface LocalizedProject {
    title: string;
    description: string;
    impact: string;
    tags: string[];
    link: string;
    image: string;
    featured: boolean;
}

export type Localized = { en: string; es: string };

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
