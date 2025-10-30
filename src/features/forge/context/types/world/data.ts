import type { BlockData, BlockDataMaterial } from './block';

export interface WorldData {
    // canvas
    autoRotationEnabled: boolean;

    // blocks
    blocks: Map<BlockDataMaterial, Map<string, BlockData>>;
    currentBlockMaterial: BlockDataMaterial;
    currentInteractionMode: 'building' | 'deleting';

    // properties
    blockSize: number;

    // world
    worldName?: string;
}
