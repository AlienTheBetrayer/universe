import React, { createContext, useContext, useReducer } from 'react';
import { useProviderSaveLoad } from './hooks/useProviderSaveLoad';
import { GithubContextInitialData } from './initial/githubData';
import {
    GithubReducer,
    type GithubReducerAction,
} from './reducer/GithubReducer';
import type { GithubData } from './types/data';
import type { GithubPage } from './types/dataTypes';

export interface GithubContextData {
    tutorialVisible: boolean;
    page: GithubPage;
    data: GithubData;
}

type GithubContextType = [
    GithubContextData,
    React.Dispatch<GithubReducerAction>
];

export const GithubContext = createContext<GithubContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

// provider + localstorage zustand handling
export const GithubProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(GithubReducer, {
        tutorialVisible: true,
        page: 'forms',
        data: GithubContextInitialData,
    });

    useProviderSaveLoad(state, dispatch);

    return (
        <GithubContext.Provider value={[state, dispatch]}>
            {children}
        </GithubContext.Provider>
    );
};

export const useGithubContext = () => {
    const context = useContext(GithubContext);
    if (!context) throw new Error('useGithubContext() is used incorrectly.');
    return context;
};
