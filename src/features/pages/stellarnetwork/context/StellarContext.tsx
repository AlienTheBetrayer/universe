import { createContext, useContext } from "react";

export interface Stellar {
    idx: number;
    
    x?: number;
    y?: number;

    title: string;
    description: string;
};

export interface StellarContextData {
    stellars: Stellar[];
    selected: number;
};

type StellarContextType = [StellarContextData, React.Dispatch<React.SetStateAction<StellarContextData>>];

export const StellarContext = createContext<StellarContextType | null>(null);

export const useStellarContext = () => {
    return useContext(StellarContext) as StellarContextType;
}