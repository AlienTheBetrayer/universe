import { forwardRef } from 'react';
import './UniversalLink.css';
import { Link } from 'react-router-dom';

type RouteType = 'router' | 'url';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    type?: RouteType; 
    onClick?: () => void;
}

export const UniversalLink = forwardRef<HTMLAnchorElement, Props>(({ className, to='', type='router', onClick, children, ...rest }, ref) => {
    return (
        type === 'router' ? (
            <Link ref={ref} className={`universal-link ${className ?? ''}`} to={to} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth'}); onClick?.(); }} {...rest}>
                { children }
            </Link>
        ) : (
            <a ref={ref} className={`universal-link ${className ?? ''}`} href={to} target='_blank' rel='noopener noreferrer' onClick={() => onClick?.()} {...rest}>
                { children }
            </a>
        )
    )
});