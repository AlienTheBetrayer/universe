import type { WorldData } from './data';

export interface WorldSave {
    blocks: WorldData['blocks'];
    blockSize: WorldData['blockSize'];
    currentBlockMaterial: WorldData['currentBlockMaterial'];
    worldName: string;
}
