import type { WorldData } from '../types/world/data';

export const WorldReducerInitialState: WorldData = {
    // misc
    autoRotationEnabled: false,

    // blocks
    blocks: [],
    fieldBlocks: [],

    // properties
    blockSize: 1,
};
