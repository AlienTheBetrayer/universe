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
            for (let i = 0; i < elements.length; ++i) {
                const bounds = elements[i].getBoundingClientRect();
                const x = cursorRef.current.x;
                const y = cursorRef.current.y;

                if (
                    x >= bounds.left &&
                    x <= bounds.right &&
                    y >= bounds.top &&
                    y <= bounds.bottom
                ) {
                    found = true;
                    dispatch({
                        type: 'SET_EFFECT_SLOT',
                        cardType: state.dragging.card.type,
                        idx: i,
                    });
                    break;
                }
            }

            if (!found) {
                dispatch({ type: 'REMOVE_EFFECT_SLOT', cardType: state.dragging.card.type})
            }

            dispatch({ type: 'SET_DRAGGING', idx: false });
        };

        window.addEventListener('pointerup', handle);
        window.addEventListener('touchend', handle);

        return () => {
            window.removeEventListener('pointerup', handle);
            window.removeEventListener('touchend', handle);
        };
    }, [state]);

    useEffect(() => {
        // if (!found) {
        //     cancelDragging();
        // }
    }, [state.dragging]);

    // useHotkeys([
    //     { hotkey: 'Escape', action: () => dispatch({ type: 'SET_IS_DRAGGING', flag: false })}
    // ])
};
