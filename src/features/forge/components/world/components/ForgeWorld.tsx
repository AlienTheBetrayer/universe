import { motion } from 'motion/react';
import './ForgeWorld.css';
import { ForgeCanvas } from './canvas/ForgeCanvas';
import { ForgeUI } from './ui/ForgeUI';

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
                whileTap={{ borderRadius: '5rem' }}
            >
                <ForgeCanvas />
                <ForgeUI/>
            </motion.div>
        </div>
    );
};
