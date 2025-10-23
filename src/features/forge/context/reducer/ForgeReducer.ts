import type { ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_IS_DRAGGING'; flag: boolean }

    // effects
    | { type: 'SET_EFFECT_REF'; idx: number; element: HTMLDivElement | null };

export const ForgeReducer = (
    state: ForgeData,
    action: ForgeReducerAction
): ForgeData => {
    switch (action.type) {
        // dragging
        case 'SET_IS_DRAGGING':
            return { ...state, isDragging: action.flag };

        // effects
        case 'SET_EFFECT_REF': {
            const doesExist = state.effectRefs?.find(
                (r) => r.idx === action.idx
            );

            if (doesExist) {
                return {
                    ...state,
                    effectRefs: state.effectRefs.map((r) =>
                        r.idx === action.idx
                            ? { ...r, element: action.element }
                            : r
                    ),
                };
            } else {
                return {
                    ...state,
                    effectRefs: [
                        ...state.effectRefs,
                        { idx: action.idx, element: action.element },
                    ],
                };
            }
        }
    }
};
