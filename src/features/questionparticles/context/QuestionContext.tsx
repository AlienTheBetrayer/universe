import type React from "react";
import { createContext, useContext } from "react";

export interface QuestionContextData {
    revealed?: boolean;
}

type QuestionContextType = [QuestionContextData, React.Dispatch<React.SetStateAction<QuestionContextData>>];

export const QuestionContext = createContext<QuestionContextType | null>(null);

export const useQuestionContext = () => {
    return useContext(QuestionContext) as QuestionContextType;
}