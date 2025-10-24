import React, { createContext, useContext, useEffect, useState } from 'react';

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

    useEffect(() => {
        console.log(data.menuIdx);
    }, [data.menuIdx]);

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
