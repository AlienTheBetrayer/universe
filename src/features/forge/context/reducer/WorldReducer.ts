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
    | { type: 'SELECT_BUILDING_BLOCK_IDX'; idx: number }

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
            const newBlocks = new Map(state.blocks);

            newBlocks
                .get(action.data.material)
                ?.set(action.data.position.join(','), action.data);

            return { ...state, blocks: newBlocks };
        }
        case 'DELETE_BLOCK': {
            const newBlocks = new Map(state.blocks);

            newBlocks
                .get(action.data.material)
                ?.delete(action.data.position.join(','));

            return { ...state, blocks: newBlocks };
        }
        case 'WIPE_BLOCKS': {
            const newBlocks = new Map(state.blocks);

            for (const material of newBlocks.keys()) {
                if (material !== 'Field') newBlocks.get(material)?.clear();
            }
            return { ...state, blocks: newBlocks };
        }

        // building blocks
        case 'SELECT_BUILDING_BLOCK':
            return { ...state, currentBlockMaterial: action.block };
        case 'SELECT_BUILDING_BLOCK_IDX': {
            const blocks = Object.keys(BlockDataMaterials);
            if (action.idx >= blocks.length) return state;

            const block = blocks[action.idx];
            return {
                ...state,
                currentBlockMaterial: block as BlockDataMaterial,
            };
        }

        // field
        case 'GENERATE_FIELD': {
            const field = new Map(state.blocks);
            field.get('Field')?.clear();

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
            const maps = new Map(state.blocks);

            for (const material of Object.keys(BlockDataMaterials)) {
                if (!maps.has(material as BlockDataMaterial)) {
                    maps.set(material as BlockDataMaterial, new Map());
                }
            }

            return { ...state, blocks: maps };
        }

        // properties
        case 'PROPERTY_SET_BLOCK_SIZE':
            return { ...state, blockSize: action.size };
    }
};
