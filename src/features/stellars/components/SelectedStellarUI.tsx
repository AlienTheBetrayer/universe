import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={object.idx}>
                        <h3>{object.content.first.title}</h3>
                        <div>
                            { object.content.first.description.map((p, idx) => (
                                <p key={`${object.idx}-${idx}`}>{p}</p>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            
            <motion.div className='selected-stellar-ui-right'
            style={{ y: isMobile ? '0' : '-50%' }}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1, duration: 1.5, ease: 'backOut' }  }}
            exit={{ x: 300, opacity: 0, transition: { duration: 1.5, ease: 'circIn' } }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={object.idx}>
                        <h3>{object.content.second.title}</h3>
                        <div>
                            { object.content.second.description.map((p, idx) => (
                                <p key={`${object.idx}-${idx}`}>• {p}</p>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    )
}