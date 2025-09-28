import './FooterPopup.css';

import { motion } from 'motion/react';

interface Props {
    idx: number;
    left: number;
    top: number;
}

// MILLION RERENDERS!!!
export const FooterPopup = ({ idx, left, top }: Props) => {

    
    return (
        <motion.div className='footer-popup'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 200, damping: 40}}
        style={{ left: left, top: top - 64}}
        key={idx}>
            hi
        </motion.div>
    )
}