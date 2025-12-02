import type { Experience, Education, Skill, Language, Lang } from "../types";

type TranslationFn = (key: string) => string;

export function getExperience(t: TranslationFn): Experience[] {
    return [
        {
            year: `Jun 2025 - ${t("about.present")}`,
            title: t("about.experienceList.wgsn.title"),
            company: `${t("about.experienceList.wgsn.company")} · ${t("about.fullTime")} · ${t("about.remote")}`,
            description: t("about.experienceList.wgsn.description"),
            skills: ["Software Architecture", "React", "AWS", "TypeScript"],
        },
        {
            year: `Oct 2023 - ${t("about.present")}`,
            title: t("about.experienceList.zitdevs.title"),
            company: `${t("about.experienceList.zitdevs.company")} · ${t("about.partTime")} · ${t("about.remote")}`,
            description: t("about.experienceList.zitdevs.description"),
            skills: ["Leadership", "Product Strategy", "Team Building"],
        },
        {
            year: "Apr 2024 - May 2025",
            title: t("about.experienceList.vpm.title"),
            company: `${t("about.experienceList.vpm.company")} · ${t("about.fullTime")} · ${t("about.remote")}`,
            description: t("about.experienceList.vpm.description"),
            skills: ["Vue.js", "Express.js", "MySQL", "GraphQL", "Full-Stack Development"],
        },
        {
            year: "Apr 2022 - Apr 2024",
            title: t("about.experienceList.minnek.title"),
            company: `${t("about.experienceList.minnek.company")} · ${t("about.fullTime")}`,
            description: t("about.experienceList.minnek.description"),
            isGrouped: true,
            positions: [
                {
                    year: "Oct 2023 - Apr 2024",
                    title: t("about.experienceList.minnek.positions.lead.title"),
                    description: t("about.experienceList.minnek.positions.lead.description"),
                },
                {
                    year: "Jul 2023 - Dec 2023",
                    title: t("about.experienceList.minnek.positions.mid.title"),
                    description: t("about.experienceList.minnek.positions.mid.description"),
                },
                {
                    year: "Apr 2022 - Jul 2023",
                    title: t("about.experienceList.minnek.positions.junior.title"),
                    description: t("about.experienceList.minnek.positions.junior.description"),
                },
            ],
            skills: ["Next.js", "NestJS", "TypeScript", "Go", "BigCommerce", "Vue.js", "Team Leadership"],
        },
        {
            year: "Apr 2022 - Jul 2023",
            title: t("about.experienceList.ysw.title"),
            company: `${t("about.experienceList.ysw.company")} · ${t("about.fullTime")} · ${t("about.remote")}`,
            description: t("about.experienceList.ysw.description"),
            skills: ["HTML5", "JavaScript", "BigCommerce", "SASS", "SQL"],
        },
        {
            year: "Aug 2020 - Mar 2021",
            title: t("about.experienceList.selfEmployed.title"),
            company: t("about.experienceList.selfEmployed.company"),
            description: t("about.experienceList.selfEmployed.description"),
            skills: ["Front-End Development", "JavaScript", "HTML", "CSS"],
        },
    ];
}

export function getEducation(t: TranslationFn): Education[] {
    return [
        {
            year: `2026 (${t("about.expected")})`,
            title: t("about.educationList.uapa.title"),
            company: t("about.educationList.uapa.company"),
            description: t("about.educationList.uapa.description"),
        },
        {
            year: "2022",
            title: t("about.educationList.platzi.title"),
            company: t("about.educationList.platzi.company"),
            description: "",
        },
        {
            year: "2021",
            title: t("about.educationList.itla.title"),
            company: t("about.educationList.itla.company"),
            description: "",
        },
        {
            year: "2020",
            title: t("about.educationList.politecnico.title"),
            company: t("about.educationList.politecnico.company"),
            description: "",
        },
        {
            year: "2016 - 2021",
            title: t("about.educationList.iui.title"),
            company: t("about.educationList.iui.company"),
            description: "",
        },
    ];
}

export const skills: Skill[] = [
    { name: "Node.js", years: "+9y" },
    { name: "TypeScript", years: "+7y" },
    { name: "React", years: "+6y" },
    { name: "Next.js", years: "+5y" },
    { name: "AWS", years: "+4y" },
    { name: "Vue.js", years: "+3y" },
    { name: "NestJS" },
    { name: "Express.js" },
    { name: "GraphQL" },
    { name: "Go" },
    { name: "PostgreSQL" },
    { name: "MySQL" },
    { name: "MongoDB" },
    { name: "Docker" },
    { name: "BigCommerce" },
    { name: "Tailwind CSS" },
];

export function getLanguages(t: TranslationFn): Language[] {
    return [
        { 
            name: t("about.languagesList.spanish.name"), 
            level: t("about.languagesList.spanish.level"), 
            flag: "🇩🇴" 
        },
        { 
            name: t("about.languagesList.english.name"), 
            level: t("about.languagesList.english.level"), 
            flag: "🇺🇸" 
        },
    ];
}

export const contactInfo = {
    name: "Isaac Martinez",
    email: "me@isaacmartinez.dev",
    phone: "+1 (829) 348-5948",
    location: "Santiago, Dominican Republic",
    website: "isaacmartinez.dev",
    linkedin: "linkedin.com/in/isaacismaelx14",
    github: "github.com/isaacismaelx14",
};

export function getPageDescription(page: string, lang: Lang): string {
    const descriptions: Record<string, Record<Lang, string>> = {
        about: {
            en: "Meet Isaac Martinez - Software Architect with 9+ years of experience in Node.js, TypeScript, AWS, and AI. View my experience, skills, and education.",
            es: "Conoce a Isaac Martinez - Arquitecto de Software con más de 9 años de experiencia en Node.js, TypeScript, AWS e IA. Revisa mi experiencia, habilidades y educación.",
        },
        projects: {
            en: "Explore Isaac Martinez's projects - From analytics platforms to CLI tools. Real-world solutions showcasing scalability and clean architecture.",
            es: "Explora los proyectos de Isaac Martinez - Desde plataformas de analíticas hasta herramientas CLI. Soluciones reales demostrando escalabilidad y arquitectura limpia.",
        },
        contact: {
            en: "Contact Isaac Martinez for software development projects, consulting, or collaboration. Available for full-time roles or contract work.",
            es: "Contacta a Isaac Martinez para proyectos de desarrollo de software, consultoría o colaboración. Disponible para roles full-time o trabajo por contrato.",
        },
        home: {
            en: "Isaac Martinez - Software Architect with 9+ years of experience. Specialized in Node.js, TypeScript, AWS, and AI integration. Available for hire.",
            es: "Isaac Martinez - Arquitecto de Software con +9 años de experiencia. Especializado en Node.js, TypeScript, AWS e integración de IA. Disponible para contratación.",
        },
    };
    
    return descriptions[page]?.[lang] ?? descriptions[page]?.en ?? "";
}
