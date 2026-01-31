import type { Project, LocalizedProject, Lang } from "../types";

export function getLocalizedProjects(lang: Lang): LocalizedProject[] {
    return projects.map(project => ({
        title: project.title,
        description: project.description[lang],
        impact: project.impact[lang],
        tags: project.tags,
        link: project.link,
        image: project.image,
        featured: project.featured
    }));
}

export const projects: Project[] = [
    {
        title: 'Meraki',
        description: {
            en: 'Modern editorial platform transforming intimate writing into a clean, emotional visual experience.',
            es: 'Plataforma editorial moderna que convierte la escritura íntima en una experiencia visual limpia y emocional.'
        },
        impact: {
            en: 'Emotional Connection · Visual Experience',
            es: 'Conexión Emocional · Experiencia Visual'
        },
        tags: ['Editorial', 'Minimalism', 'Experience'],
        link: 'https://meraki.isaacmartinez.dev/',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'DevsCut',
        description: {
            en: 'Analytics platform enhancing digital interactions through advanced link shortening and tracking.',
            es: 'Plataforma de analíticas que mejora las interacciones digitales mediante acortamiento y seguimiento avanzado de enlaces.'
        },
        impact: {
            en: 'Real-time Analytics · High Scale',
            es: 'Analíticas en Tiempo Real · Alta Escala'
        },
        tags: ['Analytics', 'Serverless', 'AWS'],
        link: 'https://devscut.com/',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'ZitDevs',
        description: {
            en: 'Software agency connecting passionate developers with meaningful projects through flexible collaboration.',
            es: 'Agencia de software que conecta desarrolladores apasionados con proyectos significativos mediante colaboración flexible.'
        },
        impact: {
            en: 'Community Driven · Custom Software',
            es: 'Impulsado por la Comunidad · Software a Medida'
        },
        tags: ['Astro', 'Agency', 'Platform'],
        link: 'https://zitdevs.com/en/',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'UnPrimer',
        description: {
            en: 'Business startup platform helping entrepreneurs build brands, validate ideas, and launch with confidence.',
            es: 'Plataforma para startups que ayuda a emprendedores a construir marcas, validar ideas y lanzar con confianza.'
        },
        impact: {
            en: 'Brand Building · Business Strategy',
            es: 'Construcción de Marca · Estrategia de Negocio'
        },
        tags: ['Next.js', 'SaaS', 'Marketing'],
        link: 'https://www.unprimer.com/',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Project Templify',
        description: {
            en: 'Flexible CLI tool for rapid project scaffolding and architectural standardization.',
            es: 'Herramienta CLI flexible para scaffolding rápido de proyectos y estandarización arquitectónica.'
        },
        impact: {
            en: 'Dev Productivity · Custom Templates',
            es: 'Productividad Dev · Plantillas Personalizadas'
        },
        tags: ['CLI', 'Node.js', 'Architecture'],
        link: 'https://www.npmjs.com/package/project-templify',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Cominnek',
        description: {
            en: 'Performance-focused CLI for enforcing conventional commit standards across teams.',
            es: 'CLI enfocado en rendimiento para aplicar estándares de commits convencionales en equipos.'
        },
        impact: {
            en: 'Git Standards · Go Performance',
            es: 'Estándares Git · Rendimiento en Go'
        },
        tags: ['Go', 'Git', 'CLI'],
        link: 'https://github.com/Minnek-Digital-Studio/cominnek',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'MedraMart',
        description: {
            en: 'Corporate website for a surveying firm with offline capabilities and map integration.',
            es: 'Sitio web corporativo para empresa de agrimensura con capacidades offline e integración de mapas.'
        },
        impact: {
            en: 'Offline-first · Maps Integration',
            es: 'Offline-first · Integración de Mapas'
        },
        tags: ['Next.js', 'React', 'Google Maps'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Project Manager CLI',
        description: {
            en: 'Automation tool for generating React component structures and configurations.',
            es: 'Herramienta de automatización para generar estructuras y configuraciones de componentes React.'
        },
        impact: {
            en: 'Workflow Automation · Code Gen',
            es: 'Automatización de Flujo · Generación de Código'
        },
        tags: ['React', 'CLI', 'Automation'],
        link: 'https://github.com/isaacismaelx14/Project-Manager-CLI',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Image Server',
        description: {
            en: 'High-performance image processing server for upload, compression, and retrieval.',
            es: 'Servidor de procesamiento de imágenes de alto rendimiento para carga, compresión y recuperación.'
        },
        impact: {
            en: 'Image Optimization · Microservice',
            es: 'Optimización de Imágenes · Microservicio'
        },
        tags: ['Node.js', 'Express', 'Sharp'],
        link: 'https://github.com/isaacismaelx14/image-server',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
        featured: false
    }
];
