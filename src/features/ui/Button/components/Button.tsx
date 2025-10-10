import { forwardRef } from 'react';
import './Button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    enabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, enabled=true, ...rest }, ref) => {
    return (
        <button ref={ref} className={`button ${className ?? ''} ${!enabled && 'button-disabled' }`} {...rest}>
            { children }
        </button>
    )   
});