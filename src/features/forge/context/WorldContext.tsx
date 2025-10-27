import React, { createContext, useContext, useState } from 'react';
import { useWorldField } from './hooks/useWorldField';
import type { WorldData } from './types/world/data';

// types
export type WorldContextType = [
    WorldData,
    React.Dispatch<React.SetStateAction<WorldData>>
];

// context
export const WorldContext = createContext<WorldContextType | null>(null);

// provider
interface Props {
    children?: React.ReactNode;
}

export const WorldProvider = ({ children }: Props) => {
    const [state, setState] = useState<WorldData>({
        autoRotationEnabled: false,
        fieldBlocks: [],
        blocks: [],
    });

    useWorldField(setState, 40, 40);

    return (
        <WorldContext.Provider value={[state, setState]}>
            {children}
        </WorldContext.Provider>
    );
};

// hooks
export const useWorldContext = () => {
    const ctx = useContext(WorldContext);
    if (!ctx) throw new Error('useWorldContext() is used incorrectly.');
    return ctx;
};
