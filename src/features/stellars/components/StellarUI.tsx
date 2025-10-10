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
import { useEffect } from 'react';
import { Button } from '../../ui/Button/components/Button';

export const StellarUI = () => {
    const [state, setState] = useStellarContext();
    const isSelected = state.selected !== false;
    const actions = useStellarActions();
    const tooltips = useTooltips();

    // state syncing with the visibility of the clear message box to prevent hotkeys
    useEffect(() => {
        setState(prev => ({ ...prev, messageBoxVisible: actions.clearMessageBox.shown }));
    }, [actions.clearMessageBox.shown]);

    // as soon movement stops in the state
    // we hide the popup
    useEffect(() => {
        if(state.moving === false)
            setState(prev => ({ ...prev, isMoveWaiting: false }));
    }, [state.moving]);

    // popup state sync with state (so we can call it from other components)
    useEffect(() => {
        actions.waitingPopup.setShown(state.isMoveWaiting);
    }, [state.isMoveWaiting]);

    return (
        <>
            { tooltips.render() }
        
            { actions.waitingPopup.render() }
            { actions.hover.render() }
            { actions.clearMessageBox.render() }
            
            <motion.div 
            className='stellar-ui-previous-button'
            style={{ y: '-50%'}}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}>
                {/* previous orb nav button */}
                <Button
                ref={el => { tooltips.set(0, 'Previous orb', el, 'right') }}
                enabled={!state.isMoveWaiting}
                className='stellar-button'
                onClick={() => 
                    setState(prev => {
                        const indexes = prev.stellars.map(s => s.idx);
                        indexes.sort();
                        return { ...prev, selected: prev.selected === false ? indexes[0] : (prev.selected === indexes[0] ? indexes.at(-1)! : indexes[indexes.indexOf(prev.selected) - 1]) };
                    })}>
                    ←
                </Button>

                <HotkeyTooltip className='stellar-tooltip' hotkeys={['←', 'A']}/>
            </motion.div>

            <motion.div 
            className='stellar-ui-next-button'
            style={{ y: '-50%'}}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}>
                {/* next orb nav button */}
                <Button
                ref={el => { tooltips.set(1, 'Next orb', el, 'left') }}
                enabled={!state.isMoveWaiting}
                className='stellar-button'
                onClick={() =>                        
                    setState(prev => {
                        const indexes = prev.stellars.map(s => s.idx);
                        indexes.sort();
                        return { ...prev, selected: prev.selected === false ? indexes.at(-1)! : (prev.selected === indexes.at(-1)! ? indexes[0] : indexes[indexes.indexOf(prev.selected) + 1]) };
                    })}>
                        →
                    </Button>
                <HotkeyTooltip className='stellar-tooltip' hotkeys={['D', '→']}/>
            </motion.div>

            <motion.div
            className='stellar-ui-bottom-bar'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}>
                <div className='stellar-ui-bottom-bar-buttons-container'>
                    {/* wipe an orb button */}
                    <Button className='stellar-button stellar-button-action'
                    enabled={!state.isMoveWaiting}
                    ref={el => { tooltips.set(2, isSelected ? 'Wipe this orb' : 'Wipe all orbs', el, 'right') }}
                    onClick={() => actions.clearMessageBox.setShown(true)}>
                        <img src={clearImg} alt='clear'/>
                    </Button>

                    {/* move an orb button */}
                    { !isSelected && (
                        <Button className='stellar-button stellar-button-action'
                        ref={el => { tooltips.set(4, 'Move an orb', el, 'right') }}
                        onClick={() => {
                            setState(prev => ({ ...prev, isMoveWaiting: !prev.isMoveWaiting }));
                        }}>
                            <img src={moveImg} alt='move'/>
                        </Button>
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
                    
                    {/* back button */}
                    <Button className={`stellar-button`}
                    enabled={isSelected} 
                    onClick={() => setState(prev => ({ ...prev, selected: false }))}>
                        Go back
                        <HotkeyTooltip className='stellar-tooltip' hotkeys={['Esc']}/>
                    </Button>
                </div>

                {/* question the existence of this button */}
                <div className='stellar-ui-bottom-bar-buttons-container stellar-ui-bottom-bar-right-container'>
                    { !isSelected && (
                        <>
                            {/* show tutorial button */}
                            <Button className='stellar-button stellar-button-action'
                            enabled={!state.isMoveWaiting}
                            ref={el => { tooltips.set(3, 'Show tutorial', el, 'left') }}
                            onClick={() => setState(prev => ({ ...prev, tutorialVisible: true }))}>
                                <img src={tutorialImg} alt='tutorial'/>
                            </Button>

                            {/* regenerate positions button */}
                            <Button className='stellar-button stellar-button-action'
                            enabled={!state.isMoveWaiting}
                            ref={el => { tooltips.set(6, 'Regenerate positions', el, 'left') }}
                            onClick={() => actions.regenPositions()}>
                                <img src={regenerateImg} alt='regen'/>
                            </Button>
                        </>
                    )}
                </div>
            </motion.div>
        </>
    )
}