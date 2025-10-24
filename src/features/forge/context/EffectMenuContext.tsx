import React, { createContext, useContext, useState } from 'react';

export interface EffectMenuData {
    menuIdx: number | false;
}

export type EffectMenuType = [
    EffectMenuData,
    React.Dispatch<React.SetStateAction<EffectMenuData>>
];

export const EffectMenuContext = createContext<EffectMenuType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const EffectMenuProvider = ({ children }: Props) => {
    const [data, setData] = useState<EffectMenuData>({
        menuIdx: false,
    });

    return (
        <EffectMenuContext.Provider value={[data, setData]}>
            {children}
        </EffectMenuContext.Provider>
    );
};

export const useEffectMenuContext = () => {
    const ctx = useContext(EffectMenuContext);
    if (!ctx) throw new Error('useEffecMenuContext() is not used correctly.');
    return ctx;
};
