import './UniversalLink.css';
import { Link } from 'react-router-dom';

type RouteType = 'router' | 'url';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    type?: RouteType; 
    onClick?: () => void;
}

export const UniversalLink = ({ className, to='', type='router', children, ...rest }: Props) => {
    return (
        type === 'router' ? (
            <Link className={`universal-link ${className ?? ''}`} to={to} {...rest}>
                { children }
            </Link>
        ) : (
            <a className={`universal-link ${className ?? ''}`} href={to} target='_blank' rel='noopener noreferrer' {...rest}>
                { children }
            </a>
        )
    )
}