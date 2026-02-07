import { SudoService } from "../../../scripts/sudo";

export interface CommandContext {
    lang: string;
    projects: any[];
    contact: any;
    about: string;
    actions: {
        clear: () => void;
        exit: () => void;
        minimize: () => void;
        toggleMatrix: () => void;
        startGame: (difficulty: string) => void;
        promptPassword: (callback: (pwd: string) => boolean) => void;
    };
}

export class CommandProcessor {
    private routes: Record<string, string> = {
        "/": "Home",
        "/about": "About",
        "/projects": "Projects",
        "/contact": "Contact",
        "/changelog": "Changelog",
    };

    process(cmdStr: string, ctx: CommandContext): string | void {
        const trimmed = cmdStr.trim();
        if (!trimmed) return;

        const [cmd, ...args] = trimmed.split(" ");

        switch (cmd.toLowerCase()) {
            case "help":
                return this.getHelp();
            case "ls":
                return this.getLs();
            case "cd":
                return this.handleCd(args[0], ctx.lang);
            case "about":
                return this.getAbout(ctx.about);
            case "projects":
                return this.getProjects(ctx.projects);
            case "contact":
                return this.getContact(ctx.contact);
            case "clear":
                ctx.actions.clear();
                return "";
            case "exit":
                ctx.actions.exit();
                return "Closing session...";
            case "matrix":
                ctx.actions.toggleMatrix();
                return "Toggling Matrix...";
            case "game":
                return this.handleGame(args[0], ctx);
            case "download":
                return this.handleDownload(ctx);
            case "sudo":
                return this.handleSudo(args, ctx);
            default:
                return `<span class="text-red-500">Command not found: ${cmd}. Type 'help' for available commands.</span>`;
        }
    }

    private handleSudo(args: string[], ctx: CommandContext): string | void {
        const subCmd = args[0]?.toLowerCase();

        if (args.includes("--help") || args.includes("-h")) {
            return `
<div class="mb-2"><span class="text-white font-bold">Sudo Help</span></div>
<div class="mb-2 text-gray-300">To gain root access, you must find the 4 hidden digits scattered across the system.</div>
<div class="grid grid-cols-[120px_1fr] gap-2 mb-2 text-sm">
  <span class="text-[#00ccff]">Hint 1</span> <span>Hover over the identity.</span>
  <span class="text-[#00ccff]">Hint 2</span> <span>The terminal knows itself.</span>
  <span class="text-[#00ccff]">Hint 3</span> <span>Check the bottom line.</span>
  <span class="text-[#00ccff]">Hint 4</span> <span>Skills are key.</span>
</div>
<div class="text-gray-400 text-xs">Usage: sudo su</div>`;
        }

        if (subCmd === "su") {
            ctx.actions.promptPassword((password) => {
                if (password === "7429") {
                    SudoService.unlockSudoMode();

                    const output = document.getElementById("terminal-output");
                    if (output) {
                        output.innerHTML += `<div><span class="text-[#33ff00] font-bold">ACCESS GRANTED.</span><br/><span class="text-white">Root access enabled.</span></div>`;
                        output.scrollTop = output.scrollHeight;
                    }
                    return true;
                }
                return false;
            });
            return;
        }

        return `<span class="text-yellow-500">Usage: sudo su</span><br/><span class="text-gray-400">Try 'sudo --help' for hints.</span>`;
    }

    private getHelp(): string {
        return `
<div class="grid grid-cols-[100px_1fr] gap-2">
  <span class="text-white">ls</span>       <span>List available pages</span>
  <span class="text-white">cd [path]</span><span>Navigate to a page</span>
  <span class="text-white">about</span>    <span>Display info</span>
  <span class="text-white">projects</span> <span>List projects</span>
  <span class="text-white">contact</span>  <span>Show contact info</span>
  <span class="text-white">download</span> <span>Download Resume (PDF)</span>
  <span class="text-white">game</span>     <span>Play Snake</span>
  <span class="text-white">clear</span>    <span>Clear screen</span>
  <span class="text-white">matrix</span>   <span>Toggle Matrix</span>
  <span class="text-white">exit</span>     <span>Close terminal</span>
</div>`;
    }

    private getLs(): string {
        return Object.entries(this.routes)
            .map(([path, name]) => `<div class="text-[#00ccff]">${name} <span class="text-gray-500">(${path})</span></div>`)
            .join("");
    }

    private handleCd(path: string, lang: string): string {
        if (!path) return `<span class="text-yellow-500">Usage: cd [path]</span>`;

        if (this.routes[path] || path === "..") {
            const target = path === ".." ? `/${lang}` : (path === "/" ? `/${lang}` : `/${lang}${path}`);
            window.location.href = target;
            return `Navigating to ${path}...`;
        }
        return `<span class="text-red-500">Path not found: ${path}</span>`;
    }

    private getAbout(text: string): string {
        return `
<div class="mb-2"><span class="text-white font-bold">Isaac Martinez</span><br/>Full Stack Developer</div>
<p class="mb-2 text-gray-300">${text}</p>
<div><span class="text-gray-400">Tech Stack:</span> Node.js, TypeScript, React, Astro, AWS, Docker.</div>`;
    }

    private getProjects(projects: any[]): string {
        return projects.map((p, i) => `
<div class="mb-2">
  <span class="text-white font-bold">${i + 1}. ${p.title}</span>
  <div class="pl-4 text-gray-400 text-sm">${p.description}</div>
  <div class="pl-4"><a href="${p.link}" target="_blank" class="text-[#00ccff] underline hover:text-white text-xs">View Project</a></div>
</div>`).join("");
    }

    private getContact(contact: any): string {
        return `
<div class="grid grid-cols-[100px_1fr] gap-2">
  <span class="text-white">Email</span>    <a href="mailto:${contact.email}" class="underline hover:text-white">${contact.email}</a>
  <span class="text-white">GitHub</span>   <a href="https://${contact.github}" target="_blank" class="underline hover:text-white">${contact.github}</a>
  <span class="text-white">LinkedIn</span> <a href="https://${contact.linkedin}" target="_blank" class="underline hover:text-white">${contact.linkedin}</a>
  <span class="text-white">Location</span> <span>${contact.location}</span>
</div>`;
    }

    private handleGame(arg: string, ctx: CommandContext): string | void {
        const difficulty = arg?.toLowerCase();
        if (difficulty === "--help" || difficulty === "-h") {
            return `
<div class="mb-2"><span class="text-white font-bold">Snake Game Help</span></div>
<div class="grid grid-cols-[120px_1fr] gap-2 mb-2">
  <span class="text-[#00ccff]">Usage</span> <span>game [difficulty]</span>
  <span class="text-[#00ccff]">Difficulties</span> <span>easy, normal, difficult</span>
</div>
<div class="mb-2">
  <span class="text-gray-400">Controls:</span>
  <ul class="list-disc pl-5 text-sm text-gray-300">
    <li>Arrow Keys: Move</li>
    <li>Ctrl+C / ESC: Cancel</li>
    <li>r: Retry</li>
    <li>q: Quit</li>
  </ul>
</div>`;
        }

        if (!difficulty || ["easy", "normal", "difficult"].includes(difficulty)) {
            ctx.actions.startGame(difficulty || "normal");
            return;
        }

        ctx.actions.startGame("normal");
        return `<span class="text-yellow-500">Unknown difficulty. Starting normal...</span>`;
    }

    private handleDownload(ctx: CommandContext): string {
        if (window.location.pathname.includes("/about")) {
            const btn = document.getElementById("download-resume-btn");
            if (btn) {
                btn.click();
                setTimeout(() => ctx.actions.minimize(), 800);
                return "Initiating download...";
            }
            return '<span class="text-red-500">Error: Download module not found.</span>';
        }

        sessionStorage.setItem("trigger-resume-download", "true");
        setTimeout(() => ctx.actions.minimize(), 800);
        setTimeout(() => window.location.href = `/${ctx.lang}/about`, 1500);
        return "Redirecting to secure channel...";
    }
}
