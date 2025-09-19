import './LinkButton.css';
import { Link } from 'react-router-dom';

type RouteType = 'router' | 'url';

interface Props {
    className?: string;
    to?: string;
    type?: RouteType; 
    children?: React.ReactNode;
}

export const UniversalLink = ({ className='', to='', type='router', children, ...rest }: Props) => {
    return (
        type === 'router' ? (
            <Link className={`link-button ${className}`} to={to} {...rest}>
                { children }
            </Link>
        ) : (
            <a className={`link-button ${className}`} href={to} target='_blank' rel='noopener noreferrer' {...rest}>
                { children }
            </a>
        )
    )
}