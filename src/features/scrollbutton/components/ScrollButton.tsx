import './ScrollButton.css';
import { Button } from "../../ui/Button/components/Button"
import { motion } from 'motion/react';
import { useScrollYPast } from '../../../hooks/useScrollYPast';

export const ScrollButton = () => {
    const scrolledDown = useScrollYPast(0.2);    

    return (
        <motion.div className='scroll-button-container'
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: scrolledDown ? 0 : 100, opacity: scrolledDown ? 1 : 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}>
            <Button className='scroll-button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
                ↑
            </Button>
        </motion.div>
    )
}