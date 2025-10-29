import { useRef } from 'react';
import {
    BlockDataMaterials,
    type BlockData,
    type BlockDataMaterial,
} from '../../../context/types/world/block';
import { useWorldContext } from '../../../context/WorldContext';

export const useForgeSaveLoad = () => {
    const [state] = useWorldContext();
    const jsonRef = useRef<string>('');

    const save = () => {
        const onlyBlocks = new Map();
        for (const [material, blockData] of state.blocks) {
            if (material !== 'Field') {
                onlyBlocks.set(material, Array.from(blockData.entries()));
            }
        }

        const data = {
            blocks: Array.from(onlyBlocks.entries()),
            blockSize: state.blockSize,
        };

        const dataJSON = JSON.stringify(data, null, 2);
        jsonRef.current = dataJSON;
        console.log(dataJSON);
    };

    const load = (json: string) => {
        const parsed = JSON.parse(jsonRef.current);
        const blocksMap = new Map<BlockDataMaterial, Map<string, BlockData>>();

        for (const [materialType, entries] of parsed.blocks) {
            const innerMap = new Map<string, BlockData>(entries);
            blocksMap.set(materialType, innerMap);
        }

        console.log(blocksMap);

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
