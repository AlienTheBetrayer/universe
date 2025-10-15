import { forwardRef } from 'react';
import './Button.css';
import { motion, type HTMLMotionProps } from 'motion/react';

interface Props extends HTMLMotionProps<'button'> {
    enabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, enabled=true, ...rest }, ref) => {
    return (
        <motion.button 
        ref={ref} 
        className={`button ${className ?? ''} ${!enabled ? 'button-disabled' : ''}`} 
        {...rest}>
            { children }
        </motion.button>
    )   
});