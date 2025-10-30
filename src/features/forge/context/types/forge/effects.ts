import type { ForgeCardData, ForgeCardType } from './cards';

interface ForgeEffectType {
    strength: {
        min: number;
        max: number;
    };
    name: string;
    emoji: string;
}

interface ForgeEffectType {
    strength: {
        min: number;
        max: number;
    };
    name: string;
    emoji: string;
}

export const ForgeWorldEffects: Record<ForgeCardType, ForgeEffectType> = {
    css: {
        name: 'Chromatic Aberration',
        emoji: '🎨',
        strength: { min: 0.001, max: 0.3 },
    },
    html: {
        name: 'Bloom Glow',
        emoji: '💡',
        strength: { min: 6, max: 64 },
    },
    javascript: {
        name: 'Glitch Distortion',
        emoji: '🌩️',
        strength: { min: 0.01, max: 1 },
    },
    nextjs: {
        name: 'Noise Grain',
        emoji: '😵‍💫',
        strength: { min: 0.3, max: 1.0 },
    },
    react: {
        name: 'Depth of Field',
        emoji: '🎯',
        strength: { min: 8, max: 64 },
    },
    redux: {
        name: 'Contrast',
        emoji: '💫',
        strength: { min: 0.1, max: 1 },
    },
    tailwind: {
        name: 'Colors',
        emoji: '🌈',
        strength: { min: 0.1, max: 4 },
    },
    typescript: {
        name: 'Dynamic selection',
        emoji: '🔷',
        strength: { min: 0.5, max: 2 },
    },
    zustand: {
        name: 'Noise Grain',
        emoji: '🐻',
        strength: { min: 0.05, max: 0.8 },
    },
};

export interface ForgeEffectData {
    effectIdx: number;
    card: ForgeCardData;
    strength?: number;
    enabled: boolean;
}
