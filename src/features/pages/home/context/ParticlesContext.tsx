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
export interface ParticlesDataInterface {
    vectorType?: string;
}

type ParticlesContextType = [ParticlesDataInterface, React.Dispatch<React.SetStateAction<ParticlesDataInterface>>];

export const ParticlesContext = createContext<ParticlesContextType | null>(null);

export const useParticlesContext = () => {
    return useContext(ParticlesContext) as ParticlesContextType;
}