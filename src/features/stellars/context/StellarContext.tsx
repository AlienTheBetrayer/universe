import React, { createContext, useContext, useReducer } from "react";

export interface StellarViewport {
    width: number;
    height: number;
}

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
    tutorialVisible: boolean;
    viewport: StellarViewport;
};

export type StellarAction =
{ type: 'refill' } |
{ type: 'create', stellar: Stellar } |
{ type: 'clear' } |
{ type: 'set_viewport', viewport: StellarViewport } |
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

const initialState: StellarState = {
    selected: -1,
    hovered: -1,
    editing: false,
    viewport: { width: 0, height: 0},
    tutorialVisible: false,
    stellars: [
        {
            idx: 0,
            content: {
                first: { 
                    title: 'Astra', 
                    description: [
                        'A bright blue planet with swirling clouds and glowing rings.',
                        'Its surface reflects light in a mesmerizing pattern.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'Rich in energy crystals',
                        'Atmosphere contains rare gases',
                        'Known to influence nearby starships with mild gravitational waves'
                    ] 
                }
            }
        },
        {
            idx: 1,
            content: {
                first: { 
                    title: 'Luna', 
                    description: [
                        'A silvery moon orbiting a gas giant, calm and serene.',
                        'Surface marked by deep craters and luminous streaks.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'High mineral content',
                        'Tidal pull affects nearby planets',
                        'Ideal for quiet observation outposts'
                    ] 
                }
            }
        },
        {
            idx: 2,
            content: {
                first: { 
                    title: 'Orbis', 
                    description: [
                        'A planet with multiple orbiting rings that shimmer in sunlight.',
                        'Cloud patterns shift rapidly across its surface.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'Magnetic storms are frequent',
                        'Rings composed of ice and rare metals',
                        'Stable rotation, excellent for colonization experiments'
                    ] 
                }
            }
        },
        {
            idx: 3,
            content: {
                first: { 
                    title: 'Nova', 
                    description: [
                        'A tiny star with a brilliant, pulsating light.',
                        'Flashes every few minutes, illuminating surrounding space.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'High radiation output',
                        'Core temperature extremely high',
                        'Flares can temporarily disrupt nearby communications'
                    ] 
                }
            }
        },
        {
            idx: 4,
            content: {
                first: { 
                    title: 'Aurora', 
                    description: [
                        'A gas giant with colorful auroras visible from space.',
                        'Bands of clouds swirl in hypnotic patterns.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'Strong magnetic field',
                        'Atmosphere rich in exotic gases',
                        'Auroral activity highly unpredictable'
                    ] 
                }
            }
        },
        {
            idx: 5,
            content: {
                first: { 
                    title: 'Lyra', 
                    description: [
                        'A rocky planet with jagged mountains and crystal caves.',
                        'Surface glows faintly in twilight.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'High mineral density',
                        'Contains rare crystals',
                        'Ideal for mining operations'
                    ] 
                }
            }
        },
        {
            idx: 6,
            content: {
                first: { 
                    title: 'Phoenix', 
                    description: [
                        'A volcanic planet with rivers of molten lava.',
                        'Eruptions are frequent, lighting up the skies.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'Surface temperature extremely high',
                        'Lava fields rich in rare metals',
                        'Volcanic activity generates unique energy signatures'
                    ] 
                }
            }
        },
        {
            idx: 7,
            content: {
                first: { 
                    title: 'Eclipse', 
                    description: [
                        'A dark planet that periodically blocks a nearby star.',
                        'Shadows move quickly across its jagged surface.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'Strong gravitational pull',
                        'Known for shadow phenomena',
                        'Minimal atmosphere, extreme temperature swings'
                    ] 
                }
            }
        },
        {
            idx: 8,
            content: {
                first: { 
                    title: 'Solara', 
                    description: [
                        'A radiant sun-like star, bright enough to light up nearby planets.',
                        'Emits powerful bursts of solar wind.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'High energy output',
                        'Influences planetary orbits nearby',
                        'Source of rare solar materials'
                    ] 
                }
            }
        },
        {
            idx: 9,
            content: {
                first: { 
                    title: 'Nebula', 
                    description: [
                        'A colorful cloud of gas and dust in space.',
                        'Glows softly, illuminating the void around it.'
                    ] 
                },
                second: { 
                    title: 'Properties', 
                    description: [
                        'Cradle of new stars',
                        'Contains complex molecules',
                        'Influences interstellar navigation'
                    ] 
                }
            }
        }
    ],
};

export const StellarReducer = (state: StellarState, action: StellarAction) => {
    switch(action.type) {
        case 'refill':
            return { ...initialState, viewport: state.viewport };
        case 'clear':
            return { ...state, stellars: [] };
        case 'create':
            return { ...state, stellars: [...state.stellars, action.stellar]};
        case 'set_viewport':
            return { ...state, viewport: action.viewport };
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

interface Props {
    children?: React.ReactNode;
}

export const StellarProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(StellarReducer, initialState);
    
    return (
        <StellarContext.Provider value={[state, dispatch]}>
            { children }
        </StellarContext.Provider>   
    )
}
export const useStellarContext = () => {
    return useContext(StellarContext) as StellarContextType;
}