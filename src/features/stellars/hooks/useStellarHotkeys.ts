import { useEffect } from "react"
import { useStellarContext } from "../context/StellarContext";

export const useStellarHotkeys = () => {
    const [state, setState] = useStellarContext();

    useEffect(() => {
        const handle = (ev: KeyboardEvent) => {
            const code = ev.key.toLowerCase();
            if(code === 'escape') {
                setState(prev => ({ ...prev, selected: false, isEditing: false, moving: false, isMoveWaiting: false, tutorialVisible: false, messageBoxVisible: false }));
            }

            if(state.tutorialVisible || state.messageBoxVisible || state.moving || state.isMoveWaiting)
                return;
            
            switch (code) {
                case 'arrowleft':
                case 'a':
                    if(!state.isEditing) {
                        setState(prev => {
                            const indexes = prev.stellars.map(s => s.idx);
                            indexes.sort();
                            return { ...prev, selected: prev.selected === false ? indexes[0] : (prev.selected === indexes[0] ? indexes.at(-1)! : indexes[indexes.indexOf(prev.selected) - 1]) };
                        });
                    }
                    break;

                case 'arrowright':
                case 'd':
                    if(!state.isEditing) {
                        setState(prev => {
                            const indexes = prev.stellars.map(s => s.idx);
                            indexes.sort();
                            return { ...prev, selected: prev.selected === false ? indexes.at(-1)! : (prev.selected === indexes.at(-1)! ? indexes[0] : indexes[indexes.indexOf(prev.selected) + 1]) };
                        });
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [state.isEditing, state.tutorialVisible, state.messageBoxVisible, state.moving, state.isMoveWaiting]);
}