import type { ForgeCardContent, ForgeCardType, ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_DRAGGING'; idx: number | false; card?: ForgeCardContent }
    | { type: 'SET_EFFECT_SLOT'; idx: number; cardType: ForgeCardType }
    | { type: 'REMOVE_EFFECT_SLOT'; cardType: ForgeCardType }
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
                dragging: { idx: action.idx, card: action.card },
            };
        case 'SET_EFFECT_SLOT': {
            const copy = new Map<number, ForgeCardType>(state.effectSlots);
            for (const [key, val] of copy) {
                if (val === action.cardType) {
                    copy.delete(key);
                    break;
                }
            }
            copy.set(action.idx, action.cardType);

            return { ...state, effectSlots: copy };
        }
        case 'REMOVE_EFFECT_SLOT': {
            const copy = new Map<number, ForgeCardType>(state.effectSlots);
            for (const [key, val] of copy) {
                if (val === action.cardType) {
                    copy.delete(key);
                    break;
                }
            }

            return { ...state, effectSlots: copy };
        }
        case 'CANCEL_CURRENT':
            return { ...state, awaitingCancel: state.dragging.idx };
        case 'RESTORE_CANCEL':
            return { ...state, awaitingCancel: false };
    }
};
