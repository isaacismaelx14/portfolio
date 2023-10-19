import type { NextPage } from 'next';
import Image from 'next/image';
import Icons from '../components/Icons';
import SectionItem from '../components/SectionItem';
import LanguageSkill from '../components/LanguageSkill';
import { Input, Textarea } from '@nextui-org/input';
import { Button, Card, CardBody } from '@nextui-org/react';
import Experience from '../components/Experience';

const Main: NextPage = () => {
    return (
        <div className="container mx-auto px-2">
            <article className="flex flex-col w-full mt-5 sm:flex-row sm:mt-4 sm:gap-5 sm:px-4 sm:py-2">
                <header className="w-full md:max-w-sm sm:max-w-xs max-h-[calc(100vh-6rem)] sm:sticky sm:top-0 pt-5">
                    <article className="flex items-center flex-col gap-2 sm:gap-5 sm:flex-row sm:m-auto">
                        <div className="max-w-[150px] sm:max-w-[100px]  border-2 border-primary rounded-full">
                            <Image
                                src="/img/isaac.jpg"
                                alt="Isaac Martinez profile picture"
                                title="Isaac Martinez"
                                width={500}
                                height={500}
                                className="rounded-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                                objectFit="fill"
                            />
                        </div>
                        <section className="flex flex-col items-center">
                            <h2 className="text-xl font-bold text-primary">
                                Isaac Martinez
                            </h2>
                            <p className="text-sm">Full Stack</p>
                        </section>
                    </article>
                    <div className="my-5 bg-primary w-full h-[1px]" />
                    <SectionItem
                        sectionTitle="Skills"
                        className="flex flex-wrap"
                    >
                        <Icons.HTML className="svg-icon" />
                        <Icons.CSS className="svg-icon" />
                        <Icons.JavaScript className="svg-icon" />
                        <Icons.Typescript className="svg-icon" />
                        <Icons.React className="svg-icon" />
                        <Icons.Vue className="svg-icon" />
                        <Icons.Nextjs className="svg-icon" />
                        <Icons.NestJS className="svg-icon" />
                        <Icons.Express className="svg-icon" />
                        <Icons.NodeJs className="svg-icon" />
                        <Icons.Go className="svg-icon" />
                        <Icons.Python className="svg-icon" />
                        <Icons.CPlus className="svg-icon" />
                        <Icons.CSharp className="svg-icon" />
                        <Icons.Electron className="svg-icon" />
                        <Icons.Git className="svg-icon" />
                        <Icons.Mysql className="svg-icon" />
                        <Icons.Aws className="svg-icon" />
                        <Icons.Linux className="svg-icon" />
                        <Icons.Windows className="svg-icon" />
                        <Icons.Terminal className="svg-icon" />
                    </SectionItem>

                    <SectionItem
                        sectionTitle="Languages"
                        sectionClassName="mt-5"
                        className="flex gap-2 px-1"
                    >
                        <LanguageSkill language="Spanish" level="native" />
                        <LanguageSkill language="English" level="fluid" />
                    </SectionItem>

                    <SectionItem
                        sectionTitle="Contact"
                        sectionClassName="mt-5"
                        className="px-1 flex flex-col gap-2"
                    >
                        <Input
                            size="sm"
                            variant="bordered"
                            type="email"
                            label="Email"
                        />
                        <Textarea
                            size="sm"
                            variant="bordered"
                            label="Message"
                        />

                        <Button size="sm" variant="ghost" color="primary">
                            Send
                        </Button>
                    </SectionItem>
                </header>
                <main className="w-full min-h-[calc(100vh-5rem)] relative z-[999] px-5">
                    <Experience />
                    <section>
                        <h3>Projects</h3>
                    </section>
                    <section>
                        <h3>Education</h3>
                    </section>
                </main>
            </article>
        </div>
    );
};

export default Main;
