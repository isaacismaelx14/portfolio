import NextImage from 'next/image';
import { Button, Tooltip, Image, TooltipProps } from '@nextui-org/react';
import { useState } from 'react';

export type ProjectImage = {
    id: number;
    alt: string;
    url: string;
    className?: string;
    hoverBackground?: boolean | string;
    content?: {
        title: string;
        description: string | React.ReactNode;
        thumbnail?: string;
        callToAction?: {
            text: string;
            url: string;
        };
    };
};

type ProjectShowcaseProps = {
    Projects: Array<ProjectImage>;
};

const getBackground = (hoverBackground?: boolean | string) => {
    if (hoverBackground === true) {
        return 'bg-white';
    }

    if (typeof hoverBackground === 'string') {
        if (hoverBackground.startsWith('bg-')) {
            return hoverBackground;
        }

        return `bg-${hoverBackground}`;
    }

    return '';
};

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ Projects }) => {
    const projectImages = Projects.map((project) => {
        project.className = project.className || '';
        const randomOffset = Math.floor(Math.random() * 61) - 30;
        const colorHoverBackground = getBackground(project.hoverBackground);
        const hoverBackground = !!colorHoverBackground
            ? `hover:${colorHoverBackground}`
            : '';
        const className = `gray-scale-hover rounded-xl w-full max-w-[100px] sm:max-w-[170px] ${project.className} hover:scale-110 ${hoverBackground} `;

        return (
            <div
                key={project.id}
                className="z-10 hover:z-30"
                data-atropos-offset={randomOffset.toString()}
            >
                <CustomAction
                    content={
                        project.content && (
                            <div className="px-1 py-2 max-w-[300px]">
                                <div className="text-medium font-bold">
                                    {project.content?.title}
                                </div>
                                {project.content?.thumbnail && (
                                    <div className="w-full p-2 my-2">
                                        <Image
                                            as={NextImage}
                                            src={project.content?.thumbnail}
                                            alt={project.alt}
                                            title={project.alt}
                                            width={500}
                                            height={500}
                                            className=""
                                        />
                                    </div>
                                )}
                                {typeof project.content?.description ===
                                'string' ? (
                                    <p className="text-small">
                                        {project.content?.description}
                                    </p>
                                ) : (
                                    project.content?.description
                                )}
                                {project.content?.callToAction && (
                                    <Button
                                        href={project.content.callToAction.url}
                                        className="mt-2 w-full"
                                        as={'a'}
                                        target="_blank"
                                        color="primary"
                                        variant="ghost"
                                    >
                                        {project.content.callToAction.text}
                                    </Button>
                                )}
                            </div>
                        )
                    }
                >
                    <Image
                        isBlurred
                        as={NextImage}
                        src={project.url}
                        alt={project.alt}
                        width={200}
                        height={100}
                        className={className}
                        classNames={{
                            wrapper: 'group',
                            blurredImg:
                                'grayscale-[70%] hover:grayscale-0 transition-all duration-500',
                        }}
                    />
                </CustomAction>
            </div>
        );
    });

    return (
        <div className="py-3 px-10 pb-10 z-20 w-full bg-zinc-700 bg-opacity-60 backdrop-blur-md rounded-b-xl border-5 border-gray-800 border-t-0">
            <h4 className="text-lg font-bold mb-2">Projects I worked on</h4>
            <div className="relative w-full flex flex-wrap gap-2 pt-2 z-50">
                {projectImages}
            </div>
        </div>
    );
};

export default ProjectShowcase;

export const CustomAction: React.FC<
    {
        children: React.ReactNode;
        content: React.ReactNode;
    } & TooltipProps
> = ({ children, content, ...props }) => {
    const [ttOpen, setTTOpen] = useState(false);

    return (
        <Tooltip
            placement="bottom"
            closeDelay={100}
            content={
                <div
                    onMouseEnter={() => {
                        setTTOpen(true);
                    }}
                    onMouseLeave={() => {
                        setTTOpen(false);
                    }}
                >
                    {content}
                </div>
            }
            isDisabled={!content}
            isOpen={ttOpen}
            {...props}
        >
            <section
                onMouseEnter={() => {
                    setTTOpen(true);
                }}
                onMouseLeave={() => {
                    setTTOpen(false);
                }}
                onClick={() => {
                    setTTOpen(true);
                    console.log('clicked');
                }}
            >
                {children}
            </section>
        </Tooltip>
    );
};
