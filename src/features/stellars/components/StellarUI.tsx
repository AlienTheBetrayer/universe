import { AnimatePresence, motion } from 'motion/react';
import { useStellarContext } from '../context/StellarContext';
import './StellarUI.css';

import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

import clearImg from '../assets/clear.svg';
import moveImg from '../assets/move.svg';
import regenerateImg from '../assets/regenerate.svg';
import tutorialImg from '../assets/tutorial.svg';

import React, { useEffect } from 'react';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { Button } from '../../ui/Button/components/Button';
import type { StellarAction } from '../context/reducer/StellarReducer';
import type { StellarState } from '../context/types/stellarData';
import { useStellarActions } from '../hooks/useStellarActions';

export const StellarUI = () => {
    const [state, dispatch] = useStellarContext();
    const actions = useStellarActions();
    const tooltips = useTooltips();

    // state syncing with the visibility of the clear message box to prevent hotkeys
    useEffect(() => {
        dispatch({
            type: 'MESSAGEBOX_SET_VISIBLE',
            flag: actions.clearMessageBox.shown,
        });
    }, [actions.clearMessageBox.shown]);

    // as soon movement stops in the state
    // we hide the popup
    useEffect(() => {
        if (state.movingIdx === false)
            dispatch({ type: 'ISMOVEWAITING_SET', flag: false });
    }, [state.movingIdx]);

    // popup state sync with state (so we can call it from other components)
    useEffect(() => {
        actions.waitingPopup.setShown(state.isMoveWaiting);
    }, [state.isMoveWaiting]);

    return (
        <>
            {tooltips.render()}

            <StellarUIMovementButtons state={state} dispatch={dispatch} />
            <StellarUIBottomBar
                state={state}
                dispatch={dispatch}
                actions={actions}
            />

            {actions.waitingPopup.render()}
            {actions.hover.render()}
            {actions.clearMessageBox.render()}
        </>
    );
};

interface MovementProps {
    state: StellarState;
    dispatch: React.Dispatch<StellarAction>;
}

const StellarUIMovementButtons = ({ state, dispatch }: MovementProps) => {
    const tooltips = useTooltips();

    return (
        <>
            {tooltips.render()}

            <motion.div
                className='stellar-ui-previous-button'
                style={{ y: '-50%' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            >
                {/* previous orb nav button */}
                <Button
                    ref={(el) => {
                        tooltips.set(0, 'Previous orb', el, 'right');
                    }}
                    enabled={!state.isMoveWaiting}
                    className='stellar-button'
                    onClick={() => dispatch({ type: 'STELLAR_PREVIOUS' })}
                >
                    ←
                </Button>

                <HotkeyTooltip
                    className='stellar-tooltip'
                    hotkeys={['←', 'A']}
                />
            </motion.div>

            <motion.div
                className='stellar-ui-next-button'
                style={{ y: '-50%' }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            >
                {/* next orb nav button */}
                <Button
                    ref={(el) => {
                        tooltips.set(1, 'Next orb', el, 'left');
                    }}
                    enabled={!state.isMoveWaiting}
                    className='stellar-button'
                    onClick={() => dispatch({ type: 'STELLAR_NEXT' })}
                >
                    →
                </Button>
                <HotkeyTooltip
                    className='stellar-tooltip'
                    hotkeys={['D', '→']}
                />
            </motion.div>
        </>
    );
};

interface BottomProps {
    state: StellarState;
    dispatch: React.Dispatch<StellarAction>;
    actions: ReturnType<typeof useStellarActions>;
}

const StellarUIBottomBar = ({ state, dispatch, actions }: BottomProps) => {
    // state
    const isSelected = state.selectedIdx !== false;

    // tooltips
    const tooltips = useTooltips();

    return (
        <motion.div
            className='stellar-ui-bottom-bar'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
        >
            <div className='stellar-ui-bottom-bar-buttons-container'>
                {/* wipe an orb button */}
                <Button
                    className='stellar-button stellar-button-action'
                    enabled={!state.isMoveWaiting}
                    ref={(el) => {
                        tooltips.set(
                            2,
                            isSelected ? 'Wipe this orb' : 'Wipe all orbs',
                            el,
                            'right'
                        );
                    }}
                    onClick={() => actions.clearMessageBox.setShown(true)}
                >
                    <img src={clearImg} alt='clear' />
                </Button>

                {/* move an orb button */}
                {!isSelected && (
                    <Button
                        className='stellar-button stellar-button-action'
                        ref={(el) => {
                            tooltips.set(4, 'Move an orb', el, 'right');
                        }}
                        onClick={() => {
                            dispatch({ type: 'ISMOVEWAITING_TOGGLE' });
                        }}
                    >
                        <img src={moveImg} alt='move' />
                    </Button>
                )}
            </div>

            <div className='stellar-ui-bottom-bar-buttons-container stellar-ui-bottom-bar-centered-container'>
                <AnimatePresence>
                    {isSelected && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                            }}
                        >
                            Selected: {state.selectedIdx}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* back button */}
                <Button
                    className={`stellar-button`}
                    enabled={isSelected}
                    onClick={() =>
                        dispatch({ type: 'STELLAR_FOCUS', idx: false })
                    }
                >
                    Go back
                    <HotkeyTooltip
                        className='stellar-tooltip'
                        hotkeys={['Esc']}
                    />
                </Button>
            </div>

            {/* question the existence of this button */}
            <div className='stellar-ui-bottom-bar-buttons-container stellar-ui-bottom-bar-right-container'>
                {!isSelected && (
                    <>
                        {/* show tutorial button */}
                        <Button
                            className='stellar-button stellar-button-action'
                            enabled={!state.isMoveWaiting}
                            ref={(el) => {
                                tooltips.set(3, 'Show tutorial', el, 'left');
                            }}
                            onClick={() =>
                                dispatch({
                                    type: 'TUTORIAL_SET_VISIBLE',
                                    flag: true,
                                })
                            }
                        >
                            <img src={tutorialImg} alt='tutorial' />
                        </Button>

                        {/* regenerate positions button */}
                        <Button
                            className='stellar-button stellar-button-action'
                            enabled={!state.isMoveWaiting}
                            ref={(el) => {
                                tooltips.set(
                                    6,
                                    'Regenerate positions',
                                    el,
                                    'left'
                                );
                            }}
                            onClick={() => {
                                state.stellars.forEach((stellar) => {
                                    dispatch({
                                        type: 'STELLAR_MOVE_RANDOM',
                                        idx: stellar.idx,
                                    });
                                });
                            }}
                        >
                            <img src={regenerateImg} alt='regen' />
                        </Button>
                    </>
                )}
            </div>
        </motion.div>
    );
};
