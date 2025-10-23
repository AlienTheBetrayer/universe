import type { ForgeData } from '../types/data';

export type ForgeReducerAction = { type: 'SET_DRAGGING'; flag: boolean };

export const ForgeReducer = (
    state: ForgeData,
    action: ForgeReducerAction
): ForgeData => {
    switch (action.type) {
        case 'SET_DRAGGING':
            return { ...state, isDragging: action.flag };
    }
};
