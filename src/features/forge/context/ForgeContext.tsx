import { createContext, useContext, useReducer } from 'react';
import { ForgeReducerInitialState } from './initial/ForgeReducerInitialState';
import { ForgeReducer, type ForgeReducerAction } from './reducer/ForgeReducer';
import type { ForgeData } from './types/data';

type ForgeContextType = [ForgeData, React.Dispatch<ForgeReducerAction>];

export const ForgeContext = createContext<ForgeContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const ForgeProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        ForgeReducer,
        ForgeReducerInitialState
    );

    return (
        <ForgeContext.Provider value={[state, dispatch]}>
            {children}
        </ForgeContext.Provider>
    );
};

export const useForgeContext = () => {
    const ctx = useContext(ForgeContext);
    if(!ctx)
        throw new Error('useForgeContext() is used incorrectly.');
    return ctx;
}
