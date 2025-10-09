import { useEffect } from "react"

interface HotkeyAction {
    hotkey: string;
    action: () => void;
}

export const useHotkeys = (hotkeys: HotkeyAction[]) => {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            const match = hotkeys.find(h => h.hotkey.toLowerCase() === e.key.toLowerCase());
            if(match) {
                e.preventDefault();
                match?.action();
                console.log('dfsdfsdf');
            }
        }

        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [hotkeys]);
}