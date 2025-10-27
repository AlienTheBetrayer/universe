import { motion } from 'motion/react';
import './ForgeUISettings.css';

export const ForgeUISettings = () => {
    return (
        <motion.div
            className='forge-ui-settings'
            initial={{ y: '10px', opacity: 0 }}
            animate={{ y: '-105%', opacity: 1 }}
            exit={{ y: '10px', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        ></motion.div>
    );
};
