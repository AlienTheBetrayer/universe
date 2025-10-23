import type { ForgeData } from '../types/data';

export type ForgeReducerAction =
    // dragging
    | { type: 'SET_IS_DRAGGING'; flag: boolean }
    | { type: 'SET_DRAGGING_POS'; x: number; y: number };

export const ForgeReducer = (
    state: ForgeData,
    action: ForgeReducerAction
): ForgeData => {
    switch (action.type) {
        // dragging
        case 'SET_IS_DRAGGING':
            return { ...state, isDragging: action.flag };
        case 'SET_DRAGGING_POS':
            return { ...state, draggingPos: { x: action.x, y: action.y } };
    }
};
