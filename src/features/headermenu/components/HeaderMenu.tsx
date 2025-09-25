import './HeaderMenu.css';
import { motion } from 'motion/react';

export const HeaderMenu = () => {
    return (
        <motion.nav className='header-menu'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}>

        </motion.nav>
    )
}