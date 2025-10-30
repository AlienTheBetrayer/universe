import type { WorldData } from '../types/world/data';

export const WorldReducerInitialState: WorldData = {
    // misc
    autoRotationEnabled: false,

    // blocks
    blocks: new Map(),
    currentBlockMaterial: 'Metal',
    currentInteractionMode: 'building',

    // properties
    blockSize: 1,
};
