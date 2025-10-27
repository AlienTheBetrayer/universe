import type { BlockType } from './block';

export interface WorldData {
    // canvas
    autoRotationEnabled: boolean;

    // blocks
    fieldBlocks: BlockType[];
    blocks: BlockType[];
}
