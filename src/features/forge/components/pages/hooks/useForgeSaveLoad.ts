import { loadFromFile } from '../../../../../utils/loadFromFile';
import {
    type BlockData,
    type BlockDataMaterial,
} from '../../../context/types/world/block';
import { useWorldContext } from '../../../context/WorldContext';

interface WorldSave {
    blocks: Map<BlockDataMaterial, Map<string, BlockData>>;
    blockSize: number;
}

export const useForgeSaveLoad = () => {
    const [state] = useWorldContext();

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
    };

    const load = async () => {
        return new Promise<WorldSave>((resolve, reject) => {
            loadFromFile('.world').then((text) => {
                if (!text) {
                    reject(new Error('No file content.'));
                    return;
                }

                const parsed: WorldSave = JSON.parse(text);
                const blocksMap: WorldSave['blocks'] = new Map();

                for (const [materialType, entries] of parsed.blocks) {
                    const innerMap = new Map<string, BlockData>(entries);
                    blocksMap.set(materialType, innerMap);
                }
                parsed.blocks = blocksMap;

                resolve({
                    blocks: blocksMap,
                    blockSize: parsed.blockSize,
                });
            });
        });
    };

    return {
        load,
        save,
    };
};
