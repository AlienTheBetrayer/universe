import { Button } from '../../../../../ui/Button/components/Button';
import './ForgeUI.css';

import { usePopup } from '../../../../../../hooks/usePopup';
import { MessageBox } from '../../../../../messagebox/components/MessageBox';
import { useTooltips } from '../../../../../tooltip/hooks/useTooltips';
import deleteImg from '../../../../assets/delete.svg';
import rotateImg from '../../../../assets/reverse.svg';
import { useWorldContext } from '../../../../context/WorldContext';
import type { WorldReducerAction } from '../../../../context/reducer/WorldReducer';
import type { WorldData } from '../../../../context/types/world/data';

import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useHotkeys } from '../../../../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../../../../hotkeytooltip/components/HotkeyTooltip';
import fullscreenImg from '../../../../assets/fullscreen.svg';
import settingsImg from '../../../../assets/settings.svg';
import { useForgeContext } from '../../../../context/ForgeContext';
import { ForgeUISettings } from './ForgeUISettings';

export const ForgeUI = () => {
    const [state, dispatch] = useWorldContext();

    return (
        <div className='forge-ui'>
            <ForgeUITop />
            <ForgeUIBottom state={state} dispatch={dispatch} />
        </div>
    );
};

export const ForgeUITop = () => {
    const [, dispatch] = useForgeContext();

    const tooltips = useTooltips();

    return (
        <div className='forge-ui-top'>
            {tooltips.render()}

            <Button
                style={{ marginLeft: 'auto' }}
                ref={(el) =>
                    tooltips.set(0, 'Enter / exit fullscreen', el, 'down')
                }
                onClick={() => dispatch({ type: 'WORLD_FULLSCREEN_TOGGLE' })}
            >
                <img
                    src={fullscreenImg}
                    alt='fullscreen'
                    className='forge-image'
                />
            </Button>
        </div>
    );
};

interface BottomProps {
    state: WorldData;
    dispatch: React.Dispatch<WorldReducerAction>;
}

export const ForgeUIBottom = ({ state, dispatch }: BottomProps) => {
    const [settingsShown, setSettingsShown] = useState<boolean>(false);

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

    const tooltips = useTooltips();

    useHotkeys([{ hotkey: 'Escape', action: () => setSettingsShown(false) }]);

    return (
        <div className='forge-ui-bottom'>
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
                <Button onClick={() => setSettingsShown((prev) => !prev)}>
                    <img src={settingsImg} alt='' className='forge-image' />
                    Settings
                    {settingsShown && <HotkeyTooltip hotkeys={['Esc']} />}
                </Button>
                <AnimatePresence>
                    {settingsShown && (
                        <ForgeUISettings
                            onCancel={() => setSettingsShown(false)}
                        />
                    )}
                </AnimatePresence>
            </div>

            <Button
                ref={(el) => tooltips.set(1, 'Toggle auto-rotation', el, 'up')}
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
