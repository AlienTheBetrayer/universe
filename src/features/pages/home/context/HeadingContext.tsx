import React, { createContext, useContext } from "react";

export const VectorTypes = {
    astral: 'Astral',
    propulsion: 'Propulsion',
    repulsion: 'Repulsion',
    waves: 'Waves',
    nebula: 'Nebula',
    living: 'Living',
    checker: 'Checker'
}

export interface HeadingContextData {
    vectorType?: string;
}

type HeadingContextType = [HeadingContextData, React.Dispatch<React.SetStateAction<HeadingContextData>>];

export const HeadingContext = createContext<HeadingContextType | null>(null);

export const useHeadingContext = () => {
    return useContext(HeadingContext) as HeadingContextType;
}