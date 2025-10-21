import type { Stellar, StellarState } from '../types/stellarData';
import { findMax } from '../utils/findMax';

export type StellarAction =
    // flags
    | { type: 'TUTORIAL_SET_VISIBLE'; flag: boolean }
    | { type: 'MESSAGEBOX_SET_VISIBLE'; flag: boolean }
    | { type: 'ISMOVEWAITING_SET'; flag: boolean }
    | { type: 'ISMOVEWAITING_TOGGLE' }

    // stellars
    | { type: 'STELLAR_PREVIOUS' }
    | { type: 'STELLAR_NEXT' }
    | { type: 'STELLAR_FOCUS'; idx: number | false }
    | { type: 'STELLAR_SET_MOVING'; idx: number | false }
    | { type: 'STELLAR_TOGGLE_MOVING'; idx: number }
    | { type: 'STELLAR_MOVE_CURRENT'; x: number; y: number }
    | { type: 'STELLAR_MOVE'; idx: number; x: number; y: number }
    | { type: 'STELLAR_MOVE_RANDOM'; idx: number }
    | { type: 'STELLAR_HOVER'; idx: number | false }
    | { type: 'STELLAR_SELECT_TOGGLE'; idx: number }
    | { type: 'STELLAR_CREATE_AT_CURSOR'; cursorX: number; cursorY: number }
    | {
          type: 'STELLAR_SET_FIRST_CONTENT';
          heading: string;
          description: string;
      }
    | {
          type: 'STELLAR_SET_SECOND_CONTENT';
          heading: string;
          description: string;
      }
    | { type: 'STELLAR_SET_EDITING'; flag: boolean }
    | { type: 'STELLARS_WIPE' }
    | { type: 'STELLAR_DELETE'; idx: number }
    | { type: 'STELLAR_DELETE_CURRENT' }

    // misc
    | { type: 'VIEWPORT_SET'; width: number; height: number }
    | { type: 'ESCAPE' };

export const StellarReducer = (
    state: StellarState,
    action: StellarAction,
): StellarState => {
    switch (action.type) {
        // flags
        case 'TUTORIAL_SET_VISIBLE':
            return { ...state, isTutorialVisible: action.flag };
        case 'MESSAGEBOX_SET_VISIBLE':
            return { ...state, isMessageBoxVisible: action.flag };
        case 'ISMOVEWAITING_SET':
            return { ...state, isMoveWaiting: action.flag };
        case 'ISMOVEWAITING_TOGGLE':
            return { ...state, isMoveWaiting: !state.isMoveWaiting };

        // stellars
        case 'STELLAR_PREVIOUS': {
            const indexes = state.stellars.map((s) => s.idx);
            indexes.sort();

            return {
                ...state,
                selectedIdx:
                    state.selectedIdx === false
                        ? indexes[0]
                        : state.selectedIdx === indexes[0]
                          ? indexes.at(-1)!
                          : indexes[indexes.indexOf(state.selectedIdx) - 1],
            };
        }
        case 'STELLAR_NEXT':
            const indexes = state.stellars.map((s) => s.idx);
            indexes.sort();

            return {
                ...state,
                selectedIdx:
                    state.selectedIdx === false
                        ? indexes.at(-1)!
                        : state.selectedIdx === indexes.at(-1)!
                          ? indexes[0]
                          : indexes[indexes.indexOf(state.selectedIdx) + 1],
            };
        case 'STELLAR_FOCUS':
            return { ...state, selectedIdx: action.idx };
        case 'STELLAR_MOVE_CURRENT':
            return {
                ...state,
                stellars: state.stellars.map((s) =>
                    s.idx === state.movingIdx
                        ? {
                              ...s,
                              x: action.x,
                              y: action.y,
                          }
                        : s,
                ),
            };
        case 'STELLAR_HOVER':
            return { ...state, hoveredIdx: action.idx };
        case 'STELLAR_SET_MOVING':
            return { ...state, movingIdx: action.idx };
        case 'STELLAR_TOGGLE_MOVING':
            return {
                ...state,
                movingIdx: state.movingIdx === action.idx ? false : action.idx,
            };
        case 'STELLAR_SELECT_TOGGLE':
            return {
                ...state,
                selectedIdx:
                    state.selectedIdx === action.idx ? false : action.idx,
            };
        case 'STELLAR_CREATE_AT_CURSOR': {
            const stellar: Stellar = {
                idx: findMax(state) + 1,
                x:
                    (action.cursorX / window.innerWidth) *
                        state.viewport.width -
                    state.viewport.width / 2,
                y:
                    -(action.cursorY / window.innerHeight) *
                        state.viewport.height +
                    state.viewport.height / 2,
                content: {
                    firstTitle: 'Planet',
                    firstDescription: '',
                    secondTitle: 'Properties',
                    secondDescription: '',
                },
            };
            return { ...state, stellars: [...state.stellars, stellar] };
        }
        case 'STELLAR_SET_FIRST_CONTENT':
            return {
                ...state,
                stellars: state.stellars?.map((stellar) =>
                    stellar.idx === state.selectedIdx
                        ? {
                              ...stellar,
                              content: {
                                  ...stellar.content,
                                  firstTitle: action.heading,
                                  firstDescription: action.description,
                              },
                          }
                        : stellar,
                ),
            };
        case 'STELLAR_SET_SECOND_CONTENT':
            return {
                ...state,
                stellars: state.stellars?.map((stellar) =>
                    stellar.idx === state.selectedIdx
                        ? {
                              ...stellar,
                              content: {
                                  ...stellar.content,
                                  secondTitle: action.heading,
                                  secondDescription: action.description,
                              },
                          }
                        : stellar,
                ),
            };
        case 'STELLAR_SET_EDITING':
            return { ...state, isEditing: action.flag };
        case 'STELLARS_WIPE':
            return { ...state, stellars: [] };
        case 'STELLAR_DELETE':
            return {
                ...state,
                stellars: state.stellars.filter((s) => s.idx !== action.idx),
            };
        case 'STELLAR_DELETE_CURRENT':
            return {
                ...state,
                stellars: state.stellars.filter(
                    (s) => s.idx !== state.selectedIdx,
                ),
            };
        case 'STELLAR_MOVE':
            return {
                ...state,
                stellars: state.stellars.map((stellar) =>
                    stellar.idx === action.idx
                        ? {
                              ...stellar,
                              x: action.x,
                              y: action.y,
                          }
                        : stellar,
                ),
            };
        case 'STELLAR_MOVE_RANDOM': {
            return {
                ...state,
                stellars: state.stellars.map((s) =>
                    s.idx === action.idx
                        ? {
                              ...s,
                              x:
                                  (Math.random() - 0.5) *
                                  state.viewport.width *
                                  0.9,
                              y:
                                  (Math.random() - 0.5) *
                                  state.viewport.height *
                                  0.7,
                          }
                        : s,
                ),
            };
        }

        // misc
        case 'VIEWPORT_SET':
            return {
                ...state,
                viewport: { width: action.width, height: action.height },
            };
        case 'ESCAPE':
            return {
                ...state,
                selectedIdx: false,
                isEditing: false,
                movingIdx: false,
                isMoveWaiting: false,
                isTutorialVisible: false,
                isMessageBoxVisible: false,
            };
    }
};
