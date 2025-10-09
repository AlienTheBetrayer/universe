import './StellarUI.css';
import { useStellarContext } from '../context/StellarContext';
import { AnimatePresence, motion } from 'motion/react';

import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';

import regenerateImg from '../assets/regenerate.svg';
import tutorialImg from '../assets/tutorial.svg';
import clearImg from '../assets/clear.svg';
import refillImg from '../assets/refill.svg';
import { useStellarActions } from '../hooks/useStellarActions';
import { useTooltips } from '../../tooltip/hooks/useTooltips';

export const StellarUI = () => {
    const [state, setState] = useStellarContext();
    const isSelected = state.selected !== false;
    const actions = useStellarActions();

    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }

            { actions.hover.render() }
            { actions.clearMessageBox.render() }
            { actions.refillMessageBox.render() }
            
            <motion.button className='stellar-button stellar-ui-previous-button'
            ref={el => { tooltips.set(0, 'Previous orb', el, 'right') }}
            style={{ y: '-50%'}}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => setState(prev => ({ ...prev, selected: prev.selected === false ? 0 : (prev.selected > 0 ? prev.selected - 1 : prev.stellars.length - 1)}))}>
                ←
                <HotkeyTooltip className='stellar-tooltip' hotkeys={['←', 'A']}/>
            </motion.button>

            <motion.button className='stellar-button stellar-ui-next-button'
            ref={el => { tooltips.set(1, 'Next orb', el, 'left') }}
            style={{ y: '-50%'}}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => setState(prev => ({ ... prev, selected: prev.selected === false ? prev.stellars.length - 1 : ( prev.selected < prev.stellars.length - 1 ? prev.selected + 1 : 0)}))}>
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
                    ref={el => { tooltips.set(2, 'Wipe all orbs', el, 'right') }}

                    onClick={() => actions.clearMessageBox.setShown(true)}>
                        <img src={clearImg} alt='clear'/>
                    </button>

                    <button className='stellar-button stellar-button-action'
                    ref={el => { tooltips.set(3, 'Restore all orbs', el, 'right') }}

                    onClick={() => actions.refillMessageBox.setShown(true)}>
                        <img src={refillImg} alt='refill'/>
                    </button>

                    <button className='stellar-button stellar-button-action'
                    ref={el => { tooltips.set(4, 'Show tutorial', el, 'right') }}
                    onClick={() => {}}>
                        <img src={tutorialImg} alt='tutorial'/>
                    </button>
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
                    <button className='stellar-button stellar-button-action'
                    ref={el => { tooltips.set(5, 'Regenerate positions', el, 'left') }}
                    onClick={() => actions.regenPositions()}>
                        <img src={regenerateImg} alt='regen'/>
                    </button>
                </div>
            </motion.div>
        </>
    )
}