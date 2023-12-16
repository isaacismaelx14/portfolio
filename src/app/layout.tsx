import './main.css';
import { Providers } from './providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
    title: 'Isaac Martinez - Full Stack Engineer | Portfolio',
    description:
        'Discover the innovative projects and professional journey of Isaac Martinez, a seasoned Full Stack Engineer with a passion for technology and creative problem-solving.',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    favicon: '/favicon.ico',
    og: {
        title: 'Isaac Martinez - Full Stack Engineer | Portfolio',
        type: 'website',
        url: 'https://www.isaacmartinez.dev/',
        image: 'https://www.isaacmartinez.dev/og.png',
        description:
            'Step into the world of Isaac Martinez, where technology meets innovation. Explore my portfolio to see how I solve complex challenges with cutting-edge solutions.',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@ismardev',
        title: 'Isaac Martinez - Full Stack Engineer | Portfolio',
        description:
            "Embark on a journey through Isaac Martinez's professional landscape, featuring a robust portfolio of technological solutions and creative developments.",
        image: 'https://www.isaacmartinez.dev/og.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="dark:bg-dark dark:text-gray-50">
                <Providers>{children}</Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
