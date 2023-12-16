import SectionItem from '../components/SectionItem';
import LanguageSkill from '../components/LanguageSkill';

const Languages = () => {
    return (
        <SectionItem
            sectionTitle="Languages"
            sectionClassName="mt-5"
            className="flex gap-2 px-1"
        >
            <LanguageSkill language="Spanish" level="native" />
            <LanguageSkill language="English" level="fluid" />
        </SectionItem>
    );
};

export default Languages;
