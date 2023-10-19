import Image from 'next/image';
import 'atropos/css';

export type ProjectImage = {
    id: number;
    alt: string;
    url: string;
    className?: string;
    hoverBackground?: boolean | string;
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
        const className = `gray-scale-hover rounded-xl w-full max-w-[100px] sm:max-w-[170px]  ${project.className} hover:scale-110 ${hoverBackground} `;

        return (
            <div
                key={project.id}
                className="z-10 hover:z-30"
                data-atropos-offset={randomOffset.toString()}
            >
                <Image
                    src={project.url}
                    alt={project.alt}
                    width={200}
                    height={100}
                    className={className}
                />
            </div>
        );
    });

    return (
        <div className="py-3 px-10 pb-10 z-20 w-full bg-zinc-700 rounded-b-xl border-5 border-gray-800 border-t-0">
            <h4 className="text-lg font-bold mb-2">Projects I worked on</h4>
            <div className="relative w-full flex flex-wrap gap-2 pt-2 z-50">
                {projectImages}
            </div>
        </div>
    );
};

export default ProjectShowcase;
