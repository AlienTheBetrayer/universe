import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";

export const useStellarHotkeys = () => {
    const [state, setState] = useStellarContext();

    useEffect(() => {
        const handle = (ev: KeyboardEvent) => {
            if(state.tutorialVisible || state.messageBoxVisible)
                return;
            
            const code = ev.key.toLowerCase();
            switch (code) {
                case 'escape':
                    setState(prev => ({ ...prev, selected: false, editing: false }));
                    break;

                case 'arrowright':
                case 'a':
                case 's':
                    if(!state.editing)
                        setState(prev => ({ ... prev, selected: prev.selected === false ? prev.stellars.length - 1 : ( prev.selected < prev.stellars.length - 1 ? prev.selected + 1 : 0)}));
                    break;

                case 'arrowleft':
                case 'd':
                case 'w':
                    if(!state.editing)
                        setState(prev => ({ ...prev, selected: prev.selected === false ? 0 : (prev.selected > 0 ? prev.selected - 1 : prev.stellars.length - 1)}));
                    break;
            }
        };

        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [state.editing, state.tutorialVisible, state.messageBoxVisible]);
}