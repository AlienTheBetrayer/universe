import { useEffect, useState } from 'react';
import { useHotkeys } from '../../../../../hooks/useHotkeys';
import { useForgeContext } from '../../../context/ForgeContext';
import type { ForgeSave, WorldSave } from '../../../context/types/world/save';
import { useWorldContext } from '../../../context/WorldContext';
import { useForgeSaveLoad } from './useForgeSaveLoad';

export type SaveLoadPage = 'Save' | 'Load';

export const useInternalForgeSaveLoad = (onInteract?: () => void) => {
    const [, dispatch] = useWorldContext();
    const [saveInputValue, setSaveInputValue] = useState<string>('');
    const [, forgeDispatch] = useForgeContext();

    const controller = useForgeSaveLoad();

    // functions to interact with the controller
    const save = () => {
        if (saveInputValue.length < 5) return;

        controller.save(saveInputValue.replaceAll(' ', '_'));
    };

    const internalLoad = (val: { world: WorldSave; forge: ForgeSave }) => {
        onInteract?.();
        dispatch({
            type: 'LOAD_WORLD',
            world: val.world,
        });
        dispatch({
            type: 'GENERATE_FIELD',
        });
        forgeDispatch({ type: 'LOAD_SAVE', save: val.forge });
    };

    const loadPrompt = () => {
        controller.loadPrompt().then((val) => {
            internalLoad(val);
        });
    };

    // hotkeys logic
    const [currentPage, setCurrentPage] = useState<SaveLoadPage>('Save');

    const hotkeys: Record<SaveLoadPage, () => void> = {
        Save: () => save(),
        Load: () => loadPrompt(),
    };

    useHotkeys([
        {
            hotkey: 'Enter',
            action: () => hotkeys[currentPage](),
            ignoreFocus: true,
        },
    ]);

    // drag / drop file logic
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [visibleError, setErrorVisible] = useState<string | false>(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.name.split('.').pop()?.toLowerCase() === 'forge') {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = (event) => {
                const result = event.target?.result;

                if (result) {
                    internalLoad(controller.parseSave(result as string));
                }
            };

            reader.readAsText(file);
        } else {
            setErrorVisible(file.name);
        }
    };

    useEffect(() => {
        if (visibleError !== false) {
            const timeout = setTimeout(() => setErrorVisible(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [visibleError]);

    return {
        visibleError,
        setErrorVisible,
        currentPage,
        setCurrentPage,
        isDragging,
        setIsDragging,
        loadPrompt,
        save,
        saveInputValue,
        setSaveInputValue,
        handleDrop,
    };
};
