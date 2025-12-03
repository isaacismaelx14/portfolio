export interface SudoPrefs {
    goat?: boolean;
    debug?: boolean;
    matrix?: boolean;
}

const STORAGE_KEY = "sudo_prefs";

export const SudoService = {
    getPrefs(): SudoPrefs {
        try {
            return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        } catch {
            return {};
        }
    },

    savePrefs(prefs: Partial<SudoPrefs>) {
        const current = this.getPrefs();
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...prefs }));
    },

    applyPrefs() {
        const prefs = this.getPrefs();

        if (prefs.goat) {
            document.designMode = "on";
            document.body.classList.add("cursor-text");
        }

        if (prefs.debug) {
            document.documentElement.classList.add("debug-mode");
        }

        if (prefs.matrix) {
            document.documentElement.classList.add("theme-matrix");
        }
    },

    toggleGoat(enable: boolean) {
        document.designMode = enable ? "on" : "off";
        if (enable) {
            document.body.classList.add("cursor-text");
        } else {
            document.body.classList.remove("cursor-text");
        }
        this.savePrefs({ goat: enable });
    },

    toggleDebug(enable: boolean) {
        document.documentElement.classList.toggle("debug-mode", enable);
        this.savePrefs({ debug: enable });
    },

    toggleMatrix(enable: boolean) {
        document.documentElement.classList.toggle("theme-matrix", enable);
        this.savePrefs({ matrix: enable });
    },

    unlockSudoMode() {
        const state = JSON.parse(sessionStorage.getItem("terminal_state") || "{}");
        state.sudo_mode = true;
        sessionStorage.setItem("terminal_state", JSON.stringify(state));
        window.dispatchEvent(new CustomEvent("sudo-mode-unlocked"));
    },

    isSudoUnlocked(): boolean {
        const state = JSON.parse(sessionStorage.getItem("terminal_state") || "{}");
        return !!state.sudo_mode;
    }
};
