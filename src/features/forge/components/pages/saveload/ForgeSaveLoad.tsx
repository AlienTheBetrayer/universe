import { useState } from 'react';
import { useHotkeys } from '../../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../../../ui/Button/components/Button';
import { Input } from '../../../../ui/Input/components/Input';
import { SelectorMenu } from '../../../../ui/SelectorMenu/components/SelectorMenu';
import { useForgeContext } from '../../../context/ForgeContext';
import { useWorldContext } from '../../../context/WorldContext';
import { ForgePageTemplate } from '../ForgePageTemplate';
import { useForgeSaveLoad } from '../hooks/useForgeSaveLoad';
import './ForgeSaveLoad.css';

type SaveLoadPage = 'Save' | 'Load';

interface Props {
    onInteract?: () => void;
}

export const ForgeSaveLoad = ({ onInteract }: Props) => {
    const [, dispatch] = useWorldContext();
    const [, forgeDispatch] = useForgeContext();

    const [saveInputValue, setSaveInputValue] = useState<string>('');

    const controller = useForgeSaveLoad();

    // functions to interact with the controller
    const save = () => {
        if (saveInputValue.length < 5) return;

        controller.save(saveInputValue.replaceAll(' ', '_'));
    };

    const load = () => {
        controller.load().then((val) => {
            onInteract?.();
            dispatch({
                type: 'LOAD_WORLD',
                world: val.world,
            });
            dispatch({
                type: 'GENERATE_FIELD',
            });
            forgeDispatch({ type: 'LOAD_SAVE', save: val.forge });
        });
    };

    // hotkeys logic
    const [currentPage, setCurrentPage] = useState<SaveLoadPage>('Save');

    const hotkeys: Record<SaveLoadPage, () => void> = {
        Save: () => save(),
        Load: () => load(),
    };

    useHotkeys([
        {
            hotkey: 'Enter',
            action: () => hotkeys[currentPage](),
            ignoreFocus: true,
        },
    ]);

    return (
        <ForgePageTemplate
            className='forge-save-load'
            onInteract={() => onInteract?.()}
            title='Save or load a <mark>world</mark>!'
        >
            <SelectorMenu
                onSelect={(page) => setCurrentPage(page.name as SaveLoadPage)}
                items={[
                    {
                        name: 'Save',
                        jsx: (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <h4>
                                    World's <mark>name</mark>
                                    <small> (5 characters minimum) </small>
                                </h4>
                                <Input
                                    placeholder='Enter...'
                                    value={saveInputValue}
                                    onChange={(val) => setSaveInputValue(val)}
                                    onClear={() => setSaveInputValue('')}
                                />
                                <Button
                                    enabled={saveInputValue.length >= 5}
                                    onClick={() => save()}
                                >
                                    Save <small>(to your computer)</small>
                                    <HotkeyTooltip hotkeys={['Enter']} />
                                </Button>
                            </div>
                        ),
                    },
                    {
                        name: 'Load',
                        jsx: (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <Button onClick={() => load()}>
                                    Load <small>(open a file)</small>
                                    <HotkeyTooltip hotkeys={['Enter']} />
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />
        </ForgePageTemplate>
    );
};
