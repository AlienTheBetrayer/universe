import './LinkButton.css';
import '../../Button/components/Button.css'
import { cssVariable } from '../../../utils/cssVariable';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface Props {
    className?: string;
    fillColor?: string;
    hoverColor?: string;
    to?: string;
    children?: React.ReactNode;
}

export const LinkButton = ({ className='', fillColor=cssVariable('--foreground-last'), to='/', hoverColor=cssVariable('--foreground'), children, ...rest }: Props) => {
    const routerNavigate = useNavigate();
   
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        routerNavigate(to);
    }
    
    return (
        <motion.a className={`button link-button ${className}`} href={to} onClick={(e) => handleNavigate(e)} {...rest}
        initial={{ background: fillColor}}
        whileHover={{ background: hoverColor }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            { children }
        </motion.a>
    )   
}