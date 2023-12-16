import { toCapitalCase } from '../utilities/toCapitalCase';

type LanguageSkillProps = {
    language: string;
    level: 'native' | 'fluid' | 'basic';
};

const LanguageSkill: React.FC<LanguageSkillProps> = ({ language, level }) => {
    return (
        <div
            className={`text-black font-bold flex gap-4 w-full py-2 px-4 justify-between rounded-md ${LevelColor(
                level
            )} hover:scale-105 transition-all grayscale hover:grayscale-0`}
        >
            <p className="text-sm">{language}</p>
            <p className="text-sm">{toCapitalCase(level)}</p>
        </div>
    );
};

const LevelColor = (level: string) => {
    switch (level) {
        case 'native':
            return 'bg-green-500';
        case 'fluid':
            return 'bg-yellow-500';
        case 'basic':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

export default LanguageSkill;
