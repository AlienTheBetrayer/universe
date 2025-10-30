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
        strength: { min: 0.1, max: 5 },
    },
    html: {
        name: 'Bloom Glow',
        emoji: '💡',
        strength: { min: 0.5, max: 2.0 },
    },
    javascript: {
        name: 'Glitch Distortion',
        emoji: '🌩️',
        strength: { min: 0.2, max: 1.2 },
    },
    nextjs: {
        name: 'SSR Reflection',
        emoji: '🪞',
        strength: { min: 0.3, max: 1.0 },
    },
    react: {
        name: 'Depth of Field',
        emoji: '🎯',
        strength: { min: 0.4, max: 1.8 },
    },
    redux: {
        name: 'Motion Blur',
        emoji: '💫',
        strength: { min: 0.1, max: 0.9 },
    },
    tailwind: {
        name: 'Color Shift',
        emoji: '🌈',
        strength: { min: 0.2, max: 1.4 },
    },
    typescript: {
        name: 'Sharpen Pass',
        emoji: '🔷',
        strength: { min: 0.3, max: 1.3 },
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
}
