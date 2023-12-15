'use client';
import { Button, Image } from '@nextui-org/react';
import Atropos from 'atropos/react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const projectList = [
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
        <article className="w-full">
            <h3 className="text-3xl font-bold m-auto mt-6 mb-4">Projects</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {displayProjects.map((project) => (
                    <li key={project.name}>
                        <Atropos
                            activeOffset={-10}
                            shadow={false}
                            rotateXMax={10}
                            rotateYMax={10}
                            className="flex gap-w-full z-50 mx-auto"
                            rotateTouch={false}
                        >
                            <section className="w-full group shadow-xl">
                                <Image
                                    src={project.image}
                                    isZoomed
                                    isBlurred
                                    width={1920}
                                    height={1080}
                                    alt={project.name}
                                    as={NextImage}
                                    className="h-[160px] w-full object-cover"
                                    classNames={{
                                        img: ' grouped-gray-scale-hover rounded-t-xl !rounded-none',
                                        zoomedWrapper:
                                            '!rounded-t-xl rounded-none',
                                    }}
                                    priority={project === projects[0]}
                                    data-atropos-offset={Math.floor(
                                        Math.random() * 5
                                    )}
                                />
                                <div className="grid gap-4 p-4 bg-gray-800 rounded-b-xl">
                                    <div>
                                        <h4 className="text-xl font-bold">
                                            {project.name}
                                        </h4>
                                        <p className="md:min-h-[110px] xl:min-h-[144px] 2xl:min-h-[105px]">
                                            {project.description}
                                        </p>
                                    </div>
                                    {project.urls &&
                                        project.urls.length > 0 && (
                                            <div className="flex gap-2">
                                                {project.urls.map(
                                                    (url, index) => (
                                                        <Button
                                                            color={
                                                                index === 0
                                                                    ? 'primary'
                                                                    : 'default'
                                                            }
                                                            variant="ghost"
                                                            as={Link}
                                                            href={url.url}
                                                            target="_blank"
                                                            key={url.label}
                                                        >
                                                            {url.label}
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                            </section>
                        </Atropos>
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
