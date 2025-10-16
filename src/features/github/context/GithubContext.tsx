import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStore } from "../../../zustand/localStore";
import { GithubContextInitialData } from "./initial/githubData";

// interfaces and data types
export interface FormContent {
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

export interface Commit {
    idx: number;
    formIdx: number;
    name: string;
    description: string;
    pushedAt: number;
    data: string;
}

export interface Branch {
    idx: number;
    name: string;
    forms: Form[];
    commits: Commit[];
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
export interface GithubData {
    description: Description;
    visibility: ElementsVisibility;
    branches: Branch[];

    currentBranch: number;
    currentForm: number | false;
    currentCommit: number | false;
    repositoryName: string;
}

type GithubPage = 'forms' | 'commits';

// context data
interface GithubContextData {
    tutorialVisible: boolean;
    page: GithubPage;

    data: GithubData;
}

type GithubContextType = [GithubContextData, React.Dispatch<React.SetStateAction<GithubContextData>>];

export const GithubContext = createContext<GithubContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

// provider + localstorage zustand handling
export const GithubProvider = ({ children }: Props)  => {
    const [state, setState] = useState<GithubContextData>(
        {
            tutorialVisible: true,
            page: 'forms',
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