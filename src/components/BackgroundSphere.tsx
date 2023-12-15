type Props = {
    width?: number | string;
    height?: number | string;
    background?: string;
    opacity?: number;
};

const BackgroundSphere: React.FC<Props> = (props) => {
    return (
        <div className="blur-3xl absolute w-full h-full" aria-hidden>
            <GenerateCircle {...props} />
        </div>
    );
};

const GenerateCircle = ({
    width,
    height,
    background,
    opacity,
}: Props): JSX.Element => {
    if (typeof width === 'number') {
        width = `[${width}px]`;
    }

    if (typeof height === 'number') {
        height = `[${height}px]`;
    }

    if (background && !background.includes('bg-')) {
        background = `bg-${background}`;

        if (background.includes('#')) background = `bg-[${background}]`;
    }

    width = width ?? '8/12';
    height = height ?? '[330px]';
    background = background ?? 'bg-purple-950';
    opacity = opacity ?? 30;

    return (
        <i
            className={`block w-${width} h-${height} ${background} rounded-full opacity-${opacity} m-auto bg-blend-multiply`}
            aria-hidden
        />
    );
};
export default BackgroundSphere;
