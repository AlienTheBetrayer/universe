import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import type { Stellar } from '../context/StellarContext';
import './SelectedStellarUI.css';

import { AnimatePresence, motion } from 'motion/react';

interface Props {
    object: Stellar;
}

export const SelectedStellarUI = ({ object }: Props) => {
    const isMobile = useMediaQuery(768);

    return (
        <>
            <motion.div className='selected-stellar-ui-left'
            style={{ y: isMobile ? '0' : '-50%' }}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ x: -300, opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <AnimatePresence mode='wait'>
                    <motion.div className='flex flex-col gap-1'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={object.idx}>
                        <h2>{object.title}</h2>
                        <p>{object.description}</p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            
            <motion.div className='selected-stellar-ui-right'
            style={{ y: '-50%' }}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ x: 300, opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <AnimatePresence mode='wait'>
                    <motion.div className='flex flex-col gap-1'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={object.idx}>
                        <h2>{object.title.toUpperCase()}</h2>
                        <p>{object.description.toUpperCase()}</p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <motion.div className='selected-stellar-ui-mobile'
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ y: 300, opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={object.idx}>
                        <h3>{object.title}</h3>
                        <p>{object.description}</p>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={`${object.idx}-2`}>
                        <h3>{object.title.toUpperCase()}</h3>
                        <p>{object.description.toUpperCase()}</p>
                    </motion.div>
                </AnimatePresence>

            </motion.div>
            
        </>
    )
}