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
