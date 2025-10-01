import React, { createContext, useContext } from "react";

export interface StellarContentEntry {
    title: string;
    description: string[];
}

interface StellarContent {
    first: StellarContentEntry;
    second: StellarContentEntry;
}

// stellar types
export interface Stellar {
    idx: number;
    
    x?: number;
    y?: number;

    content: StellarContent;
};

// reducer logic
export interface StellarState {
    stellars: Stellar[];
    selected: number;
    hovered: number;
    editing: boolean;
};

export type StellarAction =
{ type: 'go_back' } |
{ type: 'set_editing', flag: boolean } |
{ type: 'change_content', idx: number, part: 'first' | 'second', title: string, description: string[] } | 
{ type: 'unselect' } |
{ type: 'unhover' } |
{ type: 'hover', idx: number } | 
{ type: 'select', idx: number } |
{ type: 'move', idx: number, x: number, y: number } |
{ type: 'select_previous' } |
{ type: 'select_next' };

export const StellarReducer = (state: StellarState, action: StellarAction) => {
    switch(action.type) {
        case 'change_content':
            return { ...state, stellars: state.stellars.map((stellar, idx) => {
                if(idx !== action.idx)
                    return stellar;

                return {
                    ...stellar, content: {
                        ...stellar.content,
                        [action.part]: {
                            title: action.title,
                            description: action.description
                        }
                    }
                }
            })};
        case 'go_back':
            return { ...state, selected: -1, editing: false };
        case 'set_editing':
            return { ...state, editing: action.flag };
        case 'unselect':
            return { ...state, selected: -1 };
        case 'unhover':
            return { ...state, hovered: -1 };
        case 'hover':
            return { ...state, hovered: action.idx }
        case 'select':
            return { ...state, selected: state.selected === action.idx ? -1 : action.idx };
        case 'move':
            return { ...state,
                stellars: state.stellars.map(stellar => 
                    stellar.idx === action.idx ? { ...stellar, x: action.x, y: action.y } : stellar
                 )};
        case 'select_next':
            return { ...state, selected: state.selected < state.stellars.length - 1 ? state.selected + 1 : 0 };
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