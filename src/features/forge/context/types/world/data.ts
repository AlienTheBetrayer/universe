import type { BlockData, BlockDataMaterial } from './block';

export interface WorldData {
    // canvas
    autoRotationEnabled: boolean;

    // blocks
    blocks: Map<string, BlockData>;
    currentBlockMaterial: BlockDataMaterial;

    // properties
    blockSize: number;
}
