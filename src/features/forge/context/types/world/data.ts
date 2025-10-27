import type { BlockData } from './block';

export interface WorldData {
    // canvas
    autoRotationEnabled: boolean;

    // blocks
    fieldBlocks: Map<string, BlockData>;
    blocks: Map<string, BlockData>;

    // properties
    blockSize: number;
}
