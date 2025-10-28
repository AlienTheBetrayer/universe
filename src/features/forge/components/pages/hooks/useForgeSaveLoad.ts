import { useRef } from 'react';
import {
    BlockDataMaterials,
    type BlockData,
    type BlockDataMaterial,
} from '../../../context/types/world/block';
import { useWorldContext } from '../../../context/WorldContext';

interface ParsedSaveLoad {
    blocks: [keyof typeof BlockDataMaterials, [string, BlockData][]][];
    blockSize: number;
}

export const useForgeSaveLoad = () => {
    const [state] = useWorldContext();
    const jsonRef = useRef<string>('');

    const save = () => {
        const onlyBlocks = new Map();
        for (const [material, blockData] of state.blocks) {
            if (material !== BlockDataMaterials.Field) {
                onlyBlocks.set(material, Array.from(blockData.entries()));
            }
        }

        const data = {
            blocks: Array.from(onlyBlocks.entries()),
            blockSize: state.blockSize,
        };

        const dataJSON = JSON.stringify(data, null, 2);
        jsonRef.current = dataJSON;
    };

    const load = (json: string) => {
        const parsed: ParsedSaveLoad = JSON.parse(jsonRef.current);
        const blocksMap = new Map<BlockDataMaterial, Map<string, BlockData>>();

        for (const [materialType, entries] of parsed.blocks) {
            if (materialType) {
                const material = BlockDataMaterials[materialType];
                const innerMap = new Map(entries);
                blocksMap.set(material, innerMap);
            }
        }

        return {
            blocks: blocksMap,
            blockSize: parsed.blockSize,
        };
    };

    return {
        load,
        save,
    };
};
