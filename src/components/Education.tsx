'use client';
import Atropos from 'atropos/react';
import { useMemo } from 'react';

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
        <div>
            <h3 className="text-3xl font-bold m-auto mt-6 mb-4">Education</h3>
            <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </ul>
        </div>
    );
};

export default Education;
