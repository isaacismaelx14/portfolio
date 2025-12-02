import { TerminalStorage } from "./Storage";

type Difficulty = "easy" | "normal" | "difficult";
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
interface Point { x: number; y: number; }

export interface GameCallbacks {
    onGameOver: (score: number, highScore: number) => void;
    onGameCancel: () => void;
    onInputHide: () => void;
    onInputShow: () => void;
}

export class SnakeGame {
    private outputContainer: HTMLElement;
    private gameContainer: HTMLElement | null = null;
    private interval: any = null;
    private active = false;
    private gameOver = false;

    private snake: Point[] = [];
    private food: Point = { x: 0, y: 0 };
    private direction: Direction = "RIGHT";
    private nextDirection: Direction = "RIGHT";
    private score = 0;
    private highScore = 0;
    private difficulty: Difficulty = "normal";
    private speed = 100;
    private readonly gridSize = { w: 40, h: 20 };

    private callbacks: GameCallbacks;

    constructor(outputContainer: HTMLElement, callbacks: GameCallbacks) {
        this.outputContainer = outputContainer;
        this.callbacks = callbacks;
    }

    start(difficulty: Difficulty = "normal"): void {
        if (this.active) return;

        this.active = true;
        this.gameOver = false;
        this.score = 0;
        this.difficulty = difficulty;
        this.highScore = TerminalStorage.getSnakeHighScore(difficulty);

        switch (difficulty) {
            case "easy": this.speed = 150; break;
            case "normal": this.speed = 100; break;
            case "difficult": this.speed = 60; break;
        }

        this.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
        this.direction = "RIGHT";
        this.nextDirection = "RIGHT";

        // Clear terminal for immersion
        this.outputContainer.innerHTML = "";
        this.callbacks.onInputHide();

        this.spawnFood();
        this.createGameContainer();

        this.interval = setInterval(() => this.loop(), this.speed);
    }

    stop(reason: "collision" | "user" = "user"): void {
        if (!this.active) return;
        this.active = false;
        clearInterval(this.interval);

        if (reason === "collision") {
            this.gameOver = true;
            this.renderGameOver();
        } else {
            this.renderCancel();
            this.callbacks.onGameCancel();
            this.callbacks.onInputShow();
        }

        if (this.score > this.highScore) {
            TerminalStorage.setSnakeHighScore(this.difficulty, this.score);
        }
    }

    handleInput(key: string, ctrlKey: boolean): boolean {
        if (this.active) {
            if (ctrlKey && key === "c") {
                this.stop("user");
                return true;
            }
            if (key === "Escape") {
                this.stop("user");
                return true;
            }

            if (key === "ArrowUp" && this.direction !== "DOWN") this.nextDirection = "UP";
            else if (key === "ArrowDown" && this.direction !== "UP") this.nextDirection = "DOWN";
            else if (key === "ArrowLeft" && this.direction !== "RIGHT") this.nextDirection = "LEFT";
            else if (key === "ArrowRight" && this.direction !== "LEFT") this.nextDirection = "RIGHT";

            return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key);
        }

        if (this.gameOver) {
            if (key.toLowerCase() === "r") {
                this.start(this.difficulty);
                return true;
            } else if (key.toLowerCase() === "q") {
                this.gameOver = false;
                this.outputContainer.innerHTML += `\n<div>Game session ended.</div>`;
                this.callbacks.onInputShow();
                return true;
            }
        }

        return false;
    }

    isActive(): boolean {
        return this.active;
    }

    isGameOver(): boolean {
        return this.gameOver;
    }

    private createGameContainer(): void {
        this.gameContainer = document.createElement("div");
        this.gameContainer.id = "snake-game";
        this.gameContainer.className = "font-mono leading-none my-4 select-none text-lg md:text-xl tracking-wider";
        this.gameContainer.style.whiteSpace = "pre";
        this.outputContainer.appendChild(this.gameContainer);
    }

    private spawnFood(): void {
        let valid = false;
        while (!valid) {
            this.food = {
                x: Math.floor(Math.random() * this.gridSize.w),
                y: Math.floor(Math.random() * this.gridSize.h),
            };
            valid = !this.snake.some(s => s.x === this.food.x && s.y === this.food.y);
        }
    }

    private loop(): void {
        this.direction = this.nextDirection;
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case "UP": head.y--; break;
            case "DOWN": head.y++; break;
            case "LEFT": head.x--; break;
            case "RIGHT": head.x++; break;
        }

        if (head.x < 0 || head.x >= this.gridSize.w || head.y < 0 || head.y >= this.gridSize.h ||
            this.snake.some(s => s.x === head.x && s.y === head.y)) {
            this.stop("collision");
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.spawnFood();
        } else {
            this.snake.pop();
        }

        this.render();
    }

    private render(): void {
        if (!this.gameContainer) return;

        let output = `Score: ${this.score} | High Score: ${this.highScore} (${this.difficulty})\n`;
        output += `+${"-".repeat(this.gridSize.w)}+`;

        const grid = Array(this.gridSize.h).fill(null).map(() => Array(this.gridSize.w).fill(" "));

        this.snake.forEach((p, i) => {
            grid[p.y][p.x] = i === 0 ? "O" : "o";
        });
        grid[this.food.y][this.food.x] = "@";

        for (let y = 0; y < this.gridSize.h; y++) {
            output += `\n|${grid[y].join("")}|`;
        }
        output += `\n+${"-".repeat(this.gridSize.w)}+`;

        this.gameContainer.innerText = output;
    }

    private renderGameOver(): void {
        if (this.gameContainer) {
            this.gameContainer.innerHTML += `\n\n<span class="text-red-500 font-bold">GAME OVER</span>\nScore: ${this.score}\n<span class="text-gray-400">Press 'r' to retry, 'q' to quit</span>`;
        }
    }

    private renderCancel(): void {
        if (this.gameContainer) {
            this.gameContainer.innerHTML += `\n\n<span class="text-yellow-500">Game Cancelled</span>`;
        }
    }
}
