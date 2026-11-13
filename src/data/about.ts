import type { Experience, Education, Skill, Language, Lang } from "../types";

type TranslationFn = (key: string) => string;

export function getExperience(t: TranslationFn): Experience[] {
    return [
        {
            year: `Mar 2026 - ${t("about.present")}`,
            title: t("about.experienceList.serhant.title"),
            company: `${t("about.experienceList.serhant.company")} · ${t("about.fullTime")} · ${t("about.experienceList.serhant.location")}`,
            description: t("about.experienceList.serhant.description"),
            highlights: [
                t("about.experienceList.serhant.highlights.canva"),
                t("about.experienceList.serhant.highlights.delivery"),
                t("about.experienceList.serhant.highlights.backfill"),
                t("about.experienceList.serhant.highlights.dx"),
            ],
            skills: ["TypeScript", "React Native (Expo)", "Next.js", "Node.js", "PostgreSQL", "SvelteKit", "React Query", "Tailwind", "Hono", "Supabase", "Inngest", "Mastra", "Vercel", "PostHog"],
        },
        {
            year: "Jun 2025 - Feb 2026",
            title: t("about.experienceList.wgsn.title"),
            company: `${t("about.experienceList.wgsn.company")} · ${t("about.fullTime")} · ${t("about.experienceList.wgsn.location")}`,
            description: t("about.experienceList.wgsn.description"),
            skills: ["Python", "TypeScript", "React", "Next.js", "AWS Lambda", "Express", "MongoDB"],
        },
        {
            year: "Apr 2024 - May 2025",
            title: t("about.experienceList.vpm.title"),
            company: `${t("about.experienceList.vpm.company")} · ${t("about.fullTime")} · ${t("about.experienceList.vpm.location")}`,
            description: t("about.experienceList.vpm.description"),
            skills: ["Vue.js", "TypeScript", "Express.js", "MySQL", "AWS EC2", "Docker"],
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
            year: "2021 - 2023",
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
            year: "2022",
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
    { name: "Node.js" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Next.js" },
    { name: "AWS" },
    { name: "Vue.js" },
    { name: "React Native" },
    { name: "Python" },
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
            en: "Meet Isaac Martinez - Full-Stack Software Engineer at SERHANT with 5+ years building production systems end to end in TypeScript, React, React Native, Node.js and AI. Experience, skills and education.",
            es: "Conoce a Isaac Martinez - Ingeniero de Software Full-Stack en SERHANT con más de 5 años construyendo sistemas en producción de punta a punta con TypeScript, React, React Native, Node.js e IA. Experiencia, habilidades y educación."
        },
        projects: {
            en: "Explore Isaac Martinez's projects - Real-world solutions shipped end-to-end, focused on performance, scalability, and maintainable code.",
            es: "Explora los proyectos de Isaac Martinez - Soluciones reales entregadas de punta a punta, enfocadas en performance, escalabilidad y código mantenible."
        },
        contact: {
            en: "Contact Isaac Martinez for full-stack development, consulting, or collaboration. Available for full-time roles or contract work.",
            es: "Contacta a Isaac Martinez para desarrollo full stack, consultoría o colaboración. Disponible para roles full-time o trabajo por contrato."
        },
        home: {
            en: "Isaac Martinez - Full-Stack Software Engineer at SERHANT who takes features from the problem to a safe production run, and cares about clean architecture, honest tests and safe releases. Case studies, trajectory and principles. Available for hire.",
            es: "Isaac Martinez - Ingeniero de Software Full-Stack en SERHANT que lleva features del problema a producción de forma segura, y al que le importan la arquitectura limpia, los tests honestos y los releases seguros. Casos de estudio, trayectoria y principios. Disponible para contratación."
        },
        lead: {
            en: "Isaac Martinez - Full-Stack Software Engineer ready to lead, with evidence: team process, developer experience, a team led at Minnek, and production judgment.",
            es: "Isaac Martinez - Ingeniero de Software Full-Stack listo para liderar, con evidencia: proceso de equipo, experiencia de desarrollo, un equipo liderado en Minnek y criterio en producción."
        }
    };

  return descriptions[page]?.[lang] ?? descriptions[page]?.en ?? "";
}
