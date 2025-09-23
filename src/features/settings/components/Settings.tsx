import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import './Settings.css';

import { motion } from 'motion/react';

export const Settings = () => {
    return (
        <motion.div className='settings'
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ delay: 3.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 50 }}>
            <ToggleButton/>
        </motion.div>
    )
}