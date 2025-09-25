import './BackgroundBlur.css';

import { motion } from 'motion/react';

interface Props {
    zIndex?: number;
}

export const BackgroundBlur = ({ zIndex = 10 }: Props) => {
    return (
        <motion.div className='background-blur' style={{ zIndex: zIndex }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}/>
    )
}