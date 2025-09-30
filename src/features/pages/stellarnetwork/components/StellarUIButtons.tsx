import { useStellarContext } from '../context/StellarContext';
import './StellarUIButtons.css';
import { motion } from 'motion/react';

export const StellarUIButtons = () => {
    const [state, dispatch] = useStellarContext();

    return (
        <>
            <motion.button className='stellar-button stellar-ui-previous'
            style={{ y: '-50%'}}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'select_previous' })}>
                ←
            </motion.button>

            <motion.button className='stellar-button stellar-ui-next'
            style={{ y: '-50%'}}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'select_next' })}>
                →
            </motion.button>

            <motion.button className='stellar-button stellar-ui-back'
            style={{ x: '-50%' }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'backInOut' }}
            onClick={() => dispatch({ type: 'unselect' })}>
                Go back
            </motion.button>
        </>
    )
}