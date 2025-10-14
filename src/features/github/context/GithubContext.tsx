import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStore } from "../../../zustand/localStore";

// constant default values
export const GithubDefaultBranch = 'main';


// github data
interface Form {
    idx: number;
    name: string;
    tags: string[];
    lastUpdatedDate?: string;
}


interface Branch {
    name: string;
    forms?: Form[];
}

interface FormDescription {
    about: string;
    stars: number;
    watching: number;
    forks: number;
}


interface GithubData {
    description: FormDescription;
    branches: Branch[];
}


// context data
interface GithubContextData {
    tutorialVisible: boolean;
    data: GithubData;
}

type GithubContextType = [GithubContextData, React.Dispatch<React.SetStateAction<GithubContextData>>];

export const GithubContext = createContext<GithubContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}


export const GithubContextInitialData: GithubData = {
    description: {
        about: '',
        forks: 0,
        stars: 0,
        watching: 0
    },
    branches: [
        {
            name: GithubDefaultBranch,
            forms: [{
                idx: 0,
                name: 'hi',
                tags: ['bye', 'whatever']
            }]
        },
    ]
};

// provider + localstorage zustand handling
export const GithubProvider = ({ children }: Props)  => {
    const [state, setState] = useState<GithubContextData>(
        {
            tutorialVisible: true,
            data: GithubContextInitialData
        }
    );

    const localStore = useLocalStore();

    // if we hadn't seen the tutorial ever before, show it 
    useEffect(() => {
        setState(prev => ({ ...prev, tutorialVisible: !localStore.tutorialSeen.contact }));
    }, []);
    
    return (
        <GithubContext.Provider value={[state, setState]}>
            { children }
        </GithubContext.Provider>
    )
}

export const useGithubContext = () => {
    const context = useContext(GithubContext);
    if(!context)
        throw new Error('useGithubContext() is used incorrectly.');
    return context;
}