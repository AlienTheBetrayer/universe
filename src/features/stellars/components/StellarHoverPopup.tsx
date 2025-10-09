import type React from 'react';
import './StellarHoverPopup.css';
import { motion } from "motion/react"
import type { Stellar } from '../context/StellarContext';

interface Props {
    stellar: Stellar;
    ref: React.RefObject<HTMLDivElement | null>;
}

export const StellarHoverPopup = ({ stellar, ref }: Props) => {
    return (
        <motion.div className='stellar-hover-popup' ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <h3>{stellar?.content.firstTitle}</h3>
            <p>{stellar?.content.firstDescription}</p>
            <span className='stellar-hover-popup-idx'>{stellar?.idx ?? ''}</span>
        </motion.div>
    )
}