import '../styles/globals.scss';

export const metadata = {
    title: 'Isaac Martinez | Portfolio',
    description: 'Portfolio of Isaac Martinez',
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
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
