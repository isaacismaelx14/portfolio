import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import SectionItem from './SectionItem';

const Contact: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <div className={className}>
            <SectionItem
                sectionTitle="Contact"
                sectionClassName="mt-5"
                className="px-1 flex-col gap-2 flex"
            >
                <Input
                    size="sm"
                    variant="bordered"
                    type="email"
                    label="Email"
                />
                <Textarea size="sm" variant="bordered" label="Message" />

                <Button size="sm" variant="ghost" color="primary">
                    Send
                </Button>
            </SectionItem>
        </div>
    );
};

export default Contact;
