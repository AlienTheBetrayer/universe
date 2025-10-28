export type ForgeCardType =
    | 'typescript'
    | 'react'
    | 'css'
    | 'html'
    | 'zustand'
    | 'redux'
    | 'javascript'
    | 'nextjs'
    | 'tailwind';

export interface ForgeCardData {
    idx: number;
    title: string;
    description: string;
    image: string;
    inverted?: boolean;
    type: ForgeCardType;
}