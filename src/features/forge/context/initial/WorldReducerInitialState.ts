import { BlockDataMaterials } from '../types/world/block';
import type { WorldData } from '../types/world/data';

export const WorldReducerInitialState: WorldData = {
    // misc
    autoRotationEnabled: false,

    // blocks
    blocks: new Map(),
    currentBlockMaterial: BlockDataMaterials.Metal,

    // properties
    blockSize: 1,
};
