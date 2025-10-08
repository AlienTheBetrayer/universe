import type React from 'react';
import { useStellarContext } from '../context/StellarContext';
import './StellarContextMenu.css';
import { motion } from "motion/react"

interface Props {
    ref: React.RefObject<HTMLDivElement | null>;
}

export const StellarContextMenu = ({ ref }: Props) => {
    const [state, dispatch] = useStellarContext();

    return (
        <motion.div className='stellar-context-menu' ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <h3>Context menu!</h3>
        </motion.div>
    )
}