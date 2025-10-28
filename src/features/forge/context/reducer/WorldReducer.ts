import { cssVariable } from '../../../../utils/cssVariable';
import {
    BlockDataMaterials,
    type BlockData,
    type BlockDataMaterial,
} from '../types/world/block';
import type { WorldData } from '../types/world/data';

export type WorldReducerAction =
    // blocks
    | { type: 'CREATE_BLOCK'; data: BlockData }
    | { type: 'DELETE_BLOCK'; data: BlockData }
    | { type: 'WIPE_BLOCKS' }

    // building blocks
    | { type: 'SELECT_BUILDING_BLOCK'; block: BlockDataMaterial }

    // field
    | { type: 'GENERATE_FIELD' }

    // world properties
    | { type: 'PROPERTY_SET_BLOCK_SIZE'; size: number }

    // misc
    | { type: 'TOGGLE_AUTO_ROTATE' }
    | { type: 'GENERATE_MAPS' };

export const WorldReducer = (
    state: WorldData,
    action: WorldReducerAction
): WorldData => {
    switch (action.type) {
        // blocks
        case 'CREATE_BLOCK': {
            const newBlocks = state.blocks;
            newBlocks
                .get(action.data.material)
                ?.set(action.data.position.join(','), action.data);

            return { ...state, blocks: newBlocks };
        }
        case 'DELETE_BLOCK': {
            const newBlocks = state.blocks;
            newBlocks
                .get(action.data.material)
                ?.delete(action.data.position.join(','));

            return { ...state, blocks: newBlocks };
        }
        case 'WIPE_BLOCKS': {
            const newBlocks = state.blocks;

            for (const material of newBlocks.keys()) {
                if (material !== 'Field') newBlocks.get(material)?.clear();
            }
            return { ...state, blocks: newBlocks };
        }

        // building blocks
        case 'SELECT_BUILDING_BLOCK':
            return { ...state, currentBlockMaterial: action.block };

        // field
        case 'GENERATE_FIELD': {
            const field = state.blocks;

            for (let z = 0; z < 32; ++z) {
                for (let x = 0; x < 32; ++x) {
                    field
                        .get('Field')
                        ?.set(
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
        case 'GENERATE_MAPS': {
            const maps = state.blocks;

            for (const type of BlockDataMaterials) {
                if (!maps.get(type)) {
                    maps.set(type, new Map());
                    console.log('set: ', type);
                }
            }

            return { ...state, blocks: maps };
        }

        // properties
        case 'PROPERTY_SET_BLOCK_SIZE':
            return { ...state, blockSize: action.size };
    }
};
