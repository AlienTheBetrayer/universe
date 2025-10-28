import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { useHotkeys, type HotkeyAction } from '../../../hooks/useHotkeys';
import { WorldReducerInitialState } from './initial/WorldReducerInitialState';
import { WorldReducer, type WorldReducerAction } from './reducer/WorldReducer';
import type { WorldData } from './types/world/data';
import { useWorldInit } from './hooks/useWorldInit';

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

    useWorldInit(dispatch);

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
