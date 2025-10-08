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
        <motion.div className='stellar-context-menu' ref={ref}>
            <h3>Context menu!</h3>
        </motion.div>
    )
}