import { AnimatePresence, motion } from 'motion/react';
import { HotkeyTooltip } from '../../../../hotkeytooltip/components/HotkeyTooltip';
import { Button } from '../../../../ui/Button/components/Button';
import { Input } from '../../../../ui/Input/components/Input';
import { SelectorMenu } from '../../../../ui/SelectorMenu/components/SelectorMenu';
import { ForgePageTemplate } from '../ForgePageTemplate';
import './ForgeSaveLoad.css';

import dragDropImg from '../../../assets/dragdrop.svg';

import {
    useInternalForgeSaveLoad,
    type SaveLoadPage,
} from '../hooks/useInternalForgeSaveLoad';

interface Props {
    onInteract?: () => void;
}

export const ForgeSaveLoad = ({ onInteract }: Props) => {
    const controller = useInternalForgeSaveLoad(onInteract);

    return (
        <ForgePageTemplate
            className='forge-save-load'
            onInteract={() => onInteract?.()}
            title='Save or load a <mark>world</mark>!'
            onDrop={controller.handleDrop}
            onDragOver={(e) => {
                e.preventDefault();

                controller.setIsDragging(true);
            }}
            onDragLeave={() => {
                controller.setIsDragging(false);
            }}
            style={controller.isDragging ? { borderColor: '#00f' } : {}}
        >
            <SelectorMenu
                onSelect={(page) =>
                    controller.setCurrentPage(page.name as SaveLoadPage)
                }
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
                                    value={controller.saveInputValue}
                                    onChange={(val) =>
                                        controller.setSaveInputValue(val)
                                    }
                                    onClear={() =>
                                        controller.setSaveInputValue('')
                                    }
                                />
                                <Button
                                    enabled={
                                        controller.saveInputValue.length >= 5
                                    }
                                    onClick={() => controller.save()}
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
                                <Button onClick={() => controller.loadPrompt()}>
                                    Load{' '}
                                    <small>(open a file / drag & drop)</small>
                                    <HotkeyTooltip hotkeys={['Enter']} />
                                </Button>
                                <img
                                    src={dragDropImg}
                                    style={{
                                        filter: 'invert(0.5)',
                                        width: '20%',
                                        height: '20%',
                                        margin: '0 auto',
                                    }}
                                    alt='drag and drop'
                                />
                            </div>
                        ),
                    },
                ]}
            />

            <AnimatePresence>
                {controller.visibleError !== false && (
                    <motion.div
                        className='forge-save-load-error'
                        initial={{ height: '0' }}
                        animate={{ height: 'auto' }}
                        exit={{ height: '0' }}
                    >
                        <div className='forge-save-load-error-content'>
                            <div className='forge-save-load-error-content-topline'>
                                <h4>
                                    File format <u>error</u>
                                </h4>
                                <Button
                                    style={{ marginLeft: 'auto' }}
                                    className='forge-cancel-button'
                                    onClick={() =>
                                        controller.setErrorVisible(false)
                                    }
                                >
                                    ✕
                                </Button>
                            </div>

                            <div className='forge-save-load-error-content-main'>
                                <p>
                                    <b>{controller.visibleError}</b> is{' '}
                                    <u>not</u> a world save!
                                </p>
                                <p>
                                    Drag a proper <mark>.forge</mark> world
                                    save.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ForgePageTemplate>
    );
};
