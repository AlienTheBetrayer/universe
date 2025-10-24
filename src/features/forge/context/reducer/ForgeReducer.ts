import type { ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_DRAGGING'; cardIdx: number | false }

    // effect
    | { type: 'SET_EFFECT_SLOT'; effectIdx: number; cardIdx: number }
    | { type: 'REMOVE_EFFECT_SLOT'; cardIdx: number | false }

    // cancel
    | { type: 'CANCEL_CURRENT' }
    | { type: 'RESTORE_CANCEL' };

export const ForgeReducer = (
    state: ForgeData,
    action: ForgeReducerAction
): ForgeData => {
    switch (action.type) {
        // dragging
        case 'SET_DRAGGING':
            return {
                ...state,
                dragging: action.cardIdx,
            };

        // effects
        case 'SET_EFFECT_SLOT': {
            const copy = new Map<number, number>(state.effectSlots);
            for (const [key, val] of copy) {
                if (val === action.cardIdx) {
                    copy.delete(key);
                    break;
                }
            }
            copy.set(action.effectIdx, action.cardIdx);

            return { ...state, effectSlots: copy };
        }
        case 'REMOVE_EFFECT_SLOT': {
            const copy = new Map<number, number>(state.effectSlots);
            for (const [key, val] of copy) {
                if (val === action.cardIdx) {
                    copy.delete(key);
                    break;
                }
            }

            return { ...state, effectSlots: copy };
        }

        // cancel
        case 'CANCEL_CURRENT':
            return state.dragging
                ? { ...state, awaitingCancel: state.dragging }
                : state;
        case 'RESTORE_CANCEL':
            return { ...state, awaitingCancel: false };
    }
};
