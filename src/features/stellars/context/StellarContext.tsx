import React, { createContext, useContext, useReducer } from 'react';
import { useStellarLoading } from './hooks/useStellarLoading';
import { StellarContextInitialData } from './initial/stellarData';
import { StellarReducer, type StellarAction } from './reducer/StellarReducer';
import type { StellarState } from './types/stellarData';

// context
type StellarContextType = [StellarState, React.Dispatch<StellarAction>];

export const StellarContext = createContext<StellarContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const StellarProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(
        StellarReducer,
        StellarContextInitialData
    );

    // tutorial loading
    useStellarLoading(dispatch);

    return (
        <StellarContext.Provider value={[state, dispatch]}>
            {children}
        </StellarContext.Provider>
    );
};
export const useStellarContext = () => {
    return useContext(StellarContext) as StellarContextType;
};
