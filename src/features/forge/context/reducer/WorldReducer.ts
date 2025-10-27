import { cssVariable } from '../../../../utils/cssVariable';
import type { BlockData } from '../types/world/block';
import type { WorldData } from '../types/world/data';

export type WorldReducerAction =
    // blocks
    | { type: 'CREATE_BLOCK'; data: BlockData }
    | { type: 'WIPE_BLOCKS' }

    // field
    | { type: 'GENERATE_FIELD' }

    // misc
    | { type: 'TOGGLE_AUTO_ROTATE' };

export const WorldReducer = (
    state: WorldData,
    action: WorldReducerAction
): WorldData => {
    switch (action.type) {
        // blocks
        case 'CREATE_BLOCK':
            return { ...state, blocks: [...state.blocks, action.data] };
        case 'WIPE_BLOCKS':
            return { ...state, blocks: [] };

        // field
        case 'GENERATE_FIELD': {
            const field: BlockData[] = [];

            for (let z = 0; z < 32; ++z) {
                for (let x = 0; x < 32; ++x) {
                    field.push({
                        position: [x * state.blockSize, state.blockSize, z * state.blockSize],
                        color: cssVariable('--forge-background'),
                    });
                }
            }

            return { ...state, fieldBlocks: field };
        }

        // misc
        case 'TOGGLE_AUTO_ROTATE':
            return {
                ...state,
                autoRotationEnabled: !state.autoRotationEnabled,
            };
    }
};
