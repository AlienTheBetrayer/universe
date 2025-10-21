import React, { createContext, useContext, useState } from 'react';

export const InteractiveParticlesVectors = [
    'Astral',
    'Propulsion',
    'Repulsion',
    'Waves',
    'Nebula',
    'Living',
    'Checker',
];

export type VectorType = (typeof InteractiveParticlesVectors)[number];

export interface InteractiveParticlesContextData {
    vectorType: VectorType;
    bloomStrength: number;
}

type HeadingContextType = [
    InteractiveParticlesContextData,
    React.Dispatch<React.SetStateAction<InteractiveParticlesContextData>>,
];

export const InteractiveParticlesContext =
    createContext<HeadingContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const InteractiveParticlesProvider = ({ children }: Props) => {
    const data = useState<InteractiveParticlesContextData>({
        vectorType: 'Astral',
        bloomStrength: 32,
    });

    return (
        <InteractiveParticlesContext.Provider value={data}>
            {children}
        </InteractiveParticlesContext.Provider>
    );
};

export const useInteractiveParticlesContext = () => {
    return useContext(InteractiveParticlesContext) as HeadingContextType;
};
