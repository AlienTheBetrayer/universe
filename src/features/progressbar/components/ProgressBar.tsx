import { useScroll, useSpring } from 'motion/react';
import { motion } from 'motion/react';
import './ProgressBar.css';

export const ProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const spring = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 40,
    });

    return (
        <motion.div
            className='progress-bar'
            key='progressbar'
            style={{ scaleX: spring }}
        />
    );
};
