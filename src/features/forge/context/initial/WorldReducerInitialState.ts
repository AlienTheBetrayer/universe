import type { WorldData } from '../types/world/data';

export const WorldReducerInitialState: WorldData = {
    // misc
    autoRotationEnabled: false,

    // blocks
    blocks: new Map(),
    currentBlockMaterial: 'regular',

    // properties
    blockSize: 1,
};
