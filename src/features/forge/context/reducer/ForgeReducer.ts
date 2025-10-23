import type { ForgeCardContent, ForgeCardType, ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_DRAGGING'; idx: number | false; card?: ForgeCardContent }
    | { type: 'SET_EFFECT_SLOT'; idx: number; cardType: ForgeCardType }
    | { type: 'REMOVE_EFFECT_SLOT'; cardType: ForgeCardType };

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
            copy.forEach((val, key) => {
                if (val === action.cardType) {
                    copy.delete(key);
                }
            });
            copy.set(action.idx, action.cardType);
            return { ...state, effectSlots: copy };
        }
        case 'REMOVE_EFFECT_SLOT': {
            const copy = new Map<number, ForgeCardType>(state.effectSlots);
            copy.forEach((val, key) => {
                if (val === action.cardType) {
                    copy.delete(key);
                }
            });
            return { ...state, effectSlots: copy };
        }
    }
};
