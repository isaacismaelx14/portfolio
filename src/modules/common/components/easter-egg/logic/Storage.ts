export interface TerminalState {
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    sudo_mode?: boolean;
}

const KEYS = {
    STATE: "terminal_state",
    HISTORY: "terminal_history",
    OUTPUT: "terminal_output",
    SNAKE_HIGHSCORE: "snake_highscore",
} as const;

export class TerminalStorage {
    static saveState(state: TerminalState): void {
        sessionStorage.setItem(KEYS.STATE, JSON.stringify(state));
    }

    static getState(): TerminalState | null {
        try {
            const data = sessionStorage.getItem(KEYS.STATE);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    static hasActiveSession(): boolean {
        const state = this.getState();
        return state?.isOpen === true || state?.isMinimized === true;
    }

    static saveHistory(history: string[]): void {
        sessionStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
    }

    static getHistory(): string[] {
        try {
            const data = sessionStorage.getItem(KEYS.HISTORY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    static saveOutput(html: string): void {
        sessionStorage.setItem(KEYS.OUTPUT, html);
    }

    static getOutput(): string {
        return sessionStorage.getItem(KEYS.OUTPUT) || "";
    }

    static clearSession(): void {
        sessionStorage.removeItem(KEYS.STATE);
        sessionStorage.removeItem(KEYS.HISTORY);
        sessionStorage.removeItem(KEYS.OUTPUT);
    }

    static getSnakeHighScore(difficulty: string): number {
        return parseInt(localStorage.getItem(`${KEYS.SNAKE_HIGHSCORE}_${difficulty}`) || "0", 10);
    }

    static setSnakeHighScore(difficulty: string, score: number): void {
        localStorage.setItem(`${KEYS.SNAKE_HIGHSCORE}_${difficulty}`, score.toString());
    }
}
