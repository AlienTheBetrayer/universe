import { loadFromFile } from '../../../../../utils/loadFromFile';
import { saveToFile } from '../../../../../utils/saveToFile';
import { type BlockData } from '../../../context/types/world/block';
import type { WorldSave } from '../../../context/types/world/save';
import { useWorldContext } from '../../../context/WorldContext';

export const useForgeSaveLoad = () => {
    const [state] = useWorldContext();

    const save = (name: string) => {
        const onlyBlocks = new Map();
        for (const [material, blockData] of state.blocks) {
            if (material !== 'Field') {
                onlyBlocks.set(material, Array.from(blockData.entries()));
            } else {
                onlyBlocks.set(material, []);
            }
        }

        const data = {
            blocks: Array.from(onlyBlocks.entries()),
            blockSize: state.blockSize,
            currentBlockMaterial: state.currentBlockMaterial,
            worldName: name,
        };
        saveToFile(data, `${name}.forge`);
    };

    const load = async () => {
        return new Promise<WorldSave>((resolve, reject) => {
            loadFromFile('.forge').then((text) => {
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
                    blocks: parsed.blocks,
                    blockSize: parsed.blockSize,
                    currentBlockMaterial: parsed.currentBlockMaterial,
                    worldName: parsed.worldName
                });
            });
        });
    };

    return {
        load,
        save,
    };
};
