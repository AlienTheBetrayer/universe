import type React from 'react';
import './StellarHoverPopup.css';
import { motion } from "motion/react"
import type { StellarContentEntry } from '../context/StellarContext';

interface Props {
    content?: StellarContentEntry;
    ref: React.RefObject<HTMLDivElement | null>;
}

export const StellarHoverPopup = ({ content, ref }: Props) => {
    return (
        <motion.div className='stellar-hover-popup' ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <h2>{content?.title}</h2>
            <p>{content?.description[0]}</p>
        </motion.div>
    )
}