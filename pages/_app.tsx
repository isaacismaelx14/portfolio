import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const setColorScheme = () => {
            const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            document.body.dataset.theme = colorScheme;
        };
        setColorScheme();
    }, []);
    return <Component {...pageProps} />;
}

export default MyApp;
