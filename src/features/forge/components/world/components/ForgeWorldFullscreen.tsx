import { motion } from 'motion/react';
import { WorldCanvas } from './canvas/WorldCanvas';
import './ForgeWorldFullscreen.css';
import { ForgeUIOverlay } from './ui/ForgeUIOverlay';

export const ForgeWorldFullscreen = () => {
    return (
        <motion.div
            className='forge-world-fullscreen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <WorldCanvas />
            <ForgeUIOverlay />
        </motion.div>
    );
};
