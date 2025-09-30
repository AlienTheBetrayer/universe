import React, { createContext, useContext } from "react";

// stellar types
export interface Stellar {
    idx: number;
    
    x?: number;
    y?: number;

    title: string;
    description: string;
};

export interface StellarState {
    stellars: Stellar[];
    selected: number;
    a: number;
};

// reducer logic
export type StellarAction =
{ type: 'select', idx: number } |
{ type: 'move', idx: number, x: number, y: number } |
{ type: 'select_previous' } |
{ type: 'select_next' };

export const StellarReducer = (state: StellarState, action: StellarAction) => {
    switch(action.type) {
        case 'select':
            return { ...state, selected: state.selected === action.idx ? -1 : action.idx };
        case 'move':
            return { ...state, stellars: state.stellars.map(stellar => 
                stellar.idx === action.idx ? { ...stellar, x: action.x, y: action.y } : stellar
            )}
        case 'select_next':
            return { ...state, selected: state.selected > state.stellars.length - 1 ? state.selected + 1 : 0 };
        case 'select_previous':
            return { ...state, selected: state.selected > 0 ? state.selected - 1 : state.stellars.length - 1 };
        default:
            return state;
    }
}

// context
type StellarContextType = [StellarState, React.Dispatch<StellarAction>];

export const StellarContext = createContext<StellarContextType | null>(null);

export const useStellarContext = () => {
    return useContext(StellarContext) as StellarContextType;
}