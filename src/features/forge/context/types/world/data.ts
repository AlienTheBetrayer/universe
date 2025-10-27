import type { BlockData } from './block';

export interface WorldData {
    // canvas
    autoRotationEnabled: boolean;

    // blocks
    fieldBlocks: Map<string, BlockData>;
    blocks: BlockData[];

    // properties
    blockSize: number;
}
