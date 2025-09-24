import './LinkButton.css';
import { Link, type LinkProps } from 'react-router-dom';

interface Props extends LinkProps {
    onClick?: () => void;
}

export const LinkButton = ({ className, to='/', onClick, children, ...rest }: Props) => {
    const handle = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClick?.();
    }
    
    return (
        <Link className={`link-button ${className ?? ''}`} to={to} onClick={() => handle()} {...rest}>
            { children }
        </Link>
    )   
}