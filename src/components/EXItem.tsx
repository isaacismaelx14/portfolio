'use client';
import 'atropos/css';
import Atropos from 'atropos/react';
import Image from 'next/image';
import ProjectShowcase, { ProjectImage } from './ProjectShowcase';

type EXItemProps = {
    company: string;
    description?: string;
    image: {
        url: string;
        alt: string;
        className?: string;
    };
    position: string;
    startDate: string;
    endDate: string;
    projects: Array<ProjectImage>;
};

const EXItem: React.FC<EXItemProps> = ({
    company,
    position,
    projects,
    startDate,
    endDate,
    image,
}) => {
    const imgClassName = `rounded-xl w-full bg-white ${image.className || ''}`;

    return (
        <article className="text-white relative">
            <Atropos
                activeOffset={-10}
                shadow={false}
                rotateXMax={5}
                rotateYMax={5}
                className="flex gap-w-full z-50 mx-auto"
            >
                <div className="flex items-end justify-between w-full bg-gray-900 px-4 py-2 rounded-t-xl border-gray-800 border-5 border-b-0">
                    <div className="flex content-center gap-2">
                        <div className="max-w-[40px] grid place-content-center">
                            <Image
                                src={image.url}
                                alt={image.alt}
                                width={50}
                                height={50}
                                className={imgClassName}
                            />
                        </div>
                        <section>
                            <h4 className="text-lg font-bold">{company}</h4>
                            <p>{position}</p>
                        </section>
                    </div>
                    <p>
                        {startDate} - {endDate}
                    </p>
                </div>
                <div className="w-full pb-2">
                    <ProjectShowcase Projects={projects} />
                </div>
            </Atropos>
        </article>
    );
};

export default EXItem;