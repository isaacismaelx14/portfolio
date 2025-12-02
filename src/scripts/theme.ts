// Shared theme utilities for desktop and mobile settings

export function getTheme(): string {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('color-theme')) {
        return localStorage.getItem('color-theme')!;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

export function setTheme(theme: string): void {
    localStorage.setItem('color-theme', theme);
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export function updateThemeButtons(buttons: NodeListOf<Element>, theme: string): void {
    buttons.forEach((btn) => {
        const btnTheme = btn.getAttribute('data-theme');
        if (btnTheme === theme) {
            btn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-gray-900', 'dark:text-white');
            btn.classList.remove('text-gray-500', 'dark:text-gray-400', 'hover:text-gray-700');
        } else {
            btn.classList.remove('bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-gray-900', 'dark:text-white');
            btn.classList.add('text-gray-500', 'dark:text-gray-400', 'hover:text-gray-700');
        }
    });
}

export function initThemeButtons(selector: string): void {
    const buttons = document.querySelectorAll(selector);
    
    // Initialize UI
    updateThemeButtons(buttons, getTheme());
    
    // Add click handlers
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = btn.getAttribute('data-theme');
            if (theme) {
                setTheme(theme);
                // Update all theme buttons (both desktop and mobile)
                updateThemeButtons(document.querySelectorAll('.theme-select-btn, .mobile-theme-select-btn'), theme);
            }
        });
    });
}

export function dismissTooltip(tooltipId: string, storageKey: string): void {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
        localStorage.setItem(storageKey, 'true');
        tooltip.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
        setTimeout(() => {
            tooltip.classList.add('hidden');
        }, 500);
    }
}

export function showTooltip(tooltipId: string, storageKey: string, delay: number = 1500): void {
    const tooltip = document.getElementById(tooltipId);
    const hasSeen = localStorage.getItem(storageKey);
    
    if (tooltip && !hasSeen) {
        setTimeout(() => {
            tooltip.classList.remove('hidden');
            requestAnimationFrame(() => {
                tooltip.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
            });
        }, delay);
    }
}
