import './BackgroundBlur.css';

import { motion } from 'motion/react';

interface Props {
    onInteract?: () => void;
    zIndex?: number;
}

export const BackgroundBlur = ({ onInteract, zIndex = 30 }: Props) => {
    return (
        <motion.div
            className='background-blur'
            style={{ zIndex: zIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onInteract?.()}
        />
    );
};
