import type { Stellar } from '../context/StellarContext';
import './StellarUI.css';

import { motion } from 'motion/react';

interface Props {
    object: Stellar;
}

export const StellarUI = ({ object }: Props) => {
    return (
        <>
            <motion.div className='stellar-ui-left'
            style={{ y: '-50%' }}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ x: -300, opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <h2>{object.title}</h2>
                <p>{object.description}</p>
            </motion.div>

            <motion.div className='stellar-ui-right'
            style={{ y: '-50%' }}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ x: 300, opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <h2>{object.title.toUpperCase()}</h2>
                <p>{object.description.toUpperCase()}</p>
            </motion.div>
        </>
    )
}