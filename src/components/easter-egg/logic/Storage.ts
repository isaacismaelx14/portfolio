export interface TerminalState {
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
}

export class TerminalStorage {
    private static readonly KEY_STATE = "terminal_state";
    private static readonly KEY_HISTORY = "terminal_history";
    private static readonly KEY_OUTPUT = "terminal_output";
    private static readonly KEY_SNAKE_HIGHSCORE = "snake_highscore";

    static saveState(state: TerminalState): void {
        sessionStorage.setItem(this.KEY_STATE, JSON.stringify(state));
    }

    static getState(): TerminalState | null {
        const data = sessionStorage.getItem(this.KEY_STATE);
        return data ? JSON.parse(data) : null;
    }

    static saveHistory(history: string[]): void {
        sessionStorage.setItem(this.KEY_HISTORY, JSON.stringify(history));
    }

    static getHistory(): string[] {
        const data = sessionStorage.getItem(this.KEY_HISTORY);
        return data ? JSON.parse(data) : [];
    }

    static saveOutput(html: string): void {
        sessionStorage.setItem(this.KEY_OUTPUT, html);
    }

    static getOutput(): string {
        return sessionStorage.getItem(this.KEY_OUTPUT) || "";
    }

    static clearSession(): void {
        sessionStorage.removeItem(this.KEY_STATE);
        sessionStorage.removeItem(this.KEY_HISTORY);
        sessionStorage.removeItem(this.KEY_OUTPUT);
    }

    static getSnakeHighScore(difficulty: string): number {
        return parseInt(localStorage.getItem(`${this.KEY_SNAKE_HIGHSCORE}_${difficulty}`) || "0", 10);
    }

    static setSnakeHighScore(difficulty: string, score: number): void {
        localStorage.setItem(`${this.KEY_SNAKE_HIGHSCORE}_${difficulty}`, score.toString());
    }
}
