import './main.css';
import { Providers } from './providers';

export const metadata = {
    title: 'Isaac Martinez | Portfolio',
    description: "Isaac's Portfolio",
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    favicon: '/favicon.ico',
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
            </body>
        </html>
    );
}
