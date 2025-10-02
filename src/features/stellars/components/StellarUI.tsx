import { useStellarContext } from '../context/StellarContext';
import './StellarUI.css';
import { AnimatePresence, motion } from 'motion/react';

export const StellarUI = () => {
    const [state, dispatch] = useStellarContext();
    const isSelected = state.selected !== -1;

    return (
        <>
            <motion.button className='stellar-button stellar-ui-previous-button'
            style={{ y: '-50%'}}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'select_previous' })}>
                ←
                <div className='stellar-tooltip'>
                    <span>←</span>
                    <span>A</span>
                </div>
            </motion.button>

            <motion.button className='stellar-button stellar-ui-next-button'
            style={{ y: '-50%'}}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'select_next' })}>
                →
                <div className='stellar-tooltip'>
                    <span>D</span>
                    <span>→</span>
                </div>
            </motion.button>

            <motion.div
            className={`stellar-ui-bottom-bar ${!isSelected ? 'stellar-button-deactivated' : ''}`}
            style={{ x: '-50%' }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}>
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
                
                <motion.button className={`stellar-button ${!isSelected ? 'stellar-button-deactivated' : ''}`} 
                onClick={() => dispatch({ type: 'go_back' })}>
                    Go back
                    <div className='stellar-tooltip'>
                        <span>Esc</span>
                    </div>
                </motion.button>
            </motion.div>
        </>
    )
}