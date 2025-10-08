import './StellarUI.css';
import { useStellarContext } from '../context/StellarContext';
import { AnimatePresence, motion } from 'motion/react';

import regenerateImg from '../assets/regenerate.svg';
import { useStellarPositions } from '../hooks/useStellarPositions';
import { useRef } from 'react';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useStellarHover } from '../hooks/useStellarHover';

export const StellarUI = () => {
    const [state, dispatch] = useStellarContext();
    const isSelected = state.selected !== -1;
    
    // regenerating functionality
    const positions = useStellarPositions(state.viewport);
    const isGenerating = useRef<boolean>(false);
    
    const handleRegenerate = () => {
        if(isGenerating.current)
            return;

        dispatch({ type: 'go_back' });
        positions.generate();
        isGenerating.current = true;
        setTimeout(() => { isGenerating.current = false }, 5000);
    }

    // hover functionality
    const hover = useStellarHover();

    return (
        <>
            { hover.render() }
            
            <motion.button className='stellar-button stellar-ui-previous-button'
            style={{ y: '-50%'}}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'select_previous' })}>
                ←
                <HotkeyTooltip className='stellar-tooltip' hotkeys={['←', 'A']}/>
            </motion.button>

            <motion.button className='stellar-button stellar-ui-next-button'
            style={{ y: '-50%'}}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'select_next' })}>
                →
                <HotkeyTooltip className='stellar-tooltip' hotkeys={['D', '→']}/>
            </motion.button>

            <motion.div
            className='stellar-ui-bottom-bar'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}>
                <div className='stellar-ui-bottom-bar-buttons-container'>
                    <button className='stellar-button stellar-button-regenerate'>
                        <img src={regenerateImg} alt='regen'/>
                    </button>
                </div>

                <div className='stellar-ui-bottom-bar-buttons-container'>
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
                    onClick={() => dispatch({ type: 'go_back' })}>
                        Go back
                        <HotkeyTooltip className='stellar-tooltip' hotkeys={['Esc']}/>
                    </button>
                </div>

                <div className='stellar-ui-bottom-bar-buttons-container'>
                    <button className='stellar-button stellar-button-regenerate'
                    onClick={handleRegenerate}>
                        <img src={regenerateImg} alt='regen'/>
                    </button>
                </div>
            </motion.div>
        </>
    )
}