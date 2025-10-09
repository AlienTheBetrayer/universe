import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStore } from "../../../zustand/localStore";

interface StellarContent {
    firstTitle: string;
    firstDescription: string;
    secondTitle: string;
    secondDescription: string
}

export interface Stellar {
    idx: number;
    x: number;
    y: number;
    content: StellarContent;
};

export interface StellarState {
    stellars: Stellar[];
    selected: number | false;
    hovered: number | false;
    editing: boolean;
    tutorialVisible: boolean;
    messageBoxVisible: boolean;
    viewport: { width: number, height: number };
};

// context
type StellarContextType = [StellarState, React.Dispatch<React.SetStateAction<StellarState>>];

export const StellarContext = createContext<StellarContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const InitialStellarState = {
    stellars: [
        {
            idx: 0,
            x: 0,
            y: 0,
            content: { firstTitle: 'Earth', secondTitle: 'We are here', firstDescription: 'Hello there?', secondDescription: 'Are we gonna succeed?'}
        },
        {
            idx: 1,
            x: 0,
            y: 0,
            content: { firstTitle: 'Mars', secondTitle: 'Eat me', firstDescription: 'Do not eat me please', secondDescription: 'It is scary...'}
        },
        {
            idx: 2,
            x: 0,
            y: 0,
            content: { firstTitle: 'Pluto', secondTitle: 'Dwarf planet', firstDescription: 'I am small!', secondDescription: 'No, I am big!!'}
        },
    ],
    selected: false as (number | false),
    hovered: false as (number | false),
    editing: false,
    messageBoxVisible: false,
    viewport: { width: 0, height: 0 }
}

export const StellarProvider = ({ children }: Props) => {
    const state = useState<StellarState>({ ...InitialStellarState, tutorialVisible: true });
    const localStore = useLocalStore();

    useEffect(() => {
        state[1](prev => ({ ...prev, tutorialVisible: !localStore.tutorialSeen }));
    }, []);

    return (
        <StellarContext.Provider value={state}>
            { children }
        </StellarContext.Provider>   
    )
}
export const useStellarContext = () => {
    return useContext(StellarContext) as StellarContextType;
}