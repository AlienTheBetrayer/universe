import type React from 'react';
import { useEffect } from 'react';
import type { ForgeReducerAction } from '../reducer/ForgeReducer';
import type { ForgeData } from '../types/data';

export const useForgeDrag = (
    state: ForgeData,
    dispatch: React.Dispatch<ForgeReducerAction>
) => {
    useEffect(() => {
        const handle = () => {
            if (!state.cardDraggingIdx)
                return;

            const card = state.cards.find(
                (c) => c.idx === state.cardDraggingIdx
            );

            if (card && state.currentEffectHoveredIdx) {
                dispatch({
                    type: 'SET_EFFECT_SLOT',
                    effectIdx: state.currentEffectHoveredIdx,
                    card,
                });
            }

            dispatch({ type: 'CANCEL_CURRENT_CARD' });
            dispatch({ type: 'SET_DRAGGING_CARD', cardIdx: false });
        };

        window.addEventListener('pointerup', handle);
        window.addEventListener('touchend', handle);

        return () => {
            window.removeEventListener('pointerup', handle);
            window.removeEventListener('touchend', handle);
        };
    }, [state.cardDraggingIdx, state.currentEffectHoveredIdx]);
};
