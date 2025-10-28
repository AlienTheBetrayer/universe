import { motion } from 'motion/react';
import { WorldCanvas } from './canvas/WorldCanvas';
import './ForgeWorld.css';
import { ForgeUI } from './ui/ForgeUI';
import { ForgeUIOverlay } from './ui/ForgeUIOverlay';

export const ForgeWorld = () => {
    return (
        <div className='forge-world-container'>
            <h3>
                <mark>World</mark>
            </h3>

            <motion.div
                className='forge-world'
                initial={{ borderRadius: '2rem' }}
                whileHover={{ borderRadius: '4rem' }}
            >
                <WorldCanvas />
                <ForgeUIOverlay/>
            </motion.div>
            <ForgeUI />
        </div>
    );
};
