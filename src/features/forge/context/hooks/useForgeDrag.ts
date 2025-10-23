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
            if (state.dragging.idx === false || !state.dragging.card) return;

            const elements =
                document.querySelectorAll<HTMLDivElement>('.forge-effect');

            let found = false;
            for (
                let elementIdx = 0;
                elementIdx < elements.length;
                ++elementIdx
            ) {
                const bounds = elements[elementIdx].getBoundingClientRect();
                const x = cursorRef.current.x;
                const y = cursorRef.current.y;

                if (
                    x >= bounds.left &&
                    x <= bounds.right &&
                    y >= bounds.top &&
                    y <= bounds.bottom
                ) {
                    found = true;
                    if (state.effectSlots.has(elementIdx) && state.effectSlots.get(elementIdx) !== state.dragging.card.type) {
                        dispatch({
                            type: 'REMOVE_EFFECT_SLOT',
                            cardType: state.dragging.card.type,
                        });
                        dispatch({ type: 'CANCEL_CURRENT' });
                    } else {
                        dispatch({
                            type: 'SET_EFFECT_SLOT',
                            idx: elementIdx,
                            cardType: state.dragging.card.type,
                        });
                    }
                    break;
                }
            }

            if (!found) {
                dispatch({
                    type: 'REMOVE_EFFECT_SLOT',
                    cardType: state.dragging.card.type,
                });
                dispatch({ type: 'CANCEL_CURRENT' });
            }

            dispatch({ type: 'CANCEL_CURRENT' });
            dispatch({ type: 'SET_DRAGGING', idx: false });
        };

        window.addEventListener('pointerup', handle);
        window.addEventListener('touchend', handle);

        return () => {
            window.removeEventListener('pointerup', handle);
            window.removeEventListener('touchend', handle);
        };
    }, [state]);
};
