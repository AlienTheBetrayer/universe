import type { ForgeCardData } from '../types/forge/cards';
import type { ForgeData, ForgePage } from '../types/forge/data';
import type { ForgeEffectData } from '../types/forge/effects';

export type ForgeReducerAction =
    // cards
    | { type: 'SET_DRAGGING_CARD'; cardIdx: number | false }

    // effect
    | { type: 'SET_EFFECT_SLOT'; effectIdx: number; card: ForgeCardData }
    | { type: 'REMOVE_EFFECT_SLOT'; cardIdx: number }
    | { type: 'WIPE_EFFECT_SLOTS' }
    | { type: 'SELECT_EFFECT'; effectIdx: number | false }
    | { type: 'FILL_REMAINING_EFFECTS' }
    | { type: 'ADJUST_EFFECT_STRENGTH'; effectIdx: number; strength: number }

    // world
    | { type: 'WORLD_FULLSCREEN_TOGGLE' }

    // awaiting
    | { type: 'AWAIT_ACTION'; cardIdx: number | false }
    | { type: 'CANCEL_CURRENT_CARD' }
    | { type: 'RESTORE_CANCEL_CARD' }

    // page
    | { type: 'SWITCH_PAGE'; page: ForgePage };

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
        case 'WIPE_EFFECT_SLOTS':
            return { ...state, effectSlots: [] };
        case 'SELECT_EFFECT':
            return {
                ...state,
                currentEffectHoveredIdx: { current: action.effectIdx },
            };
        case 'FILL_REMAINING_EFFECTS': {
            const remainingCards = state.cards.filter(
                (card) =>
                    state.effectSlots.find(
                        (slot) => slot.card.idx === card.idx
                    ) === undefined
            );

            const occupiedSlots = state.effectSlots.map(
                (slot) => slot.effectIdx
            );

            const allSlots = [...Array(9).keys()].filter(
                (v) => !occupiedSlots.includes(v)
            );
            allSlots.sort(() => Math.random() - 0.5);

            const newEffects: ForgeEffectData[] = state.effectSlots;

            for (const idx of allSlots) {
                const card = remainingCards.pop();
                if (!card) break;

                newEffects.push({
                    effectIdx: idx,
                    card,
                });
            }

            return { ...state, effectSlots: newEffects };
        }
        case 'ADJUST_EFFECT_STRENGTH': {
            return {
                ...state,
                effectSlots: state.effectSlots.map((slot) =>
                    slot.effectIdx === action.effectIdx
                        ? {
                              ...slot,
                              strength: action.strength,
                          }
                        : slot
                ),
            };
        }

        // world
        case 'WORLD_FULLSCREEN_TOGGLE':
            return { ...state, isWorldFullscreen: !state.isWorldFullscreen };

        // awaiting
        case 'CANCEL_CURRENT_CARD':
            return state.cardDraggingIdx
                ? { ...state, awaitingCancelCardIdx: state.cardDraggingIdx }
                : state;
        case 'RESTORE_CANCEL_CARD':
            return { ...state, awaitingCancelCardIdx: false };
        case 'AWAIT_ACTION':
            return { ...state, awaitingActionIdx: action.cardIdx };

        // pages
        case 'SWITCH_PAGE':
            return { ...state, currentPage: action.page };
    }
};
