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

export interface ForgeData {
    dragging?: ForgeCardData;
    cards: ForgeCardData[];
    effectSlots: Map<number, ForgeCardData>;
    awaitingCancel: number | false;
}
