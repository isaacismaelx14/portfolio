export interface Project {
    title: string;
    description: string;
    impact: string;
    tags: string[];
    link: string;
    image: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        title: 'DevsCut',
        description: 'Analytics platform enhancing digital interactions through advanced link shortening and tracking.',
        impact: 'Real-time Analytics · High Scale',
        tags: ['Analytics', 'Serverless', 'AWS'],
        link: 'https://devscut.com/',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'ZitDevs',
        description: 'Software agency connecting passionate developers with meaningful projects through flexible collaboration.',
        impact: 'Community Driven · Custom Software',
        tags: ['Astro', 'Agency', 'Platform'],
        link: 'https://zitdevs.com/en/',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2370&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'UnPrimer',
        description: 'Business startup platform helping entrepreneurs build brands, validate ideas, and launch with confidence.',
        impact: 'Brand Building · Business Strategy',
        tags: ['Next.js', 'SaaS', 'Marketing'],
        link: 'https://www.unprimer.com/',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2370&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'Project Templify',
        description: 'Flexible CLI tool for rapid project scaffolding and architectural standardization.',
        impact: 'Dev Productivity · Custom Templates',
        tags: ['CLI', 'Node.js', 'Architecture'],
        link: 'https://www.npmjs.com/package/project-templify',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2388&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Cominnek',
        description: 'Performance-focused CLI for enforcing conventional commit standards across teams.',
        impact: 'Git Standards · Go Performance',
        tags: ['Go', 'Git', 'CLI'],
        link: 'https://github.com/Minnek-Digital-Studio/cominnek',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2374&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'MedraMart',
        description: 'Corporate website for a surveying firm with offline capabilities and map integration.',
        impact: 'Offline-first · Maps Integration',
        tags: ['Next.js', 'React', 'Google Maps'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2373&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Project Manager CLI',
        description: 'Automation tool for generating React component structures and configurations.',
        impact: 'Workflow Automation · Code Gen',
        tags: ['React', 'CLI', 'Automation'],
        link: 'https://github.com/isaacismaelx14/Project-Manager-CLI',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2370&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Image Server',
        description: 'High-performance image processing server for upload, compression, and retrieval.',
        impact: 'Image Optimization · Microservice',
        tags: ['Node.js', 'Express', 'Sharp'],
        link: 'https://github.com/isaacismaelx14/image-server',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2370&auto=format&fit=crop',
        featured: false
    }
];
