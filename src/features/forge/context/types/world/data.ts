import type { BlockData } from './block';

export interface WorldData {
    // canvas
    autoRotationEnabled: boolean;

    // blocks
    fieldBlocks: BlockData[];
    blocks: BlockData[];
}
