import type { ForgeCardData } from "./cards";

export interface ForgeEffectData {
    effectIdx: number;
    card: ForgeCardData;
    strength: {
        min: number;
        max: number;
        current: number;
    }
}