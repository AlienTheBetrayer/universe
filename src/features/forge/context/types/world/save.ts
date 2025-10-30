import type { ForgeCardData } from '../forge/cards';
import type { ForgeEffectData } from '../forge/effects';
import type { WorldData } from './data';

export interface ForgeSave {
    cards: ForgeCardData[];
    effectSlots: ForgeEffectData[];
}

export interface WorldSave {
    blocks: WorldData['blocks'];
    blockSize: WorldData['blockSize'];
    currentBlockMaterial: WorldData['currentBlockMaterial'];
    worldName: string;
}
