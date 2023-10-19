import { ProjectImage } from './ProjectShowcase';
import EXItem from './EXItem';

const images: ProjectImage[] = [
    {
        id: 1,
        alt: 'Back In Stock Wizards',
        url: '/img/bis.png',
        hoverBackground: true,
    },
    {
        id: 2,
        alt: 'Magnet Jewelry',
        url: '/img/magnet-jewerly.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 3,
        alt: 'Big Skinny',
        url: '/img/big-skinny.jpg',
        hoverBackground: true,
    },
    {
        id: 4,
        alt: 'The Motor Bookstore',
        url: '/img/the-motor-bookstore.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 5,
        alt: 'HQ4Sports',
        url: '/img/hq4.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 6,
        alt: 'Braun Shavers',
        url: '/img/braun.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 7,
        alt: 'Palm Beach Autopia',
        url: '/img/autopia.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 8,
        alt: 'Wolfgang Car Care',
        url: '/img/wolfgang.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 9,
        alt: 'Precision LED',
        url: '/img/precision-led.png',
        className: 'p-1',
        hoverBackground: true,
    },
    {
        id: 10,
        alt: 'San Carlos Rustic Furniture',
        url: '/img/san-carlos.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 11,
        alt: 'contempo',
        url: '/img/contempo.webp',
        className: 'p-2',
        hoverBackground: 'black',
    },
    {
        id: 12,
        alt: 'Marine 31',
        url: '/img/marine-31.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 13,
        alt: 'The Perfect Spot',
        url: '/img/the-perfume-spot.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 14,
        alt: 'Autogeek',
        url: '/img/autogeek.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 15,
        alt: 'Pinnacle Wax',
        url: '/img/pinnacle.png',
        className: 'p-2',
        hoverBackground: true,
    },
    {
        id: 16,
        alt: 'Palm Beach Sonax',
        url: '/img/sonax.png',
        className: 'p-2',
        hoverBackground: true,
    },
];

const Experience = () => {
    return (
        <article className="w-full">
            <h3 className="text-2xl font-bold">Experience</h3>
            <div className="grid gap-4 my-2">
                <EXItem
                    company="Minnek Digital Agency"
                    endDate="Present"
                    position="SE2 (MID) - Full Stack Developer"
                    projects={[
                        {
                            id: 1,
                            alt: 'Your Store Wizards',
                            url: '/img/yourstorewizards.png',
                            hoverBackground: true,
                        },
                    ]}
                    startDate="April 2022"
                    image={{
                        alt: 'Minnek Digital Agency Logo',
                        url: '/img/minnek-logo.svg',
                        className: 'p-2',
                    }}
                />
                <EXItem
                    company="Your Store Wizards"
                    endDate="Present"
                    position="Full Stack Developer"
                    projects={images}
                    startDate="April 2022"
                    image={{
                        alt: 'Your Store Wizards',
                        url: '/img/wizards-logo.png',
                    }}
                />
            </div>
        </article>
    );
};

export default Experience;
