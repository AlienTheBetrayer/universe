import React, { createContext, useContext, useState } from "react";

interface PaintContextData {
    selectedColor: string;
}

type PaintContextType = [PaintContextData, React.Dispatch<React.SetStateAction<PaintContextData>>];

export const PaintContext = createContext<PaintContextType | null>(null);

interface Props {
    children?: React.ReactNode;
}

export const PaintProvider = ({ children }: Props) => {
    const [data, setData] = useState<PaintContextData>({
        selectedColor: 'theme'
    });
    
    return (
        <PaintContext.Provider value={[data, setData]}>
            { children }
        </PaintContext.Provider>
    )
}

export const usePaintContext = () => {
    const context = useContext(PaintContext);
    if(!context)
        throw new Error('usePaintContext is used incorrectly.');
    return context;
}