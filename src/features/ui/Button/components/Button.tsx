import './Button.css';
import { cssVariable } from '../../../../utils/cssVariable';
import { motion, type HTMLMotionProps, type Transition } from 'motion/react';

export const ButtonVariants = {
    initial: (custom: { fillColor: string, hoverColor: string }) => {
        return { backgroundColor: custom.fillColor };
    },
    hover: (custom: { fillColor: string, hoverColor: string }) => {
        return {
            backgroundColor: custom.hoverColor,
            transition: { type: 'spring', stiffness: 300, damping: 30 } as Transition
        }
    }
}

interface Props extends HTMLMotionProps<'button'> {
    fillColor?: string;
    hoverColor?: string;
}

export const Button = ({ className, fillColor=cssVariable('--foreground-last'), hoverColor=cssVariable('--foreground'), children, ...rest }: Props) => {
    return (
        <motion.button className={`button ${className ?? ''}`} {...rest}
        custom={{ fill: fillColor, hover: hoverColor }}
        variants={ButtonVariants}
        initial='initial'
        whileHover='hover'>
            { children }
        </motion.button>
    )   
}