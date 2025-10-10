import './StellarUI.css';
import { useStellarContext } from '../context/StellarContext';
import { AnimatePresence, motion } from 'motion/react';

import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

import regenerateImg from '../assets/regenerate.svg';
import tutorialImg from '../assets/tutorial.svg';
import clearImg from '../assets/clear.svg';
import moveImg from '../assets/move.svg';

import { useStellarActions } from '../hooks/useStellarActions';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { useEffect, useState } from 'react';
import { useHotkeys } from '../../../hooks/useHotkeys';

export const StellarUI = () => {
    const [state, setState] = useStellarContext();
    const isSelected = state.selected !== false;
    const actions = useStellarActions();
    const tooltips = useTooltips();

    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    useEffect(() => {
        setState(prev => ({ ...prev, messageBoxVisible: actions.clearMessageBox.shown }));
    }, [actions.clearMessageBox.shown]);

    useHotkeys([
        { hotkey: 'Escape', action: () => setIsWaiting(false) }
    ]);

    useEffect(() => {
        actions.waitingPopup.setShown(isWaiting);
        setState(prev => ({ ...prev, isMoveWaiting: isWaiting }));
    }, [isWaiting]);

    useEffect(() => {
        if(state.moving === false)
            setIsWaiting(false);
    }, [state.moving]);

    return (
        <>
            { tooltips.render() }
        
            { actions.waitingPopup.render() }
            { actions.hover.render() }
            { actions.clearMessageBox.render() }
            
            <motion.button className='stellar-button stellar-ui-previous-button'
            ref={el => { tooltips.set(0, 'Previous orb', el, 'right') }}
            style={{ y: '-50%'}}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => 
                setState(prev => {
                        const indexes = prev.stellars.map(s => s.idx);
                        indexes.sort();
                        return { ...prev, selected: prev.selected === false ? indexes[0] : (prev.selected === indexes[0] ? indexes.at(-1)! : indexes[indexes.indexOf(prev.selected) - 1]) };
                    })}>
                ←
                <HotkeyTooltip className='stellar-tooltip' hotkeys={['←', 'A']}/>
            </motion.button>

            <motion.button className='stellar-button stellar-ui-next-button'
            ref={el => { tooltips.set(1, 'Next orb', el, 'left') }}
            style={{ y: '-50%'}}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() =>                        
                 setState(prev => {
                        const indexes = prev.stellars.map(s => s.idx);
                        indexes.sort();
                        return { ...prev, selected: prev.selected === false ? indexes.at(-1)! : (prev.selected === indexes.at(-1)! ? indexes[0] : indexes[indexes.indexOf(prev.selected) + 1]) };
                    })}>
                →
                <HotkeyTooltip className='stellar-tooltip' hotkeys={['D', '→']}/>
            </motion.button>

            <motion.div
            className='stellar-ui-bottom-bar'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}>
                <div className='stellar-ui-bottom-bar-buttons-container'>
                    <button className='stellar-button stellar-button-action'
                    ref={el => { tooltips.set(2, isSelected ? 'Wipe this orb' : 'Wipe all orbs', el, 'right') }}
                    onClick={() => actions.clearMessageBox.setShown(true)}>
                        <img src={clearImg} alt='clear'/>
                    </button>

                    { !isSelected && (
                        <>
                            <button className='stellar-button stellar-button-action'
                            ref={el => { tooltips.set(3, 'Show tutorial', el, 'right') }}
                            onClick={() => setState(prev => ({ ...prev, tutorialVisible: true }))}>
                                <img src={tutorialImg} alt='tutorial'/>
                            </button>

                            <button className='stellar-button stellar-button-action'
                            ref={el => { tooltips.set(4, 'Move an orb', el, 'right') }}
                            onClick={() => {
                                setIsWaiting(prev => !prev);
                                actions.setWaitingPopupText(['Click on an orb you want to move.', 'and then <b>click again</b> to move it there']);
                            }}>
                                <img src={moveImg} alt='move'/>
                            </button>
                        </>
                    )}
                </div>

                <div className='stellar-ui-bottom-bar-buttons-container stellar-ui-bottom-bar-centered-container'>
                    <AnimatePresence>
                        { isSelected && 
                            <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}>
                                Selected: {state.selected}
                            </motion.p>
                        }
                    </AnimatePresence>
                    
                    <button className={`stellar-button ${!isSelected ? 'stellar-button-deactivated' : ''}`} 
                    onClick={() => setState(prev => ({ ...prev, selected: false }))}>
                        Go back
                        <HotkeyTooltip className='stellar-tooltip' hotkeys={['Esc']}/>
                    </button>
                </div>

                {/* question the existence of this button */}
                <div className='stellar-ui-bottom-bar-buttons-container stellar-ui-bottom-bar-right-container'>
                    { !isSelected && (
                        <button className='stellar-button stellar-button-action'
                        ref={el => { tooltips.set(6, 'Regenerate positions', el, 'left') }}
                        onClick={() => actions.regenPositions()}>
                            <img src={regenerateImg} alt='regen'/>
                        </button>
                    )}
                </div>
            </motion.div>
        </>
    )
}