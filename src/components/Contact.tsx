'use client';
import { Card, CardBody } from '@nextui-org/react';
import ContactForm from './ContactForm';
import SectionHeading from './SectionHeading';
import { StarFilledIcon } from '@radix-ui/react-icons';
import BackgroundSphere from './BackgroundSphere';
import Atropos from 'atropos/react';

const Contact = () => {
    return (
        <article className="relative my-40" id="contact-me">
            <BackgroundSphere
                width={'8/12'}
                height={330}
                background="purple-950"
                opacity={30}
            />
            <section>
                <SectionHeading
                    chip={{
                        text: 'Open Dialogue',
                        icon: <StarFilledIcon />,
                        variant: 'flat',
                    }}
                    title="Get In Touch"
                    description="Your Thoughts, Our Next Big Idea"
                />
                <Atropos
                    activeOffset={-5}
                    shadow={false}
                    rotateXMax={5}
                    rotateYMax={5}
                    className="flex gap-w-full w-full z-50 mx-auto"
                    rotateTouch={false}
                    highlight={false}
                >
                    <Card
                        className="py-4 px-2 mb-20 max-w-2xl m-auto"
                        isBlurred
                    >
                        <CardBody>
                            <ContactForm />
                        </CardBody>
                    </Card>
                </Atropos>
            </section>
        </article>
    );
};

export default Contact;
