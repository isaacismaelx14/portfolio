'use client';
import { Input, Textarea } from '@nextui-org/input';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { ContactAction, IRes } from '../actions/Contact';
import { useEffect } from 'react';

const initialState: IRes = {
    status: null,
};

const ContactForm = () => {
    const [state, formAction] = useFormState(ContactAction, initialState);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if (state.status && state.status !== 200) {
            onOpen();
        }
    }, [onOpen, state]);

    return (
        <>
            <form className="flex-col gap-2 flex" action={formAction}>
                <Input
                    size="sm"
                    variant="flat"
                    type="email"
                    label="Your Email"
                    name="email"
                    classNames={{
                        inputWrapper: 'bg-white bg-opacity-10',
                    }}
                />
                <Textarea
                    size="sm"
                    variant="flat"
                    label="Your Message"
                    name="message"
                    classNames={{
                        inputWrapper: 'bg-white bg-opacity-10',
                    }}
                />

                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    type="submit"
                    className="max-w-[200px]"
                >
                    Send Message
                </Button>
            </form>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="z-[9999]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute
                                    tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex
                                    incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do
                                    dolor eiusmod. Et mollit incididunt nisi
                                    consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt
                                    nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ContactForm;
