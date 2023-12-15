'use client';
import NextImage from 'next/image';
import SectionItem from '../components/SectionItem';
import LanguageSkill from '../components/LanguageSkill';
import { Image, Link } from '@nextui-org/react';
import Contact from './Contact';
import Skills from './Skills';
import Icons from './Icons';
import { LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const Sidebar = () => {
    return (
        <header className="w-full lg:max-w-xs max-h-[calc(100vh-6rem)] lg:sticky lg:top-0 pt-5">
            <article className="flex items-center flex-col gap-2 sm:gap-5 sm:flex-row sm:m-auto">
                <div className="max-w-[150px] sm:max-w-[100px]  border-2 border-primary rounded-full">
                    <Image
                        isBlurred
                        priority
                        as={NextImage}
                        src="/img/isaac.jpg"
                        alt="Isaac Martinez profile picture"
                        title="Isaac Martinez"
                        width={500}
                        height={500}
                        className="rounded-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                        classNames={{
                            blurredImg: 'rounded-full',
                        }}
                    />
                </div>
                <section className="flex flex-col items-center sm:items-start">
                    <h2 className="text-xl font-bold text-primary">
                        Isaac Martinez
                    </h2>
                    <p className="text-sm">Full Stack Engineer</p>
                    <div className="flex gap-2 mt-2">
                        <Link
                            href="https://www.linkedin.com/in/isaacismaelx14/"
                            className="flex gap-1 text-gray-300"
                            target="_blank"
                        >
                            <LinkedInLogoIcon aria-hidden />
                            LinkedIn
                        </Link>
                        <Link
                            href="https://github.com/isaacismaelx14"
                            className="flex gap-1 text-gray-300"
                            target="_blank"
                        >
                            <GitHubLogoIcon aria-hidden />
                            GitHub
                        </Link>
                    </div>
                </section>
            </article>
            <div className="my-5 bg-primary w-full h-[1px]" />
            <Skills />

            <SectionItem
                sectionTitle="Languages"
                sectionClassName="mt-5"
                className="flex gap-2 px-1"
            >
                <LanguageSkill language="Spanish" level="native" />
                <LanguageSkill language="English" level="fluid" />
            </SectionItem>
            <Contact className="hidden lg:block" />
        </header>
    );
};

export default Sidebar;
