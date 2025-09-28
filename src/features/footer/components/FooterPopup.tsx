import type { FooterPopupOffset } from '../hooks/useFooterPopup';
import './FooterPopup.css';

import { motion } from 'motion/react';

interface Props {
    offset: FooterPopupOffset;
    text?: string;
}

// MILLION RERENDERS!!!
export const FooterPopup = ({ offset, text }: Props) => {
    return (
        <motion.div className='footer-popup'
        style={{ left: offset.left, top: offset.top - 80 }}
        initial={{ opacity: 0, y: 50, x: `calc(-50% + ${offset.width / 2}px)`, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ 
            opacity: { type: 'spring', stiffness: 300, damping: 40 },
            y: { type: 'spring', stiffness: 300, damping: 40 },
            scale: {
                delay: 0.3,
                type: 'spring', stiffness: 200, damping: 40
            }
        }}
        key={offset.idx}>
            { text }
        </motion.div>
    )
}