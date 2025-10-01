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

export interface InteractiveParticlesContextData {
    vectorType?: string;
}

type HeadingContextType = [InteractiveParticlesContextData, React.Dispatch<React.SetStateAction<InteractiveParticlesContextData>>];

export const InteractiveParticlesContext = createContext<HeadingContextType | null>(null);

export const useInteractiveParticlesContext = () => {
    return useContext(InteractiveParticlesContext) as HeadingContextType;
}