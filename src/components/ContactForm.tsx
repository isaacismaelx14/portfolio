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
import { useEffect, useState } from 'react';

const initialState: IRes = {
    status: null,
};

const ContactForm = () => {
    const [state, formAction] = useFormState(ContactAction, initialState);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [failed, setFailed] = useState<{
        message: string;
        input: string;
    }>();
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setFailed(undefined);
        setLoading(false);
        if (!state.status) return;
        if (state.status !== 200) {
            if (state.error?.code === 'SENDING_EMAIL_FAILED')
                return setFailed({
                    message: 'Failed to send email',
                    input: 'message',
                });

            if (state.error?.code === 'INVALID_EMAIL')
                return setFailed({
                    message: 'Invalid email address',
                    input: 'email',
                });

            return setFailed({
                input: state.error?.input || 'message',
                message: state.error?.message || 'Something went wrong',
            });
        }

        onOpen();
        setEmail('');
        setMessage('');
        setName('');
    }, [onOpen, state]);

    return (
        <>
            <form
                className="flex-col gap-2 flex"
                action={formAction}
                onSubmit={() => setLoading(true)}
            >
                <Input
                    size="sm"
                    variant="flat"
                    label="Your Name"
                    name="name"
                    classNames={{
                        inputWrapper: 'bg-white bg-opacity-10',
                    }}
                    errorMessage={failed?.input === 'name' && failed.message}
                    color={failed?.input === 'name' ? 'danger' : undefined}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    size="sm"
                    variant="flat"
                    label="Your Email"
                    name="email"
                    classNames={{
                        inputWrapper: 'bg-white bg-opacity-10',
                    }}
                    errorMessage={failed?.input === 'email' && failed.message}
                    color={failed?.input === 'email' ? 'danger' : undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                    size="sm"
                    variant="flat"
                    label="Your Message"
                    name="message"
                    classNames={{
                        inputWrapper: 'bg-white bg-opacity-10',
                    }}
                    errorMessage={failed?.input === 'message' && failed.message}
                    color={failed?.input === 'message' ? 'danger' : undefined}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    type="submit"
                    className="max-w-[200px]"
                    isLoading={loading}
                    disabled={loading}
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
                                Message Sent
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Thank you for contacting me. I will get back
                                    to you as soon as possible.
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
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ContactForm;
