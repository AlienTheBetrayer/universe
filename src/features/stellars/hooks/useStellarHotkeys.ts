import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";

export const useStellarHotkeys = () => {
    const [state, dispatch] = useStellarContext();

    useEffect(() => {
        const handle = (ev: KeyboardEvent) => {
            const code = ev.key.toLowerCase();
            switch (code) {
                case 'escape':
                    dispatch({ type: 'go_back' });
                    break;

                case 'arrowright':
                case 'a':
                case 's':
                    if(!state.editing)
                        dispatch({ type: 'select_next' });
                    break;

                case 'arrowleft':
                case 'd':
                case 'w':
                    if(!state.editing)
                        dispatch({ type: 'select_previous' });
                    break;
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [state.editing]);
}