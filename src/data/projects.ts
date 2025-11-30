export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        title: 'DevsCut',
        description: 'A cutting-edge analytics platform designed to simplify and enhance digital interactions through link shortening and email tracking capabilities.',
        tags: ['Analytics', 'Link Shortening', 'Email Tracking'],
        link: 'https://devscut.com/',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'Project Templify',
        description: 'CLI that allows users to create any structure and is easy to configure. Born from the need for flexible project scaffolding.',
        tags: ['CLI', 'Node.js', 'Scaffolding'],
        link: 'https://www.npmjs.com/package/project-templify',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2388&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'Cominnek',
        description: 'A tool to create commits following the conventional commits standard. Built with Go for performance and reliability.',
        tags: ['Go', 'Git', 'CLI'],
        link: 'https://github.com/Minnek-Digital-Studio/cominnek',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2374&auto=format&fit=crop',
        featured: true
    },
    {
        title: 'MedraMart',
        description: 'Website for a Lawyer and surveyor company featuring contact forms and Google Maps integration. Built with Next.js. (Currently Offline)',
        tags: ['Next.js', 'React', 'Google Maps', 'Offline'],
        link: '#',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2373&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Project Manager CLI',
        description: 'A CLI to create React components with all necessary files (styles, tests, configurations) automatically.',
        tags: ['React', 'CLI', 'Automation'],
        link: 'https://github.com/isaacismaelx14/Project-Manager-CLI',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2370&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Image Server',
        description: 'A server that allows image uploading, compression, and retrieval. Built with Node.js and Express.',
        tags: ['Node.js', 'Express', 'Image Processing'],
        link: 'https://github.com/isaacismaelx14/image-server',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2370&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Next SCSS TypeScript',
        description: 'A robust template for Next.js applications with SCSS and TypeScript configuration pre-setup.',
        tags: ['Next.js', 'TypeScript', 'SCSS', 'Template'],
        link: 'https://github.com/isaacismaelx14/next-scss-typescript',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop',
        featured: false
    },
    {
        title: 'Next Theme',
        description: 'An easy-to-use custom theme implementation for Next.js applications.',
        tags: ['Next.js', 'SCSS', 'Theming'],
        link: 'https://github.com/isaacismaelx14/next_theme',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2370&auto=format&fit=crop',
        featured: false
    }
];
