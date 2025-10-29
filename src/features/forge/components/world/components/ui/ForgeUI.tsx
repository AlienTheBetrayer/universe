import { Button } from '../../../../../ui/Button/components/Button';
import './ForgeUI.css';

import { usePopup } from '../../../../../../hooks/usePopup';
import { MessageBox } from '../../../../../messagebox/components/MessageBox';
import { useTooltips } from '../../../../../tooltip/hooks/useTooltips';
import deleteImg from '../../../../assets/delete.svg';
import rotateImg from '../../../../assets/reverse.svg';
import settingsImg from '../../../../assets/settings.svg';
import { useWorldContext } from '../../../../context/WorldContext';

import { AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { useClickOutside } from '../../../../../../hooks/useClickOutside';
import { useHotkeys } from '../../../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../../../hotkeytooltip/components/HotkeyTooltip';
import { useForgeContext } from '../../../../context/ForgeContext';
import { ForgeUISettings } from './ForgeUISettings';

export const ForgeUI = () => {
    const [state, dispatch] = useWorldContext();
    const [, forgeDispatch] = useForgeContext();

    // menu visibility
    const [settingsShown, setSettingsShown] = useState<boolean>(false);
    const settingsOpenButtonRef = useRef<HTMLButtonElement>(null);
    const settingsMenuRef = useClickOutside<HTMLDivElement>(
        () => setSettingsShown(false),
        [settingsOpenButtonRef.current]
    );

    // hotkeys
    useHotkeys([{ hotkey: 'Escape', action: () => setSettingsShown(false) }]);

    // popups
    const wipeMessageBox = usePopup(
        <MessageBox
            title='Are you sure?'
            description='You are about to <u>wipe</u> all <mark>blocks</mark>'
            onInteract={(flag) => {
                if (flag) dispatch({ type: 'WIPE_BLOCKS' });
                wipeMessageBox.setShown(false);
            }}
        />
    );

    // tooltips
    const tooltips = useTooltips();

    return (
        <div className='forge-ui'>
            {tooltips.render()}
            {wipeMessageBox.render()}

            <Button
                onClick={() => wipeMessageBox.setShown(true)}
                ref={(el) => tooltips.set(0, 'Delete all blocks', el, 'up')}
            >
                <img src={deleteImg} alt='' className='forge-image' />
                <u>Clear</u>
            </Button>

            <div style={{ position: 'relative' }}>
                <Button
                    ref={(el) => {
                        settingsOpenButtonRef.current = el;
                        tooltips.set(1, "Show world's properties", el, 'up');
                    }}
                    onClick={() => setSettingsShown((prev) => !prev)}
                >
                    <img src={settingsImg} alt='' className='forge-image' />
                    Settings
                    {settingsShown && <HotkeyTooltip hotkeys={['Esc']} />}
                </Button>

                <AnimatePresence>
                    {settingsShown && (
                        <ForgeUISettings
                            ref={settingsMenuRef}
                            onCancel={() => setSettingsShown(false)}
                        />
                    )}
                </AnimatePresence>
            </div>

            <Button
                ref={(el) => tooltips.set(3, 'Save / Load a world', el, 'up')}
                onClick={() =>
                    forgeDispatch({ type: 'SWITCH_PAGE', page: 'save_load' })
                }
            >
                <mark>Save / Load</mark>
            </Button>

            <Button
                ref={(el) => tooltips.set(2, 'Toggle auto-rotation', el, 'up')}
                style={{ marginLeft: 'auto' }}
                onClick={() => dispatch({ type: 'TOGGLE_AUTO_ROTATE' })}
            >
                <img src={rotateImg} alt='' className='forge-image' />
                {state.autoRotationEnabled ? (
                    <u>Disable</u>
                ) : (
                    <mark>Enable</mark>
                )}
                auto-rotate
            </Button>
        </div>
    );
};
