type SectionItemProps = {
    sectionTitle: string;
    sectionClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SectionItem: React.FC<SectionItemProps> = ({
    sectionTitle,
    children,
    sectionClassName,
    ...divProps
}) => {
    return (
        <section>
            <h3
                className={`text-xl font-bold mb-2${
                    sectionClassName ? ` ${sectionClassName}` : ''
                }`}
            >
                {sectionTitle}
            </h3>
            <div {...divProps}>{children}</div>
        </section>
    );
};

export default SectionItem;
