import type { ForgeCardData, ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_DRAGGING'; card: ForgeCardData | undefined }

    // effect
    | { type: 'SET_EFFECT_SLOT'; effectIdx: number; card: ForgeCardData }
    | { type: 'REMOVE_EFFECT_SLOT'; card: ForgeCardData }

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
                dragging: action.card,
            };

        // effects
        case 'SET_EFFECT_SLOT': {
            const copy = new Map<number, ForgeCardData>(state.effectSlots);
            for (const [key, val] of copy) {
                if (val === action.card) {
                    copy.delete(key);
                    break;
                }
            }
            copy.set(action.effectIdx, action.card);

            return { ...state, effectSlots: copy };
        }
        case 'REMOVE_EFFECT_SLOT': {
            const copy = new Map<number, ForgeCardData>(state.effectSlots);
            for (const [key, val] of copy) {
                if (val === action.card) {
                    copy.delete(key);
                    break;
                }
            }

            return { ...state, effectSlots: copy };
        }

        // cancel
        case 'CANCEL_CURRENT':
            return state.dragging
                ? { ...state, awaitingCancel: state.dragging.idx }
                : state;
        case 'RESTORE_CANCEL':
            return { ...state, awaitingCancel: false };
    }
};
