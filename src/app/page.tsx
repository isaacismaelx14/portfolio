import type { NextPage } from 'next';

import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Sidebar from '../components/Sidebar';
import Contact from '../components/Contact';
import Education from '../components/Education';
import { Spacer } from '@nextui-org/react';

const Main: NextPage = () => {
    return (
        <div className="container mx-auto px-4 lg:px-2">
            <article className="flex flex-col w-full mt-5 lg:flex-row lg:mt-0 lg:gap-5 lg:px-4">
                <Sidebar />
                <main className="w-full min-h-[calc(100vh-5rem)] relative lg:px-5 mt-10 lg:mt-6">
                    <Spacer y={20} className="lg:hidden" />
                    <Experience />
                    <Spacer y={20} />
                    <Projects />
                    <Spacer y={20} />
                    <Education />
                    <Spacer y={20} />
                    <Contact />
                </main>
            </article>
        </div>
    );
};

export default Main;
