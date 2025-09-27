import React, { createContext, useContext } from "react";

export interface ContactContextData {
    color: number[];
};

type ContactContextType = [ContactContextData, React.Dispatch<React.SetStateAction<ContactContextData>>];

export const ContactContext = createContext<ContactContextType | null>(null);

export const useContactContext = () => {
    return useContext(ContactContext) as ContactContextType;
}