'use client';
import { Chip, type ChipProps } from '@nextui-org/react';
import { Atropos } from 'atropos/react';

type Props = {
    title: string;
    description: string;
    chip?: {
        text: string;
        icon?: React.ReactNode;
    } & ChipProps;
    className?: string;
};

const SectionHeading: React.FC<Props> = ({
    description,
    title,
    chip,
    className: _className,
}) => {
    const className = _className ?? '';
    return (
        <div
            className={`w-full max-w-xl m-auto text-center mb-5 px-2 ${className}`}
        >
            {!!chip && (
                <Atropos
                    shadow={false}
                    className="flex gap-w-full w-full z-50 mx-auto"
                    rotateTouch={false}
                    highlight={false}
                >
                    <Chip
                        variant="bordered"
                        color="primary"
                        className="mb-4 cursor-default"
                        size="md"
                        {...chip}
                    >
                        <div className="flex gap-1 items-center">
                            <i data-atropos-offset="5">{chip?.icon}</i>
                            <span data-atropos-offset="-10">{chip?.text}</span>
                        </div>
                    </Chip>
                </Atropos>
            )}
            <h3 className="text-3xl font-bold m-auto">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default SectionHeading;
