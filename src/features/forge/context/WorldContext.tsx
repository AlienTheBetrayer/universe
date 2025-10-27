import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { WorldReducerInitialState } from './initial/WorldReducerInitialState';
import { WorldReducer, type WorldReducerAction } from './reducer/WorldReducer';
import type { WorldData } from './types/world/data';

// types
export type WorldContextType = [WorldData, React.Dispatch<WorldReducerAction>];

// context
export const WorldContext = createContext<WorldContextType | null>(null);

// provider
interface Props {
    children?: React.ReactNode;
}

export const WorldProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        WorldReducer,
        WorldReducerInitialState
    );

    useEffect(() => {
        dispatch({ type: 'GENERATE_FIELD' });
    }, []);

    return (
        <WorldContext.Provider value={[state, dispatch]}>
            {children}
        </WorldContext.Provider>
    );
};

// hooks
export const useWorldContext = () => {
    const ctx = useContext(WorldContext);
    if (!ctx) throw new Error('useWorldContext() is used incorrectly.');
    return ctx;
};
