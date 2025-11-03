import { loadFromFile } from '../../../../../utils/loadFromFile';
import { saveToFile } from '../../../../../utils/saveToFile';
import { useForgeContext } from '../../../context/ForgeContext';
import { type BlockData } from '../../../context/types/world/block';
import type { ForgeSave, WorldSave } from '../../../context/types/world/save';
import { useWorldContext } from '../../../context/WorldContext';

export const useForgeSaveLoad = () => {
    const [state] = useWorldContext();
    const [forgeState] = useForgeContext();

    const parseSave = (value: string) => {
        const parsed: { world: WorldSave; forge: ForgeSave } =
            JSON.parse(value);
        const blocksMap: WorldSave['blocks'] = new Map();

        for (const [materialType, entries] of parsed.world.blocks) {
            const innerMap = new Map<string, BlockData>(entries);
            blocksMap.set(materialType, innerMap);
        }
        parsed.world.blocks = blocksMap;

        return {
            world: {
                blocks: parsed.world.blocks,
                blockSize: parsed.world.blockSize,
                currentBlockMaterial: parsed.world.currentBlockMaterial,
                worldName: parsed.world.worldName,
            },
            forge: {
                cards: parsed.forge.cards,
                effectSlots: parsed.forge.effectSlots,
            },
        };
    };

    // USER API
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
            world: {
                blocks: Array.from(onlyBlocks.entries()),
                blockSize: state.blockSize,
                currentBlockMaterial: state.currentBlockMaterial,
                worldName: name,
            },
            forge: {
                cards: forgeState.cards,
                effectSlots: forgeState.effectSlots,
            },
        };
        saveToFile(data, `${name}.forge`);
    };

    const loadPrompt = async () => {
        return new Promise<{ world: WorldSave; forge: ForgeSave }>(
            (resolve, reject) => {
                loadFromFile('.forge').then((text) => {
                    if (!text) {
                        reject(new Error('No file content.'));
                        return;
                    }

                    const parsed = parseSave(text);

                    resolve(parsed);
                });
            }
        );
    };

    return {
        loadPrompt,
        parseSave,
        save,
    };
};
