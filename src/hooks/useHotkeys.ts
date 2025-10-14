import { useEffect } from "react"

interface HotkeyAction {
    hotkey: string;
    action: () => void;
    ctrl?: boolean;
}

export const useHotkeys = (hotkeys: HotkeyAction[]) => {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            const active = document.activeElement as HTMLElement | null;
            if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
                return;
            }

            const match = hotkeys.find(h => h.hotkey.toLowerCase() === e.key.toLowerCase());
            if(match) {
                if(match.ctrl === true) {
                    if(e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        match.action();
                    }
                } else {
                    e.preventDefault();
                    match.action();
                }
            }
        }

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [hotkeys]);
}