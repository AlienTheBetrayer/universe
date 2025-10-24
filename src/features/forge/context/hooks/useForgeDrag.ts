import type React from 'react';
import { useEffect } from 'react';
import { useCursorRef } from '../../../../hooks/useCursorRef';
import type { ForgeReducerAction } from '../reducer/ForgeReducer';
import type { ForgeData } from '../types/data';

export const useForgeDrag = (
    state: ForgeData,
    dispatch: React.Dispatch<ForgeReducerAction>
) => {
    const cursorRef = useCursorRef();

    useEffect(() => {
        const handle = () => {
            if (!state.dragging) return;

            const effectElements =
                document.querySelectorAll<HTMLDivElement>('.forge-effect');

            for (
                let elementIdx = 0;
                elementIdx < effectElements.length;
                ++elementIdx
            ) {
                const bounds =
                    effectElements[elementIdx].getBoundingClientRect();
                const x = cursorRef.current.x;
                const y = cursorRef.current.y;

                if (
                    x >= bounds.left &&
                    x <= bounds.right &&
                    y >= bounds.top &&
                    y <= bounds.bottom
                ) {
                    dispatch({
                        type: 'SET_EFFECT_SLOT',
                        effectIdx: elementIdx,
                        card: state.dragging,
                    });
                    break;
                }
            }

            dispatch({ type: 'CANCEL_CURRENT' });
            dispatch({ type: 'SET_DRAGGING', card: undefined });
        };

        window.addEventListener('pointerup', handle);
        window.addEventListener('touchend', handle);

        return () => {
            window.removeEventListener('pointerup', handle);
            window.removeEventListener('touchend', handle);
        };
    }, [state.dragging, state.effectSlots]);
};
