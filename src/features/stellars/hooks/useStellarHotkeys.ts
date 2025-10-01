import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";

export const useStellarHotkeys = () => {
    const [, dispatch] = useStellarContext();

    useEffect(() => {
        const handle = (ev: KeyboardEvent) => {
            const code = ev.key.toLowerCase();
            switch (code) {
                case 'escape':
                    dispatch({ type: 'unselect' });
                    break;

                case 'arrowright':
                case 'a':
                case 's':
                    dispatch({ type: 'select_next' });
                    break;

                case 'arrowleft':
                case 'd':
                case 'w':
                    dispatch({ type: 'select_previous' });
                    break;
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);
}