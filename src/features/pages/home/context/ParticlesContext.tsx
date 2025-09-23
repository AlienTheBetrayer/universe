import React, { createContext, useContext } from "react";

export const VectorTypes = {
    propulsion: 'Propulsion',
    repulsion: 'Repulsion',
    waves: 'Waves',
    nebula: 'Nebula',
    swarm: 'Swarm',
    checker: 'Checker',
    astral: 'Astral'
}
export interface ParticlesDataInterface {
    vectorType?: string;
}

type ParticlesContextType = [ParticlesDataInterface, React.Dispatch<React.SetStateAction<ParticlesDataInterface>>];

export const ParticlesContext = createContext<ParticlesContextType | null>(null);

export const useParticlesContext = () => {
    return useContext(ParticlesContext) as ParticlesContextType;
}