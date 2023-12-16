import Contact from './Contact';
import Skills from './Skills';
import SidebarMe from './SidebarMe';
import Languages from './Languages';
import { Button, Card, CardBody } from '@nextui-org/react';

const Sidebar = () => {
    return (
        <header className="w-full lg:max-w-[350px] max-h-[calc(100vh-6rem)] lg:sticky lg:top-0 pt-5 pb-10 sm:mb-0 mb-20">
            <SidebarMe />
            <div className="flex gap-2 max-w-[200px] lg:max-w-full m-auto sm:ml-[115px] lg:m-0">
                <Button
                    as={'a'}
                    className="w-full mt-5 sm:mt-2 lg:mt-4"
                    color="primary"
                    variant="flat"
                    size="sm"
                    href="#contact-me"
                >
                    Contact Me
                </Button>
            </div>
            <div className="my-5 bg-primary w-full h-[1px]" />
            <Skills />
            <Languages />
        </header>
    );
};

export default Sidebar;
