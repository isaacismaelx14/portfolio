import { ProjectImage } from './ProjectShowcase';
import EXItem from './EXItem';

const images: ProjectImage[] = [
    {
        id: 1,
        alt: 'Back In Stock Wizards',
        url: '/img/bis.png',
        hoverBackground: true,
        content: {
            title: 'Back In Stock Wizards',
            thumbnail: 'https://i.imgur.com/QLB8LCT.png',
            description:
                'Back In Stock Wizards is a BigCommerce app that allows customers to sign up for email notifications when a product is out of stock. I was the lead developer on this project, and I was responsible for the entire development of the app.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://www.bigcommerce.com/apps/back-in-stock-wizard/',
            },
        },
    },
    {
        id: 2,
        alt: 'Magnet Jewelry',
        url: '/img/magnet-jewerly.png',
        className: 'p-2',
        hoverBackground: true,
        content: {
            title: 'Magnet Jewelry',
            thumbnail: 'https://i.imgur.com/RK5eaxH.png',
            description:
                'Magnet Jewelry is a BigCommerce store that sells magnetic jewelry. I was the lead developer on this project, and I was responsible for some of the customizations on the site.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://www.magnetjewelrystore.com/',
            },
        },
    },
    {
        id: 3,
        alt: 'Big Skinny',
        url: '/img/big-skinny.jpg',
        hoverBackground: true,
        content: {
            title: 'Big Skinny',
            thumbnail: 'https://i.imgur.com/W85oDJg.png',
            description:
                'Big Skinny is a BigCommerce store that sells wallets. I was part of the team that worked on this project, and I was responsible for some of the customizations on the site.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://www.bigskinny.net/',
            },
        },
    },
    {
        id: 4,
        alt: 'The Motor Bookstore',
        url: '/img/the-motor-bookstore.png',
        className: 'p-2',
        hoverBackground: true,
        content: {
            title: 'The Motor Bookstore',
            thumbnail: 'https://i.imgur.com/81egm2f.png',
            description:
                'The Motor Bookstore is a BigCommerce store that sells automotive repair manuals. I was part of the team that worked on this project, and I was responsible for some of the customizations on the site especially the custom product pages, home hero, and footer.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://www.themotorbookstore.com/',
            },
        },
    },
    {
        id: 5,
        alt: 'HQ4Sports',
        url: '/img/hq4.png',
        className: 'p-2',
        hoverBackground: true,
        content: {
            title: 'HQ4Sports',
            thumbnail: 'https://i.imgur.com/5oOOMkr.png',
            description:
                'HQ4Sports is a BigCommerce store that sells sporting goods. I was part of the team that worked on this project, and I was responsible for some adjustments on the site, especially the header, navigation, and product pages.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://www.hq4sports.com/',
            },
        },
    },
    {
        id: 6,
        alt: 'Braun Shavers',
        url: '/img/braun.png',
        className: 'p-2',
        hoverBackground: true,
        content: {
            title: 'Braun Shavers',
            thumbnail: 'https://i.imgur.com/lxOf28W.png',
            description:
                'Braun Shavers is a BigCommerce store that sells electric shavers. This was one of the first projects I worked on, and I was responsible for some of the customizations on the site.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://shavers-and-replacement-parts.com/',
            },
        },
    },
    {
        id: 7,
        alt: 'Palm Beach Autopia',
        url: '/img/autopia.png',
        className: 'p-2',
        hoverBackground: true,
        content: {
            title: 'Palm Beach Autopia',
            thumbnail: 'https://i.imgur.com/N7yQvMs.png',
            description:
                'Palm Beach Autopia is a BigCommerce store that sells automotive detailing products. I was part of the team that worked on this project, and I was responsible for some of the customizations on the site.',
            callToAction: {
                text: 'Visit Website',
                url: 'https://www.autopia-carcare.com/',
            },
        },
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
                            content: {
                                title: 'Your Store Wizards',
                                description:
                                    'Your Store Wizards is a full service digital agency that specializes in eCommerce. I primarily work on the BigCommerce platform, creating custom solutions for clients and developing apps for the BigCommerce app store.',
                            },
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
