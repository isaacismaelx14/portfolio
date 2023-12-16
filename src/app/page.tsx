import type { NextPage } from 'next';

import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Sidebar from '../components/Sidebar';
import Contact from '../components/Contact';
import Education from '../components/Education';
import { Spacer } from '@nextui-org/react';
import BackgroundSphere from '../components/BackgroundSphere';

const Main: NextPage = () => {
    return (
        <div className="container mx-auto px-4 lg:px-2">
            <article className="flex flex-col w-full mt-5 lg:flex-row lg:mt-0 lg:gap-5 lg:px-4 relative">
                <div className="lg:hidden">
                    <span className="w-10/12 h-[130px] bg-purple-900 hidden" />
                    <BackgroundSphere
                        width={'10/12'}
                        height={130}
                        background="purple-900"
                        opacity={30}
                        className=""
                    />
                </div>
                <Sidebar />

                <main className="w-full min-h-[calc(100vh-5rem)] relative lg:px-5 mt-10 lg:mt-6">
                    <Spacer y={1} className="lg:hidden" />
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
