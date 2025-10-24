import type { ForgeCardData } from '../types/cards';
import type { ForgeData } from '../types/data';

export type ForgeReducerAction =
    // cards
    | { type: 'SET_DRAGGING_CARD'; cardIdx: number | false }

    // effect
    | { type: 'SET_EFFECT_SLOT'; effectIdx: number; card: ForgeCardData }
    | { type: 'REMOVE_EFFECT_SLOT'; cardIdx: number }

    // blocks
    | { type: 'SELECT_BLOCK'; blockIdx: number | false }

    // cancel
    | { type: 'CANCEL_CURRENT_CARD' }
    | { type: 'RESTORE_CANCEL_CARD' };

export const ForgeReducer = (
    state: ForgeData,
    action: ForgeReducerAction
): ForgeData => {
    switch (action.type) {
        // cards
        case 'SET_DRAGGING_CARD':
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

        // blocks
        case 'SELECT_BLOCK':
            return { ...state, selectedBlockIdx: action.blockIdx };

        // cancel
        case 'CANCEL_CURRENT_CARD':
            return state.cardDraggingIdx
                ? { ...state, awaitingCancelCardIdx: state.cardDraggingIdx }
                : state;
        case 'RESTORE_CANCEL_CARD':
            return { ...state, awaitingCancelCardIdx: false };
    }
};
