import { cssVariable } from '../../../../utils/cssVariable';
import type { BlockData, BlockDataMaterial } from '../types/world/block';
import type { WorldData } from '../types/world/data';

export type WorldReducerAction =
    // blocks
    | { type: 'CREATE_BLOCK'; data: BlockData }
    | { type: 'DELETE_BLOCK'; position: [number, number, number] }
    | { type: 'WIPE_BLOCKS' }

    // building blocks
    | { type: 'SELECT_BUILDING_BLOCK'; block: BlockDataMaterial }

    // field
    | { type: 'GENERATE_FIELD' }

    // world properties
    | { type: 'PROPERTY_SET_BLOCK_SIZE'; size: number }

    // misc
    | { type: 'TOGGLE_AUTO_ROTATE' };

export const WorldReducer = (
    state: WorldData,
    action: WorldReducerAction
): WorldData => {
    switch (action.type) {
        // blocks
        case 'CREATE_BLOCK': {
            const newBlocks = state.blocks;
            newBlocks.set(action.data.position.join(','), action.data);

            return { ...state, blocks: newBlocks };
        }
        case 'DELETE_BLOCK': {
            const newBlocks = state.blocks;
            newBlocks.delete(action.position.join(','));

            return { ...state, blocks: newBlocks };
        }
        case 'WIPE_BLOCKS':
            return { ...state, blocks: new Map() };

        // building blocks
        case 'SELECT_BUILDING_BLOCK':
            return { ...state, currentBlockMaterial: action.block };

        // field
        case 'GENERATE_FIELD': {
            const field = state.blocks;

            for (let z = 0; z < 32; ++z) {
                for (let x = 0; x < 32; ++x) {
                    field.set(
                        `${x * state.blockSize},${state.blockSize},${
                            z * state.blockSize
                        }`,
                        {
                            position: [
                                x * state.blockSize,
                                state.blockSize,
                                z * state.blockSize,
                            ],
                            material: 'Field',
                            color: cssVariable('--forge-background'),
                        }
                    );
                }
            }

            return { ...state, blocks: field };
        }

        // misc
        case 'TOGGLE_AUTO_ROTATE':
            return {
                ...state,
                autoRotationEnabled: !state.autoRotationEnabled,
            };

        // properties
        case 'PROPERTY_SET_BLOCK_SIZE':
            return { ...state, blockSize: action.size };
    }
};
