import type { WorldData } from '../types/world/data';

export const WorldReducerInitialState: WorldData = {
    // misc
    autoRotationEnabled: false,

    // blocks
    blocks: new Map(),
    fieldBlocks: new Map(),

    // properties
    blockSize: 1,
};
