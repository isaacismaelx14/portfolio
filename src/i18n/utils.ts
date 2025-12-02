import en from './en.json';
import es from './es.json';

export const languages = {
    en: 'English',
    es: 'Español',
};

export const flags: Record<string, string> = {
    en: '🇺🇸',
    es: '🇩🇴',
};

export const defaultLang = 'en';

const translations = {
    en,
    es,
};

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in translations) return lang as keyof typeof translations;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
    return function t(key: string) {
        const keys = key.split('.');
        let value: any = translations[lang] || translations[defaultLang];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    }
}

export function useTranslatedPath(lang: keyof typeof translations) {
    return function translatePath(path: string, l: string = lang) {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `/${l}${cleanPath === '/' ? '' : cleanPath}`;
    }
}

export function getLocalizedPath(currentPath: string, targetLang: string): string {
    const hasLangPrefix = Object.keys(languages).some((l) =>
        currentPath.startsWith(`/${l}`)
    );

    let cleanPath = currentPath;
    if (hasLangPrefix) {
        const parts = currentPath.split('/');
        cleanPath = '/' + parts.slice(2).join('/');
    } else if (currentPath === '/') {
        cleanPath = '/';
    }

    if (!cleanPath.startsWith('/')) {
        cleanPath = '/' + cleanPath;
    }

    if (targetLang === 'en') {
        return cleanPath === '' ? '/' : cleanPath;
    }

    return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`;
}
