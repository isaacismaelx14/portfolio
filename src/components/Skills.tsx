'use strict';
import Icons from '../components/Icons';
import { CustomAction } from './ProjectShowcase';
import SectionItem from './SectionItem';

const iconList = [
    { name: 'HTML', title: 'HTML' },
    { name: 'CSS', title: 'CSS' },
    { name: 'JavaScript', title: 'JavaScript' },
    { name: 'Typescript', title: 'Typescript' },
    { name: 'React', title: 'React' },
    { name: 'Vue', title: 'Vue' },
    { name: 'Nextjs', title: 'Nextjs' },
    { name: 'NestJS', title: 'NestJS' },
    { name: 'Express', title: 'Express' },
    { name: 'NodeJs', title: 'NodeJs' },
    { name: 'Go', title: 'Go' },
    { name: 'Python', title: 'Python' },
    { name: 'CPlus', title: 'C++' },
    { name: 'CSharp', title: 'C#' },
    { name: 'Electron', title: 'Electron' },
    { name: 'Git', title: 'Git' },
    { name: 'Mysql', title: 'MySQL' },
    { name: 'Aws', title: 'AWS' },
    { name: 'Linux', title: 'Linux' },
    { name: 'Windows', title: 'Windows' },
    { name: 'Terminal', title: 'Terminal' },
];

function renderIcons(iconName: string) {
    const Icon = Icons[iconName as keyof typeof Icons];
    return <Icon className="svg-icon" />;
}

const Skills = () => {
    return (
        <SectionItem
            sectionTitle="Skills"
            className="grid gap-2 max-sm:grid-cols-6 sm:gap-0 sm:flex flex-wrap"
        >
            {iconList.map((icon) => (
                <CustomAction
                    key={icon.name}
                    content={
                        <div className="text-medium font-bold">
                            {icon.title}
                        </div>
                    }
                    placement="top"
                >
                    {renderIcons(icon.name)}
                </CustomAction>
            ))}
        </SectionItem>
    );
};

export default Skills;
