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

export interface EffectObject {
    idx: number;
    element: HTMLDivElement | null;
}

export interface ForgeData {
    isDragging: boolean;
    draggingPos: { x: number; y: number };
    cardContents: ForgeCardContent[];
    effectRefs: EffectObject[];
}
