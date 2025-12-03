import { TerminalStorage } from "./Storage";
import { MatrixEffect } from "./MatrixEffect";
import { SnakeGame } from "./SnakeGame";
import { CommandProcessor } from "./CommandProcessor";

export class TerminalController extends HTMLElement {
    private elements: Record<string, HTMLElement | null> = {};
    private matrix: MatrixEffect | null = null;
    private snake: SnakeGame | null = null;
    private processor: CommandProcessor;

    private state = {
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        history: [] as string[],
        historyIndex: -1,
        inputMode: "command" as "command" | "password",
        passwordCallback: null as ((password: string) => void) | null,
    };

    // ... (existing code)



    private data = {
        projects: [],
        contact: {},
        about: "",
        lang: "en",
    };

    constructor() {
        super();
        this.processor = new CommandProcessor();
    }

    connectedCallback() {
        this.initElements();
        this.loadData();
        this.initComponents();
        this.restoreState();
        this.bindEvents();

        // Expose sudo trigger to console
        (window as any).sudo = (password?: string) => {
            this.open();
            if (password) {
                this.execute(`sudo mode ${password}`);
            } else {
                this.execute("sudo");
            }
        };
    }

    disconnectedCallback() {
        this.unbindEvents();
        this.matrix?.stop();
        this.snake?.stop("user");
    }

    private initElements() {
        const ids = [
            "terminal-overlay", "terminal-window", "terminal-minimized",
            "terminal-input", "terminal-input-line", "terminal-output",
            "terminal-content", "matrix-canvas", "term-close",
            "term-minimize", "term-maximize", "term-prompt-arrow", "term-prompt-path"
        ];
        ids.forEach(id => this.elements[id] = this.querySelector(`#${id}`));
    }

    private loadData() {
        try {
            this.data.projects = JSON.parse(this.dataset.projects || "[]");
            this.data.contact = JSON.parse(this.dataset.contact || "{}");
            this.data.about = this.dataset.about || "";
            this.data.lang = this.dataset.lang || "en";
        } catch (e) {
            console.error("Failed to load terminal data", e);
        }
    }

    private initComponents() {
        if (this.elements["matrix-canvas"]) {
            this.matrix = new MatrixEffect(this.elements["matrix-canvas"] as HTMLCanvasElement);
        }
        if (this.elements["terminal-output"]) {
            this.snake = new SnakeGame(this.elements["terminal-output"], {
                onGameOver: () => this.saveState(),
                onGameCancel: () => this.saveState(),
                onInputHide: () => this.elements["terminal-input-line"]?.classList.add("hidden"),
                onInputShow: () => {
                    this.elements["terminal-input-line"]?.classList.remove("hidden");
                    this.focusInput();
                }
            });
        }
    }

    private bindEvents() {
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
        this.elements["term-maximize"]?.addEventListener("click", () => this.maximize());
        this.elements["terminal-minimized"]?.addEventListener("click", () => this.open());
    }

    private unbindEvents() {
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.handleResize);
    }

    private handleKeydown(e: KeyboardEvent) {
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

    private handleInputKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            const input = this.elements["terminal-input"] as HTMLInputElement;
            const value = input.value;
            input.value = "";

            if (this.state.inputMode === "password") {
                if (this.state.passwordCallback) {
                    this.state.passwordCallback(value);
                }
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

    private execute(cmd: string) {
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
                clear: () => { if (this.elements["terminal-output"]) this.elements["terminal-output"].innerHTML = ""; },
                exit: () => this.close(),
                minimize: () => this.minimize(),
                toggleMatrix: () => this.matrix?.isActive() ? this.matrix.stop() : this.matrix?.start(),
                startGame: (diff) => this.snake?.start(diff as any),
                promptPassword: (callback: (pwd: string) => boolean) => this.handlePasswordPrompt(callback)
            }
        });

        if (result) this.print(result);
        this.saveState();
        this.scrollToBottom();
    }

    private handlePasswordPrompt(callback: (pwd: string) => boolean) {
        this.state.inputMode = "password";
        let attempts = 0;
        const maxAttempts = 3;

        // Hide prompt and change input type
        if (this.elements["term-prompt-arrow"]) this.elements["term-prompt-arrow"].classList.add("hidden");
        if (this.elements["term-prompt-path"]) this.elements["term-prompt-path"].classList.add("hidden");
        const input = this.elements["terminal-input"] as HTMLInputElement;
        if (input) input.type = "password";

        this.print(`\n<span class="text-yellow-500">Password: </span>`);

        this.state.passwordCallback = (pwd) => {
            attempts++;
            const success = callback(pwd);

            if (success || attempts >= maxAttempts) {
                this.state.inputMode = "command";
                this.state.passwordCallback = null;

                // Restore prompt and input type
                if (this.elements["term-prompt-arrow"]) this.elements["term-prompt-arrow"].classList.remove("hidden");
                if (this.elements["term-prompt-path"]) this.elements["term-prompt-path"].classList.remove("hidden");
                if (input) input.type = "text";

                if (!success) {
                    this.print(`\n<span class="text-red-500">sudo: 3 incorrect password attempts</span>`);
                }
            } else {
                this.print(`\n<span class="text-red-500">Sorry, try again.</span>`);
                this.print(`\n<span class="text-yellow-500">Password: </span>`);
            }
        };
    }

    private print(html: string) {
        if (this.elements["terminal-output"]) {
            this.elements["terminal-output"].innerHTML += `<div>${html}</div>`;
        }
    }

    private navigateHistory(direction: number) {
        const newIndex = this.state.historyIndex + direction;
        if (newIndex >= 0 && newIndex <= this.state.history.length) {
            this.state.historyIndex = newIndex;
            const input = this.elements["terminal-input"] as HTMLInputElement;
            input.value = this.state.history[newIndex] || "";
        }
    }

    private open() {
        this.state.isOpen = true;
        this.state.isMinimized = false;
        this.updateUI();
        this.saveState();
        setTimeout(this.focusInput, 50);
    }

    private close() {
        this.snake?.stop("user");
        this.matrix?.stop();

        this.state.isOpen = false;
        this.state.isMinimized = false;
        this.updateUI();
        TerminalStorage.clearSession();
        this.state.history = [];
        this.state.historyIndex = -1;
        if (this.elements["terminal-output"]) {
            this.elements["terminal-output"].innerHTML = `
                <div class="mb-4">
                    <p>Welcome to Terminal Mode v1.1.0</p>
                    <p>Type <span class="text-white">'help'</span> to see available commands.</p>
                </div>`;
        }
    }

    private minimize() {
        this.state.isMinimized = true;
        this.updateUI();
        this.saveState();
    }

    private maximize() {
        this.state.isMaximized = !this.state.isMaximized;
        this.updateUI();
        this.saveState();
    }

    private updateUI() {
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
            overlay?.classList.add("hidden");
            tab?.classList.remove("translate-y-full");
            windowEl?.classList.add("scale-0", "opacity-0", "translate-y-[500px]");
            document.body.style.overflow = "";
        } else {
            overlay?.classList.remove("hidden");
            tab?.classList.add("translate-y-full");
            windowEl?.classList.remove("scale-0", "opacity-0", "translate-y-[500px]");
            windowEl?.classList.add("scale-100", "opacity-100", "translate-y-0");
            document.body.style.overflow = "hidden";

            if (isMaximized) {
                windowEl?.classList.remove("max-w-4xl", "h-[80vh]", "rounded-lg");
                windowEl?.classList.add("h-full", "rounded-none");
            } else {
                windowEl?.classList.add("max-w-4xl", "h-[80vh]", "rounded-lg");
                windowEl?.classList.remove("h-full", "rounded-none");
            }
        }
    }

    private saveState() {
        TerminalStorage.saveState(this.state);
        TerminalStorage.saveHistory(this.state.history);
        if (this.elements["terminal-output"]) {
            TerminalStorage.saveOutput(this.elements["terminal-output"].innerHTML);
        }
    }

    private restoreState() {
        const savedState = TerminalStorage.getState();
        if (savedState) {
            this.state = { ...this.state, ...savedState };
            this.state.history = TerminalStorage.getHistory();
            this.state.historyIndex = this.state.history.length;

            const output = TerminalStorage.getOutput();
            if (output && this.elements["terminal-output"]) {
                this.elements["terminal-output"].innerHTML = output;
            }

            this.updateUI();
        }
    }

    private focusInput() {
        this.elements["terminal-input"]?.focus();
    }

    private scrollToBottom() {
        if (this.elements["terminal-content"]) {
            this.elements["terminal-content"].scrollTop = this.elements["terminal-content"].scrollHeight;
        }
    }

    private handleResize() {
        this.matrix?.resize();
    }
}

customElements.define("terminal-window", TerminalController);
