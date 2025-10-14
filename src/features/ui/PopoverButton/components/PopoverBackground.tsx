import './PopoverBackground.css';
import { motion } from 'motion/react';

interface Props {
    onInteract?: () => void;
}

export const PopoverBackground = ({ onInteract }: Props) => {
    return (
        <motion.div className='popover-background'
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onInteract?.()}/>
    )
}