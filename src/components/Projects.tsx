import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useMemo } from 'react';
import ProjectCard from './ProjectCard';
import BackgroundSphere from './BackgroundSphere';
import SectionHeading from './SectionHeading';
import { GearIcon } from '@radix-ui/react-icons';

const projectList = [
    {
        name: 'DevsCut',
        description:
            'A cutting-edge analytics platform. DepsCut is designed to simplify and enhance digital interactions through link shortening and email tracking capabilities.',
        image: 'https://i.imgur.com/0L6h4wD.png',
        urls: [
            {
                url: 'https://devscut.com/',
                label: 'View Project',
            },
        ],
    },
    {
        name: 'Project Templify',
        description:
            "CLI that would allow me to create any structure and be easy to configure. That's how Project Templify was born.",
        image: 'https://i.imgur.com/c2TK3MS.png',
        urls: [
            {
                url: 'https://www.npmjs.com/package/project-templify',
                label: 'View Project',
            },
            {
                url: 'https://github.com/isaacismaelx14/project-templify#readme',
                label: 'View Code',
            },
        ],
    },
    {
        name: 'Cominnek',
        description:
            'With this tool, you will be able to create commits following the conventional commits standard. This project was made with Go.',
        image: 'https://i.imgur.com/nUSdflX.png',
        urls: [
            {
                url: 'https://cominnek.com/',
                label: 'View Project',
            },
            {
                url: 'https://github.com/Minnek-Digital-Studio/cominnek',
                label: 'View Code',
            },
        ],
    },
    {
        name: 'MedraMart',
        description:
            'This website is for a Lawyer and surveyor company where I implemented a contact and integration with google maps. This project was made with Next JS.',
        image: 'https://i.imgur.com/JyVlhco.png',
        urls: [
            {
                url: 'https://medramart.com/',
                label: 'View Project',
            },
        ],
    },
    {
        name: 'Project Manager CLI',
        description:
            'This a CLI with which you can create your react components with all the necessary files, such as style files, test files and some other configurations.',
        image: 'https://i.imgur.com/Rsa7het.png',
        urls: [
            {
                url: 'https://github.com/isaacismaelx14/Project-Manager-CLI',
                label: 'View Code',
            },
        ],
    },
    {
        name: 'Image Server',
        description:
            'This is a server that allows you to upload images, compress them and get them. This project was made with Node JS, Express.',
        image: 'https://i.imgur.com/nZgksmT.png',
        urls: [
            {
                url: 'https://github.com/isaacismaelx14/image-server',
                label: 'View Code',
            },
        ],
    },
];

const Projects = () => {
    const maxProjects = 6;
    const projects = useMemo(() => projectList, []);
    const displayProjects = useMemo(
        () => projects.slice(0, maxProjects),
        [projects]
    );

    return (
        <article className="w-full relative">
            {/* This is a hack to fix the background sphere */}
            <span className="h-[130px] bg-purple-600 opacity-20 hidden" />
            <BackgroundSphere
                width={'8/12'}
                height={130}
                background="purple-600"
                opacity={20}
            />
            <SectionHeading
                className="mb-[46px] mt-10"
                chip={{
                    text: 'Crafted with Code',
                    icon: <GearIcon />,
                    variant: 'flat',
                }}
                title="Showcase of My Craft"
                description="Innovative Solutions, Tailored for Impact"
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {displayProjects.map((project) => (
                    <li key={project.name}>
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>
            {projects.length > maxProjects && (
                <Button
                    color="primary"
                    as={Link}
                    variant="flat"
                    href="/projects"
                    className="col-span-2 max-w-[300px] mx-auto mt-4"
                >
                    View More Projects
                </Button>
            )}
        </article>
    );
};

export default Projects;
