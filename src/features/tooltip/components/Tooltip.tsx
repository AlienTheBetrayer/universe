import './Tooltip.css';
import { motion } from 'motion/react';

interface Props {
    children: string;
    ref: React.RefObject<HTMLDivElement | null>;
}

export const Tooltip = ({ children, ref }: Props) => {
    return (
        <motion.div className='tooltip'
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
            <p>{ children }</p>
        </motion.div>
    )
}