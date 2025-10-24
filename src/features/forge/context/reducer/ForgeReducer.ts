import type { ForgeCardData } from '../types/cards';
import type { ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_DRAGGING'; cardIdx: number | false }

    // effect
    | { type: 'SET_EFFECT_SLOT'; effectIdx: number; card: ForgeCardData }
    | { type: 'REMOVE_EFFECT_SLOT'; cardIdx: number }

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
                cardDraggingIdx: action.cardIdx,
            };

        // effects
        case 'SET_EFFECT_SLOT': {
            let found = false;
            const newEffectSlots = state.effectSlots.map((e) => {
                if (e.effectIdx === action.effectIdx) {
                    found = true;
                    return { ...e, card: action.card };
                } else {
                    return e;
                }
            });

            if (!found) {
                return {
                    ...state,
                    effectSlots: [
                        ...state.effectSlots,
                        {
                            effectIdx: action.effectIdx,
                            card: action.card,
                        },
                    ],
                };
            } else {
                return { ...state, effectSlots: newEffectSlots };
            }
        }
        case 'REMOVE_EFFECT_SLOT': {
            return {
                ...state,
                effectSlots: state.effectSlots.filter(
                    (e) => e.card.idx !== action.cardIdx
                ),
            };
        }

        // cancel
        case 'CANCEL_CURRENT':
            return state.cardDraggingIdx
                ? { ...state, awaitingCancelCardIdx: state.cardDraggingIdx }
                : state;
        case 'RESTORE_CANCEL':
            return { ...state, awaitingCancelCardIdx: false };
    }
};
