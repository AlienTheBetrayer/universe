import './LinkButton.css';
import '../../Button/components/Button.css'
import { cssVariable } from '../../../utils/cssVariable';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ButtonVariants } from '../../Button/components/Button';

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
        custom={{ fillColor: fillColor, hoverColor: hoverColor }}
        variants={ButtonVariants}
        initial='initial'
        whileHover='hover'>
            { children }
        </motion.a>
    )   
}