import { forwardRef } from 'react';
import './LinkButton.css';
import { Link, type LinkProps } from 'react-router-dom';

interface Props extends LinkProps {
    onClick?: () => void;
}

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(({ className, to='/', onClick, children, ...rest }, ref) => {
    const handle = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClick?.();
    }
    
    return (
        <Link ref={ref} className={`link-button ${className ?? ''}`} to={to} onClick={() => handle()} {...rest}>
            { children }
        </Link>
    )   
});