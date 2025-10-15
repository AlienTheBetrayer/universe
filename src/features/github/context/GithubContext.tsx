import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStore } from "../../../zustand/localStore";

// constant default values
export const GithubDefaultBranch = 'main';


interface FormContent {
    author: string;
    email: string;
    message: string;
}


export interface Form {
    idx: number;
    name: string;
    tags: string[];
    content?: FormContent;
}

interface Commit {
    name: string;
    description: string;
    date: string;
    difference: string,
}

export interface Branch {
    idx: number;
    name: string;
    forms: Form[];
}


interface Description {
    about: string;
    stars: number;
    watching: number;
    forks: number;
    topics: string[];
}

interface ElementsVisibility {
    releases: boolean;
    packages: boolean;
    languages: boolean;
}


// main data interface
interface GithubData {
    commits?: Commit[],
    description: Description;
    visibility: ElementsVisibility;
    branches: Branch[];

    currentBranch: number;
    currentForm: number | false;
    repositoryName: string;
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
        about: 'Stars rapidly floating around...',
        forks: 0,
        stars: 0,
        watching: 0,
        topics: [],
    },
    visibility: {
        languages: true,
        packages: true,
        releases: true,
    },
    currentBranch: 0,
    currentForm: false,
    repositoryName: 'The Universe',
    branches: [
        {
            idx: 0,
            name: GithubDefaultBranch,
            forms: [{
                idx: 0,
                name: 'hi',
                tags: ['bye', 'whatever'],
                content: {
                    author: 'Gleb',
                    email: 'alienthebusinessman@gmail.com',
                    message: 'hello there?'
                }
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