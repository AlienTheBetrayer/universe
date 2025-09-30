import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";

export const useStellarHotkeys = () => {
    const [, dispatch] = useStellarContext();

    useEffect(() => {
        const handle = (ev: KeyboardEvent) => {
            const code = ev.key;
            switch(code) {
                case 'Escape':
                    dispatch({ type: 'select', idx: -1 });
                break;

                case 'ArrowRight':
                    dispatch({ type: 'select_next' });
                break;

                case 'ArrowLeft':
                    dispatch({ type: 'select_previous' });
                break;
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, []);
}