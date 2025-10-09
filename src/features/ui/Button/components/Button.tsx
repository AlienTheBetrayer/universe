import { forwardRef } from 'react';
import './Button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, ...rest }, ref) => {
    return (
        <button ref={ref} className={`button ${className ?? ''}`} {...rest}>
            { children }
        </button>
    )   
});