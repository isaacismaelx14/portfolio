'use client';
import Atropos from 'atropos/react';
import { useMemo } from 'react';
import SectionHeading from './SectionHeading';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { Card, CardBody } from '@nextui-org/react';
import BackgroundSphere from './BackgroundSphere';

type EducationItem = {
    degree: string;
    institution: string;
    startYear: number | null;
    endYear: number | null;
};

const educationList: EducationItem[] = [
    {
        degree: 'Software Engineer',
        institution: 'UAPA',
        startYear: 2022,
        endYear: null,
    },
    {
        degree: 'Effective Communication for Leads',
        institution: 'Platzi',
        startYear: null,
        endYear: null,
    },
    {
        degree: 'Introduction to Programming',
        institution: 'ITLA',
        startYear: 2022,
        endYear: 2022,
    },
    {
        degree: 'Technical in Networks',
        institution: 'Politecnico Hermana Josefina Serrano',
        startYear: 2017,
        endYear: 2021,
    },
    {
        degree: 'English',
        institution: 'Instituto Utesiano de Idiomas (IUI)',
        startYear: 2016,
        endYear: 2021,
    },
];

function sortEducationByYear(educationArray: EducationItem[]): EducationItem[] {
    return educationArray.sort((a, b) => {
        if (b.endYear === null) return 1;
        if (a.endYear === null) return -1;

        if (a.startYear !== b.startYear) {
            return (b.startYear ?? 0) - (a.startYear ?? 0);
        }

        return (a.endYear ?? 0) - (b.endYear ?? 0);
    });
}

const Education = () => {
    const education = useMemo(() => educationList, []);
    const sortedEducation = useMemo(
        () => sortEducationByYear(education),
        [education]
    );

    return (
        <article className="relative">
            {/* This is a hack to fix the background sphere */}
            <span className="h-[330px] bg-purple-900 opacity-20 hidden" />
            <BackgroundSphere
                width={'2/5'}
                height={330}
                background="purple-900"
                opacity={20}
            />
            <SectionHeading
                className="mb-10 mt-28"
                chip={{
                    text: 'Lifelong Learner',
                    icon: <BookmarkFilledIcon />,
                    variant: 'flat',
                }}
                title="My Educational Pathway"
                description="A Continuous Quest for Knowledge and Skill"
            />
            <Card className="py-4 px-2" isBlurred>
                <CardBody
                    as={'ul'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
                >
                    {sortedEducation.map((item) => (
                        <li key={item.institution}>
                            <Atropos
                                activeOffset={-10}
                                shadow={false}
                                rotateXMax={10}
                                rotateYMax={10}
                                className="flex gap-w-full z-50 mx-auto"
                                rotateTouch={false}
                            >
                                <section className="flex flex-col gap-1 border-l-3 border-gray-700 pl-4 min-h-[80px]">
                                    <h4 className="text-xl font-bold">
                                        {item.degree}
                                    </h4>
                                    <div>
                                        <p>{item.institution}</p>
                                        {item.startYear && item.startYear && (
                                            <p>
                                                {item.startYear === null
                                                    ? 'No information available'
                                                    : item.startYear}{' '}
                                                -{' '}
                                                {item.endYear === null
                                                    ? 'Present'
                                                    : item.endYear}
                                            </p>
                                        )}
                                    </div>
                                </section>
                            </Atropos>
                        </li>
                    ))}
                </CardBody>
            </Card>
        </article>
    );
};

export default Education;
