/**
 * Narrative content: case studies, principles, trajectory and stack summary.
 *
 * Single source of truth for both landings (`/[lang]/` and `/[lang]/lead`).
 * Landings never duplicate this copy; they only select and order it through
 * the `landings` config at the bottom of this file.
 */
import type {
    Lang,
    Localized,
    CaseStudy,
    LocalizedCaseStudy,
    Principle,
    LocalizedPrinciple,
    TrajectoryStep,
    LocalizedTrajectoryStep,
    StackGroup,
    LocalizedStackGroup,
} from "../types";

export type CaseStudyId =
    | "canva"
    | "backfill"
    | "delivery"
    | "devex"
    | "teamProcess"
    | "minnekLead";

export type LandingVariant = "ic" | "lead";

const caseStudies: Record<CaseStudyId, CaseStudy> = {
    canva: {
        company: "SERHANT · S.MPLE",
        title: {
            en: "Canva Connect integration, owned end to end",
            es: "Integración con Canva Connect, de punta a punta",
        },
        problem: {
            en: "AI-generated social posts depended on a previous design provider that had to be replaced without breaking the experience for agents.",
            es: "Los posts para redes sociales generados con IA dependían de un proveedor de diseño anterior que había que reemplazar sin afectar la experiencia de los agentes.",
        },
        decision: {
            en: "I built the Canva Connect integration from OAuth through the Autofill API: a payload assembled from agent and MLS listing data, submit and poll, export, and write-back. I then refactored it into a reusable shared Canva driver, later reused for listing flyers and show sheets with PDF export and generated headlines and descriptions.",
            es: "Construí la integración con Canva Connect desde OAuth hasta la Autofill API: un payload armado con datos del agente y del listado MLS, envío y polling, exportación y escritura del resultado. Luego la refactoricé en un driver de Canva compartido y reutilizable, que después se usó para flyers de propiedades y show sheets con exportación a PDF y titulares y descripciones generados.",
        },
        outcome: {
            en: "Hardening started from root causes: OAuth tokens were collapsing across clients, so I scoped them per client and serialized token refresh across API instances to remove a race. Routing by template capability, recording which renderer ran, and deduplicating retried runs made the pipeline predictable.",
            es: "El endurecimiento partió de las causas raíz: los tokens OAuth se mezclaban entre clientes, así que los aislé por cliente y serialicé el refresco de tokens entre instancias de la API para eliminar una condición de carrera. El enrutamiento por capacidad de plantilla, el registro de qué renderizador se ejecutó y la deduplicación de ejecuciones reintentadas hicieron el flujo predecible.",
        },
        tags: ["OAuth", "Canva Connect", "Node.js", "Hono", "PostgreSQL"],
    },
    backfill: {
        company: "SERHANT · S.MPLE",
        title: {
            en: "A safe production backfill",
            es: "Un backfill seguro en producción",
        },
        problem: {
            en: "Task titles in production had been mislabeled, and the first dry run proposed thousands of renames, far more than the underlying bugs could have caused.",
            es: "Había títulos de tareas mal etiquetados en producción, y el primer dry run proponía miles de renombres, muchos más de los que los bugs originales podían haber causado.",
        },
        decision: {
            en: "I added invariants (a rename may change the type noun, never the address) and scoped the set to what the bugs could actually reach, cutting it by roughly 4x. Dry run became the default, so nothing writes without --apply, backed by a 5-row canary, a date floor and a verified rollback; a full pass went from about 30 minutes to about 7.5.",
            es: "Agregué invariantes (un renombre puede cambiar el sustantivo del tipo, nunca la dirección) y limité el conjunto a lo que los bugs realmente podían alcanzar, reduciéndolo unas 4 veces. El dry run pasó a ser el comportamiento por defecto, de modo que nada se escribe sin --apply, respaldado por un canario de 5 filas, una fecha mínima y un rollback verificado; una pasada completa bajó de unos 30 minutos a unos 7,5.",
        },
        outcome: {
            en: "The production run scanned tens of thousands of rows and updated a few thousand, with zero failures. When review showed one of my claims was wrong, I corrected it publicly; I treat that as part of the job, not a flaw in it.",
            es: "La ejecución en producción revisó decenas de miles de filas y actualizó unos pocos miles, sin ningún fallo. Cuando una revisión mostró que una de mis afirmaciones era incorrecta, la corregí públicamente; lo considero parte del trabajo, no una falla.",
        },
        tags: ["PostgreSQL", "TypeScript", "Data migration", "Production safety"],
    },
    delivery: {
        company: "SERHANT · S.MPLE",
        title: {
            en: "Automatic delivery of AI-generated content",
            es: "Entrega automática de contenido generado con IA",
        },
        problem: {
            en: "AI-generated content had to reach agents reliably, and runs that failed or finished without delivering could not be allowed to fail silently.",
            es: "El contenido generado con IA tenía que llegar a los agentes de forma confiable, y las ejecuciones que fallaban o terminaban sin entregar no podían fallar en silencio.",
        },
        decision: {
            en: "I built fast-path routing and automatic delivery, retries for transient failures, and a hand-off to a human advisor on hard failures, plus a retry endpoint with one-click retry in the advisor dashboard.",
            es: "Construí enrutamiento por vía rápida y entrega automática, reintentos para fallos transitorios y traspaso a un asesor humano ante fallos definitivos, además de un endpoint de reintento con reintento en un clic desde el dashboard de asesores.",
        },
        outcome: {
            en: "Satisfaction (CSAT) capture closes the loop with agents, and a reconciliation sweep every 30 minutes catches runs that finished without delivering. The sweep shipped in dry-run mode first, so its behavior was observable before it could act.",
            es: "La captura de satisfacción (CSAT) cierra el ciclo con los agentes, y un barrido de reconciliación cada 30 minutos detecta ejecuciones que terminaron sin entregar. El barrido salió primero en modo dry run, para observar su comportamiento antes de que pudiera actuar.",
        },
        tags: ["Inngest", "Mastra", "Next.js", "Node.js"],
    },
    devex: {
        company: "SERHANT · S.MPLE",
        title: {
            en: "Developer experience as a product",
            es: "La experiencia de desarrollo como producto",
        },
        problem: {
            en: "Setting up the project locally meant many manual steps, and CI type-checking was failing with out-of-memory errors.",
            es: "Configurar el proyecto localmente requería muchos pasos manuales, y el type-checking en CI fallaba por falta de memoria.",
        },
        decision: {
            en: "I shipped a one-command local bootstrap with a doctor check, explanations of where each environment variable comes from, secret-manager overrides and automatic installs, as about a dozen small PRs with the full test suite green at every step. I also moved CI type-checking to TypeScript 7.",
            es: "Entregué un bootstrap local de un solo comando con un chequeo tipo doctor, explicaciones del origen de cada variable de entorno, overrides desde el gestor de secretos e instalaciones automáticas, en alrededor de una docena de PRs pequeños con toda la suite de pruebas en verde en cada paso. También migré el type-checking de CI a TypeScript 7.",
        },
        outcome: {
            en: "Local setup went from a checklist to a single command, and the out-of-memory type-check failures in CI were resolved.",
            es: "La configuración local pasó de ser una lista de pasos a un solo comando, y se resolvieron los fallos de memoria del type-checking en CI.",
        },
        tags: ["Developer experience", "CI", "TypeScript", "Tooling"],
    },
    teamProcess: {
        company: "SERHANT · S.MPLE",
        title: {
            en: "Improving how the team ships",
            es: "Mejorar cómo entrega el equipo",
        },
        problem: {
            en: "Web, mobile and API work ship on different rhythms, and the release process needed to reflect that instead of forcing one model on everything.",
            es: "El trabajo web, móvil y de API se entrega a ritmos distintos, y el proceso de releases necesitaba reflejarlo en lugar de imponer un único modelo.",
        },
        decision: {
            en: "I review PRs across the web and mobile teams, and I authored a release strategy proposal: GitHub Flow for web, trunk-based development with feature flags for APIs, main/next for mobile, plus project owners and release metrics.",
            es: "Reviso PRs de los equipos web y móvil, y redacté una propuesta de estrategia de releases: GitHub Flow para web, desarrollo trunk-based con feature flags para APIs, main/next para móvil, además de responsables por proyecto y métricas de release.",
        },
        outcome: {
            en: "Beyond process, I shipped cross-platform analytics identity, one profile per user across iOS, Android, the PWA and the dashboard, and Open House Sign In, a mobile quick action and wizard shown to save agents about 10 minutes.",
            es: "Más allá del proceso, entregué identidad de analítica multiplataforma, un perfil por usuario entre iOS, Android, la PWA y el dashboard, y Open House Sign In, una acción rápida móvil con asistente que demostró ahorrar unos 10 minutos a los agentes.",
        },
        tags: ["Code review", "Release strategy", "PostHog", "React Native (Expo)"],
    },
    minnekLead: {
        company: "Minnek Digital Studio",
        title: {
            en: "Leading a team of three",
            es: "Liderar un equipo de tres",
        },
        problem: {
            en: "Client e-commerce work ran at real scale, with stores of 20k+ products and thousands of automated events a day, and needed consistency across engineers and projects.",
            es: "El trabajo de e-commerce para clientes operaba a escala real, con tiendas de más de 20 mil productos y miles de eventos automatizados al día, y necesitaba consistencia entre ingenieros y proyectos.",
        },
        decision: {
            en: "As Team Lead I led three engineers, focused the team on performance and maintainability for clients including Your Store Wizards, and built Cominnek, a Go CLI that writes conventional commits linked to Jira from the branch name.",
            es: "Como Team Lead dirigí a tres ingenieros, enfoqué al equipo en rendimiento y mantenibilidad para clientes como Your Store Wizards, y construí Cominnek, un CLI en Go que genera commits convencionales vinculados a Jira a partir del nombre de la rama.",
        },
        outcome: {
            en: "The team delivered significant performance and maintainability improvements for those clients, and Cominnek made a consistent commit history the default instead of a rule to remember.",
            es: "El equipo logró mejoras significativas de rendimiento y mantenibilidad para esos clientes, y Cominnek convirtió un historial de commits consistente en el comportamiento por defecto, no en una regla que recordar.",
        },
        tags: ["Team leadership", "Go", "BigCommerce", "Next.js"],
    },
};

const principles: Principle[] = [
    {
        quote: {
            en: "Delete the framework. Does the domain still compile?",
            es: "Borra el framework. ¿El dominio sigue compilando?",
        },
        explanation: {
            en: "Clean, Hexagonal and Screaming Architecture: the domain owns its ports, and folders are named after what the app does, not the tools it uses.",
            es: "Arquitectura Limpia, Hexagonal y Screaming: el dominio define sus puertos, y las carpetas se nombran por lo que hace la aplicación, no por las herramientas que usa.",
        },
    },
    {
        quote: {
            en: "Modular monolith before microservices.",
            es: "Monolito modular antes que microservicios.",
        },
        explanation: {
            en: "Separate products conceptually before separating them physically. Boundaries earn their network hop.",
            es: "Separa los productos conceptualmente antes de separarlos físicamente. Un límite debe justificar su salto de red.",
        },
    },
    {
        quote: {
            en: "Coverage measures lines executed, not behaviors verified.",
            es: "La cobertura mide líneas ejecutadas, no comportamientos verificados.",
        },
        explanation: {
            en: "I test behavior, not implementation, and I don't chase coverage targets.",
            es: "Pruebo comportamiento, no implementación, y no persigo metas de cobertura.",
        },
    },
    {
        quote: {
            en: "With LLMs, determinism comes from structure, not wording.",
            es: "Con LLMs, el determinismo viene de la estructura, no de la redacción.",
        },
        explanation: {
            en: "Workflows, tool boundaries and output gates move the guarantee to a place where a growing context can't erode it.",
            es: "Los workflows, los límites de herramientas y las validaciones de salida llevan la garantía a un lugar donde un contexto creciente no puede erosionarla.",
        },
    },
    {
        quote: {
            en: "Production safety is a default, not a phase.",
            es: "La seguridad en producción es un valor por defecto, no una fase.",
        },
        explanation: {
            en: "Dry run first, canaries, and writes that can be recovered from.",
            es: "Primero dry run, canarios y escrituras de las que se puede recuperar.",
        },
    },
    {
        quote: {
            en: "Review intent before the diff.",
            es: "Revisa la intención antes que el diff.",
        },
        explanation: {
            en: "I read the ticket's intent first, and I frame feedback as suggestions unless something is critical.",
            es: "Primero leo la intención del ticket, y planteo mis comentarios como sugerencias salvo que algo sea crítico.",
        },
    },
    {
        quote: {
            en: "Verify claims; retract mistakes in public.",
            es: "Verifica las afirmaciones; corrige los errores en público.",
        },
        explanation: {
            en: "Trust in a team is built on corrections as much as on being right.",
            es: "La confianza en un equipo se construye tanto con las correcciones como con los aciertos.",
        },
    },
];

const trajectory: TrajectoryStep[] = [
    {
        period: "2020 – 2021",
        organization: { en: "Freelance", es: "Independiente" },
        headline: {
            en: "Learning to ship for real clients",
            es: "Aprender a entregar para clientes reales",
        },
        narrative: {
            en: "Landing pages and small applications, working directly with clients to turn requirements into delivered software.",
            es: "Landing pages y aplicaciones pequeñas, trabajando directamente con clientes para convertir requisitos en software entregado.",
        },
    },
    {
        period: "2022 – 2024",
        organization: { en: "Minnek Digital Studio", es: "Minnek Digital Studio" },
        headline: {
            en: "Tooling, scale and a first team",
            es: "Herramientas, escala y un primer equipo",
        },
        narrative: {
            en: "E-commerce with 20k+ products and thousands of automated events a day. Built Cominnek, then grew from Full Stack Engineer to Team Lead of three.",
            es: "E-commerce con más de 20 mil productos y miles de eventos automatizados al día. Construí Cominnek y pasé de Full Stack Engineer a Team Lead de un equipo de tres.",
        },
    },
    {
        period: "2024 – 2025",
        organization: { en: "VPM Solutions", es: "VPM Solutions" },
        headline: {
            en: "Real-estate systems",
            es: "Sistemas para bienes raíces",
        },
        narrative: {
            en: "Improved candidate search ranking, built reports and dashboards for owners, and admin tools for Admin, Support and Marketing.",
            es: "Mejoré el ranking de búsqueda de candidatos, construí reportes y dashboards para los dueños, y herramientas de administración para Admin, Soporte y Marketing.",
        },
    },
    {
        period: "2025 – 2026",
        organization: { en: "WGSN", es: "WGSN" },
        headline: {
            en: "AI and data-driven systems",
            es: "IA y sistemas basados en datos",
        },
        narrative: {
            en: "Maintained and optimized a predictive model producing forecasts from business reports, and built an AWS Lambda service with WebSocket streaming for real-time chatbot responses.",
            es: "Mantuve y optimicé un modelo predictivo que genera pronósticos a partir de reportes de negocio, y construí un servicio en AWS Lambda con streaming por WebSocket para respuestas de chatbot en tiempo real.",
        },
    },
    {
        period: { en: "2026 – Present", es: "2026 – Presente" },
        current: true,
        organization: { en: "SERHANT", es: "SERHANT" },
        headline: {
            en: "Taking features end to end",
            es: "Features de punta a punta",
        },
        narrative: {
            en: "End to end on S.MPLE, an AI platform for real estate agents: iOS and Android (Expo), the agent PWA, the advisor dashboard and the core API.",
            es: "De punta a punta en S.MPLE, una plataforma de IA para agentes inmobiliarios: iOS y Android (Expo), la PWA de agentes, el dashboard de asesores y la API principal.",
        },
    },
    {
        period: { en: "In parallel", es: "En paralelo" },
        parallel: true,
        organization: { en: "ZitDevs", es: "ZitDevs" },
        headline: {
            en: "Building my own products",
            es: "Construir mis propios productos",
        },
        narrative: {
            en: "My studio: ZitStack as the shared platform, and products like Kreds and Fiestik built on top of it.",
            es: "Mi estudio: ZitStack como plataforma compartida, y productos como Kreds y Fiestik construidos sobre ella.",
        },
    },
];

const stackGroups: StackGroup[] = [
    {
        label: { en: "Frontend & mobile", es: "Frontend y móvil" },
        items: ["TypeScript", "React", "React Native (Expo)", "Next.js", "SvelteKit", "Vue", "Tailwind"],
    },
    {
        label: { en: "Backend & data", es: "Backend y datos" },
        items: ["Node.js", "Hono", "Express", "NestJS", "PostgreSQL", "Supabase", "MongoDB"],
    },
    {
        label: { en: "AI & platform", es: "IA y plataforma" },
        items: ["Inngest", "Mastra", "Python", "AWS Lambda", "Vercel", "Docker", "PostHog"],
    },
];

/** Which content each landing shows, and in what order. Copy itself lives above. */
export const landings: Record<LandingVariant, { caseStudies: CaseStudyId[] }> = {
    ic: { caseStudies: ["canva", "backfill", "delivery", "devex"] },
    lead: { caseStudies: ["teamProcess", "devex", "minnekLead", "backfill"] },
};

function pick(value: Localized | string, lang: Lang): string {
    return typeof value === "string" ? value : value[lang];
}

export function getCaseStudies(ids: CaseStudyId[], lang: Lang): LocalizedCaseStudy[] {
    return ids.map((id) => {
        const study = caseStudies[id];
        return {
            id,
            company: study.company,
            title: study.title[lang],
            problem: study.problem[lang],
            decision: study.decision[lang],
            outcome: study.outcome[lang],
            tags: study.tags,
        };
    });
}

export function getPrinciples(lang: Lang): LocalizedPrinciple[] {
    return principles.map((principle) => ({
        quote: principle.quote[lang],
        explanation: principle.explanation[lang],
    }));
}

export function getTrajectory(lang: Lang): LocalizedTrajectoryStep[] {
    return trajectory.map((step) => ({
        period: pick(step.period, lang),
        organization: step.organization[lang],
        headline: step.headline[lang],
        narrative: step.narrative[lang],
        current: step.current ?? false,
        parallel: step.parallel ?? false,
    }));
}

export function getStackGroups(lang: Lang): LocalizedStackGroup[] {
    return stackGroups.map((group) => ({
        label: group.label[lang],
        items: group.items,
    }));
}
