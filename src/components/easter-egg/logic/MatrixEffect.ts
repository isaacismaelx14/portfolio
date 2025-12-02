export class MatrixEffect {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private interval: any = null;
    private drops: number[] = [];
    private readonly fontSize = 14;
    private readonly chars = "0123456789ABCDEF";

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.resize();
    }

    start(): void {
        if (this.interval) return;
        this.canvas.classList.remove("hidden");
        this.interval = setInterval(() => this.draw(), 33);
    }

    stop(): void {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = null;
        this.canvas.classList.add("hidden");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const columns = this.canvas.width / this.fontSize;
        this.drops = Array(Math.floor(columns)).fill(1);
    }

    private draw(): void {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#0F0";
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    isActive(): boolean {
        return !!this.interval;
    }
}
