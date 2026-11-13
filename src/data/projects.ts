import type {
    FeaturedProject,
    Lang,
    LocalizedFeaturedProject,
    LocalizedProjectSummary,
    ProjectSummary,
    ProjectVisual,
} from "../types";

/**
 * Single source of truth for the projects showcase.
 * Featured projects render as case studies on /[lang]/projects and as
 * compact cards on the home and lead landings; the rest render as a short list.
 */
export const featuredProjects: FeaturedProject[] = [
    {
        id: "kreds",
        title: "Kreds",
        pitch: {
            en: "Open-source, self-hostable leaderboard and internal economy for engineering teams, built on GitHub activity.",
            es: "Leaderboard y economía interna para equipos de ingeniería, open source y autoalojable, basado en la actividad de GitHub.",
        },
        problem: {
            en: "Contribution graphs reward volume and hide the work that holds a team together: the thorough review, the unblocking, the help that lets someone else ship.",
            es: "Los gráficos de contribución premian el volumen y esconden el trabajo que sostiene a un equipo: la revisión cuidadosa, el desbloqueo, la ayuda que permite que otra persona entregue.",
        },
        highlights: [
            {
                en: "Merging a pull request creates KRED; getting it reviewed costs some, paid to the reviewer. Helping someone ship beats shipping alone.",
                es: "Hacer merge de un pull request genera KRED; que te lo revisen cuesta una parte, que se paga a quien revisa. Ayudar a otros a entregar vale más que entregar solo.",
            },
            {
                en: "A double-entry ledger is the source of truth: the event pipeline and the ledger came first, and no balance is ever stored.",
                es: "Un libro contable de partida doble es la fuente de verdad: primero el pipeline de eventos y el ledger, y ningún saldo se guarda directamente.",
            },
            {
                en: "Economic rules are written down as a constitution the code must obey, so every change is checked against explicit laws.",
                es: "Las reglas económicas están escritas como una constitución que el código debe cumplir, así cada cambio se valida contra leyes explícitas.",
            },
            {
                en: "A GitHub App feeds merged PRs, reviews and closed issues as input; self-hosting runs on Docker with Postgres and Redis, with no license key.",
                es: "Una GitHub App alimenta el sistema con PRs fusionados, revisiones e issues cerrados; el autoalojamiento corre en Docker con Postgres y Redis, sin clave de licencia.",
            },
        ],
        stack: ["TypeScript", "Next.js", "NestJS", "Drizzle", "PostgreSQL", "Redis", "Docker"],
        links: [{ kind: "github", href: "https://github.com/zitdevs/kreds" }],
        status: { en: "Open source · AGPLv3", es: "Open source · AGPLv3" },
        visual: {
            kind: "image",
            src: "/projects/kreds.jpg",
            width: 1400,
            height: 800,
            alt: {
                en: "Kreds landing page presenting the leaderboard for engineering teams",
                es: "Página de inicio de Kreds presentando el leaderboard para equipos de ingeniería",
            },
        },
    },
    {
        id: "meraki",
        title: "Meraki Writings",
        pitch: {
            en: "Personal editorial platform for long-form writing and poetry, designed to be read slowly.",
            es: "Plataforma editorial personal para escritura de largo formato y poesía, pensada para leerse con calma.",
        },
        problem: {
            en: "Long-form writing and poetry need a quiet, fast reading experience that generic blog templates and social platforms do not offer.",
            es: "La escritura de largo formato y la poesía necesitan una experiencia de lectura tranquila y rápida que las plantillas de blog genéricas y las redes sociales no ofrecen.",
        },
        highlights: [
            {
                en: "Built end to end: content model, editorial workflow and front end.",
                es: "Construida de punta a punta: modelo de contenido, flujo editorial y front end.",
            },
            {
                en: "Payload CMS as the backend, so publishing never requires a deploy.",
                es: "Payload CMS como backend, para que publicar nunca requiera un despliegue.",
            },
            {
                en: "Performance and SEO treated as requirements from day one, not as a final pass.",
                es: "Rendimiento y SEO como requisitos desde el primer día, no como un ajuste final.",
            },
            {
                en: "An editorial, minimal design system with reusable UI components.",
                es: "Un sistema de diseño editorial y minimalista con componentes de UI reutilizables.",
            },
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Payload CMS"],
        links: [{ kind: "site", href: "https://meraki.isaacmartinez.dev" }],
        visual: {
            kind: "image",
            src: "/projects/meraki.jpg",
            width: 1400,
            height: 800,
            alt: {
                en: "Meraki Writings home page with its editorial, minimal layout",
                es: "Página de inicio de Meraki Writings con su diseño editorial y minimalista",
            },
        },
    },
    {
        id: "zitstack",
        title: "ZitStack",
        pitch: {
            en: "The shared platform behind ZitDevs, my studio: identity, payments, billing and invoicing as a modular monolith.",
            es: "La plataforma compartida detrás de ZitDevs, mi estudio: identidad, pagos, facturación y cobros como un monolito modular.",
        },
        problem: {
            en: "Every product the studio ships needs the same foundations. Rebuilding sign-in, billing and payments per product multiplies cost and risk.",
            es: "Cada producto del estudio necesita las mismas bases. Reconstruir el inicio de sesión, la facturación y los pagos en cada producto multiplica el costo y el riesgo.",
        },
        highlights: [
            {
                en: "ZitID gives users one identity across the whole ecosystem.",
                es: "ZitID da a los usuarios una sola identidad en todo el ecosistema.",
            },
            {
                en: "One monorepo: products are separated conceptually before they are separated physically.",
                es: "Un solo monorepo: los productos se separan conceptualmente antes de separarse físicamente.",
            },
            {
                en: "The API and the worker load the same modules, so business rules live in one place.",
                es: "La API y el worker cargan los mismos módulos, así las reglas de negocio viven en un solo lugar.",
            },
            {
                en: "Modules are added only when a product needs them, not as placeholders.",
                es: "Los módulos se agregan solo cuando un producto los necesita, no como marcadores de posición.",
            },
        ],
        stack: ["TypeScript", "NestJS", "Next.js", "Turborepo", "PostgreSQL"],
        links: [],
        status: { en: "Private · in progress", es: "Privado · en progreso" },
        visual: {
            kind: "diagram",
            label: {
                en: "ZitStack architecture: the API and worker apps load the same shared modules (identity, audit, and the planned payments, billing and invoicing), which persist to PostgreSQL.",
                es: "Arquitectura de ZitStack: las apps API y worker cargan los mismos módulos compartidos (identidad, auditoría y los planificados pagos, facturación y cobros), que persisten en PostgreSQL.",
            },
            entries: ["apps/api", "apps/worker"],
            modules: [
                { name: "identity" },
                { name: "audit" },
                { name: "payments", planned: true },
                { name: "billing", planned: true },
                { name: "invoicing", planned: true },
            ],
            store: "PostgreSQL",
        },
    },
    {
        id: "cominnek",
        title: "Cominnek",
        pitch: {
            en: "Open-source Go CLI that writes Conventional Commits linked to the Jira ticket in your branch name.",
            es: "CLI open source en Go que genera Conventional Commits vinculados al ticket de Jira del nombre de la rama.",
        },
        problem: {
            en: "At Minnek, the team's commit standard was valuable but tedious: typing the type, scope and ticket by hand led to inconsistent history.",
            es: "En Minnek, el estándar de commits del equipo era valioso pero tedioso: escribir a mano el tipo, el alcance y el ticket producía un historial inconsistente.",
        },
        highlights: [
            {
                en: "Reads the Jira ticket from the branch name, so nobody types it twice.",
                es: "Lee el ticket de Jira desde el nombre de la rama, para que nadie lo escriba dos veces.",
            },
            {
                en: "Guides the commit type and message to produce valid Conventional Commits every time.",
                es: "Guía el tipo y el mensaje del commit para producir Conventional Commits válidos siempre.",
            },
            {
                en: "Shipped as a single Go binary: fast to install and fast to run.",
                es: "Distribuido como un único binario de Go: rápido de instalar y de ejecutar.",
            },
        ],
        stack: ["Go", "Git", "CLI", "Jira"],
        links: [{ kind: "github", href: "https://github.com/Minnek-Digital-Studio/cominnek" }],
        status: { en: "Open source", es: "Open source" },
        visual: {
            kind: "terminal",
            filename: "cominnek",
            lines: [
                { type: "input", text: "git switch -c feature/APP-142-login-form" },
                { type: "input", text: "cominnek commit" },
                { type: "prompt", text: "? Type: feat" },
                { type: "prompt", text: "? Message: add login form validation" },
                { type: "output", text: "✔ feat(APP-142): add login form validation" },
            ],
        },
    },
];

export const moreProjects: ProjectSummary[] = [
    {
        title: "UnPrimer",
        summary: {
            en: "Startup platform helping entrepreneurs build brands, validate ideas and launch.",
            es: "Plataforma para emprendedores que ayuda a construir marcas, validar ideas y lanzar.",
        },
        link: { kind: "site", href: "https://www.unprimer.com/" },
    },
    {
        title: "Project Templify",
        summary: {
            en: "CLI for rapid project scaffolding and architectural standardization.",
            es: "CLI para scaffolding rápido de proyectos y estandarización arquitectónica.",
        },
        link: { kind: "npm", href: "https://www.npmjs.com/package/project-templify" },
    },
    {
        title: "MedraMart",
        summary: {
            en: "Corporate website for a surveying firm with offline support and map integration.",
            es: "Sitio corporativo para una empresa de agrimensura con soporte offline e integración de mapas.",
        },
    },
    {
        title: "DevsCut",
        summary: {
            en: "Link shortening and tracking platform with real-time analytics.",
            es: "Plataforma de acortamiento y seguimiento de enlaces con analíticas en tiempo real.",
        },
        link: { kind: "site", href: "https://devscut.com/" },
    },
    {
        title: "Project Manager CLI",
        summary: {
            en: "Automation tool that generates React component structures and configuration.",
            es: "Herramienta de automatización que genera estructuras y configuración de componentes React.",
        },
        link: { kind: "github", href: "https://github.com/isaacismaelx14/Project-Manager-CLI" },
    },
    {
        title: "Image Server",
        summary: {
            en: "Image processing server for upload, compression and retrieval.",
            es: "Servidor de procesamiento de imágenes para carga, compresión y recuperación.",
        },
        link: { kind: "github", href: "https://github.com/isaacismaelx14/image-server" },
    },
];

function localizeVisual(visual: ProjectVisual, lang: Lang): ProjectVisual<string> {
    switch (visual.kind) {
        case "image":
            return { ...visual, alt: visual.alt[lang] };
        case "diagram":
            return { ...visual, label: visual.label[lang] };
        case "terminal":
            return visual;
    }
}

export function getFeaturedProjects(lang: Lang): LocalizedFeaturedProject[] {
    return featuredProjects.map((project) => ({
        id: project.id,
        title: project.title,
        pitch: project.pitch[lang],
        problem: project.problem[lang],
        highlights: project.highlights.map((item) => item[lang]),
        stack: project.stack,
        links: project.links,
        status: project.status?.[lang],
        visual: localizeVisual(project.visual, lang),
    }));
}

export function getMoreProjects(lang: Lang): LocalizedProjectSummary[] {
    return moreProjects.map((project) => ({
        title: project.title,
        summary: project.summary[lang],
        link: project.link,
    }));
}
