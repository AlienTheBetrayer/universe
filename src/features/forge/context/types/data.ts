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

export interface ForgeCardContent {
    title: string;
    description: string;
    image: string;
    inverted?: boolean;
    type: ForgeCardType;
}

export interface ForgeDragging {
    idx: number | false;
    card?: ForgeCardContent;
}

export interface ForgeData {
    dragging: ForgeDragging;
    cardContents: ForgeCardContent[];
    effectSlots: Map<number, ForgeCardType>;
}
