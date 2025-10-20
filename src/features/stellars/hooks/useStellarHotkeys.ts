import { useEffect } from 'react';
import { useStellarContext } from '../context/StellarContext';

export const useStellarHotkeys = () => {
    const [state, dispatch] = useStellarContext();

    useEffect(() => {
        const handle = (ev: KeyboardEvent) => {
            const code = ev.key.toLowerCase();
            if (code === 'escape') dispatch({ type: 'ESCAPE' });

            if (
                state.isTutorialVisible ||
                state.isMessageBoxVisible ||
                state.movingIdx ||
                state.isMoveWaiting ||
                state.isEditing
            )
                return;

            switch (code) {
                case 'arrowleft':
                case 'a':
                    dispatch({ type: 'STELLAR_PREVIOUS' });
                    break;

                case 'arrowright':
                case 'd':
                    dispatch({ type: 'STELLAR_NEXT' });
                    break;
            }
        };

        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle);
    }, [
        state.isEditing,
        state.isTutorialVisible,
        state.isMessageBoxVisible,
        state.movingIdx,
        state.isMoveWaiting,
    ]);
};
