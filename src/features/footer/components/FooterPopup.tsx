import type { FooterPopupOffset } from '../hooks/useFooterPopups';
import './FooterPopup.css';

import { motion } from 'motion/react';

interface Props {
    offset: FooterPopupOffset;
    text?: string;
}

export const FooterPopup = ({ offset, text }: Props) => {
    const left = offset.left > 50 ? `calc(-50% + ${offset.width / 2}px)` : 0;
    
    return (
        <motion.div className='footer-popup'
        style={{ left: offset.left > 50 ? offset.left : 0, top: offset.top }}
        initial={{ opacity: 0, y: `calc(-50%)`, x: left, scale: 0.9 }}
        animate={{ opacity: 1, y: `calc(-150%)`, scale: 1 }}
        exit={{ opacity: 0, y: `calc(-50%)` }}
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