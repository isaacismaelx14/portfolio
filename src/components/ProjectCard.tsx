'use client';
import { Button, Image } from '@nextui-org/react';
import Atropos from 'atropos/react';
import NextImage from 'next/image';
import Link from 'next/link';

type Url = {
    url: string;
    label: string;
};

type Project = {
    name: string;
    description: string;
    image: string;
    urls: Url[];
};

type ProjectCardProps = {
    project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
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
                        zoomedWrapper: '!rounded-t-xl rounded-none',
                    }}
                    data-atropos-offset={Math.floor(Math.random() * 5)}
                />
                <div className="grid gap-4 p-4 bg-gray-800 bg-opacity-60 backdrop-blur-md  rounded-b-xl text-white">
                    <div>
                        <h4 className="text-xl font-bold">{project.name}</h4>
                        <p className="md:min-h-[110px] xl:min-h-[144px] 2xl:min-h-[105px]">
                            {project.description}
                        </p>
                    </div>
                    {project.urls && project.urls.length > 0 && (
                        <div className="flex gap-2">
                            {project.urls.map((url, index) => (
                                <Button
                                    color={index === 0 ? 'primary' : 'default'}
                                    variant="ghost"
                                    as={Link}
                                    href={url.url}
                                    target="_blank"
                                    key={url.label}
                                    className={index !== 0 ? 'text-white' : ''}
                                >
                                    {url.label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Atropos>
    );
};

export default ProjectCard;
