import Contact from './Contact';
import Skills from './Skills';
import SidebarMe from './SidebarMe';
import Languages from './Languages';
import { Button, Card, CardBody } from '@nextui-org/react';

const Sidebar = () => {
    return (
        <header className="w-full lg:max-w-[350px] lg:sticky lg:top-0 pt-5 max-h-[calc(100vh)] pb-10">
            <Card className="" isBlurred shadow="none">
                <CardBody className="max-h-[calc(100vh-6rem)] w-full block">
                    <SidebarMe />
                    <div className="flex gap-2 max-w-[200px] lg:max-w-full m-auto sm:ml-[115px] lg:m-0">
                        <Button
                            className="w-full mt-5 sm:mt-2 lg:mt-4"
                            color="primary"
                            variant="flat"
                            size="sm"
                            href="mailto:"
                        >
                            Contact Me
                        </Button>
                    </div>
                    <div className="my-5 bg-primary w-full h-[1px]" />
                    <Skills />
                    <Languages />
                </CardBody>
            </Card>
        </header>
    );
};

export default Sidebar;
