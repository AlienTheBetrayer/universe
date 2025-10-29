import { motion } from 'motion/react';
import { useWorldContext } from '../../../context/WorldContext';
import { WorldCanvas } from './canvas/WorldCanvas';
import './ForgeWorld.css';
import { ForgeUI } from './ui/ForgeUI';
import { ForgeUIOverlay } from './ui/ForgeUIOverlay';

export const ForgeWorld = () => {
    const [state] = useWorldContext();

    return (
        <div className='forge-world-container'>
            <h3>
                <mark>World</mark>
                {state.worldName !== undefined && (
                    <small> ({state.worldName})</small>
                )}
            </h3>

            <motion.div
                className='forge-world'
                initial={{ borderRadius: '2rem' }}
                whileHover={{ borderRadius: '4rem' }}
            >
                <WorldCanvas />
                <ForgeUIOverlay />
            </motion.div>
            <ForgeUI />
        </div>
    );
};
