import React, { createContext, useContext } from "react";

export interface ParticlesDataInterface {
    vectorType?: string;
    color?: number[];
}

type ParticlesContextType = [ParticlesDataInterface, React.Dispatch<React.SetStateAction<ParticlesDataInterface>>];

export const ParticlesContext = createContext<ParticlesContextType | null>(null);

export const useParticlesContext = () => {
    return useContext(ParticlesContext) as ParticlesContextType;
}