import { TerminalStorage } from "./Storage";
import { MatrixEffect } from "./MatrixEffect";
import { SnakeGame } from "./SnakeGame";
import { CommandProcessor } from "./CommandProcessor";

interface TerminalState {
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    history: string[];
    historyIndex: number;
    inputMode: "command" | "password";
    passwordCallback: ((password: string) => void) | null;
}

interface TerminalData {
    projects: any[];
    contact: Record<string, string>;
    about: string;
    lang: string;
}

const ELEMENT_IDS = [
    "terminal-overlay", "terminal-window", "terminal-minimized",
    "terminal-input", "terminal-input-line", "terminal-output",
    "terminal-content", "matrix-canvas", "term-close",
    "term-minimize", "term-maximize", "term-prompt-arrow", "term-prompt-path"
] as const;

const WELCOME_MESSAGE = `
<div class="mb-4">
    <p>Welcome to Terminal Mode v1.1.0</p>
    <p>Type <span class="text-white">'help'</span> to see available commands.</p>
</div>`;

export class TerminalController extends HTMLElement {
    private elements: Record<string, HTMLElement | null> = {};
    private matrix: MatrixEffect | null = null;
    private snake: SnakeGame | null = null;
    private processor: CommandProcessor;

    private state: TerminalState = {
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        history: [],
        historyIndex: -1,
        inputMode: "command",
        passwordCallback: null,
    };

    private data: TerminalData = {
        projects: [],
        contact: {},
        about: "",
        lang: "en",
    };

    constructor() {
        super();
        this.processor = new CommandProcessor();
    }

    connectedCallback(): void {
        this.initElements();
        this.loadData();
        this.initComponents();
        this.restoreState();
        this.bindEvents();
        this.exposeSudoCommand();
    }

    disconnectedCallback(): void {
        this.unbindEvents();
        this.matrix?.stop();
        this.snake?.stop("user");
    }

    public openTerminal(): void {
        this.open();
    }

    private initElements(): void {
        ELEMENT_IDS.forEach(id => this.elements[id] = this.querySelector(`#${id}`));
    }

    private loadData(): void {
        try {
            this.data = {
                projects: JSON.parse(this.dataset.projects || "[]"),
                contact: JSON.parse(this.dataset.contact || "{}"),
                about: this.dataset.about || "",
                lang: this.dataset.lang || "en",
            };
        } catch {
            console.error("Failed to parse terminal data");
        }
    }

    private initComponents(): void {
        const canvas = this.elements["matrix-canvas"] as HTMLCanvasElement;
        const output = this.elements["terminal-output"];

        if (canvas) this.matrix = new MatrixEffect(canvas);
        if (output) {
            this.snake = new SnakeGame(output, {
                onGameOver: () => this.saveState(),
                onGameCancel: () => this.saveState(),
                onInputHide: () => this.toggleInputLine(false),
                onInputShow: () => {
                    this.toggleInputLine(true);
                    this.focusInput();
                }
            });
        }
    }

    private toggleInputLine(visible: boolean): void {
        this.elements["terminal-input-line"]?.classList.toggle("hidden", !visible);
    }

    private bindEvents(): void {
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleInputKeydown = this.handleInputKeydown.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.focusInput = this.focusInput.bind(this);

        window.addEventListener("keydown", this.handleKeydown);
        window.addEventListener("resize", this.handleResize);

        this.elements["terminal-input"]?.addEventListener("keydown", this.handleInputKeydown as EventListener);
        this.elements["terminal-content"]?.addEventListener("click", this.focusInput);
        this.elements["term-close"]?.addEventListener("click", () => this.close());
        this.elements["term-minimize"]?.addEventListener("click", () => this.minimize());
        this.elements["term-maximize"]?.addEventListener("click", () => this.toggleMaximize());
        this.elements["terminal-minimized"]?.addEventListener("click", () => this.open());
    }

    private unbindEvents(): void {
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.handleResize);
    }

    private exposeSudoCommand(): void {
        (window as any).sudo = (password?: string) => {
            this.open();
            this.execute(password ? `sudo mode ${password}` : "sudo");
        };
    }

    private handleKeydown(e: KeyboardEvent): void {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            this.state.isOpen && !this.state.isMinimized ? this.close() : this.open();
            return;
        }

        if (!this.state.isOpen) return;

        if (this.snake?.handleInput(e.key, e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            return;
        }

        if (e.key === "Escape") this.close();
    }

    private handleInputKeydown(e: KeyboardEvent): void {
        const input = this.elements["terminal-input"] as HTMLInputElement;

        if (e.key === "Enter") {
            const value = input.value;
            input.value = "";

            if (this.state.inputMode === "password") {
                this.state.passwordCallback?.(value);
                return;
            }
            this.execute(value);
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            if (this.state.inputMode === "password") {
                e.preventDefault();
                return;
            }
            this.navigateHistory(e.key === "ArrowUp" ? -1 : 1);
            e.preventDefault();
        }
    }

    private execute(cmd: string): void {
        if (!cmd.trim()) return;

        this.state.history.push(cmd);
        this.state.historyIndex = this.state.history.length;
        this.print(`\n<span class="text-[#33ff00]">➜</span> <span class="text-[#00ccff]">~</span> ${cmd}`);

        const result = this.processor.process(cmd, {
            lang: this.data.lang,
            projects: this.data.projects,
            contact: this.data.contact,
            about: this.data.about,
            actions: {
                clear: () => this.clearOutput(),
                exit: () => this.close(),
                minimize: () => this.minimize(),
                toggleMatrix: () => this.matrix?.isActive() ? this.matrix.stop() : this.matrix?.start(),
                startGame: (diff) => this.snake?.start(diff as any),
                promptPassword: (callback) => this.handlePasswordPrompt(callback)
            }
        });

        if (result) this.print(result);
        this.saveState();
        this.scrollToBottom();
    }

    private handlePasswordPrompt(callback: (pwd: string) => boolean): void {
        this.state.inputMode = "password";
        let attempts = 0;
        const maxAttempts = 3;

        this.setPromptVisibility(false);
        const input = this.elements["terminal-input"] as HTMLInputElement;
        if (input) input.type = "password";

        this.print(`\n<span class="text-yellow-500">Password: </span>`);

        this.state.passwordCallback = (pwd) => {
            attempts++;
            const success = callback(pwd);

            if (success || attempts >= maxAttempts) {
                this.resetPasswordMode(input);
                if (!success) {
                    this.print(`\n<span class="text-red-500">sudo: 3 incorrect password attempts</span>`);
                }
            } else {
                this.print(`\n<span class="text-red-500">Sorry, try again.</span>`);
                this.print(`\n<span class="text-yellow-500">Password: </span>`);
            }
        };
    }

    private resetPasswordMode(input: HTMLInputElement): void {
        this.state.inputMode = "command";
        this.state.passwordCallback = null;
        this.setPromptVisibility(true);
        if (input) input.type = "text";
    }

    private setPromptVisibility(visible: boolean): void {
        const method = visible ? "remove" : "add";
        this.elements["term-prompt-arrow"]?.classList[method]("hidden");
        this.elements["term-prompt-path"]?.classList[method]("hidden");
    }

    private print(html: string): void {
        const output = this.elements["terminal-output"];
        if (output) output.innerHTML += `<div>${html}</div>`;
    }

    private clearOutput(): void {
        const output = this.elements["terminal-output"];
        if (output) output.innerHTML = "";
    }

    private navigateHistory(direction: number): void {
        const newIndex = this.state.historyIndex + direction;
        if (newIndex >= 0 && newIndex <= this.state.history.length) {
            this.state.historyIndex = newIndex;
            const input = this.elements["terminal-input"] as HTMLInputElement;
            input.value = this.state.history[newIndex] || "";
        }
    }

    private open(): void {
        this.state.isOpen = true;
        this.state.isMinimized = false;
        this.updateUI();
        this.saveState();
        setTimeout(this.focusInput, 50);
    }

    private close(): void {
        this.snake?.stop("user");
        this.matrix?.stop();

        this.state.isOpen = false;
        this.state.isMinimized = false;
        this.state.history = [];
        this.state.historyIndex = -1;

        this.updateUI();
        TerminalStorage.clearSession();

        const output = this.elements["terminal-output"];
        if (output) output.innerHTML = WELCOME_MESSAGE;
    }

    private minimize(): void {
        this.state.isMinimized = true;
        this.updateUI();
        this.saveState();
    }

    private toggleMaximize(): void {
        this.state.isMaximized = !this.state.isMaximized;
        this.updateUI();
        this.saveState();
    }

    private updateUI(): void {
        const { isOpen, isMinimized, isMaximized } = this.state;
        const overlay = this.elements["terminal-overlay"];
        const windowEl = this.elements["terminal-window"];
        const tab = this.elements["terminal-minimized"];

        if (!isOpen) {
            overlay?.classList.add("hidden");
            tab?.classList.add("translate-y-full");
            document.body.style.overflow = "";
            return;
        }

        if (isMinimized) {
            this.applyMinimizedState(overlay, windowEl, tab);
        } else {
            this.applyOpenState(overlay, windowEl, tab, isMaximized);
        }
    }

    private applyMinimizedState(overlay: HTMLElement | null, windowEl: HTMLElement | null, tab: HTMLElement | null): void {
        overlay?.classList.add("hidden");
        tab?.classList.remove("translate-y-full");
        windowEl?.classList.add("scale-0", "opacity-0", "translate-y-[500px]");
        document.body.style.overflow = "";
    }

    private applyOpenState(overlay: HTMLElement | null, windowEl: HTMLElement | null, tab: HTMLElement | null, isMaximized: boolean): void {
        overlay?.classList.remove("hidden");
        tab?.classList.add("translate-y-full");
        windowEl?.classList.remove("scale-0", "opacity-0", "translate-y-[500px]");
        windowEl?.classList.add("scale-100", "opacity-100", "translate-y-0");
        document.body.style.overflow = "hidden";

        const maximizedClasses = ["h-full", "rounded-none"];
        const normalClasses = ["max-w-4xl", "h-[80vh]", "rounded-lg"];

        if (isMaximized) {
            windowEl?.classList.remove(...normalClasses);
            windowEl?.classList.add(...maximizedClasses);
        } else {
            windowEl?.classList.add(...normalClasses);
            windowEl?.classList.remove(...maximizedClasses);
        }
    }

    private saveState(): void {
        TerminalStorage.saveState(this.state);
        TerminalStorage.saveHistory(this.state.history);
        const output = this.elements["terminal-output"];
        if (output) TerminalStorage.saveOutput(output.innerHTML);
    }

    private restoreState(): void {
        const savedState = TerminalStorage.getState();
        if (!savedState) return;

        this.state = { ...this.state, ...savedState };
        this.state.history = TerminalStorage.getHistory();
        this.state.historyIndex = this.state.history.length;

        const output = TerminalStorage.getOutput();
        const outputEl = this.elements["terminal-output"];
        if (output && outputEl) outputEl.innerHTML = output;

        this.updateUI();
    }

    private focusInput(): void {
        this.elements["terminal-input"]?.focus();
    }

    private scrollToBottom(): void {
        const content = this.elements["terminal-content"];
        if (content) content.scrollTop = content.scrollHeight;
    }

    private handleResize(): void {
        this.matrix?.resize();
    }
}

customElements.define("terminal-window", TerminalController);
