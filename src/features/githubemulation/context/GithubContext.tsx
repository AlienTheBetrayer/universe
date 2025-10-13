import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStore } from "../../../zustand/localStore";

interface GithubData {
    tutorialVisible: boolean;
}

type GithubContextType = [GithubData, React.Dispatch<React.SetStateAction<GithubData>>];

export const GithubContext = createContext<GithubContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const GithubProvider = ({ children }: Props)  => {
    const [state, setState] = useState<GithubData>({
        tutorialVisible: true
    });

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