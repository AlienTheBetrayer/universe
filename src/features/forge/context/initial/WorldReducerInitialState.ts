import type { WorldData } from '../types/world/data';

export const WorldReducerInitialState: WorldData = {
    // misc
    autoRotationEnabled: false,

    // blocks
    blocks: new Map(),
    currentBlockMaterial: 'Regular',

    // properties
    blockSize: 1,
};
